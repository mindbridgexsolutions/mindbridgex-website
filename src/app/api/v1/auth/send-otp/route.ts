import { NextResponse } from "next/server";
import { otpService } from "@/lib/auth/otp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, type } = body;

    // Basic Input Validation
    if (!identifier || typeof identifier !== "string" || identifier.trim() === "") {
      return NextResponse.json(
        { success: false, message: "A valid mobile number or email is required." },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const authType = type || (cleanIdentifier.includes("@") ? "EMAIL" : "PHONE");

    // Trigger OTP Generation & Dispatch
    const result = await otpService.sendOTP(cleanIdentifier, authType);

    if (!result || (typeof result === "object" && "success" in result && !result.success)) {
      return NextResponse.json(
        { success: false, message: "Failed to dispatch OTP code." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: typeof result === "string" ? result : "OTP dispatched successfully." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API send-otp Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to dispatch OTP. Please try again." },
      { status: 500 }
    );
  }
}