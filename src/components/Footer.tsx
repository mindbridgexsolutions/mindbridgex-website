import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] text-[#1d1d1f] py-12 px-6 border-t border-[#d2d2d7]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-[#86868b] text-sm">
              <li><Link href="/services">Custom Software</Link></li>
              <li><Link href="/services">Cloud Solutions</Link></li>
              <li><Link href="/services">AI & ML</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-[#86868b] text-sm">
              <li><Link href="/products">VedaSetu</Link></li>
              <li><Link href="/products">EdTech Suite</Link></li>
              <li><Link href="/products">BizAuto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-[#86868b] text-sm">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-[#86868b] text-sm">
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[#d2d2d7] flex flex-col md:flex-row justify-between items-center text-xs text-[#86868b]">
          <p>Copyright © 2026 MindBridgeX Solutions Pvt. Ltd. All rights reserved.</p>
          <p>Mumbai, Maharashtra, India</p>
        </div>
      </div>
    </footer>
  );
}