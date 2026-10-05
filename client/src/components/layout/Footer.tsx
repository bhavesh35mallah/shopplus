import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  CheckCircle2,
  ArrowUp,
  ShieldCheck,
  CreditCard,
  Lock,
} from "lucide-react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white border-t border-slate-200/80 text-slate-600">
      {/* Newsletter VIP Bar */}
      <div className="border-b border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-rose-600">
                PULSE VIP CLUB
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Unlock 15% off your first order.
              </h3>
              <p className="text-xs text-slate-500">
                Get priority access to tournament gear drops, member-only flash sales, and gear guides.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Welcome to the club! Your 15% discount code has been sent.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md w-full">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none shadow-2xs"
                    />
                    <Mail className="absolute right-3.5 top-3 h-4 w-4 text-slate-400" />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer flex-shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Directory */}
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Info Column */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-black text-xs">
                SP
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Shop<span className="text-rose-600">Pulse</span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-slate-500 max-w-sm">
              The premier destination for official tournament cricket kits, urban fashion capsules, athletic footwear, and acoustic technology. Synced live with seasonal moments across India.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-slate-600 font-semibold">ISO 9001 Certified Gear</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-slate-600 font-semibold">256-Bit SSL Secured</span>
              </div>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
              Departments
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/shop?category=cricket" className="hover:text-rose-600 transition-colors">
                  Cricket &amp; Sports
                </Link>
              </li>
              <li>
                <Link to="/shop?category=mens-fashion" className="hover:text-rose-600 transition-colors">
                  Men's Apparel
                </Link>
              </li>
              <li>
                <Link to="/shop?category=womens-fashion" className="hover:text-rose-600 transition-colors">
                  Women's Apparel
                </Link>
              </li>
              <li>
                <Link to="/shop?category=footwear" className="hover:text-rose-600 transition-colors">
                  Footwear &amp; Sneakers
                </Link>
              </li>
              <li>
                <Link to="/shop?category=electronics" className="hover:text-rose-600 transition-colors">
                  Electronics &amp; Audio
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="hover:text-rose-600 transition-colors">
                  Watches &amp; Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/track-order" className="hover:text-rose-600 transition-colors">
                  Track My Order
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-rose-600 transition-colors">
                  14-Day Return Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-rose-600 transition-colors">
                  Shipping Rates &amp; Speed
                </Link>
              </li>
              <li>
                <Link to="/cricket-bat-guide" className="hover:text-rose-600 transition-colors">
                  Cricket Bat Care Guide
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-rose-600 transition-colors">
                  Warranty Registration
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rose-600 transition-colors">
                  Contact Support (24/7)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Pulse Experience */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-rose-600 transition-colors">
                  About ShopPulse
                </Link>
              </li>
              <li>
                <Link to="/brand-partners" className="hover:text-rose-600 transition-colors">
                  Official Brand Partners
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="hover:text-rose-600 transition-colors">
                  Sustainability Pledges
                </Link>
              </li>
              <li>
                <Link to="/sponsorships" className="hover:text-rose-600 transition-colors">
                  Tournament Sponsorships
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-rose-600 transition-colors">
                  Careers &amp; Culture
                </Link>
              </li>
              <li>
                <Link to="/store-locator" className="hover:text-rose-600 transition-colors">
                  Store Locator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Back to Top */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <CreditCard className="h-4 w-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Accepted Payments:</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-bold text-slate-700">UPI</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-bold text-slate-700">Visa</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-bold text-slate-700">Mastercard</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-bold text-slate-700">RuPay</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-bold text-slate-700">NetBanking</span>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-rose-600 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>&copy; {new Date().getFullYear()} ShopPulse Retail India Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
            <Link to="/security" className="hover:text-slate-600 transition-colors">Security</Link>
            <Link to="/sitemap" className="hover:text-slate-600 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
