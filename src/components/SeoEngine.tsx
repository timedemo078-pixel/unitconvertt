/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { CONVERTERS_LIST, CONVERTER_CATEGORIES } from "../lib/converters-data";

interface RouteState {
  type: "home" | "category" | "converter";
  categoryId?: string;
  converterSlug?: string;
  fromUnitId?: string;
  toUnitId?: string;
}

interface SeoEngineProps {
  route: RouteState;
  currentView: "home" | "about" | "disclaimer" | "privacy" | "learn";
}

export default function SeoEngine({ route, currentView }: SeoEngineProps) {
  useEffect(() => {
    let title = "UnitConvert | Professional NIST-Aligned Unit Converter";
    let description = "Universal engineering-grade unit converter calibrated against NIST physical standards. High-precision calculations across length, weight, volume, pressure, and 70+ categories.";
    let path = "/";

    const siteUrl = window.location.origin || "https://unitconvert.com";
    let breadcrumbItems: { name: string; item: string }[] = [];

    // Helper: capitalized string
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    if (currentView !== "home") {
      // Dynamic Static Views (About, Disclaimer, Privacy, Learn)
      if (currentView === "about") {
        title = "Metrology & Physical Conversion Standards | UnitConvert";
        description = "Learn about the international scientific standards, SI units, and NIST calibration guidelines behind UnitConvert's double-precision calculation engine.";
        path = "/about";
      } else if (currentView === "learn") {
        title = "Metrology Learn & Research Hub | UnitConvert Guides";
        description = "Read expert articles on SI redefinitions, float precision rounding errors, affine temperature math, and scientific measurement histories.";
        path = "/learn";
      } else if (currentView === "disclaimer") {
        title = "Legal Disclaimer & Engineering Tolerances | UnitConvert";
        description = "Review the engineering guidelines, roundoff limits, and liability terms governing the unit conversion estimations on UnitConvert.";
        path = "/disclaimer";
      } else if (currentView === "privacy") {
        title = "Privacy Policy & Zero-Tracker Commitment | UnitConvert";
        description = "UnitConvert operates offline-first with zero trackers and zero server-side logs. Your data remains entirely private on your device.";
        path = "/privacy";
      }
      breadcrumbItems = [
        { name: "Home", item: siteUrl + "/" },
        { name: capitalize(currentView), item: siteUrl + path },
      ];
    } else if (route.type === "category" && route.categoryId) {
      // Category Landing Page
      const catObj = CONVERTER_CATEGORIES.find((c) => c.id === route.categoryId);
      const catName = catObj?.name || capitalize(route.categoryId);
      title = `${catName} - Professional High-Precision Converters | UnitConvert`;
      description = `Access authoritative, high-precision mathematical converters for ${catName.toLowerCase()}. NIST standard calibrations for industrial, academic, and scientific applications.`;
      path = `/${route.categoryId}`;
      breadcrumbItems = [
        { name: "Home", item: siteUrl + "/" },
        { name: catName, item: siteUrl + path },
      ];
    } else if (route.type === "converter" && route.converterSlug) {
      // Specific Converter Page
      const convObj = CONVERTERS_LIST.find((c) => c.slug === route.converterSlug);
      const convName = convObj?.name || `${capitalize(route.converterSlug)} Converter`;
      const catId = route.categoryId || "common";

      const fromUnitObj = convObj?.units.find((u) => u.symbol === route.fromUnitId);
      const toUnitObj = convObj?.units.find((u) => u.symbol === route.toUnitId);

      if (fromUnitObj && toUnitObj) {
        // Specific unit-to-unit page (e.g., meter-to-foot)
        title = `Convert ${fromUnitObj.name} to ${toUnitObj.name} (${fromUnitObj.symbol} to ${toUnitObj.symbol}) | UnitConvert`;
        description = `Instant high-precision conversion from ${fromUnitObj.name} (${fromUnitObj.symbol}) to ${toUnitObj.name} (${toUnitObj.symbol}). View precise formulas, step-by-step math, SI standards, and worked examples.`;
        path = `/${catId}/${route.converterSlug}/${fromUnitObj.symbol.toLowerCase()}-to-${toUnitObj.symbol.toLowerCase()}`;
        breadcrumbItems = [
          { name: "Home", item: siteUrl + "/" },
          { name: capitalize(catId), item: siteUrl + `/${catId}` },
          { name: convName, item: siteUrl + `/${catId}/${route.converterSlug}` },
          { name: `${fromUnitObj.name} to ${toUnitObj.name}`, item: siteUrl + path },
        ];
      } else {
        // General category-level converter (e.g., length converter)
        title = `${convName} - NIST-Aligned Engineering Tool | UnitConvert`;
        description = `Convert between ${convObj?.units.slice(0, 5).map((u) => u.name).join(", ")} and more. Precision-tuned calculator with dynamic formula displays and FAQ sections.`;
        path = `/${catId}/${route.converterSlug}`;
        breadcrumbItems = [
          { name: "Home", item: siteUrl + "/" },
          { name: capitalize(catId), item: siteUrl + `/${catId}` },
          { name: convName, item: siteUrl + path },
        ];
      }
    } else {
      // Home / Dashboard
      title = "UnitConvert | Professional NIST-Aligned Unit Converter";
      description = "Universal unit converter featuring high precision calibrations against NIST standards. Convert length, weight, volume, pressure, temperature, energy, and 70+ engineering categories instantly.";
      path = "/";
      breadcrumbItems = [
        { name: "Home", item: siteUrl + "/" },
      ];
    }

    // 1. Update Document Head
    document.title = title;

    // Helper to set/create meta element
    const setMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, nameOrProperty);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", value);
    };

    setMeta("description", description);
    setMeta("keywords", "unit converter, NIST standards, high precision calculations, scientific units, conversion calculator, metrology, engineering converter, length converter, weight converter");
    setMeta("author", "UnitConvert Labs");

    // Open Graph Metadata
    const canonicalUrl = siteUrl + path;
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", siteUrl + "/favicon.svg", true);

    // Twitter Card Metadata
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", siteUrl + "/favicon.svg");

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 2. Dynamic JSON-LD Structured Data Schemas
    const schemas: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "UnitConvert",
        "url": siteUrl,
        "logo": `${siteUrl}/favicon.svg`,
        "description": "Scientific-grade metrology calculations conforming to NIST SP 811 standards."
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "name": "UnitConvert",
        "url": siteUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ];

    // BreadcrumbList Schema
    if (breadcrumbItems.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.item
        }))
      });
    }

    // WebPage Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalUrl}/#webpage`,
      "url": canonicalUrl,
      "name": title,
      "description": description,
      "isPartOf": { "@id": `${siteUrl}/#website` }
    });

    // FAQPage Schema (only on converter pages)
    if (route.type === "converter" && route.converterSlug) {
      const convObj = CONVERTERS_LIST.find((c) => c.slug === route.converterSlug);
      if (convObj) {
        // Gather programmatically defined FAQs or defaults
        const baseU = convObj.units.find((u) => u.symbol === convObj.baseUnit) || convObj.units[0];
        const secondaryU = convObj.units.find((u) => u.symbol !== convObj.baseUnit) || convObj.units[1] || baseU;
        const faqs = [
          {
            question: `How does UnitConvert verify ${convObj.name} calculations?`,
            answer: `Every coefficient within the ${convObj.name} engine is modeled directly after the NIST Special Publication 811. We pass all calculation outputs through standard double-precision floating-point roundoff protection filters to prevent representation errors.`
          },
          {
            question: `What is the base reference unit for this ${convObj.name}?`,
            answer: `The base calibration reference unit is the ${baseU.name} (${convObj.baseUnit}). All other units within this category are resolved through linear scaling factors relative to this reference.`
          }
        ];

        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        });
      }
    }

    // Insert or update script tag for JSON-LD
    let scriptId = "unitconvert-jsonld-schema";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.type = "application/ld+json";
      document.body.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemas, null, 2);

    // Clean up on component unmount
    return () => {
      // Optional schema cleanup, though keeping it for crawlers is standard
    };
  }, [route, currentView]);

  return null; // Side-effect component, renders nothing visible itself
}
