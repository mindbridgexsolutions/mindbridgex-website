import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // In production, extract user from JWT/session context
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ success: true, bookings: [] });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: {
        ceremony: {
          select: { name: true, category: true },
        },
        review: {
          select: { id: true, rating: true, comment: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Fetch Bookings Error:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { ceremonyId, scheduledAt, venueAddress, notes } = await request.json();

    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'devotee@vedasetu.org',
          name: 'Devotee User',
          phone: '+919876543210',
          role: 'DEVOTEE',
        },
      });
    }

    const ceremony = await prisma.ceremony.findUnique({
      where: { id: ceremonyId },
    });

    if (!ceremony) {
      return NextResponse.json({ error: 'Ceremony not found' }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        ceremonyId: ceremony.id,
        scheduledAt: new Date(scheduledAt),
        venueAddress,
        notes,
        totalPrice: ceremony.basePrice,
        status: 'CONFIRMED',
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Create Booking Error:', error);
    return NextResponse.json({ error: 'Failed to record booking' }, { status: 500 });
  }
}
