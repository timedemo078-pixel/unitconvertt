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
  historyContext: string;
  commonMistakes: string;
}

export function getMetrologyGlossary(
  fromUnit: ConverterUnit,
  toUnit: ConverterUnit,
  categorySlug: string
): GlossaryData {
  const categoryLabel = categorySlug.replace("-", " ");
  
  const fromDefinition = fromUnit.description 
    ? `${fromUnit.name} (${fromUnit.symbol}) is a recognized unit in ${categoryLabel} metrology, defined as ${fromUnit.description.toLowerCase()}.`
    : `${fromUnit.name} (${fromUnit.symbol}) is a fundamental physical scale of measurement within the ${categoryLabel} dimension.`;

  const toDefinition = toUnit.description 
    ? `${toUnit.name} (${toUnit.symbol}) is defined metrologically as ${toUnit.description.toLowerCase()}.`
    : `${toUnit.name} (${toUnit.symbol}) is a standardized unit of measure configured for physical calculations of ${categoryLabel}.`;

  const originAndUsage = `Measurements scaled in ${fromUnit.name} and ${toUnit.name} represent distinct historic branches of metrology. The metric system (SI) is built on coherent decimal increments, whereas custom imperial or physical-constant systems are historically calibrated to environmental or anatomical baselines. Converting between these standards requires absolute double-precision coefficients to prevent mechanical and thermal model misalignments.`;

  // Dynamic calculations for worked example
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

  // 3. Category specific Metrology History and Common Mistakes mappings
  let historyContext = "This physical dimension has been modeled historically under distinct localized systems. Standardized modern calibrations rely heavily on physical constants recognized by the General Conference on Weights and Measures.";
  let commonMistakes = "The most frequent error in converting this dimension is failing to apply precise scaling coefficients, leading to systemic rounding bias in downstream mechanical or chemical models.";

  switch (categorySlug) {
    case "length":
      historyContext = `Length metrology was revolutionized during the 1875 Treaty of the Meter. The modern definition of the meter was adopted in 1983 by the 17th CGPM, which declared it as the distance traveled by light in a vacuum during a time interval of exactly 1/299,792,458 of a second, linking length directly to the constant speed of light (c).`;
      commonMistakes = `A classic industry mistake is confusing the 'International Foot' (exactly 0.3048 meters) with the older 'US Survey Foot' (approximately 0.3048006 meters). While the difference is tiny (2 parts per million), it introduces multi-meter errors in GIS mapping, satellite geodesy, and structural surveys.`;
      break;
    case "weight":
      historyContext = `For 130 years, mass was anchored to a physical cylinder of platinum-iridium kept near Paris, known as the 'Le Grand K'. In May 2019, the CGPM formally retired physical mass prototypes, redefining the kilogram (kg) via the Planck Constant (6.62607015 × 10^-34 J·s) using electronic watt balances.`;
      commonMistakes = `The most common mistake in mass metrology is confusing 'mass' (the amount of matter in an object) with 'weight' (the gravitational force acting upon that mass). Units like the pound (lb) are legally defined as units of mass, but are frequently used in engineering as pounds-force (lbf), which depends directly on local gravity constants.`;
      break;
    case "temperature":
      historyContext = `Temperature calibration scaled during the 18th century. Anders Celsius created his scale in 1742 based on the boiling and freezing points of pure water. The absolute thermodynamic scale was formulated by Lord Kelvin in 1848. Kelvin is now defined strictly by fixing the numerical value of the Boltzmann Constant (k) to 1.380649 × 10^-23 J/K.`;
      commonMistakes = `A critical mistake in thermodynamic code is using absolute scale offsets (like adding 32 or subtracting 273.15) when converting a temperature *difference* or *interval*. For instance, a temperature increase of 10 °C is equal to an increase of exactly 18 °F (or 10 K), not 50 °F! Offsets must only be applied when converting absolute thermal states.`;
      break;
    case "volume":
      historyContext = `Historically, volume units evolved from dry grain bushels or liquid wine gallons. Under modern SI guidelines, volume is a derived dimension, defined as cubic meters (m³). NIST specifications carefully preserve standard volume conversions to ensure compatibility in commercial trading and international fluid logistics.`;
      commonMistakes = `A common error is mixing 'dry volume' with 'liquid volume' standards, or failing to recognize that a 'US Gallon' (exactly 3.785411784 liters) is significantly smaller than an 'Imperial British Gallon' (exactly 4.54609 liters). This discrepancy has historically caused severe fuel calculation errors in trans-oceanic transit.`;
      break;
    case "pressure":
      historyContext = `Pressure measurement arose from Blaise Pascal's 1640 column barometer experiments. In the International System of Units, the SI unit of pressure is the Pascal (Pa), defined as one Newton of force distributed across an area of one square meter. NIST SP 811 lists exact ratios for bars, torrs, atmospheres, and psi.`;
      commonMistakes = `Engineers often make the mistake of confusing 'Gauge Pressure' (psig - pressure relative to local atmospheric pressure) with 'Absolute Pressure' (psia - pressure relative to a perfect vacuum). Failing to account for the standard 14.696 psi atmospheric pressure offset can cause severe mechanical chamber collapses.`;
      break;
    case "energy":
      historyContext = `The dimension of energy, work, and heat is named in honor of James Prescott Joule, who proved the mechanical equivalence of heat in 1843. Standard SI metrology represents energy in Joules (J). Other disciplines utilize secondary custom scales such as calories, British Thermal Units (BTU), or electrical kilowatt-hours.`;
      commonMistakes = `A frequent mistake is confusing 'power' (the rate of energy transfer, measured in Watts) with 'energy' (the total amount of work done, measured in Joules or Watt-hours). This results in errors like saying 'kilowatts per hour' instead of 'kilowatt-hours', which muddles power capacity with total electricity consumed.`;
      break;
    case "time":
      historyContext = `For millennia, time was divided using astronomical rotations of the earth. In 1967, the astronomical definition was abandoned for absolute atomic constancy. The second (s) is defined by the 13th CGPM as the duration of exactly 9,192,631,770 periods of radiation corresponding to the transition between two hyperfine levels of the ground state of cesium-133.`;
      commonMistakes = `In computing, developers often neglect standard leap-second offsets or confuse epoch millisecond time stamps with localized wall-clock representations. Additionally, ignoring relativistic gravitational time dilation can disrupt satellite telemetry if corrections are not processed.`;
      break;
    case "speed":
      historyContext = `Speed or velocity represents the derived rate of spatial change over a given time interval. Standard SI speed calculations are modeled in meters per second (m/s). Maritime navigators and meteorologists continue to utilize the Knot (kn), which is defined as one nautical mile (exactly 1,852 meters) per hour.`;
      commonMistakes = `A typical industry error is blending 'indicated airspeed' with 'true airspeed' in aerodynamic models, or failing to convert standard miles-per-hour (mph) to nautical knots, which has historically caused navigational drifting on long flights.`;
      break;
    case "area":
      historyContext = `Historically, area units mapped agricultural capacity—for example, the Acre represented the amount of land that could be plowed by an ox team in a single day. In SI metrology, area is a derived scale measured in square meters (m²), which is now calibrated with extreme laser interferometry.`;
      commonMistakes = `The most common mathematical trap is assuming that scaling factors for length apply linearly to area. For instance, because 1 yard is 3 feet, people often assume 1 square yard is 3 square feet, when it is actually 9 square feet (3 × 3). This is known as the quadratic scaling multiplier mistake.`;
      break;
  }

  // 4. Practical Sector Use Cases
  const practicalUseCases = [
    {
      title: "Scientific Research & Academic Studies",
      desc: `Acoustic metrology, physical laboratory measurements, and global collaborative telemetry datasets standardize primarily on SI metric models (${toUnit.name}) to ensure absolute reproducibility without rounding bias.`
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
    practicalUseCases,
    historyContext,
    commonMistakes
  };
}
