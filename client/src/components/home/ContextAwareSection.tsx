import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, CloudRain, Wind, Thermometer, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import { useDynamicStore } from "../../utils/dynamicStore";
import { useCart } from "../../context/CartContext";

interface ContextScenario {
  id: string;
  name: string;
  sub: string;
  icon: typeof Sun;
  condition: string;
  temp: string;
  advice: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  matchedKeywords: string[];
}

export const ContextAwareSection: React.FC = () => {
  const { products } = useDynamicStore();
  const { addToCart } = useCart();

  const scenarios: ContextScenario[] = [
    {
      id: "morning",
      name: "Sunrise Pre-Dawn Drill",
      sub: "05:30 AM – 09:00 AM",
      icon: Sun,
      condition: "Cool Breeze & Dew",
      temp: "23°C",
      advice: "Grass dew requires anti-slip rubber cleat spikes & moisture repellent compression sleeves.",
      accentBg: "from-amber-950/40 to-slate-900",
      accentBorder: "border-amber-500/30",
      accentText: "text-amber-400",
      matchedKeywords: ["shoe", "spike", "running", "jacket", "compression"],
    },
    {
      id: "heat",
      name: "Peak Afternoon Match Heat",
      sub: "12:00 PM – 04:00 PM",
      icon: Sun,
      condition: "Intense Direct UV Sunlight",
      temp: "34°C",
      advice: "Thermal strain warning: Laser-vented aeroknit fabrics and rapid electrolyte bottles needed.",
      accentBg: "from-orange-950/40 to-slate-900",
      accentBorder: "border-orange-500/30",
      accentText: "text-orange-400",
      matchedKeywords: ["jersey", "bottle", "cap", "t-shirt", "shorts"],
    },
    {
      id: "monsoon",
      name: "Monsoon Turf & Wet Pitch",
      sub: "Rain & Humidity Surge",
      icon: CloudRain,
      condition: "Wet Outfield & 85% Humidity",
      temp: "27°C",
      advice: "Waterproof synthetic equipment covers, water-resistant cricket bat toe guards, and heavy-grip gloves.",
      accentBg: "from-cyan-950/40 to-slate-900",
      accentBorder: "border-cyan-500/30",
      accentText: "text-cyan-400",
      matchedKeywords: ["grip", "guard", "protection", "bag", "cover"],
    },
    {
      id: "night",
      name: "Floodlit Night Tournament",
      sub: "07:00 PM – 11:30 PM",
      icon: Moon,
      condition: "High Contrast Floodlights",
      temp: "26°C",
      advice: "Anti-glare tinted polycarbonate visors, fluorescent white seam match balls, and muscle warm-up balms.",
      accentBg: "from-indigo-950/40 to-slate-900",
      accentBorder: "border-indigo-500/30",
      accentText: "text-indigo-400",
      matchedKeywords: ["helmet", "ball", "visor", "light", "training"],
    },
  ];

  // Auto detect current time of day for default selection
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("morning");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 11) setSelectedScenarioId("morning");
    else if (currentHour >= 11 && currentHour < 17) setSelectedScenarioId("heat");
    else if (currentHour >= 17 && currentHour < 22) setSelectedScenarioId("night");
    else setSelectedScenarioId("monsoon");
  }, []);

  const currentScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];
  const ScenarioIcon = currentScenario.icon;

  // Filter 4 products matching this scenario
  const matchingProducts = products
    .filter((p) =>
      currentScenario.matchedKeywords.some(
        (kw) =>
          p.name.toLowerCase().includes(kw) ||
          p.category?.name?.toLowerCase().includes(kw) ||
          p.description?.toLowerCase().includes(kw)
      )
    )
    .slice(0, 4);

  const displayList = matchingProducts.length >= 2 ? matchingProducts : products.slice(0, 4);

  return (
    <section className="bg-slate-900 py-16 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Environmental Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>🌦️ Context-Aware Gear</span>
              <span className="text-xs bg-cyan-600 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                Live Sensor Sync
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              Weather and match timing directly affect ball bounce, sweat dissipation, and grip friction. Select your match setting:
            </p>
          </div>

          {/* Time & Weather Presets */}
          <div className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            {scenarios.map((sc) => {
              const Icon = sc.icon;
              const isActive = selectedScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? "bg-slate-800 text-white shadow-md border border-slate-700"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? sc.accentText : "text-slate-500"}`} />
                  <span>{sc.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Context Dashboard Banner */}
        <div
          className={`bg-gradient-to-br ${currentScenario.accentBg} border ${currentScenario.accentBorder} rounded-3xl p-6 lg:p-8 backdrop-blur-xl transition-all duration-500 mb-8`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl bg-slate-950/80 border ${currentScenario.accentBorder}`}>
                  <ScenarioIcon className={`w-7 h-7 ${currentScenario.accentText}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black uppercase tracking-wider ${currentScenario.accentText}`}>
                      {currentScenario.sub}
                    </span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400 font-semibold">{currentScenario.condition}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">{currentScenario.name}</h3>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 text-xs sm:text-sm text-slate-300 flex items-start gap-3">
                <Thermometer className={`w-5 h-5 flex-shrink-0 mt-0.5 ${currentScenario.accentText}`} />
                <div>
                  <span className="font-bold text-white">Atmospheric Diagnostics ({currentScenario.temp}): </span>
                  {currentScenario.advice}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-2 bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Wind className="w-4 h-4 text-cyan-400" />
                <span>Calibrated for India Regional Matches</span>
              </div>
              <div className="text-xl font-black text-white">
                {currentScenario.temp} <span className="text-xs font-normal text-slate-400">Outdoor Match Temp</span>
              </div>
              <Link
                to={`/catalog`}
                className={`text-xs font-bold ${currentScenario.accentText} hover:underline flex items-center gap-1 mt-1`}
              >
                <span>View calibrated equipment list</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Context-Aware Recommended Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayList.map((product) => {
            const displayImg =
              (product.images && product.images[0]) ||
              "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80";

            return (
              <div
                key={product._id || product.id}
                className="group bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:border-slate-700 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 mb-3">
                    <img
                      src={displayImg}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black uppercase text-cyan-400 flex items-center gap-1">
                      <ScenarioIcon className="w-3 h-3" />
                      <span>{currentScenario.name.split(" ")[0]} Calibrated</span>
                    </div>
                  </div>

                  <Link to={`/product/${product._id || product.id}`}>
                    <h4 className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
                      {product.name}
                    </h4>
                  </Link>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">{product.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div>
                    <div className="text-base font-black text-white">₹{product.price?.toLocaleString()}</div>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <div className="text-xs text-slate-500 line-through">₹{product.compareAtPrice.toLocaleString()}</div>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-300 font-bold transition-all active:scale-95 flex items-center gap-1.5 text-xs border border-slate-700 hover:border-cyan-500"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Equip</span>
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
