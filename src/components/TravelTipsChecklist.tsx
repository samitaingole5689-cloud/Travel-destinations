import React, { useState } from 'react';
import { Check, CheckSquare, Square } from 'lucide-react';
import { TravelTip } from '../types/article';

interface TravelTipsChecklistProps {
  tips: TravelTip[];
}

export const TravelTipsChecklist: React.FC<TravelTipsChecklistProps> = ({ tips }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 my-8 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-200">
        <div>
          <h3 className="font-serif-editorial text-2xl font-medium text-stone-900">
            Essential Traveler’s Field Checklist
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Review and mark off key cultural codes, safety precautions, and packing essentials.
          </p>
        </div>
        <div className="text-xs font-mono text-stone-500 bg-stone-100 px-3 py-1.5 rounded">
          {completedCount} of {tips.length} Verified
        </div>
      </div>

      <div className="mt-6 space-y-3.5">
        {tips.map((tip, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`cursor-pointer p-4 rounded-md border transition-all ${
                isChecked
                  ? 'bg-amber-50/40 border-amber-200 text-stone-700'
                  : 'bg-stone-50/50 border-stone-200 hover:border-stone-300 text-stone-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  className="mt-0.5 text-amber-900 focus:outline-none shrink-0"
                  aria-label={isChecked ? 'Mark unverified' : 'Mark verified'}
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-amber-800" />
                  ) : (
                    <Square className="w-5 h-5 text-stone-400" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-800">
                      {tip.category}
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <h4
                      className={`text-sm font-semibold ${
                        isChecked ? 'line-through text-stone-500' : 'text-stone-900'
                      }`}
                    >
                      {tip.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {tip.details}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
