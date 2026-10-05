import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Server,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  Bug,
  Send,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

const SecurityPolicy: React.FC = () => {
  const [bountySubmitted, setBountySubmitted] = useState(false);
  const [bountyForm, setBountyForm] = useState({
    researcherName: "",
    email: "",
    vulnerabilityType: "web",
    summary: "",
    pocDetails: "",
  });

  const handleBountySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBountySubmitted(true);
  };

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Security</span>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              Infrastructure Hardening
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Enterprise Security &amp; Fraud Defense
            </h1>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              We treat your transactions, account data, and tournament reservations with the same bank-grade rigor applied by tier-one financial institutions.
            </p>
          </div>

          {/* 4 Pillars of Architecture */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <Lock className="h-6 w-6 text-emerald-600 mb-2" />
              <h3 className="text-sm font-bold text-slate-900">256-Bit TLS 1.3</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                All client-server communications are encrypted with high-entropy cryptographic ciphers.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <KeyRound className="h-6 w-6 text-rose-600 mb-2" />
              <h3 className="text-sm font-bold text-slate-900">PCI-DSS Level 1</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Card details bypass our databases completely, routed directly into certified payment vaults.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <Server className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="text-sm font-bold text-slate-900">DDoS Cloud Shield</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Layer-7 edge traffic inspection protects live flash sales and tournament drop queues from bots.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <ShieldCheck className="h-6 w-6 text-amber-500 mb-2" />
              <h3 className="text-sm font-bold text-slate-900">Delivery OTP Handover</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Courier parcel handoffs require 4-digit mobile verification codes to prevent misdelivery.
              </p>
            </div>
          </div>

          {/* Consumer Security Guidelines */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-16">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-rose-600" />
              <h2 className="text-xl font-black text-slate-900">Consumer Security Safety Advisory</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="font-bold text-slate-900 block">UPI Fraud Prevention</span>
                <p>
                  Remember that <strong>entering your UPI PIN deducts money from your bank account</strong>. ShopPulse customer care will NEVER ask you to enter a UPI PIN or accept a "collect request" to issue a refund.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="font-bold text-slate-900 block">Official Domain Verification</span>
                <p>
                  Ensure all purchases are made solely through <strong>shoppulse.in</strong>. Be vigilant against fake SMS links claiming to offer "90% off IPL Bats" directing to unofficial domains.
                </p>
              </div>
            </div>
          </div>

          {/* Bug Bounty Program */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-16">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Bug className="h-5 w-5 text-rose-600" />
                  <h2 className="text-xl font-black text-slate-900">
                    Vulnerability Disclosure &amp; Bug Bounty
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  We collaborate with ethical security researchers worldwide to safeguard our community.
                </p>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                ACTIVE PROGRAM
              </span>
            </div>

            {bountySubmitted ? (
              <div className="text-center py-8">
                <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Report Dispatched to Security Desk</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Thank you for keeping our athletes safe. Our Infosec team will triage your report within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setBountySubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Submit Another Report
                </button>
              </div>
            ) : (
              <form onSubmit={handleBountySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Researcher Name / Handle *
                    </label>
                    <input
                      type="text"
                      required
                      value={bountyForm.researcherName}
                      onChange={(e) =>
                        setBountyForm({ ...bountyForm, researcherName: e.target.value })
                      }
                      placeholder="e.g. sec_hunter_01"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={bountyForm.email}
                      onChange={(e) => setBountyForm({ ...bountyForm, email: e.target.value })}
                      placeholder="researcher@domain.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Vulnerability Summary &amp; Scope *
                  </label>
                  <input
                    type="text"
                    required
                    value={bountyForm.summary}
                    onChange={(e) => setBountyForm({ ...bountyForm, summary: e.target.value })}
                    placeholder="e.g. CSRF in Address Management Endpoint or IDOR in Order Query"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Proof of Concept (PoC) Steps *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={bountyForm.pocDetails}
                    onChange={(e) => setBountyForm({ ...bountyForm, pocDetails: e.target.value })}
                    placeholder="Provide step-by-step reproduction instructions and impact assessment..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-7 py-3 rounded-xl transition-all cursor-pointer shadow-2xs"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Transmit Encrypted Security Report</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SecurityPolicy;
