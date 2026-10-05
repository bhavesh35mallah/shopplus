import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Store,
  Package,
  Truck,
  DollarSign,
  AlertTriangle,
  Plus,
  Search,
  CheckCircle,
  Clock,
  Printer,
  FileText,
  Star,
  Building,
  X,
} from "lucide-react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/AuthContext";
import { useDynamicStore, dynamicStore, type StoredProduct } from "../../utils/dynamicStore";

interface VendorProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  category: string;
  image: string;
  salesCount: number;
}

interface FulfillmentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  destination: string;
  items: string;
  amount: number;
  status: "unfulfilled" | "packed" | "shipped";
  awbNumber?: string;
  orderTime: string;
}

interface SettlementHistory {
  id: string;
  date: string;
  reference: string;
  amount: number;
  bankAccount: string;
  status: "completed" | "processing";
}

const initialSettlements: SettlementHistory[] = [
  {
    id: "set-1",
    date: "Oct 01, 2026",
    reference: "SETT-99210-HDFC",
    amount: 12450.0,
    bankAccount: "HDFC Bank •••• 9102",
    status: "completed",
  },
  {
    id: "set-2",
    date: "Sep 24, 2026",
    reference: "SETT-98102-HDFC",
    amount: 9840.5,
    bankAccount: "HDFC Bank •••• 9102",
    status: "completed",
  },
  {
    id: "set-3",
    date: "Sep 17, 2026",
    reference: "SETT-97300-HDFC",
    amount: 16130.0,
    bankAccount: "HDFC Bank •••• 9102",
    status: "completed",
  },
];

