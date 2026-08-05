'use client';

export default function OpsHeader() {
  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
          Live Fulfillment Environment
        </span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition"
        >
          <span>Preview Devotee App</span>
          <span>↗</span>
        </a>

        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Normal" />
      </div>
    </header>
  );
}
