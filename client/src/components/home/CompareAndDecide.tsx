import React from "react";
import { Sparkles, Zap, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface CompareContender {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  price: number;
  image: string;
  aiVerdict: string;
  bestFor: string;
  specs: {
    material: string;
    sweetSpot: string;
    weight: string;
    reboundEnergy: string;
    warranty: string;
    playerStyle: string;
  };
}

const contenders: CompareContender[] = [
  {
    id: "contender-1",
    name: "Pro Willow Grade-1 English Bat",
    subtitle: "Traditional Handcrafted Salix Alba",
    tag: "PURIST & STROKEPLAY",
    price: 6499,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80",
    aiVerdict: "Optimal choice for timing, cover drives, and feathered pick-up balance.",
    bestFor: "Top-order batsmen playing league & red-ball formats",
    specs: {
      material: "Grade 1 English Willow (8-10 straight grains)",
      sweetSpot: "Mid-to-High featherweight blade contour",
      weight: "1165 - 1190 grams (Balanced)",
      reboundEnergy: "68% trampoline restitution",
      warranty: "1-Year Official Manufacturer Warranty",
      playerStyle: "Touch, Placement & Gap Precision",
    },
  },
  {
    id: "contender-2",
    name: "AeroCarbon Power Beast Bat",
    subtitle: "Titanium Matrix & Dual Sweet Spot",
    tag: "AGGRESSIVE T20 HITTER",
    price: 7299,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80",
    aiVerdict: "Maximum leverage for clearing ropes and heavy boundary strike rates.",
    bestFor: "Middle-order power finishers & white-ball tournament leagues",
    specs: {
      material: "Grade 1 Willow with Carbon-Reinforced Handle",
      sweetSpot: "Low-to-Mid extended monster profile",
      weight: "1210 - 1240 grams (Power pickup)",
      reboundEnergy: "74% hyper-elastic carbon rebound",
      warranty: "1-Year Pro Series Warranty",
      playerStyle: "Power Lofting, Pulls & Maximum Boundaries",
    },
  },
];

export const CompareAndDecide: React.FC = () => {
  const { addToCart } = useCart();

  const handleAdd = (item: CompareContender) => {
    addToCart({
      _id: item.id,
      name: item.name,
      slug: item.id,
      sku: `CMP-${item.id}`,
      price: item.price,
      category: { _id: "cricket", name: "Cricket", slug: "cricket" },
      images: [item.image],
      description: item.aiVerdict,
      stock: 5,
      rating: 4.9,
      reviewsCount: 38,
      tags: ["Compare Pick", "AI Recommendation"],
      eventTags: ["ai-recommendation"],
      status: "active",
    });
  };

  return (
    <section className="bg-slate-900 py-16 text-white border-b border-slate-800">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-400 border border-rose-500/30 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>AI Match Engine Recommendation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Compare &amp; Decide: Find Your Match Spec
          </h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Eliminate buyer uncertainty. Side-by-side cleft balance, diaphragm physics, and AI playstyle diagnosis between top contending gear.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {contenders.map((contender, idx) => (
            <div
              key={contender.id}
              className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                idx === 0
                  ? "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                  : "bg-slate-950/80 border-rose-500/40 shadow-2xl shadow-rose-950/20 hover:border-rose-500/70"
              }`}
            >
              <div>
                {/* Header Tag & Price */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2.5 py-1 rounded-md">
                    {contender.tag}
                  </span>
                  <span className="text-2xl font-black text-white">
                    ₹{contender.price.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Title & Image */}
                <div className="mt-4 flex items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex-shrink-0">
                    <img
                      src={contender.image}
                      alt={contender.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white leading-tight">
                      {contender.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{contender.subtitle}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      <Zap className="w-3 h-3" />
                      <span>{contender.bestFor}</span>
                    </div>
                  </div>
                </div>

                {/* AI Verdict Box */}
                <div className="mt-5 rounded-2xl bg-slate-900/90 p-3.5 border border-slate-800/80 text-xs">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                    AI Diagnosis:
                  </span>
                  <p className="text-slate-300 italic font-medium leading-relaxed">
                    "{contender.aiVerdict}"
                  </p>
                </div>

                {/* Specifications Matrix */}
                <div className="mt-5 space-y-2 text-xs border-t border-slate-800 pt-4">
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Material Cleft:</span>
                    <span className="font-bold text-white text-right">{contender.specs.material}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Sweet Spot:</span>
                    <span className="font-bold text-white text-right">{contender.specs.sweetSpot}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Pickup Weight:</span>
                    <span className="font-bold text-white text-right">{contender.specs.weight}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Impact Rebound:</span>
                    <span className="font-bold text-rose-400 text-right">{contender.specs.reboundEnergy}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Recommended Style:</span>
                    <span className="font-bold text-amber-300 text-right">{contender.specs.playerStyle}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => handleAdd(contender)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-rose-600 py-3 text-xs font-bold text-white transition-all cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Choose This Specimen (₹{contender.price.toLocaleString("en-IN")})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
