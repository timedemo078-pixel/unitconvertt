/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Scale, Heart, Info, Shield, Radio, Flame, Zap } from "lucide-react";
import { AppView } from "../types";

interface FooterProps {
  onNavigate: (view: AppView) => void;
  onOpenGuide: () => void;
}

export default function Footer({ onNavigate, onOpenGuide }: FooterProps) {
  return (
    <footer className="border-t border-border-main bg-navbar-bg text-text-secondary py-16 px-6 sm:px-8 mt-16">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Column 1: Product info */}
        <div className="col-span-full md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5 text-text-primary font-sans font-extrabold">
            <Scale className="w-5 h-5 text-accent-teal" />
            <span className="tracking-tight text-sm">UnitConvert Platform</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
            Professional-grade, offline-first metric converter configured in alignment with the NIST SP 811 calibration reference manual. Precision-formatted and verified under strict criteria.
          </p>
          <div className="text-[10px] text-text-muted font-mono flex items-center gap-2 bg-kbd-bg border border-border-main p-2.5 rounded-xl w-fit max-w-full">
            <Info className="w-3.5 h-3.5 text-accent-teal" />
            <span>Secure Sandboxed Execution (Local Only)</span>
          </div>
        </div>

        {/* Column 2: Converter Categories */}
        <div className="col-span-full md:col-span-2 space-y-3">
          <h4 className="font-sans font-bold text-text-primary text-xs tracking-wider uppercase">
            Categories
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button
                onClick={() => onNavigate("home")}
                className="hover:text-accent-teal cursor-pointer transition-colors text-left"
              >
                Common Units
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  window.history.pushState(null, "", "/engineering");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                className="hover:text-accent-teal cursor-pointer transition-colors text-left"
              >
                Engineering
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  window.history.pushState(null, "", "/heat");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                className="hover:text-accent-teal cursor-pointer transition-colors text-left"
              >
                Heat & Thermal
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  window.history.pushState(null, "", "/fluid");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                className="hover:text-accent-teal cursor-pointer transition-colors text-left"
              >
                Fluid Mechanics
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Engineering */}
        <div className="col-span-full md:col-span-2 space-y-3">
          <h4 className="font-sans font-bold text-text-primary text-xs tracking-wider uppercase">
            Engineering
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button
                onClick={() => {
                  window.history.pushState(null, "", "/electricity");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                className="hover:text-accent-teal cursor-pointer transition-colors text-left"
              >
                Electricity
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  window.history.pushState(null, "", "/magnetism");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                className="hover:text-accent-teal cursor-pointer transition-colors text-left"
              >
                Magnetism
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  window.history.pushState(null, "", "/radiology");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                className="hover:text-accent-teal cursor-pointer transition-colors text-left"
              >
                Radiology
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  window.history.pushState(null, "", "/light");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                className="hover:text-accent-teal cursor-pointer transition-colors text-left"
              >
                Light & Optics
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div className="col-span-full md:col-span-4 space-y-3">
          <h4 className="font-sans font-bold text-text-primary text-xs tracking-wider uppercase">
            Legal & Support
          </h4>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <button
                onClick={() => onNavigate("disclaimer")}
                className="hover:text-accent-teal cursor-pointer transition-colors text-left"
              >
                Liability Disclaimer
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("privacy")}
                className="hover:text-accent-teal cursor-pointer transition-colors text-left"
              >
                Privacy & Data Security
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("about")}
                className="hover:text-accent-teal cursor-pointer transition-colors text-left"
              >
                About NIST Standards
              </button>
            </li>
            <li>
              <button
                onClick={onOpenGuide}
                className="hover:text-accent-teal cursor-pointer transition-colors text-left"
              >
                Shortcuts & Guide
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyblock footer */}
      <div className="max-w-[1440px] mx-auto border-t border-border-main mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
        <p>
          &copy; {new Date().getFullYear()} UnitConvert. All rights reserved. NIST SP 811 calibrated alignment.
        </p>
        <div className="flex items-center gap-1.5">
          <span>Engineered with mathematical precision</span>
          <Heart className="w-3 h-3 text-accent-teal fill-accent-teal shrink-0" />
        </div>
      </div>
    </footer>
  );
}
