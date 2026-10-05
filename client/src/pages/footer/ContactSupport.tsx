import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PhoneCall,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

interface TicketConfirmation {
  ticketId: string;
  topic: string;
  name: string;
  email: string;
  sla: string;
}

const ContactSupport: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    topic: "order_status",
    urgency: "medium",
    message: "",
  });

  const [submittedTicket, setSubmittedTicket] = useState<TicketConfirmation | null>(null);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const topicLabels: Record<string, string> = {
        order_status: "Order Dispatch & Delivery Query",
        bat_consult: "Cricket Willow Fitment Consultation",
        size_exchange: "Size Exchange & Doorstep Return",
        warranty_claim: "Hardware Warranty & Repair Claim",
        partnership: "Commercial & Athlete Sponsorship Inquiry",
      };

      setSubmittedTicket({
        ticketId: `PULSE-TKT-${Math.floor(10000 + Math.random() * 90000)}`,
        topic: topicLabels[formData.topic] || "General Support",
        name: formData.name,
        email: formData.email,
        sla: formData.urgency === "urgent" ? "Under 45 Minutes" : "Under 2 Hours",
      });
      setLoading(false);
    }, 500);
  };

  const faqs = [
    {
      q: "Can a cricket specialist help me choose the right bat weight and profile?",
      a: "Yes! Our sports advisors are available via WhatsApp (+91 98200 PULSE) or live call to review your batting stance, sweet spot preference, and pitch conditions.",
    },
    {
      q: "How fast are return requests acknowledged?",
      a: "Return requests submitted online are verified immediately and a courier pickup is scheduled for the next business morning.",
    },
    {
      q: "Do you ship internationally for tournament kits?",
      a: "Currently, our direct website covers all 19,000+ PIN codes across India. For overseas tournament teams, contact concierge@shoppulse.in for air freight quotes.",
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
            <span className="text-slate-900 font-medium">Contact Support</span>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              Live Concierge Desk Active
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              24/7 Client Concierge &amp; Gear Desk
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Have an urgent shipping question, need advice choosing willow grains, or want to exchange a size? Our specialist team is always here for you.
            </p>
          </div>

          {/* Quick Channels Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-3">
                <PhoneCall className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                TOLL-FREE 24/7
              </span>
              <h3 className="text-base font-black text-slate-900 mt-0.5">1800-PULSE-IN</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Direct phone support for immediate dispatch updates and order changes.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3">
                <MessageSquare className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                WHATSAPP CONCIERGE
              </span>
              <h3 className="text-base font-black text-slate-900 mt-0.5">+91 98200 PULSE</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Chat with bat specialists, share photos of gear, and receive instant advice.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3">
                <Mail className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                OFFICIAL DESK
              </span>
              <h3 className="text-base font-black text-slate-900 mt-0.5">concierge@shoppulse.in</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                For corporate orders, sponsorships, and warranty documentation.
              </p>
            </div>
          </div>

          {/* Support Ticket Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-12">
            {submittedTicket ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  TICKET RECEIVED
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  We're On It, {submittedTicket.name}!
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Ticket Reference: <strong className="text-slate-900 font-mono">{submittedTicket.ticketId}</strong>
                </p>

                <div className="max-w-md mx-auto bg-slate-50 rounded-xl p-5 border border-slate-200 mt-6 text-xs text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Inquiry Department:</span>
                    <span className="font-bold text-slate-900">{submittedTicket.topic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Response Time:</span>
                    <span className="font-bold text-emerald-700">{submittedTicket.sla}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Notification Sent To:</span>
                    <span className="font-bold text-slate-900">{submittedTicket.email}</span>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedTicket(null);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        orderId: "",
                        topic: "order_status",
                        urgency: "medium",
                        message: "",
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                  <Link
                    to="/shop"
                    className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors"
                  >
                    Return to Shop
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-black text-slate-900">Send an Inquiry or Priority Ticket</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fill out the form below. Average response time is under 45 minutes during business hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Shikhar Dhawan"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="shikhar@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Order ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.orderId}
                        onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                        placeholder="e.g. SP-9482-DEL"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Subject / Topic *
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      >
                        <option value="order_status">Order Dispatch &amp; Delivery Query</option>
                        <option value="bat_consult">Cricket Willow Consultation</option>
                        <option value="size_exchange">Size Exchange &amp; Return Request</option>
                        <option value="warranty_claim">Hardware Warranty &amp; Splice Issue</option>
                        <option value="partnership">Commercial &amp; Athlete Sponsorship</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Priority Level
                      </label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      >
                        <option value="medium">Standard Priority (&lt; 2 Hours SLA)</option>
                        <option value="urgent">Urgent (&lt; 45 Minutes SLA)</option>
                        <option value="low">General Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Your Message / Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details so we can assist you promptly..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-7 py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{loading ? "Dispatching to Concierge..." : "Submit Ticket"}</span>
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Quick FAQ Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80">
            <h3 className="text-lg font-black text-slate-900 mb-4">Support &amp; Advisory FAQs</h3>
            <div className="divide-y divide-slate-100">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left gap-4 font-bold text-xs text-slate-900 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform ${
                          isOpen ? "rotate-180 text-rose-600" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactSupport;
