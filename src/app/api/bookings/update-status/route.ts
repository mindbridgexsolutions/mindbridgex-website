import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(request: Request) {
  try {
    const { bookingId, status, panditName, panditPhone } = await request.json();

    if (!bookingId || !status) {
      return NextResponse.json({ error: 'Booking ID and status are required' }, { status: 400 });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status, // e.g. "COMPLETED", "IN_PROGRESS", "CANCELLED"
        ...(panditName && { panditName }),
        ...(panditPhone && { panditPhone }),
      },
    });

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error('Update Booking Status Error:', error);
    return NextResponse.json({ error: 'Failed to update booking status' }, { status: 500 });
  }
}
