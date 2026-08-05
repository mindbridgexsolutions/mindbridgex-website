'use client';

import { useState, useEffect } from 'react';

interface PaymentLog {
  transactionId: string;
  bookingId: string;
  ceremonyName: string;
  devoteeName: string;
  totalAmount: number;
  dakshinaAmount: number;
  platformFee: number;
  gatewayStatus: string;
  paymentMethod: string;
  panditName: string;
  payoutStatus: string;
  createdAt: string;
}

interface Summary {
  totalVolume: number;
  totalDakshina: number;
  totalPlatformEarnings: number;
  transactionCount: number;
}

export default function OpsPaymentsPage() {
  const [payments, setPayments] = useState<PaymentLog[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/ops/payments');
      const data = await res.json();
      if (data.success) {
        setPayments(data.payments);
        setSummary(data.summary);
      }
    } catch (err) {
      console.error('Failed to load ops payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(
    (p) =>
      p.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.devoteeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ceremonyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.panditName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h1 className="text-2xl font-bold text-slate-100">Financials & Gateway Ledger</h1>
        <p className="text-xs text-slate-400">
          Payment processing logs, platform revenue margins, and Scholar Dakshina payouts.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Gross Transaction Volume
          </span>
          <div className="text-2xl font-bold text-emerald-400">
            ₹{summary?.totalVolume.toLocaleString('en-IN') || 0}
          </div>
          <span className="text-[10px] text-slate-500 block">{summary?.transactionCount || 0} Payments Processed</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Pandit Dakshina Pool (80%)
          </span>
          <div className="text-2xl font-bold text-amber-400">
            ₹{summary?.totalDakshina.toLocaleString('en-IN') || 0}
          </div>
          <span className="text-[10px] text-slate-500 block">Allocated to Network Scholars</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Platform Net Earnings (20%)
          </span>
          <div className="text-2xl font-bold text-slate-200">
            ₹{summary?.totalPlatformEarnings.toLocaleString('en-IN') || 0}
          </div>
          <span className="text-[10px] text-slate-500 block">VedaSetu Platform Margin</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by Transaction ID, Devotee, Ceremony, or Pandit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-hidden focus:border-amber-500"
          />
        </div>
        <span className="text-xs text-slate-400 px-2 font-mono">
          Showing {filteredPayments.length} Transactions
        </span>
      </div>

      {/* Payment Ledger Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Devotee</th>
                <th className="p-4">Ceremony</th>
                <th className="p-4">Gross Amount</th>
                <th className="p-4">Scholar Dakshina</th>
                <th className="p-4">Platform Fee</th>
                <th className="p-4">Gateway</th>
                <th className="p-4">Dakshina Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPayments.map((p) => (
                <tr key={p.transactionId} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono text-[11px] text-amber-400 font-bold">
                    {p.transactionId}
                  </td>
                  <td className="p-4 font-semibold text-slate-200">{p.devoteeName}</td>
                  <td className="p-4 text-slate-300">{p.ceremonyName}</td>
                  <td className="p-4 font-bold text-slate-100">
                    ₹{p.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 font-semibold text-amber-400">
                    ₹{p.dakshinaAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-slate-400">
                    ₹{p.platformFee.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {p.gatewayStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.payoutStatus === 'SETTLED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {p.payoutStatus}
                    </span>
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
