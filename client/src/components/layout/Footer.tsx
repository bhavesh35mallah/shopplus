import React from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Mail,
  ArrowRight,
  Heart,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-400">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
                <p className="text-xs text-slate-400 mt-0.5">On all orders above ₹999 across India</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">100% Genuine Products</h4>
                <p className="text-xs text-slate-400 mt-0.5">Directly sourced & verified authentic</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">7-Day Easy Returns</h4>
                <p className="text-xs text-slate-400 mt-0.5">Hassle-free doorstep exchanges</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
                <Headphones className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dedicated Support</h4>
                <p className="text-xs text-slate-400 mt-0.5">Expert assistance whenever needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-black text-lg">
                ⚡
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Shop<span className="text-indigo-400">Pulse</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              India's premier event-aware e-commerce platform. Discover curated apparel, electronics, sports gear, and lifestyle products synced with live events.
            </p>

            {/* Newsletter Input */}
            <div className="mt-6 max-w-md">
              <label htmlFor="newsletter" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Join our VIP Club for Exclusive Deals
              </label>
              <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to ShopPulse!"); }} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    id="newsletter"
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pr-4 pl-10 text-xs text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <Mail className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-500" />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-xl bg-indigo-600 px-5 text-xs font-semibold text-white transition-colors hover:bg-indigo-500 active:scale-95"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Shop Categories
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/shop?category=cricket" className="hover:text-white transition-colors">
                  Cricket & Sports Gear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=electronics" className="hover:text-white transition-colors">
                  Electronics & Audio
                </Link>
              </li>
              <li>
                <Link to="/shop?category=mens-fashion" className="hover:text-white transition-colors">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link to="/shop?category=womens-fashion" className="hover:text-white transition-colors">
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link to="/shop?category=footwear" className="hover:text-white transition-colors">
                  Footwear & Sneakers
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="hover:text-white transition-colors">
                  Watches & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Service
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Track My Order
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Help Center & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company / Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact & Store
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="text-slate-400">
                <span className="block text-white font-medium">Headquarters:</span>
                Mumbai, Maharashtra, India
              </li>
              <li className="text-slate-400">
                <span className="block text-white font-medium">Customer Support:</span>
                support@shoppulse.com
              </li>
              <li className="text-slate-400">
                <span className="block text-white font-medium">Operating Hours:</span>
                Mon – Sat: 9:00 AM – 8:00 PM IST
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Icons */}
      <div className="border-t border-slate-900 bg-slate-950 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} ShopPulse Inc. Crafted with</span>
            <Heart className="h-3 w-3 fill-rose-500 text-rose-500 inline" />
            <span>in India. All rights reserved.</span>
          </div>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            <span className="rounded bg-slate-900 px-2 py-1 border border-slate-800">UPI</span>
            <span className="rounded bg-slate-900 px-2 py-1 border border-slate-800">VISA</span>
            <span className="rounded bg-slate-900 px-2 py-1 border border-slate-800">Mastercard</span>
            <span className="rounded bg-slate-900 px-2 py-1 border border-slate-800">RuPay</span>
            <span className="rounded bg-slate-900 px-2 py-1 border border-slate-800">NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
