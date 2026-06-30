/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Read theme on mount
    const isLight = !document.documentElement.classList.contains("dark");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <motion.button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className="w-11 h-11 md:w-9 md:h-9 rounded-xl bg-card-bg hover:bg-hover-bg text-text-secondary border border-border-main transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-teal flex items-center justify-center shrink-0"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            y: theme === "dark" ? 0 : -30,
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 90,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute"
        >
          <Moon className="w-5 h-5" />
        </motion.div>
        <motion.div
          animate={{
            y: theme === "light" ? 0 : 30,
            opacity: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : -90,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute"
        >
          <Sun className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.button>
  );
}
