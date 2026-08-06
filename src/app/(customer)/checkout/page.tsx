'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  const serviceName = searchParams.get('name') || 'Vedic Ceremony';
  const price = searchParams.get('price') || '2500';

  const [formData, setFormData] = useState({
    name: 'Deepak Singh',
    phone: '',
    gotra: '',
    address: '',
    city: 'Mumbai',
    preferredDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/v1/customer/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ceremonyId: serviceId,
          ceremonyName: serviceName,
          amount: Number(price),
          ...formData,
        }),
      });

      const data = await res.json();
      if (data.success || res.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error('Checkout Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6 bg-white rounded-3xl border border-orange-200/80 shadow-2xs">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-3xl mx-auto">
          ✓
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950">
          Booking Request Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-md mx-auto font-medium">
          Your Sankalp details for <span className="font-bold text-amber-950">{serviceName}</span> have been registered. Our operations team will assign a verified Acharya shortly.
        </p>
        <a
          href="/support"
          className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-2xl transition shadow-2xs"
        >
          View Booking Support Desk
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      <div className="bg-gradient-to-r from-orange-100/90 via-amber-100/70 to-orange-50/80 border border-orange-200 rounded-3xl p-6 sm:p-8 space-y-2">
        <span className="text-[10px] font-bold text-orange-950 uppercase tracking-widest px-3 py-1 bg-white/80 rounded-full border border-orange-200">
          Sankalp & Event Details
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950">
          Reserve Ceremony: {serviceName}
        </h1>
        <p className="text-xs text-amber-900/80 font-mono font-bold">
          Estimated Dakshina: ₹{price}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-orange-200/70 shadow-2xs space-y-4 text-xs">
        <div>
          <label className="text-orange-950 font-bold uppercase tracking-wider block mb-1">
            Devotee Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-orange-50/40 border border-orange-200 rounded-xl p-3 text-amber-950 focus:outline-hidden focus:border-orange-500 font-semibold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-orange-950 font-bold uppercase tracking-wider block mb-1">
              Contact Mobile Number
            </label>
            <input
              type="tel"
              required
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-orange-50/40 border border-orange-200 rounded-xl p-3 text-amber-950 focus:outline-hidden focus:border-orange-500 font-semibold"
            />
          </div>

          <div>
            <label className="text-orange-950 font-bold uppercase tracking-wider block mb-1">
              Family Gotra (Sankalp)
            </label>
            <input
              type="text"
              placeholder="e.g. Kashyap / Bharadwaj"
              value={formData.gotra}
              onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
              className="w-full bg-orange-50/40 border border-orange-200 rounded-xl p-3 text-amber-950 focus:outline-hidden focus:border-orange-500 font-semibold"
            />
          </div>
        </div>

        <div>
          <label className="text-orange-950 font-bold uppercase tracking-wider block mb-1">
            Ceremony Venue Address
          </label>
          <textarea
            rows={3}
            required
            placeholder="Full residence address where ceremony will take place..."
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full bg-orange-50/40 border border-orange-200 rounded-xl p-3 text-amber-950 focus:outline-hidden focus:border-orange-500 font-semibold"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs transition shadow-2xs disabled:opacity-50"
        >
          {loading ? 'Processing Sankalp...' : 'Confirm Ceremony Booking'}
        </button>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
