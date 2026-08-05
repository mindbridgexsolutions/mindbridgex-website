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

    return NextResponse.json(
      {
        success: true,
        data: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API GET /customer/bookings Error]:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Failed to fetch bookings." } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await sessionService.getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHENTICATED", message: "Authentication required." } },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { pujaServiceId, ceremonyDate, ceremonyTimeSlot, addressLine, specialInstructions } = body;

    if (!pujaServiceId || !ceremonyDate || !ceremonyTimeSlot || !addressLine) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_INPUT",
            message: "Missing required fields: pujaServiceId, ceremonyDate, ceremonyTimeSlot, or addressLine.",
          },
        },
        { status: 400 }
      );
    }

    const bookingRef = `VS-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    return NextResponse.json(
      {
        success: true,
        message: "Puja ceremony successfully booked.",
        data: {
          id: `bkg_${Date.now()}`,
          bookingReference: bookingRef,
          pujaServiceId,
          ceremonyDate,
          ceremonyTimeSlot,
          addressLine,
          specialInstructions: specialInstructions || "",
          bookingStatus: "PENDING",
          paymentStatus: "PAID",
          totalAmountPaise: 350000,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API POST /customer/bookings Error]:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Failed to create booking." } },
      { status: 500 }
    );
  }
}