/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Hash, Copy, Check, Binary, AlertTriangle } from "lucide-react";
import { convertNumberBase, isValueValidForBase } from "../lib/conversion-engine";
import { motion } from "motion/react";

export default function BaseConverterPanel() {
  const [activeBase, setActiveBase] = useState<number>(10);
  const [inputValue, setInputValue] = useState<string>("255");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [binaryVal, setBinaryVal] = useState("");
  const [octalVal, setOctalVal] = useState("");
  const [decimalVal, setDecimalVal] = useState("");
  const [hexVal, setHexVal] = useState("");

  const [copiedBase, setCopiedBase] = useState<number | null>(null);

  // Convert on input change
  useEffect(() => {
    setErrorMsg("");

    if (!inputValue.trim()) {
      setBinaryVal("");
      setOctalVal("");
      setDecimalVal("");
      setHexVal("");
      return;
    }

    // Validate input against the source base
    const isValid = isValueValidForBase(inputValue, activeBase);
    if (!isValid) {
      setErrorMsg(`Invalid characters for Base-${activeBase}`);
      return;
    }

    try {
      // Parse active base to normal base 10 integer
      const parsedInt = parseInt(inputValue, activeBase);
      if (isNaN(parsedInt)) {
        setErrorMsg("Parsing failed");
        return;
      }

      setBinaryVal(parsedInt.toString(2));
      setOctalVal(parsedInt.toString(8));
      setDecimalVal(parsedInt.toString(10));
      setHexVal(parsedInt.toString(16).toUpperCase());
    } catch {
      setErrorMsg("Calculation error");
    }
  }, [inputValue, activeBase]);

  const handleBaseChange = (base: number) => {
    // Attempt to preserve current decimal equivalent or clean out
    setActiveBase(base);
    if (decimalVal) {
      if (base === 10) setInputValue(decimalVal);
      else if (base === 2) setInputValue(binaryVal);
      else if (base === 8) setInputValue(octalVal);
      else if (base === 16) setInputValue(hexVal);
    } else {
      setInputValue("");
    }
  };

  const handleCopy = async (value: string, base: number) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedBase(base);
      setTimeout(() => setCopiedBase(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title block */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-accent-bg text-accent-teal border border-accent-border">
          <Binary className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-text-primary">
            Number Base System Converter
          </h3>
          <p className="text-xs text-text-secondary">
            Real-time conversion across radix representations (Binary, Octal, Decimal, Hex)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Input Selector */}
        <div className="col-span-full md:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl border border-border-main bg-card-bg shadow-sm space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Select Source Base
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: "Decimal (Base-10)", base: 10 },
                  { label: "Hexadecimal (Base-16)", base: 16 },
                  { label: "Binary (Base-2)", base: 2 },
                  { label: "Octal (Base-8)", base: 8 },
                ].map((item) => (
                  <button
                    key={item.base}
                    id={`source-base-${item.base}-btn`}
                    onClick={() => handleBaseChange(item.base)}
                    className={`px-3 py-2.5 rounded-xl text-left text-xs font-semibold cursor-pointer transition-colors ${
                      activeBase === item.base
                        ? "bg-accent-teal text-white dark:text-canvas-dark"
                        : "bg-panel-bg text-text-primary hover:bg-hover-bg"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Entry */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Input Value
              </label>
              <input
                id="base-converter-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Enter a base-${activeBase} value...`}
                className="w-full px-4 py-3 rounded-xl border border-border-main bg-card-bg text-text-primary text-sm font-mono focus:ring-1 focus:ring-accent-teal outline-none transition-shadow"
              />
              {errorMsg && (
                <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Output Grid */}
        <div className="col-span-full md:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl border border-border-main bg-card-bg shadow-sm space-y-4">
            <h4 className="font-display font-semibold text-xs text-text-muted tracking-wider uppercase">
              Full Spectrum Representations
            </h4>

            <div className="space-y-3">
              {/* Decimal Display */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-panel-bg border border-border-main/50">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                    Decimal (Base-10)
                  </span>
                  <span className="font-mono text-sm text-text-primary break-all select-all font-medium">
                    {decimalVal || "—"}
                  </span>
                </div>
                {decimalVal && (
                  <button
                    id="copy-decimal-btn"
                    onClick={() => handleCopy(decimalVal, 10)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-accent-teal hover:bg-hover-bg transition-all cursor-pointer"
                  >
                    {copiedBase === 10 ? <Check className="w-4 h-4 text-accent-teal" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {/* Hex Display */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-panel-bg border border-border-main/50">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                    Hexadecimal (Base-16)
                  </span>
                  <span className="font-mono text-sm text-text-primary break-all select-all font-medium">
                    {hexVal || "—"}
                  </span>
                </div>
                {hexVal && (
                  <button
                    id="copy-hex-btn"
                    onClick={() => handleCopy(hexVal, 16)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-accent-teal hover:bg-hover-bg transition-all cursor-pointer"
                  >
                    {copiedBase === 16 ? <Check className="w-4 h-4 text-accent-teal" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {/* Binary Display */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-panel-bg border border-border-main/50">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                    Binary (Base-2)
                  </span>
                  <span className="font-mono text-xs text-text-primary break-all select-all font-medium leading-relaxed">
                    {binaryVal || "—"}
                  </span>
                </div>
                {binaryVal && (
                  <button
                    id="copy-binary-btn"
                    onClick={() => handleCopy(binaryVal, 2)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-accent-teal hover:bg-hover-bg transition-all cursor-pointer"
                  >
                    {copiedBase === 2 ? <Check className="w-4 h-4 text-accent-teal" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {/* Octal Display */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-panel-bg border border-border-main/50">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                    Octal (Base-8)
                  </span>
                  <span className="font-mono text-sm text-text-primary break-all select-all font-medium">
                    {octalVal || "—"}
                  </span>
                </div>
                {octalVal && (
                  <button
                    id="copy-octal-btn"
                    onClick={() => handleCopy(octalVal, 8)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-accent-teal hover:bg-hover-bg transition-all cursor-pointer"
                  >
                    {copiedBase === 8 ? <Check className="w-4 h-4 text-accent-teal" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
