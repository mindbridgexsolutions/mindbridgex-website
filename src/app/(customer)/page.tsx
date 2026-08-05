'use client';

import Link from 'next/link';

export default function HomePage() {
  const features = [
    {
      icon: '🛕',
      title: 'Gurukul-Vetted Pandits',
      description:
        'Every scholar is vetted for Sanskrit chanting accuracy, ritual purity, and authentic Sanatana Vidhi knowledge.',
    },
    {
      icon: '🌿',
      title: 'Pure Samagri Included',
      description:
        'Optionally delivered directly by your assigned Pandit—purified, organic, and traditionally sourced.',
    },
    {
      icon: '📜',
      title: 'Sankalp & Gotra Alignment',
      description:
        'Provide your family Gotra and names to ensure precise mantra recitation during your ceremony.',
    },
    {
      icon: '⚖️',
      title: 'Transparent Dakshina',
      description:
        'Fixed and honest pricing with no hidden charges or unexpected cash requests at your residence.',
    },
  ];

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Premium Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xl border border-amber-800/40">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <span>ॐ</span>
            <span>Sacred Vedic Services</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-amber-50 leading-tight">
            Authentic Vedic Ceremonies at Your Doorstep
          </h1>

          <p className="text-sm sm:text-base text-amber-200/90 leading-relaxed">
            Connect with verified Acharyas for Griha Pravesh, Havan, Jaap, and Mahapujas performed strictly as per Sanatana Vidhi scriptures.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm rounded-2xl transition shadow-md flex items-center gap-2"
            >
              <span>Explore Sacred Catalog</span>
              <span>→</span>
            </Link>

            <Link
              href="/pandits"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-amber-100 font-bold text-xs sm:text-sm rounded-2xl border border-amber-300/30 transition backdrop-blur-md"
            >
              Meet Verified Scholars
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Metrics Section (Scaled for Launch Premiumness) */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-b from-orange-50/70 to-white rounded-3xl p-6 border border-orange-200/70 text-center space-y-1 shadow-2xs">
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-950 block font-mono">
            50+
          </span>
          <span className="text-xs font-bold text-orange-950 uppercase tracking-wider block">
            Verified Vedic Pandits
          </span>
          <p className="text-[11px] text-amber-900/70 font-medium pt-1">
            Gurukul-certified Acharyas & Shastri scholars
          </p>
        </div>

        <div className="bg-gradient-to-b from-orange-50/70 to-white rounded-3xl p-6 border border-orange-200/70 text-center space-y-1 shadow-2xs">
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-950 block font-mono">
            500+
          </span>
          <span className="text-xs font-bold text-orange-950 uppercase tracking-wider block">
            Successful Pujas Conducted
          </span>
          <p className="text-[11px] text-amber-900/70 font-medium pt-1">
            Harmonious rituals performed across residential venues
          </p>
        </div>

        <div className="bg-gradient-to-b from-orange-50/70 to-white rounded-3xl p-6 border border-orange-200/70 text-center space-y-1 shadow-2xs">
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-950 block font-mono">
            4.9 / 5.0
          </span>
          <span className="text-xs font-bold text-orange-950 uppercase tracking-wider block">
            Devotee Satisfaction Rating
          </span>
          <p className="text-[11px] text-amber-900/70 font-medium pt-1">
            Praised for mantra clarity & authentic Vidhi execution
          </p>
        </div>
      </section>

      {/* Why Choose VedaSetu */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-orange-800 uppercase tracking-widest px-3 py-1 bg-orange-100 rounded-full">
            Our Sanatana Commitment
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Purity in Every Chant & Ritual
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Designed to bring peace, prosperity, and divine alignment to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-orange-200/70 shadow-2xs hover:shadow-md transition space-y-3"
            >
              <div className="w-12 h-12 bg-orange-100 text-amber-950 rounded-2xl flex items-center justify-center text-xl font-bold">
                {f.icon}
              </div>
              <h3 className="font-extrabold text-gray-900 text-base">{f.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Single Unified Bottom CTA & Assistance Banner */}
      <section className="bg-gradient-to-r from-orange-100/90 via-amber-100/80 to-orange-50/90 border border-orange-300/70 rounded-3xl p-8 sm:p-10 text-gray-900 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-bold text-orange-950 uppercase tracking-widest px-3 py-1 bg-white/80 rounded-full border border-orange-200">
            MindbridgeX Support Desk
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-amber-950">
            Need Guidance Choosing a Ceremony or Muhurat?
          </h3>
          <p className="text-xs text-amber-900/80 font-medium leading-relaxed">
            Our ceremony coordination desk is available daily from 8:00 AM to 9:00 PM IST. Reach us directly at{' '}
            <a
              href="mailto:support@mindbridgex.in"
              className="font-bold text-orange-950 underline hover:text-orange-700 font-mono"
            >
              support@mindbridgex.in
            </a>{' '}
            or call{' '}
            <a href="tel:9702100256" className="font-bold text-orange-950 underline font-mono">
              +91 97021 00256
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <Link
            href="/support"
            className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-2xl transition shadow-2xs text-center"
          >
            Open Support Center
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-amber-50 text-amber-950 font-bold text-xs rounded-2xl border border-orange-300/80 transition text-center"
          >
            Book Puja Now
          </Link>
        </div>
      </section>
    </div>
  );
}
