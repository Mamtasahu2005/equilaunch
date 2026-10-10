import React from 'react';
import { 
  ChevronDown, 
  Wallet, 
  PlusCircle, 
  TrendingUp,
  Sparkles
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
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand matching reference ('LeBank' font style -> 'EquiLaunch') */}
          <div 
            className="flex items-center gap-2 cursor-pointer select-none group"
            onClick={() => setActiveTab('launchpad')}
          >
            <span className="font-extrabold text-2xl tracking-tight text-[#1e2432] font-sans">
              EquiLaunch
            </span>
          </div>

          {/* Centered Navigation Links with subtle dropdown arrows */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('launchpad')}
              className={`transition-colors hover:text-slate-950 ${
                activeTab === 'launchpad' ? 'text-slate-950 font-bold' : 'text-slate-600'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1 transition-colors hover:text-slate-950 ${
                activeTab === 'terminal' ? 'text-slate-950 font-bold' : 'text-slate-600'
              }`}
            >
              <span>Features</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('architect')}
              className={`flex items-center gap-1 transition-colors hover:text-slate-950 ${
                activeTab === 'architect' ? 'text-slate-950 font-bold' : 'text-slate-600'
              }`}
            >
              <span>Solutions</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('architect')}
              className={`transition-colors hover:text-slate-950 ${
                activeTab === 'architect' ? 'text-slate-950 font-bold' : 'text-slate-600'
              }`}
            >
              Resources
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`transition-colors hover:text-slate-950 ${
                activeTab === 'docs' ? 'text-slate-950 font-bold' : 'text-slate-600'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Button matching reference ('Explore' dark pill) */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCreate}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100/80 hover:bg-slate-200/80 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Launch Pair</span>
            </button>

            <button
              onClick={onToggleWallet}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-[#2d343e] hover:bg-slate-900 text-white shadow-sm transition-all active:scale-95 cursor-pointer font-sans"
            >
              {walletConnected ? (
                <span>${walletBalance.toLocaleString()} USDC</span>
              ) : (
                'Explore'
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
