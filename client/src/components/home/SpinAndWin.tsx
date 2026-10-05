import React, { useState } from "react";
import { Sparkles, Trophy, Check, Copy, RotateCw } from "lucide-react";

const prizes = [
  { label: "10% OFF SITEWIDE", code: "SPIN10", color: "#e11d48" },
  { label: "FREE EXPRESS AIR", code: "FREESHIP", color: "#2563eb" },
  { label: "₹500 CRICKET VOUCHER", code: "PULSE500", color: "#d97706" },
  { label: "2X REWARD POINTS", code: "DOUBLEPTS", color: "#7c3aed" },
  { label: "15% OFF GEAR", code: "GEAR15", color: "#059669" },
  { label: "₹1,000 MEGA JACKPOT", code: "JACKPOT1000", color: "#f59e0b" },
  { label: "FREE BAT GRIP PACK", code: "FREEGRIP", color: "#ec4899" },
  { label: "20% OFF SNEAKERS", code: "KICKS20", color: "#0284c7" },
];

export const SpinAndWin: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<(typeof prizes)[0] | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWonPrize(null);
    setCopied(false);

    // Pick random prize index
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const sliceAngle = 360 / prizes.length;
    // Extra full spins (5 to 8 rotations) + target slice offset
    const extraSpins = 360 * 5;
    const targetAngle = extraSpins + (360 - prizeIndex * sliceAngle - sliceAngle / 2);

    const newRotation = rotation + targetAngle;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setWonPrize(prizes[prizeIndex]);
    }, 4500);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="bg-slate-950 py-16 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-400 border border-amber-500/30 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Lucky Drop Wheel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              🎡 Spin &amp; Win Instant Match Rewards
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every visitor gets a complimentary spin today. Unlock up to ₹1,000 in instant discounts, free express air dispatch, or complimentary bat grip packs.
            </p>

            {wonPrize && (
              <div className="rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/40 p-5 space-y-2 animate-fadeIn shadow-2xl">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase">
                  <Trophy className="w-4 h-4" />
                  <span>Congratulations! You Unlocked:</span>
                </div>
                <h4 className="text-xl font-black text-white">{wonPrize.label}</h4>
                <div className="flex items-center justify-between rounded-xl bg-slate-950 p-3 border border-slate-800 text-xs">
                  <span className="font-mono font-bold text-amber-400">{wonPrize.code}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(wonPrize.code)}
                    className="flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Code"}</span>
                  </button>
                </div>
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={handleSpin}
                disabled={spinning}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-7 py-3.5 text-sm font-black text-white shadow-xl shadow-rose-950/40 hover:from-amber-400 hover:to-rose-500 transition-all disabled:opacity-50 cursor-pointer"
              >
                <RotateCw className={`w-4 h-4 ${spinning ? "animate-spin" : ""}`} />
                <span>{spinning ? "Spinning Wheel..." : "Spin Lucky Wheel Now"}</span>
              </button>
            </div>
          </div>

          {/* Right Wheel Graphics */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Pointer Indicator */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-md" />

              {/* Rotating Wheel Container */}
              <div
                className="w-full h-full rounded-full border-4 border-slate-700 shadow-2xl relative overflow-hidden transition-transform duration-[4500ms] ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  background: "conic-gradient(#e11d48 0deg 45deg, #2563eb 45deg 90deg, #d97706 90deg 135deg, #7c3aed 135deg 180deg, #059669 180deg 225deg, #f59e0b 225deg 270deg, #ec4899 270deg 315deg, #0284c7 315deg 360deg)",
                }}
              >
                {/* Labels overlay */}
                {prizes.map((p, i) => (
                  <div
                    key={p.code}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-extrabold text-[9px] uppercase tracking-wider text-center pointer-events-none drop-shadow"
                    style={{
                      transform: `rotate(${i * 45 + 22.5}deg) translateY(-85px)`,
                    }}
                  >
                    {p.label.split(" ")[0]}
                  </div>
                ))}
              </div>

              {/* Center Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-slate-950 border-4 border-slate-700 shadow-xl flex items-center justify-center text-amber-400 font-black text-xs z-10">
                PULSE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
