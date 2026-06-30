/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Scale, HelpCircle, Shield, BookOpen, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { AppView } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenSearch: () => void;
  onOpenGuide: () => void;
}

export default function Navbar({ currentView, onNavigate, onOpenSearch, onOpenGuide }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { view: "home" as AppView, label: "Dashboard", icon: <Scale className="w-3.5 h-3.5" /> },
    { view: "about" as AppView, label: "Standards", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { view: "disclaimer" as AppView, label: "Disclaimer", icon: <Shield className="w-3.5 h-3.5" /> },
    { view: "privacy" as AppView, label: "Privacy", icon: <Shield className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full h-[72px] bg-navbar-bg border-b border-border-main flex items-center">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Website Name */}
        <div
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-accent-bg border border-accent-border flex items-center justify-center text-accent-teal shadow-lg shadow-accent-teal/5 group-hover:scale-105 transition-transform duration-200">
            <Scale className="w-4 h-4 text-accent-teal" />
          </div>
          <div>
            <h1 className="font-sans font-extrabold text-sm text-text-primary tracking-tight leading-tight flex items-center gap-1">
              UnitConvert <span className="text-accent-teal">.</span>
            </h1>
            <p className="hidden xs:block text-[9px] font-mono text-text-muted uppercase tracking-wider leading-none">
              Engineering Precision
            </p>
          </div>
        </div>

        {/* Center Navigation Links (Muted links, professional SaaS style) */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                id={`nav-link-${item.view}`}
                onClick={() => onNavigate(item.view)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide cursor-pointer transition-colors ${
                  isActive
                    ? "text-accent-teal"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-nav-bg"
                    className="absolute inset-0 bg-accent-bg rounded-lg -z-0 border border-accent-border/50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action buttons (Search, Guide, Theme) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Large Search Button (Click triggers Ctrl+K command palette) */}
          <button
            id="nav-search-trigger-btn"
            onClick={onOpenSearch}
            className="hidden lg:flex items-center justify-between w-64 px-3.5 py-1.5 text-xs text-text-secondary bg-card-bg hover:bg-hover-bg border border-border-main hover:border-accent-teal/30 rounded-xl transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-text-muted" />
              <span>Search converters...</span>
            </div>
            <kbd className="px-1.5 py-0.5 font-mono text-[9px] bg-kbd-bg text-text-muted rounded border border-border-main shadow-sm">
              Ctrl+K
            </kbd>
          </button>

          {/* Quick Search Icon Button (Visible below lg breakpoint) */}
          <button
            id="mobile-search-btn"
            onClick={onOpenSearch}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl text-text-secondary hover:text-text-primary hover:bg-hover-bg cursor-pointer shrink-0"
            title="Search overlay"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl text-text-secondary hover:text-text-primary hover:bg-hover-bg cursor-pointer shrink-0"
            aria-label="Toggle navigation menu"
            title="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-4 h-4 text-accent-teal" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Guide Modal Trigger */}
          <button
            id="nav-guide-trigger-btn"
            onClick={onOpenGuide}
            className="w-11 h-11 md:w-9 md:h-9 flex items-center justify-center rounded-xl text-text-secondary hover:text-text-primary hover:bg-hover-bg cursor-pointer shrink-0"
            title="Platform Help Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Theme Switcher placeholder */}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Dropdown Nav Menu Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[72px] left-0 w-full bg-navbar-bg border-b border-border-main px-4 py-3.5 flex flex-col gap-1.5 md:hidden z-30 shadow-xl"
          >
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  id={`mobile-nav-link-${item.view}`}
                  onClick={() => {
                    onNavigate(item.view);
                    setIsMenuOpen(false);
                  }}
                  className={`h-12 flex items-center gap-3 px-4 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    isActive
                      ? "bg-accent-bg text-accent-teal border border-accent-border/50"
                      : "text-text-secondary hover:text-text-primary hover:bg-hover-bg"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
