"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Calendar, Clock, MapPin, CheckCircle2, ArrowLeft } from "lucide-react";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;

  const [date, setDate] = useState("2026-08-15");
  const [timeSlot, setTimeSlot] = useState("09:00 AM - 11:30 AM IST");
  const [address, setAddress] = useState("Kandivali West, Mumbai");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, date, timeSlot, address }),
      });

      const json = await res.json();
      if (json.success) {
        setConfirmed(true);
      } else {
        setErrorMsg(json.message || "Failed to confirm booking.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]/60 py-12 px-6">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs text-[#86868b] hover:text-[#1d1d1f] transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </button>

        {confirmed ? (
          <Card className="p-8 shadow-lg border-emerald-200 bg-white rounded-3xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#1d1d1f]">Booking Confirmed!</h2>
            <p className="text-xs text-[#86868b]">
              Your sacred ritual has been scheduled for <strong className="text-[#1d1d1f]">{date}</strong> at <strong className="text-[#1d1d1f]">{timeSlot}</strong>.
            </p>
            <Button size="md" className="w-full mt-4" onClick={() => router.push("/my-bookings")}>
              View My Bookings
            </Button>
          </Card>
        ) : (
          <Card className="p-8 shadow-lg border-[#d2d2d7]/50 bg-white rounded-3xl space-y-6">
            <div>
              <h1 className="text-xl font-bold text-[#1d1d1f]">Schedule Ceremony</h1>
              <p className="text-xs text-[#86868b] mt-0.5">Select your preferred date, time slot, and venue address.</p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1d1d1f]">Ceremony Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-[#86868b]" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#d2d2d7] text-sm focus:outline-none focus:border-[#E65100] bg-white"
                  />
                </div>
              </div>

              {/* Time Slot */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1d1d1f]">Time Slot</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#86868b]" />
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#d2d2d7] text-sm focus:outline-none focus:border-[#E65100] bg-white"
                  >
                    <option value="07:00 AM - 09:30 AM IST">07:00 AM - Morning Muhurat</option>
                    <option value="09:00 AM - 11:30 AM IST">09:00 AM - Morning Muhurat</option>
                    <option value="04:00 PM - 06:30 PM IST">04:00 PM - Evening Muhurat</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1d1d1f]">Venue Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#86868b]" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Enter ceremony location"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#d2d2d7] text-sm focus:outline-none focus:border-[#E65100] bg-white"
                  />
                </div>
              </div>

              <Button type="submit" size="md" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Confirming Booking..." : "Confirm & Schedule"}
              </Button>
            </form>
          </Card>
        )}

      </div>
    </div>
  );
}