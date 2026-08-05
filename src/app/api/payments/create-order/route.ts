import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID?.trim();
    const key_secret = process.env.RAZORPAY_KEY_SECRET?.trim();

    if (!key_id || !key_secret || key_id.includes('YOUR_KEY_ID')) {
      console.error('[RAZORPAY-CONFIG-ERROR] Invalid or default Razorpay key credentials.');
      return NextResponse.json(
        { error: 'Razorpay API credentials missing or unconfigured in .env.local.' },
        { status: 500 }
      );
    }

    console.log(`[RAZORPAY-DEBUG] Initializing Razorpay with Key ID: ${key_id.substring(0, 12)}...`);

    const razorpay = new Razorpay({ key_id, key_secret });
    const { ceremonyId } = await request.json();

    if (!ceremonyId) {
      return NextResponse.json({ error: 'Ceremony ID is required' }, { status: 400 });
    }

    const ceremony = await prisma.ceremony.findUnique({
      where: { id: ceremonyId },
    });

    if (!ceremony) {
      return NextResponse.json({ error: 'Ceremony not found' }, { status: 404 });
    }

    const options = {
      amount: ceremony.basePrice * 100, // Convert INR to Paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: key_id,
    });
  } catch (error) {
    console.error('Razorpay Create Order Error:', error);
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
  }
}
