import React, { useMemo } from 'react';
import { Layers, Zap, Info } from 'lucide-react';
import { generateDlmmBins } from '../utils/curveMath';
import { EquityAsset } from '../types';

interface DlmmBinPreviewProps {
  asset: EquityAsset;
}

export const DlmmBinPreview: React.FC<DlmmBinPreviewProps> = ({ asset }) => {
  const bins = useMemo(() => {
    return generateDlmmBins(asset.currentPrice, 15, 23, asset.graduationThreshold * 0.4);
  }, [asset.currentPrice, asset.graduationThreshold]);

  const maxLiquidity = Math.max(...bins.map((b) => b.liquidityUsdc));

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 border border-slate-800/80 p-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Meteora DLMM Graduation Bin Distribution (Concentrated Liquidity)
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300">
            Bin Step: 15 bps (0.15%)
          </span>
        </div>

        <div className="text-xs font-mono text-purple-300 flex items-center gap-2">
          <span>Target Allocation: <strong>40% of DBC Pool</strong></span>
          <span className="text-slate-500">•</span>
          <span>Depth: <strong>${(asset.graduationThreshold * 0.4).toLocaleString()} USDC</strong></span>
        </div>
      </div>

      {/* Bin distribution bar chart */}
      <div className="pt-2 pb-1">
        <div className="h-36 flex items-end justify-between gap-1 px-2 border-b border-slate-800">
          {bins.map((b, idx) => {
            const heightPct = Math.max(8, (b.liquidityUsdc / maxLiquidity) * 100);
            return (
              <div
                key={b.binId}
                className="flex-1 flex flex-col items-center group relative h-full justify-end"
              >
                {/* Bar */}
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full rounded-t-sm transition-all duration-300 ${
                    b.isCenter
                      ? 'bg-gradient-to-t from-teal-500 to-emerald-400 shadow-lg shadow-teal-500/30 ring-1 ring-white'
                      : 'bg-gradient-to-t from-purple-700/80 to-purple-500/80 group-hover:from-purple-500 group-hover:to-teal-400'
                  }`}
                ></div>

                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 pointer-events-none z-30 p-2 rounded-lg bg-slate-950 border border-purple-500/40 text-[10px] font-mono shadow-2xl whitespace-nowrap">
                  <div className="text-purple-300 font-bold">Bin #{b.binId}</div>
                  <div className="text-slate-300">Price: ${b.price.toFixed(2)}</div>
                  <div className="text-teal-400">Liquidity: ${b.liquidityUsdc.toFixed(0)} USDC</div>
                  {b.isCenter && <div className="text-emerald-400 font-bold mt-0.5">★ Active Pegged Bin</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* X Axis labels */}
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2 px-1">
          <span>Bid Side (-3.0%)</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span>Center Active Bin (${asset.currentPrice.toFixed(2)})</span>
          </span>
          <span>Ask Side (+3.0%)</span>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="mt-3 p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-slate-300 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11.5px]">
          Upon DBC graduation, <strong>40% of pool liquidity</strong> automatically provisions into this tightly clustered{' '}
          <span className="text-purple-300 font-semibold">Meteora DLMM</span> bin structure. This guarantees institutional stock market depth and tight bid-ask spreads for high-volume equity trading with minimal slippage.
        </p>
      </div>
    </div>
  );
};
