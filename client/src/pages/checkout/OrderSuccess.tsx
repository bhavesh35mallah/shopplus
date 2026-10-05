import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Truck,
  Download,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

interface OrderSnapshot {
  orderId: string;
  items: Array<{
    product: {
      name: string;
      price: number;
      images: string[];
      slug: string;
    };
    quantity: number;
    size?: string;
  }>;
  subtotal: number;
  shippingCost: number;
  codFee: number;
  finalPayable: number;
  address: {
    fullName: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  shippingMethod: string;
  date: string;
}

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const [order, setOrder] = useState<OrderSnapshot | null>(null);

  useEffect(() => {
    // Try state from navigation, fallback to sessionStorage
    if (location.state) {
      setOrder(location.state as OrderSnapshot);
    } else {
      try {
        const stored = sessionStorage.getItem("last_pulse_order");
        if (stored) {
          setOrder(JSON.parse(stored));
        } else {
          // Default mock order if visited directly
          setOrder({
            orderId: "SP-8492-MUM",
            items: [
              {
                product: {
                  name: "Pro Tournament Grade 1 English Willow Cricket Bat",
                  price: 18499,
                  images: [
                    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80",
                  ],
                  slug: "pro-tournament-english-willow",
                },
                quantity: 1,
                size: "Full Size (2lb 8oz)",
              },
            ],
            subtotal: 18499,
            shippingCost: 0,
            codFee: 0,
            finalPayable: 18499,
            address: {
              fullName: "Aarav Sharma",
              phone: "98201 44820",
              email: "aarav.sharma@example.com",
              street: "Flat 802, Windsor Grande, Link Road, Andheri West",
              city: "Mumbai",
              state: "Maharashtra",
              pincode: "400053",
            },
            paymentMethod: "UPI (Google Pay)",
            shippingMethod: "standard",
            date: new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          });
        }
      } catch {
        // Ignored
      }
    }
  }, [location.state]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) return null;

  return (
    <Layout>
      <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16 print:bg-white print:py-0">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Success Banner */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm text-center mb-8">
            <div className="h-20 w-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-5 border border-emerald-200 shadow-2xs">
              <CheckCircle2 className="h-10 w-10 animate-bounce" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              PAYMENT AUTHORIZED &bull; ORDER SECURED
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Thank You For Your Order!
            </h1>
            <p className="mt-2 text-xs text-slate-500 font-mono">
              ORDER REFERENCE ID:{" "}
              <strong className="text-slate-900 text-sm font-black">{order.orderId}</strong>
            </p>

            <p className="mt-3 text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              We have dispatched your tax invoice to <strong>{order.address.email}</strong>. Our workshop will begin inspecting and laser-hologram tagging your gear within the hour.
            </p>

            {/* Quick Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/track-order"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3.5 rounded-2xl transition-all shadow-md cursor-pointer"
              >
                <Truck className="h-4 w-4" />
                <span>Track Delivery Live</span>
              </Link>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-3.5 rounded-2xl transition-all cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download / Print Receipt</span>
              </button>

              <Link
                to="/warranty"
                className="inline-flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs px-5 py-3.5 rounded-2xl border border-rose-200 transition-all cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Register 6-Month Warranty</span>
              </Link>
            </div>
          </div>

          {/* Detailed Receipt Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
            {/* Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Order Date
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">{order.date}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Payment Method
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block uppercase">
                  {order.paymentMethod}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Estimated Arrival
                </span>
                <span className="font-bold text-emerald-700 mt-0.5 block">2-3 Business Days</span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Amount Paid
                </span>
                <span className="font-black text-rose-600 mt-0.5 block text-sm">
                  ₹{order.finalPayable.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Delivery Destination & Handover */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-700" />
                  Delivery Destination
                </span>
                <p className="font-bold text-slate-900 pt-1">{order.address.fullName}</p>
                <p className="text-slate-600 leading-relaxed">
                  {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                </p>
                <p className="text-slate-500 font-mono pt-1">
                  Registered Mobile: {order.address.phone}
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Handoff &amp; Verification Protocol
                </span>
                <p className="text-slate-600 leading-relaxed pt-1">
                  A unique 4-digit OTP will be messaged to your phone 30 minutes before arrival. Please share it with the delivery executive upon package handover.
                </p>
                <p className="text-emerald-700 font-semibold pt-1">
                  ✓ Protected by ShopPulse Tamper-Evident Tape
                </p>
              </div>
            </div>

            {/* Items Summary Table */}
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">
                Purchased Equipment ({order.items.length})
              </h3>
              <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-4 flex items-center gap-4 text-xs">
                    <img
                      src={
                        item.product.images?.[0] ||
                        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80"
                      }
                      alt={item.product.name}
                      className="h-14 w-14 rounded-xl object-cover border border-slate-200 bg-slate-50 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                      <p className="text-[11px] text-slate-500">
                        Qty: {item.quantity} {item.size ? `• Spec: ${item.size}` : ""}
                      </p>
                    </div>
                    <span className="font-bold text-slate-900">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="max-w-xs ml-auto space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">₹{order.subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>{order.shippingCost === 0 ? "FREE" : `₹${order.shippingCost}`}</span>
              </div>
              {order.codFee > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>COD Handling Fee</span>
                  <span>₹{order.codFee}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold">
                <span className="text-slate-900 text-sm">Total Paid</span>
                <span className="text-base text-rose-600 font-black">
                  ₹{order.finalPayable.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Return & Support Note */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <span>Have any questions about this order?</span>
              <div className="flex items-center gap-4">
                <Link to="/contact" className="font-bold text-slate-900 hover:text-rose-600">
                  Contact Support Concierge
                </Link>
                <Link to="/return-policy" className="font-bold text-slate-900 hover:text-rose-600">
                  14-Day Return Policy
                </Link>
                <Link to="/shop" className="font-bold text-rose-600 hover:underline">
                  Continue Shopping →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
