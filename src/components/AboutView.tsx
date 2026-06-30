/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Award, Compass, ShieldCheck, CheckCircle2, Server, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

export default function AboutView() {
  const [mountedTheme, setMountedTheme] = useState("dark");

  useEffect(() => {
    // Check mounted state of dark class
    const isDark = document.documentElement.classList.contains("dark");
    setMountedTheme(isDark ? "dark" : "light");
  }, []);

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="space-y-2">
        <h2 className="font-display font-extrabold text-3xl text-text-primary tracking-tight">
          About UnitConvert
        </h2>
        <p className="text-text-secondary text-sm max-w-2xl leading-relaxed">
          UnitConvert is an offline-first, professional, engineering-grade conversion platform calibrated against strict international standards.
        </p>
      </div>

      {/* Grid of Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border border-border-main bg-card-bg shadow-sm space-y-3">
          <div className="p-2 w-10 h-10 flex items-center justify-center rounded-xl bg-accent-bg text-accent-teal border border-accent-border/30">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-text-primary text-sm">
            NIST SP 811 Compliance
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Every single coefficient for mechanical, electronic, thermal, radiological, and volumetric values is cross-referenced directly against NIST Special Publication 811 specifications.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-border-main bg-card-bg shadow-sm space-y-3">
          <div className="p-2 w-10 h-10 flex items-center justify-center rounded-xl bg-accent-bg text-accent-teal border border-accent-border/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-text-primary text-sm">
            Offline-First Protection
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            All calculations are executed natively inside your browser. No data leaves your machine, making UnitConvert perfect for secure air-gapped engineering environments.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-border-main bg-card-bg shadow-sm space-y-3">
          <div className="p-2 w-10 h-10 flex items-center justify-center rounded-xl bg-accent-bg text-accent-teal border border-accent-border/30">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-text-primary text-sm">
            Radix & String Subsystems
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Equipped with auxiliary toolboxes for converting computer science bases (Binary to Hex) and programming notation strings (camelCase, snake_case) seamlessly.
          </p>
        </div>
      </div>

      {/* Calibration details */}
      <div className="p-6 rounded-2xl border border-border-main bg-card-bg shadow-sm space-y-4">
        <h3 className="font-display font-bold text-text-primary text-base">
          Dimensional Precision & Correction Pass
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Standard JavaScript float representations suffer from binary-fractional drift (e.g. 0.1 + 0.2 != 0.3). UnitConvert implements a specialized floating-point rounding buffer inside our math core. This keeps calculated coefficients precise up to 12 decimal places without causing cascade errors or UI lockups.
        </p>

        <div className="border-t border-border-main pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-teal" />
            <span>Multiplicative baseline routing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-teal" />
            <span>Affine temperature scale conversions</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-teal" />
            <span>Dimensional integrity guards on Electromagnetism</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-teal" />
            <span>Coherent absorbed vs equivalent radiological dose scales</span>
          </div>
        </div>
      </div>
    </div>
  );
}
