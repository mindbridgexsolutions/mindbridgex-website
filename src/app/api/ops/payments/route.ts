import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        ceremony: { select: { name: true } },
        pandit: { select: { name: true, phone: true } },
      },
    });

    const paymentLogs = bookings.map((b) => {
      // Calculate split (80% Pandit Dakshina, 20% Platform Fee)
      const dakshinaAmount = Math.round(b.totalPrice * 0.8);
      const platformFee = b.totalPrice - dakshinaAmount;

      return {
        transactionId: `TXN_${b.id.slice(0, 8).toUpperCase()}`,
        bookingId: b.id,
        ceremonyName: b.ceremony.name,
        devoteeName: b.user.name || b.user.email,
        totalAmount: b.totalPrice,
        dakshinaAmount,
        platformFee,
        gatewayStatus: 'SUCCESS',
        paymentMethod: 'UPI / Online',
        panditName: b.panditName || b.pandit?.name || 'Unassigned',
        payoutStatus: b.status === 'COMPLETED' ? 'SETTLED' : 'PENDING_FULFILLMENT',
        createdAt: b.createdAt,
      };
    });

    const totalVolume = paymentLogs.reduce((sum, p) => sum + p.totalAmount, 0);
    const totalDakshina = paymentLogs.reduce((sum, p) => sum + p.dakshinaAmount, 0);
    const totalPlatformEarnings = paymentLogs.reduce((sum, p) => sum + p.platformFee, 0);

    return NextResponse.json({
      success: true,
      summary: {
        totalVolume,
        totalDakshina,
        totalPlatformEarnings,
        transactionCount: paymentLogs.length,
      },
      payments: paymentLogs,
    });
  } catch (error) {
    console.error('Ops Payments GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}
