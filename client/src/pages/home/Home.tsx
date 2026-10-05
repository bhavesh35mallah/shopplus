import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  Star,
  CheckCircle2,
  Sparkles,
  Clock,
  ChevronDown,
  ShoppingBag,
  Gift,
  Leaf,
  Radio,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useDynamicStore } from "../../utils/dynamicStore";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../context/CartContext";
import { LiveShoppingPulse } from "../../components/home/LiveShoppingPulse";
import { AlmostSoldOut } from "../../components/home/AlmostSoldOut";
import { CompareAndDecide } from "../../components/home/CompareAndDecide";
import { PremiumCollection } from "../../components/home/PremiumCollection";
import { MysteryDeals } from "../../components/home/MysteryDeals";
import { SpinAndWin } from "../../components/home/SpinAndWin";
import { RewardsPointsSection } from "../../components/home/RewardsPointsSection";
import { SocialFeed } from "../../components/home/SocialFeed";
import { CompleteTheLook } from "../../components/home/CompleteTheLook";
import { ShopByNeed } from "../../components/home/ShopByNeed";
import { ContextAwareSection } from "../../components/home/ContextAwareSection";
import { SeasonalCalendar } from "../../components/home/SeasonalCalendar";
import { WeeklyAwards } from "../../components/home/WeeklyAwards";
import { ProductBattle } from "../../components/home/ProductBattle";
import { BuyMoreSaveMore } from "../../components/home/BuyMoreSaveMore";
import { RecentlyViewed } from "../../components/home/RecentlyViewed";
import { UpcomingEventCountdown } from "../../components/home/UpcomingEventCountdown";



const shopByPursuits = [
  {
    name: "Tournament Cricket",
    category: "cricket",
    desc: "English Willow bats, leather balls & protective armor",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Marathon & Running",
    category: "footwear",
    desc: "High-cushion responsive runners & breathable mesh",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Acoustic & Commute",
    category: "electronics",
    desc: "ANC wireless headphones, earbuds & fast powerbanks",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "Streetwear & Lounge",
    category: "mens-fashion",
    desc: "240 GSM heavyweight tees, utility cargos & hoodies",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
  },
];

const categoryTabs = [
  { label: "All Items", category: "" },
  { label: "Cricket & Sports", category: "cricket" },
  { label: "Footwear", category: "footwear" },
  { label: "Men's Apparel", category: "mens-fashion" },
  { label: "Women's Apparel", category: "womens-fashion" },
  { label: "Gadgets", category: "electronics" },
];

const outfitLooks = [
  {
    id: "matchday",
    title: "The Matchday Tournament Uniform",
    tagline: "Field-tested apparel & defense armor",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
    items: [
      { name: "Pro Willow English Bat", price: 6499 },
      { name: "Pro-Flex Lightweight Pads", price: 2199 },
      { name: "India Fan Supporter Tracksuit", price: 1999 },
    ],
    totalPrice: 10697,
    bundlePrice: 8999,
  },
  {
    id: "commuter",
    title: "The Urban Commuter Essentials",
    tagline: "Minimalist street aesthetics with acoustic isolation",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
    items: [
      { name: "240 GSM Oversized Cotton Tee", price: 899 },
      { name: "Aura ANC Wireless Headphones", price: 4999 },
      { name: "Full-Grain Leather Wallet", price: 999 },
    ],
    totalPrice: 6897,
    bundlePrice: 5799,
  },
  {
    id: "runner",
    title: "The 10K Performance Runner",
    tagline: "Breathable airflow and high-energy nitrogen rebound",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    items: [
      { name: "CloudFoam Pro Running Shoes", price: 2899 },
      { name: "Athletic Dri-Fit Tank Top", price: 699 },
      { name: "AMOLED Calling Smartwatch", price: 3499 },
    ],
    totalPrice: 7097,
    bundlePrice: 5999,
  },
];

