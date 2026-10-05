import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  MapPin,
  ShieldCheck,
  Award,
  Plus,
  Trash2,
  Download,
  CheckCircle,
  Truck,
  X,
  Lock,
  Sparkles,
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
import { useDynamicStore, dynamicStore, type StoredAddress, type StoredWarranty } from "../../utils/dynamicStore";

interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  trackingNumber: string;
  carrier: string;
  total: number;
  items: {
    name: string;
    image: string;
    price: number;
    qty: number;
  }[];
  steps: {
    label: string;
    completed: boolean;
    date: string;
  }[];
}

interface SavedAddress {
  id: string;
  tag: string;
  fullName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault: boolean;
}

interface EquipmentWarranty {
  id: string;
  productName: string;
  serialNumber: string;
  purchaseDate: string;
  expiryDate: string;
  status: "active" | "expired";
  category: string;
}

export const UserDashboard: React.FC = () => {
  const { user, setDemoRole } = useAuth();
  const store = useDynamicStore();

  const [activeTab, setActiveTab] = useState<
    "orders" | "addresses" | "warranties" | "rewards" | "security"
  >("orders");

  // Dynamic Store Sync
  const orders: CustomerOrder[] = store.orders.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    date: o.date,
    status: o.status === "cancelled" ? "cancelled" : o.status === "delivered" ? "delivered" : o.status === "shipped" ? "shipped" : "processing",
    trackingNumber: o.trackingNumber || "BLUEDART-88210-EXP",
    carrier: o.carrier || "BlueDart Express",
    total: o.total,
    items: o.items || [
      {
        name: "Tournament Equipment Package",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80",
        price: o.total,
        qty: o.itemsCount || 1,
      },
    ],
    steps: o.steps || [
      { label: "Order Placed", completed: true, date: o.date },
      { label: "Oiled & Knocked In", completed: true, date: "11:30 AM" },
      { label: "Dispatched from Mumbai Hub", completed: o.status === "shipped" || o.status === "delivered", date: "Expected 4:00 PM" },
      { label: "Delivered", completed: o.status === "delivered", date: "Tomorrow" },
    ],
  }));

  const addresses: SavedAddress[] = store.addresses;
  const warranties: EquipmentWarranty[] = store.warranties;
  const [rewardPoints, setRewardPoints] = useState(2450);

  // Notifications
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Modals
  const [trackingOrder, setTrackingOrder] = useState<CustomerOrder | null>(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [isRegisterWarrantyOpen, setIsRegisterWarrantyOpen] = useState(false);

  // Address Form
  const [addressForm, setAddressForm] = useState({
    tag: "Home",
    fullName: user ? `${user.firstName} ${user.lastName || ""}` : "Alex Morgan",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    isDefault: false,
  });

  // Warranty Form
  const [warrantyForm, setWarrantyForm] = useState({
    productName: "",
    serialNumber: "",
    category: "cricket",
  });

  // Profile Form
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || "Alex",
    lastName: user?.lastName || "Morgan",
    email: user?.email || "customer@shoppulse.com",
    phone: user?.phone || "+1 (555) 492-9102",
  });

  // Handle Add Address
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.street || !addressForm.city || !addressForm.zip) {
      alert("Please fill in required address fields");
      return;
    }

    const created: StoredAddress = {
      id: `addr-${Date.now()}`,
      tag: addressForm.tag,
      fullName: addressForm.fullName,
      street: addressForm.street,
      apartment: addressForm.apartment,
      city: addressForm.city,
      state: addressForm.state,
      zip: addressForm.zip,
      phone: addressForm.phone,
      isDefault: addressForm.isDefault,
    };

    dynamicStore.addAddress(created);
    setIsAddAddressOpen(false);
    setAddressForm({
      tag: "Home",
      fullName: user ? `${user.firstName} ${user.lastName || ""}` : "Alex Morgan",
      street: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      isDefault: false,
    });
    showToast("New delivery address saved!");
  };

  // Set Default Address
  const handleSetDefaultAddress = (id: string) => {
    dynamicStore.setDefaultAddress(id);
    showToast("Default delivery address updated.");
  };

  // Delete Address
  const handleDeleteAddress = (id: string) => {
    dynamicStore.deleteAddress(id);
    showToast("Address removed.");
  };

  // Register New Warranty
  const handleRegisterWarranty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!warrantyForm.productName || !warrantyForm.serialNumber) return;

    const newW: StoredWarranty = {
      id: `w-${Date.now()}`,
      productName: warrantyForm.productName,
      serialNumber: warrantyForm.serialNumber,
      purchaseDate: "Today",
      expiryDate: "6 Months from Today (Willow Guard)",
      status: "active",
      category: warrantyForm.category,
    };

    dynamicStore.addWarranty(newW);
    setIsRegisterWarrantyOpen(false);
    setWarrantyForm({ productName: "", serialNumber: "", category: "cricket" });
    showToast("Equipment warranty certificate registered successfully!");
  };

  // Redeem Reward Voucher
  const handleRedeemVoucher = (ptsCost: number, voucherName: string) => {
    if (rewardPoints < ptsCost) {
      alert("Insufficient Pulse reward points");
      return;
    }
    setRewardPoints(rewardPoints - ptsCost);
    showToast(`Claimed ${voucherName}! Promo code copied to clipboard.`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
        {/* Toast */}
        {toast && (
          <div className="fixed top-20 right-6 z-50 flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl animate-bounce">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <span>{toast}</span>
          </div>
        )}

        {/* User VIP Profile Header */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-slate-900 to-rose-600 text-2xl font-black text-white shadow-xl shadow-slate-900/10">
                  {user?.firstName?.charAt(0).toUpperCase() || "A"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black tracking-tight text-slate-900">
                      {user?.firstName || "Alex"} {user?.lastName || "Morgan"}
                    </h1>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-200">
                      <Award className="h-3.5 w-3.5 text-amber-600" />
                      Pulse Gold VIP
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {user?.email || "customer@shoppulse.com"} • Member since 2025
                  </p>
                </div>
              </div>

              {/* VIP Points Pill & Role Switcher */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 rounded-2xl bg-amber-50/80 px-4 py-2 border border-amber-200/80">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                      Pulse Reward Points
                    </span>
                    <p className="text-lg font-black text-amber-900">{rewardPoints} Pts</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("rewards")}
                    className="rounded-xl bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950 hover:bg-amber-400"
                  >
                    Redeem
                  </button>
                </div>

                <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
                  <span className="px-2 font-semibold text-slate-500">View:</span>
                  <Link
                    to="/admin"
                    onClick={() => setDemoRole("admin")}
                    className="rounded-lg px-2.5 py-1 font-bold text-slate-600 hover:text-slate-900 hover:bg-white"
                  >
                    Admin
                  </Link>
                  <Link
                    to="/vendor"
                    onClick={() => setDemoRole("vendor")}
                    className="rounded-lg px-2.5 py-1 font-bold text-slate-600 hover:text-slate-900 hover:bg-white"
                  >
                    Vendor
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDemoRole("customer")}
                    className={`rounded-lg px-2.5 py-1 font-bold transition-colors ${
                      user?.role === "customer"
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    User
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-6 flex space-x-2 overflow-x-auto border-t border-slate-100 pt-3 scrollbar-none">
              {[
                { id: "orders", label: `My Orders (${orders.length})`, icon: Package },
                { id: "addresses", label: `Saved Addresses (${addresses.length})`, icon: MapPin },
                {
                  id: "warranties",
                  label: `Gear Warranties (${warranties.length})`,
                  icon: ShieldCheck,
                },
                { id: "rewards", label: "VIP Club Rewards", icon: Award },
                { id: "security", label: "Account & Security", icon: Lock },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          {/* TAB 1: MY ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Purchase History &amp; Live Tracking</h2>
                  <p className="text-xs text-slate-500">Track shipments, download invoices, or initiate returns</p>
                </div>
                <Link
                  to="/shop"
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 shadow-sm"
                >
                  Explore Catalog &rarr;
                </Link>
              </div>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                  >
                    {/* Header */}
                    <div className="flex flex-col gap-2 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-900 text-sm">
                          {ord.orderNumber}
                        </span>
                        <span className="text-xs text-slate-400">• {ord.date}</span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                            ord.status === "delivered"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : ord.status === "shipped"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setTrackingOrder(ord)}
                          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-500"
                        >
                          <Truck className="h-4 w-4" />
                          <span>Track Package</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast(`Invoice ${ord.orderNumber}.pdf downloaded.`)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                        >
                          <Download className="h-4 w-4" />
                          <span>Invoice</span>
                        </button>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mt-4 space-y-3">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-12 w-12 rounded-xl object-cover bg-slate-100 border border-slate-200"
                            />
                            <div>
                              <p className="text-xs font-bold text-slate-900">{item.name}</p>
                              <p className="text-[11px] text-slate-500">Qty: {item.qty}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-900">
                            ₹{Number(item.price).toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer summary */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                      <span className="text-slate-500">
                        Courier: <strong>{ord.carrier}</strong> ({ord.trackingNumber})
                      </span>
                      <span className="text-sm font-black text-slate-900">
                        Total: ₹{Number(ord.total).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SAVED ADDRESSES */}
          {activeTab === "addresses" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Saved Delivery Addresses</h2>
                  <p className="text-xs text-slate-500">
                    Manage home, workplace, or cricket academy addresses for 1-click checkout
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`rounded-2xl border p-5 bg-white relative transition-all ${
                      addr.isDefault
                        ? "border-rose-500 shadow-md shadow-rose-950/5"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
                          {addr.tag}
                        </span>
                        {addr.isDefault && (
                          <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 border border-rose-200">
                            Default Address
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{addr.fullName}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {addr.street}
                      {addr.apartment && `, ${addr.apartment}`}
                      <br />
                      {addr.city}, {addr.state} {addr.zip}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Phone: {addr.phone}</p>

                    {!addr.isDefault && (
                      <div className="mt-4 border-t border-slate-100 pt-3">
                        <button
                          type="button"
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-500"
                        >
                          Make this default address
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WARRANTIES */}
          {activeTab === "warranties" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Equipment Warranties &amp; Certification
                  </h2>
                  <p className="text-xs text-slate-500">
                    Guaranteed willow replacements, seam failure coverage, and smart sensor support
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRegisterWarrantyOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" />
                  <span>Register Equipment</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {warranties.map((w) => (
                  <div
                    key={w.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                        Active Certificate
                      </span>
                      <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-slate-900">{w.productName}</h3>
                    <p className="font-mono text-xs text-slate-500 mt-1">Serial: {w.serialNumber}</p>

                    <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs space-y-1">
                      <div className="flex justify-between text-slate-600">
                        <span>Cover Type:</span>
                        <strong className="text-slate-900">{w.category}</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Valid Until:</span>
                        <strong className="text-slate-900">{w.expiryDate}</strong>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={() =>
                          showToast(`Warranty Certificate ${w.serialNumber}.pdf generated.`)
                        }
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-rose-600"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download Certificate</span>
                      </button>
                      <Link
                        to="/warranty"
                        className="text-xs font-semibold text-rose-600 hover:text-rose-500"
                      >
                        Claim Service &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: VIP REWARDS */}
          {activeTab === "rewards" && (
            <div className="space-y-6">
              <div className="rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-rose-950 p-8 text-white relative overflow-hidden">
                <div className="relative z-10 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/30">
                    <Sparkles className="h-4 w-4" />
                    Pulse VIP Club Gold Tier
                  </div>
                  <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                    You have {rewardPoints} Points Available
                  </h2>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    Earn 5 points for every ₹100 spent on cricket gear &amp; athletic wear. Redeem
                    instantly for exclusive tournament gear discounts and pro batting grip kits.
                  </p>
                </div>
              </div>

              {/* Redeem vouchers */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Available Rewards to Redeem
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <span className="rounded bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600">
                      ₹500 OFF Voucher
                    </span>
                    <h4 className="mt-2 text-sm font-bold text-slate-900">
                      Discount on Any Bat or Shoes
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Cost: 1,000 Points</p>
                    <button
                      type="button"
                      onClick={() => handleRedeemVoucher(1000, "₹500 OFF Coupon (GOLD500)")}
                      className="mt-4 w-full rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-slate-800"
                    >
                      Redeem 1,000 Pts
                    </button>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                      Complimentary Gift
                    </span>
                    <h4 className="mt-2 text-sm font-bold text-slate-900">
                      Free Silicone Bat Grip Pack
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Cost: 800 Points</p>
                    <button
                      type="button"
                      onClick={() => handleRedeemVoucher(800, "Free Bat Grip Kit")}
                      className="mt-4 w-full rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-slate-800"
                    >
                      Redeem 800 Pts
                    </button>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <span className="rounded bg-purple-50 px-2 py-0.5 text-xs font-bold text-purple-700">
                      Master Workshop
                    </span>
                    <h4 className="mt-2 text-sm font-bold text-slate-900">
                      Free Bat Knocking &amp; Oiling
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Cost: 1,500 Points</p>
                    <button
                      type="button"
                      onClick={() =>
                        handleRedeemVoucher(1500, "Bat Knocking & Oiling Service Voucher")
                      }
                      className="mt-4 w-full rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-slate-800"
                    >
                      Redeem 1,500 Pts
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & ACCOUNT */}
          {activeTab === "security" && (
            <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h2 className="text-base font-bold text-slate-900">Personal Information &amp; Login</h2>
              <p className="text-xs text-slate-500 mb-5">
                Update your account details and password credentials
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast("Profile details updated successfully.");
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={profileForm.firstName}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, firstName: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={profileForm.lastName}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, lastName: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-5 py-2 font-bold text-white hover:bg-slate-800"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* MODAL: LIVE ORDER TRACKING */}
        {trackingOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Tracking {trackingOrder.orderNumber}
                  </h3>
                  <span className="text-xs text-slate-500">{trackingOrder.carrier}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTrackingOrder(null)}
                  className="rounded-lg p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 space-y-4">
                {trackingOrder.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        step.completed
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {step.completed ? "✓" : idx + 1}
                    </div>
                    <div>
                      <p
                        className={`text-xs font-bold ${
                          step.completed ? "text-slate-900" : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </p>
                      <span className="text-[11px] text-slate-500">{step.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setTrackingOrder(null)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Close Tracking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD ADDRESS */}
        {isAddAddressOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Add New Delivery Address</h3>
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddAddress} className="mt-4 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tag (e.g. Home, Office)</label>
                    <input
                      type="text"
                      value={addressForm.tag}
                      onChange={(e) => setAddressForm({ ...addressForm, tag: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House / Flat No., Building, Street"
                    value={addressForm.street}
                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">State</label>
                    <input
                      type="text"
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">PIN / ZIP *</label>
                    <input
                      type="text"
                      required
                      value={addressForm.zip}
                      onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98200..."
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <label className="flex items-center gap-2 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addressForm.isDefault}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, isDefault: e.target.checked })
                    }
                    className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-slate-700 font-medium">Set as my default shipping address</span>
                </label>

                <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddAddressOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-5 py-2 font-bold text-white hover:bg-slate-800"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: REGISTER WARRANTY */}
        {isRegisterWarrantyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Register Equipment Warranty</h3>
                <button
                  type="button"
                  onClick={() => setIsRegisterWarrantyOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleRegisterWarranty} className="mt-4 space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Equipment Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Masterstroke Test Willow Bat"
                    value={warrantyForm.productName}
                    onChange={(e) =>
                      setWarrantyForm({ ...warrantyForm, productName: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Serial / Laser Engraved Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BAT-2026-ENG-8912"
                    value={warrantyForm.serialNumber}
                    onChange={(e) =>
                      setWarrantyForm({ ...warrantyForm, serialNumber: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsRegisterWarrantyOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-5 py-2 font-bold text-white hover:bg-slate-800"
                  >
                    Register Certificate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserDashboard;
