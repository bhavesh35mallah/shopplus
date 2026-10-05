import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  X,
  Flame,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { getProducts, type Product } from "../../api/productApi";
import { useCart } from "../../context/CartContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = [
  "Cricket Bat",
  "Wireless Earbuds",
  "Oversized T-Shirt",
  "Running Shoes",
  "Smartwatch",
  "Denim Jacket",
  "Leather Wallet",
  "Gaming Mouse",
];

const quickCategories = [
  { name: "Cricket Gear", slug: "cricket", emoji: "🏏" },
  { name: "Electronics", slug: "electronics", emoji: "⚡" },
  { name: "Men's Apparel", slug: "mens-fashion", emoji: "👕" },
  { name: "Women's Fashion", slug: "womens-fashion", emoji: "👗" },
  { name: "Footwear", slug: "footwear", emoji: "👟" },
];

const RECENT_SEARCHES_KEY = "shoppulse_recent_searches_v1";

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      return stored ? JSON.parse(stored) : ["Cricket Bat", "Smartwatch"];
    } catch {
      return ["Cricket Bat", "Smartwatch"];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus input whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Global ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced live search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await getProducts({
          search: query.trim(),
          category: activeCategory || undefined,
          limit: 6,
        });
        setResults(data.products || []);
      } catch (err) {
        console.error("Live search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query, activeCategory]);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const updated = [trimmed, ...prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query);
      navigate(
        `/shop?search=${encodeURIComponent(query.trim())}${
          activeCategory ? `&category=${activeCategory}` : ""
        }`
      );
      onClose();
    }
  };

  const handleSelectTerm = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
    navigate(`/shop?search=${encodeURIComponent(term)}`);
    onClose();
  };

  const handleSelectCategory = (catSlug: string) => {
    navigate(`/shop?category=${catSlug}`);
    onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 pb-6 overflow-y-auto">
      {/* Frosted Glass Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Floating Spotlight Modal Window */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-white/80 overflow-hidden ring-1 ring-slate-900/10 z-10 transform transition-all duration-200 animate-scaleUp"
      >
        {/* Search Bar Input Row */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-slate-100 p-4 sm:p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mr-3 flex-shrink-0">
            <Search className="h-5 w-5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, gear (e.g. Cricket, Shoes, Audio)..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal outline-none pr-16"
          />

          <div className="flex items-center gap-2 flex-shrink-0">
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <span>ESC</span>
            </button>
          </div>
        </form>

        {/* Quick Category Filter Pills */}
        <div className="px-5 py-2.5 bg-slate-50/60 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory("")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
              activeCategory === ""
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            All Departments
          </button>
          {quickCategories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActiveCategory(activeCategory === c.slug ? "" : c.slug)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex-shrink-0 flex items-center gap-1 cursor-pointer ${
                activeCategory === c.slug
                  ? "bg-rose-500 text-white shadow-xs"
                  : "bg-white border border-slate-200/80 text-slate-700 hover:border-slate-400"
              }`}
            >
              <span>{c.emoji}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="max-h-[62vh] overflow-y-auto p-5 space-y-6">
          {/* ========================================================
              Case 1: User is typing (Live Results)
              ======================================================== */}
          {query.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-rose-500" />
                  <span>Matching Products</span>
                </span>
                {loading && (
                  <span className="text-[11px] font-semibold text-rose-500 animate-pulse">
                    Searching catalog...
                  </span>
                )}
              </div>

              {loading && results.length === 0 ? (
                <div className="space-y-2.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 animate-pulse">
                      <div className="h-14 w-14 rounded-xl bg-slate-200 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/3 bg-slate-200 rounded" />
                        <div className="h-4 w-3/4 bg-slate-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((product) => (
                    <div
                      key={product._id}
                      className="group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-200 shadow-xs transition-all"
                    >
                      <Link
                        to={`/products/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3.5 flex-1 min-w-0"
                      >
                        <img
                          src={product.images?.[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"}
                          alt={product.name}
                          className="h-14 w-14 rounded-xl object-cover object-top bg-slate-100 flex-shrink-0"
                        />
                        <div className="truncate">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
                            {product.brand || "ShopPulse"}
                          </span>
                          <h4 className="text-xs font-semibold text-slate-800 truncate group-hover:text-rose-600 transition-colors">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-slate-900">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                            {product.compareAtPrice && product.compareAtPrice > product.price && (
                              <span className="text-[10px] text-slate-400 line-through">
                                ₹{product.compareAtPrice.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>

                      <div className="flex items-center gap-2 pl-3">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(product, 1);
                            onClose();
                          }}
                          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
                          title="Add to shopping bag"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* View All Matches Button */}
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full mt-3 flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <span>View all results for "{query}"</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : !loading ? (
                <div className="py-10 text-center">
                  <p className="text-sm font-bold text-slate-800">
                    No products matched "{query}"
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Try searching for popular terms like "Cricket", "Earbuds", or "Shoes".
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            /* ========================================================
                Case 2: Zero-state (Recent Searches, Trending, Quick links)
                ======================================================== */
            <div className="space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Recent Searches</span>
                    </span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-[11px] font-semibold text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      Clear history
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleSelectTerm(term)}
                        className="flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
                      >
                        <Clock className="h-3 w-3 text-slate-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                  <Flame className="h-3.5 w-3.5 text-rose-500" />
                  <span>Trending Searches</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleSelectTerm(term)}
                      className="flex items-center gap-1.5 rounded-full bg-white border border-slate-200/80 hover:border-rose-400 hover:bg-rose-50/50 hover:text-rose-600 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-all cursor-pointer shadow-xs"
                    >
                      <TrendingUp className="h-3 w-3 text-rose-500" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse Quick Departments */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Browse by Department
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {quickCategories.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => handleSelectCategory(c.slug)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/90 border border-slate-100 hover:border-slate-200 transition-colors text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{c.emoji}</span>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors">
                          {c.name}
                        </span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600 font-bold">↵</kbd> to search</span>
            <span>Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600 font-bold">esc</kbd> to close</span>
          </div>
          <span className="hidden sm:inline">ShopPulse Live Event Search</span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
