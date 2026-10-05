import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Truck,
  CreditCard,
  PackageCheck,
  Clock,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

interface CategoryRule {
  id: string;
  name: string;
  windowDays: number;
  eligible: boolean;
  notes: string;
  requirements: string[];
}

const categoryRules: Record<string, CategoryRule> = {
  cricket: {
    id: "cricket",
    name: "Cricket Bats & Hard Gear",
    windowDays: 14,
    eligible: true,
    notes:
      "Eligible if un-knocked with original factory shrink wrap intact. If pre-knocked by ShopPulse workshop, bats are covered under our 6-month handle warranty but cannot be returned once used with leather match balls.",
    requirements: [
      "Factory barcode label on splice",
      "No leather seam ball impact marks",
      "Original bat cover and padded cylinder box included",
    ],
  },
  apparel: {
    id: "apparel",
    name: "Men & Women Apparel, Caps & Jerseys",
    windowDays: 14,
    eligible: true,
    notes:
      "All unworn apparel with security tag attached can be returned or exchanged for different sizing free of charge.",
    requirements: [
      "Original brand tags intact",
      "Unwashed and unperfumed",
      "Original polybag with barcode intact",
    ],
  },
  footwear: {
    id: "footwear",
    name: "Cricket Spikes & Athletic Sneakers",
    windowDays: 14,
    eligible: true,
    notes:
      "Must be tried on indoors on carpeted surfaces. Outsoles with grass stains, pitch clay, or scuffs cannot be returned.",
    requirements: [
      "Undamaged original shoebox (do not tape directly on box)",
      "Spare studs, insoles, and key included",
      "Clean soles with zero outdoor dirt",
    ],
  },
  electronics: {
    id: "electronics",
    name: "Smartwatches, Earbuds & Audio",
    windowDays: 7,
    eligible: true,
    notes:
      "7-day replacement for manufacturing defects. Due to hygiene norms, opened in-ear buds cannot be returned for buyer's remorse, only replaced if defective.",
    requirements: [
      "All cables, charging cases, and manuals enclosed",
      "No physical drop scratches or liquid ingress",
      "Factory serial number matching invoice",
    ],
  },
};

