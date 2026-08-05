'use client';

import { useState, useEffect } from 'react';

interface Pandit {
  id: string;
  name: string;
  phone: string;
  city: string;
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
  user?: {
    name: string;
    email: string;
    phone: string;
  };
  ceremony: {
    name: string;
    category: string;
    durationMinutes: number;
  };
}

export default function OpsBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsRes, panditsRes] = await Promise.all([
        fetch('/api/ops/bookings'),
        fetch('/api/ops/pandits'),
      ]);

      const bookingsData = await bookingsRes.json();
      const panditsData = await panditsRes.json();

      if (bookingsData.success) {
        setBookings(bookingsData.bookings);
      }

      if (panditsData.success) {
        setPandits(panditsData.pandits.filter((p: Pandit) => (p as any).active));
      }
    } catch (err) {
      console.error('Failed to load ops dispatch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignPandit = async (bookingId: string, panditId: string) => {
    setAssigningId(bookingId);
    try {
      const res = await fetch('/api/ops/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bookingId, panditId }),
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      console.error('Failed to assign scholar:', err);
    } finally {
      setAssigningId(null);
    }
  };

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      const res = await fetch('/api/ops/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bookingId, status }),
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Bookings & Scholar Dispatch Control</h1>
        <p className="text-xs text-slate-400">
          Assign active Pandits to incoming devotee requests and update ceremony progress.
        </p>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Booking Ref</th>
                <th className="p-4">Devotee Details</th>
                <th className="p-4">Ceremony</th>
                <th className="p-4">Muhurat Date</th>
                <th className="p-4">Assigned Scholar</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Dispatch Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono text-[11px] text-amber-400 font-bold">
                    #{b.id.slice(0, 8).toUpperCase()}
                  </td>

                  {/* Dynamic Devotee Info */}
                  <td className="p-4">
                    <span className="font-bold text-slate-100 block">
                      {b.user?.name || 'Devotee User'}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {b.user?.email || 'devotee@vedasetu.org'}
                    </span>
                    {b.user?.phone && (
                      <span className="text-[10px] text-amber-500 block font-mono font-bold">
                        {b.user.phone}
                      </span>
                    )}
                  </td>

                  <td className="p-4 font-bold text-slate-200">
                    <div>{b.ceremony?.name}</div>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {b.ceremony?.category} • {b.ceremony?.durationMinutes}m
                    </span>
                  </td>

                  <td className="p-4 font-mono text-slate-400">
                    {new Date(b.scheduledAt).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>

                  <td className="p-4">
                    {b.panditName ? (
                      <div>
                        <span className="font-bold text-emerald-400 block">🛕 {b.panditName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{b.panditPhone}</span>
                      </div>
                    ) : (
                      <span className="text-amber-500/80 italic font-semibold text-[11px]">
                        ⚠️ Unassigned
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        b.status === 'COMPLETED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : b.status === 'DISPATCHED'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    {/* Pandit Assignment Dropdown */}
                    <select
                      disabled={assigningId === b.id}
                      value=""
                      onChange={(e) => handleAssignPandit(b.id, e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg text-xs p-1.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                    >
                      <option value="" disabled>
                        {b.panditName ? 'Reassign Scholar' : 'Assign Scholar'}
                      </option>
                      {pandits.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.city})
                        </option>
                      ))}
                    </select>

                    {/* Status Toggle Button */}
                    {b.status !== 'COMPLETED' && (
                      <button
                        onClick={() => handleUpdateStatus(b.id, 'COMPLETED')}
                        className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold transition"
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
