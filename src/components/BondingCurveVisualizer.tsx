import React, { useMemo, useState } from 'react';
import { EquityAsset } from '../types';
import { calculateSpotPrice, calculateDynamicFee } from '../utils/curveMath';

interface BondingCurveVisualizerProps {
  asset: EquityAsset;
  simulatedSupply?: number;
  simulatedPrice?: number;
}

export const BondingCurveVisualizer: React.FC<BondingCurveVisualizerProps> = ({
  asset,
  simulatedSupply,
  simulatedPrice,
}) => {
  const [hoverData, setHoverData] = useState<{
    supply: number;
    price: number;
    fee: number;
    x: number;
    y: number;
  } | null>(null);

  // SVG dimensions
  const width = 640;
  const height = 260;
  const padding = { top: 25, right: 35, bottom: 40, left: 60 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Compute curve points
  const pointsCount = 60;
  const curvePoints = useMemo(() => {
    const points: Array<{ supply: number; price: number; x: number; y: number }> = [];
    const minP = asset.initialPrice * 0.95;
    const maxP = Math.max(asset.maxPrice * 1.05, asset.referenceNav * 1.15);

    for (let i = 0; i <= pointsCount; i++) {
      const supply = (i / pointsCount) * asset.totalSupply;
      const price = calculateSpotPrice(
        supply,
        asset.totalSupply,
        asset.initialPrice,
        asset.maxPrice,
        asset.curveType
      );

      const x = padding.left + (supply / asset.totalSupply) * innerWidth;
      const y = padding.top + innerHeight - ((price - minP) / (maxP - minP)) * innerHeight;
      points.push({ supply, price, x, y });
    }
    return { points, minP, maxP };
  }, [asset, innerWidth, innerHeight]);

  const { points, minP, maxP } = curvePoints;

  // Current position on curve
  const currentFraction = Math.min(1, asset.circulatingSupply / asset.totalSupply);
  const currentX = padding.left + currentFraction * innerWidth;
  const currentY =
    padding.top + innerHeight - ((asset.currentPrice - minP) / (maxP - minP)) * innerHeight;

  // Graduation threshold X
  const gradFraction = asset.graduationThreshold / (asset.totalSupply * asset.initialPrice * 0.4 || 1);
  const gradX = padding.left + Math.min(1, asset.graduationProgress / 100) * innerWidth;

  // NAV line Y
  const navY = padding.top + innerHeight - ((asset.referenceNav - minP) / (maxP - minP)) * innerHeight;

  // SVG Path for curve
  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  // Shaded area under curve up to current point
  const currentPoints = points.filter((p) => p.supply <= asset.circulatingSupply);
  const areaPathD =
    currentPoints.length > 0
      ? `${currentPoints.reduce(
          (acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
          ''
        )} L ${currentX} ${padding.top + innerHeight} L ${padding.left} ${padding.top + innerHeight} Z`
      : '';

  // Simulated trade point
  const simFraction = simulatedSupply ? Math.min(1, simulatedSupply / asset.totalSupply) : null;
  const simX = simFraction !== null ? padding.left + simFraction * innerWidth : null;
  const simY =
    simulatedPrice && simFraction !== null
      ? padding.top + innerHeight - ((simulatedPrice - minP) / (maxP - minP)) * innerHeight
      : null;

  return (
    <div className="relative w-full rounded-2xl bg-slate-900/80 border border-slate-800/80 p-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Meteora Dynamic Bonding Curve ($P(s)$ Engine)
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30 text-teal-300">
            {asset.curveType === 'bounded_sigmoid'
              ? 'Bounded Sigmoid (S-Curve)'
              : asset.curveType === 'stepped'
              ? 'Stepped Syndicate'
              : 'Linear Soft Floor'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-0.5 bg-amber-400 border-dashed"></span>
            <span>Ref NAV: <strong className="text-slate-200">${asset.referenceNav.toFixed(2)}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>Spot: <strong className="text-teal-300">${asset.currentPrice.toFixed(2)}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span>Graduation: <strong className="text-purple-300">{asset.graduationProgress.toFixed(1)}%</strong></span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto cursor-crosshair select-none"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / rect.width) * width;
            if (relX >= padding.left && relX <= padding.left + innerWidth) {
              const fraction = (relX - padding.left) / innerWidth;
              const supply = fraction * asset.totalSupply;
              const price = calculateSpotPrice(
                supply,
                asset.totalSupply,
                asset.initialPrice,
                asset.maxPrice,
                asset.curveType
              );
              const fee = calculateDynamicFee(fraction, asset.antiSnipeStartFee, asset.baseFee);
              setHoverData({ supply, price, fee, x: relX, y: padding.top + innerHeight - ((price - minP) / (maxP - minP)) * innerHeight });
            }
          }}
          onMouseLeave={() => setHoverData(null)}
        >
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="60%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.0" />
            </linearGradient>

            <pattern id="gridPattern" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect
            x={padding.left}
            y={padding.top}
            width={innerWidth}
            height={innerHeight}
            fill="url(#gridPattern)"
          />

          {/* Reference NAV Horizontal Line */}
          {navY >= padding.top && navY <= padding.top + innerHeight && (
            <g>
              <line
                x1={padding.left}
                y1={navY}
                x2={padding.left + innerWidth}
                y2={navY}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.75"
              />
              <text
                x={padding.left + innerWidth - 5}
                y={navY - 6}
                textAnchor="end"
                fill="#f59e0b"
                fontSize="10"
                fontFamily="JetBrains Mono"
                fontWeight="600"
              >
                NASDAQ / Underwriter NAV: ${asset.referenceNav.toFixed(2)}
              </text>
            </g>
          )}

          {/* Graduation Target Vertical Line */}
          <g>
            <line
              x1={padding.left + innerWidth}
              y1={padding.top}
              x2={padding.left + innerWidth}
              y2={padding.top + innerHeight}
              stroke="#a855f7"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeOpacity="0.8"
            />
            <text
              x={padding.left + innerWidth - 6}
              y={padding.top + 16}
              textAnchor="end"
              fill="#c084fc"
              fontSize="10"
              fontFamily="JetBrains Mono"
            >
              Meteora Graduation (${(asset.graduationThreshold / 1000).toFixed(0)}k USDC)
            </text>
          </g>

          {/* Area Fill */}
          <path d={areaPathD} fill="url(#areaGradient)" />

          {/* DBC Curve Path */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Y Axis Labels (Price in USDC) */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const pVal = minP + (maxP - minP) * pct;
            const yPos = padding.top + innerHeight - pct * innerHeight;
            return (
              <g key={idx}>
                <line
                  x1={padding.left - 5}
                  y1={yPos}
                  x2={padding.left}
                  y2={yPos}
                  stroke="#475569"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={yPos + 3.5}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="9.5"
                  fontFamily="JetBrains Mono"
                >
                  ${pVal.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* X Axis Labels (Supply Sold / Progress) */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const xPos = padding.left + pct * innerWidth;
            return (
              <g key={idx}>
                <line
                  x1={xPos}
                  y1={padding.top + innerHeight}
                  x2={xPos}
                  y2={padding.top + innerHeight + 5}
                  stroke="#475569"
                  strokeWidth="1"
                />
                <text
                  x={xPos}
                  y={padding.top + innerHeight + 16}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="9.5"
                  fontFamily="JetBrains Mono"
                >
                  {(pct * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}

          {/* Current Spot Position Point */}
          <circle cx={currentX} cy={currentY} r="7" fill="#14b8a6" fillOpacity="0.3" className="animate-ping" />
          <circle cx={currentX} cy={currentY} r="5" fill="#14b8a6" stroke="#ffffff" strokeWidth="2" />

          {/* Simulated next point if trading */}
          {simX !== null && simY !== null && (
            <g>
              <line
                x1={currentX}
                y1={currentY}
                x2={simX}
                y2={simY}
                stroke="#2dd4bf"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <circle cx={simX} cy={simY} r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
            </g>
          )}

          {/* Hover Crosshair & Details */}
          {hoverData && (
            <g>
              <line
                x1={hoverData.x}
                y1={padding.top}
                x2={hoverData.x}
                y2={padding.top + innerHeight}
                stroke="#38bdf8"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <line
                x1={padding.left}
                y1={hoverData.y}
                x2={padding.left + innerWidth}
                y2={hoverData.y}
                stroke="#38bdf8"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle cx={hoverData.x} cy={hoverData.y} r="4" fill="#38bdf8" />
            </g>
          )}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoverData && (
          <div
            className="absolute pointer-events-none z-20 px-2.5 py-1.5 rounded-lg bg-slate-950/95 border border-cyan-500/40 text-[11px] font-mono shadow-2xl"
            style={{
              left: `${Math.min(hoverData.x - 30, width - 180)}px`,
              top: `${Math.max(hoverData.y - 65, 10)}px`,
            }}
          >
            <div className="text-cyan-300 font-bold">Spot Price: ${hoverData.price.toFixed(2)}</div>
            <div className="text-slate-400">
              Supply: {hoverData.supply.toLocaleString(undefined, { maximumFractionDigits: 0 })} tokens
            </div>
            <div className="text-amber-400">Dynamic Anti-Snipe Fee: {(hoverData.fee * 100).toFixed(2)}%</div>
          </div>
        )}
      </div>

      {/* Footer Info Legend */}
      <div className="mt-2 pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-teal-500 to-purple-500"></span>
            Dynamic Bonding Curve $P(s)$
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-amber-400"></span>
            NAV Reference Anchor
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 border border-white"></span>
            Current Discovery Stage
          </span>
        </div>
        <div className="text-teal-400">
          Decaying Anti-Sniper Fee: <strong>{(asset.currentDynamicFee * 100).toFixed(2)}%</strong>
        </div>
      </div>
    </div>
  );
};
