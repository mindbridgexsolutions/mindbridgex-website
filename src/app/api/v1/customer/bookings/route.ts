import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ceremonyId, scheduledAt, venueAddress, notes } = body;

    if (!ceremonyId || !scheduledAt || !venueAddress) {
      return NextResponse.json(
        { error: 'Ceremony, scheduled date/time, and venue address are required.' },
        { status: 400 }
      );
    }

    // Fetch or fallback to a default devotee user
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: 'Deepak Singh',
          email: 'devotee@vedasetu.org',
          phone: '+918286972263',
        },
      });
    }

    // Fetch ceremony details for base price
    const ceremony = await prisma.ceremony.findUnique({
      where: { id: ceremonyId },
    });

    if (!ceremony) {
      return NextResponse.json({ error: 'Selected ceremony does not exist.' }, { status: 404 });
    }

    // Create the new booking
    const newBooking = await prisma.booking.create({
      data: {
        userId: user.id,
        ceremonyId: ceremony.id,
        scheduledAt: new Date(scheduledAt),
        venueAddress,
        notes: notes || null,
        totalPrice: ceremony.basePrice,
        status: 'PENDING',
      },
      include: {
        ceremony: {
          select: { name: true, category: true, durationMinutes: true },
        },
      },
    });

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error) {
    console.error('Customer Booking POST Error:', error);
    return NextResponse.json({ error: 'Failed to create booking. Please try again.' }, { status: 500 });
  }
}
