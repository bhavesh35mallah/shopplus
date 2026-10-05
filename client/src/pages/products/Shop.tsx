import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
  Filter,
  Heart,
  Grid,
  List,
  Sparkles,
  RotateCcw,
  Check,
  Star,
  Zap,
  Flame,
  LayoutGrid,
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import QuickViewModal from "../../components/product/QuickViewModal";
import { useProducts } from "../../hooks/useProducts";
import { getCategories, type Category } from "../../api/categoryApi";
import { useWishlist } from "../../context/WishlistContext";
import type { Product } from "../../api/productApi";

const priceRanges = [
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 - ₹2,499", min: 1000, max: 2499 },
  { label: "₹2,500 - ₹4,999", min: 2500, max: 4999 },
  { label: "₹5,000 and above", min: 5000, max: 99999 },
];

const availableBrands = [
  "ShopPulse",
  "StrideX",
  "ApexGrid",
  "ChronoCraft",
  "LuxeFemme",
  "Loom & Stone",
  "PulseSport",
  "AuraTech",
  "UrbanStitch",
];

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useWishlist();

  // URL Parameters
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  const brandQuery = searchParams.get("brand") || "";
  const sortQuery = searchParams.get("sort") || "newest";
  const pageQuery = Number(searchParams.get("page")) || 1;
  const isWishlistView = searchParams.get("wishlist") === "true";
  const inStockQuery = searchParams.get("inStock") === "true";
  const minRatingQuery = searchParams.get("minRating")
    ? Number(searchParams.get("minRating"))
    : undefined;
  const minPriceQuery = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;
  const maxPriceQuery = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;

  // Local state
  const [categories, setCategories] = useState<Category[]>([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [layoutMode, setLayoutMode] = useState<"grid" | "dense" | "list">("grid");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Custom price input state
  const [customMin, setCustomMin] = useState(minPriceQuery?.toString() || "");
  const [customMax, setCustomMax] = useState(maxPriceQuery?.toString() || "");

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCats();
  }, []);

  const { products, pagination, loading, error } = useProducts({
    search: isWishlistView ? undefined : searchQuery,
    category: isWishlistView ? undefined : categoryQuery,
    brand: isWishlistView ? undefined : brandQuery,
    inStock: isWishlistView ? undefined : inStockQuery ? "true" : undefined,
    minRating: isWishlistView ? undefined : minRatingQuery,
    sort: isWishlistView ? undefined : sortQuery,
    page: isWishlistView ? 1 : pageQuery,
    minPrice: minPriceQuery,
    maxPrice: maxPriceQuery,
    limit: layoutMode === "dense" ? 20 : 16,
  });

  const updateFilters = (newParams: Record<string, string | null>) => {
    const current = new URLSearchParams(searchParams);
    // Exit wishlist mode if modifying catalog filters
    if (current.has("wishlist") && !newParams.wishlist) {
      current.delete("wishlist");
    }

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "") {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });
    setSearchParams(current);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryToggle = (slug: string) => {
    if (categoryQuery === slug) {
      updateFilters({ category: null, page: "1" });
    } else {
      updateFilters({ category: slug, page: "1" });
    }
  };

  const handleBrandToggle = (brandName: string) => {
    if (brandQuery.toLowerCase() === brandName.toLowerCase()) {
      updateFilters({ brand: null, page: "1" });
    } else {
      updateFilters({ brand: brandName, page: "1" });
    }
  };

  const handlePriceToggle = (min: number, max: number) => {
    if (minPriceQuery === min && maxPriceQuery === max) {
      updateFilters({ minPrice: null, maxPrice: null, page: "1" });
    } else {
      updateFilters({
        minPrice: min.toString(),
        maxPrice: max.toString(),
        page: "1",
      });
    }
  };

  const handleApplyCustomPrice = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({
      minPrice: customMin.trim() ? customMin.trim() : null,
      maxPrice: customMax.trim() ? customMax.trim() : null,
      page: "1",
    });
  };

  const handleRatingToggle = (ratingVal: number) => {
    if (minRatingQuery === ratingVal) {
      updateFilters({ minRating: null, page: "1" });
    } else {
      updateFilters({ minRating: ratingVal.toString(), page: "1" });
    }
  };

  const handleSortChange = (newSort: string) => {
    updateFilters({ sort: newSort, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    updateFilters({ page: newPage.toString() });
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setCustomMin("");
    setCustomMax("");
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
      categoryQuery ||
      brandQuery ||
      inStockQuery ||
      minRatingQuery !== undefined ||
      minPriceQuery !== undefined ||
      maxPriceQuery !== undefined ||
      isWishlistView
  );

  const filteredBrands = availableBrands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const currentCategoryName = categories.find((c) => c.slug === categoryQuery)?.name;

  // Display items: either wishlist items or API products
  const displayProducts = isWishlistView ? wishlist : products;

  return (
    <Layout>
      {/* ========================================================
          1. Editorial Hero Header Banner
          ======================================================== */}
      <section className="relative overflow-hidden bg-slate-950 py-10 sm:py-14 border-b border-slate-800 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,29,72,0.18),rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <Link to="/shop" className="hover:text-white transition-colors">
              Pro Catalog
            </Link>
            {isWishlistView ? (
              <>
                <ChevronRight className="h-3 w-3 text-slate-600" />
                <span className="font-bold text-rose-400">My Saved Wishlist</span>
              </>
            ) : categoryQuery ? (
              <>
                <ChevronRight className="h-3 w-3 text-slate-600" />
                <span className="font-bold text-slate-200 capitalize">
                  {currentCategoryName || categoryQuery.replace("-", " ")}
                </span>
              </>
            ) : searchQuery ? (
              <>
                <ChevronRight className="h-3 w-3 text-slate-600" />
                <span className="font-bold text-slate-200">"{searchQuery}"</span>
              </>
            ) : null}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-rose-400 border border-white/10 mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>ShopPulse 2026 Collection</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-['Urbanist']">
                {isWishlistView ? (
                  <span className="flex items-center gap-3">
                    <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
                    <span>My Saved Wishlist</span>
                  </span>
                ) : currentCategoryName ? (
                  currentCategoryName
                ) : searchQuery ? (
                  `Search Results: "${searchQuery}"`
                ) : (
                  "Pro-Grade Sporting & Active Gear"
                )}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-2xl font-['Manrope']">
                {isWishlistView
                  ? `Review and bag your saved items (${wishlist.length} products ready for dispatch).`
                  : "Tested by pro athletes for unmatched durability, featherweight ergonomics, and peak match performance."}
              </p>
            </div>

            {/* Live Catalog Metrics */}
            <div className="flex items-center gap-4 sm:gap-6 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-8">
              <div>
                <span className="text-xl sm:text-2xl font-black text-white font-['Urbanist']">
                  100+
                </span>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Pro Items
                </span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="text-xl sm:text-2xl font-black text-rose-400 font-['Urbanist']">
                  &lt; 24h
                </span>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Dispatch
                </span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-['Urbanist']">
                  100%
                </span>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Authentic
                </span>
              </div>
            </div>
          </div>

          {/* Quick Category Navigation Carousel */}
          {!isWishlistView && (
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  type="button"
                  onClick={() => updateFilters({ category: null, page: "1" })}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    !categoryQuery
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                      : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => {
                  const isSelected = categoryQuery === cat.slug;
                  return (
                    <button
                      key={cat._id}
                      type="button"
                      onClick={() => handleCategoryToggle(cat.slug)}
                      className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                          : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          2. Quick Preset Chips & Filter Control Strip
          ======================================================== */}
      <section className="bg-slate-50 border-b border-slate-200/80 py-3">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 flex flex-wrap items-center justify-between gap-3">
          {/* Quick Presets Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1 mr-1">
              <Zap className="h-3 w-3 text-amber-500" /> Fast Filters:
            </span>

            {/* In-Stock Preset */}
            <button
              type="button"
              onClick={() => updateFilters({ inStock: inStockQuery ? null : "true", page: "1" })}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                inStockQuery
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
              }`}
            >
              ✓ In Stock Only
            </button>

            {/* High Rating Preset */}
            <button
              type="button"
              onClick={() => handleRatingToggle(4)}
              className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                minRatingQuery === 4
                  ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
              }`}
            >
              <Star className={`h-3 w-3 ${minRatingQuery === 4 ? "fill-white" : "fill-amber-400 text-amber-400"}`} />
              <span>4.0★ & Above</span>
            </button>

            {/* Budget Presets */}
            <button
              type="button"
              onClick={() => handlePriceToggle(0, 999)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                minPriceQuery === 0 && maxPriceQuery === 999
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
              }`}
            >
              Under ₹1,000
            </button>

            <button
              type="button"
              onClick={() => handlePriceToggle(1000, 2499)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                minPriceQuery === 1000 && maxPriceQuery === 2499
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
              }`}
            >
              ₹1,000 - ₹2,500
            </button>
          </div>

          {/* View Switchers & Mobile Filter Trigger */}
          <div className="flex items-center gap-2.5 ml-auto">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-xs hover:bg-slate-50 cursor-pointer"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="h-2 w-2 rounded-full bg-rose-600" />
              )}
            </button>

            {/* Layout Mode Toggles */}
            <div className="hidden sm:flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setLayoutMode("grid")}
                title="Standard Grid View"
                className={`p-1.5 rounded-lg transition-colors ${
                  layoutMode === "grid"
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("dense")}
                title="Dense Compact Grid"
                className={`p-1.5 rounded-lg transition-colors ${
                  layoutMode === "dense"
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("list")}
                title="Editorial List View"
                className={`p-1.5 rounded-lg transition-colors ${
                  layoutMode === "list"
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            {!isWishlistView && (
              <div className="relative flex items-center">
                <select
                  value={sortQuery}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-1.5 pr-8 pl-3 text-xs font-bold text-slate-800 shadow-xs outline-none hover:border-slate-300 focus:border-rose-500 transition-colors"
                >
                  <option value="newest">Sort: What's New</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="oldest">Classic Popularity</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. Main Content: Filter Sidebar + Products Catalog
          ======================================================== */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8">
        {/* Active Filters Pill Bar */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
              Active Filters:
            </span>

            {isWishlistView && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700">
                <span>Wishlist Only</span>
                <button
                  type="button"
                  onClick={() => updateFilters({ wishlist: null })}
                  className="hover:text-rose-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {categoryQuery && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800">
                <span>Category: {currentCategoryName || categoryQuery}</span>
                <button
                  type="button"
                  onClick={() => updateFilters({ category: null })}
                  className="hover:text-slate-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {brandQuery && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800">
                <span>Brand: {brandQuery}</span>
                <button
                  type="button"
                  onClick={() => updateFilters({ brand: null })}
                  className="hover:text-slate-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {inStockQuery && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
                <span>In Stock Only</span>
                <button
                  type="button"
                  onClick={() => updateFilters({ inStock: null })}
                  className="hover:text-emerald-950"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {minRatingQuery !== undefined && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-900">
                <span>Rating: {minRatingQuery}★ & above</span>
                <button
                  type="button"
                  onClick={() => updateFilters({ minRating: null })}
                  className="hover:text-amber-950"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800">
                <span>Search: "{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => updateFilters({ search: null })}
                  className="hover:text-slate-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {(minPriceQuery !== undefined || maxPriceQuery !== undefined) && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800">
                <span>
                  Price: ₹{minPriceQuery || 0} - ₹{maxPriceQuery || "99,999"}
                </span>
                <button
                  type="button"
                  onClick={() => updateFilters({ minPrice: null, maxPrice: null })}
                  className="hover:text-slate-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 ml-auto"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* ========================================================
              Desktop Filter Sidebar
              ======================================================== */}
          {!isWishlistView && (
            <aside className="hidden lg:block w-72 flex-shrink-0 space-y-5">
              {/* Category Filter Box */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-['Urbanist']">
                    Categories
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {categories.length}
                  </span>
                </div>
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {categories.map((cat) => {
                    const isChecked = categoryQuery === cat.slug;
                    return (
                      <button
                        key={cat._id}
                        type="button"
                        onClick={() => handleCategoryToggle(cat.slug)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isChecked
                            ? "bg-slate-900 text-white font-bold shadow-xs"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        {isChecked && <Check className="h-3.5 w-3.5 text-rose-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter Box */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-['Urbanist'] mb-3 pb-2 border-b border-slate-100">
                  Price Filter
                </h3>
                <div className="space-y-1.5 mb-4">
                  {priceRanges.map((range, idx) => {
                    const isChecked =
                      minPriceQuery === range.min && maxPriceQuery === range.max;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePriceToggle(range.min, range.max)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isChecked
                            ? "bg-rose-50 text-rose-600 font-bold border border-rose-200/60"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{range.label}</span>
                        {isChecked && <Check className="h-3.5 w-3.5" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Min/Max Inputs */}
                <form
                  onSubmit={handleApplyCustomPrice}
                  className="pt-3 border-t border-slate-100 space-y-2.5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Custom Range (₹)
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={customMin}
                      onChange={(e) => setCustomMin(e.target.value)}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-rose-500"
                    />
                    <span className="text-slate-400 text-xs">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={customMax}
                      onChange={(e) => setCustomMax(e.target.value)}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-rose-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-slate-900 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-rose-600 transition-colors"
                  >
                    Apply Price
                  </button>
                </form>
              </div>

              {/* Brand Filter Box */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-['Urbanist']">
                    Brand
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {availableBrands.length}
                  </span>
                </div>

                <div className="relative mb-3">
                  <input
                    type="text"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    placeholder="Search brands..."
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 py-1.5 pr-2 pl-8 text-xs outline-none focus:border-rose-500"
                  />
                  <Search className="absolute top-2 left-2.5 h-3.5 w-3.5 text-slate-400" />
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {filteredBrands.map((brand) => {
                    const isChecked = brandQuery.toLowerCase() === brand.toLowerCase();
                    return (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => handleBrandToggle(brand)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isChecked
                            ? "bg-slate-900 text-white font-bold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{brand}</span>
                        {isChecked && <Check className="h-3 w-3 text-rose-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minimum Customer Rating Filter Box */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-['Urbanist'] mb-3 pb-2 border-b border-slate-100">
                  Athlete Rating
                </h3>
                <div className="space-y-1.5">
                  {[4.5, 4.0, 3.5, 3.0].map((starVal) => {
                    const isChecked = minRatingQuery === starVal;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => handleRatingToggle(starVal)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isChecked
                            ? "bg-amber-50 text-amber-900 font-bold border border-amber-200/70"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span>{starVal.toFixed(1)} & above</span>
                        </div>
                        {isChecked && <Check className="h-3.5 w-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          )}

          {/* ========================================================
              Right Main Catalog Area
              ======================================================== */}
          <main className="flex-1">
            {/* Catalog Info & Item Count Row */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-500">
                {isWishlistView
                  ? `Showing ${wishlist.length} saved products`
                  : `Showing ${products.length} of ${pagination.total || products.length} products`}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                ⚡ Ready to Dispatch
              </span>
            </div>

            {/* Loading Shimmer Skeletons */}
            {loading && !isWishlistView && (
              <div
                className={`grid gap-4 ${
                  layoutMode === "list"
                    ? "grid-cols-1"
                    : layoutMode === "dense"
                    ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-5"
                    : "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse space-y-3 bg-white p-3 rounded-2xl border border-slate-100"
                  >
                    <div className="aspect-[3/4] w-full bg-slate-200 rounded-xl" />
                    <div className="h-3 w-1/3 bg-slate-200 rounded" />
                    <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            )}

            {/* Error Message */}
            {error && !isWishlistView && (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
                <p className="text-sm font-bold text-rose-600">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white uppercase hover:bg-slate-800 transition-colors"
                >
                  Reload Catalog
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && displayProducts.length === 0 && (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
                <div className="h-16 w-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  {isWishlistView ? (
                    <Heart className="h-8 w-8 text-rose-400" />
                  ) : (
                    <Search className="h-8 w-8 text-slate-400" />
                  )}
                </div>
                <h3 className="text-lg font-black text-slate-900 font-['Urbanist']">
                  {isWishlistView
                    ? "Your wishlist is empty"
                    : "No matching products found"}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  {isWishlistView
                    ? "Tap the heart icon on any gear item across the catalog to save it for quick reference."
                    : "Try adjusting your price range, clearing brand filters, or searching a different sporting keyword."}
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-rose-600 transition-colors shadow-sm"
                  >
                    {isWishlistView ? "Browse All Products" : "Reset All Filters"}
                  </button>
                </div>
              </div>
            )}

            {/* Product Cards Grid / List */}
            {displayProducts.length > 0 && (
              <div
                className={`grid gap-4 ${
                  layoutMode === "list"
                    ? "grid-cols-1"
                    : layoutMode === "dense"
                    ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-5"
                    : "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                {displayProducts.map((product, idx) => (
                  <React.Fragment key={product._id}>
                    <ProductCard
                      product={product}
                      layout={layoutMode}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />

                    {/* Promotional Editorial Bento Card Inset after 6th product */}
                    {idx === 5 && layoutMode !== "list" && !isWishlistView && (
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 p-6 text-white flex flex-col justify-between shadow-lg col-span-2 border border-rose-900/30">
                        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-rose-500/20 blur-2xl" />
                        <div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-rose-400 bg-white/10 px-2.5 py-1 rounded-full mb-3">
                            <Flame className="h-3 w-3" /> Machine Knocking Lab
                          </span>
                          <h4 className="text-xl font-black font-['Urbanist'] leading-tight">
                            Match Ready In 24 Hours
                          </h4>
                          <p className="mt-2 text-xs text-slate-300 leading-relaxed max-w-sm">
                            Order any English Willow bat today and get 15,000-strike machine knocked, oiled & face-scuffed for zero matchday risk.
                          </p>
                        </div>
                        <div className="mt-5 flex items-center gap-3">
                          <Link
                            to="/shop?category=cricket"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-rose-500 transition-colors shadow-sm"
                          >
                            Explore Bats
                          </Link>
                          <span className="text-[11px] font-semibold text-slate-400">
                            Starting ₹499
                          </span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {!isWishlistView && pagination.pages > 1 && (
              <div className="mt-12 bg-white rounded-3xl p-5 border border-slate-200/80 flex items-center justify-between shadow-xs">
                <div className="text-xs text-slate-500">
                  Page <strong className="text-slate-900">{pageQuery}</strong> of{" "}
                  <strong className="text-slate-900">{pagination.pages}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={pageQuery <= 1}
                    onClick={() => handlePageChange(pageQuery - 1)}
                    className="border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <div className="hidden sm:flex items-center gap-1 mx-2">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handlePageChange(num)}
                        className={`h-9 w-9 rounded-xl text-xs font-bold transition-all ${
                          num === pageQuery
                            ? "bg-slate-900 text-white shadow-xs"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={pageQuery >= pagination.pages}
                    onClick={() => handlePageChange(pageQuery + 1)}
                    className="border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================
          4. Mobile Slide-Over Filters Drawer
          ======================================================== */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-900" />
                <h3 className="font-black text-sm text-slate-900 font-['Urbanist']">
                  Filter Catalog
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-6 flex-1">
              {/* Categories */}
              <div>
                <h4 className="text-xs font-black uppercase text-slate-900 mb-2 font-['Urbanist']">
                  Category
                </h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      type="button"
                      onClick={() => {
                        handleCategoryToggle(cat.slug);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold ${
                        categoryQuery === cat.slug
                          ? "bg-slate-900 text-white font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {categoryQuery === cat.slug && <Check className="h-3 w-3" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Ranges */}
              <div>
                <h4 className="text-xs font-black uppercase text-slate-900 mb-2 font-['Urbanist']">
                  Price Range
                </h4>
                <div className="space-y-1">
                  {priceRanges.map((range, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        handlePriceToggle(range.min, range.max);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold ${
                        minPriceQuery === range.min && maxPriceQuery === range.max
                          ? "bg-rose-50 text-rose-600 font-bold border border-rose-200"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{range.label}</span>
                      {minPriceQuery === range.min && maxPriceQuery === range.max && (
                        <Check className="h-3 w-3" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="text-xs font-black uppercase text-slate-900 mb-2 font-['Urbanist']">
                  Brand
                </h4>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {availableBrands.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => {
                        handleBrandToggle(brand);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold ${
                        brandQuery.toLowerCase() === brand.toLowerCase()
                          ? "bg-slate-900 text-white font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{brand}</span>
                      {brandQuery.toLowerCase() === brand.toLowerCase() && (
                        <Check className="h-3 w-3" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Reset All Filters
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-rose-600 transition-colors"
              >
                View {displayProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          5. Quick View Modal
          ======================================================== */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </Layout>
  );
};

export default Shop;