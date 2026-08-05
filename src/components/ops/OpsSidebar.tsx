'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function OpsSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/ops/dashboard', icon: '📊' },
    { name: 'Bookings & Dispatch', href: '/ops/bookings', icon: '📅' },
    { name: 'Pandit Network', href: '/ops/pandits', icon: '🛕' },
    { name: 'Devotees & Users', href: '/ops/customers', icon: '👥' },
    { name: 'Service Catalog', href: '/ops/services', icon: '📜' },
    { name: 'Payments & Payouts', href: '/ops/payments', icon: '💳' },
    { name: 'Analytics & Reports', href: '/ops/reports', icon: '📈' },
    { name: 'Console Settings', href: '/ops/settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-screen">
      <div className="p-4 space-y-6">
        {/* Ops Brand Logo */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-lg">
            🛕
          </div>
          <div>
            <span className="text-base font-bold text-slate-100 block leading-tight">
              VedaSetu
            </span>
            <span className="text-[10px] font-bold text-amber-500 tracking-wider uppercase block">
              Ops Console
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Operator Account info */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold border border-slate-700">
            OP
          </div>
          <div className="truncate">
            <span className="text-xs font-bold text-slate-200 block truncate">Operations Desk</span>
            <span className="text-[10px] text-slate-500 block truncate">ops@vedasetu.org</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
