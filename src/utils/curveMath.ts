import { CurveType } from '../types';

/**
 * Calculates the instant spot price for a given supply sold using the selected DBC curve model.
 */
export function calculateSpotPrice(
  supplySold: number,
  totalSupply: number,
  initialPrice: number,
  maxPrice: number,
  curveType: CurveType
): number {
  const fraction = Math.max(0, Math.min(1, supplySold / totalSupply));

  switch (curveType) {
    case 'bounded_sigmoid': {
      // Sigmoid curve centered at 50% supply, bounded between initialPrice and maxPrice
      // P(s) = P_min + (P_max - P_min) / (1 + exp(-k * (fraction - 0.45)))
      const k = 7; // steepness
      const sigmoid = 1 / (1 + Math.exp(-k * (fraction - 0.45)));
      // Normalize so at fraction = 0 it matches initialPrice
      const minSig = 1 / (1 + Math.exp(-k * (0 - 0.45)));
      const maxSig = 1 / (1 + Math.exp(-k * (1 - 0.45)));
      const normalized = (sigmoid - minSig) / (maxSig - minSig);
      return initialPrice + (maxPrice - initialPrice) * normalized;
    }

    case 'linear_floor': {
      // Linear curve starting at initialPrice with a soft floor
      return initialPrice + (maxPrice - initialPrice) * fraction;
    }

    case 'exponential': {
      // Exponential growth curve: P(s) = initialPrice * (maxPrice / initialPrice)^fraction
      return initialPrice * Math.pow(maxPrice / initialPrice, fraction);
    }

    case 'stepped': {
      // Stepped Dutch auction-style curve (common for syndicate pre-IPO rounds)
      const steps = 5;
      const stepIndex = Math.min(steps - 1, Math.floor(fraction * steps));
      const stepDelta = (maxPrice - initialPrice) / (steps - 1);
      return initialPrice + stepIndex * stepDelta;
    }

    default:
      return initialPrice + (maxPrice - initialPrice) * fraction;
  }
}

/**
 * Calculates the dynamic anti-sniping trading fee based on current progress.
 * Higher early fee discourages MEV bots from front-running initial launches.
 */
export function calculateDynamicFee(
  progressFraction: number,
  startFee: number = 0.05, // 5%
  baseFee: number = 0.0025 // 0.25%
): number {
  // Smooth exponential decay from startFee down to baseFee
  const decayFactor = Math.exp(-4 * progressFraction);
  return baseFee + (startFee - baseFee) * decayFactor;
}

/**
 * Simulates a BUY trade against the curve:
 * Given an amount of Quote Tokens (e.g. USDC), calculates tokens received and average price.
 */
export function simulateBuy(
  quoteAmount: number,
  currentSupplySold: number,
  totalSupply: number,
  initialPrice: number,
  maxPrice: number,
  curveType: CurveType,
  startFee: number,
  baseFee: number
): {
  tokensOut: number;
  avgPrice: number;
  feePaid: number;
  newSupplySold: number;
  newPrice: number;
  priceImpactPercent: number;
} {
  const currentPrice = calculateSpotPrice(currentSupplySold, totalSupply, initialPrice, maxPrice, curveType);
  const progress = currentSupplySold / totalSupply;
  const currentFee = calculateDynamicFee(progress, startFee, baseFee);

  const feePaid = quoteAmount * currentFee;
  const netQuote = quoteAmount - feePaid;

  // Approximate integration using numerical slicing
  const slices = 20;
  let remainingQuote = netQuote;
  let accumulatedTokens = 0;
  let tempSupply = currentSupplySold;

  const quotePerSlice = netQuote / slices;
  for (let i = 0; i < slices; i++) {
    const spot = calculateSpotPrice(tempSupply, totalSupply, initialPrice, maxPrice, curveType);
    const tokensInSlice = quotePerSlice / spot;
    accumulatedTokens += tokensInSlice;
    tempSupply += tokensInSlice;
  }

  const finalSupply = Math.min(totalSupply, currentSupplySold + accumulatedTokens);
  const newPrice = calculateSpotPrice(finalSupply, totalSupply, initialPrice, maxPrice, curveType);
  const avgPrice = netQuote / (finalSupply - currentSupplySold || 1);
  const priceImpactPercent = ((newPrice - currentPrice) / currentPrice) * 100;

  return {
    tokensOut: finalSupply - currentSupplySold,
    avgPrice,
    feePaid,
    newSupplySold: finalSupply,
    newPrice,
    priceImpactPercent: Math.max(0, priceImpactPercent),
  };
}

/**
 * Simulates a SELL trade against the curve:
 * Given an amount of tokens to sell, calculates quote tokens returned.
 */
export function simulateSell(
  tokenAmount: number,
  currentSupplySold: number,
  totalSupply: number,
  initialPrice: number,
  maxPrice: number,
  curveType: CurveType,
  startFee: number,
  baseFee: number
): {
  quoteOut: number;
  avgPrice: number;
  feePaid: number;
  newSupplySold: number;
  newPrice: number;
  priceImpactPercent: number;
} {
  const currentPrice = calculateSpotPrice(currentSupplySold, totalSupply, initialPrice, maxPrice, curveType);
  const effectiveTokens = Math.min(tokenAmount, currentSupplySold);

  const slices = 20;
  let accumulatedQuote = 0;
  let tempSupply = currentSupplySold;
  const tokensPerSlice = effectiveTokens / slices;

  for (let i = 0; i < slices; i++) {
    const spot = calculateSpotPrice(tempSupply, totalSupply, initialPrice, maxPrice, curveType);
    const quoteInSlice = tokensPerSlice * spot;
    accumulatedQuote += quoteInSlice;
    tempSupply -= tokensPerSlice;
  }

  const finalSupply = Math.max(0, currentSupplySold - effectiveTokens);
  const progress = finalSupply / totalSupply;
  const feeRate = calculateDynamicFee(progress, startFee, baseFee);

  const grossQuote = accumulatedQuote;
  const feePaid = grossQuote * feeRate;
  const netQuote = Math.max(0, grossQuote - feePaid);

  const newPrice = calculateSpotPrice(finalSupply, totalSupply, initialPrice, maxPrice, curveType);
  const avgPrice = grossQuote / (effectiveTokens || 1);
  const priceImpactPercent = ((currentPrice - newPrice) / currentPrice) * 100;

  return {
    quoteOut: netQuote,
    avgPrice,
    feePaid,
    newSupplySold: finalSupply,
    newPrice,
    priceImpactPercent: Math.max(0, priceImpactPercent),
  };
}

/**
 * Computes discrete bins for Meteora DLMM graduation liquidity preview.
 */
export function generateDlmmBins(
  centerPrice: number,
  binStepBps: number = 20, // 0.2% per bin
  numBins: number = 25,
  totalLiquidityUsdc: number = 50000
): Array<{ binId: number; price: number; liquidityUsdc: number; isCenter: boolean }> {
  const bins = [];
  const half = Math.floor(numBins / 2);

  for (let i = -half; i <= half; i++) {
    const priceRatio = Math.pow(1 + binStepBps / 10000, i);
    const binPrice = centerPrice * priceRatio;
    
    // Gaussian distribution of liquidity concentrated near center NAV price
    const sigma = half / 2.2;
    const weight = Math.exp(-Math.pow(i / sigma, 2));
    const liquidity = (totalLiquidityUsdc / (half * 1.5)) * weight;

    bins.push({
      binId: 8000000 + i,
      price: binPrice,
      liquidityUsdc: Math.max(100, liquidity),
      isCenter: i === 0,
    });
  }

  return bins;
}