const ReturnPolicy: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState("cricket");
  const [itemCondition, setItemCondition] = useState<"unused" | "opened" | "used">("unused");

  const currentRule = categoryRules[selectedCat];

  const getEligibilityVerdict = () => {
    if (itemCondition === "unused") {
      return {
        isEligible: true,
        badge: "100% Return & Exchange Eligible",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        detail:
          "Your item qualifies for full refund to your original payment method or 105% Pulse Store Credit.",
      };
    }
    if (itemCondition === "opened") {
      if (selectedCat === "electronics") {
        return {
          isEligible: false,
          badge: "Replacement Only (Defect Verification Required)",
          color: "text-amber-700 bg-amber-50 border-amber-200",
          detail:
            "Opened personal audio and smart accessories are eligible for free doorstep hardware inspection and replacement if verified defective.",
        };
      }
      return {
        isEligible: true,
        badge: "Eligible for Return / Size Exchange",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        detail:
          "As long as original tags and box packaging are preserved without dirt or wash, pickup will be accepted.",
      };
    }
    return {
      isEligible: false,
      badge: "Not Eligible for Standard Return",
      color: "text-rose-700 bg-rose-50 border-rose-200",
      detail:
        "Used gear with pitch marks, field wear, or washed garments cannot be resold. If your item has an unexpected manufacturing defect, please file a Warranty Claim instead.",
    };
  };

  const verdict = getEligibilityVerdict();

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Return Policy</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <RotateCcw className="h-3.5 w-3.5" />
              14-Day Buyer Protection
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              14-Day Hassle-Free Returns
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              We stand 100% behind every tournament bat, sneaker, and apparel piece we dispatch. If the fit isn't right, return it with zero stress.
            </p>
          </div>

          {/* 4-Step Process Visual Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs relative">
              <span className="text-2xl font-black text-slate-200 mb-2 block">01</span>
              <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-3">
                <Clock className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Initiate in 60s</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Log into your account or message our concierge within 14 days of delivery.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs relative">
              <span className="text-2xl font-black text-slate-200 mb-2 block">02</span>
              <div className="h-9 w-9 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3">
                <Truck className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Free Doorstep Pickup</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Our courier collects from your doorstep. No printing of shipping labels required.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs relative">
              <span className="text-2xl font-black text-slate-200 mb-2 block">03</span>
              <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3">
                <PackageCheck className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">48-Hr Hub Inspection</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Quality checks verify tags, un-knocked bat surface, and footwear sole condition.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs relative">
              <span className="text-2xl font-black text-slate-200 mb-2 block">04</span>
              <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3">
                <CreditCard className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Instant Refund / Credit</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Receive 100% money back to your bank or choose Store Credit with an extra 5% bonus.
              </p>
            </div>
          </div>

          {/* Interactive Eligibility Checker */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-12">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-rose-600" />
              <h2 className="text-lg font-black text-slate-900">Interactive Return Eligibility Checker</h2>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Check instantly if your purchase qualifies for exchange, doorstep pickup, or warranty claim.
            </p>

            {/* Category selection */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                1. Select Product Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.values(categoryRules).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCat(cat.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border ${
                      selectedCat === cat.id
                        ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition selection */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                2. Select Item Condition
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setItemCondition("unused")}
                  className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                    itemCondition === "unused"
                      ? "border-slate-900 bg-slate-50 text-slate-900 ring-2 ring-slate-900/10"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="block font-black">Brand New / Unused</span>
                  <span className="font-normal text-slate-500 text-[11px]">
                    Tags intact, never used in play or worn outdoors.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setItemCondition("opened")}
                  className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                    itemCondition === "opened"
                      ? "border-slate-900 bg-slate-50 text-slate-900 ring-2 ring-slate-900/10"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="block font-black">Tried On Indoors</span>
                  <span className="font-normal text-slate-500 text-[11px]">
                    Checked for sizing, all packaging preserved.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setItemCondition("used")}
                  className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                    itemCondition === "used"
                      ? "border-slate-900 bg-slate-50 text-slate-900 ring-2 ring-slate-900/10"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="block font-black">Used In Play / Field</span>
                  <span className="font-normal text-slate-500 text-[11px]">
                    Ball marks on willow face or footwear grass scuffs.
                  </span>
                </button>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={`p-5 rounded-xl border ${verdict.color} transition-all`}>
              <div className="flex items-center gap-2 mb-1">
                {verdict.isEligible ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0" />
                )}
                <span className="text-sm font-black tracking-tight">{verdict.badge}</span>
              </div>
              <p className="text-xs leading-relaxed mt-1 opacity-90">{verdict.detail}</p>

              <div className="mt-4 pt-3 border-t border-slate-200/50">
                <span className="text-[11px] font-bold uppercase tracking-wider block mb-1 text-slate-700">
                  Mandatory Return Checklist for {currentRule.name}:
                </span>
                <ul className="text-xs space-y-1 list-disc pl-4 text-slate-600">
                  {currentRule.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Ready to return? You only need your Order ID and registered phone number.
              </span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-2xs"
              >
                <span>Request Doorstep Return</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Refund Timelines & Methods */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 mb-12">
            <h3 className="text-lg font-black text-slate-900 mb-4">Refund Methods &amp; Speed</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                    <th className="pb-3 font-bold">Payment Method</th>
                    <th className="pb-3 font-bold">Settlement Window</th>
                    <th className="pb-3 font-bold">Destination</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3 font-bold text-slate-900">UPI (GPay / PhonePe / Paytm)</td>
                    <td className="py-3 text-emerald-600 font-semibold">Instant to 4 hours</td>
                    <td className="py-3">Original VPA / Bank Account</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-slate-900">ShopPulse Store Credit (+5% Extra)</td>
                    <td className="py-3 text-rose-600 font-semibold">Immediate on pickup scan</td>
                    <td className="py-3">Account Wallet (No expiration)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-slate-900">Credit / Debit Card (Visa / MC / RuPay)</td>
                    <td className="py-3">2 to 5 business days</td>
                    <td className="py-3">Issuing Bank Card Account</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-slate-900">Cash on Delivery (COD)</td>
                    <td className="py-3">24 hours after bank info link</td>
                    <td className="py-3">Direct NEFT / IMPS Transfer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Warranty Crosslink Note */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                CRICKET BAT OR ELECTRONICS DEFECT?
              </span>
              <h3 className="text-lg font-bold">Past the 14-day window? Check your Official Warranty</h3>
              <p className="text-xs text-slate-400 max-w-xl">
                Tournament English Willow handles carry a 6-month structural warranty, and AuraTech audio features a 1-year replacement warranty.
              </p>
            </div>
            <Link
              to="/warranty"
              className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs px-5 py-3 rounded-xl flex-shrink-0 transition-all cursor-pointer"
            >
              <span>Register / File Warranty</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnPolicy;
