import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/auth/constants";

// In-memory mock store (replace with DB query, e.g. Prisma / Drizzle)
const userProfiles: Record<string, { fullName: string; email: string; address: string }> = {};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
        { status: 401 }
      );
    }

    const profile = userProfiles[sessionToken] || {
      fullName: "",
      email: "",
      address: "",
    };

    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("[API profile GET Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch user profile." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { fullName, email, address } = body;

    userProfiles[sessionToken] = {
      fullName: fullName || "",
      email: email || "",
      address: address || "",
    };

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      data: userProfiles[sessionToken],
    });
  } catch (error) {
    console.error("[API profile PUT Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update profile." },
      { status: 500 }
    );
  }
}