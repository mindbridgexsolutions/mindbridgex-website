"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-[#d2d2d7]/50 top-0 text-[#1d1d1f] font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link href="/" className="text-xl font-bold tracking-tight">
            MindBridgeX
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/" className="hover:text-[#0071e3] transition">Home</Link>
            <Link href="/services" className="hover:text-[#0071e3] transition">Services</Link>
            <Link href="/products" className="hover:text-[#0071e3] transition">Products</Link>
            <Link href="/about" className="hover:text-[#0071e3] transition">About</Link>
            <Link href="/careers" className="hover:text-[#0071e3] transition">Careers</Link>
          </div>

          {/* CONTACT BUTTON (Desktop) */}
          <div className="hidden md:flex">
            <Link href="/contact" className="bg-[#0071e3] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#0077ed] transition">
              Contact Us
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#d2d2d7]/50 px-6 py-4 space-y-4 font-medium">
          <Link href="/" className="block hover:text-[#0071e3]" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/services" className="block hover:text-[#0071e3]" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/products" className="block hover:text-[#0071e3]" onClick={() => setIsOpen(false)}>Products</Link>
          <Link href="/about" className="block hover:text-[#0071e3]" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/careers" className="block hover:text-[#0071e3]" onClick={() => setIsOpen(false)}>Careers</Link>
          <Link href="/contact" className="block text-[#0071e3]" onClick={() => setIsOpen(false)}>Contact Us</Link>
        </div>
      )}
    </nav>
  );
}