const materialTechs = [
  {
    title: "English Willow Salix Alba",
    subtitle: "Grade-1 Hand-Pressed Clefts",
    desc: "Sourced from sustained plantations in Essex and Sussex, cold-pressed with 12 tons of pressure to produce explosive trampoline rebound.",
    tag: "CRICKET WOOD",
  },
  {
    title: "240 GSM Ring-Spun Cotton",
    subtitle: "Combed Double-Knit Jersey",
    desc: "Heavyweight structured drape that resists shrinkage and color fading through 50+ wash cycles, tailored for tropical heat.",
    tag: "STREETWEAR TEXTILE",
  },
  {
    title: "CloudFoam Nitrogen Rebound",
    subtitle: "Supercritical Gas Infusion",
    desc: "Infuses supercritical nitrogen into microcellular foam, providing 68% energy return on impact without bottoming out.",
    tag: "FOOTWEAR CUSHION",
  },
  {
    title: "40mm Beryllium Diaphragms",
    subtitle: "Audiophile Grade Acoustic Drivers",
    desc: "Ultra-rigid metal drivers that eliminate harmonic distortion across 10Hz - 40,000Hz frequency response with active ANC.",
    tag: "AUDIO ENGINEERING",
  },
];

const customerReviews = [
  {
    name: "Arjun Verma",
    location: "Mumbai",
    rating: 5,
    text: "The Pro Willow English cricket bat is incredible. Perfect balance, huge sweet spot, and delivered in under 24 hours.",
    product: "Pro Willow English Cricket Bat",
  },
  {
    name: "Sneha Nair",
    location: "Bengaluru",
    rating: 5,
    text: "Obsessed with the heavyweight oversized tees. The fabric quality is easily comparable to high-end luxury streetwear.",
    product: "Heavyweight 240 GSM Oversized Tee",
  },
  {
    name: "Vikram Singhania",
    location: "Delhi NCR",
    rating: 5,
    text: "Aura ANC headphones punch way above their price point. Active noise cancellation is seamless for workouts and travel.",
    product: "Aura ANC Wireless Headphones",
  },
];

const faqs = [
  {
    q: "How fast is delivery across India?",
    a: "We provide same-day dispatch for orders placed before 3 PM. Most metro areas (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata) receive deliveries within 24 to 48 hours via express courier.",
  },
  {
    q: "Are all products 100% genuine and verified?",
    a: "Yes. Every single item at ShopPulse is sourced directly from certified brand manufacturing partners and comes with an official manufacturer warranty.",
  },
  {
    q: "What is the return and exchange policy?",
    a: "We offer a 14-day hassle-free doorstep return policy. If a size does not fit or you wish to exchange, initiate a return from your account and our courier will pick it up at zero cost.",
  },
  {
    q: "Do your English Willow cricket bats come pre-knocked?",
    a: "Our Pro Willow series bats are factory-pressed and oiled. We recommend light mallet knocking around the edges and toe before match play for maximum longevity.",
  },
];