export const VendorDashboard: React.FC = () => {
  const { user, setDemoRole } = useAuth();
  const store = useDynamicStore();

  const [activeTab, setActiveTab] = useState<
    "inventory" | "fulfillment" | "payouts" | "settings"
  >("inventory");

  // Dynamic Store Sync
  const vendorProducts: VendorProduct[] = store.products.map((p) => ({
    id: p._id || p.id || "",
    name: p.name,
    sku: p.sku,
    price: p.price,
    stock: p.stock,
    lowStockThreshold: 5,
    category: p.category?.slug || "cricket",
    image: p.images?.[0] || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80",
    salesCount: p.sales || 0,
  }));

  const fulfillments: FulfillmentOrder[] = store.orders.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    customerName: o.customerName,
    destination: o.destination || o.city,
    items: o.items ? o.items.map((i) => `${i.qty}x ${i.name}`).join(", ") : `${o.itemsCount} items`,
    amount: o.total,
    status: o.status === "shipped" || o.status === "delivered" ? "shipped" : o.status === "processing" ? "packed" : "unfulfilled",
    awbNumber: o.trackingNumber,
    orderTime: o.date,
  }));

  const [settlements, setSettlements] =
    useState<SettlementHistory[]>(initialSettlements);
  const walletBalance = store.walletBalance;

  // Search & Filter
  const [inventorySearch, setInventorySearch] = useState("");

  // Modals & Notifications
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("5000");

  // New Listing Form State
  const [newListingForm, setNewListingForm] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
    category: "cricket",
    image: "",
  });

  // Store Settings State
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Apex Cricket & Pro Gear Store",
    supportEmail: "partner@apexcricket.com",
    hotline: "+91 98200 44210",
    dispatchHub: "ShopPulse Fulfillment Center #4, Andheri East, Mumbai",
    returnDays: 14,
  });

  const showNotification = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  // Adjust stock directly
  const handleUpdateStock = (productId: string, delta: number) => {
    const item = vendorProducts.find((p) => p.id === productId);
    if (item) {
      const nextStock = Math.max(0, item.stock + delta);
      dynamicStore.updateProduct(productId, { stock: nextStock });
      showNotification(`Stock for ${item.name} set to ${nextStock}`);
    }
  };

  // Handle Add Listing
  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListingForm.name || !newListingForm.price) return;

    const created: StoredProduct = {
      _id: `prod-${Date.now()}`,
      id: `prod-${Date.now()}`,
      name: newListingForm.name,
      slug: newListingForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: newListingForm.sku || `VND-${Math.floor(100 + Math.random() * 900)}`,
      description: `${newListingForm.name} supplied by Apex Cricket Merchant Hub.`,
      price: parseFloat(newListingForm.price) || 49.99,
      stock: parseInt(newListingForm.stock) || 10,
      category: {
        _id: `cat-${newListingForm.category}`,
        name: newListingForm.category,
        slug: newListingForm.category,
      },
      images: [
        newListingForm.image ||
          "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80",
      ],
      tags: [newListingForm.category, "Merchant Stock"],
      eventTags: ["Vendor Exclusive"],
      rating: 4.8,
      reviewsCount: 1,
      status: "active",
      sales: 0,
    };

    dynamicStore.addProduct(created);
    setIsAddListingOpen(false);
    setNewListingForm({
      name: "",
      sku: "",
      price: "",
      stock: "",
      category: "cricket",
      image: "",
    });
    showNotification(`New listing "${created.name}" published to ShopPulse catalog.`);
  };

  // Fulfillment Actions
  const handleMarkPacked = (orderId: string) => {
    const awb = `BLUEDART-${Math.floor(100000 + Math.random() * 900000)}-IN`;
    dynamicStore.updateOrderStatus(orderId, "processing", awb);
    showNotification(`Order packed! Generated AWB: ${awb}`);
  };

  const handleDispatchOrder = (orderId: string) => {
    dynamicStore.updateOrderStatus(orderId, "shipped");
    showNotification("Order handed over to courier. Customer notified with tracking.");
  };

  // Handle Withdrawal Request
  const handleRequestWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);
    if (isNaN(amountNum) || amountNum <= 0 || amountNum > walletBalance) {
      alert("Invalid withdrawal amount");
      return;
    }
    dynamicStore.updateWalletBalance(-amountNum);
    const newSettlement: SettlementHistory = {
      id: `set-${Date.now()}`,
      date: "Today, Just now",
      reference: `SETT-${Math.floor(10000 + Math.random() * 90000)}-HDFC`,
      amount: amountNum,
      bankAccount: "HDFC Bank •••• 9102",
      status: "processing",
    };
    setSettlements([newSettlement, ...settlements]);
    setIsWithdrawModalOpen(false);
    showNotification(
      `Withdrawal of ₹${amountNum.toLocaleString("en-IN")} requested! Processing to HDFC Bank.`
    );
  };

  // Handle Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Merchant profile & dispatch policies updated successfully.");
  };

  // Filtered inventory
  const filteredInventory = vendorProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  const pendingFulfillmentsCount = fulfillments.filter(
    (f) => f.status !== "shipped"
  ).length;

  return (
    <Layout>
      <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
        {/* Toast */}
        {feedback && (
          <div className="fixed top-20 right-6 z-50 flex items-center gap-3 rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-2xl animate-bounce">
            <CheckCircle className="h-5 w-5" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Vendor Header */}
        <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-16 z-30">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Store className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-white sm:text-2xl">
                    {storeSettings.storeName}
                  </h1>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                    Verified Merchant
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1 text-amber-300 font-semibold">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    4.9 / 5.0 (3,120 ratings)
                  </span>
                  <span>•</span>
                  <span>Hub: Mumbai West FC-04</span>
                </div>
              </div>
            </div>

            {/* Switch View & Payout Button */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-xl bg-slate-800/90 p-1 border border-slate-700 text-xs">
                <span className="px-2 font-semibold text-slate-400">View:</span>
                <Link
                  to="/admin"
                  onClick={() => setDemoRole("admin")}
                  className="rounded-lg px-2.5 py-1 font-bold text-slate-300 hover:text-white hover:bg-slate-700/50"
                >
                  Admin
                </Link>
                <button
                  type="button"
                  onClick={() => setDemoRole("vendor")}
                  className={`rounded-lg px-2.5 py-1 font-bold transition-colors ${
                    user?.role === "vendor"
                      ? "bg-amber-500 text-slate-950"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Vendor
                </button>
                <Link
                  to="/profile"
                  onClick={() => setDemoRole("customer")}
                  className="rounded-lg px-2.5 py-1 font-bold text-slate-300 hover:text-white hover:bg-slate-700/50"
                >
                  User
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 shadow-lg shadow-emerald-950/40"
              >
                <DollarSign className="h-4 w-4" />
                <span>Withdraw Payout</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 overflow-x-auto border-t border-slate-800/60 pt-2 pb-0 scrollbar-none">
              {[
                { id: "inventory", label: `Inventory Stock (${vendorProducts.length})`, icon: Package },
                {
                  id: "fulfillment",
                  label: `Dispatch Queue (${pendingFulfillmentsCount})`,
                  icon: Truck,
                },
                { id: "payouts", label: "Settlements & Wallet", icon: DollarSign },
                { id: "settings", label: "Store Policies & Hub", icon: Building },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? "border-amber-400 text-amber-400 bg-amber-400/10 rounded-t-lg"
                        : "border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-200"
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

        {/* Content Body */}
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Withdrawable Balance</span>
                <DollarSign className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-2 text-2xl font-black text-white sm:text-3xl">
                ₹{walletBalance.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-emerald-400 font-semibold">Ready for bank transfer</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Pending Orders</span>
                <Clock className="h-4 w-4 text-amber-400" />
              </div>
              <p className="mt-2 text-2xl font-black text-white sm:text-3xl">
                {pendingFulfillmentsCount} to dispatch
              </p>
              <p className="mt-1 text-xs text-slate-400">Real-time order queue</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Units Dispatched (MTD)</span>
                <Package className="h-4 w-4 text-blue-400" />
              </div>
              <p className="mt-2 text-2xl font-black text-white sm:text-3xl">
                {fulfillments.length} Orders
              </p>
              <p className="mt-1 text-xs text-slate-400">Live fulfillment queue</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Fulfillment Accuracy</span>
                <CheckCircle className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-2 text-2xl font-black text-white sm:text-3xl">99.8%</p>
              <p className="mt-1 text-xs text-emerald-400 font-semibold">0.8% return rate</p>
            </div>
          </div>

          {/* TAB 1: INVENTORY & STOCK */}
          {activeTab === "inventory" && (
            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6 backdrop-blur-sm space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by SKU or item name..."
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2 pl-9 pr-4 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddListingOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-950/30"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Store Listing</span>
                </button>
              </div>

              {/* Inventory Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-700/80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/70 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Listing Item</th>
                      <th className="px-4 py-3">SKU</th>
                      <th className="px-4 py-3">Unit Price</th>
                      <th className="px-4 py-3">Stock On-Hand</th>
                      <th className="px-4 py-3">Quick Stock Adjust</th>
                      <th className="px-4 py-3 text-right">Sold MTD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-10 w-10 rounded-lg object-cover bg-slate-950 border border-slate-800"
                            />
                            <div>
                              <p className="font-bold text-white">{item.name}</p>
                              {item.stock <= item.lowStockThreshold && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400">
                                  <AlertTriangle className="h-3 w-3" />
                                  Low Stock Alert!
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-400">{item.sku}</td>
                        <td className="px-4 py-3 font-bold text-white">₹{item.price.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                              item.stock > item.lowStockThreshold
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                            }`}
                          >
                            {item.stock} available
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleUpdateStock(item.id, -1)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-sm font-bold text-slate-300 hover:bg-slate-700 hover:text-white"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-bold text-white text-xs">
                              {item.stock}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateStock(item.id, +5)}
                              className="flex h-7 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-xs font-bold text-amber-300 hover:bg-amber-500/30"
                              title="Restock +5"
                            >
                              +5
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateStock(item.id, +25)}
                              className="flex h-7 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30"
                              title="Restock +25"
                            >
                              +25
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-300">
                          {item.salesCount} units
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: DISPATCH & FULFILLMENT */}
          {activeTab === "fulfillment" && (
            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6 backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    Packing &amp; Dispatch Queue
                  </h2>
                  <p className="text-xs text-slate-400">
                    Generate courier AWB shipping labels and process orders for carrier pickup
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => showNotification("Manifest PDF generated and ready for print.")}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                >
                  <FileText className="h-3.5 w-3.5 text-slate-400" />
                  <span>Download Manifest</span>
                </button>
              </div>

              <div className="space-y-3">
                {fulfillments.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400">
                          {order.orderNumber}
                        </span>
                        <span className="text-xs text-slate-400">({order.orderTime})</span>
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                            order.status === "shipped"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : order.status === "packed"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-semibold text-white">
                        Customer: {order.customerName}
                      </p>
                      <p className="text-xs text-slate-400">Deliver to: {order.destination}</p>
                      <p className="mt-1 text-xs text-slate-300 font-medium">{order.items}</p>

                      {order.awbNumber && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-blue-400">
                          <Printer className="h-3.5 w-3.5" />
                          <span>AWB Tracking: <strong>{order.awbNumber}</strong></span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {order.status === "unfulfilled" && (
                        <button
                          type="button"
                          onClick={() => handleMarkPacked(order.id)}
                          className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-md"
                        >
                          Generate AWB &amp; Pack
                        </button>
                      )}

                      {order.status === "packed" && (
                        <button
                          type="button"
                          onClick={() => handleDispatchOrder(order.id)}
                          className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-md"
                        >
                          Dispatch to Courier
                        </button>
                      )}

                      {order.status === "shipped" && (
                        <div className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                          <CheckCircle className="h-4 w-4" />
                          <span>In Transit</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SETTLEMENTS & PAYOUTS */}
          {activeTab === "payouts" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6 backdrop-blur-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                      Merchant Settlement Account
                    </h2>
                    <p className="text-xs text-slate-400">
                      Standard automated payouts clear every Thursday to linked business checking account
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Available</span>
                      <p className="text-xl font-black text-emerald-400">₹{walletBalance.toLocaleString("en-IN")}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsWithdrawModalOpen(true)}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 shadow-lg"
                    >
                      Instant Payout
                    </button>
                  </div>
                </div>

                {/* Settlement Log */}
                <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700/80">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/70 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Reference ID</th>
                        <th className="px-4 py-3">Destination Bank</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {settlements.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40">
                          <td className="px-4 py-3 text-slate-300">{s.date}</td>
                          <td className="px-4 py-3 font-mono text-amber-400 font-semibold">
                            {s.reference}
                          </td>
                          <td className="px-4 py-3 text-slate-300">{s.bankAccount}</td>
                          <td className="px-4 py-3 font-bold text-white">₹{s.amount.toLocaleString("en-IN")}</td>
                          <td className="px-4 py-3 text-right">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                s.status === "completed"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-amber-500/20 text-amber-400"
                              }`}
                            >
                              {s.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STORE SETTINGS & DISPATCH POLICIES */}
          {activeTab === "settings" && (
            <div className="max-w-2xl rounded-2xl border border-slate-800 bg-slate-800/60 p-6 backdrop-blur-sm">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Storefront &amp; Logistics Configuration
              </h2>
              <p className="text-xs text-slate-400 mb-5">
                Keep customer contact info and primary dispatch hub current for shipping calculations
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Store Name</label>
                  <input
                    type="text"
                    value={storeSettings.storeName}
                    onChange={(e) =>
                      setStoreSettings({ ...storeSettings, storeName: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Merchant Email</label>
                    <input
                      type="email"
                      value={storeSettings.supportEmail}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, supportEmail: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Dispatch Hotline</label>
                    <input
                      type="text"
                      value={storeSettings.hotline}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, hotline: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Primary Dispatch Hub Address</label>
                  <textarea
                    rows={2}
                    value={storeSettings.dispatchHub}
                    onChange={(e) =>
                      setStoreSettings({ ...storeSettings, dispatchHub: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Customer Return Window (Days)
                  </label>
                  <input
                    type="number"
                    value={storeSettings.returnDays}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        returnDays: parseInt(e.target.value) || 14,
                      })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-800">
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-500 px-5 py-2 font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-md"
                  >
                    Save Storefront Details
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* MODAL: ADD STORE LISTING */}
        {isAddListingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
            <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">Create New Merchant Listing</h3>
                <button
                  type="button"
                  onClick={() => setIsAddListingOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddListing} className="mt-4 space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Listing Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Master Edition Leather Cricket Ball (Box of 6)"
                    value={newListingForm.name}
                    onChange={(e) =>
                      setNewListingForm({ ...newListingForm, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="89.99"
                      value={newListingForm.price}
                      onChange={(e) =>
                        setNewListingForm({ ...newListingForm, price: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Initial Stock Units</label>
                    <input
                      type="number"
                      placeholder="30"
                      value={newListingForm.stock}
                      onChange={(e) =>
                        setNewListingForm({ ...newListingForm, stock: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newListingForm.image}
                    onChange={(e) =>
                      setNewListingForm({ ...newListingForm, image: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 border-t border-slate-800 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddListingOpen(false)}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-500 px-5 py-2 font-bold text-slate-950 hover:bg-amber-400 shadow-lg"
                  >
                    Publish Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: WITHDRAW PAYOUT */}
        {isWithdrawModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">Instant Payout Request</h3>
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleRequestWithdrawal} className="mt-4 space-y-3 text-xs">
                <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                  <span className="text-slate-400">Available Wallet Balance:</span>
                  <p className="text-xl font-black text-emerald-400">₹{walletBalance.toLocaleString("en-IN")}</p>
                  <span className="text-[11px] text-slate-500">Destination: HDFC Bank (A/C •••• 9102)</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Withdrawal Amount (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    max={walletBalance}
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-emerald-400 focus:outline-none font-bold"
                  />
                </div>

                <div className="flex justify-end gap-2 border-t border-slate-800 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsWithdrawModalOpen(false)}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-5 py-2 font-bold text-white hover:bg-emerald-500 shadow-lg"
                  >
                    Transfer to Bank
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

export default VendorDashboard;
