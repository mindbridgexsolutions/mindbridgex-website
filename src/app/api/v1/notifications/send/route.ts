import { NextResponse } from "next/server";

interface NotificationRequest {
  bookingId: string;
  phone: string;
  ceremonyTitle: string;
  date: string;
  timeSlot: string;
  channels: ("sms" | "whatsapp")[];
}

export async function POST(request: Request) {
  try {
    const body: NotificationRequest = await request.json();
    const { bookingId, phone, ceremonyTitle, date, timeSlot, channels } = body;

    if (!bookingId || !phone) {
      return NextResponse.json(
        { success: false, message: "Booking ID and phone number are required." },
        { status: 400 }
      );
    }

    const dispatchedLogs = [];

    if (channels.includes("whatsapp")) {
      dispatchedLogs.push({
        channel: "WhatsApp",
        recipient: phone,
        status: "DELIVERED",
        message: `📿 *VedaSetu Booking Confirmed!*\n\nNamaste! Your ceremony *${ceremonyTitle}* (ID: #${bookingId}) is scheduled for *${date}* at *${timeSlot}*.\n\nOur Acharya Ji will call you 24 hours prior to coordinate auspicious muhurat preparation.`,
        sentAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      });
    }

    if (channels.includes("sms")) {
      dispatchedLogs.push({
        channel: "SMS",
        recipient: phone,
        status: "DELIVERED",
        message: `VedaSetu: Booking #${bookingId} confirmed for ${ceremonyTitle} on ${date}. Track status at vedasetu.com/my-bookings`,
        sentAt: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Notifications dispatched successfully.",
      data: dispatchedLogs,
    });
  } catch (error) {
    console.error("[API Notifications Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to dispatch notifications." },
      { status: 500 }
    );
  }
}