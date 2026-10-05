import React from "react";
import { Award, Trophy, Star, ShoppingBag, ThumbsUp } from "lucide-react";
import { useDynamicStore } from "../../utils/dynamicStore";
import { useCart } from "../../context/CartContext";

export const WeeklyAwards: React.FC = () => {
  const { products } = useDynamicStore();
  const { addToCart } = useCart();

  const awards = [
    {
      awardTitle: "Editor's Choice Gold Medallion",
      medal: "🥇 Week 40 Winner",
      accent: "from-amber-500/20 to-yellow-500/5 border-amber-500/40 text-amber-400",
      badgeColor: "bg-amber-500 text-slate-950",
      productName: "Kookaburra Ghost Pro Players English Willow Bat",
      verdict: "Unanimous #1 score across 45 test batters for rebound response and grain density.",
      rating: 4.9,
      votes: "1,420 community votes",
      price: 24999,
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
      specs: ["1180g Balanced", "Grade 1+ Willow", "ICC Compliant"],
    },
    {
      awardTitle: "Breakthrough Biomechanics Trophy",
      medal: "⚡ Most Innovative",
      accent: "from-cyan-500/20 to-blue-500/5 border-cyan-500/40 text-cyan-400",
      badgeColor: "bg-cyan-500 text-slate-950",
      productName: "AeroVapor Carbon Propel Elite Marathon Shoes",
      verdict: "Lab tested 4.2% oxygen uptake efficiency reduction compared to traditional EVA foam racers.",
      rating: 4.8,
      votes: "980 community votes",
      price: 13499,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      specs: ["Full Carbon Shank", "185g Feat", "Energy Return 88%"],
    },
    {
      awardTitle: "Indestructible Armor Standard",
      medal: "🛡️ Heavy-Duty Award",
      accent: "from-rose-500/20 to-red-500/5 border-rose-500/40 text-rose-400",
      badgeColor: "bg-rose-500 text-white",
      productName: "Titanium Pro-Guard Masuri Spec Batting Helmet",
      verdict: "Zero deformation under 160km/h direct projectile ball testing at certified sports facility.",
      rating: 5.0,
      votes: "2,100 community votes",
      price: 9999,
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80",
      specs: ["Titanium Grille", "Air-Flow Shell", "Zero Vibration"],
    },
  ];

  return (
    <section className="bg-slate-900 py-16 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-400 mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>Independent Laboratory & Community Judged</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>🏅 Weekly ShopPulse Awards</span>
              <span className="text-xs bg-amber-500 text-slate-950 font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                Official Laurels
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              Every Sunday, our certified sports engineers and 50,000+ active athletes award trophies to gear that sets new benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 text-xs font-bold text-slate-300">
            <ThumbsUp className="w-4 h-4 text-amber-400" />
            <span>Over 12,400 Verified Athlete Reviews Synced</span>
          </div>
        </div>

        {/* 3 Award Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {awards.map((award, idx) => {
            // Find or fallback product from store
            const matchedProduct = products[idx] || products[0];

            return (
              <div
                key={idx}
                className={`bg-gradient-to-b ${award.accent} bg-slate-950/70 border rounded-3xl p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl relative overflow-hidden`}
              >
                {/* Ribbon badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${award.badgeColor}`}>
                    {award.medal}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{award.rating}</span>
                    <span className="text-slate-500 font-normal">({award.votes})</span>
                  </div>
                </div>

                <div>
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 mb-5 border border-slate-800">
                    <img
                      src={award.image}
                      alt={award.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black uppercase text-white flex items-center gap-1 border border-slate-700">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>{award.awardTitle}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white line-clamp-2 mb-2 leading-snug">
                    {award.productName}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 italic mb-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    "{award.verdict}"
                  </p>

                  {/* Spec pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {award.specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Laureate Price</div>
                    <div className="text-2xl font-black text-white">₹{award.price.toLocaleString()}</div>
                  </div>
                  <button
                    onClick={() =>
                      addToCart(
                        {
                          ...matchedProduct,
                          name: award.productName,
                          price: award.price,
                          images: [award.image],
                        },
                        1
                      )
                    }
                    className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Claim Winner</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
