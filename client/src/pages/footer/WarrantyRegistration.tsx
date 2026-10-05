import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Download,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

interface RegisteredWarranty {
  certId: string;
  productName: string;
  category: string;
  serialNumber: string;
  customerName: string;
  purchaseDate: string;
  expiryDate: string;
  coverage: string;
}

const WarrantyRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    orderId: "",
    serialNumber: "",
    category: "cricket",
    productName: "",
    purchaseDate: new Date().toISOString().split("T")[0],
  });

  const [registered, setRegistered] = useState<RegisteredWarranty | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const pDate = new Date(formData.purchaseDate || Date.now());
      // Duration based on category
      const monthsToAdd =
        formData.category === "electronics" || formData.category === "watches" ? 12 : 6;
      const expiry = new Date(pDate);
      expiry.setMonth(expiry.getMonth() + monthsToAdd);

      const coverageMap: Record<string, string> = {
        cricket: "6-Month Cane Handle Splice Replacement & Delamination Protection",
        electronics: "12-Month Component Replacement & Free Driver Battery Servicing",
        watches: "12-Month Quartz/Digital Movement & Water Resistance Seal Guarantee",
        footwear: "90-Day Outsole Delamination & Cricket Spike Plate Replacement",
        apparel: "6-Month Seam Integrity & Hardware Zipper Guarantee",
      };

      setRegistered({
        certId: `PULSE-WR-${Math.floor(100000 + Math.random() * 900000)}`,
        productName:
          formData.productName.trim() ||
          (formData.category === "cricket"
            ? "Pro Tournament Grade 1 English Willow"
            : "ShopPulse Certified Hardware"),
        category: formData.category,
        serialNumber: formData.serialNumber.toUpperCase() || "SP-SER-8921-VERIFIED",
        customerName: formData.customerName,
        purchaseDate: pDate.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        expiryDate: expiry.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        coverage: coverageMap[formData.category] || "Standard 6-Month Manufacturer Coverage",
      });

      setSubmitting(false);
    }, 600);
  };

  const resetForm = () => {
    setRegistered(null);
    setFormData({
      customerName: "",
      email: "",
      phone: "",
      orderId: "",
      serialNumber: "",
      category: "cricket",
      productName: "",
      purchaseDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Warranty Registration</span>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="h-3.5 w-3.5" />
              100% Genuine Authenticity Guarantee
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Official Gear Warranty Registration
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Register your newly purchased tournament willow bat, smart wearable, or footwear within 30 days of purchase to activate direct brand replacement warranty.
            </p>
          </div>

          {registered ? (
            /* Success Certificate View */
            <div className="bg-white rounded-2xl p-6 sm:p-10 border-2 border-emerald-500/80 shadow-md mb-12">
              <div className="text-center mb-8 pb-6 border-b border-slate-100">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <ShieldCheck className="h-9 w-9" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  WARRANTY ACTIVE &amp; SECURED
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  Digital Certificate of Warranty
                </h2>
                <p className="text-xs font-mono text-slate-500 mt-1">
                  CERTIFICATE ID: <strong className="text-slate-900">{registered.certId}</strong>
                </p>
              </div>

              {/* Certificate Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200/80 mb-6 text-xs">
                <div>
                  <span className="text-slate-400 font-medium uppercase tracking-wider block text-[10px]">
                    Registered Owner
                  </span>
                  <span className="text-sm font-bold text-slate-900">{registered.customerName}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium uppercase tracking-wider block text-[10px]">
                    Serial / Hologram ID
                  </span>
                  <span className="text-sm font-mono font-bold text-slate-900">
                    {registered.serialNumber}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium uppercase tracking-wider block text-[10px]">
                    Product Name
                  </span>
                  <span className="text-sm font-bold text-slate-900">{registered.productName}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium uppercase tracking-wider block text-[10px]">
                    Coverage Term
                  </span>
                  <span className="text-sm font-bold text-emerald-700">
                    Active through {registered.expiryDate}
                  </span>
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-slate-200">
                  <span className="text-slate-400 font-medium uppercase tracking-wider block text-[10px]">
                    Protected Warranty Scope
                  </span>
                  <span className="text-xs font-semibold text-slate-700 mt-0.5 block">
                    {registered.coverage}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => alert(`Certificate ${registered.certId} downloaded as PDF.`)}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer shadow-2xs"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF Certificate</span>
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-bold text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Register Another Product →
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Registration Form */
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Product Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    >
                      <option value="cricket">Cricket Equipment &amp; Bats (6 Mo. Splice)</option>
                      <option value="electronics">Electronics, Audio &amp; Wearables (12 Mo.)</option>
                      <option value="watches">ChronoCraft Timepieces (12 Mo.)</option>
                      <option value="footwear">Cricket Spikes &amp; Footwear (90 Days)</option>
                      <option value="apparel">Technical Apparel &amp; Outerwear (6 Mo.)</option>
                    </select>
                  </div>

                  {/* Product Name */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Product Model / Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      placeholder="e.g. Pro Tournament Grade 1 Bat or AuraTech X1"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Serial / Barcode */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Hologram / Serial Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.serialNumber}
                      onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                      placeholder="Located on handle splice or device box (e.g. SN-89201)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Order ID */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      ShopPulse Order ID / Invoice No. *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.orderId}
                      onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                      placeholder="e.g. SP-9482-DEL"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Owner Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="Your full legal name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Where certificate will be sent"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Mobile Number (OTP Verification) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Date of Purchase */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Date of Purchase *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.purchaseDate}
                      onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 leading-relaxed">
                  By registering, your product serial is verified with the original manufacturer batch database. You will receive priority replacement claims without requiring physical paper invoices.
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-8 py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>{submitting ? "Verifying Hologram Batch..." : "Activate Official Warranty"}</span>
                </button>
              </form>
            </div>
          )}

          {/* Warranty Terms by Category */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 mb-12 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-4">Official Coverage Terms</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="font-mono text-[10px] font-bold text-rose-600 uppercase">
                  CRICKET WORKSHOP
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">6-Month Handle Splice</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  Covers handle breakage, cane splice detachment, and blade neck shear during competitive play with leather balls.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="font-mono text-[10px] font-bold text-rose-600 uppercase">
                  ELECTRONICS &amp; AUDIO
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">12-Month Replacement</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  Full hardware replacement for Bluetooth connectivity failure, battery degradation below 80%, or driver crackle.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="font-mono text-[10px] font-bold text-rose-600 uppercase">
                  ATHLETIC FOOTWEAR
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">90-Day Sole Guarantee</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  Covers spike thread striping, midsole delamination, and toe-cap seam separation under pitch playing stress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WarrantyRegistration;
