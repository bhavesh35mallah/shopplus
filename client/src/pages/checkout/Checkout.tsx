import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  ArrowRight,
  ChevronRight,
  Package,
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import { useCart } from "../../context/CartContext";
import { dynamicStore, type StoredOrder } from "../../utils/dynamicStore";

type PaymentMethodType = "upi" | "card" | "netbanking" | "cod";

interface AddressFormData {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

const Checkout: React.FC = () => {
  const { cart, subtotal, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  // Step state (1: Address, 2: Shipping, 3: Payment)
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // Address Form State
  const [address, setAddress] = useState<AddressFormData>({
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "98201 44820",
    street: "Flat 802, Windsor Grande, Link Road, Andheri West",
    landmark: "Opposite Infinity Mall",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400053",
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express" | "sameday">("standard");

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("upi");
  const [upiId, setUpiId] = useState("aarav@okhdfcbank");
  const [selectedUpiApp, setSelectedUpiApp] = useState("gpay");

  // Card Form
  const [cardData, setCardData] = useState({
    number: "4111 •••• •••• 9820",
    name: "AARAV SHARMA",
    expiry: "09/28",
    cvv: "•••",
  });

  // Netbanking
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  // Processing loader
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("");

  // Presets for quick evaluation
  const fillPreset = (city: "Delhi" | "Mumbai" | "Bengaluru") => {
    if (city === "Delhi") {
      setAddress({
        fullName: "Rohit Dhawan",
        email: "rohit.dhawan@example.com",
        phone: "98112 34567",
        street: "B-42, Vasant Vihar, Poorvi Marg",
        landmark: "Near Priya Cinema",
        city: "New Delhi",
        state: "Delhi NCR",
        pincode: "110057",
      });
    } else if (city === "Mumbai") {
      setAddress({
        fullName: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        phone: "98201 44820",
        street: "Flat 802, Windsor Grande, Link Road, Andheri West",
        landmark: "Opposite Infinity Mall",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400053",
      });
    } else {
      setAddress({
        fullName: "Karthik Nair",
        email: "karthik.nair@example.com",
        phone: "99001 88219",
        street: "742, 12th Main Road, HAL 2nd Stage, Indiranagar",
        landmark: "Near Metro Station",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038",
      });
    }
  };

  // Shipping costs
  let shippingCost = 0;
  if (shippingMethod === "standard") {
    shippingCost = subtotal >= 999 ? 0 : 99;
  } else if (shippingMethod === "express") {
    shippingCost = 149;
  } else if (shippingMethod === "sameday") {
    shippingCost = 249;
  }

  const codFee = paymentMethod === "cod" ? 49 : 0;
  const finalPayable = subtotal + shippingCost + codFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessingStatus("Connecting to 256-Bit Banking Gateway...");

    setTimeout(() => {
      setProcessingStatus("Authorizing Payment Token...");
    }, 700);

    setTimeout(() => {
      setProcessingStatus("Generating Order Receipt & Inventory Hold...");
    }, 1400);

    setTimeout(() => {
      const orderId = `SP-${Math.floor(1000 + Math.random() * 9000)}-${address.city.slice(0, 3).toUpperCase()}`;

      // Save order snapshot
      const orderPayload = {
        orderId,
        items: [...cart],
        subtotal,
        shippingCost,
        codFee,
        finalPayable,
        address,
        paymentMethod,
        shippingMethod,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };

      try {
        sessionStorage.setItem("last_pulse_order", JSON.stringify(orderPayload));

        const dynamicOrder: StoredOrder = {
          id: orderId,
          orderNumber: orderId,
          customerName: address.fullName,
          customerEmail: address.email,
          destination: `${address.street}, ${address.city} (${address.pincode})`,
          itemsCount: cart.reduce((s, i) => s + i.quantity, 0),
          total: finalPayable,
          status: "processing",
          paymentMethod: paymentMethod.toUpperCase(),
          date: "Today, Just now",
          city: address.city,
          carrier: "BlueDart Express",
          trackingNumber: `BLUEDART-${Math.floor(100000 + Math.random() * 900000)}-EXP`,
          items: cart.map((i) => ({
            name: i.product.name,
            image: i.product.images?.[0] || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80",
            price: i.product.price,
            qty: i.quantity,
          })),
          steps: [
            { label: "Order Placed", completed: true, date: "Just now" },
            { label: "Oiled & Quality Checked", completed: false, date: "Expected in 2 hours" },
            { label: "Dispatched from Hub", completed: false, date: "Tomorrow morning" },
            { label: "Delivered", completed: false, date: "Estimated 2 days" },
          ],
        };
        dynamicStore.addOrder(dynamicOrder);
      } catch (err) {
        console.error("Storage error", err);
      }

      clearCart();
      setIsProcessing(false);
      navigate("/order-success", { state: orderPayload });
    }, 2100);
  };

  if (cart.length === 0 && !isProcessing) {
    return (
      <Layout>
        <div className="bg-slate-50/50 min-h-screen py-16 text-center">
          <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900">Your bag is empty</h2>
            <p className="text-xs text-slate-500 mt-2">
              Please add items to your shopping bag before proceeding to checkout.
            </p>
            <Link
              to="/shop"
              className="inline-block mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-rose-600 transition-colors">Shopping Bag</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Checkout &amp; Payment</span>
          </nav>

          {/* Stepper Header */}
          <div className="mb-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Lock className="h-3.5 w-3.5" />
              256-Bit SSL Encrypted Checkout
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Fast, Secure Checkout
            </h1>

            {/* Stepper pills */}
            <div className="flex items-center gap-2 sm:gap-4 mt-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeStep === 1
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                <span className="h-4 w-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center">
                  1
                </span>
                <span>Shipping Address</span>
              </button>

              <ChevronRight className="h-3 w-3 text-slate-300" />

              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeStep === 2
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                <span className="h-4 w-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center">
                  2
                </span>
                <span>Dispatch Mode</span>
              </button>

              <ChevronRight className="h-3 w-3 text-slate-300" />

              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeStep === 3
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                <span className="h-4 w-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center">
                  3
                </span>
                <span>Payment &amp; Pay</span>
              </button>
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Multi-Step Forms */}
            <div className="lg:col-span-8 space-y-6">
              {/* STEP 1: Shipping Address */}
              <div
                className={`bg-white rounded-3xl border transition-all ${
                  activeStep === 1
                    ? "border-slate-900 shadow-sm p-6 sm:p-8"
                    : "border-slate-200/80 p-6 opacity-95"
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <h2 className="text-base font-black text-slate-900">Delivery Address &amp; Contact</h2>
                      <p className="text-xs text-slate-500">Where should we deliver your tournament gear?</p>
                    </div>
                  </div>

                  {activeStep !== 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Edit Address
                    </button>
                  )}
                </div>

                {activeStep === 1 ? (
                  <div className="space-y-4">
                    {/* Demo Presets Bar */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                      <span className="font-bold text-slate-700">Quick autofill demo:</span>
                      <button
                        type="button"
                        onClick={() => fillPreset("Mumbai")}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-[11px] font-medium hover:bg-slate-100 cursor-pointer"
                      >
                        Mumbai (Andheri)
                      </button>
                      <button
                        type="button"
                        onClick={() => fillPreset("Delhi")}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-[11px] font-medium hover:bg-slate-100 cursor-pointer"
                      >
                        Delhi NCR (Vasant Vihar)
                      </button>
                      <button
                        type="button"
                        onClick={() => fillPreset("Bengaluru")}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-[11px] font-medium hover:bg-slate-100 cursor-pointer"
                      >
                        Bengaluru (Indiranagar)
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={address.fullName}
                          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                          placeholder="e.g. Aarav Sharma"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          Mobile Number (For Delivery OTP) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={address.phone}
                          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          Email Address (Invoice &amp; Live Tracking) *
                        </label>
                        <input
                          type="email"
                          required
                          value={address.email}
                          onChange={(e) => setAddress({ ...address, email: e.target.value })}
                          placeholder="aarav@domain.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          Flat, Building &amp; Street Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={address.street}
                          onChange={(e) => setAddress({ ...address, street: e.target.value })}
                          placeholder="e.g. Flat 802, Tower 4, Windsor Grande"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          value={address.landmark}
                          onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                          placeholder="Near metro / mall"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          6-Digit PIN Code *
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          value={address.pincode}
                          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                          placeholder="e.g. 400053"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          placeholder="Mumbai"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={address.state}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                          placeholder="Maharashtra"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer shadow-2xs"
                      >
                        <span>Continue to Dispatch Mode</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Summary view of address */
                  <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl">
                    <p className="font-bold text-slate-900">{address.fullName} • {address.phone}</p>
                    <p className="mt-0.5">{address.street}, {address.landmark ? `${address.landmark}, ` : ""}{address.city}, {address.state} - {address.pincode}</p>
                  </div>
                )}
              </div>

              {/* STEP 2: Dispatch Speed Selection */}
              <div
                className={`bg-white rounded-3xl border transition-all ${
                  activeStep === 2
                    ? "border-slate-900 shadow-sm p-6 sm:p-8"
                    : "border-slate-200/80 p-6 opacity-95"
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <h2 className="text-base font-black text-slate-900">Select Dispatch Mode</h2>
                      <p className="text-xs text-slate-500">Tamper-proof cylinder packaging on all options.</p>
                    </div>
                  </div>

                  {activeStep !== 2 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Change Method
                    </button>
                  )}
                </div>

                {activeStep === 2 ? (
                  <div className="space-y-3">
                    {/* Standard */}
                    <label
                      onClick={() => setShippingMethod("standard")}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        shippingMethod === "standard"
                          ? "border-slate-900 bg-slate-50/80 ring-2 ring-slate-900/10"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === "standard"}
                          onChange={() => setShippingMethod("standard")}
                          className="h-4 w-4 text-slate-900 focus:ring-slate-900"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              Standard Ground Freight
                            </span>
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                              2-4 Days
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Partnered with Delhivery Surface Priority across India.
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {subtotal >= 999 ? "FREE" : "₹99"}
                      </span>
                    </label>

                    {/* Express Air */}
                    <label
                      onClick={() => setShippingMethod("express")}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        shippingMethod === "express"
                          ? "border-rose-600 bg-rose-50/20 ring-2 ring-rose-500/20"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === "express"}
                          onChange={() => setShippingMethod("express")}
                          className="h-4 w-4 text-rose-600 focus:ring-rose-500"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              Pulse Express Air Cargo
                            </span>
                            <span className="text-[10px] font-extrabold bg-rose-100 text-rose-700 px-2 py-0.5 rounded">
                              1-2 Days (Priority)
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Flown via Blue Dart Apex Dedicated Air Freighter.
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-rose-600">₹149</span>
                    </label>

                    {/* Same Day */}
                    <label
                      onClick={() => setShippingMethod("sameday")}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        shippingMethod === "sameday"
                          ? "border-slate-900 bg-slate-50/80 ring-2 ring-slate-900/10"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === "sameday"}
                          onChange={() => setShippingMethod("sameday")}
                          className="h-4 w-4 text-slate-900 focus:ring-slate-900"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              Metro Dedicated Same-Day Courier
                            </span>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                              Evening by 9 PM
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Direct point-to-point courier (Active in Mumbai, Delhi NCR, Bangalore).
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-900">₹249</span>
                    </label>

                    <div className="pt-4 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setActiveStep(1)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                      >
                        ← Back to Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveStep(3)}
                        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer shadow-2xs"
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 uppercase">
                        {shippingMethod === "standard"
                          ? "Standard Ground Delivery (2-4 Days)"
                          : shippingMethod === "express"
                          ? "Pulse Express Air Cargo (1-2 Days)"
                          : "Same-Day Courier Delivery"}
                      </span>
                    </div>
                    <span className="font-black text-slate-900">₹{shippingCost}</span>
                  </div>
                )}
              </div>

              {/* STEP 3: Payment Method & Gateway Selection */}
              <div
                className={`bg-white rounded-3xl border transition-all ${
                  activeStep === 3
                    ? "border-slate-900 shadow-sm p-6 sm:p-8"
                    : "border-slate-200/80 p-6 opacity-95"
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                      3
                    </div>
                    <div>
                      <h2 className="text-base font-black text-slate-900">Payment Gateway Selection</h2>
                      <p className="text-xs text-slate-500">PCI-DSS Level 1 tokenized transaction.</p>
                    </div>
                  </div>
                </div>

                {activeStep === 3 && (
                  <div className="space-y-6">
                    {/* Method Selector Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                        className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                          paymentMethod === "upi"
                            ? "border-slate-900 bg-slate-900 text-white shadow-2xs"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <QrCode className="h-5 w-5" />
                        <span>Instant UPI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                          paymentMethod === "card"
                            ? "border-slate-900 bg-slate-900 text-white shadow-2xs"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <CreditCard className="h-5 w-5" />
                        <span>Cards</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("netbanking")}
                        className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                          paymentMethod === "netbanking"
                            ? "border-slate-900 bg-slate-900 text-white shadow-2xs"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <Building className="h-5 w-5" />
                        <span>Net Banking</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                          paymentMethod === "cod"
                            ? "border-slate-900 bg-slate-900 text-white shadow-2xs"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <Banknote className="h-5 w-5" />
                        <span>Cash On Delivery</span>
                      </button>
                    </div>

                    {/* UPI Screen */}
                    {paymentMethod === "upi" && (
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            Select UPI App
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Fastest Verification
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: "gpay", label: "Google Pay" },
                            { id: "phonepe", label: "PhonePe" },
                            { id: "paytm", label: "Paytm" },
                            { id: "cred", label: "CRED UPI" },
                          ].map((app) => (
                            <button
                              key={app.id}
                              type="button"
                              onClick={() => setSelectedUpiApp(app.id)}
                              className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                                selectedUpiApp === app.id
                                  ? "border-rose-600 bg-white text-rose-600 ring-2 ring-rose-500/20"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              {app.label}
                            </button>
                          ))}
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Or Enter UPI ID / VPA
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@okhdfcbank or mobile@paytm"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:border-slate-900 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Card Screen */}
                    {paymentMethod === "card" && (
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                        {/* Interactive Dark Card Graphic */}
                        <div className="h-44 w-full sm:w-80 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-rose-950 p-5 text-white flex flex-col justify-between shadow-xl mx-auto sm:mx-0">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-xs text-rose-400 font-bold uppercase tracking-widest">
                              SHOPPULSE PLATINUM
                            </span>
                            <span className="font-black text-sm">VISA</span>
                          </div>
                          <div className="font-mono text-base tracking-widest text-slate-200">
                            {cardData.number}
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                            <div>
                              <span>CARDHOLDER</span>
                              <div className="text-white font-bold">{cardData.name}</div>
                            </div>
                            <div>
                              <span>EXPIRES</span>
                              <div className="text-white font-bold">{cardData.expiry}</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="sm:col-span-2">
                            <label className="text-xs font-bold text-slate-700 block mb-1">
                              Card Number *
                            </label>
                            <input
                              type="text"
                              value={cardData.number}
                              onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                              placeholder="4111 2222 3333 4444"
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 focus:border-slate-900 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-700 block mb-1">
                              Name on Card *
                            </label>
                            <input
                              type="text"
                              value={cardData.name}
                              onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                              placeholder="Aarav Sharma"
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs font-bold text-slate-700 block mb-1">
                                Expiry (MM/YY) *
                              </label>
                              <input
                                type="text"
                                value={cardData.expiry}
                                onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                                placeholder="09/28"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 focus:border-slate-900 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-slate-700 block mb-1">
                                CVV *
                              </label>
                              <input
                                type="password"
                                maxLength={3}
                                value={cardData.cvv}
                                onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                                placeholder="123"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 focus:border-slate-900 focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Netbanking */}
                    {paymentMethod === "netbanking" && (
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Select Authorized Bank
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                        >
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="State Bank of India">State Bank of India (SBI)</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}

                    {/* Cash on Delivery */}
                    {paymentMethod === "cod" && (
                      <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 space-y-2 text-xs text-amber-900">
                        <span className="font-bold block text-sm">Cash on Delivery Conditions:</span>
                        <p>
                          A convenience handling charge of <strong>₹49</strong> is applied for cash collection.
                        </p>
                        <p>
                          An automated OTP verification will be sent to <strong>{address.phone}</strong> before dispatch. Please keep exact cash ready during delivery.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="text-base font-black text-slate-900">Order Items ({totalItems})</h3>
                  <Link to="/cart" className="text-xs font-bold text-rose-600 hover:underline">
                    Edit Bag
                  </Link>
                </div>

                {/* Items Mini-list */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.product.images?.[0]}
                        alt={item.product.name}
                        className="h-12 w-12 rounded-xl object-cover border border-slate-100 bg-slate-50 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                        <p className="text-[11px] text-slate-500">Qty: {item.quantity} {item.size ? `• Size: ${item.size}` : ""}</p>
                      </div>
                      <span className="font-bold text-slate-900">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="space-y-2.5 text-xs pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-slate-900">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Shipping Charges</span>
                    <span>
                      {shippingCost === 0 ? (
                        <strong className="text-emerald-600 font-bold uppercase">FREE</strong>
                      ) : (
                        `₹${shippingCost}`
                      )}
                    </span>
                  </div>

                  {codFee > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>COD Handling Fee</span>
                      <span className="font-bold text-slate-900">₹{codFee}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Total Due</span>
                    <span className="text-2xl font-black text-rose-600">
                      ₹{finalPayable.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Final Place Order Button */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 hover:from-slate-800 hover:to-slate-900 text-white py-4 text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-xl cursor-pointer disabled:opacity-50"
                >
                  <Lock className="h-4 w-4 text-emerald-400" />
                  <span>
                    {isProcessing ? "Processing Secure Order..." : `Pay & Place Order (₹${finalPayable.toLocaleString("en-IN")})`}
                  </span>
                </button>

                {isProcessing && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-slate-900 border-t-transparent" />
                    <p className="text-xs font-mono text-slate-600">{processingStatus}</p>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Bank-Grade 256-Bit TLS Security Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
