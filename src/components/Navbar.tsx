'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Verified Pandits', href: '/pandits' },
    { name: 'My Bookings', href: '/my-bookings' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛕</span>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            VedaSetu
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  isActive
                    ? 'bg-amber-50 text-amber-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
