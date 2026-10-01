import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Zap, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  X, 
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EquityAsset } from '../types';

interface GraduationModalProps {
  asset: EquityAsset;
  isOpen: boolean;
  onClose: () => void;
  onGraduationComplete: (updatedAsset: EquityAsset) => void;
}

export const GraduationModal: React.FC<GraduationModalProps> = ({
  asset,
  isOpen,
  onClose,
  onGraduationComplete,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [txSignature, setTxSignature] = useState<string>('');

  const steps = [
    {
      title: 'Freeze DBC Curve State',
      description: 'Snapshot final discovery price and lock unminted equity tokens from bonding curve.',
    },
    {
      title: 'Deploy Meteora DAMM v2 Pool (60%)',
      description: `Funding $${(asset.graduationThreshold * 0.6).toLocaleString()} USDC into perpetual compounding liquidity pool.`,
    },
    {
      title: 'Seed Meteora DLMM Concentrated Bins (40%)',
      description: `Seeding $${(asset.graduationThreshold * 0.4).toLocaleString()} USDC across 51 discrete bins around $${asset.currentPrice.toFixed(2)}.`,
    },
    {
      title: 'Lock LP Positions in Syndicate Vault',
      description: 'LP tokens permanently assigned to equity underwriter vault for decentralized dividend accrual.',
    },
  ];

  const handleStartMigration = () => {
    setIsProcessing(true);
    setCurrentStep(1);

    // Step 1
    setTimeout(() => {
      setCurrentStep(2);
      // Step 2
      setTimeout(() => {
        setCurrentStep(3);
        // Step 3
        setTimeout(() => {
          setCurrentStep(4);
          setIsProcessing(false);
          const sig = `5xMeteoraGraduation${Math.random().toString(36).substring(2, 9).toUpperCase()}...SolanaTx`;
          setTxSignature(sig);

          // Trigger celebratory confetti
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#14b8a6', '#9945FF', '#14F195', '#f59e0b']
          });

          // Callback to update asset state
          onGraduationComplete({
            ...asset,
            isGraduated: true,
            graduationProgress: 100,
            graduatedAt: new Date().toISOString().split('T')[0],
            dammPoolAddress: `DAMMv2_${asset.symbol}_${Math.random().toString(36).substring(2, 8)}`,
            dlmmPoolAddress: `DLMM_${asset.symbol}_${Math.random().toString(36).substring(2, 8)}`,
          });
        }, 1200);
      }, 1400);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0f172a] border border-teal-500/30 p-6 shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-purple-600 flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Meteora Graduation Engine</h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 font-mono">
                  DBC → DAMM v2 + DLMM
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Migrating {asset.symbol} ({asset.name}) into permanent institutional liquidity
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Graduation Financial Summary */}
        <div className="grid grid-cols-3 gap-3 my-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono">
          <div>
            <div className="text-[10px] uppercase text-slate-400">Total Capital Raised</div>
            <div className="text-base font-bold text-teal-300">
              ${asset.graduationThreshold.toLocaleString()} USDC
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-slate-400">Terminal Discovery Price</div>
            <div className="text-base font-bold text-white">${asset.currentPrice.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-slate-400">Dual Migration Ratio</div>
            <div className="text-base font-bold text-purple-300">60% DAMM / 40% DLMM</div>
          </div>
        </div>

        {/* Step-by-step Execution Progress */}
        <div className="space-y-3 my-5">
          {steps.map((s, idx) => {
            const stepNum = idx + 1;
            const isDone = currentStep > stepNum || currentStep === 4;
            const isCurrent = currentStep === stepNum;

            return (
              <div
                key={idx}
                className={`flex items-start gap-3.5 p-3 rounded-xl border transition-all ${
                  isDone
                    ? 'bg-teal-950/20 border-teal-500/40 text-teal-100'
                    : isCurrent
                    ? 'bg-purple-950/30 border-purple-500/50 shadow-md ring-1 ring-purple-400/40 text-white'
                    : 'bg-slate-900/30 border-slate-800/60 text-slate-400 opacity-60'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full border-2 border-purple-400 border-t-transparent animate-spin"></div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono">
                      {stepNum}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-200">{s.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{s.description}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Success Signature & Explorer Links */}
        {currentStep === 4 && (
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 mb-5 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Pool Successfully Graduated to Meteora!</span>
            </div>
            <div className="text-[11px] font-mono text-slate-300 mt-2 space-y-1">
              <div>
                <span className="text-slate-400">DAMM v2 Pool:</span>{' '}
                <span className="text-teal-300">{asset.dammPoolAddress || 'DAMMv2_8x...Pool'}</span>
              </div>
              <div>
                <span className="text-slate-400">DLMM Bin Pool:</span>{' '}
                <span className="text-purple-300">{asset.dlmmPoolAddress || 'DLMM_3y...Bins'}</span>
              </div>
              <div>
                <span className="text-slate-400">Solana Tx:</span>{' '}
                <span className="text-slate-200 underline cursor-pointer">{txSignature}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
          >
            {currentStep === 4 ? 'Close' : 'Cancel'}
          </button>

          {currentStep === 0 && (
            <button
              onClick={handleStartMigration}
              disabled={isProcessing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 text-slate-950 hover:brightness-110 shadow-lg shadow-teal-500/20 transition-all cursor-pointer active:scale-95"
            >
              <span>Execute Meteora Migration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {currentStep === 4 && (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all cursor-pointer"
            >
              View Meteora Pool
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
