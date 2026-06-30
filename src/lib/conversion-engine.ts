/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CONVERTERS_LIST, ConverterData } from "./converters-data";

// Precision Formatting Function with customizable precision & exponential notation for extreme ranges
export function formatPrecision(value: number, precision: number = 8): string {
  if (isNaN(value) || !isFinite(value)) return value.toString();
  if (value === 0) return "0";

  const absValue = Math.abs(value);

  // If the number is incredibly tiny or massive, display in scientific notation
  if (absValue < 1e-6 || absValue >= 1e12) {
    return value.toExponential(Math.min(6, precision));
  }

  let formatted = value.toFixed(precision);

  // Remove trailing zeros after decimal point
  if (formatted.indexOf(".") !== -1) {
    formatted = formatted.replace(/0+$/, "");
    if (formatted.endsWith(".")) {
      formatted = formatted.slice(0, -1);
    }
  }

  return formatted;
}

// Convert temperature scale values
export function convertTemperature(value: number, from: string, to: string): number {
  const fromClean = from.toLowerCase();
  const toClean = to.toLowerCase();
  if (fromClean === toClean) return value;
  
  let tempInC = 0;

  // Standardize to Celsius first
  if (fromClean.includes("c")) {
    tempInC = value;
  } else if (fromClean.includes("f")) {
    tempInC = (value - 32) * (5 / 9);
  } else if (fromClean.includes("k") || fromClean === "k") {
    tempInC = value - 273.15;
  }

  // Convert from Celsius to Target
  if (toClean.includes("c")) {
    return tempInC;
  } else if (toClean.includes("f")) {
    return (tempInC * (9 / 5)) + 32;
  } else if (toClean.includes("k") || toClean === "k") {
    return tempInC + 273.15;
  }

  return value;
}

// Reciprocal Frequency to Wavelength convert (using speed of light c = 299792458 m/s)
// Frequency in THz, wavelength in nm
export function convertFrequencyWavelength(value: number, from: string, to: string): number {
  if (value <= 0) return 0;
  const fromClean = from.toLowerCase();
  const toClean = to.toLowerCase();

  // If both are same unit, return value
  if (fromClean === toClean) return value;

  // From THz to nm (or vice versa): wavelength (nm) = 299792.458 / frequency (THz)
  return 299792.458 / value;
}

// Core Mathematical Conversion Dispatcher
export function convertUnits(
  value: number,
  fromUnitSymbol: string,
  toUnitSymbol: string,
  converterSlug: string
): number {
  if (fromUnitSymbol === toUnitSymbol) return value;

  const converter = CONVERTERS_LIST.find((c) => c.slug === converterSlug);
  if (!converter) return value;

  // Temperature uses custom affine transforms instead of multiplicative factors
  if (converter.slug === "temperature") {
    return convertTemperature(value, fromUnitSymbol, toUnitSymbol);
  }

  // Frequency <-> Wavelength uses reciprocal division
  if (converter.slug === "frequency-wavelength") {
    return convertFrequencyWavelength(value, fromUnitSymbol, toUnitSymbol);
  }

  // Fuel consumption: mpg to L/100km is reciprocal: L/100km = 235.215 / mpg
  if (converter.slug === "fuel-consumption") {
    const isFromMpg = fromUnitSymbol.toLowerCase().includes("mpg");
    const isToMpg = toUnitSymbol.toLowerCase().includes("mpg");
    if (isFromMpg && !isToMpg) {
      if (value <= 0) return 0;
      return 235.215 / value; // MPG to L/100km or equivalent
    }
    if (!isFromMpg && isToMpg) {
      if (value <= 0) return 0;
      return 235.215 / value; // L/100km to MPG
    }
  }

  const fromUnit = converter.units.find((u) => u.symbol === fromUnitSymbol);
  const toUnit = converter.units.find((u) => u.symbol === toUnitSymbol);

  if (!fromUnit || !toUnit) return value;

  // Standard multiplicative factor conversion
  // Convert value from 'fromUnit' to the base unit first
  const valueInBase = value * fromUnit.factor;
  // Convert from base unit to 'toUnit'
  return valueInBase / toUnit.factor;
}

// Number Base Conversion engine
export function convertNumberBase(value: string, fromBase: number, toBase: number): string {
  const sanitized = value.trim();
  if (!sanitized) return "";

  try {
    const parsed = parseInt(sanitized, fromBase);
    if (isNaN(parsed)) return "Invalid Input";
    return parsed.toString(toBase).toUpperCase();
  } catch {
    return "Error";
  }
}

// Check base validity
export function isValueValidForBase(value: string, base: number): boolean {
  if (!value) return true;
  const cleaned = value.trim().toUpperCase();
  if (base === 2) return /^[01]+$/.test(cleaned);
  if (base === 8) return /^[0-7]+$/.test(cleaned);
  if (base === 10) return /^[0-9]+$/.test(cleaned);
  if (base === 16) return /^[0-9A-F]+$/.test(cleaned);
  return false;
}

// Case transformations
export const CASE_TRANSFORMATIONS = [
  { id: "upper", name: "UPPER CASE" },
  { id: "lower", name: "lower case" },
  { id: "title", name: "Title Case" },
  { id: "sentence", name: "Sentence case" },
  { id: "camel", name: "camelCase" },
  { id: "snake", name: "snake_case" },
  { id: "kebab", name: "kebab-case" }
];

export function transformText(text: string, type: string): string {
  if (!text) return "";

  switch (type) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return text.replace(/\b[a-z]/gi, (char) => char.toUpperCase());
    case "sentence": {
      if (text.length === 0) return "";
      const sentences = text.split(/([.!?]\s+)/);
      return sentences
        .map((part, index) => {
          if (index % 2 === 0 && part.length > 0) {
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          }
          return part;
        })
        .join("");
    }
    case "camel": {
      const words = text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, " ").trim().split(/\s+/);
      if (words.length === 0 || words[0] === "") return "";
      return (
        words[0] +
        words
          .slice(1)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join("")
      );
    }
    case "snake": {
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, " ")
        .trim()
        .split(/\s+/)
        .join("_");
    }
    case "kebab": {
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, " ")
        .trim()
        .split(/\s+/)
        .join("-");
    }
    default:
      return text;
  }
}
