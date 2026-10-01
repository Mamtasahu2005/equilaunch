import React from 'react';
import { DollarSign, Shield, Cpu, RefreshCw, BarChart2, Layers } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  return (
    <div className="relative border-b border-slate-800/80 bg-gradient-to-r from-slate-950 via-[#0d1522] to-slate-950 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          
          {/* Stat 1 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
              <DollarSign className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Total Equity Tokenized
              </div>
              <div className="text-lg lg:text-xl font-bold font-mono text-slate-100">
                $14,840,250
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <span>+18.4% this week</span>
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Meteora DAMM v2 TVL
              </div>
              <div className="text-lg lg:text-xl font-bold font-mono text-slate-100">
                $8,920,400
              </div>
              <div className="text-[10px] text-teal-400 flex items-center gap-1 font-mono">
                <span>Dynamic fees compounding</span>
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Meteora DLMM Depth
              </div>
              <div className="text-lg lg:text-xl font-bold font-mono text-slate-100">
                $4,150,000
              </div>
              <div className="text-[10px] text-purple-300 flex items-center gap-1 font-mono">
                <span>±15 bps tight bins</span>
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Anti-Snipe Protection
              </div>
              <div className="text-lg lg:text-xl font-bold font-mono text-slate-100">
                100% MEV Defended
              </div>
              <div className="text-[10px] text-amber-400 flex items-center gap-1 font-mono">
                <span>Decaying dynamic fee schedule</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
