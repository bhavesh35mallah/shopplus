import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Award, ChevronRight } from "lucide-react";

const tiers = [
  { name: "Rookie", minPoints: "0", perks: "Free Standard Shipping on ₹999+" },
  { name: "All-Star", minPoints: "1,000", perks: "5% Extra Cashback + Birthday Gift" },
  { name: "National Pro", minPoints: "5,000", perks: "Priority Express Dispatch + Free Bat Knocking" },
  { name: "Legend VIP", minPoints: "10,000", perks: "Personal Concierge + Early Access to Drops" },
];

export const RewardsPointsSection: React.FC = () => {
  const [spendAmount, setSpendAmount] = useState(5000);
  const earnedPoints = Math.floor((spendAmount / 100) * 5);
  const voucherValue = Math.floor(earnedPoints * 0.5);

  return (
    <section className="bg-slate-900 py-16 text-white border-b border-slate-800">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Tier ladder */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>ShopPulse Athletes Club</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              🏆 Earn Rewards with Every Purchase
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Turn your matchplay gear investment into free equipment vouchers, complimentary English willow knocking, and exclusive early access to tournament drops.
            </p>

            {/* Tiers List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {tiers.map((t, idx) => (
                <div
                  key={t.name}
                  className="rounded-2xl bg-slate-950 p-4 border border-slate-800 flex items-start gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-amber-400 font-black text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{t.name}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">({t.minPoints} pts)</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{t.perks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Live Calculator Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-rose-400">
                  Interactive Points Calculator
                </span>
                <span className="text-xs text-slate-400">₹100 = 5 Points</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Estimated Equipment Purchase (₹)
                </label>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-xs font-mono font-bold text-slate-400 mt-1">
                  <span>₹1,000</span>
                  <span className="text-white text-base">₹{spendAmount.toLocaleString("en-IN")}</span>
                  <span>₹50,000</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-2xl bg-slate-900 p-3.5 border border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Points Earned</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">{earnedPoints}</span>
                </div>
                <div className="rounded-2xl bg-slate-900 p-3.5 border border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Voucher Value</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">₹{voucherValue}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/profile"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-500 py-3 text-xs font-bold text-white transition-all shadow-lg shadow-rose-950/40"
                >
                  <span>View My Club Points</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
