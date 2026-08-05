"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building2, 
  ArrowLeft, 
  CheckCircle2, 
  Lock,
  Sparkles,
  MessageSquare,
  Smartphone
} from "lucide-react";

interface NotificationLog {
  channel: string;
  recipient: string;
  status: string;
  message: string;
  sentAt: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceTitle = searchParams.get("title") || "Sacred Vedic Ritual";
  const basePrice = parseInt(searchParams.get("price") || "3100", 10);
  const serviceId = searchParams.get("serviceId") || "ganesh-puja";
  const date = searchParams.get("date") || "2026-08-15";
  const timeSlot = searchParams.get("timeSlot") || "09:00 AM - 11:30 AM IST";
  const address = searchParams.get("address") || "Kandivali West, Mumbai";

  const [includeSamagri, setIncludeSamagri] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [notifySms, setNotifySms] = useState(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [notificationsSent, setNotificationsSent] = useState<NotificationLog[]>([]);

  const samagriCost = includeSamagri ? 950 : 0;
  const platformFee = 150;
  const grandTotal = basePrice + samagriCost + platformFee;

  const handlePayAndConfirm = async () => {
    setIsProcessing(true);
    setErrorMsg("");

    try {
      // 1. Create Booking
      const res = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          date,
          timeSlot,
          address,
          amountPaid: grandTotal,
          hasSamagri: includeSamagri,
          paymentStatus: "PAID",
        }),
      });

      const json = await res.json();
      if (json.success) {
        const bookingId = json.data?.id || "VS-2026-9001";

        // 2. Dispatch SMS & WhatsApp Simulations
        const channels: ("sms" | "whatsapp")[] = [];
        if (notifyWhatsapp) channels.push("whatsapp");
        if (notifySms) channels.push("sms");

        if (channels.length > 0) {
          const notifyRes = await fetch("/api/v1/notifications/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingId,
              phone: "8286972263",
              ceremonyTitle: serviceTitle,
              date,
              timeSlot,
              channels,
            }),
          });
          const notifyJson = await notifyRes.json();
          if (notifyJson.success && Array.isArray(notifyJson.data)) {
            setNotificationsSent(notifyJson.data);
          }
        }

        setIsSuccess(true);
      } else {
        setErrorMsg(json.message || "Payment authorization failed.");
      }
    } catch (err) {
      console.error("Payment submission error:", err);
      setErrorMsg("Payment processing error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]/60 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation Back */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs text-[#86868b] hover:text-[#1d1d1f] transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Scheduling
        </button>

        {isSuccess ? (
          <Card className="p-8 shadow-lg border-emerald-200 bg-white rounded-3xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#1d1d1f]">Payment & Booking Confirmed!</h2>
              <p className="text-xs text-[#86868b]">
                Your payment of <strong className="text-[#1d1d1f]">₹{grandTotal.toLocaleString("en-IN")}</strong> was successful.
              </p>
            </div>

            {/* Simulated Notification Logs */}
            {notificationsSent.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-[#1d1d1f] block border-b pb-2">
                  Instant Confirmation Dispatches
                </span>
                
                <div className="space-y-2">
                  {notificationsSent.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3.5 rounded-2xl text-xs space-y-1 border ${
                        log.channel === "WhatsApp" 
                          ? "bg-emerald-50/70 border-emerald-200 text-emerald-950" 
                          : "bg-blue-50/70 border-blue-200 text-blue-950"
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1.5">
                          {log.channel === "WhatsApp" ? (
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                          )}
                          {log.channel} Alert Sent
                        </span>
                        <span className="text-[10px] opacity-70">{log.sentAt}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed opacity-90 whitespace-pre-line font-mono">
                        {log.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button size="md" className="w-full mt-4" onClick={() => router.push("/my-bookings")}>
              View My Bookings
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            
            {/* Left: Payment Method Options */}
            <div className="md:col-span-3 space-y-6">
              <Card className="p-6 bg-white rounded-3xl shadow-sm border border-[#d2d2d7]/50 space-y-6">
                <div>
                  <h1 className="text-xl font-bold text-[#1d1d1f]">Select Payment Method</h1>
                  <p className="text-xs text-[#86868b] mt-0.5">Encrypted 256-bit SSL transaction gateway.</p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs">
                    {errorMsg}
                  </div>
                )}

                {/* Samagri Kit Toggle */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#E65100] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-[#1d1d1f] block">Pristine Puja Samagri Kit</span>
                      <span className="text-[11px] text-[#86868b]">Fresh flowers, pure ghee, and Vidhi essentials (+₹950)</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeSamagri}
                    onChange={(e) => setIncludeSamagri(e.target.checked)}
                    className="w-4 h-4 accent-[#E65100] rounded cursor-pointer"
                  />
                </div>

                {/* Method Options */}
                <div className="space-y-3">
                  <label 
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === "upi" ? "border-[#E65100] bg-orange-50/20 ring-1 ring-[#E65100]" : "border-[#d2d2d7]/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <QrCode className="w-5 h-5 text-[#E65100]" />
                      <div>
                        <span className="text-xs font-bold text-[#1d1d1f] block">UPI / QR Code</span>
                        <span className="text-[10px] text-[#86868b]">GPay, PhonePe, Paytm, BHIM</span>
                      </div>
                    </div>
                    <input type="radio" name="payment" checked={paymentMethod === "upi"} readOnly className="accent-[#E65100]" />
                  </label>

                  <label 
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === "card" ? "border-[#E65100] bg-orange-50/20 ring-1 ring-[#E65100]" : "border-[#d2d2d7]/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#E65100]" />
                      <div>
                        <span className="text-xs font-bold text-[#1d1d1f] block">Credit / Debit Card</span>
                        <span className="text-[10px] text-[#86868b]">Visa, Mastercard, RuPay</span>
                      </div>
                    </div>
                    <input type="radio" name="payment" checked={paymentMethod === "card"} readOnly className="accent-[#E65100]" />
                  </label>

                  <label 
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === "netbanking" ? "border-[#E65100] bg-orange-50/20 ring-1 ring-[#E65100]" : "border-[#d2d2d7]/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-[#E65100]" />
                      <div>
                        <span className="text-xs font-bold text-[#1d1d1f] block">Net Banking</span>
                        <span className="text-[10px] text-[#86868b]">All major Indian banks supported</span>
                      </div>
                    </div>
                    <input type="radio" name="payment" checked={paymentMethod === "netbanking"} readOnly className="accent-[#E65100]" />
                  </label>
                </div>

                {/* Instant Communication Toggles */}
                <div className="pt-2 space-y-3">
                  <span className="text-xs font-bold text-[#1d1d1f] block">Instant Dispatches</span>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center justify-between p-3 rounded-xl bg-[#f5f5f7] text-xs cursor-pointer">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        WhatsApp Confirmation & Pandit Contacts
                      </span>
                      <input 
                        type="checkbox" 
                        checked={notifyWhatsapp} 
                        onChange={(e) => setNotifyWhatsapp(e.target.checked)}
                        className="accent-[#E65100]" 
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-[#f5f5f7] text-xs cursor-pointer">
                      <span className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-blue-600" />
                        SMS Transaction Receipt
                      </span>
                      <input 
                        type="checkbox" 
                        checked={notifySms} 
                        onChange={(e) => setNotifySms(e.target.checked)}
                        className="accent-[#E65100]" 
                      />
                    </label>
                  </div>
                </div>

                <Button 
                  onClick={handlePayAndConfirm} 
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  {isProcessing ? "Authorizing Payment..." : `Pay ₹${grandTotal.toLocaleString("en-IN")} & Confirm`}
                </Button>
              </Card>
            </div>

            {/* Right: Itemized Summary */}
            <div className="md:col-span-2">
              <Card className="p-6 bg-white rounded-3xl shadow-sm border border-[#d2d2d7]/50 space-y-4">
                <h2 className="text-sm font-bold text-[#1d1d1f]">Booking Summary</h2>

                <div className="space-y-1 text-xs border-b border-[#e5e5ea] pb-3">
                  <span className="font-semibold text-[#1d1d1f] block">{serviceTitle}</span>
                  <span className="text-[#86868b] block">{date} • {timeSlot}</span>
                  <span className="text-[#86868b] block truncate">{address}</span>
                </div>

                <div className="space-y-2 text-xs text-[#1d1d1f]">
                  <div className="flex justify-between">
                    <span className="text-[#86868b]">Ritual Dakshina</span>
                    <span>₹{basePrice.toLocaleString("en-IN")}</span>
                  </div>

                  {includeSamagri && (
                    <div className="flex justify-between">
                      <span className="text-[#86868b]">Samagri Kit</span>
                      <span>₹950</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-[#86868b]">Platform & Insurance</span>
                    <span>₹{platformFee}</span>
                  </div>

                  <div className="border-t border-[#e5e5ea] pt-2 flex justify-between font-bold text-sm text-[#1d1d1f]">
                    <span>Total Amount</span>
                    <span className="text-[#E65100]">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>100% Dakshina Money-back Guarantee</span>
                </div>
              </Card>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}