import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  Zap,
  MapPin,
  ShieldCheck,
  Search,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
  Info,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

interface PincodeEstimate {
  city: string;
  state: string;
  zone: "Metro Tier 1" | "Tier 2 Urban" | "Regional / Hill";
  standardTransit: string;
  expressTransit: string;
  sameDayAvailable: boolean;
  courier: string;
  codAvailable: boolean;
}

const pincodeDatabase: Record<string, PincodeEstimate> = {
  "110001": {
    city: "New Delhi",
    state: "Delhi NCR",
    zone: "Metro Tier 1",
    standardTransit: "2 business days",
    expressTransit: "Next day by 2 PM",
    sameDayAvailable: true,
    courier: "Blue Dart Apex Air",
    codAvailable: true,
  },
  "400001": {
    city: "Mumbai (Fort / South Mumbai)",
    state: "Maharashtra",
    zone: "Metro Tier 1",
    standardTransit: "1-2 business days",
    expressTransit: "Same-Day / Next Morning",
    sameDayAvailable: true,
    courier: "ShopPulse Local Fleet / Delhivery",
    codAvailable: true,
  },
  "560001": {
    city: "Bengaluru (MG Road / Central)",
    state: "Karnataka",
    zone: "Metro Tier 1",
    standardTransit: "2 business days",
    expressTransit: "Next day by 1 PM",
    sameDayAvailable: true,
    courier: "Blue Dart Express",
    codAvailable: true,
  },
  "600001": {
    city: "Chennai (George Town)",
    state: "Tamil Nadu",
    zone: "Metro Tier 1",
    standardTransit: "2-3 business days",
    expressTransit: "Next day by 6 PM",
    sameDayAvailable: false,
    courier: "Blue Dart Air",
    codAvailable: true,
  },
  "700001": {
    city: "Kolkata (BBD Bagh)",
    state: "West Bengal",
    zone: "Metro Tier 1",
    standardTransit: "2-3 business days",
    expressTransit: "Next day by 6 PM",
    sameDayAvailable: false,
    courier: "Delhivery Air",
    codAvailable: true,
  },
  "500001": {
    city: "Hyderabad (Abids)",
    state: "Telangana",
    zone: "Metro Tier 1",
    standardTransit: "2 business days",
    expressTransit: "Next day by 3 PM",
    sameDayAvailable: false,
    courier: "Blue Dart Apex",
    codAvailable: true,
  },
  "380001": {
    city: "Ahmedabad",
    state: "Gujarat",
    zone: "Tier 2 Urban",
    standardTransit: "2-3 business days",
    expressTransit: "1-2 business days",
    sameDayAvailable: false,
    courier: "Delhivery Surface Priority",
    codAvailable: true,
  },
  "141001": {
    city: "Ludhiana",
    state: "Punjab",
    zone: "Tier 2 Urban",
    standardTransit: "3 business days",
    expressTransit: "2 business days",
    sameDayAvailable: false,
    courier: "Blue Dart Surface",
    codAvailable: true,
  },
};

