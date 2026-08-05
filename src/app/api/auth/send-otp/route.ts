import { NextResponse } from 'next/server';
import { generateOTP, storeOTP } from '@/lib/otp';
import { sendOTPNotification } from '@/lib/notifications';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    const otp = generateOTP();
    await storeOTP(email, otp);

    await sendOTPNotification({ email, otp });

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[AUTH-DEBUG] OTP for ${email}: ${otp}`);
    }

    return NextResponse.json({
      success: true,
      message: 'OTP dispatched successfully via email and notifications.',
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json(
      { error: 'Failed to dispatch OTP.' },
      { status: 500 }
    );
  }
}
