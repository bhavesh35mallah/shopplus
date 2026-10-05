import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  CheckCircle2,
  Gift,
  Heart,
  AlertCircle,
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import type { Product } from "../../api/productApi";

const FREE_SHIPPING_THRESHOLD = 999;

// Curated add-on suggestions
const crossSellProducts: Partial<Product>[] = [
  {
    _id: "cross-01",
    name: "Master Hardwood Bat Knocking Mallet",
    slug: "hardwood-bat-mallet",
    price: 699,
    compareAtPrice: 999,
    images: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80",
    ],
    category: { _id: "c1", name: "Cricket Gear", slug: "cricket" },
    brand: "PulseSport",
    tags: ["accessory", "cricket"],
    eventTags: [],
    stock: 25,
    rating: 4.9,
    reviewsCount: 142,
    status: "active",
    sku: "PS-MALLET-01",
    description: "Solid English beech wood mallet for edge rounding.",
  },
  {
    _id: "cross-02",
    name: "Pulse Diamond Matrix Bat Grip (Set of 2)",
    slug: "pulse-diamond-grip-set",
    price: 349,
    compareAtPrice: 599,
    images: [
      "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=500&auto=format&fit=crop&q=80",
    ],
    category: { _id: "c1", name: "Cricket Gear", slug: "cricket" },
    brand: "PulseSport",
    tags: ["accessory", "grip"],
    eventTags: [],
    stock: 50,
    rating: 4.8,
    reviewsCount: 89,
    status: "active",
    sku: "PS-GRIP-02",
    description: "High-traction vibration dampening rubber grips.",
  },
  {
    _id: "cross-03",
    name: "StrideX Hydro-Shield Sneaker Water Repellent",
    slug: "stridex-hydro-shield-spray",
    price: 549,
    compareAtPrice: 799,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80",
    ],
    category: { _id: "c4", name: "Footwear", slug: "footwear" },
    brand: "StrideX",
    tags: ["care", "footwear"],
    eventTags: [],
    stock: 30,
    rating: 4.7,
    reviewsCount: 65,
    status: "active",
    sku: "SX-SPRAY-01",
    description: "Nanotech moisture barrier for cricket spikes and canvas sneakers.",
  },
];

