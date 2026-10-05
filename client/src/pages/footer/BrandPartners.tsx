import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  ArrowRight,
  Handshake,
  Search,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

interface PartnerBrand {
  name: string;
  category: "sports" | "apparel" | "tech" | "footwear";
  country: string;
  badge: string;
  description: string;
  popularProduct: string;
  logoText: string;
}

const partnerBrands: PartnerBrand[] = [
  {
    name: "PulseSport Pro",
    category: "sports",
    country: "United Kingdom / India",
    badge: "Official Workshop Partner",
    description:
      "Exclusive tournament English Willow bat maker, hand-pressed in Essex and finished in our Mumbai batting workshop.",
    popularProduct: "Tournament Grade 1 Player Edition Bat",
    logoText: "PS",
  },
  {
    name: "AuraTech Audio",
    category: "tech",
    country: "Japan / India",
    badge: "Authorized Distributor",
    description:
      "Acoustic engineering lab delivering hybrid active noise cancellation wireless buds and high-definition sports monitors.",
    popularProduct: "AuraPulse ANC Wireless In-Ear",
    logoText: "AT",
  },
  {
    name: "UrbanStitch Capsule",
    category: "apparel",
    country: "India",
    badge: "Direct Factory Direct",
    description:
      "Heavyweight 280 GSM combed cotton blanks, drop-shoulder tees, and relaxed cargo trousers for metropolitan street culture.",
    popularProduct: "Overdyed Streetwear Heavyweight Tee",
    logoText: "US",
  },
  {
    name: "StrideX Athletics",
    category: "footwear",
    country: "Germany / India",
    badge: "Authorized Athletic Outfitter",
    description:
      "Pioneering multi-surface cricket spike plates and carbon-shank running sneakers tested on first-class tournament pitches.",
    popularProduct: "Veloce 8-Spike Match Bowler Shoe",
    logoText: "SX",
  },
  {
    name: "ChronoCraft Timepieces",
    category: "tech",
    country: "Switzerland / India",
    badge: "Certified Horology Partner",
    description:
      "Sapphire crystal sports chronographs and IP68 military-grade smart fitness monitors crafted for rigorous athletic tracking.",
    popularProduct: "Apex Diver 200M Automatic",
    logoText: "CC",
  },
  {
    name: "LuxeFemme",
    category: "apparel",
    country: "India",
    badge: "Curated Designer",
    description:
      "Contemporary linen-blend coordinate sets, athleisure tights, and oversized tailored jackets for effortless luxury.",
    popularProduct: "Linen Utility Overshirt & Trouser",
    logoText: "LF",
  },
  {
    name: "SS TON Cricket",
    category: "sports",
    country: "India",
    badge: "Heritage Brand Partner",
    description:
      "Legendary Indian cricket manufacturing house with over 50 years of supplying test match batsmen with iconic willow blades.",
    popularProduct: "SS Ton Matrix Player Profile",
    logoText: "SS",
  },
  {
    name: "SG Sports",
    category: "sports",
    country: "India",
    badge: "Official Match Ball Partner",
    description:
      "Suppliers of the official red and pink test cricket balls used in Indian international test match fixtures.",
    popularProduct: "SG Test Seam Leather Ball & Pads",
    logoText: "SG",
  },
];

const BrandPartners: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = partnerBrands.filter((brand) => {
    const matchesCategory = activeCategory === "all" || brand.category === activeCategory;
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.popularProduct.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Brand Partners</span>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Authenticity Network
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Official Brand Partners &amp; Direct Alliances
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Every item featured on ShopPulse is sourced directly from original manufacturers and certified national distributors. Zero third-party resellers, zero gray-market surplus, 100% verified authentic.
            </p>
          </div>

          {/* 3 Pillars of Partnership Trust */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <Award className="h-6 w-6 text-rose-600 mb-2" />
              <h3 className="text-sm font-bold text-slate-900">Direct Mill &amp; Factory Contracts</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Direct agreements with manufacturers eliminate middlemen and guarantee fresh production batches.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <ShieldCheck className="h-6 w-6 text-emerald-600 mb-2" />
              <h3 className="text-sm font-bold text-slate-900">Laser Hologram Serial Numbers</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Every bat, electronic wearable, and luxury timepiece carries a scannable authenticity code.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="text-sm font-bold text-slate-900">Full Brand Warranty Protection</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Purchases are honored at all official brand service centers nationwide with zero disputes.
              </p>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {[
                  { id: "all", label: "All Partners" },
                  { id: "sports", label: "Sports & Willow" },
                  { id: "apparel", label: "Apparel & Streetwear" },
                  { id: "tech", label: "Audio & Wearables" },
                  { id: "footwear", label: "Footwear & Spikes" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeCategory === tab.id
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search partner brand..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Brand Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filteredBrands.map((brand, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center">
                        {brand.logoText}
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-900">{brand.name}</h4>
                        <span className="text-[11px] text-slate-400 font-medium">
                          Origin: {brand.country}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {brand.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {brand.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Signature Release
                    </span>
                    <span className="font-semibold text-slate-800">{brand.popularProduct}</span>
                  </div>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-1 font-bold text-rose-600 hover:text-rose-700 transition-colors"
                  >
                    <span>View Gear</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Become a Brand Partner / Inquiry */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                DISTRIBUTION INQUIRY
              </span>
              <h3 className="text-2xl font-black">Are you a manufacturer or premium brand?</h3>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                Join India's fastest growing event-driven e-commerce platform. We provide curated brand presentation, zero counterfeit tolerance, and nationwide rapid fulfillment.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs px-6 py-3.5 rounded-xl flex-shrink-0 transition-all cursor-pointer shadow-sm"
            >
              <Handshake className="h-4 w-4" />
              <span>Submit Brand Proposal</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrandPartners;
