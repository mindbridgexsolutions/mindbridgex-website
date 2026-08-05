import { NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otp';
import { signSessionToken } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required.' },
        { status: 400 }
      );
    }

    const isValid = await verifyOTP(email, otp);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP.' },
        { status: 401 }
      );
    }

    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase() },
      update: { emailVerified: new Date() },
      create: {
        email: email.toLowerCase(),
        emailVerified: new Date(),
        role: 'USER',
      },
    });

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json(
      { error: 'Authentication failed.' },
      { status: 500 }
    );
  }
}
