import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Trees,
  Recycle,
  Sun,
  ArrowRight,
  Package,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

const Sustainability: React.FC = () => {
  const [batOrdersCount, setBatOrdersCount] = useState(1);

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Sustainability Pledges</span>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Leaf className="h-3.5 w-3.5" />
              Pulse Eco-Forward Initiative
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Playing for the Long Run: Our Planet Commitments
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Sport teaches us responsibility, teamwork, and leaving the pitch better than we found it. At ShopPulse, sustainability isn't an afterthought—it is woven into every shipment, willow cleft, and parcel mailer.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
              <Trees className="h-7 w-7 text-emerald-600 mx-auto mb-2" />
              <div className="text-3xl font-black text-slate-900">42,800+</div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Willow Saplings Planted
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
              <Package className="h-7 w-7 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-black text-slate-900">18.4 Tons</div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Single-Use Plastic Replaced
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
              <Recycle className="h-7 w-7 text-rose-600 mx-auto mb-2" />
              <div className="text-3xl font-black text-slate-900">100%</div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                FSC Certified Packaging
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
              <Sun className="h-7 w-7 text-amber-500 mx-auto mb-2" />
              <div className="text-3xl font-black text-slate-900">68%</div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Solar Hub Power Usage
              </div>
            </div>
          </div>

          {/* 4 Pillars of Eco-Forward */}
          <div className="space-y-6 mb-16">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-8">
              <div className="h-16 w-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <Trees className="h-8 w-8" />
              </div>
              <div className="flex-1 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  PILLAR 01: REFORESTATION
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Two Willow Trees Planted For Every Bat Dispatched
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  English Willow (<em>Salix alba var. caerulea</em>) takes 15 to 20 years to mature into timber with optimal flex and rebound. We partner with agroforestry trusts in the UK and Jammu &amp; Kashmir to plant two indigenous saplings for every bat purchased on ShopPulse.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-8">
              <div className="h-16 w-16 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
                <Package className="h-8 w-8" />
              </div>
              <div className="flex-1 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  PILLAR 02: ZERO PLASTIC
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  100% Water-Activated Tape &amp; Cornstarch Mailers
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We eliminated petroleum bubble wrap and plastic packing tapes. Our cricket bat shipping tubes are constructed from 100% recycled unbleached kraft paper, sealed with fiberglass-reinforced gummed paper tape that dissolves safely in recycling pulpers.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-8">
              <div className="h-16 w-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                <Recycle className="h-8 w-8" />
              </div>
              <div className="flex-1 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  PILLAR 03: CIRCULAR RECOVERY
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Pulse Trade-In: Turning Used Gear into Play Turf
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Don't dump worn-out cricket spikes or cracked blades in municipal landfills. Return them at any of our flagship workshops to receive a ₹500 credit toward new gear. Old outsoles are shredded into rubber mulch for community playground tracks.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-8">
              <div className="h-16 w-16 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center flex-shrink-0">
                <Sun className="h-8 w-8" />
              </div>
              <div className="flex-1 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  PILLAR 04: LOGISTICS DECARBONIZATION
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Solar Hubs &amp; Electric Last-Mile Vans
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Over 40% of our intra-city last-mile deliveries across Mumbai, Bengaluru, and Delhi NCR are fulfilled by electric two-wheelers and EV vans, cutting urban exhaust and particulate emissions.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Bat Impact Calculator */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-16">
            <h3 className="text-lg font-black text-slate-900 mb-2">
              Interactive Environmental Contribution Calculator
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              See the direct regenerative impact when choosing certified equipment from ShopPulse.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <label className="text-xs font-bold text-slate-700">
                Number of tournament gear pieces:
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 5, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setBatOrdersCount(num)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      batOrdersCount === num
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {num} Item{num > 1 ? "s" : ""}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Saplings Planted
                </span>
                <span className="text-2xl font-black text-emerald-900 mt-1 block">
                  {batOrdersCount * 2} Willow Trees
                </span>
                <span className="text-[11px] text-emerald-700">
                  Dedicated reforestation in certified agro-tracts.
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Plastic Prevented
                </span>
                <span className="text-2xl font-black text-emerald-900 mt-1 block">
                  {(batOrdersCount * 0.45).toFixed(2)} kg
                </span>
                <span className="text-[11px] text-emerald-700">
                  100% biodegradable fiber tube and paper buffer.
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Carbon Offset Equiv.
                </span>
                <span className="text-2xl font-black text-emerald-900 mt-1 block">
                  {(batOrdersCount * 14.8).toFixed(1)} kg CO₂e
                </span>
                <span className="text-[11px] text-emerald-700">
                  Lifetime tree sequestration projection.
                </span>
              </div>
            </div>
          </div>

          {/* Shop CTA */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center">
            <h3 className="text-2xl font-black">Support Clean Sport Today</h3>
            <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
              Every purchase makes an active difference. Browse our tournament equipment and sustainably made apparel collections.
            </p>
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer shadow-sm"
              >
                <span>Shop Sustainable Gear</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sustainability;
