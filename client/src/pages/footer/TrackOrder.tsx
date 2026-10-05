import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  AlertCircle,
  PhoneCall,
  ShieldCheck,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

interface OrderTrackingData {
  orderId: string;
  recipient: string;
  phone: string;
  deliveryAddress: string;
  carrier: string;
  awbNumber: string;
  status: "Order Confirmed" | "Packed" | "In Transit" | "Out for Delivery" | "Delivered";
  estimatedDelivery: string;
  items: Array<{
    name: string;
    variant: string;
    quantity: number;
    price: string;
    image: string;
  }>;
  milestones: Array<{
    title: string;
    location: string;
    time: string;
    completed: boolean;
    current?: boolean;
    description: string;
  }>;
}

const mockOrders: Record<string, OrderTrackingData> = {
  "SP-9482-DEL": {
    orderId: "SP-9482-DEL",
    recipient: "Rohit Sharma",
    phone: "+91 98*** **420",
    deliveryAddress: "Flat 402, DLF Phase 5, Golf Course Road, Gurugram, Haryana - 122002",
    carrier: "Blue Dart Apex Air (FastTrack)",
    awbNumber: "BD-884920194IN",
    status: "In Transit",
    estimatedDelivery: "Tomorrow by 6:00 PM",
    items: [
      {
        name: "Pro Tournament Grade 1 English Willow Cricket Bat",
        variant: "Full Size / 2lb 8oz",
        quantity: 1,
        price: "₹18,499",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80",
      },
      {
        name: "Pulse Gripmaster Pro Batting Gloves",
        variant: "Right Hand / Men",
        quantity: 1,
        price: "₹2,199",
        image: "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=500&auto=format&fit=crop&q=80",
      },
    ],
    milestones: [
      {
        title: "Order Verified & Confirmed",
        location: "ShopPulse Central Hub, Mumbai",
        time: "Yesterday, 10:15 AM",
        completed: true,
        description: "Payment captured via UPI. Quality check initiated.",
      },
      {
        title: "Dispatched from Willow Care Warehouse",
        location: "Bhiwandi Logistics Hub, MH",
        time: "Yesterday, 04:30 PM",
        completed: true,
        description: "Bat knocked, laser-branded, and secured in heavy-duty cylinder box.",
      },
      {
        title: "In Transit via Air Cargo",
        location: "Indira Gandhi International Airport, New Delhi",
        time: "Today, 06:45 AM",
        completed: true,
        current: true,
        description: "Arrived at primary Delhi sorting center. Sorted for regional delivery hub.",
      },
      {
        title: "Out for Delivery",
        location: "Gurugram Delivery Facility",
        time: "Expected Tomorrow, 09:00 AM",
        completed: false,
        description: "Courier executive will be assigned with OTP verification.",
      },
      {
        title: "Delivered to Customer",
        location: "Customer Destination",
        time: "Expected Tomorrow, by 06:00 PM",
        completed: false,
        description: "Direct handover with signature and unboxing warranty card.",
      },
    ],
  },
  "SP-7821-MUM": {
    orderId: "SP-7821-MUM",
    recipient: "Priya V.",
    phone: "+91 97*** **812",
    deliveryAddress: "Sea Green Apts, Perry Cross Rd, Bandra West, Mumbai - 400050",
    carrier: "Delhivery Surface Priority",
    awbNumber: "DLV-99381023",
    status: "Out for Delivery",
    estimatedDelivery: "Today by 2:30 PM",
    items: [
      {
        name: "AuraTech Pulse Active Wireless Earbuds",
        variant: "Matte Carbon / ANC",
        quantity: 1,
        price: "₹4,999",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
      },
    ],
    milestones: [
      {
        title: "Order Placed & Verified",
        location: "ShopPulse Online Hub",
        time: "Oct 03, 11:20 AM",
        completed: true,
        description: "Order received and inventory allocated.",
      },
      {
        title: "Packed in Biodegradable Mailer",
        location: "Kurla Express Fulfillment Hub",
        time: "Oct 03, 03:00 PM",
        completed: true,
        description: "Packaged with tamper-proof security holographic tape.",
      },
      {
        title: "Arrived at Bandra Hub",
        location: "Bandra West Facility",
        time: "Today, 07:15 AM",
        completed: true,
        description: "Scanned into van route 14B.",
      },
      {
        title: "Out for Delivery",
        location: "En route with rider Ramesh K.",
        time: "Today, 09:30 AM",
        completed: true,
        current: true,
        description: "Rider is 4 stops away. OTP will be sent to registered mobile.",
      },
      {
        title: "Delivered",
        location: "Perry Cross Rd, Bandra",
        time: "Expected Today, 02:30 PM",
        completed: false,
        description: "Awaiting final handover.",
      },
    ],
  },
  "SP-5104-BLR": {
    orderId: "SP-5104-BLR",
    recipient: "Arjun Nair",
    phone: "+91 91*** **991",
    deliveryAddress: "12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru - 560038",
    carrier: "Blue Dart Apex",
    awbNumber: "BD-33928172IN",
    status: "Delivered",
    estimatedDelivery: "Delivered on Oct 02",
    items: [
      {
        name: "Heavyweight Urban Fleece Oversized Hoodie",
        variant: "Washed Olive / Size L",
        quantity: 1,
        price: "₹3,499",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80",
      },
    ],
    milestones: [
      {
        title: "Order Placed",
        location: "Bangalore E-Com Node",
        time: "Sep 30, 09:00 AM",
        completed: true,
        description: "Instant UPI confirmation.",
      },
      {
        title: "Shipped",
        location: "Devanahalli Fulfillment Center",
        time: "Sep 30, 02:00 PM",
        completed: true,
        description: "Processed and labeled.",
      },
      {
        title: "In Transit",
        location: "Indiranagar Local Hub",
        time: "Oct 01, 10:00 AM",
        completed: true,
        description: "Received at delivery station.",
      },
      {
        title: "Delivered Successfully",
        location: "HAL 2nd Stage, Indiranagar",
        time: "Oct 02, 01:14 PM",
        completed: true,
        current: true,
        description: "Delivered to resident. OTP verified.",
      },
    ],
  },
};

