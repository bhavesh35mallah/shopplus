import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  Calendar,
  Search,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

interface StoreLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  pincode: string;
  phone: string;
  hours: string;
  features: string[];
  hasBatWorkshop: boolean;
  hasBattingNet: boolean;
}

const storesData: StoreLocation[] = [
  {
    id: "mum-01",
    city: "Mumbai",
    name: "ShopPulse Flagship Experience Center & Batting Lab",
    address: "Plot 18, Linking Road, Near Khar Telephone Exchange, Bandra West, Mumbai",
    pincode: "400052",
    phone: "+91 22 2648 8900",
    hours: "Mon - Sun: 10:30 AM - 9:30 PM",
    features: [
      "15,000-Stroke Automated Bat Knocking",
      "Indoor High-Speed Camera Batting Net",
      "StrideX Custom Spike Fitting Hub",
      "Click & Collect Express Locker",
    ],
    hasBatWorkshop: true,
    hasBattingNet: true,
  },
  {
    id: "del-01",
    city: "Delhi NCR",
    name: "ShopPulse DLF CyberHub Arena",
    address: "Ground Floor, Building 10-C, DLF Cyber City, Gurugram, Haryana",
    pincode: "122002",
    phone: "+91 124 492 7800",
    hours: "Mon - Sun: 11:00 AM - 10:00 PM",
    features: [
      "Willow Grain Consultation Desk",
      "AuraTech Audiophile Listening Lounge",
      "Streetwear Capsule Display",
      "Same-Day Courier Pickup Hub",
    ],
    hasBatWorkshop: true,
    hasBattingNet: false,
  },
  {
    id: "blr-01",
    city: "Bengaluru",
    name: "ShopPulse Indiranagar 100ft Studio",
    address: "742, 100 Feet Road, Near Domlur Flyover, Indiranagar, Bengaluru",
    pincode: "560038",
    phone: "+91 80 4120 6300",
    hours: "Mon - Sun: 10:30 AM - 9:30 PM",
    features: [
      "Computerized Bat Rebound Tuning",
      "Indoor Cricket Net with Bowling Machine",
      "Custom Laser Engraving on Splice",
      "VIP Member Fitting Lounge",
    ],
    hasBatWorkshop: true,
    hasBattingNet: true,
  },
  {
    id: "hyd-01",
    city: "Hyderabad",
    name: "ShopPulse Jubilee Hills Experience Hub",
    address: "Road No. 36, Near Peddamma Temple Metro, Jubilee Hills, Hyderabad",
    pincode: "500033",
    phone: "+91 40 2355 4100",
    hours: "Mon - Sun: 11:00 AM - 9:30 PM",
    features: [
      "Tournament Kit Customization",
      "Fast-Track Sizing Returns Desk",
      "Athletic Footwear Treadmill Testing",
    ],
    hasBatWorkshop: false,
    hasBattingNet: false,
  },
];

const StoreLocator: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingStoreId, setBookingStoreId] = useState("mum-01");
  const [bookingService, setBookingService] = useState("knocking");
  const [bookingDate, setBookingDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const filteredStores = storesData.filter((store) => {
    const matchesCity = selectedCity === "All" || store.city === selectedCity;
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.pincode.includes(searchQuery);
    return matchesCity && matchesSearch;
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Store Locator</span>
          </nav>

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="h-3.5 w-3.5" />
              Flagship Experience Centers
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Test In Real Nets. Knock With Masters.
            </h1>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Step inside our destination stores in Mumbai, Delhi NCR, and Bengaluru. Test English Willow bats against real seam bowling machines before purchasing and get factory-level automated knocking in under an hour.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* City Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {["All", "Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad"].map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedCity === city
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search locality or pincode..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Stores List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 block">
                        {store.city} FLAGSHIP
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-0.5">{store.name}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed flex items-start gap-1.5">
                    <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>{store.address} - PIN {store.pincode}</span>
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-slate-500">
                    <p className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{store.hours}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-semibold text-slate-700">{store.phone}</span>
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Store Facilities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {store.features.map((f, i) => (
                        <span
                          key={i}
                          className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-700"
                        >
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      store.name + " " + store.address
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-rose-600 transition-colors"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    <span>Get Directions</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setBookingStoreId(store.id);
                      window.scrollTo({
                        top: document.getElementById("booking-section")?.offsetTop || 800,
                        behavior: "smooth",
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-2xs"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Booking Section */}
          <div
            id="booking-section"
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-16"
          >
            {bookingConfirmed ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">VIP Store Session Reserved!</h3>
                <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                  Your appointment for <strong>{bookingService === "knocking" ? "Automated Bat Knocking" : "Net Testing & Fitment"}</strong> is confirmed for <strong>{bookingDate}</strong>. An SMS confirmation pass with barcode has been dispatched.
                </p>
                <button
                  type="button"
                  onClick={() => setBookingConfirmed(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    COMPLIMENTARY VIP SERVICE
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-1">
                    Book an In-Store Bat Knocking or Batting Net Slot
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Avoid weekend queues. Reserve a dedicated 45-minute craftsman consultation.
                  </p>
                </div>

                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Select Store *
                      </label>
                      <select
                        value={bookingStoreId}
                        onChange={(e) => setBookingStoreId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      >
                        {storesData.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.city} - {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Experience Service *
                      </label>
                      <select
                        value={bookingService}
                        onChange={(e) => setBookingService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      >
                        <option value="knocking">15,000-Stroke Machine Bat Knocking</option>
                        <option value="batting_net">Batting Net Session (Bowling Machine)</option>
                        <option value="fitting">Custom Spike Plate &amp; Footwear Fitting</option>
                        <option value="streetwear">Streetwear Styling Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-7 py-3 rounded-xl transition-all cursor-pointer shadow-2xs mt-2"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Confirm Free Store Reservation</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StoreLocator;
