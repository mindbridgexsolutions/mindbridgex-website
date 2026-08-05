import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        ceremony: {
          select: {
            name: true,
            category: true,
            durationMinutes: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Ops Bookings GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch operations bookings' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, panditId, status } = body;

    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    const updateData: any = {};

    if (status) {
      updateData.status = status;
    }

    if (panditId) {
      const pandit = await prisma.pandit.findUnique({
        where: { id: panditId },
      });

      if (pandit) {
        updateData.panditId = pandit.id;
        updateData.panditName = pandit.name;
        updateData.panditPhone = pandit.phone;
        if (!status) {
          updateData.status = 'DISPATCHED';
        }
      }
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { name: true, email: true, phone: true } },
        ceremony: { select: { name: true, category: true } },
      },
    });

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error('Ops Bookings PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update booking dispatch' }, { status: 500 });
  }
}
