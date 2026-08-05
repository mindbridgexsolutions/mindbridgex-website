import CustomerNavbar from '@/components/customer/CustomerNavbar';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/20 via-white to-amber-50/10 text-gray-900 flex flex-col justify-between font-sans">
      <div>
        <CustomerNavbar />
        <main>{children}</main>
      </div>

      {/* Devotee Footer */}
      <footer className="border-t border-amber-100 bg-white py-8 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-amber-900 font-bold text-base">
          <span className="text-amber-700 text-lg">ॐ</span>
          <span>VedaSetu</span>
        </div>
        <p className="text-xs text-gray-500">
          Preserving Sanatana Vidhi & Authentic Vedic Rituals.
        </p>
        <p className="text-[11px] font-medium text-gray-400">
          © {new Date().getFullYear()} VedaSetu by <span className="font-semibold text-gray-600">MindbridgeX</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
