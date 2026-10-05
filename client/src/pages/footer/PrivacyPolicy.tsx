import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Mail,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState("collection");

  const sections = [
    { id: "collection", title: "1. Information We Collect" },
    { id: "usage", title: "2. How We Utilize Your Data" },
    { id: "payment", title: "3. Payment & Tokenization Security" },
    { id: "sharing", title: "4. Third-Party Logistics & Disclosures" },
    { id: "rights", title: "5. Your Statutory Privacy Rights" },
    { id: "cookies", title: "6. Cookie Policy & Preferences" },
    { id: "grievance", title: "7. Grievance Officer & Contact" },
  ];

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Privacy Policy</span>
          </nav>

          {/* Hero */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              DPDP Act &amp; GDPR Compliant
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              ShopPulse Privacy &amp; Data Protection Policy
            </h1>
            <p className="mt-2 text-xs text-slate-500 font-mono">
              LAST REVISED: OCTOBER 2026 • EFFECTIVE ACROSS ALL SHOPPULSE PLATFORMS
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Quick Sticky Table of Contents */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Navigation
                </span>
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`block px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeSection === sec.id
                        ? "bg-slate-900 text-white font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {sec.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Main Policy Content */}
            <div className="lg:col-span-3 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-10 text-xs text-slate-600 leading-relaxed">
              <section id="collection" className="scroll-mt-28 space-y-3">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-rose-600" />
                  1. Information We Collect
                </h2>
                <p>
                  At <strong>ShopPulse Retail India Private Limited</strong>, we respect your right to privacy. We collect only data strictly necessary to process tournament gear orders, deliver notifications, and guarantee warranty support:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                  <li>
                    <strong>Identity &amp; Contact Details:</strong> Full name, verified mobile number for OTP handover, billing address, and email for digital invoices.
                  </li>
                  <li>
                    <strong>Product Customization Data:</strong> Bat knocking specifications, custom spine engraving text, footwear shoe sizes, and warranty hologram serial numbers.
                  </li>
                  <li>
                    <strong>Technical &amp; Telemetry Data:</strong> IP address, browser type, geographic pincode estimate, and device identifiers used strictly to prevent fraudulent automated checkout bots.
                  </li>
                </ul>
              </section>

              <section id="usage" className="scroll-mt-28 space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  2. How We Utilize Your Data
                </h2>
                <p>We process your personal information under lawful grounds for the following specific purposes:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                  <li>Orchestrating warehouse packing, workshop bat preparation, and air express logistics.</li>
                  <li>Sending real-time order dispatch notifications via SMS, WhatsApp, and email.</li>
                  <li>Validating 6-month handle splice and 12-month electronic warranty claims.</li>
                  <li>Mitigating fraud, chargeback disputes, and bad-faith returns.</li>
                </ul>
                <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                  We NEVER sell, rent, or monetize your personal information to third-party ad brokers or data aggregators.
                </p>
              </section>

              <section id="payment" className="scroll-mt-28 space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-emerald-600" />
                  3. Payment &amp; Tokenization Security
                </h2>
                <p>
                  ShopPulse does not store complete debit/credit card numbers or UPI MPINs on our application servers.
                </p>
                <p>
                  All payment transactions are processed through RBI-authorized, PCI-DSS Level 1 compliant payment gateways (Razorpay and Cashfree) utilizing 256-bit end-to-end TLS encryption. Tokenized card references comply fully with Reserve Bank of India tokenization directives.
                </p>
              </section>

              <section id="sharing" className="scroll-mt-28 space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-amber-600" />
                  4. Third-Party Logistics &amp; Disclosures
                </h2>
                <p>
                  We share your delivery coordinates exclusively with contracted courier partners (Blue Dart Apex, Delhivery Priority, and regional express couriers) under non-disclosure obligations strictly for physical parcel delivery.
                </p>
              </section>

              <section id="rights" className="scroll-mt-28 space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-rose-600" />
                  5. Your Statutory Privacy Rights
                </h2>
                <p>
                  Under the Digital Personal Data Protection Act (DPDP Act, 2023), you hold complete sovereignty over your data:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                  <li><strong>Right to Access &amp; Summary:</strong> Request an export copy of all stored records.</li>
                  <li><strong>Right to Correction &amp; Erasure:</strong> Request permanent deletion of non-accounting profile data.</li>
                  <li><strong>Right to Opt-Out:</strong> Unsubscribe from promotional email drops with 1 click.</li>
                </ul>
              </section>

              <section id="cookies" className="scroll-mt-28 space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-slate-700" />
                  6. Cookie Policy &amp; Preferences
                </h2>
                <p>
                  We use essential session cookies to remember your shopping cart items, wishlist state, and active authentication session. Analytics cookies are aggregated anonymously to optimize page render speed and server capacity.
                </p>
              </section>

              <section id="grievance" className="scroll-mt-28 space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-rose-600" />
                  7. Grievance Redressal Officer Contact
                </h2>
                <p>
                  Pursuant to Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the designated Grievance Officer is:
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-slate-700">
                  <p><strong>Name:</strong> Rajeshwari Sen, Head of Legal &amp; Data Compliance</p>
                  <p><strong>Company:</strong> ShopPulse Retail India Private Limited</p>
                  <p><strong>Address:</strong> Level 5, Trade World Tower B, Senapati Bapat Marg, Lower Parel, Mumbai, MH - 400013</p>
                  <p><strong>Email:</strong> privacy@shoppulse.in | Response SLA: Within 48 hours</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
