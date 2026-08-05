'use client';

import { useState, useEffect } from 'react';

interface Pandit {
  id: string;
  name: string;
  phone: string;
  city: string;
  specialization: string;
  experienceYrs: number;
  rating: number;
  avatarUrl?: string | null;
  active: boolean;
  _count?: { bookings: number };
}

export default function OpsPanditsPage() {
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Mumbai',
    specialization: 'Rigveda & Griha Pravesh Specialist',
    experienceYears: '8',
    rating: '4.9',
    avatarUrl: '',
  });

  useEffect(() => {
    fetchPandits();
  }, []);

  const fetchPandits = async () => {
    try {
      const res = await fetch('/api/ops/pandits');
      const data = await res.json();
      if (data.success) {
        setPandits(data.pandits);
      }
    } catch (err) {
      console.error('Failed to load pandits:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPandit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/ops/pandits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to onboard scholar.');
        return;
      }

      setIsModalOpen(false);
      setFormData({
        name: '',
        phone: '',
        city: 'Mumbai',
        specialization: 'Rigveda & Griha Pravesh Specialist',
        experienceYears: '8',
        rating: '4.9',
        avatarUrl: '',
      });
      fetchPandits();
    } catch (err) {
      console.error('Failed to add pandit:', err);
      setErrorMessage('Network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPandits = pandits.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialization.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-2xl font-bold text-slate-100">Pandit Network Directory</h1>
          <p className="text-xs text-slate-400">
            Onboard Vedic scholars with photos, manage city coverage, and toggle active status.
          </p>
        </div>

        <button
          onClick={() => {
            setErrorMessage(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <span>+</span>
          <span>Onboard New Scholar</span>
        </button>
      </div>

      {/* Directory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Photo & Scholar Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">City</th>
                <th className="p-4">Specialization</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPandits.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-bold text-slate-100 flex items-center gap-3">
                    {p.avatarUrl ? (
                      <img
                        src={p.avatarUrl}
                        alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover border border-amber-500/30"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl flex items-center justify-center font-bold text-base">
                        🛕
                      </div>
                    )}
                    <span>{p.name}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-400">{p.phone}</td>
                  <td className="p-4 font-semibold text-slate-300">{p.city}</td>
                  <td className="p-4 text-amber-400/90 font-medium">{p.specialization}</td>
                  <td className="p-4 text-amber-400 font-bold">★ {p.rating.toFixed(1)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.active
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {p.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboard Scholar Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddPandit}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100">Onboard Scholar to Network</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-slate-300 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl font-medium">
                ⚠️ {errorMessage}
              </div>
            )}

            <div className="space-y-3 text-xs">
              {/* Photo Upload Input */}
              <div>
                <label className="text-slate-300 font-bold block mb-1">Scholar Photo</label>
                <div className="flex items-center gap-4">
                  {formData.avatarUrl ? (
                    <img
                      src={formData.avatarUrl}
                      alt="Preview"
                      className="w-14 h-14 rounded-2xl object-cover border border-amber-500"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 font-bold text-xs">
                      No Photo
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-600 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Scholar Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pandit Ramesh Shastri"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98200 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">City</label>
                  <input
                    type="text"
                    required
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Specialization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rigveda & Griha Pravesh Specialist"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    required
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Initial Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5.0"
                    required
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition shadow-md"
              >
                {submitting ? 'Onboarding...' : 'Onboard Scholar'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
