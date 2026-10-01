import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  ArrowUpRight,
  Layers,
  Building,
  Zap,
  ArrowRight,
  Lock,
  Cpu,
  BarChart3,
  DollarSign
} from 'lucide-react';
import { EquityAsset, AssetCategory } from '../types';
import { LiveMarketTicker } from './LiveMarketTicker';
import { CurveComparisonSandbox } from './CurveComparisonSandbox';
import { MeteoraLifecycleSection } from './MeteoraLifecycleSection';
import { FaqAccordion } from './FaqAccordion';

interface LaunchpadViewProps {
  assets: EquityAsset[];
  onSelectAsset: (asset: EquityAsset) => void;
  onOpenCreate: () => void;
  onNavigateTab?: (tab: 'launchpad' | 'terminal' | 'architect' | 'docs') => void;
}

export const LaunchpadView: React.FC<LaunchpadViewProps> = ({
  assets,
  onSelectAsset,
  onOpenCreate,
  onNavigateTab,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterGraduated, setFilterGraduated] = useState<string>('all');

  // Hero Quick Simulation State
  const heroAsset = assets[0] || null; // $xNVDA
  const [heroSimBought, setHeroSimBought] = useState<boolean>(false);
  const [heroPrice, setHeroPrice] = useState<number>(heroAsset ? heroAsset.currentPrice : 122.40);
  const [heroProgress, setHeroProgress] = useState<number>(heroAsset ? heroAsset.graduationProgress : 86.4);

  const handleHeroQuickBuy = () => {
    setHeroSimBought(true);
    setHeroPrice((prev) => prev + 1.25);
    setHeroProgress((prev) => Math.min(100, prev + 2.8));
    setTimeout(() => setHeroSimBought(false), 3000);
  };

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
    <div className="space-y-12">
      
      {/* 1. Live Marquee Ticker */}
      <LiveMarketTicker assets={assets} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 2. Cyberpunk / Institutional Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e1726] via-[#09101d] to-[#070b13] border border-teal-500/20 p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Ambient Glow Orbs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/15 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-300 text-xs font-mono font-medium shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Meteora DBC • DAMM v2 • DLMM Protocol</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Institutional Liquidity for <br />
                <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                  Tokenized Equities & RWAs
                </span>
              </h1>

              {/* Subheadline Thesis */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                Conventional launchpads rely on hyper-steep meme curves that invite MEV bot snipers and cause runaway volatility. <strong>EquiLaunch</strong> introduces <strong>NAV-Anchored Bounded Sigmoids</strong> on Meteora DBC with decaying anti-snipe fees, graduating atomically into <strong>Meteora DAMM v2</strong> compounding pools and <strong>DLMM</strong> concentrated liquidity bins.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenCreate}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 text-slate-950 hover:brightness-110 shadow-xl shadow-teal-500/25 transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Launch Equity Pair</span>
                </button>

                <button
                  onClick={() => heroAsset && onSelectAsset(heroAsset)}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-teal-500/40 transition-all cursor-pointer"
                >
                  <span>Open Live DBC Terminal</span>
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <div className="text-slate-400 uppercase text-[10px]">Anti-Snipe Defense</div>
                  <div className="text-sm font-bold text-white mt-0.5">100% MEV Defended</div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px]">Reference Anchor</div>
                  <div className="text-sm font-bold text-amber-300 mt-0.5">NASDAQ / Custody NAV</div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px]">Dual Migration</div>
                  <div className="text-sm font-bold text-purple-300 mt-0.5">60% DAMM / 40% DLMM</div>
                </div>
              </div>

            </div>

            {/* Right Hero Interactive Terminal Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-slate-950/90 border border-teal-500/30 p-5 shadow-2xl shadow-teal-950/40 backdrop-blur-xl space-y-4">
                
                {/* Card Top Strip */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse"></div>
                    <span className="text-xs font-bold font-mono text-white">Live Meteora DBC Engine</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30 text-teal-300">
                    Active Discovery
                  </span>
                </div>

                {/* Asset Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-teal-500/40">
                      <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80"
                        alt="Nvidia"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold font-mono text-white">xNVDA</div>
                      <div className="text-[11px] text-slate-400">Nvidia Common Stock Syndicate</div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-base font-extrabold text-teal-300">${heroPrice.toFixed(2)}</div>
                    <div className="text-[10px] text-emerald-400">+3.42% Spot</div>
                  </div>
                </div>

                {/* Mini SVG Sparkline */}
                <div className="h-20 w-full bg-slate-900/60 rounded-xl p-2 border border-slate-800/80 flex items-center justify-center relative overflow-hidden">
                  <svg viewBox="0 0 300 70" className="w-full h-full">
                    <defs>
                      <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 10 50 Q 80 48, 140 38 T 290 12"
                      fill="none"
                      stroke="url(#heroGradient)"
                      strokeWidth="2.5"
                    />
                    <circle cx="210" cy="24" r="4" fill="#14b8a6" className="animate-ping" />
                    <circle cx="210" cy="24" r="3" fill="#ffffff" />
                  </svg>
                  <div className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-500">
                    Ref NAV: $124.80
                  </div>
                </div>

                {/* Progress Bar towards Meteora Graduation */}
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Meteora Graduation Milestone</span>
                    <span className="text-teal-300 font-bold">{heroProgress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${heroProgress}%` }}
                      className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-purple-500 rounded-full transition-all duration-500"
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>$216k USDC raised</span>
                    <span>Target: $250k USDC</span>
                  </div>
                </div>

                {/* Quick Simulation Button */}
                <button
                  onClick={handleHeroQuickBuy}
                  className="w-full py-2.5 rounded-xl text-xs font-bold font-mono bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 hover:border-teal-400 shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{heroSimBought ? '✓ Trade Executed on DBC!' : '⚡ Simulate Buy $500 USDC on Curve'}</span>
                </button>

                {/* Explainer micro-strip */}
                <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1">
                  <span>Anti-Snipe Fee: <strong className="text-amber-400">0.35%</strong></span>
                  <span>Graduation: <strong className="text-purple-300">60% DAMM / 40% DLMM</strong></span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 3. Ecosystem & Infrastructure Partners Strip */}
        <section className="border-y border-slate-800/80 py-6">
          <div className="text-center text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-4">
            Built On Solana's Leading Liquidity & Tokenization Primitives
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-300 font-mono text-xs font-bold opacity-85">
            <span className="flex items-center gap-2 hover:text-teal-400 transition-colors">
              <span className="w-2.5 h-2.5 rounded-sm bg-teal-400"></span>
              METEORA DBC
            </span>
            <span className="flex items-center gap-2 hover:text-teal-400 transition-colors">
              <span className="w-2.5 h-2.5 rounded-sm bg-purple-400"></span>
              METEORA DAMM v2
            </span>
            <span className="flex items-center gap-2 hover:text-teal-400 transition-colors">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400"></span>
              METEORA DLMM
            </span>
            <span className="flex items-center gap-2 hover:text-teal-400 transition-colors">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400"></span>
              SOLANA
            </span>
            <span className="flex items-center gap-2 hover:text-teal-400 transition-colors">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400"></span>
              BACKPACK ONCHAIN
            </span>
            <span className="flex items-center gap-2 hover:text-teal-400 transition-colors">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-400"></span>
              ONDO RFQ
            </span>
          </div>
        </section>

        {/* 4. Interactive "Meme Curve vs EquiLaunch Curve" Comparison Sandbox */}
        <section>
          <CurveComparisonSandbox />
        </section>

        {/* 5. The 3-Step Meteora Architecture Lifecycle Breakdown */}
        <section>
          <MeteoraLifecycleSection />
        </section>

        {/* 6. Active Tokenized Equity Pools Grid */}
        <section id="explore-pairs" className="space-y-6 pt-4">
          
          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold mb-1">
                <span>Active Launches</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Live Tokenized Stock & Syndicate Pools
              </h2>
            </div>

            {/* Category pills */}
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
          </div>

          {/* Search & Graduation status filter */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={filterGraduated}
                onChange={(e) => setFilterGraduated(e.target.value)}
                className="bg-slate-900 text-slate-300 text-xs rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-teal-400 font-mono"
              >
                <option value="all">Status: All Pools</option>
                <option value="bonding">Active DBC Discovery</option>
                <option value="graduated">Graduated to Meteora</option>
              </select>

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

            <div className="text-xs font-mono text-slate-400">
              Showing <strong className="text-white">{filteredAssets.length}</strong> Pools
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => {
              const isGrad = asset.isGraduated;

              return (
                <div
                  key={asset.id}
                  onClick={() => onSelectAsset(asset)}
                  className="group relative rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/40 p-5 shadow-lg hover:shadow-teal-950/30 transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
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

        </section>

        {/* 7. Interactive FAQ Accordion */}
        <section>
          <FaqAccordion />
        </section>

        {/* 8. Bottom CTA Banner for Builders */}
        <section className="rounded-3xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-purple-950/40 border border-teal-500/30 p-8 sm:p-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Developer Tooling & Presets</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Innovate on Asset Creation?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Use the <strong>EquiLaunch Curve Architect</strong> to configure Bounded Sigmoids, decaying fee schedules, and export ready-to-run <strong>Meteora Invent CLI</strong> commands or TypeScript SDK code.
          </p>

          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onNavigateTab && onNavigateTab('architect')}
              className="px-6 py-3 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all shadow-lg shadow-teal-500/20 active:scale-95 cursor-pointer"
            >
              Open Curve Architect & Presets
            </button>
          </div>
        </section>

      </div>

    </div>
  );
};
