import React, { useState } from "react";
import { Percent, Check, ShoppingBag, ShieldCheck } from "lucide-react";
import { useDynamicStore } from "../../utils/dynamicStore";
import { useCart } from "../../context/CartContext";

export const BuyMoreSaveMore: React.FC = () => {
  const { products } = useDynamicStore();
  const { addToCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([0, 1]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [addedAll, setAddedAll] = useState(false);

  // 4 high-demand products to build the bundle
  const dealProducts = [
    {
      id: 0,
      name: "ShopPulse Pro Match Leather Ball (Box of 4)",
      price: 2499,
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
      category: "Match Balls",
    },
    {
      id: 1,
      name: "Anti-Shock Carbon Batting Gloves Pair",
      price: 2899,
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80",
      category: "Protection",
    },
    {
      id: 2,
      name: "Laser-Vent High Performance Match Jersey",
      price: 1599,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
      category: "Apparel",
    },
    {
      id: 3,
      name: "Ergonomic 750ml Vacuum Sports Hydration Flask",
      price: 999,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
      category: "Accessories",
    },
  ];

  const count = selectedItems.length;
  let discountRate = 0;
  let activeTierCode = "";
  let tierLabel = "Select at least 2 items to activate discount";

  if (count === 2) {
    discountRate = 0.10;
    activeTierCode = "MULTI10";
    tierLabel = "Tier 1: 10% Extra Discount Active";
  } else if (count === 3) {
    discountRate = 0.15;
    activeTierCode = "MULTI15";
    tierLabel = "Tier 2: 15% Extra Discount Active";
  } else if (count >= 4) {
    discountRate = 0.20;
    activeTierCode = "MULTI20";
    tierLabel = "Tier 3: 20% Extra Discount + Free Express Shipping Active!";
  }

  const toggleProduct = (id: number) => {
    if (selectedItems.includes(id)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter((i) => i !== id));
      }
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const rawSubtotal = selectedItems.reduce((sum, id) => {
    const item = dealProducts.find((p) => p.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const discountAmount = Math.round(rawSubtotal * discountRate);
  const finalPrice = rawSubtotal - discountAmount;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleAddAll = () => {
    selectedItems.forEach((id) => {
      const item = dealProducts.find((p) => p.id === id);
      if (item) {
        const productFromStore = products[id] || products[0];
        addToCart(
          {
            ...productFromStore,
            name: item.name,
            price: Math.round(item.price * (1 - discountRate)),
            images: [item.image],
          },
          1
        );
      }
    });
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 3000);
  };

  return (
    <section className="bg-slate-900 py-16 text-white border-b border-slate-800 relative">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-400 mb-3">
              <Percent className="w-3.5 h-3.5" />
              <span>Volume Stepped Savings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>💰 Buy More, Save More</span>
              <span className="text-xs bg-emerald-600 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                Up to 20% Off
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              Stock up your locker or team kit. As you add gear to your bag, tier multipliers automatically slash your final price.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            Automated checkout discounts • Stackable with reward points
          </div>
        </div>

        {/* Tiers Progress Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div
            className={`p-5 rounded-2xl border transition-all ${
              count === 2
                ? "bg-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/10"
                : "bg-slate-950/40 border-slate-800"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Tier 1 • Buy 2 Items</span>
              <span className="text-lg font-black text-white">10% OFF</span>
            </div>
            <p className="text-xs text-slate-400">Instant 10% markdown applied on all 2 chosen items.</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-mono text-xs bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-emerald-300">
                MULTI10
              </span>
              <button
                onClick={() => handleCopyCode("MULTI10")}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                {copiedCode === "MULTI10" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all ${
              count === 3
                ? "bg-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/10"
                : "bg-slate-950/40 border-slate-800"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Tier 2 • Buy 3 Items</span>
              <span className="text-lg font-black text-white">15% OFF</span>
            </div>
            <p className="text-xs text-slate-400">Upgrade to 15% markdown across all items in this set.</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-mono text-xs bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-emerald-300">
                MULTI15
              </span>
              <button
                onClick={() => handleCopyCode("MULTI15")}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                {copiedCode === "MULTI15" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all ${
              count >= 4
                ? "bg-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/10"
                : "bg-slate-950/40 border-slate-800"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Tier 3 • Buy 4+ Items</span>
              <span className="text-lg font-black text-emerald-400">20% OFF + AIR SHIPPING</span>
            </div>
            <p className="text-xs text-slate-400">Max savings unlocked! 20% off whole bundle + express shipping waived.</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-mono text-xs bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-emerald-300">
                MULTI20
              </span>
              <button
                onClick={() => handleCopyCode("MULTI20")}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                {copiedCode === "MULTI20" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Live Interactive Bundle Configurator */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 lg:p-8 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-1">
                {tierLabel}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Customize Your Volume Package ({count} Selected)
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Live Bundle Price</div>
                <div className="text-2xl font-black text-white">₹{finalPrice.toLocaleString()}</div>
              </div>
              {discountAmount > 0 && (
                <div className="bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-xs font-black text-emerald-400">
                  Save ₹{discountAmount.toLocaleString()} ({Math.round(discountRate * 100)}%)
                </div>
              )}
            </div>
          </div>

          {/* 4 Multi-Select Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dealProducts.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleProduct(item.id)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 relative flex flex-col justify-between ${
                    isSelected
                      ? "bg-slate-900 border-emerald-500 shadow-md shadow-emerald-500/10"
                      : "bg-slate-900/40 border-slate-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="absolute top-3 right-3 z-10">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? "bg-emerald-600 text-white" : "border border-slate-700 bg-slate-800/80 text-transparent"
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>

                  <div>
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 mb-3">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-black uppercase text-emerald-400">
                        {item.category}
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-white line-clamp-2 mb-1">{item.name}</h4>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 mt-2">
                    <span className="font-black text-white text-base">₹{item.price.toLocaleString()}</span>
                    <span className="text-[11px] text-slate-400">
                      {isSelected ? "Included" : "+ Add"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Discount multiplier automatically applied at checkout with promo code {activeTierCode || "MULTI10"}</span>
            </div>

            <button
              onClick={handleAddAll}
              className={`py-3.5 px-6 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${
                addedAll
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 active:scale-95"
              }`}
            >
              {addedAll ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added {selectedItems.length} Items to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {selectedItems.length} Tier Items to Cart (₹{finalPrice.toLocaleString()})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
