/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShieldCheck, HardDrive, Lock, Heart } from "lucide-react";

export default function PrivacyView() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-display font-extrabold text-3xl text-text-primary tracking-tight flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-accent-teal shrink-0" /> Privacy Policy
        </h2>
        <p className="text-text-secondary text-sm">
          Guaranteed offline-first architecture with absolutely zero telemetry, cookies, or remote data logs.
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-border-main bg-card-bg shadow-sm space-y-6 text-xs text-text-secondary leading-relaxed">
        {/* Local Storage Only */}
        <div className="space-y-2">
          <h3 className="font-display font-semibold text-text-primary text-sm flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-accent-teal" /> Local Storage Configuration
          </h3>
          <p>
            UnitConvert stores your application settings (such as active light/dark mode preference and the last 5 active converters) strictly inside your web browser's local state storage (<code className="font-mono bg-kbd-bg px-1 py-0.5 rounded">localStorage</code>). No servers are involved in tracking your history or active inputs. Clearing your browser cache or cookies will cleanly wipe this data instantly.
          </p>
        </div>

        {/* Data Security and Encryption */}
        <div className="space-y-2">
          <h3 className="font-display font-semibold text-text-primary text-sm flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-accent-teal" /> Data Isolation Protocols
          </h3>
          <p>
            Because we use a 100% client-side compilation model under Vite React, there is zero data pipeline running between your active conversions and external networks. Raw strings, passwords, numbers, bases, or text pasted into the tool are processed exclusively in volatile CPU memory. They are never written to disk or sent to any telemetry endpoints.
          </p>
        </div>

        {/* Zero Cookies Policy */}
        <div className="space-y-2">
          <h3 className="font-display font-semibold text-text-primary text-sm flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-pink-500" /> Respecting Your Attention
          </h3>
          <p>
            We do not use analytics trackers (like Google Analytics, Hotjar, or Mixpanel), advertising trackers, or functional session cookies. The software remains quiet, safe, and professional so you can focus entirely on your engineering tasks.
          </p>
        </div>
      </div>
    </div>
  );
}
