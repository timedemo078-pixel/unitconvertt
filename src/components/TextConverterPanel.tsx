/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Copy, Check, FileText, Type, Sparkles, Hash } from "lucide-react";
import { CASE_TRANSFORMATIONS, transformText } from "../lib/conversion-engine";
import { motion } from "motion/react";

export default function TextConverterPanel() {
  const [inputText, setInputText] = useState("");
  const [selectedCase, setSelectedCase] = useState("upper");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);

  // Auto conversion on change
  useEffect(() => {
    const output = transformText(inputText, selectedCase);
    setOutputText(output);
  }, [inputText, selectedCase]);

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
  };

  const characterCount = inputText.length;
  const wordCount = inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-accent-bg text-accent-teal border border-accent-border">
          <Type className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-text-primary">
            Case & Style Converter
          </h3>
          <p className="text-xs text-text-secondary">
            High-fidelity string formatting and programming notation cases
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Transformation Modes */}
        <div className="col-span-full lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl border border-border-main bg-card-bg shadow-sm">
            <h4 className="font-display font-semibold text-xs text-text-muted tracking-wider uppercase mb-3">
              Case Case Target
            </h4>
            <div className="space-y-1.5">
              {CASE_TRANSFORMATIONS.map((mode) => (
                <button
                  key={mode.id}
                  id={`case-mode-${mode.id}-btn`}
                  onClick={() => setSelectedCase(mode.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center justify-between ${
                    selectedCase === mode.id
                      ? "bg-accent-teal text-white dark:text-canvas-dark font-bold shadow-sm"
                      : "text-text-primary hover:bg-hover-bg"
                  }`}
                >
                  <span>{mode.name}</span>
                  {selectedCase === mode.id && <Sparkles className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Stats card */}
          <div className="p-4 rounded-2xl border border-border-main bg-card-bg shadow-sm flex flex-col xs:flex-row xs:items-center justify-between gap-3 text-xs text-text-secondary">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-text-muted" />
              <span>
                Words: <strong className="text-text-primary">{wordCount}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-text-muted" />
              <span>
                Characters: <strong className="text-text-primary">{characterCount}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Text Areas */}
        <div className="col-span-full lg:col-span-8 space-y-4">
          {/* Input field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Input Text
            </label>
            <textarea
              id="case-converter-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or write your raw engineering notation or paragraph text here..."
              className="w-full h-36 p-4 rounded-2xl border border-border-main bg-card-bg text-text-primary text-sm focus:ring-1 focus:ring-accent-teal outline-none transition-shadow placeholder:text-text-muted"
            />
          </div>

          {/* Output field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Output
              </label>
              {outputText && (
                <button
                  id="copy-text-btn"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-semibold text-accent-teal hover:text-accent-teal-hover cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="relative">
              <textarea
                id="case-converter-output"
                value={outputText}
                readOnly
                placeholder="Transformed case output will appear instantly here..."
                className="w-full h-36 p-4 rounded-2xl border border-border-main bg-panel-bg text-text-primary text-sm outline-none placeholder:text-text-muted"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
