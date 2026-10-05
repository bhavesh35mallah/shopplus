import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Eye, TrendingUp, Sparkles } from "lucide-react";

interface PulseActivity {
  id: string;
  customerName: string;
  city: string;
  action: "purchased" | "viewed" | "added to cart";
  productName: string;
  productImage: string;
  productPrice: number;
  timeAgo: string;
  productSlug?: string;
}

const mockPulses: PulseActivity[] = [
  {
    id: "p-1",
    customerName: "Aarav S.",
    city: "Mumbai",
    action: "purchased",
    productName: "Aura Pro Grade 1 English Willow Bat",
    productImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=200&auto=format&fit=crop&q=80",
    productPrice: 6499,
    timeAgo: "Just now",
  },
  {
    id: "p-2",
    customerName: "Sneha N.",
    city: "Bengaluru",
    action: "added to cart",
    productName: "CloudFoam Pro Nitrogen Running Shoes",
    productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80",
    productPrice: 2899,
    timeAgo: "2m ago",
  },
  {
    id: "p-3",
    customerName: "Rohit D.",
    city: "Delhi NCR",
    action: "purchased",
    productName: "Heavyweight 240 GSM Boxy Tee",
    productImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&auto=format&fit=crop&q=80",
    productPrice: 899,
    timeAgo: "4m ago",
  },
  {
    id: "p-4",
    customerName: "Vikram S.",
    city: "Hyderabad",
    action: "purchased",
    productName: "Aura Studio ANC Wireless Headphones",
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80",
    productPrice: 4999,
    timeAgo: "7m ago",
  },
];

export const LiveShoppingPulse: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [pulseCount, setPulseCount] = useState(48);

  // Auto-cycle through pulses every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockPulses.length);
      setPulseCount((c) => c + Math.floor(Math.random() * 2));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = mockPulses[currentIndex];

  return (
    <>
      {/* 1. INLINE SECTION BANNER */}
      <section className="bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-950 py-3.5 border-y border-rose-500/20 text-white">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
            </span>
            <div className="flex items-center gap-2">
              <span className="font-extrabold uppercase tracking-wider text-rose-400">
                🔥 Live Shopping Pulse:
              </span>
              <span className="text-slate-200">
                <strong className="text-white font-bold">{pulseCount} orders placed</strong> in the last 15 minutes across India
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-slate-300">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Checkout Velocity: 3.4/min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Express Metro Delivery Guaranteed</span>
            </div>
            <Link
              to="/shop"
              className="text-rose-400 font-bold hover:text-rose-300 transition-colors flex items-center gap-1"
            >
              <span>Explore Active Trending</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FLOATING REAL-TIME ACTIVITY TOAST (Bottom-Left) */}
      {isVisible && (
        <div className="fixed bottom-6 left-6 z-40 max-w-sm rounded-2xl border border-slate-700/80 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md text-white transition-all animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
              <img
                src={current.productImage}
                alt={current.productName}
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
            </div>

            <div className="flex-1 pr-4">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <span className="font-bold text-white">{current.customerName}</span>
                <span>from {current.city}</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-semibold">{current.timeAgo}</span>
              </div>

              <p className="mt-0.5 text-xs font-bold text-slate-100 line-clamp-1">
                {current.action === "purchased" ? "Bought" : "Added"} {current.productName}
              </p>

              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span className="font-black text-rose-400">
                  ₹{current.productPrice.toLocaleString("en-IN")}
                </span>
                <Link
                  to="/shop"
                  className="font-bold text-slate-300 hover:text-white flex items-center gap-1"
                >
                  <Eye className="w-3 h-3 text-slate-400" />
                  <span>View</span>
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Close live notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
