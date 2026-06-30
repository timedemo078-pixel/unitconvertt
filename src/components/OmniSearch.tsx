/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, CornerDownLeft, Scale, Ruler, Zap, Shield, Compass, BookOpen } from "lucide-react";
import { CONVERTERS_LIST, CONVERTER_CATEGORIES, ConverterData, ConverterUnit } from "../lib/converters-data";

interface OmniSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConverter: (
    categoryId: string,
    subCategoryName?: string,
    fromUnitId?: string,
    toUnitId?: string
  ) => void;
}

interface SearchResult {
  categoryId: string; // This corresponds to slug in converters list
  categoryName: string;
  unit?: ConverterUnit;
  type: "category" | "unit";
  matchField: string;
  matchValue: string;
}

export default function OmniSearch({ isOpen, onClose, onSelectConverter }: OmniSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle keybindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Auto scroll selected index into view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        const container = scrollContainerRef.current;
        const elemTop = selectedElement.offsetTop;
        const elemBottom = elemTop + selectedElement.offsetHeight;
        const containerTop = container.scrollTop;
        const containerBottom = containerTop + container.offsetHeight;

        if (elemTop < containerTop) {
          container.scrollTop = elemTop;
        } else if (elemBottom > containerBottom) {
          container.scrollTop = elemBottom - container.offsetHeight;
        }
      }
    }
  }, [selectedIndex]);

  // Perform search
  useEffect(() => {
    if (!query.trim()) {
      // Default recommended list
      const defaultList: SearchResult[] = [];
      
      // Add a couple of popular converters
      const popularSlugs = ["length", "weight", "volume", "temperature", "pressure", "energy", "case", "numbers"];
      CONVERTERS_LIST.forEach((conv) => {
        if (popularSlugs.includes(conv.slug)) {
          defaultList.push({
            categoryId: conv.slug,
            categoryName: conv.name,
            type: "category",
            matchField: "Featured",
            matchValue: conv.name,
          });
        }
      });

      setResults(defaultList.slice(0, 8));
      return;
    }

    const searchStr = query.toLowerCase().trim();
    const matches: SearchResult[] = [];

    // Search inside all converters
    CONVERTERS_LIST.forEach((conv) => {
      // Name match
      const nameMatch = conv.name.toLowerCase().includes(searchStr);
      const descMatch = conv.description.toLowerCase().includes(searchStr);

      if (nameMatch || descMatch) {
        matches.push({
          categoryId: conv.slug,
          categoryName: conv.name,
          type: "category",
          matchField: nameMatch ? "Name" : "Description",
          matchValue: conv.name,
        });
      }

      // Search units
      conv.units.forEach((u) => {
        const unitNameMatch = u.name.toLowerCase().includes(searchStr);
        const unitSymMatch = u.symbol.toLowerCase().includes(searchStr);
        const unitDescMatch = u.description?.toLowerCase().includes(searchStr) || false;

        if (unitNameMatch || unitSymMatch || unitDescMatch) {
          matches.push({
            categoryId: conv.slug,
            categoryName: conv.name,
            unit: u,
            type: "unit",
            matchField: unitNameMatch ? "Unit Name" : unitSymMatch ? "Unit Symbol" : "Unit Description",
            matchValue: u.name,
          });
        }
      });
    });

    // De-duplicate matches
    const seen = new Set<string>();
    const uniqueMatches: SearchResult[] = [];
    for (const m of matches) {
      const key = `${m.categoryId}-${m.unit?.symbol || ""}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueMatches.push(m);
      }
    }

    setResults(uniqueMatches.slice(0, 10));
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: SearchResult) => {
    if (item.type === "category") {
      onSelectConverter(item.categoryId);
    } else if (item.unit) {
      // Find suitable partner symbol (e.g. the base unit of that converter, if not itself)
      const conv = CONVERTERS_LIST.find((c) => c.slug === item.categoryId);
      let partnerSymbol = conv?.baseUnit || conv?.units[0]?.symbol || "";
      if (partnerSymbol === item.unit.symbol && conv?.units[1]) {
        partnerSymbol = conv.units[1].symbol;
      }
      onSelectConverter(item.categoryId, undefined, item.unit.symbol, partnerSymbol);
    }
    onClose();
  };

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "length":
        return <Ruler className="w-4 h-4 text-[#17D7C8]" />;
      case "weight":
        return <Scale className="w-4 h-4 text-[#17D7C8]" />;
      default:
        return <Compass className="w-4 h-4 text-[#98A3B3]" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-10 pt-20 sm:pt-28 bg-canvas-bg/85 backdrop-blur-sm">
          {/* Backdrop dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Search container */}
          <motion.div
            id="omni-search-box"
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-card-bg border border-border-main shadow-2xl z-10"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 border-b border-border-main py-3.5 bg-navbar-bg">
              <Search className="w-5 h-5 text-text-muted shrink-0" />
              <input
                id="omni-search-input"
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 70+ engineering converters, units, symbols..."
                className="w-full bg-transparent border-0 outline-none focus:outline-none text-text-primary text-sm placeholder:text-text-muted"
              />
              {query && (
                <button
                  id="clear-search-query-btn"
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full hover:bg-hover-bg transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-text-secondary" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1.5 shrink-0 select-none">
                <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-kbd-bg text-text-muted rounded border border-border-main shadow-sm">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Results Grid */}
            <div
              id="omni-search-results"
              ref={scrollContainerRef}
              className="max-h-80 overflow-y-auto py-2 divide-y divide-border-main/20"
            >
              {results.length === 0 ? (
                <div className="px-6 py-10 text-center text-text-secondary">
                  <p className="text-sm font-medium text-text-primary">No results matched your query</p>
                  <p className="text-xs text-text-muted mt-1">Try searching for other engineering units like "Sievert" or "Henry"</p>
                </div>
              ) : (
                results.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={`${item.categoryId}-${item.unit?.symbol || ""}-${index}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-accent-bg border-l-2 border-accent-teal"
                          : "border-l-2 border-transparent hover:bg-hover-bg"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 p-1.5 rounded bg-kbd-bg border border-border-main">
                          {getCategoryIcon(item.categoryId)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-text-primary">
                              {item.unit ? item.unit.name : item.categoryName}
                            </span>
                            {item.unit && (
                              <span className="px-1.5 py-0.5 font-mono text-[9px] rounded bg-kbd-bg border border-border-main text-accent-teal font-bold">
                                {item.unit.symbol}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                            {item.unit ? item.unit.description : `${item.categoryName} Conversion Module`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-mono tracking-wider font-bold px-2 py-0.5 rounded bg-accent-bg text-accent-teal border border-accent-border/50">
                          {item.type}
                        </span>
                        {isSelected && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-accent-teal" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Hint bar */}
            <div className="px-4 py-2 border-t border-border-main bg-kbd-bg flex justify-between items-center text-[10px] text-text-muted">
              <span className="flex items-center gap-1">
                Use <kbd className="px-1 py-0.2 bg-card-bg rounded border border-border-main">↑</kbd> and <kbd className="px-1 py-0.2 bg-card-bg rounded border border-border-main">↓</kbd> to navigate
              </span>
              <span>
                Press <kbd className="px-1 py-0.2 bg-card-bg rounded border border-border-main">Enter</kbd> to select
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
