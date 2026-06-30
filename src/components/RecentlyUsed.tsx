/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { RecentConverter } from "../types";
import { History, ArrowRight, Trash2, Clock } from "lucide-react";
import { motion } from "motion/react";

interface RecentlyUsedProps {
  items: RecentConverter[];
  onSelect: (item: RecentConverter) => void;
  onClear: () => void;
}

export default function RecentlyUsed({ items, onSelect, onClear }: RecentlyUsedProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border-main bg-card-bg p-6 text-center shadow-sm">
        <div className="flex justify-center mb-3 text-text-muted">
          <Clock className="w-8 h-8" />
        </div>
        <h4 className="font-display font-medium text-text-primary text-sm">
          No Conversion History
        </h4>
        <p className="text-xs text-text-secondary mt-1">
          Your last 5 active converters will automatically appear here for quick recall.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border-main bg-card-bg shadow-sm overflow-hidden">
      {/* Title block */}
      <div className="px-5 py-4 border-b border-border-main/50 bg-panel-bg flex items-center justify-between">
        <div className="flex items-center gap-2 text-text-primary">
          <History className="w-4 h-4 text-accent-teal" />
          <h4 className="font-display font-semibold text-xs tracking-wider uppercase">
            Recently Used
          </h4>
        </div>
        <button
          id="clear-history-btn"
          onClick={onClear}
          className="flex items-center gap-1 text-[11px] font-medium text-text-secondary hover:text-red-500 cursor-pointer transition-colors"
          title="Clear History"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* History Items list */}
      <div className="divide-y divide-border-main/40">
        {items.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left px-5 py-3.5 hover:bg-hover-bg flex items-center justify-between group cursor-pointer transition-all duration-150"
            whileHover={{ x: 2 }}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-medium text-xs text-text-primary">
                  {item.categoryName}
                </span>
                {item.subCategoryName && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full border border-border-main text-text-secondary bg-kbd-bg">
                    {item.subCategoryName}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
                <span className="text-accent-teal font-medium">{item.fromUnitSymbol}</span>
                <ArrowRight className="w-3 h-3 text-text-muted" />
                <span className="text-text-primary font-medium">{item.toUnitSymbol}</span>
              </div>
            </div>

            <span className="text-[10px] text-accent-teal font-semibold group-hover:underline">
              Recall &rarr;
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
