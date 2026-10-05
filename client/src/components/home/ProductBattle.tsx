import React, { useState } from "react";
import { Swords, ThumbsUp, ShoppingBag, Zap, Flame } from "lucide-react";
import { useDynamicStore } from "../../utils/dynamicStore";
import { useCart } from "../../context/CartContext";

export const ProductBattle: React.FC = () => {
  const { products } = useDynamicStore();
  const { addToCart } = useCart();

  const [votesA, setVotesA] = useState(1482);
  const [votesB, setVotesB] = useState(1135);
  const [hasVoted, setHasVoted] = useState<"A" | "B" | null>(null);

  const totalVotes = votesA + votesB;
  const percentA = Math.round((votesA / totalVotes) * 100);
  const percentB = 100 - percentA;

  const contestantA = {
    name: "SS Master 5000 Grade 1 English Willow",
    tagline: "Massive 42mm edges with hyper-contoured concave spine",
    price: 19499,
    originalPrice: 23999,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    specs: {
      weight: "1175 grams",
      sweetSpot: "Mid-to-Low Drive",
      reboundSpeed: "94.2 km/h exit velo",
      durability: "9.8 / 10",
    },
    badge: "Crowd Favorite",
  };

  const contestantB = {
    name: "SG Players Ultimate Test Edition",
    tagline: "Classic traditional full profile for precision punch and balance",
    price: 21999,
    originalPrice: 26999,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80",
    specs: {
      weight: "1155 grams",
      sweetSpot: "High-to-Mid Stroke",
      reboundSpeed: "93.8 km/h exit velo",
      durability: "9.9 / 10",
    },
    badge: "Challenger",
  };

  const handleVote = (side: "A" | "B") => {
    if (hasVoted) return;
    if (side === "A") setVotesA((v) => v + 1);
    else setVotesB((v) => v + 1);
    setHasVoted(side);
  };

  return (
    <section className="bg-slate-950 py-16 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 border border-rose-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-rose-400 mb-3">
            <Swords className="w-3.5 h-3.5 animate-pulse" />
            <span>Community Showdown Arena</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <span>⚔️ Product Battle: The 1v1 Arena</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Vote for your tournament champion. The winning product receives an additional 10% flash discount coupon for voters!
          </p>
        </div>

        {/* Live Vote Percentage Bar */}
        <div className="max-w-3xl mx-auto mb-10 bg-slate-900 p-4 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider mb-2">
            <span className="text-red-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span>SS Master 5000 ({percentA}%)</span>
            </span>
            <span className="text-slate-400">{totalVotes.toLocaleString()} Votes Cast</span>
            <span className="text-blue-400 flex items-center gap-1.5">
              <span>SG Players ({percentB}%)</span>
              <Zap className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-l-full transition-all duration-700"
              style={{ width: `${percentA}%` }}
            />
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-r-full transition-all duration-700"
              style={{ width: `${percentB}%` }}
            />
          </div>
        </div>

        {/* The 2 Contestants Side-by-Side with VS in center */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
          {/* Contestant A (Red Corner) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-red-950/40 to-slate-900 border border-red-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider">
                  Red Corner • {contestantA.badge}
                </span>
                <span className="text-2xl font-black text-red-400">{percentA}%</span>
              </div>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 mb-5 border border-red-500/20">
                <img
                  src={contestantA.image}
                  alt={contestantA.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-1">{contestantA.name}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-5">{contestantA.tagline}</p>

              {/* Specs Table */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-6 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500">Total Weight:</span>
                  <div className="font-bold text-white">{contestantA.specs.weight}</div>
                </div>
                <div>
                  <span className="text-slate-500">Sweet Spot:</span>
                  <div className="font-bold text-white">{contestantA.specs.sweetSpot}</div>
                </div>
                <div>
                  <span className="text-slate-500">Exit Velocity:</span>
                  <div className="font-bold text-white">{contestantA.specs.reboundSpeed}</div>
                </div>
                <div>
                  <span className="text-slate-500">Durability:</span>
                  <div className="font-bold text-white">{contestantA.specs.durability}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Fighter Deal</div>
                  <div className="text-2xl font-black text-white">₹{contestantA.price.toLocaleString()}</div>
                </div>
                <span className="line-through text-xs text-slate-500">₹{contestantA.originalPrice.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleVote("A")}
                  disabled={hasVoted !== null}
                  className={`py-3 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all ${
                    hasVoted === "A"
                      ? "bg-emerald-600 text-white"
                      : "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 active:scale-95 disabled:opacity-50"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{hasVoted === "A" ? "Voted A!" : "Vote Winner"}</span>
                </button>

                <button
                  onClick={() =>
                    addToCart(
                      {
                        ...products[0],
                        name: contestantA.name,
                        price: contestantA.price,
                        images: [contestantA.image],
                      },
                      1
                    )
                  }
                  className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* VS Center Marker */}
          <div className="lg:col-span-1 flex justify-center items-center py-2 lg:py-0">
            <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center font-black text-xl text-white shadow-2xl relative">
              <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">VS</span>
            </div>
          </div>

          {/* Contestant B (Blue Corner) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-blue-950/40 to-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider">
                  Blue Corner • {contestantB.badge}
                </span>
                <span className="text-2xl font-black text-blue-400">{percentB}%</span>
              </div>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 mb-5 border border-blue-500/20">
                <img
                  src={contestantB.image}
                  alt={contestantB.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-1">{contestantB.name}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-5">{contestantB.tagline}</p>

              {/* Specs Table */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-6 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500">Total Weight:</span>
                  <div className="font-bold text-white">{contestantB.specs.weight}</div>
                </div>
                <div>
                  <span className="text-slate-500">Sweet Spot:</span>
                  <div className="font-bold text-white">{contestantB.specs.sweetSpot}</div>
                </div>
                <div>
                  <span className="text-slate-500">Exit Velocity:</span>
                  <div className="font-bold text-white">{contestantB.specs.reboundSpeed}</div>
                </div>
                <div>
                  <span className="text-slate-500">Durability:</span>
                  <div className="font-bold text-white">{contestantB.specs.durability}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Fighter Deal</div>
                  <div className="text-2xl font-black text-white">₹{contestantB.price.toLocaleString()}</div>
                </div>
                <span className="line-through text-xs text-slate-500">₹{contestantB.originalPrice.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleVote("B")}
                  disabled={hasVoted !== null}
                  className={`py-3 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all ${
                    hasVoted === "B"
                      ? "bg-emerald-600 text-white"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{hasVoted === "B" ? "Voted B!" : "Vote Winner"}</span>
                </button>

                <button
                  onClick={() =>
                    addToCart(
                      {
                        ...products[1],
                        name: contestantB.name,
                        price: contestantB.price,
                        images: [contestantB.image],
                      },
                      1
                    )
                  }
                  className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
