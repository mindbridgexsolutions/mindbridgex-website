import { NextResponse } from "next/server";
import { sessionService } from "@/lib/auth/session";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await sessionService.getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHENTICATED", message: "Authentication required." } },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { cancellationReason } = body;

    if (!cancellationReason || typeof cancellationReason !== "string" || cancellationReason.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_INPUT",
            message: "Cancellation reason is required and must be at least 5 characters.",
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Booking ${id} has been successfully cancelled.`,
        data: {
          id,
          bookingStatus: "CANCELLED",
          cancellationReason: cancellationReason.trim(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API POST /customer/bookings/:id/cancel Error]:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Failed to cancel booking." } },
      { status: 500 }
    );
  }
}