const TrackOrder: React.FC = () => {
  const [orderQuery, setOrderQuery] = useState("SP-9482-DEL");
  const [trackingResult, setTrackingResult] = useState<OrderTrackingData | null>(
    mockOrders["SP-9482-DEL"]
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = orderQuery.trim().toUpperCase();
    if (!cleaned) {
      setErrorMessage("Please enter an Order ID or AWB Tracking Number");
      setTrackingResult(null);
      return;
    }

    if (mockOrders[cleaned]) {
      setTrackingResult(mockOrders[cleaned]);
      setErrorMessage("");
    } else {
      setErrorMessage(
        `We could not find an active shipment for "${cleaned}". Please check your order confirmation email or try one of the demo order IDs below.`
      );
      setTrackingResult(null);
    }
  };

  const loadPreset = (presetId: string) => {
    setOrderQuery(presetId);
    setTrackingResult(mockOrders[presetId]);
    setErrorMessage("");
  };

  const faqs = [
    {
      q: "Where do I find my ShopPulse Order ID?",
      a: "Your Order ID begins with 'SP-' and can be found in your order confirmation SMS, WhatsApp message, and email invoice sent right after checkout.",
    },
    {
      q: "When will the courier tracking link become active?",
      a: "Tracking numbers are generated when your gear is packed at our distribution center. Real-time GPS status typically activates within 2-4 hours after carrier pickup.",
    },
    {
      q: "Can I reschedule my delivery time or change the delivery address?",
      a: "Yes! Once your order is dispatched, you can click 'Contact Support' or call our 24/7 concierge at 1800-PULSE-IN to request a slot hold or update delivery instructions.",
    },
    {
      q: "What if I am unavailable during delivery?",
      a: "Our logistics partner will attempt delivery up to 3 times on consecutive business days. You will also receive an SMS with a direct contact link to reschedule.",
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
            <span className="text-slate-900 font-medium">Track Order</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Truck className="h-3.5 w-3.5" />
              Live Pulse Logistics
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Track Your Order Live
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Enter your ShopPulse Order ID or Airway Bill (AWB) number to inspect real-time dispatch milestones and delivery estimates.
            </p>
          </div>

          {/* Search Box Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="e.g. SP-9482-DEL or BD-884920194IN"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-7 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <span>Track Package</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Quick Demo Presets */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Quick Demo Orders:</span>
              <button
                type="button"
                onClick={() => loadPreset("SP-9482-DEL")}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors cursor-pointer"
              >
                SP-9482-DEL (Cricket Gear - In Transit)
              </button>
              <button
                type="button"
                onClick={() => loadPreset("SP-7821-MUM")}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors cursor-pointer"
              >
                SP-7821-MUM (Out for Delivery)
              </button>
              <button
                type="button"
                onClick={() => loadPreset("SP-5104-BLR")}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors cursor-pointer"
              >
                SP-5104-BLR (Delivered)
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start gap-3 mb-8">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Order lookup notice</p>
                <p className="mt-0.5 text-xs text-amber-700 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Tracking Result View */}
          {trackingResult && (
            <div className="space-y-6">
              {/* Order Status Banner */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-slate-400">ORDER NO:</span>
                      <span className="text-lg font-black text-slate-900">{trackingResult.orderId}</span>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          trackingResult.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : trackingResult.status === "Out for Delivery"
                            ? "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {trackingResult.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Carrier: <strong className="text-slate-700">{trackingResult.carrier}</strong> | AWB:{" "}
                      <span className="font-mono text-slate-700">{trackingResult.awbNumber}</span>
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200/60 text-right md:text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Estimated Delivery
                    </span>
                    <span className="text-base font-black text-slate-900 flex items-center justify-end gap-1.5 mt-0.5">
                      <Clock className="h-4 w-4 text-rose-600" />
                      {trackingResult.estimatedDelivery}
                    </span>
                  </div>
                </div>

                {/* Stepper Timeline */}
                <div className="py-8">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">
                    Live Progress Milestones
                  </h3>
                  <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-8 ml-3">
                    {trackingResult.milestones.map((step, idx) => (
                      <div key={idx} className="relative group">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-[31px] sm:-left-[39px] top-0 h-6 w-6 rounded-full flex items-center justify-center transition-all ${
                            step.completed
                              ? step.current
                                ? "bg-rose-600 text-white ring-4 ring-rose-100"
                                : "bg-emerald-500 text-white"
                              : "bg-slate-200 text-slate-400"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-slate-400" />
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h4
                            className={`text-sm font-bold ${
                              step.current ? "text-rose-600" : "text-slate-900"
                            }`}
                          >
                            {step.title}
                            {step.current && (
                              <span className="ml-2 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                                Current Status
                              </span>
                            )}
                          </h4>
                          <span className="text-xs text-slate-400 font-mono">{step.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          {step.location}
                        </p>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recipient & Package Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                  {/* Delivery Location */}
                  <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/60">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-700" />
                      Delivery Destination
                    </h4>
                    <p className="text-sm font-bold text-slate-900">{trackingResult.recipient}</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {trackingResult.deliveryAddress}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 font-mono">
                      Phone Contact: {trackingResult.phone}
                    </p>
                  </div>

                  {/* Shipment Package Contents */}
                  <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/60">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <Package className="h-3.5 w-3.5 text-slate-700" />
                      Package Contents ({trackingResult.items.length})
                    </h4>
                    <div className="space-y-3">
                      {trackingResult.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded-lg object-cover bg-white border border-slate-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                            <p className="text-[11px] text-slate-500">
                              {item.variant} • Qty: {item.quantity}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-slate-900">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Need assistance action bar */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500">
                    Issue with this delivery? Contact our 24/7 courier desk:
                  </span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-rose-600 font-bold hover:underline"
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                      Priority Concierge
                    </Link>
                    <span className="text-slate-300">•</span>
                    <Link
                      to="/return-policy"
                      className="inline-flex items-center gap-1.5 text-slate-600 font-semibold hover:text-slate-900"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Return Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Support Assurance */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
              <ShieldCheck className="h-6 w-6 text-emerald-600 mb-2" />
              <h4 className="text-sm font-bold text-slate-900">Tamper-Proof Hologram</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                All tournament cricket bats and electronics are sealed with serialised tamper strips.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
              <Truck className="h-6 w-6 text-rose-600 mb-2" />
              <h4 className="text-sm font-bold text-slate-900">Express Air Cargo</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Partnered with Blue Dart Apex &amp; Delhivery Priority for fast metropolitan transit.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
              <Clock className="h-6 w-6 text-blue-600 mb-2" />
              <h4 className="text-sm font-bold text-slate-900">OTP Handover</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Secured last-mile delivery requiring unique 4-digit mobile verification upon handover.
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80">
            <h3 className="text-lg font-black text-slate-900 mb-6">Frequently Asked Questions</h3>
            <div className="divide-y divide-slate-100">
              {faqs.map((faq, index) => {
                const isOpen = faqOpen === index;
                return (
                  <div key={index} className="py-4">
                    <button
                      type="button"
                      onClick={() => setFaqOpen(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left gap-4 font-bold text-sm text-slate-900 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform ${
                          isOpen ? "rotate-180 text-rose-600" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-1">{faq.a}</p>
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

export default TrackOrder;
