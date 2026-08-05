'use client';

import { useState, useEffect } from 'react';

interface Ceremony {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  durationMinutes: number;
  description: string;
}

interface Booking {
  id: string;
  scheduledAt: string;
  totalPrice: number;
  status: string;
  venueAddress: string;
  notes: string | null;
  panditName: string | null;
  panditPhone: string | null;
  ceremony: { name: string; category: string; durationMinutes: number };
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [ceremonies, setCeremonies] = useState<Ceremony[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    ceremonyId: '',
    scheduledAt: '',
    venueAddress: 'Kandivali East, Mumbai, Maharashtra',
    notes: 'Family Gotra: Kashyapa. Please bring full Samagri Kit.',
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [bookingsRes, servicesRes] = await Promise.all([
        fetch('/api/ops/bookings'),
        fetch('/api/ops/services'),
      ]);

      const bookingsData = await bookingsRes.json();
      const servicesData = await servicesRes.json();

      if (bookingsData.success) {
        setBookings(bookingsData.bookings);
        if (bookingsData.bookings.length > 0) {
          setSelectedBooking(bookingsData.bookings[0]);
        }
      }

      if (servicesData.success && servicesData.ceremonies.length > 0) {
        setCeremonies(servicesData.ceremonies);
        setFormData((prev) => ({ ...prev, ceremonyId: servicesData.ceremonies[0].id }));
      }
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedCeremonyObj = ceremonies.find((c) => c.id === formData.ceremonyId) || ceremonies[0];

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.scheduledAt) {
      setErrorMessage('Please select a scheduled date and time.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/v1/customer/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to reserve ceremony.');
        return;
      }

