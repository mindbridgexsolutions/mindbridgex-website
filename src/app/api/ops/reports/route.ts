import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Category Breakdown
    const bookings = await prisma.booking.findMany({
      include: {
        ceremony: { select: { name: true, category: true } },
      },
    });

    const categoryMap: Record<string, { count: number; revenue: number }> = {};
    bookings.forEach((b) => {
      const cat = b.ceremony.category || 'General';
      if (!categoryMap[cat]) {
        categoryMap[cat] = { count: 0, revenue: 0 };
      }
      categoryMap[cat].count += 1;
      categoryMap[cat].revenue += b.totalPrice;
    });

    const categoryBreakdown = Object.entries(categoryMap).map(([category, data]) => ({
      category,
      bookingsCount: data.count,
      revenue: data.revenue,
    }));

    // Scholar Fulfillment Stats
    const totalBookingsCount = bookings.length;
    const completedCount = bookings.filter((b) => b.status === 'COMPLETED').length;
    const assignedCount = bookings.filter((b) => b.panditId !== null).length;

    const fulfillmentRate = totalBookingsCount > 0
      ? Math.round((assignedCount / totalBookingsCount) * 100)
      : 100;

    const completionRate = totalBookingsCount > 0
      ? Math.round((completedCount / totalBookingsCount) * 100)
      : 100;

    return NextResponse.json({
      success: true,
      analytics: {
        fulfillmentRate,
        completionRate,
        totalBookingsCount,
        categoryBreakdown,
      },
    });
  } catch (error) {
    console.error('Ops Reports GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics report' }, { status: 500 });
  }
}
