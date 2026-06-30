/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ArrowLeftRight, Copy, Check, Info, HelpCircle, BookOpen, Printer, ArrowRight } from "lucide-react";
import { convertUnits, formatPrecision } from "../lib/conversion-engine";
import { CONVERTERS_LIST, getConverterFAQ, getConverterFormulas, ConverterUnit } from "../lib/converters-data";
import { getMetrologyGlossary } from "../lib/glossary-engine";
import { motion } from "motion/react";
import UnitSearchCombobox from "./UnitSearchCombobox";

interface ConverterPanelProps {
  categoryId: string; // Wait! The routing might pass converterSlug here
  initialSubCategoryName?: string;
  initialFromUnitId?: string;
  initialToUnitId?: string;
  onConverterActive?: (recent: {
    categoryId: string;
    categoryName: string;
    fromUnitId: string;
    fromUnitSymbol: string;
    toUnitId: string;
    toUnitSymbol: string;
    subCategoryName?: string;
  }) => void;
}

export default function ConverterPanel({
  categoryId, // This represents the slug of the converter (e.g., "length", "weight")
  initialFromUnitId,
  initialToUnitId,
  onConverterActive,
}: ConverterPanelProps) {
  // Find current converter from register
  const converter = CONVERTERS_LIST.find((c) => c.slug === categoryId) || CONVERTERS_LIST[0];

  const availableUnits = converter.units;

  // Selected Unit From and To symbols
  const [fromUnitSymbol, setFromUnitSymbol] = useState<string>("");
  const [toUnitSymbol, setToUnitSymbol] = useState<string>("");

  // Input value and output result
  const [inputValue, setInputValue] = useState<string>("1");
  const [outputValue, setOutputValue] = useState<string>("");

  // Decimal precision setting (2 to 12)
  const [precision, setPrecision] = useState<number>(8);

  // Clipboard copy state flags
  const [copiedFrom, setCopiedFrom] = useState(false);
  const [copiedTo, setCopiedTo] = useState(false);

  // Initialize selected units
  useEffect(() => {
    if (availableUnits.length > 0) {
      const firstUnit = availableUnits[0].symbol;
      const secondUnit = availableUnits[1]?.symbol || firstUnit;

      setFromUnitSymbol(
        initialFromUnitId && availableUnits.some((u) => u.symbol === initialFromUnitId)
          ? initialFromUnitId
          : firstUnit
      );
      setToUnitSymbol(
        initialToUnitId && availableUnits.some((u) => u.symbol === initialToUnitId)
          ? initialToUnitId
          : secondUnit
      );
    }
  }, [categoryId, initialFromUnitId, initialToUnitId, availableUnits]);

  // Recalculate whenever active units, input values, or precision changes
  useEffect(() => {
    if (!fromUnitSymbol || !toUnitSymbol) return;

    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue)) {
      setOutputValue("");
      return;
    }

    const calculated = convertUnits(numericValue, fromUnitSymbol, toUnitSymbol, converter.slug);
    setOutputValue(formatPrecision(calculated, precision));

    // Save/Notify parent that this converter configuration was used
    const fromUnitObj = availableUnits.find((u) => u.symbol === fromUnitSymbol);
    const toUnitObj = availableUnits.find((u) => u.symbol === toUnitSymbol);
    
    if (fromUnitObj && toUnitObj && onConverterActive) {
      onConverterActive({
        categoryId: converter.slug,
        categoryName: converter.name,
        fromUnitId: fromUnitSymbol,
        fromUnitSymbol: fromUnitObj.symbol,
        toUnitId: toUnitSymbol,
        toUnitSymbol: toUnitObj.symbol,
      });
    }
  }, [inputValue, fromUnitSymbol, toUnitSymbol, categoryId, precision, availableUnits]);

  // Reciprocal Swapping
  const handleSwap = () => {
    const originalFrom = fromUnitSymbol;
    const originalTo = toUnitSymbol;
    setFromUnitSymbol(originalTo);
    setToUnitSymbol(originalFrom);

    // If output is valid, set input to it to allow reciprocal calculations
    if (outputValue && !isNaN(parseFloat(outputValue))) {
      setInputValue(outputValue);
    }
  };

  const handleCopy = async (text: string, isFrom: boolean) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (isFrom) {
        setCopiedFrom(true);
        setTimeout(() => setCopiedFrom(false), 1500);
      } else {
        setCopiedTo(true);
        setTimeout(() => setCopiedTo(false), 1500);
      }
    } catch (err) {
      console.error("Copy failed: ", err);
    }
  };

  const fromUnitObj = availableUnits.find((u) => u.symbol === fromUnitSymbol);
  const toUnitObj = availableUnits.find((u) => u.symbol === toUnitSymbol);

  const formulas = getConverterFormulas(converter);
  const faqs = getConverterFAQ(converter);

  return (
    <div className="space-y-6 text-text-primary bg-card-bg p-6 sm:p-8 rounded-2xl border border-border-main">
      {/* Category Info Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-main pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-accent-bg text-accent-teal border border-accent-border font-semibold">
              Engineering Standard Precision
            </span>
          </div>
          <h3 className="font-sans font-bold text-xl text-text-primary">
            {converter.name}
          </h3>
          <p className="text-xs text-text-secondary max-w-xl leading-relaxed">
            {converter.description}
          </p>
        </div>

        {/* Precision Setting */}
        <div className="flex items-center gap-2 bg-canvas-bg border border-border-main px-3 py-1.5 rounded-xl self-start">
          <span className="text-[11px] font-medium text-text-secondary">Precision:</span>
          <select
            id="precision-select"
            value={precision}
            onChange={(e) => setPrecision(parseInt(e.target.value))}
            className="bg-transparent border-0 font-mono text-xs font-semibold text-accent-teal outline-none focus:outline-none cursor-pointer"
          >
            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((p) => (
              <option key={p} value={p} className="bg-card-bg text-text-primary">
                {p} Decimals
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Conversion Panel */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* From Field */}
        <div className="col-span-full md:col-span-5 p-5 rounded-xl border border-border-main bg-canvas-bg space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
              Convert From
            </label>
            <UnitSearchCombobox
              id="from-combobox"
              units={availableUnits}
              selectedSymbol={fromUnitSymbol}
              onChange={setFromUnitSymbol}
              placeholder="Search source unit..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 border-b border-border-main/50 pb-1">
              <input
                id="converter-input-val"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
                className="w-full bg-transparent border-0 outline-none focus:outline-none text-2xl font-semibold text-text-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-mono"
              />
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-card-bg text-accent-teal">
                {fromUnitObj?.symbol}
              </span>
            </div>
            {inputValue && (
              <div className="flex justify-between items-center text-[10px] text-text-secondary">
                <span className="line-clamp-1 italic text-text-muted">{fromUnitObj?.description}</span>
                <button
                  id="copy-from-val-btn"
                  onClick={() => handleCopy(inputValue, true)}
                  className="flex items-center gap-1 hover:text-accent-teal font-medium cursor-pointer"
                  title="Copy value"
                >
                  {copiedFrom ? <Check className="w-3 h-3 text-teal-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedFrom ? "Copied" : "Copy"}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Swap Button (Col Span 1) */}
        <div className="col-span-full md:col-span-1 flex justify-center">
          <motion.button
            id="reciprocal-swap-btn"
            onClick={handleSwap}
            className="p-3 rounded-full bg-card-bg hover:bg-hover-bg text-accent-teal border border-border-main shadow-lg cursor-pointer flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-accent-teal"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            title="Swap Units"
            aria-label="Swap units"
          >
            <ArrowLeftRight className="w-4 h-4 rotate-90 md:rotate-0" />
          </motion.button>
        </div>

        {/* To Field */}
        <div className="col-span-full md:col-span-5 p-5 rounded-xl border border-border-main bg-canvas-bg space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
              Convert To
            </label>
            <UnitSearchCombobox
              id="to-combobox"
              units={availableUnits}
              selectedSymbol={toUnitSymbol}
              onChange={setToUnitSymbol}
              placeholder="Search target unit..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 border-b border-border-main/50 pb-1">
              <input
                id="converter-output-val"
                type="text"
                value={outputValue}
                readOnly
                placeholder="0"
                className="w-full bg-transparent border-0 outline-none focus:outline-none text-2xl font-semibold text-accent-teal font-mono"
              />
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-card-bg text-accent-teal">
                {toUnitObj?.symbol}
              </span>
            </div>
            {outputValue && (
              <div className="flex justify-between items-center text-[10px] text-text-secondary">
                <span className="line-clamp-1 italic text-text-muted">{toUnitObj?.description}</span>
                <button
                  id="copy-to-val-btn"
                  onClick={() => handleCopy(outputValue, false)}
                  className="flex items-center gap-1 hover:text-accent-teal font-medium cursor-pointer"
                  title="Copy conversion outcome"
                >
                  {copiedTo ? <Check className="w-3 h-3 text-teal-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedTo ? "Copied" : "Copy"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Model Information & Metrological Glossaries */}
      {fromUnitObj && toUnitObj && (() => {
        const glossary = getMetrologyGlossary(fromUnitObj, toUnitObj, converter.slug);
        const tableValues = [0.01, 0.1, 1, 5, 10, 50, 100, 500, 1000];
        
        return (
          <div className="space-y-10 border-t border-border-main pt-8">
            
            {/* 1. Introduction & Glossary Blocks (AEO Friendly) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl border border-border-main/50 bg-canvas-bg space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent-teal flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent-teal" />
                  <span>Understanding {fromUnitObj.name} ({fromUnitObj.symbol})</span>
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {glossary.fromDefinition}
                </p>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Historically, units like this evolved from practical observation, engineering prototypes, or international standards. Precision calibrations depend on fixed relationships to baseline physical parameters.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border-main/50 bg-canvas-bg space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent-teal flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent-teal" />
                  <span>Understanding {toUnitObj.name} ({toUnitObj.symbol})</span>
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {glossary.toDefinition}
                </p>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  The usage of standard scales like this reduces metrology errors in research, manufacturing, and legal definitions, allowing smooth technological coordination across different regions.
                </p>
              </div>
            </div>

            {/* Scientific Heritage & Conversion Pitfalls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl border border-border-main/50 bg-canvas-bg space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent-teal flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent-teal" />
                  <span>Scientific Heritage & Metrology History</span>
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {glossary.historyContext}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border-main/50 bg-canvas-bg space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent-teal flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent-teal" />
                  <span>Common Conversion Mistakes & Pitfalls</span>
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {glossary.commonMistakes}
                </p>
              </div>
            </div>

            {/* 2. Step-by-Step Worked Conversion Example */}
            <div className="p-6 rounded-2xl border border-border-main/50 bg-canvas-bg space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent-teal" />
                <span>Conversion Formula & Worked Mathematical Example</span>
              </h4>
              <div className="text-xs text-text-secondary leading-relaxed space-y-3">
                <p>
                  To convert between these scales, the algorithm uses physical factors. For the transition of <strong className="text-text-primary">{fromUnitObj.name}</strong> to <strong className="text-text-primary">{toUnitObj.name}</strong>, we solve the proportional ratio:
                </p>
                <pre className="p-4 rounded-xl bg-card-bg border border-border-main font-mono text-[11px] text-accent-teal whitespace-pre-wrap leading-relaxed overflow-x-auto shadow-inner">
                  {glossary.workedExample}
                </pre>
                <p className="text-[11px] text-text-muted italic">
                  Note: Values are rounded according to the standard float limits. Standard Double-Precision IEEE 754 limits apply to all operations.
                </p>
              </div>
            </div>

            {/* 3. Dual-Direction Common Conversion Table (With Copy & Print Actions) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                    <Printer className="w-4 h-4 text-accent-teal" />
                    <span>Reference Standard Conversion Grid</span>
                  </h4>
                  <p className="text-[10px] text-text-secondary">Dual direction tables mapping popular metric, imperial, and physical standard amounts.</p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      let md = `| ${fromUnitObj.name} (${fromUnitObj.symbol}) | ${toUnitObj.name} (${toUnitObj.symbol}) |   | ${toUnitObj.name} (${toUnitObj.symbol}) | ${fromUnitObj.name} (${fromUnitObj.symbol}) |\n`;
                      md += `|---|---|---|---|---|\n`;
                      tableValues.forEach((val) => {
                        const forward = convertUnits(val, fromUnitSymbol, toUnitSymbol, converter.slug);
                        const reverse = convertUnits(val, toUnitSymbol, fromUnitSymbol, converter.slug);
                        md += `| ${val} | ${formatPrecision(forward, precision)} | | ${val} | ${formatPrecision(reverse, precision)} |\n`;
                      });
                      navigator.clipboard.writeText(md);
                      alert("Markdown table copied to clipboard! You can paste it directly into Excel or Google Sheets.");
                    }}
                    className="px-2.5 py-1 text-[10px] font-semibold bg-card-bg border border-border-main hover:border-accent-teal rounded-lg cursor-pointer text-text-secondary hover:text-accent-teal transition-all flex items-center gap-1"
                    title="Copy table to clipboard as Markdown"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Table Data</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: From -> To Table */}
                <div className="border border-border-main/50 rounded-xl overflow-hidden bg-card-bg">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="bg-canvas-bg border-b border-border-main text-text-primary font-bold">
                        <th className="px-4 py-2 font-mono">{fromUnitObj.name} ({fromUnitObj.symbol})</th>
                        <th className="px-4 py-2 font-mono">{toUnitObj.name} ({toUnitObj.symbol})</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-main/30 text-text-secondary font-mono">
                      {tableValues.map((val) => {
                        const res = convertUnits(val, fromUnitSymbol, toUnitSymbol, converter.slug);
                        return (
                          <tr key={val} className="hover:bg-hover-bg/30">
                            <td className="px-4 py-2">{val.toLocaleString()}</td>
                            <td className="px-4 py-2 font-bold text-accent-teal">{formatPrecision(res, precision)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Right: To -> From Table */}
                <div className="border border-border-main/50 rounded-xl overflow-hidden bg-card-bg">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="bg-canvas-bg border-b border-border-main text-text-primary font-bold">
                        <th className="px-4 py-2 font-mono">{toUnitObj.name} ({toUnitObj.symbol})</th>
                        <th className="px-4 py-2 font-mono">{fromUnitObj.name} ({fromUnitObj.symbol})</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-main/30 text-text-secondary font-mono">
                      {tableValues.map((val) => {
                        const res = convertUnits(val, toUnitSymbol, fromUnitSymbol, converter.slug);
                        return (
                          <tr key={val} className="hover:bg-hover-bg/30">
                            <td className="px-4 py-2">{val.toLocaleString()}</td>
                            <td className="px-4 py-2 font-bold text-accent-teal">{formatPrecision(res, precision)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 4. Practical Sector Use Cases */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Practical Applications & Industrial Sectors
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {glossary.practicalUseCases.map((useCase, index) => (
                  <div key={index} className="p-4.5 rounded-xl border border-border-main/30 bg-card-bg hover:border-accent-teal/30 transition-all space-y-1.5">
                    <p className="text-xs font-bold text-text-primary">{useCase.title}</p>
                    <p className="text-[10px] text-text-secondary leading-relaxed">{useCase.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Same Category Related Internal Links for Crawling Authority */}
            <div className="border-t border-border-main/50 pt-8 space-y-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  Related Metrological Tools (Internal Linking)
                </h4>
                <p className="text-[10px] text-text-secondary">Explore related measurement tools within the same active engineering standards categories.</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] font-medium font-sans">
                {CONVERTERS_LIST.filter(c => c.category === converter.category && c.slug !== converter.slug).slice(0, 8).map(rel => (
                  <button
                    key={rel.slug}
                    onClick={() => {
                      const categoryId = rel.slug;
                      const parentCategory = rel.category;
                      const targetPath = `/${parentCategory}/${categoryId}`;
                      window.history.pushState(null, "", targetPath);
                      window.dispatchEvent(new PopStateEvent("popstate"));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-3.5 py-2 rounded-lg bg-canvas-bg hover:bg-hover-bg text-left border border-border-main/30 text-text-secondary hover:text-accent-teal transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate">{rel.name.replace(" Converter", "")}</span>
                    <ArrowRight className="w-3 h-3 text-text-muted group-hover:text-accent-teal transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* 6. FAQ Section */}
            <div className="border-t border-border-main/50 pt-8 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-accent-teal" />
                <span>Frequently Asked Questions - FAQ</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4 rounded-xl border border-border-main/30 bg-canvas-bg/50 space-y-1.5">
                    <p className="text-xs font-semibold text-text-primary">{faq.question}</p>
                    <p className="text-[11px] text-text-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        );
      })()}
    </div>
  );
}
