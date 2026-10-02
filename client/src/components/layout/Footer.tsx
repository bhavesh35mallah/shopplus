import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, RotateCcw } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#fafbfc] border-t border-[#eaeaec] text-[#282c3f]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12 py-12">
        {/* Main 4-Column Links Section */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-10 border-b border-[#eaeaec]">
          {/* Column 1: Online Shopping */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#282c3f] mb-4">
              ONLINE SHOPPING
            </h4>
            <ul className="space-y-2 text-xs text-[#696b79]">
              <li>
                <Link to="/shop?category=mens-fashion" className="hover:text-[#282c3f]">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/shop?category=womens-fashion" className="hover:text-[#282c3f]">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/shop?category=cricket" className="hover:text-[#282c3f]">
                  Cricket &amp; Sports
                </Link>
              </li>
              <li>
                <Link to="/shop?category=footwear" className="hover:text-[#282c3f]">
                  Footwear &amp; Sneakers
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="hover:text-[#282c3f]">
                  Watches &amp; Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop?category=electronics" className="hover:text-[#282c3f]">
                  Gadgets &amp; Audio
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#282c3f]">
                  ShopPulse Insider
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#282c3f] mb-4">
              CUSTOMER POLICIES
            </h4>
            <ul className="space-y-2 text-xs text-[#696b79]">
              <li>
                <Link to="/shop" className="hover:text-[#282c3f]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#282c3f]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#282c3f]">
                  T&amp;C
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#282c3f]">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#282c3f]">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#282c3f]">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#282c3f]">
                  Cancellation
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#282c3f]">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#282c3f]">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Experience App On Mobile */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#282c3f] mb-4">
              EXPERIENCE SHOPPULSE APP
            </h4>
            <p className="text-xs text-[#696b79] mb-3">
              Fast, event-aware shopping anytime on your phone.
            </p>
            <div className="flex flex-col gap-2 max-w-[150px]">
              <div className="rounded bg-black text-white px-3 py-1.5 text-center text-[10px] font-bold cursor-pointer">
                Google Play
              </div>
              <div className="rounded bg-black text-white px-3 py-1.5 text-center text-[10px] font-bold cursor-pointer">
                App Store
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#282c3f] mb-2">
                KEEP IN TOUCH
              </h5>
              <div className="flex items-center gap-3 text-sm text-[#696b79]">
                <span className="cursor-pointer hover:text-[#ff3f6c]">Facebook</span>
                <span>•</span>
                <span className="cursor-pointer hover:text-[#ff3f6c]">Instagram</span>
                <span>•</span>
                <span className="cursor-pointer hover:text-[#ff3f6c]">Twitter</span>
              </div>
            </div>
          </div>

          {/* Column 4: Guarantees (Myntra iconic badges) */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <strong className="text-xs font-bold text-[#282c3f] block">
                  100% ORIGINAL guarantee
                </strong>
                <p className="text-xs text-[#696b79] mt-0.5">
                  for all products at shoppulse.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-50 text-[#ff3f6c]">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <strong className="text-xs font-bold text-[#282c3f] block">
                  Return within 14 days
                </strong>
                <p className="text-xs text-[#696b79] mt-0.5">
                  of receiving your order with easy doorstep pickup
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Searches List (Myntra Footer style) */}
        <div className="py-6 border-b border-[#eaeaec] text-xs text-[#696b79]">
          <h5 className="font-bold text-[#282c3f] mb-1.5 uppercase text-[11px]">
            POPULAR SEARCHES
          </h5>
          <p className="leading-relaxed">
            Cricket Bats | India Jerseys | T-Shirts | Shirts | Wireless Headphones | Smartwatches | Sports Shoes | Running Shoes | Dresses | Jackets | Backpacks | Hoodies | Bluetooth Speakers | Tracksuits | Gaming Keyboards | Sunglasses
          </p>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94969f] gap-3">
          <span>In case of any concern, <strong>Contact Us</strong></span>
          <span>&copy; 2026 www.shoppulse.com. All rights reserved.</span>
          <span>A Flipkart &amp; Myntra Inspired Architecture</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
