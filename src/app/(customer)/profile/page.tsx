'use client';

import { useState } from 'react';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Deepak Singh',
    email: 'devotee@vedasetu.org',
    phone: '+91 98765 43210',
    gotra: 'Kashyapa',
    preferredLanguage: 'Hindi / Sanskrit',
    city: 'Mumbai',
    address: 'Kandivali East, Mumbai, Maharashtra',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <span>ॐ</span>
            <span>Devotee Account & Sankalp Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-50">
            Namaste, {profile.name}
          </h1>
          <p className="text-xs text-amber-200/80">
            Manage your family Gotra, primary location, and Sankalp preferences for Vedic rituals.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs rounded-xl transition shadow-xs whitespace-nowrap self-start sm:self-auto"
        >
          {isEditing ? 'Cancel Editing' : '✏️ Edit Profile & Gotra'}
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center justify-between">
          <span>✓ Profile and Sankalp details updated successfully!</span>
        </div>
      )}

      {/* 2-Column Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary Card & Quick Stats */}
        <div className="space-y-6">
          {/* Identity Card */}
          <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-2xs space-y-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white font-extrabold text-3xl flex items-center justify-center mx-auto shadow-sm">
              {profile.name.charAt(0)}
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-gray-900">{profile.name}</h2>
              <p className="text-xs text-gray-500 font-mono">{profile.email}</p>
              <p className="text-xs text-amber-800 font-bold font-mono">{profile.phone}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-100/60">
                <span className="text-[10px] text-gray-500 font-bold uppercase block">Gotra</span>
                <span className="text-xs font-bold text-amber-900">{profile.gotra}</span>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-100/60">
                <span className="text-[10px] text-gray-500 font-bold uppercase block">Language</span>
                <span className="text-xs font-bold text-amber-900">{profile.preferredLanguage}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Widget */}
          <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider text-amber-800">
              Devotee Activity
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">Completed Pujas</span>
                <span className="font-bold text-gray-900">4 Ceremonies</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">Primary Location</span>
                <span className="font-bold text-gray-900">{profile.city}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">Account Status</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-md uppercase">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Form & Sankalp Records */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Details Panel */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-2xs space-y-6">
            <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Sankalp & Personal Info</h3>
                <p className="text-xs text-gray-500">
                  Information passed to assigned Vedic Scholars for customized ritual chanting.
                </p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <label className="text-gray-600 font-bold uppercase tracking-wider block mb-1.5">
                    Devotee Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-amber-50/30 border border-amber-200 rounded-xl p-3 text-gray-900 focus:outline-hidden focus:border-amber-600 font-semibold"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-xl font-semibold text-gray-800">
                      {profile.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-gray-600 font-bold uppercase tracking-wider block mb-1.5">
                    Primary Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full bg-amber-50/30 border border-amber-200 rounded-xl p-3 text-gray-900 focus:outline-hidden focus:border-amber-600 font-semibold font-mono"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-xl font-semibold text-gray-800 font-mono">
                      {profile.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-gray-600 font-bold uppercase tracking-wider block mb-1.5">
                    Family Gotra (Family Lineage)
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.gotra}
                      onChange={(e) => setProfile({ ...profile, gotra: e.target.value })}
                      className="w-full bg-amber-50/30 border border-amber-200 rounded-xl p-3 text-gray-900 focus:outline-hidden focus:border-amber-600 font-semibold"
                    />
                  ) : (
                    <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl font-bold text-amber-950 flex items-center justify-between">
                      <span>{profile.gotra}</span>
                      <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md font-bold">
                        Used for Sankalp
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-gray-600 font-bold uppercase tracking-wider block mb-1.5">
                    Preferred Language
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.preferredLanguage}
                      onChange={(e) => setProfile({ ...profile, preferredLanguage: e.target.value })}
                      className="w-full bg-amber-50/30 border border-amber-200 rounded-xl p-3 text-gray-900 focus:outline-hidden focus:border-amber-600 font-semibold"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-xl font-semibold text-gray-800">
                      {profile.preferredLanguage}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-gray-600 font-bold uppercase tracking-wider block mb-1.5">
                    Primary Address for Home Pujas
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="w-full bg-amber-50/30 border border-amber-200 rounded-xl p-3 text-gray-900 focus:outline-hidden focus:border-amber-600 font-semibold"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-xl font-semibold text-gray-800">
                      {profile.address}
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Past Sankalp & Family Notes */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-gray-900">Registered Family Members for Sankalp</h3>
            <p className="text-xs text-gray-500">
              Names recited by the Pandit during the preliminary Sankalp mantra recitation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-900 block">Deepak Singh</span>
                  <span className="text-[10px] text-gray-500">Primary Devotee</span>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">Self</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-900 block">Monica Singh</span>
                  <span className="text-[10px] text-gray-500 font-mono">Spouse</span>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">Family</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
