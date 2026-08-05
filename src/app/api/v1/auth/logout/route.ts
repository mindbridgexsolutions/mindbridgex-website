import { NextResponse } from "next/server";
import { sessionService } from "@/lib/auth/session";

export async function POST() {
  try {
    // 1. Invalidate session in server memory/database and clear cookie
    await sessionService.destroySession();

    return NextResponse.json(
      { success: true, message: "Logged out successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API logout Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to log out. Please try again." },
      { status: 500 }
    );
  }
}