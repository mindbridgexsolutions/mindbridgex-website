import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { otpService } from "@/lib/auth/otp";
import { sessionService } from "@/lib/auth/session";
import { VerifyOTPRequest } from "@/types/auth";
import { AUTH_COOKIE_NAME } from "@/lib/auth/constants";

export async function POST(request: Request) {
  try {
    const body: VerifyOTPRequest = await request.json();
    const { identifier, code } = body;

    // Validate Input
    if (!identifier || !code || typeof code !== "string" || code.trim().length !== 6) {
      return NextResponse.json(
        { success: false, message: "A valid identifier and 6-digit OTP code are required." },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const cleanCode = code.trim();

    // 1. Verify OTP code & expiration
    const verification = await otpService.verifyOTP(cleanIdentifier, cleanCode);

    if (!verification.valid) {
      return NextResponse.json(
        { success: false, message: verification.message },
        { status: 400 }
      );
    }

    // 2. Fetch or create user record
    const user = await sessionService.findOrCreateUser(cleanIdentifier);

    // 3. Create active session token
    const sessionToken = await sessionService.createSession(user.id, user.role);

    // 4. Construct JSON Response
    const response = NextResponse.json(
      {
        success: true,
        message: "Authentication successful.",
        user: {
          id: user.id,
          role: user.role,
          identifier: cleanIdentifier,
        },
      },
      { status: 200 }
    );

    // 5. Explicitly attach Cookie to Response Headers
    const cookieStore = await cookies();
    cookieStore.set({
      name: AUTH_COOKIE_NAME,
      value: sessionToken || user.id,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 Days
    });

    return response;
  } catch (error) {
    console.error("[API verify-otp Error]:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}