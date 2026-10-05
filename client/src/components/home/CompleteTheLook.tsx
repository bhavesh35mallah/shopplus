import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShoppingBag, Check, Plus, Tag, ArrowRight, Layers } from "lucide-react";
import { useDynamicStore } from "../../utils/dynamicStore";
import { useCart } from "../../context/CartContext";

export const CompleteTheLook: React.FC = () => {
  const { products } = useDynamicStore();
  const { addToCart } = useCart();
  const [activePreset, setActivePreset] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({
    "0-0": true,
    "0-1": true,
    "0-2": true,
    "1-0": true,
    "1-1": true,
    "1-2": true,
    "2-0": true,
    "2-1": true,
    "2-2": true,
  });
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Define 3 stylish curated looks using products or smart fallbacks
  const presets = [
    {
      id: "pro-cricket",
      title: "Championship Century Suite",
      tagline: "Matched by elite equipment curators for match-winning durability",
      badge: "Player's Edition",
      mainCategory: "Cricket",
      discountPercent: 18,
      items: [
        {
          name: "ShopPulse Reserve English Willow Grade 1 Bat",
          price: 18999,
          originalPrice: 22999,
          role: "Main Piece",
          image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
          desc: "Custom balanced 1160g blade with hyper-compressed spine",
        },
        {
          name: "Pro Titanium Arm & Chest Protection Armor",
          price: 2499,
          originalPrice: 3200,
          role: "Protection",
          image: "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?w=800&auto=format&fit=crop&q=80",
          desc: "High density EVA molded shock disperse plate",
        },
        {
          name: "Kangaroo Leather Test Match Batting Gloves",
          price: 3499,
          originalPrice: 4299,
          role: "Accessories",
          image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80",
          desc: "Pittards world-class grip with split-finger XRD protection",
        },
      ],
    },
    {
      id: "marathon-elite",
      title: "Hyper-Pace Marathon Set",
      tagline: "Ultralight aerodynamic compression & propulsion combo",
      badge: "Speed Tested",
      mainCategory: "Running",
      discountPercent: 20,
      items: [
        {
          name: "Carbon Plate Vapor Flight Turbo Runners",
          price: 12499,
          originalPrice: 15999,
          role: "Main Piece",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
          desc: "Dual density Pebax foam with curved full-length carbon shank",
        },
        {
          name: "Laser-Vent Seamless Performance Aeroknit Tee",
          price: 1899,
          originalPrice: 2499,
          role: "Apparel",
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
          desc: "Micro-perforated moisture extraction fabric",
        },
        {
          name: "45L Hydration Endurance Utility Vest Pack",
          price: 3299,
          originalPrice: 4199,
          role: "Gear",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
          desc: "Bounce-free dual flasks with ergonomic magnetic valve",
        },
      ],
    },
    {
      id: "gym-beast",
      title: "Powerlifting & Recovery Arsenal",
      tagline: "Heavy-duty biomechanical support for maximum output",
      badge: "Heavy Duty",
      mainCategory: "Fitness",
      discountPercent: 15,
      items: [
        {
          name: "10mm Lever Buckle Genuine Cowhide Power Belt",
          price: 4999,
          originalPrice: 6499,
          role: "Main Piece",
          image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
          desc: "Cast alloy lever with dual-stitched edge reinforcement",
        },
        {
          name: "7mm Neoprene Competition Knee Sleeves",
          price: 2499,
          originalPrice: 3199,
          role: "Support",
          image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
          desc: "IPF standard compression with non-slip silicone ribs",
        },
        {
          name: "Deep Tissue Percussion Gun Pro 6-Speed",
          price: 6999,
          originalPrice: 8999,
          role: "Recovery",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
          desc: "Brushless motor delivering 3200 RPM stall force",
        },
      ],
    },
  ];

  const currentPreset = presets[activePreset];

  // Calculate pricing based on selected items
  const activeItems = currentPreset.items.filter((_, idx) => selectedItems[`${activePreset}-${idx}`]);
  const originalTotal = activeItems.reduce((acc, item) => acc + item.originalPrice, 0);
  const bundleSubtotal = activeItems.reduce((acc, item) => acc + item.price, 0);
  const bundleDiscount = Math.round(bundleSubtotal * (currentPreset.discountPercent / 100));
  const finalBundlePrice = bundleSubtotal - bundleDiscount;
  const totalSavings = originalTotal - finalBundlePrice;

  const toggleItem = (idx: number) => {
    const key = `${activePreset}-${idx}`;
    setSelectedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAddBundle = () => {
    // Add all selected items into real cart
    activeItems.forEach((item) => {
      const matched = products.find((p) => p.name.toLowerCase().includes(item.role.toLowerCase())) || products[0];
      if (matched) {
        addToCart(
          {
            ...matched,
            name: item.name,
            price: Math.round(item.price * (1 - currentPreset.discountPercent / 100)),
            images: [item.image],
          },
          1
        );
      }
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3500);
  };

  return (
    <section className="bg-slate-900 py-16 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-indigo-400 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Curated Synergy Bundles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>🧩 Complete the Look & Gear</span>
              <span className="text-xs bg-indigo-600 px-2.5 py-1 rounded-md font-bold tracking-widest uppercase">
                Save up to 20%
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              Equip matching gear crafted to perform together. Bundle complementary tournament essentials and save big.
            </p>
          </div>

          {/* Preset Selector Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            {presets.map((preset, idx) => (
              <button
                key={preset.id}
                onClick={() => setActivePreset(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activePreset === idx
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {preset.title.split(" ")[0]} {preset.title.split(" ")[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Main Bundle Card */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 lg:p-8 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {currentPreset.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">Category: {currentPreset.mainCategory}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">{currentPreset.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{currentPreset.tagline}</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-2xl flex items-center gap-2.5">
              <Tag className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">Bundle Savings</div>
                <div className="text-base font-black text-white">Save ₹{totalSavings.toLocaleString()} ({currentPreset.discountPercent}% Off)</div>
              </div>
            </div>
          </div>

          {/* Bundle Items Flow (3 Items connected by + signs) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-center">
            {currentPreset.items.map((item, idx) => {
              const isSelected = !!selectedItems[`${activePreset}-${idx}`];
              return (
                <React.Fragment key={idx}>
                  <div
                    onClick={() => toggleItem(idx)}
                    className={`cursor-pointer transition-all duration-300 md:col-span-3 rounded-2xl p-4 border relative ${
                      isSelected
                        ? "bg-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/10"
                        : "bg-slate-900/40 border-slate-800 opacity-60 hover:opacity-90"
                    }`}
                  >
                    {/* Checkbox trigger */}
                    <div className="absolute top-3 right-3 z-10">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected ? "bg-indigo-600 text-white" : "border border-slate-700 bg-slate-800/80 text-transparent"
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </div>

                    <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-950">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black uppercase text-indigo-400">
                        {item.role}
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-white line-clamp-1 mb-1">{item.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mb-3">{item.desc}</p>

                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-indigo-400 text-base">₹{item.price.toLocaleString()}</span>
                      <span className="text-xs text-slate-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Plus Icon between items on larger screens */}
                  {idx < currentPreset.items.length - 1 && (
                    <div className="hidden md:flex md:col-span-1 justify-center items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shadow-inner">
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            {/* Total / Action Box (col-span-3 on md) */}
            <div className="md:col-span-4 bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Bundle Summary ({activeItems.length} items)</span>
                </div>

                <div className="space-y-1.5 mb-4 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Items Retail:</span>
                    <span className="line-through text-slate-500">₹{originalTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Set Discount:</span>
                    <span className="text-emerald-400 font-bold">-₹{totalSavings.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-3 mb-6">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Total Bundle Price</div>
                  <div className="text-3xl font-black text-white flex items-baseline gap-2">
                    <span>₹{finalBundlePrice.toLocaleString()}</span>
                    <span className="text-xs text-emerald-400 font-bold">Includes GST</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddBundle}
                  disabled={activeItems.length === 0}
                  className={`w-full py-3.5 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2.5 shadow-xl transition-all duration-300 ${
                    addedSuccess
                      ? "bg-emerald-600 text-white"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-600/30 active:scale-[0.98]"
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Bundle Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Entire Bundle to Cart</span>
                    </>
                  )}
                </button>

                <Link
                  to="/catalog"
                  className="block text-center text-xs font-bold text-slate-400 hover:text-indigo-300 transition-colors"
                >
                  Explore custom gear combinations <ArrowRight className="inline w-3 h-3 ml-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