      setIsModalOpen(false);
      setStep(1);
      fetchInitialData();
    } catch (err) {
      console.error('Failed to create booking:', err);
      setErrorMessage('Network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <span>ॐ</span>
            <span>Devotee Ritual Timeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-50">
            My Ceremony Bookings
          </h1>
          <p className="text-xs text-amber-200/80">
            Track scholar dispatch status, venue details, and ritual completion schedules.
          </p>
        </div>

        <button
          onClick={() => {
            setStep(1);
            setErrorMessage(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs rounded-xl transition shadow-2xs self-start sm:self-auto whitespace-nowrap flex items-center gap-2"
        >
          <span>✦</span>
          <span>Book New Ceremony</span>
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-amber-100 space-y-3">
          <p className="text-sm font-semibold text-gray-600">No active ceremony bookings found.</p>
          <button
            onClick={() => {
              setStep(1);
              setIsModalOpen(true);
            }}
            className="px-5 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl shadow-2xs"
          >
            Reserve Your First Puja
          </button>
        </div>
      ) : (
        /* 2-Column Dashboard Layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Booking List */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
              Your Ceremonies ({bookings.length})
            </h2>

            <div className="space-y-3">
              {bookings.map((b) => {
                const isSelected = selectedBooking?.id === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    className={`w-full text-left p-5 rounded-3xl border transition space-y-2 ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-300 shadow-2xs'
                        : 'bg-white border-amber-100 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-full uppercase">
                        {b.ceremony?.category || 'Puja'}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          b.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-200 text-amber-950'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-sm">{b.ceremony?.name}</h3>

                    <div className="text-xs text-gray-500 flex items-center justify-between font-mono pt-1">
                      <span>🗓️ {new Date(b.scheduledAt).toLocaleDateString('en-IN')}</span>
                      <span className="font-bold text-gray-900">₹{b.totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Active Detail Panel */}
          {selectedBooking && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-400 font-mono block">
                      BOOKING ID: {selectedBooking.id.slice(0, 8).toUpperCase()}
                    </span>
                    <h2 className="text-xl font-extrabold text-gray-900">
                      {selectedBooking.ceremony?.name}
                    </h2>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${
                      selectedBooking.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}
                  >
                    Status: {selectedBooking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase block">Scheduled Date & Time</span>
                    <span className="font-bold text-gray-900 block font-mono">
                      🗓️ {new Date(selectedBooking.scheduledAt).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-1">
                    <span className="text-[10px] text-amber-800 font-bold uppercase block">
                      Assigned Pandit / Scholar
                    </span>
                    <span className="font-bold text-amber-950 block text-sm">
                      🛕 {selectedBooking.panditName || 'Assigning Scholar...'}
                    </span>
                    {selectedBooking.panditPhone && (
                      <span className="text-xs text-amber-800 font-mono block font-bold">
                        📞 {selectedBooking.panditPhone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Venue / Home Address</span>
                  <p className="font-semibold text-gray-800">{selectedBooking.venueAddress}</p>
                </div>

                {selectedBooking.notes && (
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase block">Sankalp & Family Notes</span>
                    <p className="font-semibold text-gray-800">{selectedBooking.notes}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                      Total Dakshina Paid
                    </span>
                    <span className="text-xl font-extrabold text-gray-900">
                      ₹{selectedBooking.totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <a
                    href="/support"
                    className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl transition"
                  >
                    Need Help With Booking?
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modern Interactive Booking Drawer / Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-amber-100 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 p-6 text-white flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300 text-[10px] font-bold uppercase tracking-widest">
                  <span>ॐ</span>
                  <span>Interactive Ceremony Booking</span>
                </div>
                <h3 className="text-xl font-extrabold text-amber-50">
                  Reserve Sacred Vidhi
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Stepper Progress Indicator */}
            <div className="bg-amber-50/80 border-b border-amber-100/80 px-6 py-3 flex items-center justify-between text-xs font-bold">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-900' : 'text-gray-400'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-amber-600 text-white' : 'bg-amber-200 text-amber-900'}`}>1</span>
                <span>Select Ritual</span>
              </button>
              <span className="text-gray-300">→</span>
              <button
                onClick={() => setStep(2)}
                className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-900' : 'text-gray-400'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-amber-600 text-white' : 'bg-amber-200 text-amber-900'}`}>2</span>
                <span>Muhurat & Venue</span>
              </button>
              <span className="text-gray-300">→</span>
              <button
                onClick={() => setStep(3)}
                className={`flex items-center gap-2 ${step >= 3 ? 'text-amber-900' : 'text-gray-400'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-amber-600 text-white' : 'bg-amber-200 text-amber-900'}`}>3</span>
                <span>Confirm Sankalp</span>
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleCreateBooking} className="p-6 overflow-y-auto space-y-6 flex-1">
              {errorMessage && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl font-bold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: Interactive Ceremony Card Grid */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">Choose Sacred Ceremony</h4>
                    <p className="text-xs text-gray-500">
                      Select the puja or vidhi you wish to perform at your residence.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ceremonies.map((c) => {
                      const isSelected = formData.ceremonyId === c.id;
                      return (
                        <div
                          key={c.id}
                          onClick={() => setFormData({ ...formData, ceremonyId: c.id })}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition space-y-2 ${
                            isSelected
                              ? 'bg-amber-50/90 border-amber-600 shadow-2xs'
                              : 'bg-white border-gray-100 hover:border-amber-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                              {c.category}
                            </span>
                            <span className="text-xs font-mono font-bold text-gray-500">
                              ⏱️ {c.durationMinutes || 90}m
                            </span>
                          </div>

                          <h5 className="font-bold text-gray-900 text-sm">{c.name}</h5>

                          <div className="flex items-center justify-between pt-2 border-t border-gray-100/60">
                            <span className="text-[10px] text-gray-400 font-bold uppercase">Dakshina</span>
                            <span className="text-sm font-extrabold text-amber-900">
                              ₹{c.basePrice.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition shadow-2xs flex items-center gap-2"
                    >
                      <span>Continue to Muhurat Selection</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Muhurat & Location */}
              {step === 2 && (
                <div className="space-y-5 text-xs">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">Auspicious Date & Venue Address</h4>
                    <p className="text-xs text-gray-500">
                      Pick your desired ceremony date and provide your home location.
                    </p>
                  </div>

                  {/* Scheduled Date & Time Picker */}
                  <div className="space-y-1.5">
                    <label className="text-gray-700 font-bold block">
                      Scheduled Date & Muhurat Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                      className="w-full bg-amber-50/40 border border-amber-200 rounded-xl p-3 text-gray-900 font-semibold focus:outline-hidden focus:border-amber-600"
                    />
                  </div>

                  {/* Venue Address */}
                  <div className="space-y-1.5">
                    <label className="text-gray-700 font-bold block">
                      Venue / Residential Address
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Enter full residential address where ceremony will take place..."
                      value={formData.venueAddress}
                      onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                      className="w-full bg-amber-50/40 border border-amber-200 rounded-xl p-3 text-gray-900 font-semibold focus:outline-hidden focus:border-amber-600"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-200 transition"
                    >
                      ← Back
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.scheduledAt) {
                          setErrorMessage('Please pick a date & time before proceeding.');
                          return;
                        }
                        setErrorMessage(null);
                        setStep(3);
                      }}
                      className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition shadow-2xs flex items-center gap-2"
                    >
                      <span>Proceed to Sankalp Notes</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Family Sankalp & Dynamic Summary */}
              {step === 3 && (
                <div className="space-y-5 text-xs">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">Review & Family Sankalp</h4>
                    <p className="text-xs text-gray-500">
                      Add family Gotra details or special vidhi requirements for the assigned Pandit.
                    </p>
                  </div>

                  {/* Sankalp Notes Input */}
                  <div className="space-y-1.5">
                    <label className="text-gray-700 font-bold block">
                      Sankalp & Family Gotra Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kashyapa Gotra, include extra Hawan Samagri..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-amber-50/40 border border-amber-200 rounded-xl p-3 text-gray-900 font-semibold focus:outline-hidden focus:border-amber-600"
                    />
                  </div>

                  {/* Summary Card */}
                  {selectedCeremonyObj && (
                    <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-3">
                      <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                        Ceremony Reservation Summary
                      </span>

                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-sm">
                          {selectedCeremonyObj.name}
                        </span>
                        <span className="font-extrabold text-amber-950 text-base">
                          ₹{selectedCeremonyObj.basePrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="text-[11px] text-gray-600 space-y-1 pt-2 border-t border-amber-200/60 font-mono">
                        <p>📍 Venue: {formData.venueAddress}</p>
                        <p>🗓️ Time: {formData.scheduledAt ? new Date(formData.scheduledAt).toLocaleString('en-IN') : 'Not Set'}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-200 transition"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition shadow-md flex items-center gap-2"
                    >
                      <span>✦</span>
                      <span>{submitting ? 'Reserving...' : 'Confirm Ceremony Reservation'}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
