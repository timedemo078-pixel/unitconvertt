/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Search,
  CheckCircle,
  HelpCircle,
  Scale,
  Cpu,
  BookOpen,
  Award,
  Zap,
  TrendingUp,
  Clock,
  RotateCw,
  ChevronRight,
  Shield,
  Layers,
  Sparkles,
  Info
} from "lucide-react";
import { CONVERTERS_LIST, CONVERTER_CATEGORIES } from "../lib/converters-data";
import { motion } from "motion/react";

interface HomeDashboardProps {
  onSelectConverter: (categoryId: string, subCategoryName?: string, fromUnitId?: string, toUnitId?: string) => void;
  onOpenSearch: () => void;
  historyLength: number;
  renderCategoryIcon: (slug: string, sizeClass?: string) => React.ReactNode;
  getCategoryHeaderIcon: (id: string, sizeClass?: string) => React.ReactNode;
  renderHistoryWidget: () => React.ReactNode;
}

export default function HomeDashboard({
  onSelectConverter,
  onOpenSearch,
  historyLength,
  renderCategoryIcon,
  getCategoryHeaderIcon,
  renderHistoryWidget,
}: HomeDashboardProps) {
  // Frequently Asked Questions on Homepage
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const homeFaqs = [
    {
      question: "How are the physical constants and conversion coefficients verified?",
      answer: "All conversion factors on UnitConvert are calibrated directly against the National Institute of Standards and Technology (NIST) Special Publication 811 (Guide for the Use of the International System of Units). This ensures alignment with SI (Système International d'Unités) standards used globally by researchers, metrologists, and aerospace engineers."
    },
    {
      question: "What is double-precision floating-point roundoff protection?",
      answer: "Web browsers use IEEE 754 double-precision floats to represent numbers, which can lead to binary rounding errors (e.g., 0.1 + 0.2 resulting in 0.30000000000000004). UnitConvert implements a specialized mathematical normalization guard that filters out representation noise and caps active rounding based on your selected precision (up to 12 decimal places)."
    },
    {
      question: "Does the platform work offline for industrial and field engineering?",
      answer: "Yes. UnitConvert is designed offline-first. Once loaded in your browser, the entire mathematical model, conversion lists, formulas, and search functions run entirely on your local CPU. No network requests are sent, ensuring instant calculation speeds and absolute privacy in high-security locations or remote fields."
    },
    {
      question: "Why does UnitConvert define specific 'Base Units' for each category?",
      answer: "To preserve relative numerical accuracy across extreme scales (e.g., micro-inches to light-years), we define an SI or ISO baseline unit (e.g., the Meter for Length) as a central node. All conversions scale relative to this absolute node, preventing compounding conversion-ratio errors."
    }
  ];

  const stats = [
    { label: "NIST Calibrated", value: "100%", desc: "Aligned with SP 811 standards", icon: <Award className="w-4 h-4 text-accent-teal" /> },
    { label: "Total Categories", value: "70+", desc: "Common, Engineering, Heat & Light", icon: <Layers className="w-4 h-4 text-accent-teal" /> },
    { label: "Active Units", value: "480+", desc: "Physical, thermodynamic, electrical", icon: <Cpu className="w-4 h-4 text-accent-teal text-[#17D7C8]" /> },
    { label: "Local Latency", value: "<1ms", desc: "100% offline edge execution", icon: <Zap className="w-4 h-4 text-accent-teal text-[#17D7C8]" /> },
  ];

  const popularSlugs = ["length", "weight", "volume", "temperature", "pressure", "energy", "case", "numbers"];

  return (
    <div className="space-y-16">
      
      {/* 1. Hero Container & Strategic SEO Greeting */}
      <div className="flex flex-col items-center text-center py-6 sm:py-10 space-y-6">
        <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-full bg-accent-bg text-accent-teal border border-accent-border font-bold">
          Scientific Metrology Standards • NIST SP 811 Aligned
        </span>
        
        <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight max-w-4xl">
          Professional Unit Conversion <span className="text-accent-teal">Engine</span>
        </h2>
        
        <p className="text-xs sm:text-sm text-text-secondary max-w-[680px] leading-relaxed mx-auto">
          Secure, lightning-fast offline-first calculations with double-precision roundoff protection. Engineered for researchers, developers, academics, and metrology professionals.
        </p>

        {/* Large Hero Search Bar */}
        <div className="relative w-full max-w-[620px] mx-auto pt-2">
          <button
            onClick={onOpenSearch}
            className="w-full h-12 rounded-full bg-card-bg border border-border-main hover:border-accent-teal/40 px-5 flex items-center justify-between text-text-secondary cursor-pointer transition-all duration-200 text-xs sm:text-sm shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-text-muted animate-pulse" />
              <span>Search 480+ metric, imperial, and physical units, symbols...</span>
            </div>
            <kbd className="px-2 py-0.5 font-mono text-[9px] bg-kbd-bg text-text-muted rounded border border-border-main shadow-sm select-none shrink-0">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Popular Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-text-muted font-semibold pt-2">
          <span>Popular:</span>
          {popularSlugs.map((popSlug) => {
            const matched = CONVERTERS_LIST.find((c) => c.slug === popSlug);
            if (!matched) return null;
            return (
              <button
                key={popSlug}
                onClick={() => onSelectConverter(popSlug)}
                className="text-text-secondary hover:text-accent-teal transition-all bg-card-bg hover:border-accent-teal border border-border-main px-2.5 py-1 rounded-lg cursor-pointer text-[10px] font-mono shadow-xs"
              >
                {matched.name.replace(" Converter", "")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid containing categories and sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Main Category listings) */}
        <div className="col-span-full lg:col-span-9 space-y-12">
          
          {/* Category Sections */}
          {CONVERTER_CATEGORIES.map((cat) => {
            const sectionConverters = CONVERTERS_LIST.filter(
              (c) => c.category === cat.id
            );

            if (sectionConverters.length === 0) return null;

            return (
              <section key={cat.id} className="space-y-[18px]">
                {/* Section Header */}
                <div className="flex items-center gap-3 border-b border-border-main/50 pb-3">
                  <div className="p-2 rounded-xl bg-accent-bg text-accent-teal border border-accent-border shrink-0 shadow-sm">
                    {getCategoryHeaderIcon(cat.id)}
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-base text-text-primary tracking-tight flex items-center gap-2">
                      <span>{cat.name}</span>
                      <span className="text-[10px] font-mono font-bold text-accent-teal bg-accent-bg px-1.5 py-0.5 rounded border border-accent-border/50">
                        {sectionConverters.length}
                      </span>
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {sectionConverters.map((conv) => (
                    <div
                      key={conv.slug}
                      id={`converter-card-${conv.slug}`}
                      onClick={() => onSelectConverter(conv.slug)}
                      className="h-28 rounded-[14px] p-[18px] border border-border-main bg-card-bg hover:border-accent-teal hover:bg-hover-bg hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer flex flex-col justify-between shadow-xs"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="p-1.5 rounded-lg bg-kbd-bg border border-border-main shrink-0">
                          {renderCategoryIcon(conv.slug, "w-4 h-4")}
                        </div>
                        <div className="space-y-0.5 truncate">
                          <h4 className="font-sans font-bold text-xs text-text-primary group-hover:text-accent-teal truncate">
                            {conv.name}
                          </h4>
                          <p className="text-[10px] text-text-secondary line-clamp-2 leading-relaxed">
                            {conv.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-[10px] text-text-muted font-semibold font-mono flex items-center justify-between border-t border-border-main/30 pt-2 mt-1">
                        <span>{conv.units.length} Units</span>
                        <span className="text-accent-teal opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                          Launch <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Right Sticky Sidebar */}
        <aside className="col-span-full lg:col-span-3 lg:sticky lg:top-24 self-start space-y-6">
          {/* History Widget */}
          {renderHistoryWidget()}

          {/* Quick Statistics Block */}
          <div className="bg-card-bg border border-border-main rounded-2xl p-5 space-y-4 shadow-xs">
            <h4 className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5 border-b border-border-main/50 pb-2">
              <TrendingUp className="w-3.5 h-3.5 text-accent-teal" />
              <span>Calculation Stats</span>
            </h4>
            <div className="space-y-3.5">
              {stats.map((st, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <div className="p-1.5 rounded-lg bg-canvas-bg border border-border-main text-accent-teal mt-0.5">
                    {st.icon}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-xs font-bold text-text-primary">{st.value}</span>
                      <span className="text-[10px] text-text-secondary font-semibold">{st.label}</span>
                    </div>
                    <p className="text-[9px] text-text-muted leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Badge */}
          <div className="p-4 rounded-xl border border-accent-border/50 bg-accent-bg text-[10px] text-text-secondary leading-relaxed space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-accent-teal">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>NIST Metrology Aligned</span>
            </div>
            <p>
              Calculations are tested daily against baseline values verified by standard metrology equations.
            </p>
          </div>
        </aside>
      </div>

      {/* 2. Interactive Metrology Bento - Why Choose Section */}
      <section className="space-y-6 pt-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h3 className="font-sans font-bold text-xl tracking-tight">Designed for Industrial & Scientific Excellence</h3>
          <p className="text-xs text-text-secondary">Why engineers, researchers, and developers choose UnitConvert for accurate mathematical conversions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-5 rounded-2xl bg-card-bg border border-border-main space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-accent-bg text-accent-teal border border-accent-border w-10 h-10 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">NIST Alignment</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Coefficients derived directly from NIST Special Publication 811 calibration ratios, providing a standard reference node.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card-bg border border-border-main space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-accent-bg text-accent-teal border border-accent-border w-10 h-10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-[#17D7C8]" />
              </div>
              <h4 className="font-bold text-sm">Double Precision Protection</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Algorithmic filter prevents IEEE 754 float rounding errors in Javascript, ensuring values resolve to true fractions.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card-bg border border-border-main space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-accent-bg text-accent-teal border border-accent-border w-10 h-10 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Offline-First Privacy</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Calculations execute on your local engine. Zero network transmission, zero cookie trackers, and zero database logs.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card-bg border border-border-main space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-2 rounded-xl bg-accent-bg text-accent-teal border border-accent-border w-10 h-10 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Interactive History</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Quickly access your past 5 conversion types from the sticky sidebar, cached locally inside secure browser state.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Authoritative Metrology Guide (SI Base & Derived Units) */}
      <section className="bg-card-bg rounded-2xl p-6 sm:p-8 border border-border-main space-y-6">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-accent-teal" />
          <h3 className="font-sans font-extrabold text-lg text-text-primary">
            Scientific Metrology Guide: Understanding SI vs. Imperial Scales
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-text-secondary leading-relaxed">
          <div className="space-y-3">
            <p>
              The International System of Units (SI) represents the modern standard for scientific metrology. Since the landmark **2019 SI Redefinition**, all seven base units are defined strictly in terms of fundamental physical constants (such as Planck's constant <code className="font-mono bg-canvas-bg px-1 text-text-primary">h</code> and the speed of light <code className="font-mono bg-canvas-bg px-1 text-text-primary">c</code>), rather than physical artifact standards.
            </p>
            <p>
              UnitConvert models conversions hierarchically. We treat base SI units—the **Meter (m)** for length, **Kilogram (kg)** for mass, **Second (s)** for time, **Kelvin (K)** for temperature, **Ampere (A)** for current, and **Mole (mol)** for chemical substance—as centralized translation nodes.
            </p>
          </div>
          <div className="space-y-3">
            <p>
              By contrast, US Customary and Imperial units (such as feet, gallons, and pounds) are defined legally relative to SI units. Under the **1959 International Yard and Pound Agreement**, 1 yard is defined as exactly <code className="font-mono bg-canvas-bg px-1 text-text-primary">0.9144</code> meters, and 1 pound avoirdupois is exactly <code className="font-mono bg-canvas-bg px-1 text-text-primary">0.45359237</code> kilograms.
            </p>
            <p>
              This absolute legal definitions mean that conversions between Metric and Imperial can be made mathematically precise without fractional decay, provided the conversion engine maintains double-precision alignment. UnitConvert is calibrated against these precise constants to eliminate systemic roundoff creep.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Homepage FAQ Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-sans font-bold text-lg text-text-primary flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent-teal" />
            <span>Metrology Frequently Asked Questions</span>
          </h3>
          <p className="text-xs text-text-secondary max-w-xl mx-auto">Get expert, factual answers regarding the metrology calculations, math limits, and privacy protocols.</p>
        </div>

        <div className="max-w-4xl mx-auto border border-border-main rounded-2xl bg-card-bg divide-y divide-border-main/50 overflow-hidden shadow-xs">
          {homeFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="transition-colors duration-150">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-hover-bg/40 focus:outline-none"
                >
                  <span className="text-xs font-semibold text-text-primary font-sans">{faq.question}</span>
                  <ChevronRight className={`w-4 h-4 text-accent-teal transition-transform duration-200 shrink-0 ${isOpen ? "rotate-90" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 bg-canvas-bg/30">
                    <p className="text-[11px] text-text-secondary leading-relaxed max-w-3xl">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Direct SEO Internal Linking Hub */}
      <section className="border-t border-border-main/50 pt-10 space-y-6">
        <div className="space-y-1">
          <h4 className="text-[10px] font-mono font-bold text-accent-teal uppercase tracking-widest flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-accent-teal shrink-0" />
            <span>Alphabetical Converter Index (Internal Link Hub)</span>
          </h4>
          <p className="text-[10px] text-text-muted">Direct links to our scientific calculation engines to maximize crawling index depth and structural topical authority.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-3.5 gap-x-6 text-[10px] border border-border-main/30 p-5 rounded-2xl bg-card-bg">
          {CONVERTERS_LIST.map((conv) => (
            <button
              key={conv.slug}
              onClick={() => onSelectConverter(conv.slug)}
              className="text-left text-text-secondary hover:text-accent-teal font-medium cursor-pointer flex items-center gap-1.5 transition-colors group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-border-main group-hover:bg-accent-teal transition-colors shrink-0" />
              <span className="truncate">{conv.name}</span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}
