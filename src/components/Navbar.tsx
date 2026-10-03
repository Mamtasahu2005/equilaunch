import React from 'react';
import { 
  TrendingUp, 
  Layers, 
  Cpu, 
  FileCode2, 
  Wallet, 
  PlusCircle, 
  Sparkles,
  ArrowUpRight
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
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#07090e]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand matching the screenshot (Golden icon + sleek typography) */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            onClick={() => setActiveTab('launchpad')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0a0d14] rounded-[6px] flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                EquiLaunch
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 hidden sm:inline-block">
                Meteora DBC
              </span>
            </div>
          </div>

          {/* Centered Navigation Links with clean font and smooth hover */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300 tracking-wide">
            <button
              onClick={() => setActiveTab('launchpad')}
              className={`transition-colors hover:text-white ${
                activeTab === 'launchpad' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`transition-colors hover:text-white ${
                activeTab === 'terminal' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Trading Terminal
            </button>

            <button
              onClick={() => setActiveTab('architect')}
              className={`transition-colors hover:text-white ${
                activeTab === 'architect' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              DBC Presets
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`transition-colors hover:text-white ${
                activeTab === 'docs' ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              Whitepaper & Docs
            </button>
          </nav>

          {/* Right Action Buttons: Launch Pair + High Contrast White Pill Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCreate}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] border border-white/[0.1] transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Launch Pair</span>
            </button>

            {/* High-Contrast Pill Button matching screenshot 'Sign Up' */}
            <button
              onClick={onToggleWallet}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-100 text-slate-950 shadow-md transition-all active:scale-95 cursor-pointer font-sans"
            >
              <Wallet className="w-3.5 h-3.5 text-slate-950" />
              {walletConnected ? (
                <span>${walletBalance.toLocaleString()} USDC</span>
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
