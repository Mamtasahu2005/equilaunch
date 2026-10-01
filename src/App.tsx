import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StatsBanner } from './components/StatsBanner';
import { LaunchpadView } from './components/LaunchpadView';
import { TradingTerminal } from './components/TradingTerminal';
import { CurveArchitect } from './components/CurveArchitect';
import { DocsModal } from './components/DocsModal';
import { CreateAssetModal } from './components/CreateAssetModal';
import { INITIAL_ASSETS, INITIAL_TRADES } from './constants/mockData';
import { EquityAsset, Trade } from './types';
import { ExternalLink, Code2, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'launchpad' | 'terminal' | 'architect' | 'docs'>('launchpad');
  const [assets, setAssets] = useState<EquityAsset[]>(INITIAL_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState<EquityAsset>(INITIAL_ASSETS[0]);
  
  // Flatten initial trades
  const initialTradesList = Object.values(INITIAL_TRADES).flat();
  const [trades, setTrades] = useState<Trade[]>(initialTradesList);

  const [walletConnected, setWalletConnected] = useState<boolean>(true);
  const [walletBalance, setWalletBalance] = useState<number>(14250);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const handleSelectAsset = (asset: EquityAsset) => {
    setSelectedAsset(asset);
    setActiveTab('terminal');
  };

  const handleExecuteTrade = (trade: Trade, updatedAsset: EquityAsset) => {
    // Update asset in list
    setAssets((prev) => prev.map((a) => (a.id === updatedAsset.id ? updatedAsset : a)));
    setSelectedAsset(updatedAsset);
    // Prepend trade
    setTrades((prev) => [trade, ...prev]);

    // Update wallet balance
    if (trade.type === 'buy') {
      setWalletBalance((prev) => Math.max(0, prev - trade.amountQuote));
    } else {
      setWalletBalance((prev) => prev + trade.amountQuote);
    }
  };

  const handleGraduationComplete = (updatedAsset: EquityAsset) => {
    setAssets((prev) => prev.map((a) => (a.id === updatedAsset.id ? updatedAsset : a)));
    setSelectedAsset(updatedAsset);
  };

  const handleAssetCreated = (newAsset: EquityAsset) => {
    setAssets((prev) => [newAsset, ...prev]);
    setSelectedAsset(newAsset);
    setActiveTab('terminal');
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col justify-between selection:bg-teal-500 selection:text-white">
      {/* Top Navbar */}
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenCreate={() => setIsCreateOpen(true)}
          walletConnected={walletConnected}
          onToggleWallet={() => setWalletConnected(!walletConnected)}
          walletBalance={walletBalance}
        />

        {/* Global Protocol Stats Banner */}
        <StatsBanner />

        {/* Main Content Area */}
        <main className="pb-12">
          {activeTab === 'launchpad' && (
            <LaunchpadView
              assets={assets}
              onSelectAsset={handleSelectAsset}
              onOpenCreate={() => setIsCreateOpen(true)}
            />
          )}

          {activeTab === 'terminal' && (
            <TradingTerminal
              assets={assets}
              selectedAsset={selectedAsset}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              trades={trades}
              onExecuteTrade={handleExecuteTrade}
              onGraduationComplete={handleGraduationComplete}
              walletBalance={walletBalance}
            />
          )}

          {activeTab === 'architect' && <CurveArchitect />}

          {activeTab === 'docs' && <DocsModal />}
        </main>
      </div>

      {/* Creation Modal */}
      <CreateAssetModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onAssetCreated={handleAssetCreated}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider">EquiLaunch Protocol</span>
            <span>•</span>
            <span>Powered by Meteora DBC & DAMM v2</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://docs.meteora.ag/developer-guides/dbc"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-400 transition-colors flex items-center gap-1"
            >
              <span>Meteora DBC Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://docs.meteora.ag/developer-guides/damm-v2"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-400 transition-colors flex items-center gap-1"
            >
              <span>DAMM v2 Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/dannxbt"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-400 transition-colors flex items-center gap-1"
            >
              <Code2 className="w-3 h-3" />
              <span>@dannxbt (Judging Access)</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
