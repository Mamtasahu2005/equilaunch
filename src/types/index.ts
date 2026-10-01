export type AssetCategory = 'stock' | 'pre-ipo' | 'rwa' | 'syndicate';

export type CurveType = 'bounded_sigmoid' | 'linear_floor' | 'exponential' | 'stepped';

export interface EquityAsset {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  underwriter: string;
  description: string;
  logo: string;
  referenceNav: number;
  currentPrice: number;
  initialPrice: number;
  maxPrice: number;
  totalSupply: number;
  circulatingSupply: number;
  reserveBalance: number; // Quote token locked in DBC
  graduationThreshold: number; // e.g. 250,000 USDC
  graduationProgress: number; // 0 to 100
  isGraduated: boolean;
  graduatedAt?: string;
  dammPoolAddress?: string;
  dlmmPoolAddress?: string;
  curveType: CurveType;
  baseFee: number; // e.g. 0.0025 (0.25%)
  currentDynamicFee: number; // dynamic fee in effect
  antiSnipeStartFee: number; // e.g. 0.05 (5%)
  quoteToken: 'USDC' | 'USDY' | 'PYUSD' | 'SOL';
  navDiscountPercent: number; // percentage difference from NAV
  volume24h: number;
  priceChange24h: number;
  high24h: number;
  low24h: number;
  holdersCount: number;
  poolCreatedAt: string;
  solanaMintAddress: string;
  dbcPoolAddress: string;
}

export interface DBCPreset {
  id: string;
  name: string;
  tagline: string;
  category: 'equity' | 'pre-ipo' | 'rwa' | 'experimental';
  curveType: CurveType;
  description: string;
  recommendedFor: string;
  initialNavRatio: number; // Starting price as % of NAV
  ceilingMultiplier: number; // Max price cap
  floorReservePercent: number; // % of funds kept in permanent NAV floor
  graduationTargetUsdc: number;
  antiSnipeMaxFeePercent: number; // Initial fee for snipers
  baseFeePercent: number; // Final trading fee
  dammAllocationPercent: number; // % liquidity to DAMM v2
  dlmmAllocationPercent: number; // % liquidity to DLMM
  dlmmBinStepBps: number;
  dlmmConcentrationBins: number;
  codeSnippetCli: string;
  codeSnippetTs: string;
}

export interface Trade {
  id: string;
  assetId: string;
  type: 'buy' | 'sell';
  amountTokens: number;
  amountQuote: number;
  pricePerToken: number;
  dynamicFeePaid: number;
  timestamp: number;
  txHash: string;
  trader: string;
}

export interface GraduationState {
  isMigrating: boolean;
  step: 'idle' | 'closing_curve' | 'funding_damm_v2' | 'seeding_dlmm_bins' | 'complete';
  dammPoolAddress?: string;
  dlmmPoolAddress?: string;
  txSignature?: string;
  dammLiquidityUsdc?: number;
  dlmmLiquidityUsdc?: number;
  tokensToDamm?: number;
  tokensToDlmm?: number;
}
