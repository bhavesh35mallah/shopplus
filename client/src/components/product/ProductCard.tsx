import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag, Check, Eye } from "lucide-react";
import type { Product } from "../../api/productApi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  layout?: "grid" | "dense" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  layout = "grid",
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product._id);

  const primaryImage =
    !imgError && product.images?.[0]
      ? product.images[0]
      : "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80";

  const secondaryImage =
    !imgError && product.images?.[1] ? product.images[1] : null;

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
        )
      : null;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const rating = product.rating > 0 ? product.rating.toFixed(1) : "4.7";
  const reviewsCount = product.reviewsCount > 0 ? product.reviewsCount : 124;

  // ==========================================
  // LIST VIEW LAYOUT
  // ==========================================
  if (layout === "list") {
    return (
      <div className="group relative flex flex-col sm:flex-row bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-lg hover:border-slate-200 transition-all duration-300 overflow-hidden p-4 sm:p-5 gap-5">
        {/* Image */}
        <Link
          to={`/products/${product.slug}`}
          className="relative block w-full sm:w-48 aspect-square sm:aspect-auto sm:h-48 overflow-hidden rounded-xl bg-slate-50 flex-shrink-0"
        >
          <img
            src={primaryImage}
            alt={product.name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {discountPercent && (
            <span className="absolute top-2 left-2 rounded-full bg-rose-600 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
              {discountPercent}% OFF
            </span>
          )}
        </Link>

        {/* Content Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-500">
                {product.brand || "ShopPulse Edition"}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>{rating}</span>
                <span className="text-slate-400 font-normal">({reviewsCount})</span>
              </div>
            </div>

            <Link to={`/products/${product.slug}`} className="block mt-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                {product.name}
              </h3>
            </Link>

            <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {product.description ||
                "Engineered for pro-grade performance, rigorous competition conditions, and exceptional durability."}
            </p>

            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                In Stock ({product.stock || 35} Units)
              </span>
              {product.eventTags?.[0] && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {product.eventTags[0].replace("-", " ")}
                </span>
              )}
            </div>
          </div>

          {/* Bottom Bar: Price & Buttons */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-slate-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.compareAtPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {onQuickView && (
                <button
                  type="button"
                  onClick={handleQuickViewClick}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Quick View</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleWishlistClick}
                className={`p-2 rounded-xl border transition-all ${
                  isFavorited
                    ? "border-rose-200 bg-rose-50 text-rose-600"
                    : "border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`h-4 w-4 ${isFavorited ? "fill-rose-500" : ""}`} />
              </button>

              <button
                type="button"
                onClick={handleQuickAdd}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                  justAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-900 text-white hover:bg-rose-600"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // STANDARD / DENSE GRID VIEW
  // ==========================================
  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl hover:border-slate-200/80 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Box */}
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-slate-100"
      >
        <img
          src={isHovered && secondaryImage ? secondaryImage : primaryImage}
          alt={product.name}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top-Right Floating Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full transition-all shadow-sm ${
            isFavorited
              ? "bg-rose-500 text-white scale-105"
              : "bg-white/80 backdrop-blur-md text-slate-700 hover:bg-white hover:text-rose-500 hover:scale-110"
          }`}
        >
          <Heart
            className={`h-4 w-4 transition-transform ${
              isFavorited ? "fill-white" : ""
            }`}
          />
        </button>

        {/* Top-Left Event Tag Badge */}
        {product.eventTags?.[0] && (
          <div className="absolute top-2.5 left-2.5">
            <span className="rounded-full bg-slate-900/85 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white border border-white/20">
              {product.eventTags[0].replace("-", " ")}
            </span>
          </div>
        )}

        {/* Rating Pill on Bottom-Left */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-slate-800 shadow-xs">
          <span>{rating}</span>
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-slate-300 font-normal">|</span>
          <span className="text-[10px] text-slate-500 font-semibold">
            {reviewsCount >= 1000 ? `${(reviewsCount / 1000).toFixed(1)}k` : reviewsCount}
          </span>
        </div>

        {/* Hover Actions: Quick View & Quick Add */}
        <div className="absolute inset-x-2 bottom-2.5 hidden sm:flex items-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          {onQuickView && (
            <button
              type="button"
              onClick={handleQuickViewClick}
              className="flex items-center justify-center p-2.5 rounded-xl bg-white/95 backdrop-blur-md text-slate-800 hover:bg-slate-900 hover:text-white shadow-md transition-all duration-200 cursor-pointer"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 text-xs font-bold uppercase tracking-wider shadow-lg transition-all ${
              justAdded
                ? "bg-emerald-600 text-white"
                : "bg-slate-900/90 backdrop-blur-md text-white hover:bg-rose-600"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Metadata Info */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Brand */}
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
            {product.brand || "ShopPulse"}
          </span>

          {/* Title */}
          <Link to={`/products/${product.slug}`} className="block mt-1">
            <h4
              className="text-xs font-semibold text-slate-800 truncate hover:text-rose-600 transition-colors"
              title={product.name}
            >
              {product.name}
            </h4>
          </Link>
        </div>

        {/* Price Row & Mobile Add Action */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm font-bold text-slate-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-[11px] text-slate-400 line-through">
                ₹{product.compareAtPrice.toLocaleString("en-IN")}
              </span>
            )}

            {discountPercent && (
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="sm:hidden p-2 rounded-lg bg-slate-900 text-white hover:bg-rose-600 transition-colors"
            aria-label="Add to bag"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;