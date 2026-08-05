import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const totalBookings = await prisma.booking.count();
    const pendingAllocations = await prisma.booking.count({
      where: { status: 'CONFIRMED', panditId: null },
    });
    const completedBookings = await prisma.booking.count({
      where: { status: 'COMPLETED' },
    });
    const activePandits = await prisma.pandit.count({
      where: { active: true },
    });

    const revenueResult = await prisma.booking.aggregate({
      _sum: { totalPrice: true },
    });

    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        ceremony: { select: { name: true, category: true } },
      },
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue: revenueResult._sum.totalPrice || 0,
        totalBookings,
        pendingAllocations,
        completedBookings,
        activePandits,
      },
      recentBookings,
    });
  } catch (error) {
    console.error('Ops Stats Error:', error);
    return NextResponse.json({ error: 'Failed to fetch operations stats' }, { status: 500 });
  }
}
