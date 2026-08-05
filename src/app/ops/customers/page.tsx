'use client';

import { useState, useEffect } from 'react';

interface Booking {
  id: string;
  scheduledAt: string;
  totalPrice: number;
  status: string;
  venueAddress: string;
  ceremony: { name: string; category: string };
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  totalBookings: number;
  totalSpend: number;
  lastBookingDate: string | null;
  recentVenue: string;
  bookings: Booking[];
}

export default function OpsCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch('/api/ops/customers');
      const data = await res.json();
      if (data.success) {
        setCustomers(data.customers);
      }
    } catch (err) {
      console.error('Failed to load customers:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Devotee Directory & LTV</h1>
          <p className="text-xs text-slate-400">
            View customer booking profiles, lifetime spend analytics, and ritual history.
          </p>
        </div>

        <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl self-start sm:self-auto">
          Total Devotees: {customers.length}
        </span>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search devotee by name, email, or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-hidden focus:border-amber-500"
          />
        </div>
        <span className="text-xs text-slate-400 px-2 font-mono">
          Showing {filteredCustomers.length} Records
        </span>
      </div>

      {/* Customers Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Devotee Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Total Pujas</th>
                <th className="p-4">Lifetime Value (LTV)</th>
                <th className="p-4">Last Puja Scheduled</th>
                <th className="p-4">Primary Location</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-bold text-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-xs">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div>{c.name}</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        Joined {new Date(c.createdAt).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-200">{c.email}</div>
                    <div className="text-[10px] font-mono text-slate-400">{c.phone}</div>
                  </td>
                  <td className="p-4 font-bold text-slate-200">{c.totalBookings} Pujas</td>
                  <td className="p-4 font-bold text-emerald-400">
                    ₹{c.totalSpend.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-slate-400">
                    {c.lastBookingDate
                      ? new Date(c.lastBookingDate).toLocaleDateString('en-IN')
                      : 'No bookings yet'}
                  </td>
                  <td className="p-4 max-w-xs text-slate-400 truncate" title={c.recentVenue}>
                    {c.recentVenue}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold rounded-lg text-[11px] transition"
                    >
                      View History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Devotee History Drawer/Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-sm">
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">{selectedCustomer.name}</h3>
                  <p className="text-xs text-slate-400">{selectedCustomer.email} • {selectedCustomer.phone}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-500 hover:text-slate-300 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block font-bold">Total Ceremonies</span>
                <span className="text-lg font-bold text-slate-200">{selectedCustomer.totalBookings}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block font-bold">Total Gross LTV</span>
                <span className="text-lg font-bold text-emerald-400">
                  ₹{selectedCustomer.totalSpend.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-200">Ceremony Booking History</h4>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {selectedCustomer.bookings.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No ceremony records found.</p>
                ) : (
                  selectedCustomer.bookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-amber-400 block">{b.ceremony.name}</span>
                        <span className="text-[10px] text-slate-400">
                          🗓️ {new Date(b.scheduledAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                      <div className="text-right space-y-0.5">
                        <span className="font-bold text-slate-200 block">
                          ₹{b.totalPrice.toLocaleString('en-IN')}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full inline-block ${
                            b.status === 'COMPLETED'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700 transition"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
