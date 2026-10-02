import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";
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
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const primaryImage =
    !imgError && product.images?.[0]
      ? product.images[0]
      : "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80";

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
      alert(`Added "${product.name}" to your shopping bag!`);
    }
  };

  const rating = product.rating > 0 ? product.rating.toFixed(1) : "4.3";
  const reviewsCount = product.reviewsCount > 0 ? product.reviewsCount : 124;

  return (
    <div
      className="group relative flex flex-col bg-white transition-all duration-200 hover:shadow-[0_4px_18px_rgba(0,0,0,0.12)] rounded-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Box */}
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-[#f5f5f6]"
      >
        <img
          src={isHovered && secondaryImage ? secondaryImage : primaryImage}
          alt={product.name}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Myntra-style Rating Badge on bottom-left of image */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded bg-white/90 px-1.5 py-0.5 text-[11px] font-bold text-[#282c3f] shadow-sm backdrop-blur-xs">
          <span>{rating}</span>
          <Star className="h-2.5 w-2.5 fill-[#14958f] text-[#14958f]" />
          <span className="text-[#94969f] font-normal text-[10px]">|</span>
          <span className="text-[#535766] font-semibold text-[10px]">
            {reviewsCount >= 1000 ? `${(reviewsCount / 1000).toFixed(1)}k` : reviewsCount}
          </span>
        </div>

        {/* Top-left Event / Special Pill */}
        {product.eventTags?.[0] && (
          <div className="absolute top-2 left-2">
            <span className="rounded-xs bg-[#ff3f6c] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white">
              {product.eventTags[0].replace("-", " ")}
            </span>
          </div>
        )}
      </Link>

      {/* Product Metadata Info */}
      <div className="relative p-3 bg-white">
        {/* Default View: Brand, Name & Price */}
        <div className="transition-opacity duration-150">
          {/* Brand Name */}
          <h4 className="text-sm font-bold tracking-tight text-[#282c3f] uppercase truncate">
            {product.brand || "ShopPulse Exclusive"}
          </h4>

          {/* Product Title / Short Description */}
          <Link to={`/products/${product.slug}`} className="block">
            <p
              className="text-xs text-[#535766] font-normal truncate mt-0.5"
              title={product.name}
            >
              {product.name}
            </p>
          </Link>

          {/* Price Row */}
          <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-bold text-[#282c3f]">
              Rs. {product.price.toLocaleString("en-IN")}
            </span>

            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-[11px] text-[#7e818c] line-through font-normal">
                Rs. {product.compareAtPrice.toLocaleString("en-IN")}
              </span>
            )}

            {discountPercent && (
              <span className="text-[11px] font-bold text-[#ff905a]">
                ({discountPercent}% OFF)
              </span>
            )}
          </div>
        </div>

        {/* Myntra Hover Action Bar: Wishlist & Bag Buttons */}
        <div
          className={`absolute inset-x-2 bottom-2 bg-white flex items-center gap-1.5 transition-all duration-200 ${
            isHovered
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2 px-2 border rounded text-xs font-bold uppercase transition-all duration-150 ${
              isWishlisted
                ? "bg-[#ff3f6c] border-[#ff3f6c] text-white"
                : "border-[#d4d5d9] bg-white text-[#282c3f] hover:border-[#282c3f]"
            }`}
          >
            <Heart
              className={`h-3.5 w-3.5 ${isWishlisted ? "fill-white" : ""}`}
            />
            <span>{isWishlisted ? "WISHLISTED" : "WISHLIST"}</span>
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex items-center justify-center p-2 rounded border border-[#282c3f] bg-[#282c3f] text-white hover:bg-[#ff3f6c] hover:border-[#ff3f6c] transition-all"
            title="Add to Bag"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;