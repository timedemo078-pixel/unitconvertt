/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { ConverterUnit } from "../lib/converters-data";

interface UnitSearchComboboxProps {
  id?: string;
  units: ConverterUnit[];
  selectedSymbol: string;
  onChange: (symbol: string) => void;
  placeholder?: string;
}

export default function UnitSearchCombobox({
  id = "unit-combobox",
  units,
  selectedSymbol,
  onChange,
  placeholder = "Search unit...",
}: UnitSearchComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedUnit = units.find((u) => u.symbol === selectedSymbol);

  // Filter units based on name or symbol search
  const filteredUnits = units.filter((unit) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      unit.name.toLowerCase().includes(q) ||
      unit.symbol.toLowerCase().includes(q)
    );
  });

  // Best match is the first filtered unit
  const bestMatch = filteredUnits[activeIndex] || filteredUnits[0];

  // Adjust active index when list size changes
  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery]);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          filteredUnits.length > 0 ? (prev + 1) % filteredUnits.length : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          filteredUnits.length > 0
            ? (prev - 1 + filteredUnits.length) % filteredUnits.length
            : 0
        );
        break;
      case "Enter":
        e.preventDefault();
        if (bestMatch) {
          onChange(bestMatch.symbol);
          setIsOpen(false);
          setSearchQuery("");
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (symbol: string) => {
    onChange(symbol);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div ref={containerRef} className="relative w-full" id={id}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-card-bg hover:bg-hover-bg text-text-primary border border-border-main hover:border-accent-teal/50 rounded-xl transition-all cursor-pointer text-left focus:outline-none focus:ring-1 focus:ring-accent-teal focus:border-accent-teal"
      >
        <span className="truncate text-xs font-semibold">
          {selectedUnit ? `${selectedUnit.name} (${selectedUnit.symbol})` : "Select Unit"}
        </span>
        <ChevronDown className="w-4 h-4 text-text-secondary shrink-0" />
      </button>

      {/* Floating Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-full bg-card-bg border border-border-main rounded-xl shadow-2xl z-50 overflow-hidden">
          {/* Search Box inside dropdown */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border-main">
            <Search className="w-3.5 h-3.5 text-text-secondary" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full bg-transparent border-0 text-text-primary text-xs outline-none focus:outline-none placeholder:text-text-muted"
            />
          </div>

          {/* Matches List */}
          <div className="max-h-60 overflow-y-auto divide-y divide-border-main/30 py-1 scrollbar-thin">
            {filteredUnits.length > 0 ? (
              filteredUnits.map((unit, idx) => {
                const isSelected = unit.symbol === selectedSymbol;
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={unit.symbol}
                    type="button"
                    onClick={() => handleSelect(unit.symbol)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                      isActive
                        ? "bg-accent-bg text-accent-teal"
                        : "text-text-primary hover:bg-hover-bg"
                    }`}
                  >
                    <div className="truncate pr-4">
                      <p className="font-semibold">{unit.name}</p>
                      {unit.description && (
                        <p className="text-[10px] text-text-secondary truncate mt-0.5">
                          {unit.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 bg-kbd-bg border border-border-main text-text-secondary rounded font-bold">
                        {unit.symbol}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent-teal" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-4 text-center text-xs text-text-muted">
                No matching units found
              </div>
            )}
          </div>

          {/* Hint / Helper Footer */}
          <div className="px-3 py-1.5 bg-kbd-bg border-t border-border-main text-[9px] text-text-muted flex items-center justify-between">
            <span>↑↓ to navigate, Enter to select</span>
            {filteredUnits.length > 0 && (
              <span className="text-accent-teal/70">Best Match: {bestMatch.name}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
