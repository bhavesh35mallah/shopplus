import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Droplets,
  Hammer,
  Layers,
  ArrowRight,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

interface StepGuide {
  step: string;
  title: string;
  tool: string;
  duration: string;
  summary: string;
  instructions: string[];
  warning?: string;
}

const careSteps: StepGuide[] = [
  {
    step: "01",
    title: "Light Raw Linseed Oiling",
    tool: "Specialist Raw Linseed Oil & Lint-Free Cloth",
    duration: "24 Hours Drying Time",
    summary:
      "Linseed oil nourishes the wood fibers, preserving moisture content (ideal 11-13%) and preventing the willow from becoming brittle.",
    instructions: [
      "Use only raw linseed oil (never boiled linseed oil as it contains toxic drying chemicals).",
      "Pour a teaspoon of oil onto the face of the bat and spread evenly with a soft cotton rag.",
      "Lightly coat the edges and toe. Do NOT apply oil to the splice, handle, or bat stickers.",
      "Lay the bat horizontally face-up on clean newspaper for 24 hours to let the oil soak deeply.",
    ],
    warning: "Over-oiling deadens the ping and makes the willow heavy and soggy. Less is always more.",
  },
  {
    step: "02",
    title: "Precision Edge & Face Knocking-In",
    tool: "Hardwood Bat Mallet or Leather Ball Mallet",
    duration: "4 to 6 Hours total (across 3-4 days)",
    summary:
      "Compressing and hardening the soft willow wood fibers prevents cracking when facing high-speed 130+ km/h cricket balls.",
    instructions: [
      "Start gently in the sweet spot (center of the blade) with medium-pressure taps.",
      "Gradually work upwards and downwards across the entire blade face.",
      "Glance the mallet at a 45-degree angle along both edges to round off the sharp corners.",
      "Never strike the toe directly perpendicular at 90 degrees; glance upwards gently.",
    ],
    warning: "Taking an un-knocked English Willow bat straight into a competitive match will crack the edge within an over.",
  },
  {
    step: "03",
    title: "Clear Extratec & Edge Tape Shielding",
    tool: "Anti-Scuff Poly Sheet & Fiberglass Tape",
    duration: "30 Minutes",
    summary:
      "An anti-scuff film prevents surface micro-cracks, surface grain split, and repels moisture when batting on damp grass wickets.",
    instructions: [
      "Ensure the oiled bat has fully dried for at least 48 hours before applying adhesive.",
      "Peel back the Extratec film and align from 1 inch below the handle splice to 1 inch above the toe.",
      "Smooth out all air bubbles using a ruler or soft cloth wrapped block.",
      "Apply reinforced cross-weave fiberglass tape on the edges for added buffer against 140 km/h yorkers.",
    ],
  },
  {
    step: "04",
    title: "Gradual Net Seasoning with Old Leather Balls",
    tool: "High-Quality Used Match Ball (No Synthetics / Dimples)",
    duration: "2 to 3 Practice Sessions",
    summary:
      "Transition from the mallet to real bat-on-ball impact in the nets before tournament match debut.",
    instructions: [
      "Begin with gentle throwdowns using an old, soft leather seam ball.",
      "Play defensive block shots and drives out of the middle of the blade.",
      "Inspect the blade face after 30-40 balls. Look for small seam indentations.",
      "Once 2 full net sessions pass without any fiber bruising, your bat is 100% tournament ready.",
    ],
    warning: "Do NOT use synthetic dimple bowling machine balls or polyurethane balls on English Willow.",
  },
  {
    step: "05",
    title: "Off-Season Storage & Climate Control",
    tool: "Padded Bat Sleeve & Silica Gel Packets",
    duration: "Ongoing",
    summary:
      "Maintain stable humidity to avoid warping, mildew, or extreme dehydration during Indian summer or monsoon seasons.",
    instructions: [
      "Store your bat vertically in a cool, dry room away from direct afternoon sunlight.",
      "Never store bats in car trunks or next to hot radiator exhausts or AC damp drafts.",
      "At the end of a competitive season, apply a light coat of linseed oil before storing in its sleeve.",
    ],
  },
];

const BatCareGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Cricket Bat Care Guide</span>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              Master Craftsman Protocol
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Cricket Bat Care &amp; Knocking-In Masterclass
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Every English Willow bat is a living, breathing natural timber instrument. With proper oiling, edge compaction, and moisture care, your bat will deliver explosive ping and last multiple seasons.
            </p>
          </div>

          {/* Key Facts Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs text-center">
              <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-1.5" />
              <div className="text-xl font-black text-slate-900">11 - 13%</div>
              <div className="text-[11px] text-slate-500 font-medium">Ideal Willow Moisture</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs text-center">
              <Hammer className="h-6 w-6 text-amber-500 mx-auto mb-1.5" />
              <div className="text-xl font-black text-slate-900">10,000+</div>
              <div className="text-[11px] text-slate-500 font-medium">Mallet Rebound Taps</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs text-center">
              <Layers className="h-6 w-6 text-emerald-500 mx-auto mb-1.5" />
              <div className="text-xl font-black text-slate-900">45° Angle</div>
              <div className="text-[11px] text-slate-500 font-medium">Edge Beveling Technique</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs text-center">
              <ShieldCheck className="h-6 w-6 text-rose-500 mx-auto mb-1.5" />
              <div className="text-xl font-black text-slate-900">6 Months</div>
              <div className="text-[11px] text-slate-500 font-medium">Splice &amp; Handle Warranty</div>
            </div>
          </div>

          {/* Interactive Step-by-Step Guide */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900">5-Stage Conditioning Sequence</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click through each phase to inspect exact tools, timing, and master techniques.
                </p>
              </div>
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                {careSteps.map((s, idx) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeStep === idx
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Phase {s.step}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Step Content */}
            <div className="py-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    STAGE {careSteps[activeStep].step}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    {careSteps[activeStep].title}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="bg-slate-100 px-3 py-1 rounded-full font-semibold text-slate-700">
                    🛠️ {careSteps[activeStep].tool}
                  </span>
                  <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full font-semibold">
                    ⏱️ {careSteps[activeStep].duration}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {careSteps[activeStep].summary}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Step-by-Step Instructions:
                </h4>
                <div className="space-y-2.5">
                  {careSteps[activeStep].instructions.map((inst, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{inst}</p>
                    </div>
                  ))}
                </div>
              </div>

              {careSteps[activeStep].warning && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Master Craftsman Caution:</span>
                    <p className="mt-0.5 text-amber-800 leading-relaxed">
                      {careSteps[activeStep].warning}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous Stage
              </button>
              <button
                type="button"
                disabled={activeStep === careSteps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(careSteps.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next Stage
              </button>
            </div>
          </div>

          {/* Dos and Don'ts Matrix */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 mb-12 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6">Dos and Don'ts for English Willow</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dos */}
              <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
                <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  What You MUST Do
                </h4>
                <ul className="space-y-2.5 text-xs text-emerald-950">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Apply a Toe-Guard rubber or resin bumper to prevent yorker splits.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Re-oil blade once before season start with only 1 teaspoon of raw linseed.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Sand surface lightly with 180-grit sandpaper before refreshing oil coat.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Store bat inside a thermal padded bat cover in a dry room.</span>
                  </li>
                </ul>
              </div>

              {/* Don'ts */}
              <div className="bg-rose-50/50 p-5 rounded-xl border border-rose-100">
                <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2 mb-3">
                  <XCircle className="h-4 w-4 text-rose-600" />
                  What You MUST NEVER Do
                </h4>
                <ul className="space-y-2.5 text-xs text-rose-950">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>NEVER bat in heavy rain or wet conditions with unsealed willow edges.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>NEVER leave bats exposed inside parked car boot in summer temperatures.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>NEVER strike composite bowling machine dimple balls with match willow.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>NEVER tap the bat vigorously into concrete or hard cement pavements.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Workshop Service CTA */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                PREFER PROFESSIONAL WORKSHOP SERVICE?
              </span>
              <h3 className="text-xl font-bold mt-1">Book In-Store Machine &amp; Hand Knocking</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Our flagship stores in Mumbai, Delhi, and Bangalore feature computerized 15,000-stroke bat knocking machines and certified bat craftsmen.
              </p>
            </div>
            <Link
              to="/store-locator"
              className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs px-5 py-3 rounded-xl flex-shrink-0 transition-all cursor-pointer"
            >
              <span>Locate a Workshop Store</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BatCareGuide;
