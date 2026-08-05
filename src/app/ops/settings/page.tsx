'use client';

import { useState, useEffect } from 'react';

interface Settings {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  scholarDakshinaShare: number;
  platformMarginShare: number;
  autoAssignPandits: boolean;
  enableSmsNotifications: boolean;
  maintenanceMode: boolean;
}

export default function OpsSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/ops/settings');
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error('Failed to load ops settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/ops/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSaving(false);
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
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Console Settings & Parameters</h1>
        <p className="text-xs text-slate-400">
          Manage system configurations, revenue share parameters, and automated dispatch controls.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-2xl flex items-center justify-between">
          <span>✓ Settings updated successfully!</span>
        </div>
      )}

      {settings && (
        <form onSubmit={handleSave} className="space-y-6">
          {/* General Platform Parameters */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-amber-400">
              General Operations Config
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Ops Console Title</label>
                <input
                  type="text"
                  value={settings.platformName}
                  onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Ops Support Email</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Revenue & Dakshina Split Parameters */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-amber-400">
              Financial Split Rules
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Scholar Dakshina Share (%)</label>
                <input
                  type="number"
                  value={settings.scholarDakshinaShare}
                  onChange={(e) => {
                    const dakshina = Number(e.target.value);
                    setSettings({
                      ...settings,
                      scholarDakshinaShare: dakshina,
                      platformMarginShare: 100 - dakshina,
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Platform Margin Share (%)</label>
                <input
                  type="number"
                  disabled
                  value={settings.platformMarginShare}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* System Toggles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-amber-400">
              Automation & Dispatch Controls
            </h2>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">Auto-Assign Nearby Pandits</span>
                  <span className="text-[10px] text-slate-500 block">
                    Automatically match unassigned bookings with active scholars in same city.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoAssignPandits}
                  onChange={(e) => setSettings({ ...settings, autoAssignPandits: e.target.checked })}
                  className="rounded border-slate-800 bg-slate-900 text-amber-500 focus:ring-amber-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-bold text-slate-200 block">SMS & WhatsApp Alerts</span>
                  <span className="text-[10px] text-slate-500 block">
                    Send automated ritual confirmation SMS to devotees and assigned scholars.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableSmsNotifications}
                  onChange={(e) =>
                    setSettings({ ...settings, enableSmsNotifications: e.target.checked })
                  }
                  className="rounded border-slate-800 bg-slate-900 text-amber-500 focus:ring-amber-500 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition shadow-md"
            >
              {saving ? 'Saving System Rules...' : 'Save Console Configuration'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
