import React from 'react';
import { 
  FileCode2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink, 
  Terminal,
  Zap
} from 'lucide-react';

export const DocsModal: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold mb-3">
          <FileCode2 className="w-3.5 h-3.5" />
          <span>EquiLaunch Technical Whitepaper & Meteora Architecture</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Tokenized Stock Liquidity Engine on Meteora DBC, DAMM v2 & DLMM
        </h1>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          Comprehensive architecture documentation detailing price discovery mechanics for thinly traded tokenized equities, novel sigmoid bonding curves, anti-sniping fee schedules, and dual-layer graduation into Meteora DAMM v2 and DLMM.
        </p>
      </div>

      {/* Section 1: The Problem */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5 text-base font-bold text-teal-300">
          <TrendingUp className="w-5 h-5 text-teal-400" />
          <h2>1. The Problem: Why Traditional Meme Curves Fail for Equities & RWAs</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Conventional bonding curve launchpads (e.g. pump-style curves) utilize hyper-aggressive exponential curves. While effective for memecoins seeking 100x speculative blowups, they are fatal for <strong>Tokenized Equities (xStocks, Backpack Onchain, Ondo RFQ)</strong> and <strong>Pre-IPO shares (SpaceX, OpenAI)</strong>:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono text-slate-300 pt-1">
          <li className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <strong className="text-rose-400 block mb-1">Predatory MEV Sniping:</strong>
            Bots front-run initial blocks, buying tokens cheaply and dumping immediately when retail attempts to participate.
          </li>
          <li className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <strong className="text-amber-400 block mb-1">NAV Disconnect:</strong>
            Equities have reference Net Asset Values (e.g. $125 NVDA stock). Runaway curves cause 10x divergences, rendering tokens uninvestable.
          </li>
          <li className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <strong className="text-purple-400 block mb-1">Illiquid Migration:</strong>
            Standard AMM migration leaves wide spreads that institutional equity market makers cannot service.
          </li>
        </ul>
      </div>

      {/* Section 2: Meteora DBC Novel Curve Mechanics */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5 text-base font-bold text-teal-300">
          <Cpu className="w-5 h-5 text-teal-400" />
          <h2>2. Novel Meteora DBC Configurations: Bounded Sigmoids & Soft Floors</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          EquiLaunch introduces three tailored bonding curve primitives built directly on Meteora's Dynamic Bonding Curve program:
        </p>

        <div className="space-y-3 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <h3 className="font-bold text-teal-300 font-mono text-sm mb-1">A. Bounded Sigmoid Discovery (S-Curve)</h3>
            <p className="mb-2">
              Formula: <code className="text-teal-200 font-mono bg-slate-900 px-1.5 py-0.5 rounded">P(s) = P_min + (P_max - P_min) / (1 + e^(-k(s/S - 0.45)))</code>
            </p>
            <p className="text-slate-400">
              Starts at a slight initial discount to reference NAV to encourage initial underwriting, moves smoothly through a linear discovery corridor, and flattens asymptotically at maximum cap to prevent runaway speculative bubbles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <h3 className="font-bold text-amber-300 font-mono text-sm mb-1">B. Stepped Valuation Syndicate Curve</h3>
            <p className="text-slate-400">
              Discretizes price discovery into tranches matching private equity syndicate funding tiers. Ideal for Pre-IPO secondary liquidity where rounds are closed in structured tranches.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <h3 className="font-bold text-purple-300 font-mono text-sm mb-1">C. Decaying Anti-Sniper Dynamic Fee Schedule</h3>
            <p className="mb-2">
              Formula: <code className="text-purple-200 font-mono bg-slate-900 px-1.5 py-0.5 rounded">Fee(s) = Fee_base + (Fee_max - Fee_base) * e^(-4 * s / S)</code>
            </p>
            <p className="text-slate-400">
              At pool creation (block 0), the fee is set to 4.5% - 6.0%. If an MEV sniper attempts to front-run, their profit margin is mathematically destroyed. As authentic volume flows into the curve, the dynamic fee smoothly decays to 0.20% at graduation.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Dual-Migration into DAMM v2 & DLMM */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5 text-base font-bold text-teal-300">
          <Layers className="w-5 h-5 text-teal-400" />
          <h2>3. Dual-Layer Graduation: Meteora DAMM v2 & DLMM Migration</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          When the DBC reaches its graduation threshold (e.g. $250,000 USDC raised), the liquidity does not dump into a simplistic constant product pool. Instead, EquiLaunch executes a multi-layer migration:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-500/30 space-y-2">
            <div className="flex items-center gap-2 font-bold text-teal-300 font-mono text-sm">
              <Zap className="w-4 h-4 text-teal-400" />
              <span>60% to Meteora DAMM v2</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides permanent protocol-owned liquidity. Meteora DAMM v2's dynamic fee algorithm automatically widens fees during periods of high equity market volatility and compounds fee revenues directly into the tokenized stock syndicate vault.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2">
            <div className="flex items-center gap-2 font-bold text-purple-300 font-mono text-sm">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>40% to Meteora DLMM</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provisions concentrated liquidity across 51 discrete bins centered tightly around the terminal discovery price with a bin step of 15 bps (0.15%). This gives institutional market makers depth comparable to centralized equity order books.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4: Developer Tooling & CLI Integration */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2.5 text-base font-bold text-teal-300">
          <Terminal className="w-5 h-5 text-teal-400" />
          <h2>4. One-Click CLI & SDK Tooling</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Builders can immediately export valid configuration manifests compatible with the official Meteora Invent CLI:
        </p>
        <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-teal-300 overflow-x-auto">
          <code># Launching via Meteora Invent CLI
npx @meteora-ag/invent dbc:create --config ./equilaunch-xnvda.yaml --keypair ~/.config/solana/id.json

# Interacting via TypeScript SDK
import &#123; DynamicBondingCurveClient &#125; from "@meteora-ag/dynamic-bonding-curve-sdk";
const client = new DynamicBondingCurveClient(connection);
const pool = await client.getPoolState(dbcPoolPubkey);
</code>
        </pre>
      </div>

    </div>
  );
};
