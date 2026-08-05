import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const customers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        bookings: {
          orderBy: { createdAt: 'desc' },
          include: {
            ceremony: { select: { name: true, category: true } },
          },
        },
      },
    });

    const formattedCustomers = customers.map((user) => {
      const totalBookings = user.bookings.length;
      const totalSpend = user.bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      const lastBooking = user.bookings[0] || null;

      return {
        id: user.id,
        name: user.name || 'Unnamed Devotee',
        email: user.email,
        phone: user.phone || 'N/A',
        createdAt: user.createdAt,
        totalBookings,
        totalSpend,
        lastBookingDate: lastBooking ? lastBooking.scheduledAt : null,
        recentVenue: lastBooking ? lastBooking.venueAddress : 'N/A',
        bookings: user.bookings,
      };
    });

    return NextResponse.json({ success: true, customers: formattedCustomers });
  } catch (error) {
    console.error('Ops Customers GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}
