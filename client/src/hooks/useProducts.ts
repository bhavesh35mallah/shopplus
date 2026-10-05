import { useEffect, useState, useCallback } from "react";
import {
  getProducts,
  type Product,
  type ProductFilters,
} from "../api/productApi";
import { dynamicStore, type StoredProduct } from "../utils/dynamicStore";

const convertStoredToProduct = (sp: StoredProduct): Product => ({
  _id: sp._id || sp.id || `prod-${Date.now()}`,
  name: sp.name,
  slug: sp.slug || sp.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  sku: sp.sku,
  description: sp.description || "",
  price: sp.price,
  compareAtPrice: sp.compareAtPrice,
  images: sp.images && sp.images.length > 0
    ? sp.images
    : ["https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80"],
  category: {
    _id: sp.category?._id || "cat-cricket",
    name: sp.category?.name || "Cricket Gear",
    slug: sp.category?.slug || "cricket",
  },
  brand: sp.brand || "PulseSport",
  tags: sp.tags || [],
  eventTags: sp.eventTags || [],
  stock: sp.stock,
  rating: sp.rating || 4.8,
  reviewsCount: sp.reviewsCount || 10,
  status: sp.status || "active",
});

export const useProducts = (filters: ProductFilters = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const storedItems = dynamicStore.getProducts().map(convertStoredToProduct);

      let serverItems: Product[] = [];
      try {
        const data = await getProducts({ limit: 250, ...filters });
        serverItems = data.products || [];
        if (serverItems.length > 0) {
          dynamicStore.syncServerProducts(serverItems as any);
        }
      } catch {
        // Backend offline or error: fallback seamlessly to storedItems
        serverItems = [];
      }

      // Merge items: stored items have priority or combine unique products
      const map = new Map<string, Product>();
      serverItems.forEach((p) => map.set(p._id, p));
      storedItems.forEach((p) => map.set(p._id, p));

      let all = Array.from(map.values());

      // Filter locally to ensure fast, dynamic response
      if (filters.category) {
        all = all.filter(
          (p) =>
            p.category?.slug?.toLowerCase() === filters.category?.toLowerCase() ||
            p.category?.name?.toLowerCase().includes(filters.category?.toLowerCase() || "")
        );
      }

      if (filters.search) {
        const query = filters.search.toLowerCase();
        all = all.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.sku.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.tags?.some((t) => t.toLowerCase().includes(query))
        );
      }

      if (filters.brand) {
        all = all.filter(
          (p) => p.brand?.toLowerCase() === filters.brand?.toLowerCase()
        );
      }

      if (filters.inStock === true || filters.inStock === "true") {
        all = all.filter((p) => p.stock > 0);
      }

      if (filters.minRating) {
        all = all.filter((p) => p.rating >= (filters.minRating || 0));
      }

      if (filters.minPrice !== undefined) {
        all = all.filter((p) => p.price >= (filters.minPrice || 0));
      }

      if (filters.maxPrice !== undefined) {
        all = all.filter((p) => p.price <= (filters.maxPrice || Infinity));
      }

      // Sorting
      if (filters.sort === "price-asc") {
        all.sort((a, b) => a.price - b.price);
      } else if (filters.sort === "price-desc") {
        all.sort((a, b) => b.price - a.price);
      } else if (filters.sort === "rating") {
        all.sort((a, b) => b.rating - a.rating);
      }

      const limit = filters.limit || 12;
      const page = filters.page || 1;
      const total = all.length;
      const pages = Math.ceil(total / limit) || 1;

      const paged = all.slice((page - 1) * limit, page * limit);

      setProducts(paged);
      setPagination({ page, limit, total, pages });
    } catch (err) {
      console.error(err);
      setError("Unable to load products");
    } finally {
      setLoading(false);
    }
  }, [
    filters.search,
    filters.category,
    filters.brand,
    filters.inStock,
    filters.minRating,
    filters.minPrice,
    filters.maxPrice,
    filters.sort,
    filters.page,
    filters.limit,
  ]);

  useEffect(() => {
    loadProducts();

    const handleUpdate = () => {
      loadProducts();
    };

    window.addEventListener("shoppulse_store_update", handleUpdate);
    return () => {
      window.removeEventListener("shoppulse_store_update", handleUpdate);
    };
  }, [loadProducts]);

  return {
    products,
    pagination,
    loading,
    error,
    refresh: loadProducts,
  };
};