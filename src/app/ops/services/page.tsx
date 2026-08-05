'use client';

import { useState, useEffect } from 'react';

interface Ceremony {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  durationMinutes: number;
  samagriIncluded: boolean;
  _count?: { bookings: number };
}

export default function OpsServicesPage() {
  const [ceremonies, setCeremonies] = useState<Ceremony[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCeremony, setSelectedCeremony] = useState<Ceremony | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [addFormData, setAddFormData] = useState({
    name: '',
    category: 'Graha Shanti',
    description: '',
    basePrice: '3500',
    durationMinutes: '120',
    samagriIncluded: true,
  });

  const [editPrice, setEditPrice] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editSamagri, setEditSamagri] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/ops/services');
      const data = await res.json();
      if (data.success) {
        setCeremonies(data.ceremonies);
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/ops/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addFormData),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        setAddFormData({
          name: '',
          category: 'Graha Shanti',
          description: '',
          basePrice: '3500',
          durationMinutes: '120',
          samagriIncluded: true,
        });
        fetchServices();
      }
    } catch (err) {
      console.error('Failed to add service:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCeremony) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/ops/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedCeremony.id,
          basePrice: editPrice,
          durationMinutes: editDuration,
          samagriIncluded: editSamagri,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCeremony(null);
        fetchServices();
      }
    } catch (err) {
      console.error('Failed to update service:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (c: Ceremony) => {
    setSelectedCeremony(c);
    setEditPrice(c.basePrice.toString());
    setEditDuration(c.durationMinutes.toString());
    setEditSamagri(c.samagriIncluded);
  };

  const filteredCeremonies = ceremonies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-2xl font-bold text-slate-100">Service Catalog Engine</h1>
          <p className="text-xs text-slate-400">
            Manage Puja packages, dynamic Muhurat pricing, duration parameters, and Samagri kits.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <span>+</span>
          <span>Add New Ceremony</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search service catalog by ceremony name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-hidden focus:border-amber-500"
          />
        </div>
        <span className="text-xs text-slate-400 px-2 font-mono">
          Showing {filteredCeremonies.length} Ceremonies
        </span>
      </div>

      {/* Services Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Ceremony Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Base Price</th>
                <th className="p-4">Samagri Kit</th>
                <th className="p-4">Total Bookings</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCeremonies.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-bold text-slate-100 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-sm">
                      📜
                    </span>
                    <div>
                      <div>{c.name}</div>
                      <div className="text-[10px] text-slate-500 font-normal max-w-xs truncate">
                        {c.description}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-amber-400/90">{c.category}</td>
                  <td className="p-4 text-slate-300 font-mono">{c.durationMinutes} mins</td>
                  <td className="p-4 font-bold text-emerald-400">
                    ₹{c.basePrice.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.samagriIncluded
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {c.samagriIncluded ? 'Included' : 'Excluded'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 font-bold">
                    {c._count?.bookings || 0} Booked
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => openEditModal(c)}
                      className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold rounded-lg text-[11px] transition"
                    >
                      Edit Package
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Ceremony Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddService}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100">Add New Vedic Ceremony</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-500 hover:text-slate-300 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Ceremony Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navagraha Shanti Puja"
                  value={addFormData.name}
                  onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Category</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Graha Shanti / Housewarming"
                  value={addFormData.category}
                  onChange={(e) => setAddFormData({ ...addFormData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description of sacred vidhi and benefits..."
                  value={addFormData.description}
                  onChange={(e) => setAddFormData({ ...addFormData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Base Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={addFormData.basePrice}
                    onChange={(e) => setAddFormData({ ...addFormData, basePrice: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    required
                    value={addFormData.durationMinutes}
                    onChange={(e) =>
                      setAddFormData({ ...addFormData, durationMinutes: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="addSamagri"
                  checked={addFormData.samagriIncluded}
                  onChange={(e) =>
                    setAddFormData({ ...addFormData, samagriIncluded: e.target.checked })
                  }
                  className="rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="addSamagri" className="text-slate-300 font-semibold cursor-pointer">
                  Include Full Samagri Kit by default
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition shadow-md"
              >
                {submitting ? 'Creating...' : 'Create Ceremony'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Ceremony Modal */}
      {selectedCeremony && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleUpdateService}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100">
                Edit {selectedCeremony.name}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedCeremony(null)}
                className="text-slate-500 hover:text-slate-300 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Base Price (₹)</label>
                <input
                  type="number"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Duration (Mins)</label>
                <input
                  type="number"
                  required
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editSamagri"
                  checked={editSamagri}
                  onChange={(e) => setEditSamagri(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="editSamagri" className="text-slate-300 font-semibold cursor-pointer">
                  Include Full Samagri Kit
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedCeremony(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition shadow-md"
              >
                {submitting ? 'Updating...' : 'Save Package Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
