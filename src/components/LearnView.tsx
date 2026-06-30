/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { BookOpen, ShieldCheck, Cpu, Scale, ChevronRight, HelpCircle, ArrowRight, User, Calendar } from "lucide-react";

interface Article {
  id: string;
  title: string;
  summary: string;
  publishedDate: string;
  author: string;
  readingTime: string;
  content: React.ReactNode;
}

export default function LearnView() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Schema Injection for LearnView
  useEffect(() => {
    const siteUrl = window.location.origin || "https://unitconvert.com";
    const canonicalUrl = `${siteUrl}/learn`;
    
    const articleSchemas = articles.map((art) => ({
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${canonicalUrl}/${art.id}`
      },
      "headline": art.title,
      "description": art.summary,
      "datePublished": art.publishedDate,
      "dateModified": "2026-06-30",
      "author": {
        "@type": "Organization",
        "name": "UnitConvert Labs",
        "url": siteUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": "UnitConvert",
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/favicon.svg`
        }
      }
    }));

    // Insert or update script tag for Articles
    const scriptId = "unitconvert-articles-jsonld";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.type = "application/ld+json";
      document.body.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(articleSchemas, null, 2);

    return () => {
      // Cleanup is optional as maintaining indexing tags is preferred
    };
  }, []);

  const articles: Article[] = [
    {
      id: "science-of-metrology",
      title: "The Science of Metrology: Standardizing Global Physical Scales",
      summary: "Explore how the 2019 International System of Units (SI) redefinition transformed physical measurements from fragile physical artifacts into absolute constant scales.",
      publishedDate: "2026-06-15",
      author: "UnitConvert Standards Committee",
      readingTime: "5 min read",
      content: (
        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
          <p>
            For centuries, human measurements were tied to physical objects or natural events. The standard unit of length, the meter, was once a platinum-iridium bar kept in a vault near Paris. The standard unit of mass, the kilogram, was defined by a specific metal cylinder nicknamed the "Le Grand K".
          </p>
          <div className="p-4.5 rounded-xl border border-accent-border bg-accent-bg text-text-secondary space-y-2">
            <h5 className="font-bold text-text-primary flex items-center gap-1.5 text-xs uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-accent-teal" />
              <span>The 2019 Metrological Revolution</span>
            </h5>
            <p className="text-xs">
              On May 20, 2019, the General Conference on Weights and Measures implemented the most sweeping change to physical measurement since the French Revolution. All seven SI base units are now defined strictly in terms of fixed values of natural constants—specifically, the speed of light (<code className="font-mono bg-canvas-bg px-1">c</code>), Planck's constant (<code className="font-mono bg-canvas-bg px-1">h</code>), elementary charge (<code className="font-mono bg-canvas-bg px-1">e</code>), Boltzmann's constant (<code className="font-mono bg-canvas-bg px-1">k</code>), and the Avogadro constant (<code className="font-mono bg-canvas-bg px-1">N_A</code>).
            </p>
          </div>
          <p>
            By anchoring measurements to immutable universal constraints, scientific metrologists have eliminated the risk of calibration decay. A kilogram of mass measured in Tokyo is perfectly equal to a kilogram in Geneva or on Mars, because they are both linked to Planck's constant using precision watt balances.
          </p>
          <h4 className="font-sans font-bold text-text-primary text-base pt-2">Why It Matters for Engineering & Computation</h4>
          <p>
            In modern microelectronics, aerospace manufacturing, and automated robotics, a dimensional error of a few nanometers can destroy a system. For software developers and engineers, this means calculation engines must maintain perfect alignment with the numerical ratios declared in the NIST SP 811.
          </p>
        </div>
      )
    },
    {
      id: "float-precision-drift",
      title: "Float Precision Drift: Why Software Calculators Suffer Representation Errors",
      summary: "Understand the IEEE 754 double-precision float standard and why binary representation makes normal browser conversion forms numerically inaccurate.",
      publishedDate: "2026-06-20",
      author: "UnitConvert Engineering Lead",
      readingTime: "4 min read",
      content: (
        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
          <p>
            Every software engineer has encountered this classic mystery: open your browser terminal, type <code className="font-mono bg-canvas-bg px-1">0.1 + 0.2</code>, and press Enter. Instead of the clean <code className="font-mono bg-canvas-bg px-1">0.3</code> you expect, the output displays <code className="font-mono bg-canvas-bg px-1">0.30000000000000004</code>.
          </p>
          <div className="p-4.5 rounded-xl border border-border-main bg-canvas-bg space-y-2">
            <h5 className="font-bold text-text-primary flex items-center gap-1.5 text-xs uppercase tracking-wide">
              <Cpu className="w-4 h-4 text-accent-teal" />
              <span>The Binary Fraction Problem</span>
            </h5>
            <p className="text-xs">
              Modern computers store floating-point numbers in binary format using the IEEE 754 standard. While integers scale nicely, fractional numbers are represented as sums of powers of two (e.g., 1/2, 1/4, 1/8). In base-10, the fraction 1/3 (0.333...) has an infinite repeating pattern. Similarly, in base-2 (binary), standard numbers like 0.1 and 0.2 have infinite repeating patterns. When the computer forces these values into a fixed 64-bit space, the repeating tails are truncated, causing small "roundoff" errors.
            </p>
          </div>
          <p>
            While this 17th-decimal drift seems tiny, compounding it across multiple linear steps (e.g., scaling yards to feet to miles to inches) creates systemic calculation inaccuracies that degrade spatial layouts, thermodynamic metrics, and scientific models.
          </p>
          <h4 className="font-sans font-bold text-text-primary text-base pt-2">How UnitConvert Guards Numerical Accuracy</h4>
          <p>
            Our core calculation engine implements a dynamic normalization layer. Whenever a conversion is requested, the output is passed through an accuracy threshold buffer. This filters out the residual representation drift of binary representations, restoring mathematically true numbers aligned directly with the selected decimal precision limits.
          </p>
        </div>
      )
    },
    {
      id: "thermodynamic-affine-scales",
      title: "Affine Transforms & Scaling: The Complex Math of Temperature Conversions",
      summary: "Learn why temperature conversion differs from linear distance scales due to thermodynamic offsets and physical zero-point alignments.",
      publishedDate: "2026-06-25",
      author: "Metrology Laboratory Director",
      readingTime: "6 min read",
      content: (
        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
          <p>
            Most physical dimensions (such as length, area, or energy) are linearly scaled. Converting meters to feet is a simple scalar multiplication: you multiply by the conversion factor. This is because these scales share a common, absolute physical origin: zero distance means zero space.
          </p>
          <p>
            Temperature is different. While Kelvin is an absolute thermodynamic scale where zero represents the theoretical absence of all kinetic energy, Celsius and Fahrenheit are relative scales calibrated to distinct benchmarks (the freezing point of water and a specific ammonium chloride brine mixture, respectively).
          </p>
          <div className="p-4.5 rounded-xl border border-accent-border bg-accent-bg text-text-secondary space-y-2">
            <h5 className="font-bold text-text-primary flex items-center gap-1.5 text-xs uppercase tracking-wide">
              <Scale className="w-4 h-4 text-accent-teal" />
              <span>Understanding Affine Math</span>
            </h5>
            <p className="text-xs">
              Because relative temperature scales do not share a common zero point, converting between them requires an **affine transformation** consisting of both a scaling factor (multiplication) and an origin displacement (offset). This is why Celsius to Fahrenheit relies on the equation <code className="font-mono bg-canvas-bg px-1">(°C × 9/5) + 32</code>. The 32 represents the offset between Celsius and Fahrenheit zero reference limits.
            </p>
          </div>
          <p>
            Applying a simple linear scaling coefficient to temperatures will produce extreme metrological errors. This is also why UnitConvert separates temperature routing into a dedicated mathematical solver, ensuring absolute offsets and absolute zero constraints (such as -273.15 °C or -459.67 °F) are enforced exactly.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="space-y-2">
        <h2 className="font-sans font-extrabold text-3xl text-text-primary tracking-tight">
          Metrology Learn & Research Hub
        </h2>
        <p className="text-text-secondary text-sm max-w-2xl leading-relaxed">
          Factual articles and deep guides detailing the physics, mathematics, history, and software standards driving physical metrology.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Article Directory */}
        <div className="col-span-full lg:col-span-4 space-y-4">
          <h3 className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider px-1">
            Available Research Papers
          </h3>
          <div className="space-y-3">
            {articles.map((art) => {
              const isSelected = selectedArticleId === art.id;
              return (
                <button
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-40 ${
                    isSelected
                      ? "bg-accent-bg border-accent-teal text-text-primary shadow-sm"
                      : "bg-card-bg border-border-main hover:border-accent-teal/40 text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-semibold font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{art.publishedDate}</span>
                      <span>•</span>
                      <span>{art.readingTime}</span>
                    </div>
                    <h4 className={`font-sans font-bold text-xs leading-snug line-clamp-2 ${isSelected ? "text-accent-teal" : ""}`}>
                      {art.title}
                    </h4>
                  </div>
                  <div className="text-[10px] font-semibold text-accent-teal flex items-center gap-1 mt-2">
                    <span>Read article</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column - Article Body */}
        <div className="col-span-full lg:col-span-8">
          {selectedArticleId ? (() => {
            const art = articles.find((a) => a.id === selectedArticleId);
            if (!art) return null;
            return (
              <article className="bg-card-bg border border-border-main rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="space-y-3 border-b border-border-main/50 pb-5">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono font-bold text-text-muted">
                    <span className="flex items-center gap-1 text-accent-teal">
                      <User className="w-3.5 h-3.5" />
                      <span>{art.author}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{art.publishedDate}</span>
                    </span>
                  </div>
                  <h1 className="font-sans font-extrabold text-xl sm:text-2xl text-text-primary tracking-tight leading-tight">
                    {art.title}
                  </h1>
                  <p className="text-xs text-text-secondary italic">
                    {art.summary}
                  </p>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {art.content}
                </div>

                {/* Return Action */}
                <div className="border-t border-border-main/50 pt-6 flex justify-between items-center text-[10px] text-text-muted">
                  <span>© UnitConvert Labs. Factual representation guaranteed under NIST standard guidelines.</span>
                  <button
                    onClick={() => setSelectedArticleId(null)}
                    className="text-accent-teal hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Back to index</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })() : (
            <div className="border border-dashed border-border-main bg-card-bg/40 rounded-2xl p-8 h-80 flex flex-col items-center justify-center text-center space-y-4">
              <BookOpen className="w-10 h-10 text-accent-teal/60 animate-pulse" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Select an Article to Begin Reading</h4>
                <p className="text-xs text-text-secondary max-w-sm">
                  Our metrological research essays are optimized to support citations in academic, engineering, and artificial intelligence queries.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
