import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext";

const FREE_SHIPPING_THRESHOLD = 999;

const CartDrawer: React.FC = () => {
  const {
    cart,
    totalItems,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 99;
  const orderTotal = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Shopping Bag</h2>
                <p className="text-xs text-slate-500">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="rounded-full p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          {cart.length > 0 && (
            <div className="bg-slate-50/80 px-6 py-3.5 border-b border-slate-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-700 flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-rose-500" />
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-emerald-600 font-semibold">
                      🎉 You unlocked FREE Express Delivery!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-slate-900">₹{remainingForFreeShipping.toLocaleString("en-IN")}</strong> more for FREE delivery
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="h-9 w-9 stroke-1" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Your bag is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mt-1.5 mb-6">
                  Explore our event-synced collections, fan gear, and trending styles to add items to your cart.
                </p>
                <Link
                  to="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-slate-800 transition-all"
                >
                  <span>Start Shopping</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              cart.map((item) => {
                const { product, quantity, size } = item;
                const img = product.images?.[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80";

                return (
                  <div
                    key={`${product._id}-${size || "def"}`}
                    className="flex gap-4 p-3 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-slate-200 transition-all"
                  >
                    {/* Thumbnail */}
                    <Link
                      to={`/products/${product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="relative h-22 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100"
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className="h-full w-full object-cover object-top"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                              {product.brand || "ShopPulse"}
                            </span>
                            <Link
                              to={`/products/${product.slug}`}
                              onClick={() => setIsCartOpen(false)}
                              className="block"
                            >
                              <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 hover:text-rose-600 transition-colors">
                                {product.name}
                              </h4>
                            </Link>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(product._id, size)}
                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {size && (
                          <span className="inline-block mt-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            Size: {size}
                          </span>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                        {/* Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product._id, quantity - 1, size)}
                            className="p-1 text-slate-600 hover:bg-slate-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-slate-800 min-w-[24px] text-center">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product._id, quantity + 1, size)}
                            className="p-1 text-slate-600 hover:bg-slate-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-900">
                            ₹{(product.price * quantity).toLocaleString("en-IN")}
                          </span>
                          {product.compareAtPrice && product.compareAtPrice > product.price && (
                            <span className="block text-[10px] text-slate-400 line-through">
                              ₹{(product.compareAtPrice * quantity).toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Totals & Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-slate-100 bg-white p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Delivery</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-emerald-600 font-bold uppercase">FREE</strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Due</span>
                  <span className="text-base text-rose-600">₹{orderTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-slate-900/10 hover:shadow-slate-900/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="flex gap-2">
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    View Shopping Bag
                  </Link>

                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 py-2.5 rounded-xl text-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>256-Bit SSL Encrypted &amp; Verified Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
