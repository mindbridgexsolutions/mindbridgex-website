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
}

export default function ServicesPage() {
  const [ceremonies, setCeremonies] = useState<Ceremony[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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

  const categories = ['All', ...Array.from(new Set(ceremonies.map((c) => c.category)))];

  const filteredCeremonies = ceremonies.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <span>Sacred Vedic Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-50">
            Authentic Pujas & Vedic Rituals
          </h1>
          <p className="text-xs text-amber-200/80">
            Performed by verified scholars following Sanatana Vidhi with pure Samagri kits.
          </p>
        </div>

        <span className="px-4 py-2 bg-amber-500/20 border border-amber-400/30 text-amber-200 font-bold text-xs rounded-xl self-start sm:self-auto font-mono">
          {ceremonies.length} Verified Ritual Packages
        </span>
      </div>

      {/* Filter Toolbar & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-amber-100 shadow-2xs">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-amber-50/60 text-gray-700 hover:bg-amber-100/70 hover:text-amber-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search puja name or vidhi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-amber-50/30 border border-amber-200 rounded-xl px-4 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-hidden focus:border-amber-600 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Grid of Service Cards */}
      {filteredCeremonies.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-amber-100 space-y-2">
          <p className="text-sm font-semibold text-gray-600">No rituals found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-amber-700 hover:underline"
          >
            Reset Catalog Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCeremonies.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl p-6 border border-amber-100 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {c.category}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold flex items-center gap-1 font-mono">
                    ⏱️ {c.durationMinutes} mins
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900">{c.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{c.description}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Samagri Kit</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-md text-[10px] ${
                      c.samagriIncluded
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {c.samagriIncluded ? '✓ Included' : 'Optional'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                      Dakshina / Price
                    </span>
                    <span className="text-lg font-extrabold text-gray-900">
                      ₹{c.basePrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <a
                    href="/my-bookings"
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-2xs flex items-center gap-1.5"
                  >
                    <span>Book Ceremony</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
