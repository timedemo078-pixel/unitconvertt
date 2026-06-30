/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Ruler,
  Scale,
  CupSoda,
  Thermometer,
  Zap,
  Gauge,
  Flame,
  Activity,
  Magnet,
  Radio,
  Type,
  Binary,
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  Clock,
  RotateCw,
  TrendingUp,
  Boxes,
  Minimize,
  Target,
  CornerUpRight,
  Wrench,
  Maximize2,
  Award,
  Shuffle,
  Repeat,
  Database,
  Grid,
  Wind,
  Sun,
  Eye,
  Cpu,
  Sliders,
  Shield,
  Volume2,
  HardDrive,
  Coins,
  ChevronRight,
  HelpCircle,
  Hash,
  ChevronLeft,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { RecentConverter } from "./types";
import { CONVERTERS_LIST, CONVERTER_CATEGORIES, ConverterData } from "./lib/converters-data";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GuideModal from "./components/GuideModal";
import OmniSearch from "./components/OmniSearch";
import RecentlyUsed from "./components/RecentlyUsed";
import ConverterPanel from "./components/ConverterPanel";
import TextConverterPanel from "./components/TextConverterPanel";
import BaseConverterPanel from "./components/BaseConverterPanel";
import AboutView from "./components/AboutView";
import DisclaimerView from "./components/DisclaimerView";
import PrivacyView from "./components/PrivacyView";
import SeoEngine from "./components/SeoEngine";
import HomeDashboard from "./components/HomeDashboard";

