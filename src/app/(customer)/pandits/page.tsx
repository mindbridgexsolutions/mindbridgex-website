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
}

export default function VerifiedPanditsPage() {
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPandits();
  }, []);

  const fetchPandits = async () => {
    try {
      const res = await fetch('/api/ops/pandits');
      const data = await res.json();
      if (data.success) {
        setPandits(data.pandits.filter((p: Pandit) => p.active));
      }
    } catch (err) {
      console.error('Failed to load pandits:', err);
    } finally {
      setLoading(false);
    }
  };

  const cities = ['All', ...Array.from(new Set(pandits.map((p) => p.city)))];

  const filteredPandits = pandits.filter((p) => {
    const matchesCity = selectedCity === 'All' || p.city === selectedCity;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-amber-800/40">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-extrabold uppercase tracking-widest">
            <span>ॐ</span>
            <span>Sanatana Vidhi Practitioners</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-50 tracking-tight">
            Verified Vedic Acharyas & Pandits
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl leading-relaxed">
            Gurukul-trained scholars vetted for authentic Sanskrit mantra pronunciation, family Gotra Sankalp accuracy, and ritual purity.
          </p>
        </div>

        <div className="px-5 py-3 bg-amber-500/20 border border-amber-400/30 text-amber-200 font-bold text-xs rounded-2xl backdrop-blur-md self-start sm:self-auto font-mono shadow-xs">
          {pandits.length} Verified Scholars Available
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-amber-100 shadow-2xs">
        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
                selectedCity === city
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-amber-50/60 text-gray-700 hover:bg-amber-100/70 hover:text-amber-950'
              }`}
            >
              📍 {city}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search scholar name, Veda, or ritual..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-amber-50/30 border border-amber-200/80 rounded-2xl px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-hidden focus:border-amber-600 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Grid of Scholar Cards */}
      {filteredPandits.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-100 space-y-3">
          <p className="text-sm font-semibold text-gray-600">No scholars match your current search.</p>
          <button
            onClick={() => {
              setSelectedCity('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-amber-700 hover:underline"
          >
            Reset All Directory Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPandits.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-amber-100 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Fitted Photo Container */}
                <div className="relative w-full h-72 bg-gradient-to-b from-amber-50/50 via-amber-100/30 to-amber-50/80 p-4 flex items-center justify-center overflow-hidden border-b border-amber-100/60">
                  {p.avatarUrl ? (
                    <img
                      src={p.avatarUrl}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain rounded-2xl drop-shadow-md transition-transform duration-300 group-hover:scale-102"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-3xl bg-amber-500/10 text-amber-800 border border-amber-300 flex flex-col items-center justify-center space-y-1 shadow-2xs">
                      <span className="text-4xl">🛕</span>
                    </div>
                  )}

                  {/* Badges Over Photo */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-amber-950 text-[10px] font-extrabold rounded-full shadow-2xs uppercase tracking-wider border border-amber-200/60 flex items-center gap-1">
                      <span>✦</span>
                      <span>Verified Acharya</span>
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 bg-amber-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-extrabold rounded-full shadow-2xs flex items-center gap-1 font-mono">
                      <span>★</span>
                      <span>{p.rating.toFixed(1)}</span>
                    </span>
                  </div>
                </div>

                {/* Card Info Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                    <p className="text-xs font-semibold text-amber-800 flex items-center gap-1 mt-0.5">
                      <span>📍</span>
                      <span>{p.city}</span>
                    </p>
                  </div>

                  {/* Specialization Box */}
                  <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-100/80 text-xs space-y-1">
                    <span className="text-[10px] text-amber-800 font-extrabold uppercase tracking-wider block">
                      Vidhi & Veda Specialization
                    </span>
                    <p className="font-bold text-amber-950 leading-snug">
                      {p.specialization}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <span className="text-[10px] text-gray-400 font-bold uppercase block">
                        Experience
                      </span>
                      <span className="font-bold text-gray-900">{p.experienceYrs} Years</span>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl">
                      <span className="text-[10px] text-gray-400 font-bold uppercase block">
                        Conduct
                      </span>
                      <span className="font-bold text-gray-900">Sanatana Vidhi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2">
                <a
                  href="/services"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-2xl transition shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Request Scholar for Puja</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
