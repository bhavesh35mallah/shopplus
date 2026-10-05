import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Heart,
  Star,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import type { Product } from "../../api/productApi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Standard");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product._id);
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"];

  const currentImg = images[selectedImgIdx] || images[0];

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
        )
      : null;

  const sizes = ["S", "M", "L", "XL", "Pro Knocked"];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-100 z-10 animate-scaleUp">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white transition-all duration-200 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Left: Gallery Column */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-100">
              <img
                src={currentImg}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-all duration-300"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.eventTags?.[0] && (
                  <span className="rounded-full bg-slate-900/90 backdrop-blur-md px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white border border-white/20">
                    {product.eventTags[0].replace("-", " ")}
                  </span>
                )}
                {discountPercent && (
                  <span className="rounded-full bg-rose-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-sm">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Pill */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all ${
                  isFavorited
                    ? "bg-rose-500 text-white"
                    : "bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white hover:text-rose-500"
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart
                  className={`h-4 w-4 ${isFavorited ? "fill-white" : ""}`}
                />
              </button>
            </div>

            {/* Thumbnail switcher */}
            {images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImgIdx === idx
                        ? "border-rose-600 shadow-sm ring-2 ring-rose-600/20"
                        : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Actions Column */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              {/* Brand & Stock */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wider text-rose-600">
                  {product.brand || "ShopPulse Edition"}
                </span>
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock ({product.stock || 42} Units)
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-200/60">
                  <span>{product.rating > 0 ? product.rating.toFixed(1) : "4.8"}</span>
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {product.reviewsCount > 0 ? product.reviewsCount : 184} verified athlete reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-base text-slate-400 line-through">
                    ₹{product.compareAtPrice.toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-xs font-semibold text-slate-400">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Description Snippet */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {product.description ||
                  "Engineered for pro-grade performance, rigorous competition conditions, and exceptional durability."}
              </p>

              {/* Spec / Size selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Select Spec / Size
                  </span>
                  <span className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedSize === sz
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2">
                  Quantity
                </span>
                <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="h-8 w-8 rounded-lg bg-white font-bold text-slate-700 shadow-xs hover:bg-slate-100 disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="h-8 w-8 rounded-lg bg-white font-bold text-slate-700 shadow-xs hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5 px-6 text-xs font-bold uppercase tracking-wider shadow-lg transition-all ${
                    justAdded
                      ? "bg-emerald-600 text-white shadow-emerald-500/25"
                      : "bg-slate-900 text-white hover:bg-rose-600 shadow-slate-900/15"
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added {quantity} to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <Link
                  to={`/products/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200 px-4 py-3.5 text-xs font-bold text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors"
                >
                  <span>Details</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-slate-400" />
                  <span>24h Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
                  <span>30D Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
