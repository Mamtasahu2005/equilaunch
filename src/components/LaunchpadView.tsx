import React, { useState, useMemo } from 'react';
import { 
  ArrowUpRight, 
  Search, 
  TrendingUp, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Zap, 
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { EquityAsset } from '../types';
import hero3dZero from '../assets/hero_3d_zero.jpg';
import heroLifestyle from '../assets/hero_lifestyle.jpg';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [emailInput, setEmailInput] = useState<string>('');
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesCategory =
        selectedCategory === 'all' || asset.category === selectedCategory;
      return matchesCategory;
    });
  }, [assets, selectedCategory]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubmitted(true);
    setTimeout(() => {
      if (onNavigateTab) onNavigateTab('terminal');
    }, 800);
  };

  return (
    <div className="bg-[#fcfdff] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. HERO SECTION (Matching 'LeBank' Reference Layout & Palette) */}
      <section className="relative pt-6 sm:pt-12 pb-20 overflow-hidden">
        
        {/* Soft Lavender / Periwinkle Glow Blob in Top-Left (Exact reference ambiance) */}
        <div 
          className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full pointer-events-none select-none blur-[90px] opacity-75 z-0"
          style={{
            background: 'radial-gradient(circle, rgba(199, 215, 254, 0.9) 0%, rgba(224, 231, 255, 0.6) 40%, rgba(245, 247, 255, 0) 70%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Minimal Copy, Action Buttons, Input Pill & Stats */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* Bold Sans-Serif Headline */}
              <h1 className="text-5xl sm:text-7xl lg:text-[76px] font-extrabold tracking-tight text-[#1e2432] leading-[1.05]">
                Smarter Finance <br />
                <span className="text-[#1e2432]">in Your Pocket</span>
              </h1>

              {/* Minimalist Subtitle (Less text, clean & punchy) */}
              <p className="text-base sm:text-lg text-slate-500 max-w-lg leading-relaxed font-normal">
                Tokenized stocks and pre-IPO equities on Solana, powered by Meteora Dynamic Bonding Curves and DAMM v2. Trade 24/7 with instant liquidity.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  onClick={onOpenCreate}
                  className="px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-[#3b5bf5] hover:bg-[#2b4be5] shadow-lg shadow-blue-500/25 active:scale-95 transition-all cursor-pointer"
                >
                  Open an Account
                </button>

                <button
                  onClick={() => onNavigateTab && onNavigateTab('terminal')}
                  className="px-8 py-3.5 rounded-full text-sm sm:text-base font-medium text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  Contact Us
                </button>
              </div>

              {/* Email / Mint Input Pill Bar */}
              <form 
                onSubmit={handleEmailSubmit}
                className="mt-6 max-w-md w-full bg-white rounded-full p-1.5 pl-6 flex items-center justify-between border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
              >
                <input
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={emailSubmitted ? "Welcome! Launching..." : "Your Email here"}
                  className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none pr-3"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#2d343e] hover:bg-black text-white whitespace-nowrap active:scale-95 transition-all cursor-pointer"
                >
                  {emailSubmitted ? "Redirecting..." : "Get Started Free"}
                </button>
              </form>

              {/* Two Bold Metric Stats (Matching 6.3K & 1000+ from reference) */}
              <div className="flex items-center gap-12 sm:gap-16 pt-4">
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-[#1e2432] tracking-tight font-sans">
                    6.3K
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                    Invest in Your Future Today
                  </div>
                </div>

                <div>
                  <div className="text-4xl sm:text-5xl font-black text-[#1e2432] tracking-tight font-sans">
                    1000+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                    Banking Made Human.
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Stack (3D Chrome 0% & Lifestyle Card with Cutout ↗ Buttons) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Top Visual Card: 3D Chrome 0% Render with Royal Blue Backdrop & Top-Left ↗ Cutout */}
              <div className="rounded-[2.4rem] relative overflow-hidden bg-gradient-to-br from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] shadow-2xl aspect-[1.12/1] flex items-center justify-center group">
                
                {/* Floating Top-Left Dark Circle Button with ↗ Arrow (Exact Reference Accent) */}
                <div className="absolute top-4 left-4 z-20">
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('terminal')}
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#2d343e] hover:bg-black text-white flex items-center justify-center text-xl transition-transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
                    title="Explore Trading Terminal"
                  >
                    <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
                  </button>
                </div>

                {/* 3D Chrome Metallic Image */}
                <img
                  src={hero3dZero}
                  alt="0% NAV Drift Meteora DBC Vault"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                  fetchPriority="high"
                />

                {/* Subtle Glass Tag Overlay */}
                <div className="absolute bottom-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold">
                  0% NAV Drift
                </div>
              </div>

              {/* Bottom Visual Card: Friendly Lifestyle Photo with Bottom-Right ↗ Cutout */}
              <div className="rounded-[2rem] relative overflow-hidden bg-slate-100 shadow-xl aspect-[2.35/1] group">
                
                {/* Lifestyle Image */}
                <img
                  src={heroLifestyle}
                  alt="EquiLaunch Mobile Trader"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                />

                {/* Floating Bottom-Right Dark Circle Button with ↗ Arrow (Exact Reference Accent) */}
                <div className="absolute bottom-3.5 right-3.5 z-20">
                  <button
                    onClick={onOpenCreate}
                    className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#2d343e] hover:bg-black text-white flex items-center justify-center text-xl transition-transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
                    title="Launch Equity Pair"
                  >
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                  </button>
                </div>

                {/* Quick Info Pill */}
                <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/80 text-slate-800 text-xs font-medium">
                  Instant Mobile Execution
                </div>
              </div>

            </div>

          </div>

          {/* 2. MINIMALIST MONOCHROME PARTNER LOGOS STRIP (Directly Matching Reference) */}
          <div className="mt-20 pt-10 border-t border-slate-200/80">
            <div className="flex flex-wrap items-center justify-between gap-8 text-slate-400 font-bold tracking-wider">
              
              {/* Zoom */}
              <div className="flex items-center gap-1.5 hover:text-slate-700 transition-colors cursor-default">
                <span className="text-xl sm:text-2xl font-black font-sans lowercase">zoom</span>
              </div>

              {/* ASUS */}
              <div className="flex items-center gap-1.5 hover:text-slate-700 transition-colors cursor-default">
                <span className="text-lg sm:text-xl font-black font-sans uppercase tracking-widest">ASUS</span>
              </div>

              {/* AECOM */}
              <div className="flex items-center gap-1.5 hover:text-slate-700 transition-colors cursor-default">
                <span className="text-base sm:text-lg font-black font-sans uppercase tracking-widest">AECOM</span>
              </div>

              {/* NIKE */}
              <div className="flex items-center gap-1.5 hover:text-slate-700 transition-colors cursor-default">
                <svg className="w-12 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M21.707 5.293c-.391-.391-1.023-.391-1.414 0l-14 14c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l14-14c.391-.391.391-1.023 0-1.414z" opacity="0" />
                  <path d="M8.2 17.5c-4.2 0-7.2-2.8-7.2-5.4 0-3.3 4.5-4.5 7.9-3.8 2.3.5 6.4 2.2 13.9-3.8-3.4 5.9-9.5 13-14.6 13z" />
                </svg>
              </div>

              {/* Stripe */}
              <div className="flex items-center gap-1.5 hover:text-slate-700 transition-colors cursor-default">
                <span className="text-xl sm:text-2xl font-extrabold font-sans lowercase">stripe</span>
              </div>

              {/* Solana */}
              <div className="flex items-center gap-1.5 hover:text-slate-700 transition-colors cursor-default">
                <span className="text-sm sm:text-base font-bold font-mono uppercase tracking-wider text-slate-400">SOLANA</span>
              </div>

              {/* Meteora */}
              <div className="flex items-center gap-1.5 hover:text-slate-700 transition-colors cursor-default">
                <span className="text-sm sm:text-base font-bold font-mono uppercase tracking-wider text-slate-400">METEORA</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. ACTIVE TOKENIZED EQUITIES (Clean Light Cards) */}
      <section className="py-16 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
                Live Liquidity Discovery
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e2432] tracking-tight">
                Featured Equity Pairs
              </h2>
            </div>
            
            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              {['all', 'us_tech', 'pre_ipo', 'treasury'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all capitalize cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#2d343e] text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Asset Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAssets.map((asset) => {
              const progress = Math.min(
                100,
                Math.round((asset.circulatingSupply / (asset.totalSupply * 0.75)) * 100)
              );

              return (
                <div
                  key={asset.id}
                  onClick={() => onSelectAsset(asset)}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Logo, Ticker, Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                        <img
                          src={asset.logo}
                          alt={asset.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 capitalize">
                        {asset.category.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-lg font-bold text-[#1e2432]">
                      {asset.symbol}
                    </div>
                    <div className="text-xs text-slate-500 mb-4 line-clamp-1">
                      {asset.name}
                    </div>

                    {/* Price & Change */}
                    <div className="flex items-baseline justify-between mb-4">
                      <div className="text-2xl font-black text-[#1e2432] font-mono">
                        ${asset.currentPrice.toFixed(2)}
                      </div>
                      <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        +{asset.priceChange24h.toFixed(1)}%
                      </div>
                    </div>

                    {/* Bonding Curve Progress */}
                    <div className="space-y-1.5 mb-6">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Curve Progress</span>
                        <span className="font-semibold text-slate-800">{progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    <span>Trade on Terminal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. THREE CORE PILLARS (Clean Bento Grid) */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e2432] tracking-tight">
              Built on Meteora Primitives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-blue-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-blue-500/20">
                01
              </div>
              <h3 className="text-xl font-bold text-[#1e2432]">Floor-Anchored DBC</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Dynamic Bonding Curves calculate price using Sigmoid and Exponential curves anchored to verified NAV.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-blue-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-indigo-500/20">
                02
              </div>
              <h3 className="text-xl font-bold text-[#1e2432]">DAMM v2 Graduation</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Upon reaching the liquidity target, 60% of reserves migrate into Meteora DAMM v2, and 40% into active DLMM concentrated bins.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-blue-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold text-base shadow-md">
                03
              </div>
              <h3 className="text-xl font-bold text-[#1e2432]">Zero NAV Drift</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Automated dynamic fee adjustment defends token holders against front-running and arbitrage desynchronization.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. MINIMAL CTA BANNER */}
      <section className="py-16 bg-[#1e2432] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Launch Your Tokenized Equity Today
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm sm:text-base">
            Meteora Dynamic Bonding Curves provide guaranteed initial liquidity, non-custodial custody, and automated DEX graduation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenCreate}
              className="px-8 py-3.5 rounded-full text-sm font-semibold bg-[#3b5bf5] hover:bg-[#2b4be5] text-white shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
            >
              Launch Equity Pair
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('terminal')}
              className="px-8 py-3.5 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all cursor-pointer"
            >
              Open Trading Terminal
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
