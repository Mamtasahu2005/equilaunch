import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Sliders, 
  Code2, 
  Copy, 
  Check, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  TrendingUp,
  Percent,
  DollarSign
} from 'lucide-react';
import { DBCPreset, CurveType } from '../types';
import { DBC_PRESETS } from '../constants/presets';
import { generateMeteoraInventCliConfig, generateMeteoraTypeScriptSdkCode } from '../utils/meteoraExport';
import { calculateSpotPrice, calculateDynamicFee } from '../utils/curveMath';

export const CurveArchitect: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<DBCPreset>(DBC_PRESETS[0]);
  const [curveType, setCurveType] = useState<CurveType>(selectedPreset.curveType);
  const [initialNav, setInitialNav] = useState<number>(120);
  const [ceilingMultiplier, setCeilingMultiplier] = useState<number>(1.45);
  const [floorReservePercent, setFloorReservePercent] = useState<number>(30);
  const [graduationTarget, setGraduationTarget] = useState<number>(250000);
  const [antiSnipeFee, setAntiSnipeFee] = useState<number>(4.5);
  const [dammAllocation, setDammAllocation] = useState<number>(60);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'cli' | 'ts'>('cli');

  // Load preset parameters
  const handleSelectPreset = (preset: DBCPreset) => {
    setSelectedPreset(preset);
    setCurveType(preset.curveType);
    setCeilingMultiplier(preset.ceilingMultiplier);
    setFloorReservePercent(preset.floorReservePercent);
    setGraduationTarget(preset.graduationTargetUsdc);
    setAntiSnipeFee(preset.antiSnipeMaxFeePercent);
    setDammAllocation(preset.dammAllocationPercent);
  };

  const initialPrice = initialNav * selectedPreset.initialNavRatio;
  const maxPrice = initialNav * ceilingMultiplier;

  // Generated code snippets
  const exportPayload = {
    symbol: 'xEQUITY',
    name: 'Syndicate Equity Token',
    curveType,
    initialPrice,
    maxPrice,
    graduationTargetUsdc: graduationTarget,
    antiSnipeMaxFeePercent: antiSnipeFee,
    baseFeePercent: selectedPreset.baseFeePercent,
    dammAllocationPercent: dammAllocation,
    dlmmAllocationPercent: 100 - dammAllocation,
  };

  const cliCode = useMemo(() => generateMeteoraInventCliConfig(exportPayload), [exportPayload]);
  const tsCode = useMemo(() => generateMeteoraTypeScriptSdkCode(exportPayload), [exportPayload]);

  const handleCopy = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabName);
    setTimeout(() => setCopiedTab(null), 2500);
  };

  // Preview curve points for Mini Chart
  const svgWidth = 500;
  const svgHeight = 200;
  const padding = { top: 20, right: 25, bottom: 30, left: 45 };
  const innerW = svgWidth - padding.left - padding.right;
  const innerH = svgHeight - padding.top - padding.bottom;

  const pointsCount = 40;
  const previewPoints = useMemo(() => {
    const pts: Array<{ x: number; y: number; price: number }> = [];
    const minP = initialPrice * 0.9;
    const maxP = maxPrice * 1.05;

    for (let i = 0; i <= pointsCount; i++) {
      const fraction = i / pointsCount;
      const supply = fraction * 1000000;
      const price = calculateSpotPrice(supply, 1000000, initialPrice, maxPrice, curveType);
      const x = padding.left + fraction * innerW;
      const y = padding.top + innerH - ((price - minP) / (maxP - minP || 1)) * innerH;
      pts.push({ x, y, price });
    }
    return { pts, minP, maxP };
  }, [initialPrice, maxPrice, curveType, innerW, innerH]);

  const pathD = previewPoints.pts.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Meteora DBC Architect & Preset Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Curve Architect & Configuration Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Fine-tune bonding curves, anti-snipe decaying fees, and graduation split ratios for tokenized equities, pre-IPO vaults, or yield-bearing RWAs. Export directly to Meteora Invent CLI or TypeScript SDK.
          </p>
        </div>
      </div>

      {/* Preset Marketplace Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Select DBC Preset or Build Custom
          </h2>
          <span className="text-xs font-mono text-teal-400">4 Institutional Presets Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DBC_PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-teal-500 ring-1 ring-teal-500/50 shadow-lg shadow-teal-500/10'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white">{preset.name}</span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-teal-300 font-mono">
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {preset.tagline}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Graduation: ${(preset.graduationTargetUsdc / 1000).toFixed(0)}k</span>
                  <span className="text-teal-400 font-bold">{preset.curveType}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Studio Grid: Controls Left / Visualizer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Param Sliders (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-200">
                <Sliders className="w-4 h-4 text-teal-400" />
                <span>Curve & Fee Hyperparameters</span>
              </div>
              <span className="text-xs font-mono text-teal-400">{curveType}</span>
            </div>

            {/* Curve Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Curve Shape Primitive</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'bounded_sigmoid', label: 'Bounded Sigmoid (Equity)' },
                  { id: 'stepped', label: 'Stepped Syndicate' },
                  { id: 'linear_floor', label: 'Linear Soft Floor' },
                  { id: 'exponential', label: 'Exponential Growth' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setCurveType(type.id as CurveType)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      curveType === type.id
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Reference NAV */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Reference NAV Anchor</span>
                <span className="text-amber-400 font-bold">${initialNav.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={initialNav}
                onChange={(e) => setInitialNav(parseFloat(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>$10</span>
                <span>$500</span>
              </div>
            </div>

            {/* Slider 2: Ceiling Multiplier */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Ceiling Multiplier (Max Volatility)</span>
                <span className="text-teal-300 font-bold">{ceilingMultiplier.toFixed(2)}x (Max ${maxPrice.toFixed(2)})</span>
              </div>
              <input
                type="range"
                min="1.1"
                max="3.0"
                step="0.05"
                value={ceilingMultiplier}
                onChange={(e) => setCeilingMultiplier(parseFloat(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>1.10x (Tight)</span>
                <span>3.00x (Wide)</span>
              </div>
            </div>

            {/* Slider 3: Floor Reserve % */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Floor Underwriting Reserve</span>
                <span className="text-emerald-400 font-bold">{floorReservePercent}% permanently locked</span>
              </div>
              <input
                type="range"
                min="10"
                max="85"
                step="5"
                value={floorReservePercent}
                onChange={(e) => setFloorReservePercent(parseInt(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>10% (Flexible)</span>
                <span>85% (High Floor)</span>
              </div>
            </div>

            {/* Slider 4: Anti-Snipe Fee */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Genesis Anti-Snipe Max Fee</span>
                <span className="text-rose-400 font-bold">{antiSnipeFee.toFixed(1)}% (Decays to {selectedPreset.baseFeePercent}%)</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.5"
                value={antiSnipeFee}
                onChange={(e) => setAntiSnipeFee(parseFloat(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>1.0%</span>
                <span>10.0%</span>
              </div>
            </div>

            {/* Slider 5: Meteora DAMM v2 vs DLMM Migration Ratio */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Post-Graduation Allocation</span>
                <span className="text-purple-300 font-bold">{dammAllocation}% DAMM v2 / {100 - dammAllocation}% DLMM</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={dammAllocation}
                onChange={(e) => setDammAllocation(parseInt(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>20% DAMM / 80% DLMM</span>
                <span>80% DAMM / 20% DLMM</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Live Chart & Code Exporter (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Mini Curve Shape Visualizer */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-slate-200 tracking-wider">
                Simulated DBC Mathematical Trajectory
              </span>
              <span className="text-[11px] font-mono text-teal-400">
                Floor: ${initialPrice.toFixed(2)} → Max: ${maxPrice.toFixed(2)}
              </span>
            </div>

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto bg-slate-950 rounded-xl p-2 border border-slate-800">
              {/* Reference NAV */}
              <line
                x1={padding.left}
                y1={padding.top + innerH - ((initialNav - previewPoints.minP) / (previewPoints.maxP - previewPoints.minP)) * innerH}
                x2={padding.left + innerW}
                y2={padding.top + innerH - ((initialNav - previewPoints.minP) / (previewPoints.maxP - previewPoints.minP)) * innerH}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Curve line */}
              <path d={pathD} fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />
            </svg>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 px-1">
              <span>Genesis (0 tokens sold)</span>
              <span className="text-amber-400">Ref NAV (${initialNav.toFixed(2)})</span>
              <span>Graduation (${(graduationTarget / 1000).toFixed(0)}k USDC)</span>
            </div>
          </div>

          {/* Export Code Viewer */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveCodeTab('cli')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                    activeCodeTab === 'cli'
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Meteora Invent CLI
                </button>
                <button
                  onClick={() => setActiveCodeTab('ts')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                    activeCodeTab === 'ts'
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  TypeScript SDK
                </button>
              </div>

              <button
                onClick={() =>
                  handleCopy(
                    activeCodeTab === 'cli' ? cliCode : tsCode,
                    activeCodeTab
                  )
                }
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors"
              >
                {copiedTab === activeCodeTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Config</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <div className="relative">
              <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-56">
                <code>{activeCodeTab === 'cli' ? cliCode : tsCode}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
