import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingBag, Trash2, Star } from "lucide-react";
import { useDynamicStore, type StoredProduct } from "../../utils/dynamicStore";
import { useCart } from "../../context/CartContext";

export const RecentlyViewed: React.FC = () => {
  const { products } = useDynamicStore();
  const { addToCart } = useCart();
  const [recentItems, setRecentItems] = useState<StoredProduct[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("shoppulse_recently_viewed");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecentItems(parsed.slice(0, 5));
          return;
        }
      }
    } catch {
      // Fallback
    }

    // Default fallback to first 4 items from products if fresh session
    if (products.length > 0) {
      setRecentItems(products.slice(0, 4));
    }
  }, [products]);

  const clearHistory = () => {
    localStorage.removeItem("shoppulse_recently_viewed");
    // Show top 4 curated items
    setRecentItems(products.slice(0, 4));
  };

  if (recentItems.length === 0) return null;

  return (
    <section className="bg-slate-950 py-16 text-white border-b border-slate-800 relative">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <Eye className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>👁️ Recently Viewed</span>
              </h2>
              <p className="text-xs text-slate-400">Pick up right where your session left off</p>
            </div>
          </div>

          <button
            onClick={clearHistory}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 transition-colors py-1.5 px-3 rounded-lg border border-slate-800/80 hover:border-rose-500/30"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>

        {/* Horizontal scroll or grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recentItems.map((product) => {
            const displayImg =
              (product.images && product.images[0]) ||
              "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80";

            return (
              <div
                key={product._id || product.id}
                className="group bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 mb-2.5">
                    <img
                      src={displayImg}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <span>{product.rating || "4.8"}</span>
                    </div>
                  </div>

                  <Link to={`/product/${product._id || product.id}`}>
                    <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-indigo-400 transition-colors line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-black text-sm text-white">₹{product.price?.toLocaleString()}</span>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <span className="text-[10px] text-slate-500 line-through">
                        ₹{product.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 border border-slate-700 hover:border-indigo-500"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
