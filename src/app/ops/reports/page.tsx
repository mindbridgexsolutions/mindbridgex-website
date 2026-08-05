'use client';

import { useState, useEffect } from 'react';

interface CategoryData {
  category: string;
  bookingsCount: number;
  revenue: number;
}

interface Analytics {
  fulfillmentRate: number;
  completionRate: number;
  totalBookingsCount: number;
  categoryBreakdown: CategoryData[];
}

export default function OpsReportsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/ops/reports');
      const data = await res.json();
      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (err) {
      console.error('Failed to load ops reports:', err);
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Analytics & Demand Reports</h1>
        <p className="text-xs text-slate-400">
          Distribution of ceremony demand, scholar dispatch efficiency, and fulfillment rates.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Scholar Allocation Rate
          </span>
          <div className="text-2xl font-bold text-emerald-400">
            {analytics?.fulfillmentRate || 0}%
          </div>
          <span className="text-[10px] text-slate-500 block">Bookings with assigned Pandit</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Puja Completion Rate
          </span>
          <div className="text-2xl font-bold text-amber-400">
            {analytics?.completionRate || 0}%
          </div>
          <span className="text-[10px] text-slate-500 block">Successfully performed rituals</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Demand Volume
          </span>
          <div className="text-2xl font-bold text-slate-200">
            {analytics?.totalBookingsCount || 0} Pujas
          </div>
          <span className="text-[10px] text-slate-500 block">Lifetime processed requests</span>
        </div>
      </div>

      {/* Demand Breakdown Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-100">Ceremony Category Share</h2>

        {analytics?.categoryBreakdown.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-4">No category data recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Category Name</th>
                  <th className="p-4">Bookings Count</th>
                  <th className="p-4">Demand Share</th>
                  <th className="p-4 text-right">Gross Generated Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {analytics?.categoryBreakdown.map((cat) => {
                  const sharePercent = analytics.totalBookingsCount > 0
                    ? Math.round((cat.bookingsCount / analytics.totalBookingsCount) * 100)
                    : 0;

                  return (
                    <tr key={cat.category} className="hover:bg-slate-800/40 transition">
                      <td className="p-4 font-bold text-amber-400">{cat.category}</td>
                      <td className="p-4 font-semibold text-slate-200">{cat.bookingsCount} Pujas</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                            <div
                              className="bg-amber-500 h-full rounded-full"
                              style={{ width: `${sharePercent}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">{sharePercent}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-right font-bold text-emerald-400">
                        ₹{cat.revenue.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
