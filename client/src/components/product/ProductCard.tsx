import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import type { Product } from "../../api/productApi";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const primaryImage =
    !imgError && product.images?.[0]
      ? product.images[0]
      : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80";

  const secondaryImage =
    !imgError && product.images?.[1] ? product.images[1] : null;

  // Calculate discount percentage
  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
        )
      : null;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (onAddToWishlist) onAddToWishlist(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      alert(`Added "${product.name}" to cart!`);
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      {/* Image Container */}
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-slate-50"
      >
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          onError={() => setImgError(true)}
          className={`h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
            secondaryImage ? "group-hover:opacity-0" : ""
          }`}
          loading="lazy"
        />

        {/* Secondary Image for smooth hover flip if available */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
            loading="lazy"
          />
        )}

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discountPercent && (
            <span className="inline-flex items-center rounded-full bg-rose-600 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {product.eventTags?.[0] && (
            <span className="inline-flex items-center rounded-full bg-slate-900/85 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {product.eventTags[0].replace("-", " ")}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-sm transition-all duration-200 hover:scale-110 active:scale-95 ${
            isWishlisted
              ? "text-rose-600 bg-rose-50"
              : "text-slate-600 hover:text-rose-600"
          }`}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? "fill-rose-600" : ""
            }`}
          />
        </button>

        {/* Slide-up Quick Add Action Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900/95 py-2.5 text-xs font-semibold tracking-wide text-white shadow-lg backdrop-blur-md transition-all hover:bg-slate-800 active:scale-98"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Quick Add</span>
          </button>
          <button
            type="button"
            title="Quick View"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-slate-700 shadow-lg backdrop-blur-md transition-all hover:bg-white hover:text-slate-900 active:scale-95"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand & Category Row */}
        <div className="flex items-center justify-between text-[11px] font-medium tracking-wider text-slate-400 uppercase">
          <span>{product.brand || "ShopPulse"}</span>
          <span className="text-slate-500 font-normal">
            {product.category?.name || "General"}
          </span>
        </div>

        {/* Product Title */}
        <Link to={`/products/${product.slug}`} className="mt-1.5 block">
          <h3
            className="line-clamp-2 text-sm font-semibold text-slate-800 transition-colors group-hover:text-indigo-600"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        {/* Star Ratings Row */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center text-amber-400">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-xs font-bold text-slate-700">
            {product.rating > 0 ? product.rating.toFixed(1) : "4.8"}
          </span>
          <span className="text-[11px] text-slate-400">
            ({product.reviewsCount > 0 ? product.reviewsCount : 45})
          </span>
        </div>

        {/* Price & Stock Row */}
        <div className="mt-auto pt-3 flex items-baseline justify-between border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-slate-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.compareAtPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Stock subtle status */}
          <div className="text-[11px]">
            {product.stock > 0 && product.stock <= 10 ? (
              <span className="font-medium text-amber-600">
                Only {product.stock} left
              </span>
            ) : product.stock > 10 ? (
              <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                In Stock
              </span>
            ) : (
              <span className="font-medium text-rose-500">Sold out</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;