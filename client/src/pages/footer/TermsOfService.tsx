import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  ShieldAlert,
  Scale,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

const TermsOfService: React.FC = () => {
  const [activeTab, setActiveTab] = useState("terms-intro");

  const termsNav = [
    { id: "terms-intro", label: "1. Acceptance & User Eligibility" },
    { id: "terms-pricing", label: "2. Pricing, GST & Order Acceptance" },
    { id: "terms-willow", label: "3. Cricket Willow Disclaimer" },
    { id: "terms-ip", label: "4. Intellectual Property & Trademarks" },
    { id: "terms-liability", label: "5. Limitation of Liability" },
    { id: "terms-law", label: "6. Governing Law & Jurisdiction" },
  ];

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Terms of Service</span>
          </nav>

          {/* Hero */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Scale className="h-3.5 w-3.5 text-rose-600" />
              Legal Agreement
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              ShopPulse Terms of Service &amp; Usage
            </h1>
            <p className="mt-2 text-xs text-slate-500 font-mono">
              EFFECTIVE DATE: OCTOBER 2026 • GOVERNS ALL COMMERCE &amp; SERVICES
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Sections
                </span>
                {termsNav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`block px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeTab === item.id
                        ? "bg-slate-900 text-white font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Terms Body */}
            <div className="lg:col-span-3 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-10 text-xs text-slate-600 leading-relaxed">
              <section id="terms-intro" className="scroll-mt-28 space-y-3">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-rose-600" />
                  1. Acceptance &amp; User Eligibility
                </h2>
                <p>
                  Welcome to ShopPulse. By accessing, browsing, or completing a purchase through <strong>ShopPulse</strong> (the "Platform"), you agree to be bound by these Terms of Service.
                </p>
                <p>
                  You represent and warrant that you are at least 18 years of age or possess legal parental/guardian consent to enter into binding legal agreements under the Indian Contract Act, 1872.
                </p>
              </section>

              <section id="terms-pricing" className="scroll-mt-28 space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-emerald-600" />
                  2. Pricing, GST &amp; Order Acceptance
                </h2>
                <p>
                  All catalog prices are listed in <strong>Indian Rupees (INR ₹)</strong> and are inclusive of statutory Goods and Services Tax (GST) as applicable under Indian commercial regulations.
                </p>
                <p>
                  Placement of an order does not constitute an irrevocable contract until our dispatch warehouse verifies stock availability, addresses, and payment authentication. ShopPulse reserves the right to cancel orders arising from typographical pricing errors or detected automated purchasing scripts.
                </p>
              </section>

              <section id="terms-willow" className="scroll-mt-28 space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  3. Cricket Willow Equipment Disclaimer
                </h2>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  <span className="font-bold block mb-1">Crucial Notice for Cricket Bat Purchases:</span>
                  Cricket bats crafted from natural English Willow (<em>Salix alba var. caerulea</em>) and Kashmir willow are organic wood products subjected to extreme physical stress when striking leather balls traveling at 100-140 km/h.
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                  <li>
                    Surface micro-cracking and ball seam indentations on the blade face are normal natural characteristics of willow and do NOT constitute a manufacturing defect.
                  </li>
                  <li>
                    Bats MUST be properly oiled and knocked-in before competitive play. Taking an un-knocked bat directly into a match voids warranty coverage.
                  </li>
                  <li>
                    ShopPulse warranties specifically cover handle splice breakage and cane delamination for 6 months. Blade edge damage resulting from yorkers or misuse is outside warranty scope.
                  </li>
                </ul>
              </section>

              <section id="terms-ip" className="scroll-mt-28 space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  4. Intellectual Property &amp; Trademarks
                </h2>
                <p>
                  "ShopPulse", the ShopPulse flame emblem, Pulse VIP Club, and associated graphics, UI layouts, and lookbooks are proprietary marks of ShopPulse Retail India Private Limited. Third-party brand marks (SS, SG, MRF, Kookaburra) belong to their respective registered owners and are utilized under authorized distributorship.
                </p>
              </section>

              <section id="terms-liability" className="scroll-mt-28 space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-rose-600" />
                  5. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable law, ShopPulse shall not be liable for indirect, incidental, or consequential damages resulting from sports injuries sustained during athletic activity or tournament play. Athletes are urged to utilize proper protective equipment (helmets, pads, arm guards).
                </p>
              </section>

              <section id="terms-law" className="scroll-mt-28 space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Scale className="h-4 w-4 text-slate-900" />
                  6. Governing Law &amp; Dispute Jurisdiction
                </h2>
                <p>
                  These Terms are governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, arbitration, or proceeding arising out of or in connection with the Platform shall be subject to the exclusive jurisdiction of the competent courts in <strong>Mumbai, Maharashtra, India</strong>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