// Custom Link Component for flawless, hard-refresh-free client navigation
export function Link({
  href,
  children,
  className,
  id,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState(null, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <a href={href} onClick={handleClick} className={className} id={id}>
      {children}
    </a>
  );
}

interface RouteState {
  type: "home" | "category" | "converter";
  categoryId?: string; // e.g. "common" | "engineering" | "heat" | "fluid" | "light" | "electricity" | "magnetism" | "radiology" | "other"
  converterSlug?: string; // e.g. "length" | "weight"
  fromUnitId?: string;
  toUnitId?: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "about" | "disclaimer" | "privacy">("home");
  const [route, setRoute] = useState<RouteState>({ type: "home" });

  // Overlays State
  const [searchOpen, setSearchOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  // History State
  const [history, setHistory] = useState<RecentConverter[]>([]);

  // Parse Conversion Slugs like "meter-to-foot"
  const parseRoute = () => {
    const path = window.location.pathname;
    const parts = path.split("/").filter(Boolean); // e.g. ["common", "length", "meter-to-foot"]

    if (parts.length === 0) {
      return { type: "home" as const };
    }

    const categoryId = parts[0];
    const categories = ["common", "engineering", "heat", "fluid", "light", "electricity", "magnetism", "radiology", "other"];
    const isCategory = categories.includes(categoryId);

    if (isCategory) {
      if (parts.length === 1) {
        return { type: "category" as const, categoryId };
      }
      if (parts.length === 2) {
        return { type: "converter" as const, categoryId, converterSlug: parts[1] };
      }
      if (parts.length === 3) {
        // Extract conversion
        const conversionSlug = parts[2]; // e.g. "meter-to-foot"
        const convParts = conversionSlug.split("-to-");
        let fromUnitId: string | undefined;
        let toUnitId: string | undefined;

        if (convParts.length === 2) {
          const fromName = convParts[0].toLowerCase();
          const toName = convParts[1].toLowerCase();
          const conv = CONVERTERS_LIST.find((c) => c.slug === parts[1]);
          if (conv) {
            const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
            const fUnit = conv.units.find(
              (u) => u.name.toLowerCase() === fromName || u.symbol.toLowerCase() === fromName || clean(u.name) === fromName
            );
            const tUnit = conv.units.find(
              (u) => u.name.toLowerCase() === toName || u.symbol.toLowerCase() === toName || clean(u.name) === toName
            );
            fromUnitId = fUnit?.symbol;
            toUnitId = tUnit?.symbol;
          }
        }

        return {
          type: "converter" as const,
          categoryId,
          converterSlug: parts[1],
          fromUnitId,
          toUnitId,
        };
      }
    }

    return { type: "home" as const };
  };

  // Listen to popstate for flawless browser history transitions
  useEffect(() => {
    const handlePopState = () => {
      // Clear hash if any
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      const parsed = parseRoute();
      setRoute(parsed);
      setCurrentView("home"); // The custom sections are routed within main layout
    };

    window.addEventListener("popstate", handlePopState);
    handlePopState(); // Trigger initial parsing

    // Load conversion history from local storage
    try {
      const saved = localStorage.getItem("unitconvert_history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not read conversion history from localStorage", e);
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Globally listen to Ctrl+K or Cmd+K to launch the search palette
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  }, []);

  // Helper for rendering Lucide icons for each slug dynamically
  const renderCategoryIcon = (slug: string, sizeClass = "w-4 h-4") => {
    switch (slug) {
      case "length":
        return <Ruler className={`${sizeClass} text-[#17D7C8]`} />;
      case "weight":
        return <Scale className={`${sizeClass} text-[#17D7C8]`} />;
      case "volume":
        return <CupSoda className={`${sizeClass} text-[#17D7C8]`} />;
      case "temperature":
        return <Thermometer className={`${sizeClass} text-[#17D7C8]`} />;
      case "area":
        return <Layers className={`${sizeClass} text-[#17D7C8]`} />;
      case "pressure":
        return <Gauge className={`${sizeClass} text-[#17D7C8]`} />;
      case "energy":
        return <Flame className={`${sizeClass} text-[#17D7C8]`} />;
      case "dry-volume":
        return <Grid className={`${sizeClass} text-[#17D7C8]`} />;
      case "currency":
        return <Coins className={`${sizeClass} text-[#17D7C8]`} />;
      case "case":
        return <Type className={`${sizeClass} text-[#17D7C8]`} />;
      case "power":
        return <Activity className={`${sizeClass} text-[#17D7C8]`} />;
      case "force":
        return <Zap className={`${sizeClass} text-[#17D7C8]`} />;
      case "time":
        return <Clock className={`${sizeClass} text-[#17D7C8]`} />;
      case "speed":
        return <ArrowRight className={`${sizeClass} text-[#17D7C8]`} />;
      case "angle":
        return <Compass className={`${sizeClass} text-[#17D7C8]`} />;
      case "fuel-consumption":
        return <Zap className={`${sizeClass} text-[#17D7C8]`} />;
      case "numbers":
        return <Binary className={`${sizeClass} text-[#17D7C8]`} />;
      case "data-storage":
        return <HardDrive className={`${sizeClass} text-[#17D7C8]`} />;
      // Engineering
      case "angular-velocity":
        return <RotateCw className={`${sizeClass} text-[#17D7C8]`} />;
      case "acceleration":
        return <Sparkles className={`${sizeClass} text-[#17D7C8]`} />;
      case "angular-acceleration":
        return <TrendingUp className={`${sizeClass} text-[#17D7C8]`} />;
      case "density":
        return <Boxes className={`${sizeClass} text-[#17D7C8]`} />;
      case "specific-volume":
        return <Minimize className={`${sizeClass} text-[#17D7C8]`} />;
      case "moment-of-inertia":
        return <Target className={`${sizeClass} text-[#17D7C8]`} />;
      case "moment-of-force":
        return <CornerUpRight className={`${sizeClass} text-[#17D7C8]`} />;
      case "torque":
        return <Wrench className={`${sizeClass} text-[#17D7C8]`} />;
      // Heat
      case "thermal-expansion":
        return <Maximize2 className={`${sizeClass} text-[#17D7C8]`} />;
      case "specific-heat-capacity":
        return <Award className={`${sizeClass} text-[#17D7C8]`} />;
      case "heat-density":
        return <Layers className={`${sizeClass} text-[#17D7C8]`} />;
      case "heat-flux-density":
        return <Shuffle className={`${sizeClass} text-[#17D7C8]`} />;
      case "heat-transfer-coefficient":
        return <Repeat className={`${sizeClass} text-[#17D7C8]`} />;
      // Fluid
      case "molar-flow":
        return <Database className={`${sizeClass} text-[#17D7C8]`} />;
      case "kinematic-viscosity":
        return <Wind className={`${sizeClass} text-[#17D7C8]`} />;
      // Light
      case "luminance":
        return <Sun className={`${sizeClass} text-[#17D7C8]`} />;
      case "luminous-intensity":
        return <Eye className={`${sizeClass} text-[#17D7C8]`} />;
      case "digital-image-resolution":
        return <Cpu className={`${sizeClass} text-[#17D7C8]`} />;
      case "frequency-wavelength":
        return <Radio className={`${sizeClass} text-[#17D7C8]`} />;
      // Electricity
      case "electric-charge":
        return <Zap className={`${sizeClass} text-[#17D7C8]`} />;
      case "linear-charge-density":
        return <Minimize className={`${sizeClass} text-[#17D7C8]`} />;
      case "electric-potential":
        return <Activity className={`${sizeClass} text-[#17D7C8]`} />;
      case "electric-resistance":
        return <Sliders className={`${sizeClass} text-[#17D7C8]`} />;
      case "electrostatic-capacitance":
        return <Database className={`${sizeClass} text-[#17D7C8]`} />;
      // Magnetism
      case "magnetic-flux-density":
        return <Magnet className={`${sizeClass} text-[#17D7C8]`} />;
      // Radiology
      case "radiation":
        return <Radio className={`${sizeClass} text-[#17D7C8]`} />;
      case "radioactivity":
        return <Shield className={`${sizeClass} text-[#17D7C8]`} />;
      // Other
      case "sound":
        return <Volume2 className={`${sizeClass} text-[#17D7C8]`} />;
      default:
        return <Compass className={`${sizeClass} text-[#17D7C8]`} />;
    }
  };

  // Icon for category categories
  const getCategoryHeaderIcon = (id: string, sizeClass = "w-5 h-5") => {
    switch (id) {
      case "common":
        return <Ruler className={sizeClass} />;
      case "engineering":
        return <Wrench className={sizeClass} />;
      case "heat":
        return <Flame className={sizeClass} />;
      case "fluid":
        return <Wind className={sizeClass} />;
      case "light":
        return <Sun className={sizeClass} />;
      case "electricity":
        return <Zap className={sizeClass} />;
      case "magnetism":
        return <Magnet className={sizeClass} />;
      case "radiology":
        return <Radio className={sizeClass} />;
      case "other":
        return <Compass className={sizeClass} />;
      default:
        return <Compass className={sizeClass} />;
    }
  };

  // Intercept category/converter selection cleanly and update route
  const handleSelectConverter = (
    categoryId: string,
    subCategoryName?: string,
    fromUnitId?: string,
    toUnitId?: string
  ) => {
    const parentCategory = CONVERTERS_LIST.find((c) => c.slug === categoryId)?.category || "common";
    let targetPath = `/${parentCategory}/${categoryId}`;
    if (fromUnitId && toUnitId) {
      targetPath += `/${fromUnitId}-to-${toUnitId}`;
    }
    window.history.pushState(null, "", targetPath);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  // History management callback
  const handleConverterActive = (recent: {
    categoryId: string;
    categoryName: string;
    fromUnitId: string;
    fromUnitSymbol: string;
    toUnitId: string;
    toUnitSymbol: string;
    subCategoryName?: string;
  }) => {
    const newId = `${recent.categoryId}-${recent.subCategoryName || ""}-${recent.fromUnitId}-${recent.toUnitId}`;
    setHistory((prev) => {
      const filtered = prev.filter((item) => {
        const itemKey = `${item.categoryId}-${item.subCategoryName || ""}-${item.fromUnitId}-${item.toUnitId}`;
        return itemKey !== newId;
      });

      const newEntry: RecentConverter = {
        ...recent,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
      };

      const updated = [newEntry, ...filtered].slice(0, 5);
      localStorage.setItem("unitconvert_history", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("unitconvert_history");
  };

  // Render main layout
  return (
    <div className="flex flex-col min-h-screen bg-canvas-bg text-text-primary selection:bg-accent-teal/30 selection:text-text-primary">
      {/* Dynamic SEO & Schema Markup Injection Engine */}
      <SeoEngine route={route} currentView={currentView} />

      {/* 1. Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === "home") {
            window.history.pushState(null, "", "/");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }
        }}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenGuide={() => setGuideOpen(true)}
      />

      {/* 2. Primary Page Main Content Wrapper */}
      <main className="flex-grow max-w-[1440px] mx-auto w-full px-6 sm:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentView !== "home" ? (
            <motion.div
              key={currentView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {currentView === "about" && <AboutView />}
              {currentView === "disclaimer" && <DisclaimerView />}
              {currentView === "privacy" && <PrivacyView />}
            </motion.div>
          ) : (
            <motion.div
              key="main-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-12"
            >
              {/* Conditional Router Dispatcher */}
              {route.type === "converter" && route.converterSlug ? (
                <div className="space-y-6">
                  {/* Breadcrumb Header */}
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <button
                      onClick={() => {
                        window.history.pushState(null, "", "/");
                        window.dispatchEvent(new PopStateEvent("popstate"));
                      }}
                      className="hover:text-text-primary flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Back to Dashboard</span>
                    </button>
                    <span className="text-text-muted font-bold">/</span>
                    <span className="capitalize font-semibold">{route.categoryId}</span>
                    <span className="text-text-muted font-bold">/</span>
                    <span className="text-text-primary font-bold font-mono">
                      {route.converterSlug}
                    </span>
                  </div>

                  {/* Render Panel depending on target slug */}
                  {route.converterSlug === "case" ? (
                    <TextConverterPanel />
                  ) : route.converterSlug === "numbers" ? (
                    <BaseConverterPanel />
                  ) : (
                    <ConverterPanel
                      categoryId={route.converterSlug}
                      initialFromUnitId={route.fromUnitId}
                      initialToUnitId={route.toUnitId}
                      onConverterActive={handleConverterActive}
                    />
                  )}
                </div>
              ) : route.type === "category" && route.categoryId ? (
                <div className="space-y-8">
                  {/* Category Page Title */}
                  <div className="space-y-1.5 border-b border-border-main pb-5">
                    <button
                      onClick={() => {
                        window.history.pushState(null, "", "/");
                        window.dispatchEvent(new PopStateEvent("popstate"));
                      }}
                      className="hover:text-text-primary flex items-center gap-1 cursor-pointer font-semibold text-xs text-text-secondary mb-2"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>All Categories</span>
                    </button>
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-accent-bg text-accent-teal border border-accent-border">
                        {getCategoryHeaderIcon(route.categoryId)}
                      </div>
                      <h2 className="font-sans font-extrabold text-2xl tracking-tight capitalize text-text-primary">
                        {route.categoryId} Converters
                      </h2>
                    </div>
                  </div>

                  {/* Category Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {CONVERTERS_LIST.filter((c) => c.category === route.categoryId).map((conv) => (
                      <div
                        key={conv.slug}
                        onClick={() => handleSelectConverter(conv.slug)}
                        className="h-28 rounded-[14px] p-[18px] border border-border-main bg-card-bg hover:border-accent-teal hover:bg-hover-bg transition-all duration-200 group cursor-pointer flex flex-col justify-between"
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
                        <div className="text-[10px] text-text-muted font-semibold font-mono">
                          {conv.units.length} Units • {conv.units.length * (conv.units.length - 1) || 12} Conversions
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Primary Dashboard (Home Route `/`) - Redesigned SEO & metrology authority hub */
                <HomeDashboard
                  onSelectConverter={handleSelectConverter}
                  onOpenSearch={() => setSearchOpen(true)}
                  historyLength={history.length}
                  renderCategoryIcon={renderCategoryIcon}
                  getCategoryHeaderIcon={getCategoryHeaderIcon}
                  renderHistoryWidget={() => (
                    <RecentlyUsed
                      items={history}
                      onSelect={(item) =>
                        handleSelectConverter(
                          item.categoryId,
                          item.subCategoryName,
                          item.fromUnitId,
                          item.toUnitId
                        )
                      }
                      onClear={handleClearHistory}
                    />
                  )}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenGuide={() => setGuideOpen(true)}
      />

      {/* 4. Omni-Search Command Palette */}
      <OmniSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectConverter={handleSelectConverter}
      />

      {/* 5. Help Guide Shortcuts Overlay */}
      <GuideModal isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}
