import React from 'react';
import { Cpu, Layers, Zap, ArrowRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export const MeteoraLifecycleSection: React.FC = () => {
  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>The Meteora Tri-Pillar Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How EquiLaunch Leverages the <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">Entire Meteora Stack</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          From genesis price discovery to perpetual institutional liquidity, every step is executed on native Meteora primitives.
        </p>
      </div>

      {/* 3 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        
        {/* Step 1 */}
        <div className="relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/40 p-6 space-y-4 transition-all duration-200 hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-mono font-bold text-sm">
            01
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
              <span>Meteora Dynamic Bonding Curve</span>
            </h3>
            <span className="text-[11px] font-mono text-teal-400">DBC Discovery Phase</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Equity issuer deploys a <strong>Bounded Sigmoid curve</strong> anchored to the official NASDAQ or tender NAV. An unwithdrawable <strong>30%–85% floor reserve</strong> is locked, while a <strong>decaying dynamic fee (5% ➔ 0.20%)</strong> eliminates sniper front-running.
          </p>
          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span>USDC / USDY / PYUSD Pairings</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 p-6 space-y-4 transition-all duration-200 hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-sm">
            02
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
              <span>Automated Graduation Trigger</span>
            </h3>
            <span className="text-[11px] font-mono text-purple-400">Milestone Reached ($250k USDC)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Once target capital is raised, the bonding curve automatically locks. Unminted tokens and quote reserves transition atomically into a <strong>60 / 40 liquidity split</strong> without requiring central custodian intervention.
          </p>
          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Atomic On-Chain Execution</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 p-6 space-y-4 transition-all duration-200 hover:-translate-y-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
            03
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
              <span>Dual DAMM v2 + DLMM Migration</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400">Perpetual Market Liquidity</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>60% provisions into Meteora DAMM v2</strong> for permanent dynamic-fee compounding yield. <strong>40% provisions into Meteora DLMM</strong> across 51 concentrated bins ($\pm 3\%$) with 15 bps bin steps for institutional zero-slippage trading.
          </p>
          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Auto-Compounding Dividends</span>
          </div>
        </div>

      </div>
    </div>
  );
};
