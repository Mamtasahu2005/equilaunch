import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Shield, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  ArrowUpRight,
  Layers,
  Building
} from 'lucide-react';
import { EquityAsset, AssetCategory } from '../types';

interface LaunchpadViewProps {
  assets: EquityAsset[];
  onSelectAsset: (asset: EquityAsset) => void;
  onOpenCreate: () => void;
}

export const LaunchpadView: React.FC<LaunchpadViewProps> = ({
  assets,
  onSelectAsset,
  onOpenCreate,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterGraduated, setFilterGraduated] = useState<string>('all');

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.underwriter.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || asset.category === selectedCategory;

      const matchesGrad =
        filterGraduated === 'all' ||
        (filterGraduated === 'graduated' && asset.isGraduated) ||
        (filterGraduated === 'bonding' && !asset.isGraduated);

      return matchesSearch && matchesCategory && matchesGrad;
    });
  }, [assets, searchQuery, selectedCategory, filterGraduated]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-[#0d1624] to-slate-950 border border-slate-800 p-8 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Meteora Dynamic Bonding Curve (DBC) & DAMM v2 Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Institutional Liquidity for <br />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
              Tokenized Stocks & RWAs
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            EquiLaunch transforms thinly traded and newly tokenized equities (xStocks, Backpack Onchain, Ondo RFQ) into high-liquidity assets. Price discovery happens on an anti-sniping <strong>Meteora DBC</strong> curve, then automatically graduates into <strong>Meteora DAMM v2</strong> compounding pools and <strong>DLMM</strong> concentrated liquidity bins.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenCreate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all shadow-lg shadow-teal-500/20 active:scale-95 cursor-pointer"
            >
              <span>Launch Tokenized Equity Pair</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="#explore-pairs"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              Explore Active Pools
            </a>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div id="explore-pairs" className="flex flex-wrap items-center justify-between gap-4 pt-4">
        
        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Pairs' },
            { id: 'stock', label: 'Tokenized Stocks' },
            { id: 'pre-ipo', label: 'Pre-IPO Syndicates' },
            { id: 'rwa', label: 'RWA Treasuries' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Graduation status */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Graduation Filter */}
          <select
            value={filterGraduated}
            onChange={(e) => setFilterGraduated(e.target.value)}
            className="bg-slate-900 text-slate-300 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-teal-400 font-mono"
          >
            <option value="all">Status: All</option>
            <option value="bonding">Active DBC Discovery</option>
            <option value="graduated">Graduated to Meteora</option>
          </select>

          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticker, name, underwriter..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 font-mono"
            />
          </div>
        </div>

      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const isGrad = asset.isGraduated;

          return (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset)}
              className="group relative rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/40 p-5 shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 group-hover:border-teal-400 transition-colors shadow-md">
                      <img src={asset.logo} alt={asset.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-white tracking-tight font-mono">
                          {asset.symbol}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {asset.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-medium line-clamp-1">{asset.name}</div>
                    </div>
                  </div>

                  {isGrad ? (
                    <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                      <CheckCircle2 className="w-3 h-3" /> Graduated
                    </span>
                  ) : (
                    <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 font-mono">
                      DBC Active
                    </span>
                  )}
                </div>

                {/* Underwriter badge */}
                <div className="text-[11px] text-slate-400 font-mono mt-3 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>Underwritten by: <strong className="text-slate-300">{asset.underwriter}</strong></span>
                </div>

                {/* Pricing & NAV Comparison */}
                <div className="grid grid-cols-2 gap-3 my-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono">
                  <div>
                    <div className="text-[10px] uppercase text-slate-400">Spot Price</div>
                    <div className="text-base font-bold text-white flex items-center gap-1.5">
                      <span>${asset.currentPrice.toFixed(2)}</span>
                      <span className={`text-[10px] font-medium ${asset.priceChange24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {asset.priceChange24h >= 0 ? '+' : ''}{asset.priceChange24h}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase text-slate-400">Reference NAV</div>
                    <div className="text-base font-bold text-amber-300">
                      ${asset.referenceNav.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {asset.navDiscountPercent >= 0 ? '+' : ''}{asset.navDiscountPercent.toFixed(1)}% vs NAV
                    </div>
                  </div>
                </div>

                {/* Bonding Curve Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Meteora Graduation Progress</span>
                    <span className="text-teal-300 font-bold">{asset.graduationProgress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, asset.graduationProgress)}%` }}
                      className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-purple-500 rounded-full transition-all duration-500"
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>${(asset.reserveBalance / 1000).toFixed(0)}k {asset.quoteToken}</span>
                    <span>Target: ${(asset.graduationThreshold / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <div className="text-slate-400">
                  Vol 24h: <strong className="text-slate-200">${(asset.volume24h / 1000).toFixed(0)}k</strong>
                </div>
                <div className="flex items-center gap-1 text-teal-400 font-semibold group-hover:text-teal-300">
                  <span>{isGrad ? 'Trade on Meteora' : 'Trade on DBC'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
