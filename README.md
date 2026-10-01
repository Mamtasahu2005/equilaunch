# 🚀 EquiLaunch

> **The Tokenized Stock & Equity Liquidity Engine on Solana**  
> *Powered by Meteora Dynamic Bonding Curve (DBC), DAMM v2, and DLMM.*

---

## 📌 Project Overview & Idea Selection

**EquiLaunch** directly solves the premier challenge highlighted by the Meteora team:  
> **"Launch Mechanics tuned for Equity / Stocks paired launches: price discovery for thinly traded or newly tokenized names (xStocks, Backpack Onchain, Ondo RFQ, and Pre-IPO syndicates)."**

While conventional launchpads (like pump-style bonding curves) are engineered for hyper-speculative meme coins with 100x exponential slopes, **traditional meme curves fail disastrously for tokenized equities and real-world assets (RWAs)**:
1. **Predatory MEV Sniping:** Bot snipers buy out the entire early curve in block 0 and dump on retail, destroying initial syndicate confidence.
2. **Runaway NAV Divergence:** Equities possess underlying Net Asset Values (e.g. $125 NVDA stock). Unbounded curves create arbitrary 10x-100x price distortions that break institutional custody and arbitrage links.
3. **Liquidity Fragmentation Post-Graduation:** Migrating blindly to simple constant-product pools leaves wide bid-ask spreads unsuited for institutional equity market makers.

**EquiLaunch introduces an institutional-grade launch primitive built natively on the Meteora stack.**

---

## 💎 Core Innovations & Meteora Stack Integration

### 1. Dynamic Bonding Curve (DBC) Custom Equity Mechanics
- **Bounded Sigmoid (S-Curve) Discovery:**
  $$\begin{aligned} P(s) = P_{floor} + \frac{P_{ceiling} - P_{floor}}{1 + e^{-k(s/S_{total} - 0.45)}} \end{aligned}$$
  Starts at an attractive initial discount to reference NAV to encourage underwriting participation, transitions into an orderly linear discovery band, and flattens asymptotically at maximum cap to avoid speculative bubbles.
- **Underwriting Floor Reserve:**
  A fixed percentage of raised quote tokens (e.g. 30%–85% USDC) is permanently locked into an unwithdrawable redemption floor.
- **Anti-Snipe Decaying Dynamic Fee Schedule:**
  Dynamic fees start high (4.5%–6.0%) during genesis blocks to eliminate MEV front-running profitability, smoothly decaying to 0.20% as authentic syndicate volume fills the pool.

### 2. Dual-Layer Graduation to Meteora DAMM v2 & DLMM
When the DBC reaches its graduation threshold (e.g., \$250,000 USDC):
- **60% Allocated to Meteora DAMM v2:**
  Forms perpetual, protocol-owned liquidity. Meteora's dynamic fee algorithm widens fees during equity volatility spikes and automatically compounds fee yield into the underwriter/syndicate vault.
- **40% Allocated to Meteora DLMM (Discrete Liquidity Market Maker):**
  Provisions concentrated liquidity across 51 discrete bins centered tightly around the terminal discovery price ($\pm 3\%$ with a 15 bps bin step), delivering institutional order book depth and minimal slippage.

### 3. DBC Config Preset Marketplace & Studio
- An interactive curve designer and marketplace for builders:
  - **Stock Discovery Sigmoid** (Blue-chip equities: xNVDA, xTSLA, xAAPL)
  - **Pre-IPO Conviction Vault** (Private equities: SpaceX, OpenAI, Anthropic)
  - **RWA Yield & Treasury Reserve** (US Treasuries, Ondo notes, private credit)
  - **High-Beta Compute Commodity** (Decentralized GPU and AI hashrate)
- **1-Click Export:**
  Generates ready-to-run manifests for the **Meteora Invent CLI** (`invent dbc:create`) and **TypeScript SDK** (`@meteora-ag/dynamic-bonding-curve-sdk`).

### 4. Live Interactive Trading Terminal & Simulation Suite
- Real-time Buy and Sell execution against the exact mathematical DBC formula.
- Interactive SVG Canvas with Reference NAV benchmark, spot price crosshairs, and dynamic fee curve.
- Real-time DLMM bin distribution preview showing post-graduation liquidity depth.
- Interactive **"Simulate Meteora Graduation"** action triggering the step-by-step on-chain migration flow with simulated PDA addresses and transaction signatures.

---

## 🏆 Alignment with Judging Criteria

| Criterion | EquiLaunch Implementation |
| :--- | :--- |
| **Depth of Meteora Integration** | Deep native usage of all 3 pillars of Meteora: **DBC** (custom curve models & dynamic fees), **DAMM v2** (compounding liquidity), and **DLMM** (concentrated active bins), plus **Invent CLI** & TypeScript SDK exports. |
| **Technical Execution** | Mathematical calculus integration for curve reserves, dynamic fee decay equations, automated graduation pipeline, and clean production React/TypeScript architecture. |
| **Originality & Taste** | Breaks away from the meme meta to unlock institutional tokenized stocks (xStocks, Backpack, Ondo) with reference NAV anchors and anti-snipe defenses. |
| **Impact Potential** | Positions Meteora as the foundational liquidity layer for the multi-trillion dollar tokenized equities and private securities market on Solana. |
| **Judging Access** | Read permissions granted for GitHub ID: `dannxbt` as requested. |

---

## 🛠️ Project Structure

```
equilaunch/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                # Brand header, network switcher, wallet connect
│   │   ├── StatsBanner.tsx           # Global protocol metrics (TVL, volume, DLMM depth)
│   │   ├── LaunchpadView.tsx         # Tokenized stock & RWA exploration grid
│   │   ├── TradingTerminal.tsx       # Live DBC trading terminal & order feed
│   │   ├── BondingCurveVisualizer.tsx # Interactive SVG curve with NAV benchmark
│   │   ├── DlmmBinPreview.tsx        # Post-graduation Meteora DLMM bin preview
│   │   ├── CurveArchitect.tsx        # DBC Preset Marketplace & Studio
│   │   ├── GraduationModal.tsx       # Multi-step DAMM v2 + DLMM migration modal
│   │   ├── CreateAssetModal.tsx      # Pair deployment wizard
│   │   └── DocsModal.tsx             # Technical whitepaper & architecture guide
│   ├── constants/
│   │   ├── presets.ts                # DBC Presets (Sigmoid, Stepped, RWA Floor)
│   │   └── mockData.ts               # Sample pairs (xNVDA, xSPACEX, xTSLA, xOVO)
│   ├── utils/
│   │   ├── curveMath.ts              # Mathematical engine for DBC, fees, & DLMM bins
│   │   └── meteoraExport.ts          # Invent CLI and TypeScript SDK code generator
│   ├── types/
│   │   └── index.ts                  # Type definitions
│   ├── App.tsx                       # Root application coordinator
│   ├── main.tsx                      # Vite React entry point
│   └── index.css                     # Tailwind CSS & glassmorphism styling
├── scripts/
│   └── meteora-launch-example.ts     # Standalone TypeScript SDK deployment script
├── equilaunch-preset.yaml            # Valid Meteora Invent CLI manifest
└── package.json
```

---

## ⚡ Quickstart & Running Locally

### 1. Prerequisites
- Node.js (v18+)
- npm or pnpm

### 2. Launch Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build Production Bundle
```bash
npm run build
```
Production assets will be built to the `dist/` directory.

---

## 🤝 Judging Access

For judging verification, GitHub user **[`dannxbt`](https://github.com/dannxbt)** has been referenced in protocol metadata and granted review access.
