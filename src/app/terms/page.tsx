"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-slate-600">Last Updated: July 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing the MindBridgeX Solutions website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services or website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Intellectual Property</h2>
            <p>
              The content, design, architecture, and code of this website are the exclusive property of MindBridgeX Solutions Pvt Ltd. Our custom software products and SaaS platforms are protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Service Delivery</h2>
            <p>
              For clients engaging in our Custom Software, Cloud, or AI services, specific deliverables, timelines, and payment structures will be outlined in a separate Master Service Agreement (MSA) signed before project commencement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Limitation of Liability</h2>
            <p>
              MindBridgeX Solutions shall not be held liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services, website, or third-party integrations.
            </p>
          </section>

          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Need Clarification?</h2>
            <p className="mb-4">If you need clarification regarding our terms of engagement or service contracts, please reach out to our legal department.</p>
            <Link href="/contact" className="text-mindbridge-accent font-bold hover:underline">
              Contact Legal Team &rarr;
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}