const ShippingPolicy: React.FC = () => {
  const [pincode, setPincode] = useState("400001");
  const [estimate, setEstimate] = useState<PincodeEstimate | null>(pincodeDatabase["400001"]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (cleanPin.length !== 6 || isNaN(Number(cleanPin))) {
      setErrorMsg("Please enter a valid 6-digit Indian Postal PIN Code.");
      setEstimate(null);
      return;
    }

    if (pincodeDatabase[cleanPin]) {
      setEstimate(pincodeDatabase[cleanPin]);
      setErrorMsg("");
    } else {
      // Fallback estimate for any other valid 6 digit pin
      setEstimate({
        city: "Regional Serviceable Area",
        state: "India (Zone 3)",
        zone: "Tier 2 Urban",
        standardTransit: "3-5 business days",
        expressTransit: "2-3 business days",
        sameDayAvailable: false,
        courier: "Delhivery / Blue Dart Network",
        codAvailable: true,
      });
      setErrorMsg("");
    }
  };

  const loadPin = (pin: string) => {
    setPincode(pin);
    setEstimate(pincodeDatabase[pin]);
    setErrorMsg("");
  };

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Shipping Rates &amp; Speed</span>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Truck className="h-3.5 w-3.5" />
              Pan-India Dispatch Network
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Fast, Protected &amp; Predictable Delivery
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              From match-ready English Willow bats to delicate audiophile wearables, every shipment is packaged in tamper-resistant, drop-tested containers.
            </p>
          </div>

          {/* Pincode Estimator Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-12">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-rose-600" />
              <h2 className="text-lg font-black text-slate-900">Check Delivery Speed for Your Pincode</h2>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Calculate exact delivery windows and courier availability across 19,000+ PIN codes.
            </p>

            <form onSubmit={handleEstimate} className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode (e.g. 560001)"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer flex-shrink-0"
              >
                Estimate Speed
              </button>
            </form>

            {/* Presets */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Quick select:</span>
              {["110001 (Delhi)", "400001 (Mumbai)", "560001 (Bengaluru)", "600001 (Chennai)", "700001 (Kolkata)"].map(
                (item) => {
                  const pin = item.split(" ")[0];
                  return (
                    <button
                      key={pin}
                      type="button"
                      onClick={() => loadPin(pin)}
                      className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  );
                }
              )}
            </div>

            {errorMsg && (
              <p className="mt-4 text-xs font-semibold text-rose-600">{errorMsg}</p>
            )}

            {estimate && (
              <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    City &amp; Region
                  </span>
                  <span className="text-sm font-black text-slate-900 block mt-0.5">
                    {estimate.city}
                  </span>
                  <span className="text-xs text-slate-500">{estimate.state}</span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    Standard Ground
                  </span>
                  <span className="text-sm font-black text-emerald-600 block mt-0.5">
                    {estimate.standardTransit}
                  </span>
                  <span className="text-[11px] text-slate-500">Free over ₹999</span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    Pulse Air Express
                  </span>
                  <span className="text-sm font-black text-rose-600 block mt-0.5">
                    {estimate.expressTransit}
                  </span>
                  <span className="text-[11px] text-slate-500">Flat ₹149 priority</span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    Same-Day Delivery
                  </span>
                  <span
                    className={`text-sm font-black block mt-0.5 ${
                      estimate.sameDayAvailable ? "text-emerald-600" : "text-slate-400"
                    }`}
                  >
                    {estimate.sameDayAvailable ? "Available (Order < 11 AM)" : "Not in zone"}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    COD: {estimate.codAvailable ? "Supported" : "Unavailable"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Shipping Tiers Comparison Table */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 mb-12 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-4">Shipping Methods &amp; Tariffs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Standard */}
              <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    ECONOMY GROUND
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                    MOST POPULAR
                  </span>
                </div>
                <h4 className="text-xl font-black text-slate-900">Standard Delivery</h4>
                <div className="mt-2 text-2xl font-black text-slate-900">
                  FREE <span className="text-xs font-normal text-slate-500">on orders &gt; ₹999</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 mb-4">₹79 flat fee for orders under ₹999.</p>

                <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>3 to 5 business days across India</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>Surface priority network via Delhivery &amp; Bluedart</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>OTP delivery authentication</span>
                  </li>
                </ul>
              </div>

              {/* Express */}
              <div className="p-5 rounded-xl border-2 border-rose-500/80 bg-rose-50/20 relative shadow-sm">
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  FASTEST AIR
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    AIR FREIGHT
                  </span>
                </div>
                <h4 className="text-xl font-black text-slate-900">Pulse Express Air</h4>
                <div className="mt-2 text-2xl font-black text-slate-900">
                  ₹149 <span className="text-xs font-normal text-slate-500">flat rate</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Priority overnight air cargo dispatch.
                </p>

                <ul className="space-y-2 text-xs text-slate-600 border-t border-rose-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-rose-600 flex-shrink-0" />
                    <span>1 to 2 business days in major metros</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-rose-600 flex-shrink-0" />
                    <span>Flown via Blue Dart Apex Dedicated Air Freighter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-rose-600 flex-shrink-0" />
                    <span>Guaranteed morning or early afternoon delivery</span>
                  </li>
                </ul>
              </div>

              {/* Same Day */}
              <div className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    METRO SAME-DAY
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    SELECT CITIES
                  </span>
                </div>
                <h4 className="text-xl font-black text-slate-900">Same-Day Courier</h4>
                <div className="mt-2 text-2xl font-black text-slate-900">
                  ₹249 <span className="text-xs font-normal text-slate-500">per order</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Order before 11:00 AM on weekdays.
                </p>

                <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-900 flex-shrink-0" />
                    <span>Delivered same evening between 5 PM - 9 PM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-900 flex-shrink-0" />
                    <span>Active in Mumbai, Delhi NCR &amp; Bengaluru</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-900 flex-shrink-0" />
                    <span>Direct point-to-point dedicated courier</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Heavy Equipment & Cricket Bat Packaging Guarantee */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 mb-12">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Specialized Sporting Gear Packaging Standard
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <Package className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Crush-Proof Cylinder Tubes</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  All Grade 1 English Willow bats travel inside 5mm reinforced cardboard tubes with dual foam end-caps to safeguard splice integrity.
                </p>
              </div>

              <div className="space-y-2">
                <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <Layers className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Moisture-Proof Vacuum Sealing</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Willow wood and breathable apparel are sealed in vapor-barrier polybags to prevent monsoon humidity absorption during transit.
                </p>
              </div>

              <div className="space-y-2">
                <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <Zap className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Live GPS Van Dispatch</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Receive live SMS updates with the courier driver's contact and estimated arrival window right when the package is out for delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Need help footer card */}
          <div className="bg-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-slate-600 flex-shrink-0" />
              <p className="text-xs text-slate-600">
                Already placed an order? Track its exact waypoint coordinates now.
              </p>
            </div>
            <Link
              to="/track-order"
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex-shrink-0"
            >
              <span>Track Active Shipment</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicy;
