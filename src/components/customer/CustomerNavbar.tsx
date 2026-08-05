'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CustomerNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Verified Pandits', href: '/pandits' },
    { name: 'My Bookings', href: '/my-bookings' },
    { name: 'Profile', href: '/profile' },
    { name: 'Support', href: '/support' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Simple Brand Logo matching Home page */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl font-bold text-amber-700">ॐ</span>
          <div>
            <span className="text-lg font-extrabold bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 bg-clip-text text-transparent block leading-tight">
              VedaSetu
            </span>
            <span className="text-[8px] font-bold tracking-widest text-amber-700 uppercase block">
              MindbridgeX
            </span>
          </div>
        </Link>

        {/* Unified Customer Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  isActive
                    ? 'bg-amber-100 text-amber-950 font-bold'
                    : 'text-gray-600 hover:text-amber-900 hover:bg-amber-50/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
