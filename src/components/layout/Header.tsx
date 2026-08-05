"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, Calendar, User, Shield, LogOut } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide header on auth page
  if (pathname === "/auth" || pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/v1/auth/logout", { method: "POST" });
      if (res.ok) {
        window.location.href = "/auth";
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#d2d2d7]/50 px-6 py-3.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/services" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-[#E65100] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-[#1d1d1f] block leading-none">
              VedaSetu
            </span>
            <span className="text-[10px] text-[#86868b] tracking-wide font-medium">
              Vedic Services
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#f5f5f7] p-1 rounded-full border border-gray-200/60">
          <Link
            href="/services"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              pathname.startsWith("/services") || pathname === "/"
                ? "bg-white text-[#E65100] shadow-sm"
                : "text-[#86868b] hover:text-[#1d1d1f]"
            }`}
          >
            Ceremonies
          </Link>
          <Link
            href="/my-bookings"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              pathname === "/my-bookings"
                ? "bg-white text-[#E65100] shadow-sm"
                : "text-[#86868b] hover:text-[#1d1d1f]"
            }`}
          >
            My Bookings
          </Link>
          <Link
            href="/profile"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              pathname === "/profile"
                ? "bg-white text-[#E65100] shadow-sm"
                : "text-[#86868b] hover:text-[#1d1d1f]"
            }`}
          >
            Profile
          </Link>
        </nav>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin/login"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition"
          >
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>Admin</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

      </div>
    </header>
  );
}