const Cart: React.FC = () => {
  const { cart, subtotal, totalItems, updateQuantity, removeFromCart, clearCart, addToCart } =
    useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent?: number;
    flatDiscount?: number;
    freeShipping?: boolean;
    description: string;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (!clean) return;

    if (clean === "PULSE15") {
      setAppliedCoupon({
        code: "PULSE15",
        discountPercent: 15,
        description: "15% VIP Club Welcome Discount",
      });
      setCouponError("");
    } else if (clean === "FREESHIP") {
      setAppliedCoupon({
        code: "FREESHIP",
        freeShipping: true,
        description: "100% Free Express Delivery Unlocked",
      });
      setCouponError("");
    } else if (clean === "IPL2026") {
      if (subtotal < 2000) {
        setCouponError("Coupon IPL2026 requires a minimum order value of ₹2,000.");
        return;
      }
      setAppliedCoupon({
        code: "IPL2026",
        flatDiscount: 500,
        description: "₹500 Tournament Season Special Discount",
      });
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try 'PULSE15' or 'FREESHIP'.");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // Calculations
  const giftWrapFee = giftWrap ? 99 : 0;
  const rawShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 99;
  const shippingFee = appliedCoupon?.freeShipping ? 0 : rawShipping;

  let discountAmount = 0;
  if (appliedCoupon?.discountPercent) {
    discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
  } else if (appliedCoupon?.flatDiscount) {
    discountAmount = Math.min(subtotal, appliedCoupon.flatDiscount);
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee + giftWrapFee);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleMoveToWishlist = (item: (typeof cart)[0]) => {
    if (!isInWishlist(item.product._id)) {
      toggleWishlist(item.product);
    }
    removeFromCart(item.product._id, item.size);
  };

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Shopping Bag</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2">
                <ShoppingBag className="h-3.5 w-3.5" />
                Your Selected Gear
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Shopping Bag ({totalItems})
              </h1>
            </div>

            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Empty Entire Bag</span>
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            /* Empty Bag State */
            <div className="bg-white rounded-3xl p-10 sm:p-16 border border-slate-200/80 text-center max-w-2xl mx-auto shadow-sm my-8">
              <div className="h-20 w-20 rounded-3xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-10 w-10 text-slate-300" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Your shopping bag is empty</h2>
              <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Looks like you haven't added any tournament cricket gear, urban streetwear, or audiophile gadgets to your bag yet.
              </p>

              {/* Quick Categories */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">
                  Quick Access Departments:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link
                    to="/shop?category=cricket"
                    className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 transition-colors"
                  >
                    🏏 Cricket Willow &amp; Pads
                  </Link>
                  <Link
                    to="/shop?category=mens-fashion"
                    className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 transition-colors"
                  >
                    👕 Urban Men's Apparel
                  </Link>
                  <Link
                    to="/shop?category=footwear"
                    className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 transition-colors"
                  >
                    👟 Athletic Spikes &amp; Sneakers
                  </Link>
                  <Link
                    to="/shop?category=electronics"
                    className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 transition-colors"
                  >
                    🎧 Noise-Canceling Audio
                  </Link>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-8 py-3.5 rounded-xl transition-all shadow-sm"
                >
                  <span>Explore Live Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* Active Cart 2-Column Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Items List & Addons */}
              <div className="lg:col-span-8 space-y-6">
                {/* Free Delivery Meter Banner */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Truck className="h-4 w-4 text-rose-600" />
                      {remainingForFreeShipping === 0 ? (
                        <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Congratulations! Free Express Air Delivery Unlocked!
                        </span>
                      ) : (
                        <span>
                          Add <strong className="text-rose-600 font-black">₹{remainingForFreeShipping.toLocaleString("en-IN")}</strong> more to qualify for <strong>FREE Delivery</strong>
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-slate-500 font-bold">
                      {Math.round(progressPercent)}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-rose-600 transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Items Card List */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
                  {cart.map((item, index) => {
                    const itemTotal = item.product.price * item.quantity;
                    const compareTotal = (item.product.compareAtPrice || item.product.price) * item.quantity;
                    const hasDiscount = compareTotal > itemTotal;

                    return (
                      <div
                        key={`${item.product._id}-${item.size || "def"}-${index}`}
                        className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:bg-slate-50/50 transition-colors"
                      >
                        {/* Product Thumbnail */}
                        <Link
                          to={`/products/${item.product.slug}`}
                          className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 group"
                        >
                          <img
                            src={
                              item.product.images?.[0] ||
                              "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80"
                            }
                            alt={item.product.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        {/* Title, Brand, Sizing */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            {item.product.brand && (
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                {item.product.brand}
                              </span>
                            )}
                            {item.size && (
                              <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                Size: {item.size}
                              </span>
                            )}
                          </div>

                          <Link
                            to={`/products/${item.product.slug}`}
                            className="text-sm font-bold text-slate-900 hover:text-rose-600 transition-colors line-clamp-2 block"
                          >
                            {item.product.name}
                          </Link>

                          {/* Unit Price */}
                          <div className="flex items-baseline gap-2 pt-0.5">
                            <span className="text-sm font-black text-slate-900">
                              ₹{item.product.price.toLocaleString("en-IN")}
                            </span>
                            {item.product.compareAtPrice && item.product.compareAtPrice > item.product.price && (
                              <span className="text-xs text-slate-400 line-through">
                                ₹{item.product.compareAtPrice.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>

                          {/* Quick Wishlist and Remove Actions */}
                          <div className="flex items-center gap-4 pt-2 text-xs">
                            <button
                              type="button"
                              onClick={() => handleMoveToWishlist(item)}
                              className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                            >
                              <Heart className="h-3.5 w-3.5" />
                              <span>Save to Wishlist</span>
                            </button>
                            <span className="text-slate-300">•</span>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product._id, item.size)}
                              className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>

                        {/* Quantity Stepper & Line Total */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                          {/* Stepper */}
                          <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.product._id, item.quantity - 1, item.size)
                              }
                              className="h-7 w-7 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-slate-900 font-mono">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.product._id, item.quantity + 1, item.size)
                              }
                              className="h-7 w-7 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <div className="text-right">
                            <span className="text-base font-black text-slate-900 block">
                              ₹{itemTotal.toLocaleString("en-IN")}
                            </span>
                            {hasDiscount && (
                              <span className="text-[10px] text-emerald-600 font-bold block">
                                Saved ₹{(compareTotal - itemTotal).toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Additional Order Options (Gift Packaging & Order Note) */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="giftWrap"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                    />
                    <label htmlFor="giftWrap" className="text-xs text-slate-700 cursor-pointer">
                      <span className="font-bold flex items-center gap-1.5 text-slate-900">
                        <Gift className="h-4 w-4 text-rose-600" />
                        Add Premium Tournament Gift Packaging (+₹99)
                      </span>
                      <span className="text-slate-500 block mt-0.5">
                        Individually wrapped in heavy matte charcoal paper with custom red satin ribbon and personalized card.
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Delivery Instructions / Match Date Deadlines (Optional)
                    </label>
                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="e.g. Leave with building security, match scheduled for Saturday morning"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Cross-Sell Recommendations */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-black text-slate-900">Recommended Gear Add-ons</h3>
                      <p className="text-xs text-slate-500">Popular items frequently paired with your selection.</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                      SPECIAL ADD-ON PRICING
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {crossSellProducts.map((prod) => (
                      <div
                        key={prod._id}
                        className="p-3.5 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all flex flex-col justify-between bg-slate-50/50"
                      >
                        <div>
                          <img
                            src={prod.images?.[0]}
                            alt={prod.name}
                            className="h-24 w-full object-cover rounded-xl mb-2.5 bg-white"
                          />
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">
                            {prod.brand}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5">
                            {prod.name}
                          </h4>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                          <span className="text-xs font-black text-slate-900">
                            ₹{prod.price?.toLocaleString("en-IN")}
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(prod as Product, 1)}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Checkout Action */}
              <div className="lg:col-span-4 sticky top-24 space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                  <h3 className="text-lg font-black text-slate-900 pb-4 border-b border-slate-100">
                    Order Summary
                  </h3>

                  {/* Promo Code Input */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                      Promo / Discount Voucher
                    </label>

                    {appliedCoupon ? (
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                            <Tag className="h-3.5 w-3.5 text-emerald-600" />
                            {appliedCoupon.code} Applied
                          </span>
                          <p className="text-[11px] text-emerald-700 mt-0.5">
                            {appliedCoupon.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeCoupon}
                          className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="e.g. PULSE15"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-slate-900 focus:outline-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                    )}

                    {couponError && (
                      <p className="text-[11px] text-rose-600 font-medium mt-1.5 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {couponError}
                      </p>
                    )}

                    {/* Quick Preset Hints */}
                    {!appliedCoupon && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                        <span>Try:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setCouponCode("PULSE15");
                            setCouponError("");
                          }}
                          className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-mono font-bold text-slate-800 cursor-pointer"
                        >
                          PULSE15
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCouponCode("FREESHIP");
                            setCouponError("");
                          }}
                          className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-mono font-bold text-slate-800 cursor-pointer"
                        >
                          FREESHIP
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Price Calculations */}
                  <div className="space-y-3 text-xs pt-4 border-t border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>Bag Subtotal ({totalItems} items)</span>
                      <span className="font-bold text-slate-900">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Coupon Savings ({appliedCoupon?.code})</span>
                        <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    {giftWrap && (
                      <div className="flex justify-between text-slate-600">
                        <span>Tournament Gift Wrap</span>
                        <span className="font-bold text-slate-900">₹99</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-600">
                      <span>Estimated Express Delivery</span>
                      <span>
                        {shippingFee === 0 ? (
                          <strong className="text-emerald-600 font-bold uppercase">FREE</strong>
                        ) : (
                          `₹${shippingFee}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Applicable GST (18% / 12%)</span>
                      <span>Included in Price</span>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-slate-900">Total Payable</span>
                      <span className="text-xl font-black text-rose-600">
                        ₹{finalTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="button"
                    onClick={() => navigate("/checkout")}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white py-4 text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <Link
                    to="/shop"
                    className="block text-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    ← Or Continue Shopping
                  </Link>
                </div>

                {/* Trust Guarantees */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>100% Genuine Direct Factory Authenticity</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RotateCcw className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span>14-Day Free Doorstep Returns &amp; Size Exchange</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Truck className="h-4 w-4 text-rose-600 flex-shrink-0" />
                    <span>Dispatched in Tamper-Proof Cylinder Packaging</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
