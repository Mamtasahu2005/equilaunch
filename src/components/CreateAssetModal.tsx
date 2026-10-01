import React, { useState } from 'react';
import { X, Sparkles, PlusCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { EquityAsset, AssetCategory, CurveType } from '../types';
import { DBC_PRESETS } from '../constants/presets';

interface CreateAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssetCreated: (newAsset: EquityAsset) => void;
}

export const CreateAssetModal: React.FC<CreateAssetModalProps> = ({
  isOpen,
  onClose,
  onAssetCreated,
}) => {
  const [symbol, setSymbol] = useState<string>('xPLTR');
  const [name, setName] = useState<string>('Palantir Technologies Syndicate');
  const [category, setCategory] = useState<AssetCategory>('stock');
  const [underwriter, setUnderwriter] = useState<string>('Backpack Onchain & EquiVault');
  const [referenceNav, setReferenceNav] = useState<number>(38.50);
  const [initialPrice, setInitialPrice] = useState<number>(35.00);
  const [maxPrice, setMaxPrice] = useState<number>(55.00);
  const [graduationThreshold, setGraduationThreshold] = useState<number>(200000);
  const [curveType, setCurveType] = useState<CurveType>('bounded_sigmoid');
  const [quoteToken, setQuoteToken] = useState<'USDC' | 'USDY' | 'PYUSD' | 'SOL'>('USDC');
  const [description, setDescription] = useState<string>(
    '1:1 economically backed tokenized equity syndicate note tracking Palantir Technologies common stock with bounded volatility and automatic Meteora DLMM migration.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAsset: EquityAsset = {
      id: `asset-${Date.now()}`,
      symbol: symbol.toUpperCase(),
      name,
      category,
      underwriter,
      description,
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&auto=format&fit=crop&q=80',
      referenceNav,
      currentPrice: initialPrice,
      initialPrice,
      maxPrice,
      totalSupply: 1000000,
      circulatingSupply: 0,
      reserveBalance: 0,
      graduationThreshold,
      graduationProgress: 0,
      isGraduated: false,
      curveType,
      baseFee: 0.0020,
      currentDynamicFee: 0.045, // starts at 4.5% anti-snipe
      antiSnipeStartFee: 0.045,
      quoteToken,
      navDiscountPercent: ((initialPrice - referenceNav) / referenceNav) * 100,
      volume24h: 0,
      priceChange24h: 0,
      high24h: initialPrice,
      low24h: initialPrice,
      holdersCount: 1,
      poolCreatedAt: new Date().toISOString().split('T')[0],
      solanaMintAddress: `${symbol.toUpperCase()}MintSolanaAddress${Math.random().toString(36).substring(2, 6)}`,
      dbcPoolAddress: `DBCPool${symbol.toUpperCase()}${Math.random().toString(36).substring(2, 8)}`,
    };

    onAssetCreated(newAsset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0f172a] border border-teal-500/30 p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
              <PlusCircle className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Deploy Tokenized Equity DBC Pool</h2>
              <p className="text-[11px] text-slate-400">Pair tokenized assets with USDC on Meteora</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs font-mono">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Ticker Symbol</label>
              <input
                type="text"
                required
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-bold"
                placeholder="xNVDA, xSPACEX..."
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Asset Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AssetCategory)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option value="stock">Tokenized Stock (xStock)</option>
                <option value="pre-ipo">Pre-IPO Syndicate</option>
                <option value="rwa">RWA Yield / Treasury</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Full Asset Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-sans"
              placeholder="e.g. SpaceX Secondary Syndicate"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Underwriter / Custodian</label>
              <input
                type="text"
                required
                value={underwriter}
                onChange={(e) => setUnderwriter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-sans"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Quote Token</label>
              <select
                value={quoteToken}
                onChange={(e) => setQuoteToken(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option value="USDC">USDC (USD Coin)</option>
                <option value="USDY">USDY (Ondo Yield Coin)</option>
                <option value="PYUSD">PYUSD (PayPal USD)</option>
                <option value="SOL">SOL (Native)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Ref NAV ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={referenceNav}
                onChange={(e) => setReferenceNav(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-amber-400 font-bold"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Initial Spot ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={initialPrice}
                onChange={(e) => setInitialPrice(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-teal-300 font-bold"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Ceiling ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-purple-300 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Graduation Cap ($ USDC)</label>
              <input
                type="number"
                step="10000"
                required
                value={graduationThreshold}
                onChange={(e) => setGraduationThreshold(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Curve Preset</label>
              <select
                value={curveType}
                onChange={(e) => setCurveType(e.target.value as CurveType)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option value="bounded_sigmoid">Bounded Sigmoid (Equity)</option>
                <option value="stepped">Stepped Syndicate</option>
                <option value="linear_floor">Linear Soft Floor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Underwriting Disclosure</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-sans text-xs"
            />
          </div>

          {/* Migration note */}
          <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-500/20 text-slate-300 text-[11px] leading-relaxed">
            Upon reaching <strong>${graduationThreshold.toLocaleString()} {quoteToken}</strong>, the pool will automatically split: <strong>60% into Meteora DAMM v2</strong> (compounding LP) and <strong>40% into Meteora DLMM</strong> (tight bin concentration).
          </div>

          {/* Submit CTA */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Deploy DBC Pool</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
