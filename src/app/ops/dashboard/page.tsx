'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  totalRevenue: number;
  totalBookings: number;
  pendingAllocations: number;
  completedBookings: number;
  activePandits: number;
}

interface RecentBooking {
  id: string;
  scheduledAt: string;
  venueAddress: string;
  totalPrice: number;
  status: string;
  panditName?: string;
  user: { name?: string; email: string };
  ceremony: { name: string; category: string };
}

export default function OpsDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/ops/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setRecentBookings(data.recentBookings);
      }
    } catch (err) {
      console.error('Failed to load ops stats:', err);
    } finally {
      setLoading(false);
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
    <div className="space-y-8">
      {/* Header Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Fulfillment Overview</h1>
        <p className="text-xs text-slate-400">
          Real-time metrics, booking dispatch queue, and scholar availability.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Gross Revenue
          </span>
          <div className="text-2xl font-bold text-amber-400">
            ₹{stats?.totalRevenue.toLocaleString('en-IN') || 0}
          </div>
          <span className="text-[10px] text-slate-500 block">Total processed payments</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Pending Dispatch
          </span>
          <div className="text-2xl font-bold text-rose-400">
            {stats?.pendingAllocations || 0}
          </div>
          <span className="text-[10px] text-slate-500 block">Bookings awaiting Pandit</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Active Pandits
          </span>
          <div className="text-2xl font-bold text-emerald-400">
            {stats?.activePandits || 0}
          </div>
          <span className="text-[10px] text-slate-500 block">Verified network scholars</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Completed Pujas
          </span>
          <div className="text-2xl font-bold text-slate-200">
            {stats?.completedBookings || 0}
          </div>
          <span className="text-[10px] text-slate-500 block">Successfully performed</span>
        </div>
      </div>

      {/* Dispatch Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-100">Live Booking Queue</h2>
            <p className="text-xs text-slate-400">Recent devotee requests needing operational dispatch</p>
          </div>
          <Link
            href="/ops/bookings"
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
          >
            Manage All Bookings →
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <p className="text-xs text-slate-500 py-8 text-center italic">No active bookings in queue.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Ceremony</th>
                  <th className="p-3">Devotee</th>
                  <th className="p-3">Schedule</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Assigned Pandit</th>
                  <th className="p-3 text-right rounded-r-xl">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 font-semibold text-slate-100">{b.ceremony.name}</td>
                    <td className="p-3">{b.user.name || b.user.email}</td>
                    <td className="p-3 text-slate-400">
                      {new Date(b.scheduledAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'COMPLETED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : b.status === 'CONFIRMED'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">
                      {b.panditName || <span className="text-rose-400 font-medium">Unassigned</span>}
                    </td>
                    <td className="p-3 text-right font-bold text-slate-100">
                      ₹{b.totalPrice.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
