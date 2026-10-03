import React, { useState, useMemo } from 'react';
import { 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight,
  ArrowRight,
  Layers,
  Building,
  Zap,
  Check,
  ChevronRight,
  DollarSign,
  Lock,
  BarChart3,
  Star,
  Quote
} from 'lucide-react';
import { EquityAsset } from '../types';

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
  const [selectedFaq, setSelectedFaq] = useState<number | null>(0);

  const heroAsset = assets[0] || null;

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.underwriter.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || asset.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [assets, searchQuery, selectedCategory]);

  return (
    <div className="bg-[#07090e] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* =========================================================================
          1. HERO SECTION (Atmospheric Mountain Horizon + Floating 3-Device Mockup)
         ========================================================================= */}
      <section className="relative pt-8 pb-20 overflow-hidden">
        
        {/* Cinematic Atmospheric Mountain Background with fog and gradient fade */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1800&auto=format&fit=crop&q=80"
            alt="Atmospheric Mountain Dusk"
            className="w-full h-[680px] object-cover object-center opacity-30 mix-blend-luminosity brightness-90 filter blur-[0.5px]"
          />
          {/* Top & Bottom gradient mask blending seamlessly into pitch black #07090e */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/80 via-transparent to-[#07090e]"></div>
          {/* Subtle warm amber horizon glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[140px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7 pt-4 sm:pt-10">
          
          {/* Subtle Gold Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-amber-400/20 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-medium text-amber-300 tracking-wide font-sans">
              Smart Tokenized Asset Creation
            </span>
          </div>

          {/* Editorial Headline with Mixed Serif Italic */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto font-sans">
            Next-Gen Finance for <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal tracking-wide text-amber-100/95 font-serif">
              a Digital World
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300/85 max-w-xl mx-auto leading-relaxed font-normal">
            Experience next-generation tokenized stocks and real-world assets on Solana, powered by Meteora Dynamic Bonding Curves, DAMM v2, and DLMM.
          </p>

          {/* Action Buttons (High contrast white pill + dark glass pill) */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onOpenCreate}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-100 text-slate-950 shadow-xl shadow-white/10 transition-all active:scale-95 cursor-pointer font-sans"
            >
              <span>Launch Equity Pair</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => onNavigateTab && onNavigateTab('terminal')}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Learn More</span>
              <span className="text-slate-400 text-xs">▾</span>
            </button>
          </div>

          {/* 3-CARD FLOATING SHOWCASE (Exact match to screenshot's phone + left card + right card) */}
          <div className="relative pt-12 sm:pt-16 max-w-4xl mx-auto">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-center">
              
              {/* LEFT FLOATING GLASS CARD: Transaction History */}
              <div className="hidden md:block md:col-span-4 rounded-2xl bg-[#0f121a]/85 border border-white/[0.08] p-4 text-left shadow-2xl backdrop-blur-xl -translate-y-4 hover:-translate-y-6 transition-transform duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                  <span className="text-xs font-medium text-slate-200">Transaction History</span>
                  <span className="text-[10px] text-slate-400">All Activity</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
                        NV
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">xNVDA Syndicate</div>
                        <div className="text-[10px] text-slate-400">NASDAQ 1:1 Backed</div>
                      </div>
                    </div>
                    <div className="text-right text-xs font-mono text-emerald-400 font-bold">
                      +$55,080.00
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                        OV
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Ondo US Treasury</div>
                        <div className="text-[10px] text-slate-400">5.2% Yield Vault</div>
                      </div>
                    </div>
                    <div className="text-right text-xs font-mono text-slate-200 font-bold">
                      +$14,640.00
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">
                        SX
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">SpaceX Series N</div>
                        <div className="text-[10px] text-slate-400">Pre-IPO Syndicate</div>
                      </div>
                    </div>
                    <div className="text-right text-xs font-mono text-emerald-400 font-bold">
                      +$242,500.00
                    </div>
                  </div>
                </div>
              </div>

              {/* CENTER SMARTPHONE MOCKUP: User Portfolio Card */}
              <div className="md:col-span-4 rounded-3xl bg-[#0b0e15] border-2 border-white/[0.12] p-4 text-left shadow-2xl shadow-amber-500/5 backdrop-blur-2xl ring-1 ring-white/[0.05] relative z-20">
                {/* Smartphone Speaker notch */}
                <div className="w-16 h-1 bg-slate-800 rounded-full mx-auto mb-3"></div>

                {/* Profile header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 p-0.5">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Syndicate Lead</div>
                      <div className="text-xs font-semibold text-white">Asher Rahman</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>

                {/* Total Balance Display */}
                <div className="text-center py-3 bg-[#11151f] rounded-2xl border border-white/[0.06] mb-3">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Total Balance</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-0.5">
                    $58,893.30
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <button 
                      onClick={onOpenCreate}
                      className="px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-[11px] text-slate-200 border border-white/[0.08] transition-colors"
                    >
                      + Deposit
                    </button>
                    <button 
                      onClick={() => onNavigateTab && onNavigateTab('terminal')}
                      className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-[11px] text-slate-950 font-semibold shadow-sm transition-colors"
                    >
                      Invest ➔
                    </button>
                  </div>
                </div>

                {/* Mini Trajectory Preview */}
                <div className="p-2.5 rounded-xl bg-[#11151f] border border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-teal-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                    <span>Meteora DBC</span>
                  </div>
                  <span className="text-emerald-400 font-bold">+18.4% this week</span>
                </div>
              </div>

              {/* RIGHT FLOATING GLASS CARD: My Liquidity Plan */}
              <div className="hidden md:block md:col-span-4 rounded-2xl bg-[#0f121a]/85 border border-white/[0.08] p-4 text-left shadow-2xl backdrop-blur-xl translate-y-4 hover:translate-y-2 transition-transform duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                  <span className="text-xs font-medium text-slate-200">My Liquidity Plan</span>
                  <span className="text-[10px] text-amber-400 font-mono">Active</span>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">DAMM v2 Compounding</span>
                      <span className="text-amber-300 font-mono font-bold">$38,200</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="w-[78%] h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"></div>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">5.2% APR Yield Vault</div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">DLMM Concentrated Bins</span>
                      <span className="text-purple-300 font-mono font-bold">$20,693</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="w-[54%] h-full bg-gradient-to-r from-purple-500 to-teal-400 rounded-full"></div>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">51 Active Bins (±3% NAV)</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. LARGE EDITORIAL STATEMENT & PARTNER LOGOS
         ========================================================================= */}
      <section className="py-16 border-t border-white/[0.06] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-widest pb-4">
            <span>[ About EquiLaunch ]</span>
            <span>01 / 04</span>
          </div>

          <p className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-200 leading-[1.35] tracking-tight">
            We simplify finance with <strong className="text-white font-semibold">smart tools</strong> that help you manage, grow, and control your money. Helping you manage money better with <strong className="text-white font-semibold">modern, intuitive financial solutions</strong>.
          </p>

          {/* Minimalist Partner Logos Bar matching screenshot */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-6 opacity-60 text-slate-400 text-xs font-bold font-mono tracking-wider">
            <span className="hover:opacity-100 transition-opacity">ADOBE</span>
            <span className="hover:opacity-100 transition-opacity">FIGMA</span>
            <span className="hover:opacity-100 transition-opacity">NOTION</span>
            <span className="hover:opacity-100 transition-opacity">AMAZON</span>
            <span className="hover:opacity-100 transition-opacity">SLACK</span>
            <span className="hover:opacity-100 transition-opacity">PENDO</span>
            <span className="hover:opacity-100 transition-opacity">FRAMER</span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. BENTO GRID: "Simple Steps to Smarter Finance"
         ========================================================================= */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">[ Core Capabilities ]</div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white font-sans">
                Simple Steps to <span className="font-serif italic font-normal text-amber-100">Smarter Finance</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Automate your financial operations, track performance in real-time, and make confident decisions backed by deep insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="rounded-2xl bg-[#0d1017] border border-white/[0.08] p-6 space-y-4 hover:border-amber-400/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white">NAV Anchoring & Mint</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect official NASDAQ or tender valuation. Automatically lock 30%–85% of quote capital into a permanent redemption reserve floor.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-[#0d1017] border border-white/[0.08] p-6 space-y-4 hover:border-amber-400/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white">Fair Price Discovery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bounded Sigmoid curve ensures orderly valuation without runaway volatility. Decaying anti-snipe fees eliminate bot front-running.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-[#0d1017] border border-white/[0.08] p-6 space-y-4 hover:border-amber-400/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white">Dual-Layer Graduation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Atomic migration into 60% Meteora DAMM v2 compounding liquidity + 40% Meteora DLMM 51 concentrated bins (±3% NAV).
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. SPLIT SHOWCASE 1: "Take Control of Your Financial Future" with Gold Bar Chart
         ========================================================================= */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Copy & Stats */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">[ Analytics ]</div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight font-sans">
                Take Control of Your <br />
                <span className="font-serif italic font-normal text-amber-100">Financial Future</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Monitor live bonding curve metrics, calculate slippage, and review auto-compounding dividends across all your tokenized equity syndicates.
              </p>

              {/* Bold Stats Row */}
              <div className="flex items-center gap-8 pt-2">
                <div>
                  <div className="text-2xl font-bold font-mono text-white">50M+</div>
                  <div className="text-[11px] text-slate-400">Total Volume</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-white">4.9</div>
                  <div className="text-[11px] text-slate-400">Audit Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-white">120+</div>
                  <div className="text-[11px] text-slate-400">Tokenized Pairs</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateTab && onNavigateTab('terminal')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white hover:bg-slate-200 text-slate-950 transition-all cursor-pointer font-sans"
                >
                  <span>Explore Terminal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Luxury Dark Glass Card with Glowing Golden Bar Chart */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-[#0f121a] border border-white/[0.08] p-6 shadow-2xl backdrop-blur-xl space-y-6">
                
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Revenue / Discovery</div>
                    <div className="text-2xl font-extrabold font-mono text-white mt-0.5">$86,343.23</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    +24.8% Active
                  </span>
                </div>

                {/* THE GOLDEN BAR CHART (Exact visual match to screenshot) */}
                <div className="pt-4">
                  <div className="h-40 flex items-end justify-between gap-3 px-2 border-b border-white/[0.06] pb-2">
                    {/* Bar 1 */}
                    <div className="flex-1 bg-white/[0.06] h-[35%] rounded-md hover:bg-white/[0.1] transition-colors"></div>
                    {/* Bar 2 */}
                    <div className="flex-1 bg-white/[0.06] h-[55%] rounded-md hover:bg-white/[0.1] transition-colors"></div>
                    {/* Bar 3 */}
                    <div className="flex-1 bg-white/[0.06] h-[45%] rounded-md hover:bg-white/[0.1] transition-colors"></div>
                    {/* Bar 4: HIGHLIGHTED GOLDEN BAR (Matching screenshot exactly) */}
                    <div className="flex-1 bg-gradient-to-t from-amber-500 to-amber-400 h-[92%] rounded-md shadow-lg shadow-amber-500/30 ring-1 ring-amber-300"></div>
                    {/* Bar 5 */}
                    <div className="flex-1 bg-white/[0.06] h-[65%] rounded-md hover:bg-white/[0.1] transition-colors"></div>
                    {/* Bar 6 */}
                    <div className="flex-1 bg-white/[0.06] h-[48%] rounded-md hover:bg-white/[0.1] transition-colors"></div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-3 px-1">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span className="text-amber-400 font-bold">Thu (Peak)</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          5. SPLIT SHOWCASE 2: "Built for Individuals and Businesses" with Asset List
         ========================================================================= */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Asset / Country List Card (Matching screenshot) */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-[#0f121a] border border-white/[0.08] p-5 shadow-2xl backdrop-blur-xl space-y-3">
                
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono text-slate-400">
                  <span>Asset / Jurisdiction</span>
                  <span>Discovery Spot</span>
                </div>

                {/* Row 1: US / xNVDA */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇺🇸</span>
                    <div>
                      <div className="text-xs font-semibold text-white">United States (xNVDA)</div>
                      <div className="text-[10px] text-slate-400">Nvidia Stock Syndicate</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs font-bold text-white">$122.40</div>
                </div>

                {/* Row 2: France / xSPACEX */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇫🇷</span>
                    <div>
                      <div className="text-xs font-semibold text-white">France (xSPACEX)</div>
                      <div className="text-[10px] text-slate-400">Pre-IPO Series N</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs font-bold text-white">$104.50</div>
                </div>

                {/* Row 3: UK / xOVO */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇬🇧</span>
                    <div>
                      <div className="text-xs font-semibold text-white">United Kingdom (xOVO)</div>
                      <div className="text-[10px] text-slate-400">Ondo US Treasury Note</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs font-bold text-white">$1.002</div>
                </div>

                {/* Row 4: Germany / xTSLA */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇩🇪</span>
                    <div>
                      <div className="text-xs font-semibold text-white">Germany (xTSLA)</div>
                      <div className="text-[10px] text-slate-400">Tesla Synthetic Note</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs font-bold text-white">$244.20</div>
                </div>

                {/* Row 5: Canada / xOPENAI */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🇨🇦</span>
                    <div>
                      <div className="text-xs font-semibold text-white">Canada (xOPENAI)</div>
                      <div className="text-[10px] text-slate-400">Employee Secondary SPV</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs font-bold text-white">$141.20</div>
                </div>

              </div>
            </div>

            {/* Right Column: Copy & Checklist */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">[ Institutional Grade ]</div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight font-sans">
                Built for Individuals and <br />
                <span className="font-serif italic font-normal text-amber-100">Businesses</span>
              </h2>

              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Built for Individuals and Syndicates with 1:1 custody support</span>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Real-Time Financial Progress & NAV Anchoring against real stocks</span>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Secure and Reliable Meteora Dynamic Bonding Curve Infrastructure</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateTab && onNavigateTab('architect')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white hover:bg-slate-200 text-slate-950 transition-all cursor-pointer font-sans"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          6. PRICING / PRESET PLAN CARDS: "Select the Plan That Fits Your Needs"
         ========================================================================= */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">[ Presets & Pricing ]</div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white font-sans">
              Select the Plan That <span className="font-serif italic font-normal text-amber-100">Fits Your Needs</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            
            {/* Card 1: Starter Plan */}
            <div className="rounded-3xl bg-[#0d1017] border border-white/[0.08] p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Starter Plan</h3>
                <p className="text-xs text-slate-400 mt-1">Best for small tokenized stock launches.</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold font-mono text-white">$19</span>
                <span className="text-xs text-slate-400">/ mo</span>
              </div>

              <button
                onClick={onOpenCreate}
                className="w-full py-2.5 rounded-full text-xs font-semibold bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1] transition-all cursor-pointer"
              >
                Get Started ➔
              </button>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-slate-400" />
                  <span>Bounded Sigmoid Price Discovery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-slate-400" />
                  <span>Decaying Anti-Snipe Dynamic Fees</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reference NAV Price Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-slate-400" />
                  <span>Standard DLMM Migration</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Pro Plan (Highlighted with subtle golden glow) */}
            <div className="rounded-3xl bg-[#10131d] border border-amber-400/40 p-6 sm:p-8 space-y-6 shadow-xl shadow-amber-500/5 relative">
              <div className="absolute top-4 right-5 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-[10px] text-amber-300 font-mono">
                Popular
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Pro Plan</h3>
                <p className="text-xs text-slate-400 mt-1">For institutional syndicates & pre-IPO vaults.</p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-500 line-through font-mono">$1,200</span>
                <span className="text-3xl font-bold font-mono text-white">$399</span>
                <span className="text-xs text-slate-400">/ mo</span>
              </div>

              <button
                onClick={onOpenCreate}
                className="w-full py-2.5 rounded-full text-xs font-semibold bg-white hover:bg-slate-200 text-slate-950 shadow-md transition-all cursor-pointer font-sans"
              >
                Upgrade to Pro Plan ➔
              </button>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>Stepped Valuation Tranches</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>40% Floor Underwriting Reserve</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>Auto-Compounding DAMM v2 Pool</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>51 Active Concentrated DLMM Bins</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>Priority Institutional Support</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          7. TESTIMONIAL & SOCIAL PROOF (Warm Portrait matching screenshot)
         ========================================================================= */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-1">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">[ Testimonial ]</div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-sans">
              Take Control of Your <span className="font-serif italic font-normal text-amber-100">Financial Future</span>
            </h2>
          </div>

          <div className="rounded-3xl bg-[#0f121a] border border-white/[0.08] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-2xl">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-white/[0.1] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                alt="Marcus Sterling"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-left">
              <span className="text-amber-400 font-serif text-3xl leading-none">“</span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Everything I need to manage equity liquidity is in one place, which saves our team so much time. Meteora DBC + DLMM eliminated months of contract development.
              </p>
              <div>
                <div className="text-xs font-bold text-white">Marcus Sterling</div>
                <div className="text-[10px] text-slate-400 font-mono">Head of Digital Assets, Apex Syndicate</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. ACTIVE TOKENIZED STOCK POOLS (Interactive Trading & Navigation)
         ========================================================================= */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">[ Active Markets ]</div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-sans">
                Explore Live <span className="font-serif italic font-normal text-amber-100">Tokenized Pools</span>
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              {['all', 'stock', 'pre-ipo', 'rwa'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-white text-slate-950 font-semibold'
                      : 'bg-white/[0.05] text-slate-400 hover:text-white border border-white/[0.08]'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => onSelectAsset(asset)}
                className="rounded-2xl bg-[#0d1017] hover:bg-[#10141f] border border-white/[0.08] hover:border-amber-400/40 p-5 shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/[0.1]">
                        <img src={asset.logo} alt={asset.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white font-mono">{asset.symbol}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">{asset.name}</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                      {asset.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-4 p-2.5 rounded-xl bg-black/40 border border-white/[0.05] font-mono text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">Spot Price</div>
                      <div className="text-sm font-bold text-white">${asset.currentPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Ref NAV</div>
                      <div className="text-sm font-bold text-amber-300">${asset.referenceNav.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Graduation Milestone</span>
                      <span className="text-amber-300 font-bold">{asset.graduationProgress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        style={{ width: `${asset.graduationProgress}%` }}
                        className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">24h: ${asset.high24h}</span>
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <span>Trade on DBC</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
