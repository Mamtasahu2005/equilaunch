import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Zap, ArrowRight, TrendingUp, Info } from 'lucide-react';

export const CurveComparisonSandbox: React.FC = () => {
  const [inflowUsdc, setInflowUsdc] = useState<number>(125000);

  // Reference NAV is $125.00
  const refNav = 125.0;

  // Meme curve calculation: exponential runaway
  // P_meme(inflow) = 25 * (1 + inflow / 25000)^2.2
  const memePrice = Math.min(2850, 25 * Math.pow(1 + inflowUsdc / 30000, 2.1));
  const memeDivergence = ((memePrice - refNav) / refNav) * 100;

  // EquiLaunch Bounded Sigmoid calculation:
  // Orderly discovery around NAV (starts at 110, bounds at 145)
  const progressRatio = Math.min(1, inflowUsdc / 250000);
  const k = 6;
  const sigmoid = 1 / (1 + Math.exp(-k * (progressRatio - 0.45)));
  const minSig = 1 / (1 + Math.exp(-k * (0 - 0.45)));
  const maxSig = 1 / (1 + Math.exp(-k * (1 - 0.45)));
  const normSig = (sigmoid - minSig) / (maxSig - minSig);
  const equiPrice = 110.0 + (145.0 - 110.0) * normSig;
  const equiDivergence = ((equiPrice - refNav) / refNav) * 100;

  // Dynamic fee calculation for EquiLaunch
  const currentFee = 0.20 + (4.50 - 0.20) * Math.exp(-4 * progressRatio);

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0d1524] to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold">
          <Zap className="w-3.5 h-3.5" />
          <span>Interactive Mechanics Comparison</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Why Traditional Meme Curves <span className="text-rose-400">Destroy Equities</span>, and How <span className="text-teal-400">Meteora DBC</span> Solves It
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Tokenized stocks have real-world NAV anchors. Test what happens to a \$125 tokenized share as capital flows into both curves:
        </p>
      </div>

      {/* Interactive Inflow Slider */}
      <div className="max-w-xl mx-auto mb-8 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <span>Simulate Pool Capital Raised:</span>
          </span>
          <span className="text-teal-400 font-bold text-sm">
            ${inflowUsdc.toLocaleString()} USDC
          </span>
        </div>
        <input
          type="range"
          min="10000"
          max="250000"
          step="5000"
          value={inflowUsdc}
          onChange={(e) => setInflowUsdc(parseFloat(e.target.value))}
          className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>$10,000 (Genesis)</span>
          <span>$125,000 (Mid-Curve Discovery)</span>
          <span>$250,000 (Graduation Threshold)</span>
        </div>
      </div>

      {/* Comparison Split Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Traditional Meme Launchpad */}
        <div className="rounded-2xl bg-gradient-to-b from-rose-950/20 to-slate-950 border border-rose-500/30 p-5 space-y-4 relative">
          <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Traditional Meme Curve</h3>
                <span className="text-[10px] font-mono text-rose-400">pump-style Exponential Curve</span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-mono">
              Toxic for Stocks
            </span>
          </div>

          {/* Pricing Metrics */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-rose-900/40 font-mono text-xs">
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Spot Price</div>
              <div className="text-xl font-extrabold text-rose-400">
                ${memePrice.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase">NAV Divergence</div>
              <div className="text-xl font-extrabold text-rose-400">
                +{memeDivergence.toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Pitfall Points */}
          <ul className="space-y-2 text-xs text-slate-300 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 shrink-0 font-bold">✕</span>
              <span><strong>MEV Bot Heaven:</strong> 95% of initial curve bought by front-running bots in Block 0.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 shrink-0 font-bold">✕</span>
              <span><strong>Arbitrage Break:</strong> Shares trade at ${memePrice.toFixed(0)} vs real NASDAQ NAV of $125.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 shrink-0 font-bold">✕</span>
              <span><strong>Dumping Migration:</strong> Dumps into standard AMM with wide spreads; retail left holding heavy bags.</span>
            </li>
          </ul>
        </div>

        {/* Card 2: EquiLaunch on Meteora DBC */}
        <div className="rounded-2xl bg-gradient-to-b from-teal-950/30 to-slate-950 border border-teal-500/50 p-5 space-y-4 relative shadow-lg shadow-teal-500/10">
          <div className="flex items-center justify-between pb-3 border-b border-teal-500/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">EquiLaunch on Meteora DBC</h3>
                <span className="text-[10px] font-mono text-teal-300">Bounded Sigmoid + Decaying Fee</span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 font-mono">
              Institutional Ready
            </span>
          </div>

          {/* Pricing Metrics */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-teal-500/30 font-mono text-xs">
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Spot Price</div>
              <div className="text-xl font-extrabold text-teal-300">
                ${equiPrice.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase">NAV Discovery Band</div>
              <div className="text-xl font-extrabold text-emerald-400">
                {equiDivergence >= 0 ? '+' : ''}{equiDivergence.toFixed(1)}% vs NAV
              </div>
            </div>
          </div>

          {/* Protection Points */}
          <ul className="space-y-2 text-xs text-slate-300 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-teal-400 shrink-0 font-bold">✓</span>
              <span><strong>Anti-Snipe Defense:</strong> Dynamic fee currently at <strong>{currentFee.toFixed(2)}%</strong> (decayed from 4.50%).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 shrink-0 font-bold">✓</span>
              <span><strong>Bounded Volatility:</strong> Discovery is anchored within $110 - $145 fair-value corridor.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 shrink-0 font-bold">✓</span>
              <span><strong>Dual Migration:</strong> Auto-allocates 60% into <strong>DAMM v2</strong> + 40% into <strong>DLMM</strong> 51 tight bins!</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
