import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Bell, Check, Clock, ArrowRight } from "lucide-react";
import { useDynamicStore } from "../../utils/dynamicStore";
import { useCart } from "../../context/CartContext";

export const SeasonalCalendar: React.FC = () => {
  const { products } = useDynamicStore();
  const { addToCart } = useCart();
  const [activeSeasonIdx, setActiveSeasonIdx] = useState<number>(0);
  const [reminderSet, setReminderSet] = useState<{ [key: string]: boolean }>({});

  const seasons = [
    {
      id: "ipl-2026",
      title: "IPL 2026 Championship Drop",
      dates: "March 22 – May 28, 2026",
      status: "Active Season",
      statusColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      description: "Custom player edition English Willow bats, anti-sweat pro jerseys, and high-frequency turf spikes.",
      bannerGradient: "from-blue-600 via-indigo-600 to-amber-500",
      targetCategory: "Cricket",
      daysLeft: 14,
      spotsLeft: "42 Units Allocated",
    },
    {
      id: "monsoon-2026",
      title: "Monsoon Turf Warfare Series",
      dates: "June 15 – August 30, 2026",
      status: "Upcoming Drop",
      statusColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      description: "Hydrophobic coated bat scuff sheets, multi-stud rubber turf cleats, and IPX7 sealed kit bags.",
      bannerGradient: "from-cyan-700 via-teal-700 to-slate-900",
      targetCategory: "Turf",
      daysLeft: 68,
      spotsLeft: "Pre-Orders Open",
    },
    {
      id: "t20-world",
      title: "ICC Global T20 Trophy Collection",
      dates: "October 1 – November 15, 2026",
      status: "Special Edition",
      statusColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      description: "Official laser-embossed tournament bats, titanium helmets, and international team training wear.",
      bannerGradient: "from-purple-700 via-fuchsia-700 to-rose-900",
      targetCategory: "Cricket",
      daysLeft: 182,
      spotsLeft: "VIP Waitlist Only",
    },
    {
      id: "marathon-winter",
      title: "Winter Ultra-Marathon Major",
      dates: "December 5 – January 20, 2027",
      status: "Annual Classic",
      statusColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      description: "Zero-drag carbon propulsive racers, thermal compression layers, and ergonomic electrolyte vests.",
      bannerGradient: "from-amber-600 via-orange-700 to-red-900",
      targetCategory: "Running",
      daysLeft: 245,
      spotsLeft: "Early Bird Access",
    },
  ];

  const currentSeason = seasons[activeSeasonIdx];

  const toggleReminder = (id: string) => {
    setReminderSet((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Select 3 showcase products for this season
  const showcaseProducts = products
    .filter((p) => p.category?.name?.toLowerCase().includes(currentSeason.targetCategory.toLowerCase()))
    .slice(0, 3);

  const displayList = showcaseProducts.length === 3 ? showcaseProducts : products.slice(0, 3);

  return (
    <section className="bg-slate-950 py-16 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-purple-400 mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Tournaments & Seasons Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>📅 Seasonal Drop Calendar</span>
              <span className="text-xs bg-purple-600 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                2026 Roadmap
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              Stay ahead of every championship season with scheduled drop releases, verified gear allocations, and drop reminders.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 text-xs font-bold text-slate-300">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>Next Major Drop in {currentSeason.daysLeft} Days</span>
          </div>
        </div>

        {/* Timeline Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {seasons.map((season, idx) => {
            const isActive = activeSeasonIdx === idx;
            return (
              <div
                key={season.id}
                onClick={() => setActiveSeasonIdx(idx)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative flex flex-col justify-between h-44 ${
                  isActive
                    ? "bg-slate-900 border-purple-500 shadow-xl shadow-purple-500/10 ring-1 ring-purple-500/50"
                    : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${season.statusColor}`}>
                      {season.status}
                    </span>
                    <span className="text-xs font-black text-purple-400">
                      T-{season.daysLeft}d
                    </span>
                  </div>
                  <h3 className="font-black text-base text-white line-clamp-2 mb-1">{season.title}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{season.dates}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                  <span className="text-[11px] text-slate-400">{season.spotsLeft}</span>
                  <span className={`font-bold ${isActive ? "text-purple-400" : "text-slate-500"}`}>
                    {isActive ? "Active View" : "Explore →"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Season Highlight Box */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 lg:p-8 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded border ${currentSeason.statusColor}`}>
                  {currentSeason.status}
                </span>
                <span className="text-xs text-slate-400">{currentSeason.dates}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">{currentSeason.title}</h3>
              <p className="text-slate-300 text-sm max-w-2xl">{currentSeason.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => toggleReminder(currentSeason.id)}
                className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 border transition-all ${
                  reminderSet[currentSeason.id]
                    ? "bg-emerald-600 border-emerald-500 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-white border-slate-700 hover:border-slate-600"
                }`}
              >
                {reminderSet[currentSeason.id] ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Alert Reminder Scheduled!</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4 text-purple-400" />
                    <span>Notify Me on Drop Day</span>
                  </>
                )}
              </button>

              <Link
                to="/catalog"
                className="px-5 py-3 rounded-xl font-black text-xs sm:text-sm bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2"
              >
                <span>Browse Season Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3 Featured Products for this Season */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {displayList.map((product) => {
              const displayImg =
                (product.images && product.images[0]) ||
                "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80";

              return (
                <div
                  key={product._id || product.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex gap-4 items-center group hover:border-purple-500/50 transition-all"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                    <img
                      src={displayImg}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-black uppercase text-purple-400 mb-0.5">{product.category?.name || "Official Gear"}</div>
                    <Link to={`/product/${product._id || product.id}`}>
                      <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors truncate">
                        {product.name}
                      </h4>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-black text-sm text-white">₹{product.price?.toLocaleString()}</span>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        Reserve
                      </button>
                    </div>
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
