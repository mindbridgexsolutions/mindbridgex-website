'use client';

import { useState } from 'react';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: 'Deepak Singh',
    email: 'devotee@vedasetu.org',
    subject: 'Muhurat & Timing Query',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: 'Muhurat & Timing Query', message: '' });
  };

  const faqs = [
    {
      q: 'How are Pandits verified on VedaSetu?',
      a: 'All scholars undergo rigorous background checks and Vedic knowledge assessments in Sanatana Vidhi, Mantra Chanting, and ritual accuracy before onboarding.',
    },
    {
      q: 'Is the Samagri Kit included with every booking?',
      a: 'Yes, most standard puja packages include a complete, purified Samagri Kit delivered directly by the assigned Pandit.',
    },
    {
      q: 'Can I reschedule a ceremony if the auspicious Muhurat changes?',
      a: 'Yes, you can request a reschedule up to 24 hours prior to the scheduled ceremony date without any extra charges.',
    },
    {
      q: 'How is the Dakshina paid to the Pandit?',
      a: 'Dakshina is transparently included in your booking total. No extra cash payments are requested by the Pandit at the venue.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Light Saffron Hero Banner */}
      <div className="bg-gradient-to-r from-orange-100/90 via-amber-100/70 to-orange-50/80 border border-amber-300/60 rounded-3xl p-6 sm:p-8 text-gray-900 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-400/30 text-orange-950 text-xs font-bold uppercase tracking-wider">
            <span>ॐ</span>
            <span>MindbridgeX Operations Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 tracking-tight">
            VedaSetu Concierge & Support Center
          </h1>
          <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-medium">
            Get assistance with Vedic ceremony planning, Muhurat alignments, scholar dispatch tracking, and custom Samagri requirements.
          </p>
        </div>

        <div className="px-4 py-2.5 bg-white/90 border border-orange-300/60 text-amber-950 font-semibold text-xs rounded-2xl font-mono shadow-2xs self-start sm:self-auto space-y-0.5">
          <span className="text-[10px] text-orange-800 uppercase tracking-wider block font-sans font-bold">Desk Hours</span>
          <span>Daily: 8:00 AM – 9:00 PM IST</span>
        </div>
      </div>

      {/* 3 Light Saffron Contact Channel Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 1. Phone Helpdesk */}
        <div className="bg-gradient-to-b from-orange-50/60 via-amber-50/30 to-white rounded-3xl p-6 sm:p-8 border border-orange-200/80 shadow-2xs space-y-6 flex flex-col justify-between items-center text-center hover:border-orange-400 transition">
          <div className="space-y-3 w-full">
            <div className="w-12 h-12 bg-orange-100 text-orange-900 border border-orange-200 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto shadow-2xs">
              📞
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wider block">Voice Hotline</span>
              <h3 className="font-extrabold text-amber-950 text-lg">Phone Helpdesk</h3>
            </div>
            <p className="text-xs text-amber-900/80 leading-relaxed font-medium">
              Scan with your mobile camera to instantly dial the MindbridgeX Hotline.
            </p>
          </div>

          {/* Clean Light Saffron QR Box */}
          <div className="p-3 bg-white rounded-2xl border border-orange-200/80 max-w-[180px] w-full space-y-2 shadow-2xs">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=tel:+919702100256"
              alt="Phone Hotline QR Code"
              className="w-full h-auto rounded-xl border border-orange-100"
            />
            <span className="text-[10px] font-bold text-orange-950 block font-mono">
              Scan to Call
            </span>
          </div>

          <div className="space-y-2 w-full">
            <span className="text-xs font-mono text-amber-950 font-bold block">
              +91 97021 00256
            </span>
            <a
              href="tel:9702100256"
              className="inline-block w-full text-center text-xs font-bold text-orange-950 bg-orange-200/80 hover:bg-orange-300/80 border border-orange-300/60 py-3 rounded-2xl transition shadow-2xs"
            >
              Call Hotline Directly
            </a>
          </div>
        </div>

        {/* 2. WhatsApp Concierge */}
        <div className="bg-gradient-to-b from-orange-50/60 via-amber-50/30 to-white rounded-3xl p-6 sm:p-8 border border-orange-200/80 shadow-2xs space-y-6 flex flex-col justify-between items-center text-center hover:border-orange-400 transition">
          <div className="space-y-3 w-full">
            <div className="w-12 h-12 bg-orange-100 text-orange-900 border border-orange-200 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto shadow-2xs">
              💬
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wider block">Instant Messaging</span>
              <h3 className="font-extrabold text-amber-950 text-lg">WhatsApp Concierge</h3>
            </div>
            <p className="text-xs text-amber-900/80 leading-relaxed font-medium">
              Scan with your phone camera or WhatsApp scanner to open live chat.
            </p>
          </div>

          {/* Clean Light Saffron QR Box */}
          <div className="p-3 bg-white rounded-2xl border border-orange-200/80 max-w-[180px] w-full space-y-2 shadow-2xs">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/919702100256"
              alt="WhatsApp Support QR Code"
              className="w-full h-auto rounded-xl border border-orange-100"
            />
            <span className="text-[10px] font-bold text-orange-950 block font-mono">
              Scan to Chat
            </span>
          </div>

          <div className="space-y-2 w-full">
            <span className="text-xs font-mono text-amber-950 font-bold block">
              MindbridgeX WhatsApp
            </span>
            <a
              href="https://wa.me/919702100256"
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full text-center text-xs font-bold text-orange-950 bg-orange-200/80 hover:bg-orange-300/80 border border-orange-300/60 py-3 rounded-2xl transition shadow-2xs"
            >
              Open Direct WhatsApp Chat
            </a>
          </div>
        </div>

        {/* 3. Email Inquiry Desk */}
        <div className="bg-gradient-to-b from-orange-50/60 via-amber-50/30 to-white rounded-3xl p-6 sm:p-8 border border-orange-200/80 shadow-2xs space-y-6 flex flex-col justify-between items-center text-center hover:border-orange-400 transition">
          <div className="space-y-3 w-full">
            <div className="w-12 h-12 bg-orange-100 text-orange-900 border border-orange-200 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto shadow-2xs">
              ✉️
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wider block">Written Support</span>
              <h3 className="font-extrabold text-amber-950 text-lg">Email Inquiry Desk</h3>
            </div>
            <p className="text-xs text-amber-900/80 leading-relaxed font-medium">
              Scan with your phone camera to draft an email inquiry directly.
            </p>
          </div>

          {/* Clean Light Saffron QR Box */}
          <div className="p-3 bg-white rounded-2xl border border-orange-200/80 max-w-[180px] w-full space-y-2 shadow-2xs">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=mailto:support@mindbridgex.in?subject=VedaSetu%20Support%20Inquiry"
              alt="Email Desk QR Code"
              className="w-full h-auto rounded-xl border border-orange-100"
            />
            <span className="text-[10px] font-bold text-orange-950 block font-mono">
              Scan to Email
            </span>
          </div>

          <div className="space-y-2 w-full">
            <span className="text-xs font-mono text-amber-950 font-bold block">
              support@mindbridgex.in
            </span>
            <a
              href="mailto:support@mindbridgex.in"
              className="inline-block w-full text-center text-xs font-bold text-orange-950 bg-orange-200/80 hover:bg-orange-300/80 border border-orange-300/60 py-3 rounded-2xl transition shadow-2xs"
            >
              Compose Email
            </a>
          </div>
        </div>

      </div>

      {/* 2-Column Section: Inquiry Ticket Form & FAQs Accordion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-200/70 shadow-2xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-amber-950">Submit an Inquiry Ticket</h3>
            <p className="text-xs text-amber-900/70 mt-0.5">
              Submit your message and our ceremony coordination team will respond within 2 hours.
            </p>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2">
              <span>✓</span>
              <span>Inquiry ticket submitted successfully! Our representative will contact you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-orange-950 font-bold uppercase tracking-wider block mb-1">
                Devotee Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-orange-50/40 border border-orange-200 rounded-xl p-3 text-amber-950 focus:outline-hidden focus:border-orange-500 font-semibold"
              />
            </div>

            <div>
              <label className="text-orange-950 font-bold uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-orange-50/40 border border-orange-200 rounded-xl p-3 text-amber-950 focus:outline-hidden focus:border-orange-500 font-semibold"
              />
            </div>

            <div>
              <label className="text-orange-950 font-bold uppercase tracking-wider block mb-1">
                Query Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-orange-50/40 border border-orange-200 rounded-xl p-3 text-amber-950 focus:outline-hidden focus:border-orange-500 font-semibold"
              >
                <option value="Muhurat & Timing Query">Muhurat & Timing Query</option>
                <option value="Samagri Kit Customization">Samagri Kit Customization</option>
                <option value="Pandit Allocation Status">Pandit Allocation Status</option>
                <option value="Payment & Dakshina Issue">Payment & Dakshina Issue</option>
              </select>
            </div>

            <div>
              <label className="text-orange-950 font-bold uppercase tracking-wider block mb-1">
                Message / Specific Vidhi Notes
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your inquiry or special requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-orange-50/40 border border-orange-200 rounded-xl p-3 text-amber-950 focus:outline-hidden focus:border-orange-500 font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs transition shadow-2xs"
            >
              Submit Support Ticket
            </button>
          </form>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-200/70 shadow-2xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-amber-950">Frequently Asked Questions</h3>
            <p className="text-xs text-amber-900/70 mt-0.5">
              Quick answers regarding bookings, Pandit dispatch, and Samagri kits.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-orange-200/60 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left text-xs font-bold text-amber-950 bg-orange-50/30 hover:bg-orange-50/80 flex items-center justify-between transition"
                  >
                    <span>{faq.q}</span>
                    <span className="text-orange-800 text-sm font-bold">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white text-xs text-amber-900/80 border-t border-orange-100 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
