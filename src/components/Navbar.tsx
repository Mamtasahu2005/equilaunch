import React from 'react';
import { 
  TrendingUp, 
  Layers, 
  Cpu, 
  FileCode2, 
  ExternalLink, 
  Wallet, 
  PlusCircle, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'launchpad' | 'terminal' | 'architect' | 'docs';
  setActiveTab: (tab: 'launchpad' | 'terminal' | 'architect' | 'docs') => void;
  onOpenCreate: () => void;
  walletConnected: boolean;
  onToggleWallet: () => void;
  walletBalance: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCreate,
  walletConnected,
  onToggleWallet,
  walletBalance,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('launchpad')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 p-[1.5px] shadow-lg shadow-teal-500/20">
              <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-teal-200 bg-clip-text text-transparent">
                  EquiLaunch
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400">
                  Meteora DBC
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Tokenized Stocks & RWAs Liquidity Protocol
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab('launchpad')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'launchpad'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Launchpad
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'terminal'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Trading Terminal
            </button>

            <button
              onClick={() => setActiveTab('architect')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'architect'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Curve Architect & Presets
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'docs'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              Whitepaper & Docs
            </button>
          </nav>

          {/* Action CTAs & Wallet */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenCreate}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-md shadow-teal-900/30 transition-all border border-teal-400/30 active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Launch Equity Pair
            </button>

            {/* Network pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Solana Mainnet</span>
            </div>

            {/* Wallet button */}
            <button
              onClick={onToggleWallet}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                walletConnected
                  ? 'bg-slate-800 border border-teal-500/40 text-teal-300 hover:bg-slate-700'
                  : 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              {walletConnected ? (
                <span className="flex items-center gap-1.5">
                  <span>${walletBalance.toLocaleString()} USDC</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-300">7x82...9eFa</span>
                </span>
              ) : (
                'Connect Wallet'
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
