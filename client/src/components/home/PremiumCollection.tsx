import React from "react";
import { Link } from "react-router-dom";
import { Crown, ShieldCheck, ArrowRight, Award } from "lucide-react";

interface PremiumItem {
  id: string;
  name: string;
  category: string;
  price: number;
  highlight: string;
  image: string;
  perks: string;
}

const premiumItems: PremiumItem[] = [
  {
    id: "prem-1",
    name: "Masterstroke Salix Alba Gold Edition",
    category: "Pro Cricket Willow",
    price: 18999,
    highlight: "12 Straight Grains • 42mm Monstrous Edge • Hand-Signed Certificate",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    perks: "Complimentary Bat Case + 3 Oiling Services",
  },
  {
    id: "prem-2",
    name: "Aura Studio Beryllium Diamond Drivers",
    category: "Audiophile Sound",
    price: 14999,
    highlight: "Solid Anodized Aluminum • 48-Hour Lossless Battery • Spatial ANC",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    perks: "2-Year Worldwide Replacement Guarantee",
  },
  {
    id: "prem-3",
    name: "Apex Court Imperial Calfskin Trainer",
    category: "Luxury Footwear",
    price: 8999,
    highlight: "Full-Grain Italian Leather • Hand-Stitched Cupsole • Vibram Tread",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    perks: "Cedar Shoe Tree Included in Vault Box",
  },
];

export const PremiumCollection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 text-white relative overflow-hidden border-b border-amber-500/20">
      {/* Golden aura light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-black text-amber-400 border border-amber-500/30 uppercase tracking-widest mb-3">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>The Reserve Vault</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            ShopPulse Premium Collection
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">
            Uncompromising craftsmanship for international players and connoisseurs. Sourced in microscopic quantities with numbered certificates of authenticity.
          </p>
        </div>

        {/* 3-Column Luxury Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {premiumItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-slate-900/90 border border-amber-500/20 p-6 flex flex-col justify-between hover:border-amber-400/60 transition-all duration-500 shadow-2xl hover:shadow-amber-500/10"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mb-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-amber-500/30">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>Verified Master Specimen</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  {item.category}
                </span>
                <h3 className="text-lg font-black text-white mt-1 group-hover:text-amber-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {item.highlight}
                </p>

                <div className="mt-4 rounded-xl bg-slate-950/80 p-2.5 border border-slate-800 text-[11px] text-amber-300/90 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{item.perks}</span>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">VIP Reserve Price</span>
                  <span className="text-2xl font-black text-amber-400">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-950/40"
                >
                  <span>Acquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
