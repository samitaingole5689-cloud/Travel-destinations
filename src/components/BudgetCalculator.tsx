import React, { useState } from 'react';
import { Calculator, CheckCircle2, DollarSign } from 'lucide-react';
import { BudgetTier } from '../types/article';

interface BudgetCalculatorProps {
  tiers: BudgetTier[];
  flightEstimate: string;
  moneySavingHacks: string[];
  currencySymbol: string;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
  tiers,
  flightEstimate,
  moneySavingHacks,
  currencySymbol,
}) => {
  const [selectedTierIndex, setSelectedTierIndex] = useState(1); // default to mid-range
  const [nights, setNights] = useState(7);

  // Parse average daily cost from tier string for dynamic computation
  const currentTier = tiers[selectedTierIndex] || tiers[0];
  const parseCost = (str: string): number => {
    const matches = str.match(/\d+/g);
    if (!matches || matches.length === 0) return 100;
    if (matches.length === 1) return parseInt(matches[0], 10);
    return Math.round((parseInt(matches[0], 10) + parseInt(matches[1], 10)) / 2);
  };

  const dailyAverage = parseCost(currentTier.dailyCost);
  const estimatedTotal = dailyAverage * nights;

  return (
    <div className="bg-stone-50 border border-stone-200/90 rounded-lg p-6 sm:p-8 my-8 shadow-xs">
      <div className="flex items-center gap-2.5 pb-4 border-b border-stone-200 text-stone-900 font-serif-editorial text-2xl font-medium">
        <Calculator className="w-5 h-5 text-amber-800" />
        <span>Interactive Expedition Budget Planner</span>
      </div>

      <p className="text-sm text-stone-600 mt-3 leading-relaxed">
        Customize your planned duration and travel style to project anticipated on-the-ground expenses.
      </p>

      {/* Style Selector Tabs (allowed as functional button controls) */}
      <div className="mt-6">
        <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
          Select Travel Style
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1 bg-stone-200/60 rounded-md">
          {tiers.map((tier, idx) => (
            <button
              key={tier.tier}
              onClick={() => setSelectedTierIndex(idx)}
              className={`py-2 px-3 text-xs font-semibold rounded-md transition-all text-center whitespace-nowrap ${
                selectedTierIndex === idx
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tier.tier}
            </button>
          ))}
        </div>
      </div>

      {/* Duration Selector */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">
            Planned Duration (Nights)
          </label>
          <div className="flex items-center gap-1.5">
            {[3, 5, 7, 10, 14].map((num) => (
              <button
                key={num}
                onClick={() => setNights(num)}
                className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
                  nights === num
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                {num} {num === 1 ? 'Night' : 'Nights'}
              </button>
            ))}
          </div>
        </div>

        {/* Calculated Quick Projection Card */}
        <div className="bg-white border border-stone-200 rounded-md px-4 py-3 min-w-[200px] text-right">
          <div className="text-[11px] font-mono uppercase text-stone-400">
            Est. Total Ground Cost ({nights} Days)
          </div>
          <div className="font-serif-editorial text-2xl font-bold text-amber-900 mt-0.5">
            ~{estimatedTotal.toLocaleString()} {currencySymbol.replace(/[^a-zA-Z$€¥]/g, '')}
          </div>
          <div className="text-[11px] text-stone-500 font-mono">
            Approx. {currentTier.dailyCost}
          </div>
        </div>
      </div>

      {/* Breakdown Details Grid */}
      <div className="mt-6 pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-3.5 rounded border border-stone-200/80">
          <div className="text-[11px] font-mono uppercase text-stone-400">Lodging / Night</div>
          <div className="text-sm font-semibold text-stone-800 mt-1">{currentTier.breakdown.lodging}</div>
        </div>
        <div className="bg-white p-3.5 rounded border border-stone-200/80">
          <div className="text-[11px] font-mono uppercase text-stone-400">Dining & Drinks</div>
          <div className="text-sm font-semibold text-stone-800 mt-1">{currentTier.breakdown.food}</div>
        </div>
        <div className="bg-white p-3.5 rounded border border-stone-200/80">
          <div className="text-[11px] font-mono uppercase text-stone-400">Local Transit</div>
          <div className="text-sm font-semibold text-stone-800 mt-1">{currentTier.breakdown.transit}</div>
        </div>
        <div className="bg-white p-3.5 rounded border border-stone-200/80">
          <div className="text-[11px] font-mono uppercase text-stone-400">Attractions & Spas</div>
          <div className="text-sm font-semibold text-stone-800 mt-1">{currentTier.breakdown.activities}</div>
        </div>
      </div>

      <div className="mt-4 text-xs text-stone-600 bg-amber-50/70 border border-amber-200/60 rounded p-3 leading-relaxed">
        <span className="font-semibold text-amber-900">Flight Baseline:</span> {flightEstimate}
      </div>

      {/* Money Saving Tactics */}
      <div className="mt-6 pt-5 border-t border-stone-200">
        <div className="text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold mb-2.5 flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-amber-800" />
          <span>Curator’s Money-Saving Hacks</span>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
          {moneySavingHacks.map((hack, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <span>{hack}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
