import { NextResponse } from "next/server";
import { sessionService } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await sessionService.getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHENTICATED", message: "Authentication required." } },
        { status: 401 }
      );
    }

    const user = await sessionService.findOrCreateUser(session.userId);

    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            fullName: user.fullName || "",
            phone: user.phone || "",
            email: user.email || "",
            alternatePhone: user.alternatePhone || "",
            role: user.role,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API GET /customer/profile Error]:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Failed to fetch profile." } },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await sessionService.getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHENTICATED", message: "Authentication required." } },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { fullName, email, alternatePhone } = body;

    if (fullName !== undefined && typeof fullName !== "string") {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_INPUT", message: "Full name must be a valid text string." } },
        { status: 400 }
      );
    }

    const updatedUser = await sessionService.updateUserProfile(session.userId, {
      fullName: typeof fullName === "string" ? fullName.trim() : undefined,
      email: typeof email === "string" ? email.trim() : undefined,
      alternatePhone: typeof alternatePhone === "string" ? alternatePhone.trim() : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully.",
        data: {
          user: updatedUser,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API PATCH /customer/profile Error]:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Failed to update profile." } },
      { status: 500 }
    );
  }
}