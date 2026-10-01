import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Layers, 
  Zap, 
  ShieldCheck, 
  ArrowDownUp, 
  Sliders, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Building2, 
  Sparkles,
  BarChart3,
  Percent
} from 'lucide-react';
import { EquityAsset, Trade } from '../types';
import { simulateBuy, simulateSell } from '../utils/curveMath';
import { BondingCurveVisualizer } from './BondingCurveVisualizer';
import { DlmmBinPreview } from './DlmmBinPreview';
import { GraduationModal } from './GraduationModal';

interface TradingTerminalProps {
  assets: EquityAsset[];
  selectedAsset: EquityAsset;
  onSelectAsset: (asset: EquityAsset) => void;
  trades: Trade[];
  onExecuteTrade: (trade: Trade, updatedAsset: EquityAsset) => void;
  onGraduationComplete: (updatedAsset: EquityAsset) => void;
  walletBalance: number;
}

export const TradingTerminal: React.FC<TradingTerminalProps> = ({
  assets,
  selectedAsset,
  onSelectAsset,
  trades,
  onExecuteTrade,
  onGraduationComplete,
  walletBalance,
}) => {
  const [activeView, setActiveView] = useState<'curve' | 'dlmm'>('curve');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amountInput, setAmountInput] = useState<string>('500');
  const [isGraduationOpen, setIsGraduationOpen] = useState<boolean>(false);
  const [lastTradeSuccess, setLastTradeSuccess] = useState<string | null>(null);

  const numericAmount = parseFloat(amountInput) || 0;

  // Real-time Trade Simulation
  const simulation = useMemo(() => {
    if (numericAmount <= 0) return null;

    if (tradeType === 'buy') {
      return simulateBuy(
        numericAmount,
        selectedAsset.circulatingSupply,
        selectedAsset.totalSupply,
        selectedAsset.initialPrice,
        selectedAsset.maxPrice,
        selectedAsset.curveType,
        selectedAsset.antiSnipeStartFee,
        selectedAsset.baseFee
      );
    } else {
      return simulateSell(
        numericAmount,
        selectedAsset.circulatingSupply,
        selectedAsset.totalSupply,
        selectedAsset.initialPrice,
        selectedAsset.maxPrice,
        selectedAsset.curveType,
        selectedAsset.antiSnipeStartFee,
        selectedAsset.baseFee
      );
    }
  }, [numericAmount, tradeType, selectedAsset]);

  // Execute trade handler
  const handleExecuteTrade = () => {
    if (!simulation || numericAmount <= 0) return;

    const isBuy = tradeType === 'buy';
    const tokensDiff = isBuy ? (simulation as any).tokensOut : -numericAmount;
    const quoteDiff = isBuy ? numericAmount : -(simulation as any).quoteOut;

    const newCirculating = Math.max(0, Math.min(selectedAsset.totalSupply, selectedAsset.circulatingSupply + tokensDiff));
    const newReserve = Math.max(0, selectedAsset.reserveBalance + quoteDiff);
    const newPrice = simulation.newPrice;
    const newGradProgress = Math.min(100, (newReserve / selectedAsset.graduationThreshold) * 100);

    const updatedAsset: EquityAsset = {
      ...selectedAsset,
      circulatingSupply: newCirculating,
      reserveBalance: newReserve,
      currentPrice: newPrice,
      graduationProgress: newGradProgress,
      isGraduated: newGradProgress >= 100 || selectedAsset.isGraduated,
      currentDynamicFee: isBuy ? (simulation as any).feePaid / numericAmount : selectedAsset.currentDynamicFee,
      volume24h: selectedAsset.volume24h + (isBuy ? numericAmount : (simulation as any).quoteOut),
    };

    const newTrade: Trade = {
      id: `tx-${Date.now()}`,
      assetId: selectedAsset.id,
      type: tradeType,
      amountTokens: isBuy ? (simulation as any).tokensOut : numericAmount,
      amountQuote: isBuy ? numericAmount : (simulation as any).quoteOut,
      pricePerToken: simulation.avgPrice,
      dynamicFeePaid: simulation.feePaid,
      timestamp: Date.now(),
      txHash: `${Math.random().toString(36).substring(2, 6).toUpperCase()}...${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      trader: '7x82...9eFa',
    };

    onExecuteTrade(newTrade, updatedAsset);
    setLastTradeSuccess(`Executed ${tradeType.toUpperCase()} of ${newTrade.amountTokens.toFixed(2)} ${selectedAsset.symbol} @ $${simulation.avgPrice.toFixed(2)}`);
    setTimeout(() => setLastTradeSuccess(null), 4000);
  };

  const assetTrades = trades.filter((t) => t.assetId === selectedAsset.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Asset Selector & Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        {/* Asset selection pill dropdown */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl overflow-hidden border border-teal-500/40 shadow-md">
            <img src={selectedAsset.logo} alt={selectedAsset.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <select
                value={selectedAsset.id}
                onChange={(e) => {
                  const found = assets.find((a) => a.id === e.target.value);
                  if (found) onSelectAsset(found);
                }}
                className="bg-slate-800 text-white font-bold text-lg rounded-lg px-2.5 py-0.5 border border-slate-700 focus:outline-none focus:border-teal-400 font-mono cursor-pointer"
              >
                {assets.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.symbol} - {a.name}
                  </option>
                ))}
              </select>

              {selectedAsset.isGraduated ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" /> Graduated to Meteora
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30 font-mono">
                  DBC Discovery Phase
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
              <span>Underwriter: <strong className="text-slate-200">{selectedAsset.underwriter}</strong></span>
              <span>•</span>
              <span className="capitalize text-teal-300 font-medium">{selectedAsset.category}</span>
            </div>
          </div>
        </div>

        {/* Quick Financial Indicators */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Spot Price</div>
            <div className="text-lg font-bold text-white flex items-center gap-1">
              <span>${selectedAsset.currentPrice.toFixed(2)}</span>
              <span className={`text-[11px] font-medium ${selectedAsset.priceChange24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {selectedAsset.priceChange24h >= 0 ? '+' : ''}{selectedAsset.priceChange24h}%
              </span>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Reference NAV</div>
            <div className="text-base font-bold text-amber-300">
              ${selectedAsset.referenceNav.toFixed(2)}
            </div>
            <div className="text-[10px] text-slate-400">
              {selectedAsset.navDiscountPercent >= 0 ? '+' : ''}{selectedAsset.navDiscountPercent.toFixed(1)}% vs NAV
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Bonding Curve Progress</div>
            <div className="text-base font-bold text-purple-300">
              {selectedAsset.graduationProgress.toFixed(1)}%
            </div>
            <div className="text-[10px] text-slate-400">
              ${(selectedAsset.reserveBalance / 1000).toFixed(0)}k / ${(selectedAsset.graduationThreshold / 1000).toFixed(0)}k USDC
            </div>
          </div>

          {/* Trigger Graduation CTA */}
          {!selectedAsset.isGraduated && (
            <button
              onClick={() => setIsGraduationOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-500 hover:to-teal-400 text-white shadow-lg shadow-purple-900/30 transition-all border border-purple-400/30 animate-pulse cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate Meteora Graduation</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Terminal Layout: Left Chart / Right Trade Slip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Visualizers & Depth (7 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Switcher Tab between DBC Curve and DLMM Active Bins */}
          <div className="flex items-center justify-between bg-slate-900/70 p-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveView('curve')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'curve'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                DBC Price Discovery Curve
              </button>

              <button
                onClick={() => setActiveView('dlmm')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeView === 'dlmm'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Meteora DLMM Graduation Bins Preview
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-400 hidden sm:flex items-center gap-2 pr-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Quote: <strong>{selectedAsset.quoteToken}</strong></span>
            </div>
          </div>

          {/* Active View Component */}
          {activeView === 'curve' ? (
            <BondingCurveVisualizer
              asset={selectedAsset}
              simulatedSupply={simulation ? (simulation as any).newSupplySold : undefined}
              simulatedPrice={simulation ? simulation.newPrice : undefined}
            />
          ) : (
            <DlmmBinPreview asset={selectedAsset} />
          )}

          {/* Underwriter Details & Liquidity Blueprint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Description & Tokenomics */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-300 tracking-wider">
                <Building2 className="w-4 h-4 text-teal-400" />
                <span>Asset Specification & Underwriting</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedAsset.description}
              </p>
              <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                <div>Total Supply: <span className="text-slate-200">{selectedAsset.totalSupply.toLocaleString()}</span></div>
                <div>Circulating: <span className="text-slate-200">{selectedAsset.circulatingSupply.toLocaleString()}</span></div>
                <div>Holders: <span className="text-slate-200">{selectedAsset.holdersCount}</span></div>
                <div>24h High/Low: <span className="text-slate-200">${selectedAsset.high24h} / ${selectedAsset.low24h}</span></div>
              </div>
            </div>

            {/* Meteora Integration Specs */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-300 tracking-wider">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Meteora Dual-Migration Blueprint</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">DAMM v2 Allocation:</span>
                  <span className="font-mono text-teal-300 font-bold">60% (${(selectedAsset.graduationThreshold * 0.6).toLocaleString()} USDC)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">DLMM Bin Allocation:</span>
                  <span className="font-mono text-purple-300 font-bold">40% (${(selectedAsset.graduationThreshold * 0.4).toLocaleString()} USDC)</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Anti-Snipe Dynamic Fee:</span>
                  <span className="font-mono text-amber-300 font-bold">{(selectedAsset.currentDynamicFee * 100).toFixed(2)}% (Decaying)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Recent Trades Table */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-300 tracking-wider">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>Live DBC On-Chain Order Feed</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Auto-streaming</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Tokens</th>
                    <th className="pb-2">Quote Value</th>
                    <th className="pb-2">Exec Price</th>
                    <th className="pb-2">Dynamic Fee</th>
                    <th className="pb-2">Trader / Tx</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {assetTrades.slice(0, 5).map((t) => (
                    <tr key={t.id} className="text-slate-300 hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            t.type === 'buy'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {t.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2.5 text-white font-medium">
                        {t.amountTokens.toLocaleString(undefined, { maximumFractionDigits: 2 })} {selectedAsset.symbol}
                      </td>
                      <td className="py-2.5">${t.amountQuote.toLocaleString(undefined, { maximumFractionDigits: 2 })} USDC</td>
                      <td className="py-2.5 font-bold text-teal-300">${t.pricePerToken.toFixed(2)}</td>
                      <td className="py-2.5 text-amber-400">${t.dynamicFeePaid.toFixed(2)}</td>
                      <td className="py-2.5 text-slate-400 text-[11px]">{t.txHash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Trading Slip (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl bg-slate-900/90 border border-teal-500/30 p-5 shadow-2xl space-y-5">
            
            {/* Buy / Sell Toggle Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setTradeType('buy')}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  tradeType === 'buy'
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Buy {selectedAsset.symbol}
              </button>
              <button
                onClick={() => setTradeType('sell')}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  tradeType === 'sell'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sell {selectedAsset.symbol}
              </button>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>{tradeType === 'buy' ? 'Pay Amount' : 'Sell Amount'}</span>
                <span>Balance: <strong className="text-slate-200">${walletBalance.toLocaleString()} {tradeType === 'buy' ? 'USDC' : selectedAsset.symbol}</strong></span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl py-3 pl-3 pr-20 text-white font-mono text-lg font-bold focus:outline-none focus:ring-1 focus:ring-teal-400"
                  placeholder="0.00"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 font-mono text-xs font-bold text-slate-300">
                  <span>{tradeType === 'buy' ? selectedAsset.quoteToken : selectedAsset.symbol}</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex gap-2">
                {[100, 500, 2500, 10000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmountInput(preset.toString())}
                    className="flex-1 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-[11px] font-mono text-slate-300 hover:text-white transition-colors"
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Execution Simulation Breakdown */}
            {simulation && (
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Est. Received:</span>
                  <span className="font-bold text-teal-300 text-sm">
                    {tradeType === 'buy'
                      ? `${(simulation as any).tokensOut.toFixed(2)} ${selectedAsset.symbol}`
                      : `$${(simulation as any).quoteOut.toFixed(2)} USDC`}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Avg Execution Price:</span>
                  <span className="font-semibold text-white">${simulation.avgPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Price Impact:</span>
                  <span className={`font-semibold ${simulation.priceImpactPercent > 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    +{simulation.priceImpactPercent.toFixed(2)}%
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300 pt-1.5 border-t border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                    <span>Dynamic Anti-Snipe Fee:</span>
                  </span>
                  <span className="text-amber-400 font-bold">${simulation.feePaid.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Notification alert on success */}
            {lastTradeSuccess && (
              <div className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 text-teal-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-400" />
                <span>{lastTradeSuccess}</span>
              </div>
            )}

            {/* Action CTA Button */}
            <button
              onClick={handleExecuteTrade}
              disabled={numericAmount <= 0}
              className={`w-full py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-98 cursor-pointer ${
                tradeType === 'buy'
                  ? 'bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 text-slate-950 hover:brightness-110 shadow-teal-500/20'
                  : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:brightness-110 shadow-rose-500/20'
              }`}
            >
              {tradeType === 'buy' ? `Buy ${selectedAsset.symbol}` : `Sell ${selectedAsset.symbol}`}
            </button>

            {/* Anti-Sniping Protection Explainer Card */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-200 font-semibold font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Meteora Dynamic Fee Schedule Active</span>
              </div>
              <p>
                Fees decay smoothly as bonding curve fills. Early bot sniping is mathematically disincentivized while institutional liquidity accrues into Meteora DAMM v2.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Graduation Modal Component */}
      <GraduationModal
        asset={selectedAsset}
        isOpen={isGraduationOpen}
        onClose={() => setIsGraduationOpen(false)}
        onGraduationComplete={(updated) => {
          onGraduationComplete(updated);
          setIsGraduationOpen(false);
        }}
      />
    </div>
  );
};
