"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { User, LogOut, Calendar, Sparkles } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/v1/auth/logout", {
        method: "POST",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#d2d2d7]/30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#E65100]/10 text-[#E65100] flex items-center justify-center font-bold text-lg">
            ॐ
          </div>
          <div>
            <span className="text-lg font-bold text-[#1d1d1f] tracking-tight block">VedaSetu</span>
            <span className="text-[10px] text-[#86868b] tracking-wider uppercase block -mt-1">MindBridgeX</span>
          </div>
        </Link>

        {/* Customer MVP Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1d1d1f]">
          <Link href="/services" className="hover:text-[#E65100] transition flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#E65100]" /> Services Catalog
          </Link>
          <Link href="/my-bookings" className="hover:text-[#E65100] transition flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#E65100]" /> My Bookings
          </Link>
          <Link href="/profile" className="hover:text-[#E65100] transition flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#E65100]" /> Profile
          </Link>
        </nav>

        {/* Auth CTAs */}
        <div className="flex items-center gap-3">
          <Link href="/auth">
            <Button size="sm" variant="outline">
              Sign In
            </Button>
          </Link>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-xs text-[#86868b] hover:text-red-600"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            {loggingOut ? "..." : "Logout"}
          </Button>
        </div>

      </div>
    </header>
  );
}