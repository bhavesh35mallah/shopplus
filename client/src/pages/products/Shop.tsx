import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  SlidersHorizontal,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ArrowUpDown,
  X,
  Search,
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import { getCategories, type Category } from "../../api/categoryApi";

const pricePresets = [
  { label: "All Prices", min: undefined, max: undefined },
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 – ₹2,500", min: 1000, max: 2500 },
  { label: "₹2,500 – ₹5,000", min: 2500, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: 99999 },
];

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Parameters state
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  const sortQuery = searchParams.get("sort") || "newest";
  const pageQuery = Number(searchParams.get("page")) || 1;
  const minPriceQuery = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPriceQuery = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;

  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [customMin, setCustomMin] = useState(minPriceQuery?.toString() || "");
  const [customMax, setCustomMax] = useState(maxPriceQuery?.toString() || "");
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Sync search input with URL
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Load Categories for filter sidebar
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

  // Fetch products with current parameters
  const { products, pagination, loading, error } = useProducts({
    search: searchQuery,
    category: categoryQuery,
    sort: sortQuery,
    page: pageQuery,
    minPrice: minPriceQuery,
    maxPrice: maxPriceQuery,
    limit: 12,
  });

  const updateFilters = (newParams: Record<string, string | null>) => {
    const current = new URLSearchParams(searchParams);
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

  const handleCategorySelect = (slug: string | null) => {
    updateFilters({ category: slug, page: "1" });
  };

  const handlePricePreset = (min?: number, max?: number) => {
    updateFilters({
      minPrice: min !== undefined ? min.toString() : null,
      maxPrice: max !== undefined ? max.toString() : null,
      page: "1",
    });
    setCustomMin(min !== undefined ? min.toString() : "");
    setCustomMax(max !== undefined ? max.toString() : "");
  };

  const handleCustomPriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({
      minPrice: customMin ? customMin : null,
      maxPrice: customMax ? customMax : null,
      page: "1",
    });
  };

  const handleSortChange = (newSort: string) => {
    updateFilters({ sort: newSort, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    updateFilters({ page: newPage.toString() });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchInput.trim() ? searchInput.trim() : null, page: "1" });
  };

  const resetAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setCustomMin("");
    setCustomMax("");
    setSearchInput("");
  };

  const hasActiveFilters = Boolean(
    searchQuery || categoryQuery || minPriceQuery !== undefined || maxPriceQuery !== undefined
  );

  return (
    <Layout>
      {/* Breadcrumb Bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <Link to="/shop" className="hover:text-slate-900 transition-colors">
            Shop
          </Link>
          {categoryQuery && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-semibold text-slate-900 capitalize">
                {categoryQuery.replace("-", " ")}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>The Curated Storefront</span>
              </div>
              <h1 className="mt-1 text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                {categoryQuery
                  ? categories.find((c) => c.slug === categoryQuery)?.name || "Category Catalog"
                  : "Explore All Products"}
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-xl">
                Discover over 100+ premium cricket gear, modern apparel, audio electronics, and sneakers curated with real-time discounts.
              </p>
            </div>

            {/* Quick Search on Shop Header */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-80">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Filter catalog..."
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pr-4 pl-9 text-xs text-slate-900 shadow-sm outline-none focus:border-slate-900"
                />
                <Search className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex gap-10">
          {/* ========================================================
              Desktop Left Sidebar Filters
              ======================================================== */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
            {/* Filter Header & Reset */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filter Products</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Categories Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleCategorySelect(null)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    !categoryQuery
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span>All Categories</span>
                  <span>101</span>
                </button>
                {categories.map((cat) => {
                  const isActive = categoryQuery === cat.slug;
                  return (
                    <button
                      key={cat._id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                        isActive
                          ? "bg-slate-900 text-white font-semibold shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] opacity-70">→</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Presets */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Price Range
              </h3>
              <div className="space-y-1">
                {pricePresets.map((preset, idx) => {
                  const isPresetActive =
                    minPriceQuery === preset.min && maxPriceQuery === preset.max;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePricePreset(preset.min, preset.max)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition-all ${
                        isPresetActive
                          ? "bg-slate-900 text-white font-semibold shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span>{preset.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Min / Max Inputs */}
              <form onSubmit={handleCustomPriceSubmit} className="mt-4 pt-4 border-t border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Custom Range (₹)
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={customMin}
                    onChange={(e) => setCustomMin(e.target.value)}
                    placeholder="Min"
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs outline-none focus:border-slate-900"
                  />
                  <span className="text-slate-400 text-xs">-</span>
                  <input
                    type="number"
                    value={customMax}
                    onChange={(e) => setCustomMax(e.target.value)}
                    placeholder="Max"
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs outline-none focus:border-slate-900"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg bg-slate-100 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Apply Filter
                </button>
              </form>
            </div>
          </aside>

          {/* ========================================================
              Right: Products Stream & Controls
              ======================================================== */}
          <main className="flex-1">
            {/* Top Toolbar: Results count & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="flex items-center gap-2 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </button>

                <p className="text-xs font-medium text-slate-500">
                  Showing{" "}
                  <strong className="text-slate-900 font-bold">
                    {pagination.total > 0 ? (pageQuery - 1) * 12 + 1 : 0} –{" "}
                    {Math.min(pageQuery * 12, pagination.total)}
                  </strong>{" "}
                  of <strong className="text-slate-900">{pagination.total}</strong> products
                </p>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                  <span>Sort by:</span>
                </span>
                <select
                  value={sortQuery}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none shadow-sm focus:border-slate-900"
                >
                  <option value="newest">Featured &amp; Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="oldest">Classic Releases</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-slate-400">Active Filters:</span>
                {categoryQuery && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                    <span className="capitalize">{categoryQuery.replace("-", " ")}</span>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect(null)}
                      className="hover:text-rose-300"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
                {(minPriceQuery !== undefined || maxPriceQuery !== undefined) && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                    <span>
                      ₹{minPriceQuery || 0} – ₹{maxPriceQuery || "Max"}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePricePreset(undefined, undefined)}
                      className="hover:text-rose-300"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                    <span>"{searchQuery}"</span>
                    <button
                      type="button"
                      onClick={() => updateFilters({ search: null, page: "1" })}
                      className="hover:text-rose-300"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs font-semibold text-rose-600 hover:underline ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Loading Skeleton View */}
            {loading && (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 animate-pulse space-y-3"
                  >
                    <div className="aspect-[4/5] w-full rounded-xl bg-slate-200" />
                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                    <div className="h-3 w-1/2 rounded bg-slate-200" />
                    <div className="h-4 w-1/3 rounded bg-slate-200 pt-2" />
                  </div>
                ))}
              </div>
            )}

            {/* Error View */}
            {error && (
              <div className="py-24 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 mb-4">
                  ⚠️
                </div>
                <h3 className="text-lg font-bold text-slate-900">{error}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Please verify your backend connection or try again.
                </p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
                >
                  Reload Page
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
              <div className="py-24 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl mb-4">
                  🔍
                </div>
                <h3 className="text-xl font-bold text-slate-900">No products matched your criteria</h3>
                <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                  Try adjusting your price range, searching for different keywords, or clearing your category filters.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}

            {/* Product Grid */}
            {!loading && products.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Modern Pagination Controls */}
            {pagination.pages > 1 && (
              <div className="mt-14 flex items-center justify-between border-t border-slate-200 pt-6">
                <button
                  type="button"
                  disabled={pageQuery <= 1}
                  onClick={() => handlePageChange(pageQuery - 1)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pageNum) => {
                    const isCurrent = pageNum === pageQuery;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`h-9 w-9 rounded-xl text-xs font-bold transition-all ${
                          isCurrent
                            ? "bg-slate-900 text-white shadow-md"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={pageQuery >= pagination.pages}
                  onClick={() => handlePageChange(pageQuery + 1)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;