import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Send,
  Zap,
  Heart,
  TrendingUp,
  X,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

interface JobRole {
  id: string;
  title: string;
  department: "engineering" | "merchandising" | "creative" | "operations";
  deptLabel: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
}

const jobOpenings: JobRole[] = [
  {
    id: "eng-01",
    title: "Senior Full-Stack Engineer (Node.js & React)",
    department: "engineering",
    deptLabel: "Engineering & Tech",
    location: "Bengaluru / Hybrid",
    type: "Full-Time",
    description:
      "Scale our real-time event-aware e-commerce engine, live auction mechanics, and microservice logistics tracker.",
    responsibilities: [
      "Architect low-latency React & Node.js services handling peak tournament match traffic spikes.",
      "Implement real-time WebSocket inventory sync and flash-drop reservation queues.",
      "Collaborate with UX designers to deliver fluid, motion-rich shopping interactions.",
    ],
  },
  {
    id: "merch-01",
    title: "Master Willow Specialist & Sourcing Lead",
    department: "merchandising",
    deptLabel: "Sports Merchandising",
    location: "Mumbai (Flagship Workshop)",
    type: "Full-Time",
    description:
      "Oversee timber procurement directly from English willow mills and calibrate our computerized bat-knocking workshop.",
    responsibilities: [
      "Grade clefts by grain density, balance, and ping rebound profile.",
      "Manage master craftsmen executing custom handle profiling and edge compaction.",
      "Ensure zero counterfeit gear enters our certified distribution network.",
    ],
  },
  {
    id: "creative-01",
    title: "Lead Apparel & Streetwear Designer",
    department: "creative",
    deptLabel: "Brand & Creative",
    location: "New Delhi / Hybrid",
    type: "Full-Time",
    description:
      "Design urban streetwear capsules, tournament fan jerseys, and technical athletic outerwear for modern youth culture.",
    responsibilities: [
      "Develop seasonal color palettes, silhouettes, and heavyweight cotton tech packs.",
      "Partner with sustainable mills to innovate organic and recycled fabric blends.",
      "Direct lookbook styling and digital campaign aesthetics.",
    ],
  },
  {
    id: "ops-01",
    title: "High-Speed Logistics & Node Operations Manager",
    department: "operations",
    deptLabel: "Operations & Logistics",
    location: "Bhiwandi (Central Hub) / Mumbai",
    type: "Full-Time",
    description:
      "Run operations for our primary fulfillment facility, orchestrating air cargo dispatches and same-day delivery SLAs.",
    responsibilities: [
      "Manage parcel sorting workflows for 10,000+ daily dispatches across 19,000+ PIN codes.",
      "Maintain zero-damage packaging standards for fragile English willow bats and delicate tech.",
      "Audit 3PL courier metrics (Blue Dart, Delhivery) to guarantee sub-48-hour delivery.",
    ],
  },
];

const Careers: React.FC = () => {
  const [activeDept, setActiveDept] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    coverNote: "",
  });

  const filteredJobs = jobOpenings.filter(
    (job) => activeDept === "all" || job.department === activeDept
  );

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setApplicationSubmitted(false);
    setApplicant({ name: "", email: "", phone: "", linkedin: "", coverNote: "" });
  };

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Careers &amp; Culture</span>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              We Are Hiring
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Build the Future of Sportswear &amp; E-Commerce
            </h1>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              We're a fast-moving crew of athletes, developers, designers, and logistics obsessives reimagining how millions of Indian sports enthusiasts discover, customize, and wear tournament gear.
            </p>
          </div>

          {/* Culture & Perks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <TrendingUp className="h-6 w-6 text-rose-600 mb-2" />
              <h3 className="text-sm font-bold text-slate-900">Competitive ESOPs</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Meaningful equity ownership so everyone shares directly in the enterprise value we build together.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <Zap className="h-6 w-6 text-amber-500 mb-2" />
              <h3 className="text-sm font-bold text-slate-900">₹30,000 Sports Stipend</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Annual budget for gym memberships, tournament registrations, sports coaching, and marathon entries.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <Heart className="h-6 w-6 text-emerald-600 mb-2" />
              <h3 className="text-sm font-bold text-slate-900">Complete Health Coverage</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Comprehensive medical insurance for you and your dependents with zero co-pay and OPD allowances.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <Briefcase className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="text-sm font-bold text-slate-900">Unlimited Gear Allowance</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Quarterly gear credits for new tournament drops, urban streetwear capsules, and wearable tech.
              </p>
            </div>
          </div>

          {/* Job Board Header & Category Tabs */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900">Open Positions ({jobOpenings.length})</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Filter by department to discover your next career leap.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: "all", label: "All Roles" },
                  { id: "engineering", label: "Engineering" },
                  { id: "merchandising", label: "Merchandising" },
                  { id: "creative", label: "Creative" },
                  { id: "operations", label: "Operations" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveDept(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeDept === tab.id
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Listings */}
            <div className="divide-y divide-slate-100">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {job.deptLabel}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">•</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {job.location}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{job.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="inline-flex items-center gap-1.5 self-start md:self-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                  >
                    <span>View Role &amp; Apply</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact for General Applications */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center">
            <h3 className="text-xl font-bold">Don't see your specific role?</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              We are constantly seeking brilliant talent across supply chain, hardware design, and marketing. Send your portfolio to careers@shoppulse.in.
            </p>
          </div>
        </div>
      </div>

      {/* Application Drawer / Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {applicationSubmitted ? (
              <div className="text-center py-10">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Application Received!</h3>
                <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                  Thank you for applying for the <strong>{selectedJob.title}</strong> role. Our talent team reviews every submission and will get in touch within 3 business days.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                  APPLY FOR ROLE
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-0.5">{selectedJob.title}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedJob.deptLabel} • {selectedJob.location} • {selectedJob.type}
                </p>

                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
                  <span className="font-bold text-slate-900 block mb-1">Key Responsibilities:</span>
                  <ul className="space-y-1 list-disc pl-4">
                    {selectedJob.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <form onSubmit={handleApplySubmit} className="mt-6 space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicant.name}
                      onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                      placeholder="e.g. Priyanshu Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicant.email}
                        onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicant.phone}
                        onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      LinkedIn / Portfolio URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={applicant.linkedin}
                      onChange={(e) => setApplicant({ ...applicant, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/... or github.com/..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Brief Note / Why ShopPulse?
                    </label>
                    <textarea
                      rows={3}
                      value={applicant.coverNote}
                      onChange={(e) => setApplicant({ ...applicant, coverNote: e.target.value })}
                      placeholder="Share a project you are proud of or what excites you about this role..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl transition-all cursor-pointer shadow-2xs mt-2"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Application</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Careers;
