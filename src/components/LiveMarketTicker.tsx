import React from 'react';
import { TrendingUp, TrendingDown, Layers, ShieldCheck, Zap } from 'lucide-react';
import { EquityAsset } from '../types';

interface LiveMarketTickerProps {
  assets: EquityAsset[];
}

export const LiveMarketTicker: React.FC<LiveMarketTickerProps> = ({ assets }) => {
  return (
    <div className="w-full bg-[#070b12] border-y border-slate-800/80 py-2.5 overflow-hidden select-none">
      <div className="animate-marquee flex items-center gap-8 text-xs font-mono">
        {/* Render twice for continuous loop */}
        {[...assets, ...assets].map((asset, idx) => (
          <div key={`${asset.id}-${idx}`} className="flex items-center gap-2.5 shrink-0 px-2">
            <span className="font-bold text-white tracking-wider">{asset.symbol}</span>
            <span className="text-slate-300">${asset.currentPrice.toFixed(2)}</span>
            <span
              className={`flex items-center text-[11px] font-semibold ${
                asset.priceChange24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {asset.priceChange24h >= 0 ? '+' : ''}
              {asset.priceChange24h}%
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-[10px] text-teal-400/90 font-medium">
              {asset.isGraduated ? 'Graduated to Meteora' : `DBC ${asset.graduationProgress.toFixed(0)}%`}
            </span>
            <span className="text-slate-700 mx-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
