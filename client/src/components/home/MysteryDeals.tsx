import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Gift, Lock, Key, Sparkles, Check, Copy } from "lucide-react";

interface Vault {
  id: string;
  name: string;
  rarity: "EPIC" | "LEGENDARY" | "MYTHIC";
  gradient: string;
  borderColor: string;
  discount: string;
  code: string;
  condition: string;
}

const vaults: Vault[] = [
  {
    id: "v-1",
    name: "Matchday Vault #01",
    rarity: "EPIC",
    gradient: "from-blue-600/30 to-indigo-950",
    borderColor: "border-blue-500/40",
    discount: "FLAT 25% OFF",
    code: "MYSTERY25",
    condition: "Valid on all protective armor & batting gloves",
  },
  {
    id: "v-2",
    name: "IPL Championship Vault",
    rarity: "LEGENDARY",
    gradient: "from-rose-600/30 to-slate-950",
    borderColor: "border-rose-500/50",
    discount: "FLAT ₹1,500 OFF",
    code: "VAULT1500",
    condition: "Valid on orders above ₹4,999",
  },
  {
    id: "v-3",
    name: "Obsidian Pro Crate",
    rarity: "MYTHIC",
    gradient: "from-amber-500/30 to-slate-950",
    borderColor: "border-amber-500/50",
    discount: "FREE EXPRESS AIR SHIPPING + 2X POINTS",
    code: "MYTHICVIP",
    condition: "All products site-wide across India",
  },
];

export const MysteryDeals: React.FC = () => {
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleUnlock = (id: string) => {
    setUnlocked((prev) => ({ ...prev, [id]: true }));
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="bg-slate-900 py-16 text-white border-b border-slate-800 relative">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-3.5 py-1 text-xs font-bold text-purple-400 border border-purple-500/30 uppercase tracking-wider mb-2">
            <Gift className="w-3.5 h-3.5 text-purple-400" />
            <span>Gamified Loot Vault</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            🎁 Daily Mystery Deals
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Pick and unlock any vault crate once every 24 hours to claim a guaranteed secret reward code for your cart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vaults.map((vault) => {
            const isOpened = unlocked[vault.id];

            return (
              <div
                key={vault.id}
                className={`relative rounded-3xl bg-gradient-to-b ${vault.gradient} border ${vault.borderColor} p-6 flex flex-col justify-between transition-all duration-500 shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                      {vault.rarity}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {isOpened ? "UNLOCKED" : "LOCKED"}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white mt-3">{vault.name}</h3>

                  {!isOpened ? (
                    <div className="py-10 text-center flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-slate-950/80 border border-slate-700/80 flex items-center justify-center shadow-inner">
                        <Lock className="w-7 h-7 text-slate-400 animate-pulse" />
                      </div>
                      <p className="text-xs text-slate-400">Contains secret site-wide voucher</p>
                    </div>
                  ) : (
                    <div className="py-6 text-center space-y-3 animate-fadeIn">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-xl font-black text-emerald-400 block">
                          {vault.discount}
                        </span>
                        <p className="text-[11px] text-slate-300 mt-1">{vault.condition}</p>
                      </div>

                      {/* Coupon code box */}
                      <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-950/90 border border-slate-700 px-3 py-2 text-xs font-mono">
                        <span className="font-black text-amber-400">{vault.code}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(vault.code)}
                          className="flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white cursor-pointer"
                        >
                          {copiedCode === vault.code ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800">
                  {!isOpened ? (
                    <button
                      type="button"
                      onClick={() => handleUnlock(vault.id)}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 py-2.5 text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-purple-950/40"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Crack Open Vault</span>
                    </button>
                  ) : (
                    <Link
                      to="/shop"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-emerald-950/40"
                    >
                      <span>Apply in Shop &rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
