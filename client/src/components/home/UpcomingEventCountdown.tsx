import React, { useState, useEffect } from "react";
import { Zap, Bell, Check, ShieldCheck, Lock } from "lucide-react";

export const UpcomingEventCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 42,
  });

  const [email, setEmail] = useState("");
  const [isReserved, setIsReserved] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 3, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsReserved(true);
  };

  return (
    <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Dynamic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-purple-600/15 via-rose-600/15 to-amber-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-950/80 border border-purple-500/30 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-purple-950/40 backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content & Timer */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/15 border border-purple-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-purple-400">
                <Zap className="w-3.5 h-3.5 fill-purple-400" />
                <span>Next Global Midnight Drop</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Championship Finale <br />
                <span className="bg-gradient-to-r from-purple-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                  Midnight Vault Flash Drop
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl">
                Only 500 serialized units of international tournament English Willow bats and titanium armor gear released at midnight. Flat 35% discount for verified VIP pass holders.
              </p>

              {/* Countdown Clock Display */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 text-center">
                  <div className="text-2xl sm:text-4xl font-black text-white font-mono">
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase font-bold text-slate-400 mt-1">Days</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 text-center">
                  <div className="text-2xl sm:text-4xl font-black text-purple-400 font-mono">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase font-bold text-slate-400 mt-1">Hours</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 text-center">
                  <div className="text-2xl sm:text-4xl font-black text-rose-400 font-mono">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase font-bold text-slate-400 mt-1">Mins</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 text-center">
                  <div className="text-2xl sm:text-4xl font-black text-amber-400 font-mono">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase font-bold text-slate-400 mt-1">Secs</div>
                </div>
              </div>

              {/* VIP Registration Input */}
              <div className="pt-2">
                {isReserved ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3 text-emerald-400 max-w-md">
                    <Check className="w-5 h-5 stroke-[3] flex-shrink-0" />
                    <div>
                      <div className="font-black text-sm text-white">VIP Fast-Pass Confirmed!</div>
                      <div className="text-xs text-emerald-300/80">
                        Priority access code dispatched to {email}. You will skip the waiting queue.
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleReserve} className="flex flex-col sm:flex-row gap-2 max-w-md">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email or WhatsApp number"
                      required
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-black text-sm shadow-lg shadow-purple-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Reserve Pass</span>
                    </button>
                  </form>
                )}
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    <span>Free Pass Access</span>
                  </span>
                  <span>•</span>
                  <span>100% Anti-Bot Queue Protection</span>
                </div>
              </div>
            </div>

            {/* Right Teaser Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span>Vault Teaser Preview (Unlocking at 00:00)</span>
              </div>

              {/* 3 Teaser Items */}
              <div className="space-y-3">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 relative">
                      <img
                        src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80"
                        alt="Teaser"
                        className="w-full h-full object-cover blur-sm"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-purple-300" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">SS Golden Edition Willow #001</div>
                      <div className="text-[11px] text-purple-400 font-semibold">12 Grain English Test Spec</div>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-lg">
                    35% OFF
                  </span>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 relative">
                      <img
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"
                        alt="Teaser"
                        className="w-full h-full object-cover blur-sm"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-rose-300" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">AeroVapor X-1 Carbon Racers</div>
                      <div className="text-[11px] text-rose-400 font-semibold">Bespoke Olympic Edition</div>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-lg">
                    40% OFF
                  </span>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 relative">
                      <img
                        src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80"
                        alt="Teaser"
                        className="w-full h-full object-cover blur-sm"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-amber-300" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Titanium Masuri Edition Helmet</div>
                      <div className="text-[11px] text-amber-400 font-semibold">Ballistic Impact Absorption</div>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                    30% OFF
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
