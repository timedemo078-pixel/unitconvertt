/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConverterUnit } from "./converters-data";

export interface GlossaryData {
  fromDefinition: string;
  toDefinition: string;
  originAndUsage: string;
  workedExample: string;
  practicalUseCases: { title: string; desc: string }[];
}

export function getMetrologyGlossary(
  fromUnit: ConverterUnit,
  toUnit: ConverterUnit,
  categorySlug: string
): GlossaryData {
  // 1. Generate Definitions and Origin Context
  const categoryLabel = categorySlug.replace("-", " ");
  
  const fromDefinition = fromUnit.description 
    ? `${fromUnit.name} (${fromUnit.symbol}) is a recognized unit in ${categoryLabel} metrology, defined as ${fromUnit.description.toLowerCase()}.`
    : `${fromUnit.name} (${fromUnit.symbol}) is a fundamental physical scale of measurement within the ${categoryLabel} dimension.`;

  const toDefinition = toUnit.description 
    ? `${toUnit.name} (${toUnit.symbol}) is defined metrologically as ${toUnit.description.toLowerCase()}.`
    : `${toUnit.name} (${toUnit.symbol}) is a standardized unit of measure configured for physical calculations of ${categoryLabel}.`;

  const originAndUsage = `Measurements scaled in ${fromUnit.name} and ${toUnit.name} represent distinct historic branches of metrology. The metric system (SI) is built on coherent decimal increments, whereas custom imperial or physical-constant systems are historically calibrated to environmental or anatomical baselines. Converting between these standards requires absolute double-precision coefficients to prevent mechanical and thermal model misalignments.`;

  // 2. Generate Worked-out Step-by-Step Example
  let multiplier = fromUnit.factor / toUnit.factor;
  let multiplierStr = multiplier.toLocaleString(undefined, { maximumFractionDigits: 8 });
  let workedExample = `To convert a value in ${fromUnit.name} (${fromUnit.symbol}) to ${toUnit.name} (${toUnit.symbol}), you multiply the original amount by the precise scale ratio of ${multiplierStr}.\n\n` +
    `Mathematical Equation:\n` +
    `Value in ${toUnit.symbol} = Value in ${fromUnit.symbol} × (${fromUnit.factor} / ${toUnit.factor})\n` +
    `Value in ${toUnit.symbol} = Value in ${fromUnit.symbol} × ${multiplierStr}\n\n` +
    `For example, converting 10 ${fromUnit.name} to ${toUnit.name} is computed as:\n` +
    `10 × ${multiplierStr} = ${(10 * multiplier).toLocaleString(undefined, { maximumFractionDigits: 8 })} ${toUnit.symbol}.`;

  // Special-case temperature equations
  if (categorySlug === "temperature") {
    const fSym = fromUnit.symbol;
    const tSym = toUnit.symbol;
    if (fSym === "°C" && tSym === "°F") {
      workedExample = `To convert Celsius to Fahrenheit, multiply by 9/5 (1.8) and add 32.\n\n` +
        `Equation:\n` +
        `°F = (°C × 1.8) + 32\n\n` +
        `Example for 10 °C:\n` +
        `10 × 1.8 = 18\n` +
        `18 + 32 = 50 °F.`;
    } else if (fSym === "°F" && tSym === "°C") {
      workedExample = `To convert Fahrenheit to Celsius, subtract 32 and multiply by 5/9 (approximately 0.5556).\n\n` +
        `Equation:\n` +
        `°C = (°F - 32) / 1.8\n\n` +
        `Example for 50 °F:\n` +
        `50 - 32 = 18\n` +
        `18 / 1.8 = 10 °C.`;
    } else if (fSym === "°C" && tSym === "K") {
      workedExample = `To convert Celsius to Kelvin, add the absolute zero reference constant 273.15.\n\n` +
        `Equation:\n` +
        `K = °C + 273.15\n\n` +
        `Example for 10 °C:\n` +
        `10 + 273.15 = 283.15 K.`;
    } else if (fSym === "K" && tSym === "°C") {
      workedExample = `To convert Kelvin to Celsius, subtract the absolute zero constant 273.15.\n\n` +
        `Equation:\n` +
        `°C = K - 273.15\n\n` +
        `Example for 283.15 K:\n` +
        `283.15 - 273.15 = 10 °C.`;
    } else if (fSym === "°F" && tSym === "K") {
      workedExample = `To convert Fahrenheit to Kelvin, first convert to Celsius, then add 273.15.\n\n` +
        `Equation:\n` +
        `K = (°F - 32) × 5/9 + 273.15\n\n` +
        `Example for 50 °F:\n` +
        `(50 - 32) × 5/9 = 10\n` +
        `10 + 273.15 = 283.15 K.`;
    } else if (fSym === "K" && tSym === "°F") {
      workedExample = `To convert Kelvin to Fahrenheit, first subtract 273.15 to reach Celsius, then convert to Fahrenheit.\n\n` +
        `Equation:\n` +
        `°F = (K - 273.15) × 1.8 + 32\n\n` +
        `Example for 283.15 K:\n` +
        `283.15 - 273.15 = 10\n` +
        `10 × 1.8 + 32 = 50 °F.`;
    }
  }

  // 3. Generate Sector Practical Use Cases
  const practicalUseCases = [
    {
      title: "Scientific Research & Academic Studies",
      desc: `Acoustic metrology, physical laboratory measurements, and global collaborative telemetry data sets standardize primarily on SI metric models (${toUnit.name}) to ensure reproducibility without rounding bias.`
    },
    {
      title: "Industrial Manufacturing & Supply Chain Systems",
      desc: `Modern smart factories utilize standard dual-channel transducers capable of mapping relative metrics between ${fromUnit.symbol} and ${toUnit.symbol} to maintain dimensional tolerances across imported mechanical modules.`
    },
    {
      title: "Public Infrastructure & Civil Transport",
      desc: `Civil aviation, cargo logistics, maritime navigation, and local municipal regulatory rules often merge custom localized scales with absolute international SI limits.`
    }
  ];

  return {
    fromDefinition,
    toDefinition,
    originAndUsage,
    workedExample,
    practicalUseCases
  };
}
