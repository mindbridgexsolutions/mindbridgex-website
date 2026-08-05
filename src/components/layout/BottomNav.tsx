"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Calendar, User, Shield } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide bottom nav on auth or admin pages
  if (pathname === "/auth" || pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    {
      label: "Ceremonies",
      href: "/services",
      icon: Sparkles,
      active: pathname.startsWith("/services") || pathname === "/",
    },
    {
      label: "Bookings",
      href: "/my-bookings",
      icon: Calendar,
      active: pathname === "/my-bookings",
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
      active: pathname === "/profile",
    },
    {
      label: "Admin",
      href: "/admin/login",
      icon: Shield,
      active: pathname.startsWith("/admin"),
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-[#d2d2d7]/50 px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition ${
                item.active
                  ? "text-[#E65100] font-bold"
                  : "text-[#86868b] hover:text-[#1d1d1f]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}