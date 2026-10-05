import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Zap,
  Award,
  Sparkles,
  ArrowRight,
  MapPin,
  HeartHandshake,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

const AboutUs: React.FC = () => {
  const leadership = [
    {
      name: "Bhavesh & Founding Team",
      role: "Founder & Product Architect",
      bio: "Former district-level cricketer and software architect committed to eliminating counterfeit sporting equipment in India through transparent technology.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    },
    {
      name: "Vikram Rathore",
      role: "Head of Sports Hardware & Willow Master",
      bio: "Over 22 years carving Grade 1 English Willow for national tournament openers across Ranji Trophy and Indian Premier League circuits.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    },
    {
      name: "Ananya Mehta",
      role: "Director of Apparel & Capsule Design",
      bio: "NIFT alumna blending breathable moisture-wicking athletic weaves with contemporary Japanese-inspired streetwear silhouettes.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">About ShopPulse</span>
          </nav>

          {/* Hero */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Our Story &amp; Mission
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Where High-Performance Sporting Precision Meets Urban Culture.
            </h1>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              ShopPulse was conceived with a clear vision: Indian athletes and urban tastemakers deserve authentic, tournament-grade equipment without the rampant counterfeits, bloated markups, and guesswork that plague traditional retail.
            </p>
          </div>

          {/* Numbers Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-3xl font-black text-slate-900 block">250K+</span>
              <span className="text-xs text-slate-500 font-medium mt-1 block">
                Athletes &amp; Creators Powered
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-3xl font-black text-rose-600 block">100%</span>
              <span className="text-xs text-slate-500 font-medium mt-1 block">
                Hologram Authenticity Verified
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-3xl font-black text-slate-900 block">19,000+</span>
              <span className="text-xs text-slate-500 font-medium mt-1 block">
                Postal PIN Codes Covered
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-3xl font-black text-emerald-600 block">4.9 ★</span>
              <span className="text-xs text-slate-500 font-medium mt-1 block">
                Verified Customer Satisfaction
              </span>
            </div>
          </div>

          {/* Story Narrative with Image */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm mb-16 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  THE GENESIS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                  Built by athletes who were tired of fake willow and delayed deliveries.
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cricket is not just a game in India; it's a heartbeat. Yet, over 60% of bats labeled as Grade 1 English Willow sold across unverified channels are counterfeit Kashmir willow with painted grain lines.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We engineered ShopPulse to bridge the gap. We partner directly with primary timber mills in the United Kingdom and Jalandhar/Meerut master workshops. Every bat undergoes digital grain scanning, moisture profiling, and computerized balance-point calibration before receiving our tamper-proof verification seal.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80"
                  alt="Cricket Bat Workshop"
                  className="rounded-2xl object-cover h-80 w-full shadow-md"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200/60 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                  <p className="text-[11px] font-semibold text-slate-800">
                    Direct timber chain verification from Essex mills to your match kitbag.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars */}
          <div className="mb-16">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl font-black text-slate-900">Our Uncompromising Pillars</h2>
              <p className="text-xs text-slate-500 mt-1">
                The four core commitments guiding every stitch, blade profile, and software update.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-3">
                  <ShieldCheck className="h-5 w-5 text-rose-500" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Zero Counterfeit Tolerance</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  We source exclusively from authorized manufacturers and verified brands. Every hardware product features a serialised verification QR code registered in our cloud authenticity database.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-3">
                  <Zap className="h-5 w-5 text-amber-500" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Live Event-Aware Drops</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Our collections dynamically align with live sports calendars—IPL season editions, T20 World Cup gear drops, and seasonal festival street capsules synced with stadium energy.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-3">
                  <Award className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="text-base font-bold text-slate-900">In-House Master Workshop</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  We don't simply move boxes. Our flagship workshops feature 15,000-stroke automated knocking machines, laser spine personalization, and custom cane handle binding.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-3">
                  <HeartHandshake className="h-5 w-5 text-emerald-500" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Grassroots Athlete Support</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  1% of all revenue is directed into our Emerging Cricketer Equipment Grant, providing free Grade 1 match gear to talented district youth who lack financial backing.
                </p>
              </div>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm mb-16">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                THE COLLECTIVE
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">Craftsmen &amp; Visionaries</h2>
              <p className="text-xs text-slate-500 mt-1">
                Passionate athletes, master bat-makers, and textile innovators driving ShopPulse forward.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {leadership.map((leader, i) => (
                <div key={i} className="text-center">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-32 w-32 rounded-2xl object-cover mx-auto mb-4 border-2 border-slate-100 shadow-2xs"
                  />
                  <h4 className="text-sm font-bold text-slate-900">{leader.name}</h4>
                  <p className="text-[11px] font-bold text-rose-600">{leader.role}</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{leader.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shop CTA */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="max-w-xl mx-auto relative z-10 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                EXPERIENCE THE DIFFERENCE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">
                Ready to elevate your game and style?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Discover our curated range of tournament cricket gear, urban streetwear capsules, and performance footwear.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                  <span>Explore the Collection</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/store-locator"
                  className="inline-flex items-center gap-2 bg-slate-800 text-white hover:bg-slate-700 font-bold text-xs px-6 py-3 rounded-xl transition-all"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Visit a Flagship Store</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
