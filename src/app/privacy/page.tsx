"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white text-[#1d1d1f] font-sans min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-20 text-center">
          <div className="w-20 h-20 bg-[#f5f5f7] text-[#0071e3] rounded-full flex items-center justify-center mx-auto mb-8">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6">Privacy Policy.</h1>
          <p className="text-xl text-[#86868b]">Last Updated: July 2026</p>
        </div>

        {/* CONTENT */}
        <div className="space-y-12 text-lg text-[#86868b] leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">1. Information We Collect</h2>
            <p>
              At MindBridgeX Solutions, we take your privacy seriously. We collect information that you voluntarily provide to us when you fill out contact forms, apply for careers, or request a demo. This includes your name, email address, phone number, and project details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">2. How We Use Your Information</h2>
            <p>
              We use the collected information solely to communicate with you regarding your project inquiries, deliver our IT services, and improve our website experience. We do not sell, rent, or share your personal data with any third-party marketing agencies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">3. Data Security</h2>
            <p>
              We implement enterprise-grade security measures to maintain the safety of your personal information. All data transmitted through our website is encrypted using standard Secure Socket Layer (SSL) technology.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">4. Cookies and Tracking</h2>
            <p>
              Our website uses basic cookies to enhance user experience and analyze site traffic. You can choose to disable cookies through your browser settings, though some site features may not function properly without them.
            </p>
          </section>

          {/* CONTACT BOX */}
          <section className="bg-[#f5f5f7] p-10 md:p-14 rounded-[2rem] mt-16 text-center">
            <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">Questions about your privacy?</h2>
            <p className="mb-8 max-w-lg mx-auto">If you have any questions about this Privacy Policy, please contact our compliance team.</p>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#0071e3] text-white rounded-full font-medium hover:bg-[#0077ed] transition">
              Contact Compliance Team
            </Link>
          </section>
        </div>

      </div>
    </div>
  );
}