import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] border-t border-[#d2d2d7]/30 text-[#1d1d1f] pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#d2d2d7]/40">
        
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E65100]/10 text-[#E65100] flex items-center justify-center font-bold text-lg">
              ॐ
            </div>
            <span className="text-xl font-bold tracking-tight">VedaSetu</span>
          </div>
          <p className="text-sm text-[#86868b] leading-relaxed">
            Connecting Faith with Technology. Bringing devotion closer through verified priests and authentic spiritual services. A platform by MindBridgeX Solutions Pvt. Ltd.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-[#1d1d1f]">Platform</h4>
          <ul className="space-y-2 text-sm text-[#86868b]">
            <li><Link href="/" className="hover:text-[#E65100] transition">Home</Link></li>
            <li><Link href="/services" className="hover:text-[#E65100] transition">Spiritual Services</Link></li>
            <li><Link href="/pandits" className="hover:text-[#E65100] transition">Verified Pandit Directory</Link></li>
            <li><Link href="/dashboard" className="hover:text-[#E65100] transition">User Dashboard</Link></li>
          </ul>
        </div>

        {/* Legal & Trust */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-[#1d1d1f]">Trust & Safety</h4>
          <ul className="space-y-2 text-sm text-[#86868b]">
            <li><span className="hover:text-[#E65100] cursor-pointer">Pandit Verification Standards</span></li>
            <li><span className="hover:text-[#E65100] cursor-pointer">Secure Razorpay Payments</span></li>
            <li><span className="hover:text-[#E65100] cursor-pointer">Privacy Policy</span></li>
            <li><span className="hover:text-[#E65100] cursor-pointer">Terms of Service</span></li>
          </ul>
        </div>

        {/* Direct Contact */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-[#1d1d1f]">Direct Support</h4>
          <div className="space-y-3 text-sm text-[#86868b]">
            <a href="tel:9702100256" className="flex items-center gap-2 hover:text-[#E65100] transition">
              <Phone className="w-4 h-4 text-[#E65100]" />
              +91 9702100256
            </a>
            <a href="mailto:mindbridgexsolutions@gmail.com" className="flex items-center gap-2 hover:text-[#E65100] transition">
              <Mail className="w-4 h-4 text-[#E65100]" />
              mindbridgexsolutions@gmail.com
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E65100]" />
              MindBridgeX Solutions Pvt. Ltd.
            </div>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#86868b]">
        <p>&copy; {new Date().getFullYear()} VedaSetu (MindBridgeX Solutions Pvt. Ltd.). All rights reserved.</p>
        <p>Designed for Enterprise Trust & Devotion.</p>
      </div>
    </footer>
  );
}