import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/auth/constants";

// In-memory mock booking store
interface Booking {
  id: string;
  userToken: string;
  serviceId: string;
  title: string;
  date: string;
  timeSlot: string;
  address: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  assignedPandit: string;
  createdAt: string;
}

const bookingsStore: Booking[] = [
  {
    id: "VS-2026-8801",
    userToken: "default",
    serviceId: "ganesh-puja",
    title: "Ganesh Puja & Hawan",
    date: "2026-08-15",
    timeSlot: "09:00 AM - 11:30 AM IST",
    address: "Kandivali West, Mumbai",
    status: "CONFIRMED",
    assignedPandit: "Acharya Shastri",
    createdAt: new Date().toISOString(),
  },
];

const SERVICE_NAMES: Record<string, string> = {
  "ganesh-puja": "Ganesh Puja & Hawan",
  "satyanarayan": "Shri Satyanarayan Katha",
  "griha-pravesh": "Griha Pravesh Puja",
  "maha-mrityunjaya": "Maha Mrityunjaya Jaap",
};

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

    // Return bookings associated with session (or default mock list)
    const userBookings = bookingsStore.filter(
      (b) => b.userToken === sessionToken || b.userToken === "default"
    );

    return NextResponse.json({
      success: true,
      data: userBookings,
    });
  } catch (error) {
    console.error("[API bookings GET Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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
    const { serviceId, date, timeSlot, address } = body;

    if (!serviceId || !date || !timeSlot || !address) {
      return NextResponse.json(
        { success: false, message: "All booking fields are required." },
        { status: 400 }
      );
    }

    const newBooking: Booking = {
      id: `VS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userToken: sessionToken,
      serviceId,
      title: SERVICE_NAMES[serviceId] || "Sacred Vedic Ritual",
      date,
      timeSlot,
      address,
      status: "CONFIRMED",
      assignedPandit: "Pandit Allocation in Progress",
      createdAt: new Date().toISOString(),
    };

    bookingsStore.unshift(newBooking);

    return NextResponse.json(
      {
        success: true,
        message: "Booking confirmed successfully.",
        data: newBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API bookings POST Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create booking." },
      { status: 500 }
    );
  }
}