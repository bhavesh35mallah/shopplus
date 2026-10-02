import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronDown,
  Search,
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import { getCategories, type Category } from "../../api/categoryApi";

const priceRanges = [
  { label: "Rs. 499 to Rs. 1499", min: 499, max: 1499 },
  { label: "Rs. 1499 to Rs. 2999", min: 1499, max: 2999 },
  { label: "Rs. 2999 to Rs. 4999", min: 2999, max: 4999 },
  { label: "Rs. 4999 and above", min: 4999, max: 99999 },
];

const availableBrands = [
  "PulseSport",
  "AuraTech",
  "UrbanStitch",
  "LuxeFemme",
  "StrideX",
  "ChronoCraft",
  "ApexGrid",
  "Loom & Stone",
];

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Parameters
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  const sortQuery = searchParams.get("sort") || "newest";
  const pageQuery = Number(searchParams.get("page")) || 1;
  const minPriceQuery = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPriceQuery = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;

  const [categories, setCategories] = useState<Category[]>([]);
  const [brandSearch, setBrandSearch] = useState("");

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
    search: searchQuery,
    category: categoryQuery,
    sort: sortQuery,
    page: pageQuery,
    minPrice: minPriceQuery,
    maxPrice: maxPriceQuery,
    limit: 16,
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

  const handleCategoryToggle = (slug: string) => {
    if (categoryQuery === slug) {
      updateFilters({ category: null, page: "1" });
    } else {
      updateFilters({ category: slug, page: "1" });
    }
  };

  const handlePriceToggle = (min: number, max: number) => {
    if (minPriceQuery === min && maxPriceQuery === max) {
      updateFilters({ minPrice: null, maxPrice: null, page: "1" });
    } else {
      updateFilters({ minPrice: min.toString(), maxPrice: max.toString(), page: "1" });
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
  };

  const hasActiveFilters = Boolean(
    searchQuery || categoryQuery || minPriceQuery !== undefined || maxPriceQuery !== undefined
  );

  const filteredBrands = availableBrands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const currentCategoryName = categories.find((c) => c.slug === categoryQuery)?.name;

  return (
    <Layout>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12 py-4">
        {/* Breadcrumb row */}
        <div className="flex items-center gap-1.5 text-xs text-[#535766] py-2">
          <Link to="/" className="hover:text-[#282c3f]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-[#7e818c]" />
          <Link to="/shop" className="hover:text-[#282c3f]">
            Catalog
          </Link>
          {categoryQuery && (
            <>
              <ChevronRight className="h-3 w-3 text-[#7e818c]" />
              <span className="font-semibold text-[#282c3f] capitalize">
                {currentCategoryName || categoryQuery.replace("-", " ")}
              </span>
            </>
          )}
        </div>

        {/* Page Title & Item Count Header */}
        <div className="mt-2 flex items-baseline gap-2">
          <h1 className="text-base font-bold text-[#282c3f] uppercase tracking-wide">
            {currentCategoryName ? currentCategoryName : searchQuery ? `Search for "${searchQuery}"` : "All Products"}
          </h1>
          <span className="text-sm font-normal text-[#878b94]">
            - {pagination.total} items
          </span>
        </div>

        {/* Filters Header Bar & Sort Dropdown */}
        <div className="mt-4 flex items-center justify-between border-y border-[#eaeaec] py-3.5">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold uppercase tracking-wider text-[#282c3f]">
              FILTERS
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-bold text-[#ff3f6c] uppercase tracking-wider hover:underline"
              >
                CLEAR ALL
              </button>
            )}
          </div>

          {/* Sort By Dropdown (Myntra border style) */}
          <div className="relative flex items-center">
            <label className="text-xs text-[#282c3f] mr-2 hidden sm:inline">Sort by :</label>
            <div className="relative">
              <select
                value={sortQuery}
                onChange={(e) => handleSortChange(e.target.value)}
                className="cursor-pointer appearance-none rounded border border-[#d4d5d9] bg-white py-1.5 pr-8 pl-3 text-xs font-bold text-[#282c3f] outline-none hover:border-[#282c3f] transition-colors"
              >
                <option value="newest">What's New (Recommended)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="oldest">Classic Popularity</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-2.5 right-2 h-3.5 w-3.5 text-[#535766]" />
            </div>
          </div>
        </div>

        {/* Main Body: Sidebar + Product Grid */}
        <div className="flex">
          {/* ========================================================
              Left Sidebar: Myntra Multi-Facet Filters
              ======================================================== */}
          <aside className="hidden lg:block w-[240px] flex-shrink-0 border-r border-[#eaeaec] pr-6 py-4 space-y-6">
            {/* Category Filter Section */}
            <div className="border-b border-[#eaeaec] pb-6">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#282c3f] mb-3">
                CATEGORIES
              </span>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {categories.map((cat) => {
                  const isChecked = categoryQuery === cat.slug;
                  return (
                    <label
                      key={cat._id}
                      className="flex items-center gap-2.5 cursor-pointer text-xs text-[#282c3f] hover:font-bold select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryToggle(cat.slug)}
                        className="h-4 w-4 rounded border-[#d4d5d9] accent-[#ff3f6c] cursor-pointer"
                      />
                      <span className={`truncate ${isChecked ? "font-bold text-[#282c3f]" : "text-[#282c3f]"}`}>
                        {cat.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Brand Filter Section with Search */}
            <div className="border-b border-[#eaeaec] pb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#282c3f]">
                  BRAND
                </span>
              </div>
              <div className="relative mb-2">
                <input
                  type="text"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Search brand"
                  className="w-full rounded bg-[#f5f5f6] border border-transparent py-1.5 pr-2 pl-7 text-[11px] outline-none"
                />
                <Search className="absolute top-2 left-2 h-3 w-3 text-[#696e79]" />
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {filteredBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2.5 cursor-pointer text-xs text-[#282c3f] hover:font-bold select-none"
                  >
                    <input
                      type="checkbox"
                      onChange={() => updateFilters({ search: brand, page: "1" })}
                      checked={searchQuery.toLowerCase() === brand.toLowerCase()}
                      className="h-4 w-4 rounded border-[#d4d5d9] accent-[#ff3f6c] cursor-pointer"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter Section */}
            <div className="border-b border-[#eaeaec] pb-6">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#282c3f] mb-3">
                PRICE
              </span>
              <div className="space-y-2">
                {priceRanges.map((range, idx) => {
                  const isChecked = minPriceQuery === range.min && maxPriceQuery === range.max;
                  return (
                    <label
                      key={idx}
                      className="flex items-center gap-2.5 cursor-pointer text-xs text-[#282c3f] hover:font-bold select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handlePriceToggle(range.min, range.max)}
                        className="h-4 w-4 rounded border-[#d4d5d9] accent-[#ff3f6c] cursor-pointer"
                      />
                      <span>{range.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Discount Range Section */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-[#282c3f] mb-3">
                DISCOUNT RANGE
              </span>
              <div className="space-y-2">
                {["10% and above", "20% and above", "30% and above", "40% and above"].map((disc) => (
                  <label
                    key={disc}
                    className="flex items-center gap-2.5 cursor-pointer text-xs text-[#282c3f] hover:font-bold select-none"
                  >
                    <input
                      type="radio"
                      name="discount"
                      className="h-4 w-4 accent-[#ff3f6c] cursor-pointer"
                      onChange={() => updateFilters({ sort: "price-low", page: "1" })}
                    />
                    <span>{disc}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* ========================================================
              Right Content: Myntra Product Cards Grid
              ======================================================== */}
          <main className="flex-1 lg:pl-8 py-4">
            {/* Loading Indicator */}
            {loading && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="aspect-[3/4] w-full bg-[#f5f5f6] rounded" />
                    <div className="h-3 w-1/2 bg-[#f5f5f6] rounded" />
                    <div className="h-3 w-3/4 bg-[#f5f5f6] rounded" />
                    <div className="h-3 w-1/3 bg-[#f5f5f6] rounded" />
                  </div>
                ))}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="py-20 text-center">
                <p className="text-sm font-bold text-[#ff3f6c]">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-3 rounded bg-[#282c3f] px-4 py-2 text-xs font-bold text-white uppercase"
                >
                  Reload Page
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-base font-bold text-[#282c3f]">
                  We couldn't find any matches!
                </p>
                <p className="text-xs text-[#535766] mt-1">
                  Please check the spelling or try searching for something else.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-4 rounded border border-[#ff3f6c] px-5 py-2 text-xs font-bold text-[#ff3f6c] uppercase hover:bg-[#ff3f6c] hover:text-white transition-colors"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && products.length > 0 && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Myntra-style Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-14 border-t border-[#eaeaec] pt-6 flex items-center justify-between">
                <div className="text-xs text-[#535766]">
                  Page <strong className="text-[#282c3f]">{pageQuery}</strong> of{" "}
                  <strong className="text-[#282c3f]">{pagination.pages}</strong>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={pageQuery <= 1}
                    onClick={() => handlePageChange(pageQuery - 1)}
                    className="border border-[#d4d5d9] px-3 py-1.5 rounded text-xs font-bold text-[#282c3f] hover:border-[#282c3f] disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    PREVIOUS
                  </button>

                  <div className="hidden sm:flex items-center gap-1 mx-2">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handlePageChange(num)}
                        className={`h-7 w-7 rounded text-xs font-bold ${
                          num === pageQuery
                            ? "bg-[#282c3f] text-white"
                            : "text-[#282c3f] hover:bg-[#f5f5f6]"
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
                    className="border border-[#d4d5d9] px-3 py-1.5 rounded text-xs font-bold text-[#282c3f] hover:border-[#282c3f] disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    NEXT
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;