import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowRight,
  Hammer,
} from "lucide-react";

const Maintenance: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 47,
    seconds: 18,
  });

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden selection:bg-rose-500 selection:text-white">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Brand */}
      <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-950 font-black text-sm shadow-md">
            SP
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Shop<span className="text-rose-500">Pulse</span>
          </span>
        </Link>

        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          SYSTEM MAINTENANCE PROTOCOL
        </span>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto w-full text-center py-12 sm:py-16 space-y-8">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-rose-400 text-xs font-bold uppercase tracking-widest">
          <Hammer className="h-3.5 w-3.5 text-rose-500 animate-spin" />
          Tournament Engine Upgrade in Progress
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Preparing For The Next Big Match Drop.
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            We are upgrading our high-concurrency checkout infrastructure and indexing a brand new shipment of Grade 1 English Willow clefts before the tournament rush.
          </p>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 pt-4">
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-6 w-24 sm:w-28 text-center shadow-2xl backdrop-blur-md">
            <span className="text-3xl sm:text-4xl font-black font-mono text-white block">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1 block">
              Hours
            </span>
          </div>

          <span className="text-2xl font-mono text-slate-600">:</span>

          <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-6 w-24 sm:w-28 text-center shadow-2xl backdrop-blur-md">
            <span className="text-3xl sm:text-4xl font-black font-mono text-rose-500 block">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1 block">
              Minutes
            </span>
          </div>

          <span className="text-2xl font-mono text-slate-600">:</span>

          <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-6 w-24 sm:w-28 text-center shadow-2xl backdrop-blur-md">
            <span className="text-3xl sm:text-4xl font-black font-mono text-white block">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1 block">
              Seconds
            </span>
          </div>
        </div>

        {/* Notification Form */}
        <div className="max-w-md mx-auto pt-4">
          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>You're on the priority notification list! We'll alert you first.</span>
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email to get notified when live"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:border-rose-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-rose-600/30 flex-shrink-0"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>

        {/* Support Hotline for Ongoing Orders */}
        <div className="pt-6 border-t border-slate-800/80 max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>Tracking an existing dispatch?</span>
          <div className="flex items-center gap-3">
            <Link
              to="/track-order"
              className="text-white font-bold hover:text-rose-400 transition-colors flex items-center gap-1"
            >
              <span>Track Order Desk</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              to="/"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Store Preview
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full text-center text-xs text-slate-500 pt-6">
        &copy; {new Date().getFullYear()} ShopPulse Retail India Private Limited. All rights reserved.
      </footer>
    </div>
  );
};

export default Maintenance;
