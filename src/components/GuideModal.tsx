/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Keyboard, HelpCircle, CheckCircle2, Award, Zap } from "lucide-react";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          {/* Overlay click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 cursor-default"
            onClick={onClose}
          />

          <motion.div
            id="guide-modal-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-accent-teal border border-teal-100 dark:border-teal-900/30">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-slate-100">
                    UnitConvert Platform Guide
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    NIST SP 811 Aligned Engineering Utilities
                  </p>
                </div>
              </div>
              <button
                id="close-guide-modal-btn"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close Guide Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 max-h-[70vh] overflow-y-auto space-y-6 text-sm text-slate-600 dark:text-slate-300">
              {/* Core Standards */}
              <div className="space-y-2">
                <h4 className="font-display font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-teal" /> NIST Calibration Standards
                </h4>
                <p className="leading-relaxed text-xs">
                  All scientific and standard conversion coefficients are modeled directly against the{" "}
                  <strong className="text-slate-800 dark:text-slate-200">
                    National Institute of Standards and Technology (NIST) Special Publication 811
                  </strong>
                  . This ensures zero floating-point accumulated errors during cascading calculation passes.
                </p>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="space-y-3">
                <h4 className="font-display font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-accent-teal" /> Professional Hotkeys
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Omni-Search Overlay</span>
                    <kbd className="px-2 py-0.5 text-xs font-mono bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded border border-slate-200 dark:border-slate-700 shadow-sm">
                      Ctrl + K
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Reciprocal Swap</span>
                    <kbd className="px-2 py-0.5 text-xs font-mono bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded border border-slate-200 dark:border-slate-700 shadow-sm">
                      Alt + S
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Close Overlay / Modals</span>
                    <kbd className="px-2 py-0.5 text-xs font-mono bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded border border-slate-200 dark:border-slate-700 shadow-sm">
                      Esc
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Navigate Fields</span>
                    <kbd className="px-2 py-0.5 text-xs font-mono bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded border border-slate-200 dark:border-slate-700 shadow-sm">
                      Tab
                    </kbd>
                  </div>
                </div>
              </div>

              {/* Advanced Toolboxes */}
              <div className="space-y-2.5">
                <h4 className="font-display font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent-teal" /> Specialized Toolboxes
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-800 dark:text-slate-200">Electromagnetism & Radiology:</strong>{" "}
                      Calibrated in isolated subgroups (e.g. Electric Charge, Absorbed Dose) to maintain physical dimensional integrity.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-800 dark:text-slate-200">Text Transformations:</strong> Capitalization adjustments, kebab-case, snake_case, and camelCase conversions for developers and system engineers.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-800 dark:text-slate-200">Number Base Convert:</strong> High-integrity conversion between Binary, Octal, Decimal, and Hexadecimal representations with built-in input integrity checkers.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer button */}
            <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-900/20 flex justify-end">
              <button
                id="dismiss-guide-btn"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-accent-teal dark:text-slate-950 dark:hover:bg-accent-teal-hover text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Acknowledge & Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
