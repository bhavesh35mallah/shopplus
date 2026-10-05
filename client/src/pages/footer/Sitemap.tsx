import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Search,
  ShoppingBag,
  HelpCircle,
  Building2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

interface SiteSection {
  title: string;
  icon: React.ReactNode;
  links: Array<{
    title: string;
    path: string;
    description: string;
    tag?: string;
  }>;
}

const sitemapData: SiteSection[] = [
  {
    title: "Store Departments & Categories",
    icon: <ShoppingBag className="h-5 w-5 text-rose-600" />,
    links: [
      {
        title: "All Products Catalog",
        path: "/shop",
        description: "Browse all official tournament equipment and streetwear capsules.",
      },
      {
        title: "Cricket & Sports Hardware",
        path: "/shop?category=cricket",
        description: "Grade 1 English Willow bats, batting pads, gloves, and tournament kitbags.",
        tag: "HOT",
      },
      {
        title: "Men's Apparel & Streetwear",
        path: "/shop?category=mens-fashion",
        description: "Heavyweight 280 GSM cotton tees, drop-shoulder hoodies, and cargo pants.",
      },
      {
        title: "Women's Collection",
        path: "/shop?category=womens-fashion",
        description: "Linen-blend coordinate sets, technical outerwear, and modern silhouettes.",
      },
      {
        title: "Footwear & Match Spikes",
        path: "/shop?category=footwear",
        description: "StrideX multi-surface spikes, cricket rubbers, and street runners.",
      },
      {
        title: "Electronics & Audio",
        path: "/shop?category=electronics",
        description: "AuraTech hybrid ANC earbuds, audio monitors, and sports wearables.",
      },
      {
        title: "Timepieces & Accessories",
        path: "/shop?category=accessories",
        description: "ChronoCraft sports chronographs, bat grip cones, and protective gear.",
      },
    ],
  },
  {
    title: "Customer Care & Services",
    icon: <HelpCircle className="h-5 w-5 text-blue-600" />,
    links: [
      {
        title: "Track My Order Live",
        path: "/track-order",
        description: "Inspect real-time GPS courier milestones, AWB status, and arrival slots.",
        tag: "LOGISTICS",
      },
      {
        title: "14-Day Return Policy",
        path: "/return-policy",
        description: "Interactive return checker, free doorstep pickup, and instant store credit.",
      },
      {
        title: "Shipping Rates & Speeds",
        path: "/shipping",
        description: "Pincode delivery estimator, express air cargo, and packaging standards.",
      },
      {
        title: "Cricket Bat Care Guide",
        path: "/cricket-bat-guide",
        description: "5-stage knocking-in masterclass, linseed oiling, and willow preservation.",
        tag: "GUIDE",
      },
      {
        title: "Warranty Registration",
        path: "/warranty",
        description: "Register gear serials for 6-month handle and 12-month tech warranty.",
      },
      {
        title: "24/7 Client Concierge",
        path: "/contact",
        description: "Toll-free hotline, WhatsApp specialist desk, and priority ticketing.",
      },
    ],
  },
  {
    title: "Company & Initiatives",
    icon: <Building2 className="h-5 w-5 text-emerald-600" />,
    links: [
      {
        title: "About ShopPulse",
        path: "/about",
        description: "Our mission to bring authenticity, craft, and urban culture to Indian sport.",
      },
      {
        title: "Official Brand Partners",
        path: "/brand-partners",
        description: "Direct manufacturer alliances, brand certificates, and vendor inquiries.",
      },
      {
        title: "Sustainability Pledges",
        path: "/sustainability",
        description: "Planting 2 willow saplings for every bat sold and zero-plastic mailers.",
        tag: "ECO",
      },
      {
        title: "Tournament Sponsorships",
        path: "/sponsorships",
        description: "Grassroots athlete scholarships, college leagues, and equipment grants.",
      },
      {
        title: "Careers & Culture",
        path: "/careers",
        description: "Open roles in tech, merchandising, design, and operations with ESOPs.",
        tag: "HIRING",
      },
      {
        title: "Store Locator",
        path: "/store-locator",
        description: "Visit experience centers in Mumbai, Delhi, Bengaluru for net testing.",
      },
    ],
  },
  {
    title: "Legal, Security & Account",
    icon: <ShieldCheck className="h-5 w-5 text-slate-800" />,
    links: [
      {
        title: "Privacy Policy",
        path: "/privacy-policy",
        description: "DPDP Act 2023 compliance, data encryption, and grievance officer details.",
      },
      {
        title: "Terms of Service",
        path: "/terms-of-service",
        description: "Usage rules, pricing, cricket willow disclaimers, and Mumbai jurisdiction.",
      },
      {
        title: "Security & Infrastructure",
        path: "/security",
        description: "256-bit TLS encryption, PCI-DSS compliance, and bug bounty disclosure.",
      },
      {
        title: "Sitemap Directory",
        path: "/sitemap",
        description: "Complete navigable directory of all ShopPulse web destinations.",
      },
      {
        title: "Account Login / Registration",
        path: "/login",
        description: "Manage orders, save delivery addresses, and view member VIP tier.",
      },
      {
        title: "Shopping Bag",
        path: "/cart",
        description: "Review items, redeem promo vouchers, and calculate express delivery.",
      },
      {
        title: "Checkout & Secure Payment",
        path: "/checkout",
        description: "256-bit encrypted checkout with UPI, Card, NetBanking, and COD.",
      },
      {
        title: "System Maintenance & Tuning",
        path: "/maintenance",
        description: "Real-time engine upgrade status and drop reservation queue tracker.",
      },
    ],
  },
];

const Sitemap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = sitemapData
    .map((section) => ({
      ...section,
      links: section.links.filter(
        (link) =>
          link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.path.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.links.length > 0);

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Sitemap</span>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="h-3.5 w-3.5" />
              Complete Navigation Directory
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              ShopPulse Platform Sitemap
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Quickly explore all departments, client care resources, corporate initiatives, and legal policies.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-2xs mb-12 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sitemap pages (e.g. bat care, returns, warranty)..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Categorized Directory Grids */}
          <div className="space-y-12">
            {filteredSections.map((sec, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-2.5 pb-5 border-b border-slate-100 mb-6">
                  {sec.icon}
                  <h2 className="text-lg font-black text-slate-900">{sec.title}</h2>
                  <span className="text-xs text-slate-400 font-mono ml-auto">
                    ({sec.links.length} destination{sec.links.length > 1 ? "s" : ""})
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sec.links.map((link, i) => (
                    <Link
                      key={i}
                      to={link.path}
                      className="p-4 rounded-2xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                            {link.title}
                          </span>
                          {link.tag && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200">
                              {link.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {link.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>{link.path}</span>
                        <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sitemap;