const Home: React.FC = () => {
  const { addToCart } = useCart();
  const { campaigns, homeConfig } = useDynamicStore();
  const activeCampaign = campaigns.find((c) => c.active) || campaigns[0];
  const [activeTab, setActiveTab] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeLookIndex, setActiveLookIndex] = useState(0);

  // Bat Finder Quiz State
  const [batStyle, setBatStyle] = useState("power");
  const [batWeight, setBatWeight] = useState("medium");

  // Fit Calculator State
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(72);
  const [fitPreference, setFitPreference] = useState<"slim" | "regular" | "oversized">("regular");

  // Gift Finder State
  const [giftBudget, setGiftBudget] = useState("under2k");

  // Live countdown timer for Flash Drop
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { products: trendingProducts, loading } = useProducts({
    category: activeTab || undefined,
    sort: "rating",
    limit: homeConfig.trendingSection.limit || 8,
  });

  const calculateSize = () => {
    let size = "M";
    if (heightCm < 165 && weightKg < 60) size = "S";
    else if (heightCm >= 180 || weightKg >= 82) size = "XL";
    else if (heightCm >= 175 || weightKg >= 74) size = "L";

    if (fitPreference === "oversized") {
      if (size === "S") size = "M";
      else if (size === "M") size = "L";
      else if (size === "L") size = "XL";
      else if (size === "XL") size = "XXL";
    }
    return size;
  };

  return (
    <Layout>
      {/* 0. LIVE SHOPPING PULSE TICKER & TOAST */}
      {homeConfig.advancedSections?.livePulse !== false && <LiveShoppingPulse />}

      {/* 1. EDITORIAL HERO BANNER */}
      {homeConfig.heroSection.enabled && (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Hero Typography */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-2xs">
                  <Sparkles className="h-3.5 w-3.5 text-rose-500" />
                  <span>Spring / Summer 2026 Collection</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
                  Precision Gear.{" "}
                  <span className="text-rose-600 font-extrabold">
                    Everyday Motion.
                  </span>
                </h1>

                <p className="text-base text-slate-600 max-w-lg leading-relaxed font-normal">
                  Curated sports gear, tournament cricket kits, luxury essentials, and acoustic audio engineered for performance and comfort.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    to="/shop"
                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <span>Explore Catalog</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/shop?category=cricket"
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <Zap className="h-4 w-4 text-rose-500" />
                    <span>Cricket Fan Gear</span>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="pt-6 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>100% Verified Authentic</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Same-Day Dispatch</span>
                  </div>
                  <div className="flex items-center gap-1.5 hidden sm:flex">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>14-Day Returns</span>
                  </div>
                </div>
              </div>

              {/* Right Hero Swiper Slider */}
              <div className="lg:col-span-6 relative">
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl border border-slate-100 aspect-[4/3] sm:aspect-[16/11]">
                  <Swiper
                    modules={[Autoplay, Pagination, EffectFade]}
                    effect="fade"
                    autoplay={{
                      delay: homeConfig.heroSection.autoplaySpeed || 4500,
                      disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="h-full w-full hero-swiper"
                  >
                    {homeConfig.heroSection.slides.map((slide, idx) => (
                      <SwiperSlide key={slide.id || idx} className="relative h-full w-full overflow-hidden">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="h-full w-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white z-10">
                          <div className="max-w-[80%]">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-400 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded">
                                {slide.tag}
                              </span>
                              {slide.stats && (
                                <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                                  {slide.stats}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-white mt-2 leading-snug">
                              {slide.title}
                            </h3>
                            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                              {slide.subtitle}
                            </p>
                          </div>

                          <Link
                            to={slide.ctaLink}
                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-slate-900 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer shadow-lg"
                            aria-label={slide.ctaText}
                            title={slide.ctaText}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. LIVE MATCHDAY & TOURNAMENT EVENT TRACKER HUB */}
      {homeConfig.flashBanner.enabled && (
        <section className="bg-rose-600 text-white py-3.5 px-4 transition-all">
          <div className="mx-auto max-w-[1360px] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-white animate-ping" />
              <Radio className="h-4 w-4 text-rose-200" />
              <strong className="font-extrabold uppercase tracking-wider text-rose-100">
                {homeConfig.flashBanner.badge || activeCampaign?.name}:
              </strong>
              <span className="font-medium text-white">
                {homeConfig.flashBanner.text || activeCampaign?.bannerText}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-rose-100 font-bold">
                ⚡ Use Code {homeConfig.flashBanner.code || activeCampaign?.code} ({homeConfig.flashBanner.discountPercent || activeCampaign?.discountPercent}% OFF)
              </span>
              <Link
                to={homeConfig.flashBanner.link || "/shop"}
                className="inline-flex items-center gap-1 rounded-full bg-white text-rose-600 font-bold px-3.5 py-1 text-[11px] hover:bg-rose-50 transition-colors shadow-sm"
              >
                <span>Shop Drop Now</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3. BRAND PARTNERS MARQUEE */}
      {homeConfig.partnerBrands.enabled && (
        <section className="bg-slate-50/50 py-5 border-b border-slate-100 overflow-hidden">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="text-slate-900 font-extrabold text-[11px] flex-shrink-0">
                {homeConfig.partnerBrands.title}:
              </span>
              <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto scrollbar-none py-1">
                {homeConfig.partnerBrands.brands.map((b) => (
                  <span
                    key={b}
                    className="text-slate-500 hover:text-slate-900 transition-colors flex-shrink-0 font-bold"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. BRAND VALUES STRIP */}
      {homeConfig.trustBadges.enabled && (
        <section className="bg-white border-b border-slate-100">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {homeConfig.trustBadges.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                    {idx === 0 ? (
                      <Truck className="h-5 w-5" />
                    ) : idx === 1 ? (
                      <ShieldCheck className="h-5 w-5" />
                    ) : idx === 2 ? (
                      <RotateCcw className="h-5 w-5" />
                    ) : (
                      <Zap className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTEXT-AWARE INTELLIGENCE PRODUCTS */}
      {homeConfig.advancedSections?.contextAware !== false && <ContextAwareSection />}

      {/* 5. CURATED BENTO DEPARTMENT TILES */}
      {homeConfig.featuredCollections.enabled && (
        <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Curated Departments
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {homeConfig.featuredCollections.title || "Shop by Collection"}
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-slate-700 hover:text-rose-600 flex items-center gap-1 group"
            >
              <span>View All Departments</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {homeConfig.featuredCollections.collections.map((col) => (
              <Link
                key={col.id || col.category}
                to={`/shop?category=${col.category}`}
                className="group relative overflow-hidden rounded-3xl bg-slate-950 aspect-[4/5] p-6 flex flex-col justify-end shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                <div className="relative z-10 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full inline-block mb-2">
                    {col.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                    {col.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 6. LIMITED FLASH DROP COUNTDOWN SPOTLIGHT */}
      <section className="bg-slate-900 text-white py-14 border-y border-slate-800">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Countdown info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 border border-rose-500/30 px-3 py-1 text-xs font-bold text-rose-400">
                <Clock className="h-3.5 w-3.5" />
                <span>LIMITED TOURNAMENT FLASH DROP</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                PulseSport Signature Cricket Kit
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Includes Hand-Crafted Grade-1 English Willow Bat, Lightweight Impact Pads, Pro Batting Gloves &amp; Titanium Helmet. Synced with the ongoing tournament.
              </p>

              {/* Ticking Countdown Boxes */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex flex-col items-center justify-center h-16 w-16 rounded-2xl bg-slate-800 border border-slate-700">
                  <span className="text-2xl font-black text-white font-mono">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Hours</span>
                </div>
                <span className="text-xl font-bold text-slate-600">:</span>
                <div className="flex flex-col items-center justify-center h-16 w-16 rounded-2xl bg-slate-800 border border-slate-700">
                  <span className="text-2xl font-black text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Mins</span>
                </div>
                <span className="text-xl font-bold text-slate-600">:</span>
                <div className="flex flex-col items-center justify-center h-16 w-16 rounded-2xl bg-slate-800 border border-slate-700">
                  <span className="text-2xl font-black text-rose-400 font-mono">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Secs</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="max-w-md pt-2 space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Stock Allocation</span>
                  <span className="text-white font-bold">84% Claimed</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full w-[84%]" />
                </div>
              </div>
            </div>

            {/* Price & Quick Buy Card */}
            <div className="lg:col-span-5 bg-slate-800/90 backdrop-blur-md rounded-3xl p-6 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Special Event Price</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-white">₹6,499</span>
                    <span className="text-sm text-slate-400 line-through">₹9,999</span>
                  </div>
                </div>
                <span className="rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white uppercase">
                  35% OFF
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Free Express Next-Day Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Official 1-Year Brand Warranty</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    addToCart({
                      _id: "flash-drop-cricket-kit",
                      name: "PulseSport Signature Tournament Kit",
                      slug: "pro-willow-english-cricket-bat-0001",
                      sku: "PULSE-FLASH-001",
                      description: "Signature limited tournament drop kit.",
                      price: 6499,
                      compareAtPrice: 9999,
                      images: [
                        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
                      ],
                      category: {
                        _id: "cricket",
                        name: "Cricket & Sports",
                        slug: "cricket",
                      },
                      brand: "PulseSport",
                      tags: ["flash-drop", "cricket"],
                      eventTags: ["tournament-ready"],
                      stock: 12,
                      rating: 4.9,
                      reviewsCount: 230,
                      status: "active",
                    }, 1);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-500 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-colors cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Claim Flash Drop (Add to Bag)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALMOST SOLD OUT - CRITICAL WAREHOUSE DEPLETION */}
      {homeConfig.advancedSections?.almostSoldOut !== false && <AlmostSoldOut />}

      {/* 7. INTERACTIVE "SHOP THE LOOK" / OUTFIT BUILDER */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Complete Lookbook
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Shop the Curated Look
            </h2>
          </div>
          {/* Look switcher pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {outfitLooks.map((look, idx) => (
              <button
                key={look.id}
                type="button"
                onClick={() => setActiveLookIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLookIndex === idx
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Look 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Look Display */}
        {(() => {
          const currentLook = outfitLooks[activeLookIndex];
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/70 p-6 sm:p-10 rounded-3xl border border-slate-100">
              {/* Lookbook Image with Hotspot */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 shadow-md">
                <img
                  src={currentLook.image}
                  alt={currentLook.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
                  {currentLook.tagline}
                </div>
              </div>

              {/* Look Items & Bundle Checkout */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    {currentLook.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Buy the curated set together and save 15% on individual retail prices.
                  </p>
                </div>

                {/* Items breakdown */}
                <div className="space-y-3">
                  {currentLook.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bundle Summary */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500">Bundle Price:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-rose-600">
                        ₹{currentLook.bundlePrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{currentLook.totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/shop"
                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Explore Look Set</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* COMPLETE THE LOOK & SYNERGY BUNDLES */}
      {homeConfig.advancedSections?.completeTheLook !== false && <CompleteTheLook />}

      {/* 8. TRENDING PRODUCTS SHOWCASE */}
      {homeConfig.trendingSection.enabled && (
        <section className="bg-slate-50/70 py-16 sm:py-20 border-y border-slate-100">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>{homeConfig.trendingSection.badge || "Trending This Week"}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {homeConfig.trendingSection.title || "Highest Rated & Best Sellers"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {homeConfig.trendingSection.subtitle}
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                {categoryTabs.map((tab) => (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setActiveTab(tab.category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      activeTab === tab.category
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse space-y-3 bg-white p-3 rounded-2xl border border-slate-100">
                    <div className="aspect-[3/4] w-full bg-slate-200 rounded-xl" />
                    <div className="h-3 w-1/3 bg-slate-200 rounded" />
                    <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            ) : trendingProducts.length > 0 ? (
              <div className="relative group">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1.2}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  navigation={{
                    prevEl: ".trending-prev-btn",
                    nextEl: ".trending-next-btn",
                  }}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  breakpoints={{
                    640: { slidesPerView: 2.2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 24 },
                    1024: { slidesPerView: 4, spaceBetween: 24 },
                  }}
                  className="pb-12 trending-swiper"
                >
                  {trendingProducts.map((product) => (
                    <SwiperSlide key={product._id} className="h-auto">
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Prev / Next Floating Navigation Buttons */}
                <button
                  type="button"
                  className="trending-prev-btn absolute -left-4 top-1/2 -translate-y-8 z-20 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl border border-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                  aria-label="Previous Products"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="trending-next-btn absolute -right-4 top-1/2 -translate-y-8 z-20 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl border border-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                  aria-label="Next Products"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-500">
                <p className="text-sm font-semibold">No products found in this category.</p>
                <Link
                  to="/shop"
                  className="mt-3 inline-block rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white uppercase"
                >
                  Browse All Products
                </Link>
              </div>
            )}

            {/* Explore Catalog CTA */}
            <div className="mt-12 text-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-slate-800 transition-all"
              >
                <span>Explore Entire Catalog ({homeConfig.trendingSection.limit}+ Items)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 9. SHOP BY SPORT & PURSUIT ACTIVITY GRID */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
            Engineered Gear
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Built for Every Pursuit
          </h2>
          <p className="text-xs text-slate-500 mt-1.5">
            Specialized tournament equipment, running footwear, and high-performance audio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shopByPursuits.map((item) => (
            <Link
              key={item.name}
              to={`/shop?category=${item.category}`}
              className="group relative overflow-hidden rounded-3xl bg-slate-100 aspect-[4/5] p-6 flex flex-col justify-end shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

              <div className="relative z-10 text-white">
                <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-snug">
                  {item.desc}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Gear</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SHOP BY NEED / GOAL-BASED FINDER */}
      {homeConfig.advancedSections?.shopByNeed !== false && <ShopByNeed />}

      {/* DEAL OF THE DAY PROMO (Dynamic CMS) */}
      {homeConfig.dealOfTheDay?.enabled && (
        <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-rose-950 to-slate-900 text-white p-8 sm:p-12 border border-rose-500/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-black tracking-wider uppercase">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                {homeConfig.dealOfTheDay.discountBadge || "LIMITED TIME SPECIAL"}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-rose-300">
                {homeConfig.dealOfTheDay.subtitle}
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {homeConfig.dealOfTheDay.productTitle || homeConfig.dealOfTheDay.title}
              </h2>
              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-3xl font-black text-rose-400">
                  ₹{homeConfig.dealOfTheDay.price?.toLocaleString()}
                </span>
                {homeConfig.dealOfTheDay.originalPrice && (
                  <span className="text-lg text-slate-400 line-through">
                    ₹{homeConfig.dealOfTheDay.originalPrice?.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-rose-300 font-semibold bg-rose-900/50 px-2.5 py-1 rounded-md">
                  Ends in {homeConfig.dealOfTheDay.endsInHours}h
                </span>
              </div>
              <div className="pt-2">
                <Link
                  to={homeConfig.dealOfTheDay.link || "/shop"}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition shadow-lg shadow-rose-900/40"
                >
                  <span>Claim Exclusive Deal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            {homeConfig.dealOfTheDay.image && (
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={homeConfig.dealOfTheDay.image}
                  alt={homeConfig.dealOfTheDay.productTitle || homeConfig.dealOfTheDay.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* AI-STYLE RECOMMENDATIONS: COMPARE & DECIDE */}
      {homeConfig.advancedSections?.compareAndDecide !== false && <CompareAndDecide />}

      {/* 10. INTERACTIVE CRICKET WILLOW & BAT SELECTOR TOOL */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Interactive Fitting Tool
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Find Your Ideal Cricket Willow Spec
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Match play demands precise bat balance. Select your batting style and preferred pickup to see the recommended cleft spec.
            </p>

            {/* Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                  Batting Profile
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBatStyle("power")}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      batStyle === "power"
                        ? "bg-rose-600 text-white"
                        : "bg-slate-900 text-slate-300 border border-slate-800"
                    }`}
                  >
                    Power Hitter
                  </button>
                  <button
                    type="button"
                    onClick={() => setBatStyle("stroke")}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      batStyle === "stroke"
                        ? "bg-rose-600 text-white"
                        : "bg-slate-900 text-slate-300 border border-slate-800"
                    }`}
                  >
                    Stroke Maker
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                  Pickup Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBatWeight("light")}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      batWeight === "light"
                        ? "bg-rose-600 text-white"
                        : "bg-slate-900 text-slate-300 border border-slate-800"
                    }`}
                  >
                    Feather (1140-1160g)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBatWeight("medium")}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      batWeight === "medium"
                        ? "bg-rose-600 text-white"
                        : "bg-slate-900 text-slate-300 border border-slate-800"
                    }`}
                  >
                    Mid-Heavy (1180-1210g)
                  </button>
                </div>
              </div>
            </div>

            {/* Recommendation Result Box */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
                  Recommended Spec:
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  {batStyle === "power" ? "Mid-to-Low Monster Sweetspot" : "High Balanced Profile with Duckbill Toe"} • {batWeight === "light" ? "1150g" : "1190g"}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Grade-1 English Willow cleft with 8-10 straight clean grains.
                </p>
              </div>

              <Link
                to="/shop?category=cricket"
                className="rounded-xl bg-white text-slate-950 px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-rose-50 hover:text-rose-600 transition-colors flex-shrink-0"
              >
                View Matching Bats
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM COLLECTION / RESERVE VAULT */}
      {homeConfig.advancedSections?.premiumCollection !== false && <PremiumCollection />}

      {/* PRODUCT BATTLE 1V1 SHOWDOWN ARENA */}
      {homeConfig.advancedSections?.productBattle !== false && <ProductBattle />}

      {/* MYSTERY DEALS GAMIFIED VAULT */}
      {homeConfig.advancedSections?.mysteryDeals !== false && <MysteryDeals />}

      {/* BUY MORE SAVE MORE VOLUME DISCOUNTS */}
      {homeConfig.advancedSections?.buyMoreSaveMore !== false && <BuyMoreSaveMore />}

      {/* 11. MATERIAL & FABRIC TECHNOLOGY LAB */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-slate-100">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
            Material Science
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Engineered from the Fiber Up
          </h2>
          <p className="text-xs text-slate-500 mt-1.5">
            Every millimeter of material is tested for mechanical tensile strength, airflow, and resilience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materialTechs.map((tech, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  {tech.tag}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-3">
                  {tech.title}
                </h3>
                <h4 className="text-xs font-semibold text-slate-500 mt-0.5">
                  {tech.subtitle}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                  {tech.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Lab Certified Spec</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEASONAL CALENDAR & TOURNAMENT ROADMAP */}
      {homeConfig.advancedSections?.seasonalCalendar !== false && <SeasonalCalendar />}

      {/* WEEKLY SHOPPULSE AWARDS */}
      {homeConfig.advancedSections?.weeklyAwards !== false && <WeeklyAwards />}

      {/* 12. SMART SIZE & FIT CALCULATOR */}
      <section className="bg-slate-50/70 py-16 sm:py-20 border-b border-slate-100">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
            <div className="text-center max-w-md mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Interactive Assistant
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Find Your Perfect Fit
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Zero guesswork sizing. Adjust your measurements for an instant size recommendation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Height Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Height</span>
                  <span className="text-rose-600">{heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={205}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-slate-900 cursor-pointer"
                />
              </div>

              {/* Weight Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Weight</span>
                  <span className="text-rose-600">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min={45}
                  max={120}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-slate-900 cursor-pointer"
                />
              </div>

              {/* Fit Preference */}
              <div className="space-y-2">
                <span className="block text-xs font-bold text-slate-700">Fit Cut</span>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-center">
                  {(["slim", "regular", "oversized"] as const).map((cut) => (
                    <button
                      key={cut}
                      type="button"
                      onClick={() => setFitPreference(cut)}
                      className={`py-1 text-[11px] font-bold capitalize rounded-lg transition-all cursor-pointer ${
                        fitPreference === cut
                          ? "bg-white text-slate-900 shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {cut}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Recommendation Result */}
            <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-400">
                  Calculated Optimal Size:
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-3xl font-black text-rose-400">
                    Size {calculateSize()}
                  </span>
                  <span className="text-xs text-slate-300">
                    ({fitPreference === "oversized" ? "Relaxed streetwear drop" : "Standard ergonomic taper"})
                  </span>
                </div>
              </div>

              <Link
                to="/shop?category=mens-fashion"
                className="rounded-xl bg-white text-slate-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-rose-50 transition-colors"
              >
                Shop in Size {calculateSize()}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 13. CURATED GIFT FINDER BY BUDGET */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-slate-100">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
              <Gift className="h-4 w-4" />
              <span>Gifting Concierge</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Curated Gift Finder
            </h2>
          </div>

          {/* Budget Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "under2k", label: "Under ₹2,000" },
              { id: "under5k", label: "₹2,000 - ₹5,000" },
              { id: "premium", label: "₹5,000+ Luxury" },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setGiftBudget(b.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  giftBudget === b.id
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gift Persona Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: "cricketer",
              persona: "The Cricket Fanatic",
              pick: "Impact Batting Gloves & Leather Ball Set",
              price: "₹1,499",
              image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80",
            },
            {
              id: "audiophile",
              persona: "The Audio Enthusiast",
              pick: "True Wireless Earbuds with ENC Dual Mic",
              price: "₹1,799",
              image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
            },
            {
              id: "runner",
              persona: "The Fitness Addict",
              pick: "CloudFoam Pro Running Shoes",
              price: "₹2,899",
              image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
            },
            {
              id: "gentleman",
              persona: "The Classic Everyday",
              pick: "RFID Top-Grain Bifold Leather Wallet",
              price: "₹999",
              image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
            },
          ].map((gift) => (
            <Link
              key={gift.id}
              to="/shop"
              className="group p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xl transition-all"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-4">
                <img
                  src={gift.image}
                  alt={gift.persona}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 block">
                {gift.persona}
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">
                {gift.pick}
              </h4>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50">
                <span className="text-xs font-black text-slate-900">{gift.price}</span>
                <span className="text-[11px] font-bold text-rose-600 flex items-center gap-0.5">
                  <span>Gift Box Ready</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SPIN AND WIN INTERACTIVE WHEEL */}
      {homeConfig.advancedSections?.spinAndWin !== false && <SpinAndWin />}

      {/* UPCOMING EVENT COUNTDOWN & FAST-PASS */}
      {homeConfig.advancedSections?.upcomingEventCountdown !== false && <UpcomingEventCountdown />}

      {/* 14. VIP REWARDS & POINTS ECOSYSTEM */}
      {homeConfig.advancedSections?.rewardsPoints !== false && <RewardsPointsSection />}

      {/* 15. INSTAGRAM & SOCIAL UGC SHOPPABLE FEED */}
      {homeConfig.advancedSections?.socialFeed !== false && <SocialFeed />}

      {/* 16. SUSTAINABILITY & CIRCULAR GEAR INITIATIVE */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-slate-100">
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800/60 px-3 py-1 text-xs font-bold text-emerald-300">
              <Leaf className="h-3.5 w-3.5" />
              <span>Eco-Pulse Circular Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Crafted for Generations. Never Landfills.
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              100% plastic-free recycled dispatch boxes, sustainable FSC willow re-planting pledges, and our Trade-In Guarantee where old cricket bats get repaired and donated to grassroots academies.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto flex-shrink-0">
            <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800 text-center">
              <span className="text-2xl font-black text-white">100%</span>
              <p className="text-[11px] text-emerald-300 mt-0.5">Recyclable Packaging</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800 text-center">
              <span className="text-2xl font-black text-white">5,000+</span>
              <p className="text-[11px] text-emerald-300 mt-0.5">Willow Trees Planted</p>
            </div>
          </div>
        </div>
      </section>

      {/* 17. RAPID LOGISTICS & DISPATCH RADAR */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white flex-shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pulse Express Dispatch Hubs
              </h3>
              <p className="text-xs text-slate-500">
                Fulfillment centers active in Mumbai, Bengaluru, Delhi NCR, and Hyderabad.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Next Regional Dispatch Flights: Today 4:30 PM</span>
          </div>
        </div>
      </section>

      {/* RECENTLY VIEWED BROWSING HISTORY */}
      {homeConfig.advancedSections?.recentlyViewed !== false && <RecentlyViewed />}

      {/* 18. FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
      {homeConfig.faqSection?.enabled !== false && (
        <section className="bg-slate-50/60 py-16 sm:py-20 border-b border-slate-100">
          <div className="mx-auto max-w-[860px] px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500 mt-1.5">
                Everything you need to know about deliveries, gear warranties, and returns.
              </p>
            </div>

            <div className="space-y-3">
              {(homeConfig.faqSection?.items?.length ? homeConfig.faqSection.items : faqs).map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                    >
                      <span className="text-sm font-bold text-slate-900">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-rose-600" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-2 animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 19. VERIFIED CUSTOMER REVIEWS */}
      {homeConfig.testimonials?.enabled !== false && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Verified Shoppers
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Loved by Players &amp; Athletes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(homeConfig.testimonials?.items?.length ? homeConfig.testimonials.items : customerReviews).map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/60 p-6 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-slate-700">
                      "{"comment" in rev ? (rev as any).comment : (rev as any).text}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{rev.name}</h5>
                      <span className="text-[10px] text-slate-400">{"location" in rev ? (rev as any).location : "India"} • Verified Buyer</span>
                    </div>
                    <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Home;