import React, { useState, useEffect } from "react";
import { Flame, Clock, AlertTriangle, ShoppingBag } from "lucide-react";
import { useDynamicStore } from "../../utils/dynamicStore";
import { useCart } from "../../context/CartContext";

export const AlmostSoldOut: React.FC = () => {
  const { products } = useDynamicStore();
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 58 });

  // Ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter or take products with low stock (<= 6 units), fallback to first 4 products
  const lowStockItems = products.filter((p) => (p.stock ?? 10) <= 6);
  const displayItems = lowStockItems.length >= 2 ? lowStockItems.slice(0, 4) : products.slice(0, 4);

  return (
    <section className="bg-slate-950 py-16 text-white border-y border-rose-500/20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-rose-400 border border-rose-500/30">
              <Flame className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
              <span>Critical Warehouse Depletion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>🚨 Almost Sold Out</span>
              <span className="text-xs bg-rose-600 px-2 py-0.5 rounded-md font-bold text-white uppercase">
                Under 5 Units Left
              </span>
            </h2>
            <p className="text-xs text-slate-400 max-w-xl">
              High-velocity matchplay items and limited tournament apparel about to drop to zero inventory. Orders fulfilled on first-come reservation.
            </p>
          </div>

          {/* Urgent Timer */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-rose-500/30 rounded-2xl p-3 shadow-xl">
            <Clock className="w-4 h-4 text-rose-400 animate-spin" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Flash Allocation Window</span>
              <div className="flex items-center gap-1 font-mono font-black text-base text-rose-400">
                <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((prod) => {
            const stockLeft = Math.max(1, (prod.stock ?? 4) % 6 || 2);
            const claimedPercent = Math.min(95, 100 - stockLeft * 8);

            return (
              <div
                key={prod._id || prod.id}
                className="group rounded-3xl bg-slate-900/80 border border-slate-800 p-4 flex flex-col justify-between hover:border-rose-500/50 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Image & Urgency Pill */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 mb-4">
                    <img
                      src={
                        prod.images?.[0] ||
                        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80"
                      }
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-rose-600/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-white shadow-md">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Only {stockLeft} Left</span>
                    </div>
                  </div>

                  {/* Category & Title */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                    {prod.category?.name || "Tournament Gear"}
                  </span>
                  <h3 className="text-sm font-bold text-white line-clamp-1 mt-0.5 group-hover:text-rose-300 transition-colors">
                    {prod.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-black text-rose-400">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </span>
                    {prod.compareAtPrice && (
                      <span className="text-xs text-slate-500 line-through">
                        ₹{prod.compareAtPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Stock Bar */}
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                      <span>Inventory: <strong className="text-rose-400 font-bold">{stockLeft} units</strong></span>
                      <span>{claimedPercent}% Claimed</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full transition-all duration-500"
                        style={{ width: `${claimedPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Claim CTA Button */}
                <div className="pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart({
                        _id: prod._id || prod.id || "",
                        name: prod.name,
                        slug: prod.slug || "product",
                        sku: prod.sku || `SKU-${prod._id || "LOW"}`,
                        price: prod.price,
                        category: {
                          _id: prod.category?._id || "c1",
                          name: prod.category?.name || "Sports",
                          slug: prod.category?.slug || "sports",
                        },
                        images: prod.images || [],
                        description: prod.description || "",
                        stock: prod.stock || 2,
                        rating: prod.rating || 4.8,
                        reviewsCount: prod.reviewsCount || 10,
                        tags: prod.tags || [],
                        eventTags: prod.eventTags || ["almost-sold-out"],
                        status: "active",
                      });
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-500 py-2.5 text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-rose-900/30"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Claim Remaining Stock</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
