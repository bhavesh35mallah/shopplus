import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Target, Trophy, Dumbbell, Zap, ShieldCheck, HeartPulse, Users, ShoppingBag, ArrowRight } from "lucide-react";
import { useDynamicStore } from "../../utils/dynamicStore";
import { useCart } from "../../context/CartContext";

export const ShopByNeed: React.FC = () => {
  const { products } = useDynamicStore();
  const { addToCart } = useCart();
  const [activeNeedId, setActiveNeedId] = useState<string>("tournament");

  const needs = [
    {
      id: "tournament",
      title: "Tournament Match Prep",
      icon: Trophy,
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      description: "Match-grade, official tournament certified bats, pads, and balls calibrated for competitive play.",
      targetKeyword: "cricket",
    },
    {
      id: "strength",
      title: "Heavy Hypertrophy & Power",
      icon: Dumbbell,
      color: "from-red-500 to-rose-700",
      accent: "text-rose-400 border-rose-500/30 bg-rose-500/10",
      description: "Biomechanical lifting belts, competition knee sleeves, and heavy-duty bars for personal records.",
      targetKeyword: "fitness",
    },
    {
      id: "speed",
      title: "Marathon & Speedwork",
      icon: Zap,
      color: "from-blue-500 to-cyan-600",
      accent: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      description: "Propulsive carbon plates, featherweight textiles, and ergonomic hydration vests for sub-3-hour pacing.",
      targetKeyword: "running",
    },
    {
      id: "recovery",
      title: "Injury Rehab & Recovery",
      icon: HeartPulse,
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      description: "Percussion massage guns, high-density foam rollers, and therapeutic compression to bounce back quicker.",
      targetKeyword: "recovery",
    },
    {
      id: "drills",
      title: "Coaching & Training Drills",
      icon: Users,
      color: "from-purple-500 to-indigo-600",
      accent: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      description: "Agility ladders, sidearm ball throwers, catching gloves, and multi-surface cones for master coaches.",
      targetKeyword: "training",
    },
    {
      id: "turf",
      title: "Weekend Turf & Box Cricket",
      icon: ShieldCheck,
      color: "from-yellow-400 to-lime-600",
      accent: "text-lime-400 border-lime-500/30 bg-lime-500/10",
      description: "Durable hard-tennis bats, grippy rubber studs, and neon turf balls designed for intense city box cricket.",
      targetKeyword: "turf",
    },
  ];

  const currentNeed = needs.find((n) => n.id === activeNeedId) || needs[0];

  // Pick 4 real or smart-matched products from catalog based on the active need
  const matchedProducts = products
    .filter(
      (p) =>
        p.category?.name?.toLowerCase().includes(currentNeed.targetKeyword) ||
        p.name?.toLowerCase().includes(currentNeed.targetKeyword)
    )
    .slice(0, 4);

  const displayProducts = matchedProducts.length >= 2 ? matchedProducts : products.slice(0, 4);

  return (
    <section className="bg-slate-950 py-16 text-white border-b border-slate-800 relative">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-orange-400 mb-3">
              <Target className="w-3.5 h-3.5" />
              <span>Intent-Driven Shopping</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>🎯 Shop by Need</span>
              <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded uppercase font-bold">
                Goal Based
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              Don’t guess what gear you need. Pick your exact training objective or game format, and we deliver verified equipment.
            </p>
          </div>

          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>View all 100+ Goal Kits</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Needs Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {needs.map((need) => {
            const Icon = need.icon;
            const isActive = activeNeedId === need.id;
            return (
              <button
                key={need.id}
                onClick={() => setActiveNeedId(need.id)}
                className={`p-3.5 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between h-28 group relative overflow-hidden ${
                  isActive
                    ? "bg-slate-900 border-orange-500 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/50"
                    : "bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isActive ? "bg-orange-500 text-white" : "bg-slate-800 text-slate-400 group-hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isActive && <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />}
                </div>

                <div className="font-bold text-xs sm:text-sm text-white line-clamp-2 leading-tight">
                  {need.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Need Detail Banner + Dynamic Product Cards */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl border ${currentNeed.accent}`}>
                <currentNeed.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">{currentNeed.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{currentNeed.description}</p>
              </div>
            </div>
            <Link
              to={`/catalog?search=${currentNeed.targetKeyword}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              Filter Full Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayProducts.map((product) => {
              const displayImg =
                (product.images && product.images[0]) ||
                "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80";

              return (
                <div
                  key={product._id || product.id}
                  className="group bg-slate-950/80 border border-slate-800/80 hover:border-orange-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5"
                >
                  <div>
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 mb-3">
                      <img
                        src={displayImg}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black uppercase text-orange-400">
                        {product.category?.name || "Gear"}
                      </div>
                    </div>

                    <Link to={`/product/${product._id || product.id}`}>
                      <h4 className="font-bold text-sm text-white group-hover:text-orange-400 transition-colors line-clamp-1 mb-1">
                        {product.name}
                      </h4>
                    </Link>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      {product.description || "Optimized specification for competitive athletics and high endurance."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <div>
                      <div className="text-base font-black text-white">₹{product.price?.toLocaleString()}</div>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <div className="text-xs text-slate-500 line-through">₹{product.compareAtPrice.toLocaleString()}</div>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold transition-all shadow-md shadow-orange-600/20 active:scale-95 flex items-center gap-1.5 text-xs"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
