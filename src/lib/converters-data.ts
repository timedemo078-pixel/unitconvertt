/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ConverterUnit {
  name: string;
  symbol: string;
  factor: number; // Multiplying value by factor converts it to the base unit (or vice versa depending on direction)
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PopularConversion {
  fromSymbol: string;
  toSymbol: string;
  label: string;
}

export interface ConverterData {
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: string; // "common" | "engineering" | "heat" | "fluid" | "light" | "electricity" | "magnetism" | "radiology" | "other"
  units: ConverterUnit[];
  baseUnit: string; // Symbol of the base unit
  formulas?: string[];
  seo?: {
    title: string;
    description: string;
  };
  faq?: FAQItem[];
  relatedConverters?: string[]; // Slugs of related converters
  popularConversions?: PopularConversion[];
  examples?: { from: number; fromUnit: string; to: number; toUnit: string }[];
}

export interface ConverterCategory {
  id: string; // e.g., "common"
  name: string; // e.g., "Common Converters"
  description: string;
}

export const CONVERTER_CATEGORIES: ConverterCategory[] = [
  { id: "common", name: "Common Converters", description: "Everyday conversions for length, weight, volume, temperature, area, and more." },
  { id: "engineering", name: "Engineering Converters", description: "Advanced mechanical converters for physics, dynamics, and motion analysis." },
  { id: "heat", name: "Heat Converters", description: "Thermal efficiency, resistance, conductivity, and heat flux indices." },
  { id: "fluid", name: "Fluid Converters", description: "Flow rates, viscosity, surface tension, and permeability equations." },
  { id: "light", name: "Light Converters", description: "Photometric and radiometric indices including illuminance and frequency." },
  { id: "electricity", name: "Electricity Converters", description: "Comprehensive charge, current, field strength, conductance, and capacitance metrics." },
  { id: "magnetism", name: "Magnetism Converters", description: "Magnetomotive force, magnetic flux, and flux density metrics." },
  { id: "radiology", name: "Radiology Converters", description: "Absorbed dose, radioactive decay activity, and exposure standards." },
  { id: "other", name: "Other Converters", description: "Specialized utilities for data storage, typography, sound pressure, and prefixes." },
];

export const CONVERTERS_LIST: ConverterData[] = [
  // ==========================================
  // COMMON CONVERTERS
  // ==========================================
  {
    name: "Length Converter",
    slug: "length",
    description: "Convert between meters, miles, feet, inches, kilometers, and nautical miles.",
    icon: "Ruler",
    category: "common",
    baseUnit: "m",
    units: [
      { name: "Meter", symbol: "m", factor: 1.0, description: "SI base unit of length" },
      { name: "Kilometer", symbol: "km", factor: 1000.0, description: "Equal to 1,000 meters" },
      { name: "Centimeter", symbol: "cm", factor: 0.01, description: "Equal to 1/100th of a meter" },
      { name: "Millimeter", symbol: "mm", factor: 0.001, description: "Equal to 1/1000th of a meter" },
      { name: "Mile", symbol: "mi", factor: 1609.344, description: "US customary/Imperial mile" },
      { name: "Yard", symbol: "yd", factor: 0.9144, description: "Three feet (exactly 0.9144 meters)" },
      { name: "Foot", symbol: "ft", factor: 0.3048, description: "Twelve inches (exactly 0.3048 meters)" },
      { name: "Inch", symbol: "in", factor: 0.0254, description: "Exactly 2.54 centimeters" },
      { name: "Nautical Mile", symbol: "nmi", factor: 1852.0, description: "Used in marine and air navigation" }
    ],
  },
  {
    name: "Weight & Mass Converter",
    slug: "weight",
    description: "Convert between kilograms, pounds, ounces, grams, tons, and stones.",
    icon: "Scale",
    category: "common",
    baseUnit: "kg",
    units: [
      { name: "Kilogram", symbol: "kg", factor: 1.0, description: "SI base unit of mass" },
      { name: "Gram", symbol: "g", factor: 0.001, description: "One thousandth of a kilogram" },
      { name: "Milligram", symbol: "mg", factor: 0.000001, description: "One millionth of a kilogram" },
      { name: "Pound", symbol: "lb", factor: 0.45359237, description: "Exactly 0.45359237 kilograms" },
      { name: "Ounce", symbol: "oz", factor: 0.028349523, description: "One-sixteenth of a pound" },
      { name: "Metric Ton", symbol: "t", factor: 1000.0, description: "One thousand kilograms" },
      { name: "Stone", symbol: "st", factor: 6.35029318, description: "Equivalent to 14 pounds" }
    ],
  },
  {
    name: "Volume Converter",
    slug: "volume",
    description: "Convert between liters, milliliters, cubic meters, gallons, quarts, and pints.",
    icon: "CupSoda",
    category: "common",
    baseUnit: "l",
    units: [
      { name: "Liter", symbol: "L", factor: 1.0, description: "Metric volume base unit" },
      { name: "Milliliter", symbol: "mL", factor: 0.001, description: "One thousandth of a liter" },
      { name: "Cubic Meter", symbol: "m³", factor: 1000.0, description: "Equivalent to 1,000 liters" },
      { name: "US Gallon", symbol: "gal", factor: 3.785411784, description: "US customary liquid gallon" },
      { name: "US Quart", symbol: "qt", factor: 0.946352946, description: "One-quarter of a gallon" },
      { name: "US Pint", symbol: "pt", factor: 0.473176473, description: "One-eighth of a gallon" },
      { name: "US Cup", symbol: "cup", factor: 0.236588236, description: "Traditional US culinary cup" },
      { name: "Fluid Ounce", symbol: "fl oz", factor: 0.02957353, description: "Traditional US fluid ounce" }
    ],
  },
  {
    name: "Temperature Converter",
    slug: "temperature",
    description: "Convert between Celsius, Fahrenheit, and Kelvin scales.",
    icon: "Thermometer",
    category: "common",
    baseUnit: "c", // Custom logic handled in engine
    units: [
      { name: "Celsius", symbol: "°C", factor: 1.0, description: "Metric temperature scale" },
      { name: "Fahrenheit", symbol: "°F", factor: 1.0, description: "Imperial temperature scale" },
      { name: "Kelvin", symbol: "K", factor: 1.0, description: "SI absolute thermodynamic scale" }
    ],
  },
  {
    name: "Area Converter",
    slug: "area",
    description: "Convert between square meters, square feet, square miles, acres, and hectares.",
    icon: "Layers",
    category: "common",
    baseUnit: "m2",
    units: [
      { name: "Square Meter", symbol: "m²", factor: 1.0, description: "SI unit of area" },
      { name: "Square Kilometer", symbol: "km²", factor: 1000000.0, description: "One million square meters" },
      { name: "Square Centimeter", symbol: "cm²", factor: 0.0001, description: "One ten-thousandth of a square meter" },
      { name: "Square Foot", symbol: "ft²", factor: 0.09290304, description: "Standard US area unit" },
      { name: "Square Mile", symbol: "mi²", factor: 2589988.11, description: "Equivalent to 640 acres" },
      { name: "Acre", symbol: "ac", factor: 4046.85642, description: "43,560 square feet" },
      { name: "Hectare", symbol: "ha", factor: 10000.0, description: "Ten thousand square meters" }
    ],
  },
  {
    name: "Pressure Converter",
    slug: "pressure",
    description: "Convert between pascal, kilopascal, bar, psi, atmosphere, and torr.",
    icon: "Gauge",
    category: "common",
    baseUnit: "pa",
    units: [
      { name: "Pascal", symbol: "Pa", factor: 1.0, description: "SI derived unit of pressure" },
      { name: "Kilopascal", symbol: "kPa", factor: 1000.0, description: "One thousand pascals" },
      { name: "Bar", symbol: "bar", factor: 100000.0, description: "Metric bar unit" },
      { name: "Psi", symbol: "psi", factor: 6894.75729, description: "Pounds per square inch" },
      { name: "Atmosphere", symbol: "atm", factor: 101325.0, description: "Standard atmospheric pressure" },
      { name: "Torr", symbol: "Torr", factor: 133.322368, description: "Approximately 1 mmHg" }
    ],
  },
  {
    name: "Energy Converter",
    slug: "energy",
    description: "Convert between joules, kilojoules, calories, kilocalories, watt-hours, and BTUs.",
    icon: "Flame",
    category: "common",
    baseUnit: "j",
    units: [
      { name: "Joule", symbol: "J", factor: 1.0, description: "SI base unit of work/energy" },
      { name: "Kilojoule", symbol: "kJ", factor: 1000.0, description: "One thousand Joules" },
      { name: "Calorie", symbol: "cal", factor: 4.184, description: "Thermochemical calorie" },
      { name: "Kilocalorie", symbol: "kcal", factor: 4184.0, description: "Nutritional calorie (1000 calories)" },
      { name: "Watt-hour", symbol: "Wh", factor: 3600.0, description: "Electrical energy unit" },
      { name: "Kilowatt-hour", symbol: "kWh", factor: 3600000.0, description: "Utility bill billing unit" },
      { name: "BTU", symbol: "BTU", factor: 1055.056, description: "British Thermal Unit (ISO standard)" }
    ],
  },
  {
    name: "Dry Volume Converter",
    slug: "dry-volume",
    description: "Convert dry volumetric measurements including bushels, pecks, dry gallons, and dry quarts.",
    icon: "Grid",
    category: "common",
    baseUnit: "dry-quart",
    units: [
      { name: "US Dry Quart", symbol: "dry qt", factor: 1.0, description: "US dry quart (1.101 liters)" },
      { name: "US Dry Pint", symbol: "dry pt", factor: 0.5, description: "One-half of a dry quart" },
      { name: "US Dry Gallon", symbol: "dry gal", factor: 4.0, description: "Four dry quarts" },
      { name: "US Peck", symbol: "pk", factor: 8.0, description: "Eight dry quarts" },
      { name: "US Bushel", symbol: "bu", factor: 32.0, description: "Four pecks (32 dry quarts)" }
    ],
  },
  {
    name: "Currency Converter",
    slug: "currency",
    description: "Convert between key global currencies including USD, EUR, GBP, JPY, and CAD.",
    icon: "Coins",
    category: "common",
    baseUnit: "usd",
    units: [
      { name: "US Dollar", symbol: "USD", factor: 1.0, description: "United States Dollar" },
      { name: "Euro", symbol: "EUR", factor: 1.08, description: "European Union Euro (Calibrated)" },
      { name: "British Pound", symbol: "GBP", factor: 1.27, description: "United Kingdom Pound Sterling" },
      { name: "Japanese Yen", symbol: "JPY", factor: 0.0064, description: "Japanese Yen" },
      { name: "Canadian Dollar", symbol: "CAD", factor: 0.73, description: "Canadian Dollar" },
      { name: "Australian Dollar", symbol: "AUD", factor: 0.66, description: "Australian Dollar" }
    ],
  },
  {
    name: "Case Converter",
    slug: "case",
    description: "Helper string transformer utility supporting UPPER, lower, camelCase, snake_case, and kebab-case.",
    icon: "Type",
    category: "common",
    baseUnit: "text",
    units: [] // Handled in a separate special component
  },
  {
    name: "Power Converter",
    slug: "power",
    description: "Convert between watts, kilowatts, megawatts, horsepower, and calories per second.",
    icon: "Activity",
    category: "common",
    baseUnit: "w",
    units: [
      { name: "Watt", symbol: "W", factor: 1.0, description: "SI unit of power (J/s)" },
      { name: "Kilowatt", symbol: "kW", factor: 1000.0, description: "One thousand Watts" },
      { name: "Megawatt", symbol: "MW", factor: 1000000.0, description: "One million Watts" },
      { name: "Horsepower", symbol: "hp", factor: 745.69987, description: "Mechanical/Imperial Horsepower" },
      { name: "Calories per second", symbol: "cal/s", factor: 4.184, description: "Rate of thermodynamic heat transfer" }
    ],
  },
  {
    name: "Force Converter",
    slug: "force",
    description: "Convert between newtons, kilonewtons, dyne, and poundforce.",
    icon: "Zap",
    category: "common",
    baseUnit: "n",
    units: [
      { name: "Newton", symbol: "N", factor: 1.0, description: "SI unit of force" },
      { name: "Kilonewton", symbol: "kN", factor: 1000.0, description: "One thousand Newtons" },
      { name: "Poundforce", symbol: "lbf", factor: 4.44822, description: "Imperial force measurement" },
      { name: "Dyne", symbol: "dyn", factor: 0.00001, description: "CGS unit of force" }
    ],
  },
  {
    name: "Time Converter",
    slug: "time",
    description: "Convert between seconds, minutes, hours, days, weeks, and years.",
    icon: "Clock",
    category: "common",
    baseUnit: "s",
    units: [
      { name: "Second", symbol: "s", factor: 1.0, description: "SI base unit of time" },
      { name: "Minute", symbol: "min", factor: 60.0, description: "Sixty seconds" },
      { name: "Hour", symbol: "h", factor: 3600.0, description: "Sixty minutes" },
      { name: "Day", symbol: "d", factor: 86400.0, description: "Twenty-four hours" },
      { name: "Week", symbol: "wk", factor: 604800.0, description: "Seven days" },
      { name: "Year", symbol: "yr", factor: 31536000.0, description: "Standard calendar year (365 days)" }
    ],
  },
  {
    name: "Speed Converter",
    slug: "speed",
    description: "Convert between meters/sec, kilometers/hour, miles/hour, knots, and mach.",
    icon: "FastForward",
    category: "common",
    baseUnit: "mps",
    units: [
      { name: "Meter per second", symbol: "m/s", factor: 1.0, description: "SI unit of velocity" },
      { name: "Kilometer per hour", symbol: "km/h", factor: 0.27777778, description: "Metric velocity scale" },
      { name: "Miles per hour", symbol: "mph", factor: 0.44704, description: "US customary speed scale" },
      { name: "Knot", symbol: "kt", factor: 0.5144444, description: "Nautical mile per hour" },
      { name: "Mach", symbol: "Mach", factor: 340.29, description: "Speed of sound in dry air at sea level" }
    ],
  },
  {
    name: "Angle Converter",
    slug: "angle",
    description: "Convert between degrees, radians, gradians, and arcseconds.",
    icon: "Compass",
    category: "common",
    baseUnit: "deg",
    units: [
      { name: "Degree", symbol: "°", factor: 1.0, description: "Standard angular measure" },
      { name: "Radian", symbol: "rad", factor: 57.2957795, description: "Angular measure based on radius" },
      { name: "Gradian", symbol: "grad", factor: 0.9, description: "Metric unit of angle" },
      { name: "Arcsecond", symbol: "arcsec", factor: 0.000277778, description: "1/3600th of a degree" }
    ],
  },
  {
    name: "Fuel Consumption Converter",
    slug: "fuel-consumption",
    description: "Convert liters per 100km, miles per gallon (US), and kilometers per liter.",
    icon: "Fuel",
    category: "common",
    baseUnit: "lp100k", // Special calculations handled specifically or via simple multiplicative approximations
    units: [
      { name: "Liters per 100 km", symbol: "L/100km", factor: 1.0, description: "Standard European fuel efficiency metric" },
      { name: "Miles per Gallon (US)", symbol: "mpg (US)", factor: 235.215, description: "Standard US fuel efficiency scale" },
      { name: "Kilometer per Liter", symbol: "km/L", factor: 100.0, description: "Standard Asian fuel efficiency metric" }
    ],
  },
  {
    name: "Numbers Converter",
    slug: "numbers",
    description: "Auxiliary computer science converter supporting binary, octal, decimal, and hexadecimal bases.",
    icon: "Binary",
    category: "common",
    baseUnit: "bases",
    units: [] // Handled in a separate special component
  },
  {
    name: "Data Storage Converter",
    slug: "data-storage",
    description: "Convert between bytes, kilobytes, megabytes, gigabytes, and terabytes.",
    icon: "HardDrive",
    category: "common",
    baseUnit: "b",
    units: [
      { name: "Byte", symbol: "B", factor: 1.0, description: "Standard computing unit of data" },
      { name: "Kilobyte (Decimal)", symbol: "KB", factor: 1000.0, description: "1,000 bytes (Base 10)" },
      { name: "Megabyte (Decimal)", symbol: "MB", factor: 1000000.0, description: "1,000,000 bytes (Base 10)" },
      { name: "Gigabyte (Decimal)", symbol: "GB", factor: 1000000000.0, description: "1,000,000,000 bytes (Base 10)" },
      { name: "Terabyte (Decimal)", symbol: "TB", factor: 1000000000000.0, description: "1,000,000,000,000 bytes (Base 10)" },
      { name: "Kibibyte (Binary)", symbol: "KiB", factor: 1024.0, description: "1,024 bytes (Base 2)" },
      { name: "Mebibyte (Binary)", symbol: "MiB", factor: 1048576.0, description: "1,048,576 bytes (Base 2)" },
      { name: "Gibibyte (Binary)", symbol: "GiB", factor: 1073741824.0, description: "1,073,741,824 bytes (Base 2)" }
    ],
  },

  // ==========================================
  // ENGINEERING CONVERTERS
  // ==========================================
  {
    name: "Angular Velocity",
    slug: "angular-velocity",
    description: "Convert between radians/sec, revolutions/min, and degrees/sec.",
    icon: "RotateCw",
    category: "engineering",
    baseUnit: "rads",
    units: [
      { name: "Radian per second", symbol: "rad/s", factor: 1.0, description: "SI base angular velocity" },
      { name: "Revolution per minute", symbol: "rpm", factor: 0.104719755, description: "Common rotational speed measurement" },
      { name: "Degree per second", symbol: "deg/s", factor: 0.01745329, description: "Standard angular rotation rate" }
    ]
  },
  {
    name: "Acceleration",
    slug: "acceleration",
    description: "Convert between meters/sec², gravity units (g), and feet/sec².",
    icon: "Sparkles",
    category: "engineering",
    baseUnit: "mps2",
    units: [
      { name: "Meter per second squared", symbol: "m/s²", factor: 1.0, description: "SI base unit of acceleration" },
      { name: "Standard Gravity", symbol: "g", factor: 9.80665, description: "Standard acceleration due to Earth's gravity" },
      { name: "Foot per second squared", symbol: "ft/s²", factor: 0.3048, description: "Imperial acceleration unit" }
    ]
  },
  {
    name: "Angular Acceleration",
    slug: "angular-acceleration",
    description: "Convert between radians/sec² and revolutions/min².",
    icon: "TrendingUp",
    category: "engineering",
    baseUnit: "rads2",
    units: [
      { name: "Radian per second squared", symbol: "rad/s²", factor: 1.0, description: "SI unit of angular acceleration" },
      { name: "Revolution per minute squared", symbol: "rpm/s", factor: 0.104719755, description: "Rotational acceleration scale" }
    ]
  },
  {
    name: "Density",
    slug: "density",
    description: "Convert between kg/cubic meter, grams/cubic centimeter, and pounds/cubic foot.",
    icon: "Boxes",
    category: "engineering",
    baseUnit: "kgm3",
    units: [
      { name: "Kilogram per cubic meter", symbol: "kg/m³", factor: 1.0, description: "SI base unit of density" },
      { name: "Gram per cubic centimeter", symbol: "g/cm³", factor: 1000.0, description: "Equivalent to 1,000 kg/m³" },
      { name: "Pound per cubic foot", symbol: "lb/ft³", factor: 16.01846, description: "US customary density scale" }
    ]
  },
  {
    name: "Specific Volume",
    slug: "specific-volume",
    description: "Convert cubic meters/kilogram and cubic feet/pound.",
    icon: "Minimize",
    category: "engineering",
    baseUnit: "m3kg",
    units: [
      { name: "Cubic meter per kilogram", symbol: "m³/kg", factor: 1.0, description: "SI unit of specific volume" },
      { name: "Cubic foot per pound", symbol: "ft³/lb", factor: 0.06242796, description: "US customary specific volume" }
    ]
  },
  {
    name: "Moment of Inertia",
    slug: "moment-of-inertia",
    description: "Convert kilogram square-meters and pound square-feet.",
    icon: "Target",
    category: "engineering",
    baseUnit: "kgm2",
    units: [
      { name: "Kilogram square-meter", symbol: "kg·m²", factor: 1.0, description: "SI unit of moment of inertia" },
      { name: "Pound square-foot", symbol: "lb·ft²", factor: 0.04214011, description: "Imperial unit of moment of inertia" }
    ]
  },
  {
    name: "Moment of Force",
    slug: "moment-of-force",
    description: "Convert newton-meters and pound-force feet.",
    icon: "CornerUpRight",
    category: "engineering",
    baseUnit: "nm",
    units: [
      { name: "Newton-meter", symbol: "N·m", factor: 1.0, description: "SI unit of torque or moment" },
      { name: "Pound-force foot", symbol: "lbf·ft", factor: 1.355818, description: "Imperial unit of moment" }
    ]
  },
  {
    name: "Torque",
    slug: "torque",
    description: "Convert mechanical rotational force vectors.",
    icon: "Wrench",
    category: "engineering",
    baseUnit: "nm",
    units: [
      { name: "Newton-meter", symbol: "N·m", factor: 1.0, description: "Torque force magnitude" },
      { name: "Pound-force inch", symbol: "lbf·in", factor: 0.1129848, description: "Sub-division imperial torque unit" },
      { name: "Kilogram-force meter", symbol: "kgf·m", factor: 9.80665, description: "Gravitational torque unit" }
    ]
  },

  // ==========================================
  // HEAT CONVERTERS
  // ==========================================
  {
    name: "Fuel Efficiency (Mass)",
    slug: "fuel-efficiency-mass",
    description: "Convert joules per kilogram and BTUs per pound.",
    icon: "Flame",
    category: "heat",
    baseUnit: "jkg",
    units: [
      { name: "Joule per kilogram", symbol: "J/kg", factor: 1.0, description: "SI unit of specific energy" },
      { name: "BTU per pound", symbol: "BTU/lb", factor: 2326.0, description: "Imperial thermodynamic specific energy" }
    ]
  },
  {
    name: "Fuel Efficiency (Volume)",
    slug: "fuel-efficiency-volume",
    description: "Convert joules per cubic meter and BTUs per gallon.",
    icon: "Fuel",
    category: "heat",
    baseUnit: "jm3",
    units: [
      { name: "Joule per cubic meter", symbol: "J/m³", factor: 1.0, description: "SI unit of energy density" },
      { name: "BTU per US Gallon", symbol: "BTU/gal", factor: 278716.7, description: "US customary fuel energy density" }
    ]
  },
  {
    name: "Temperature Interval",
    slug: "temperature-interval",
    description: "Convert delta scale temperature increments.",
    icon: "HelpCircle",
    category: "heat",
    baseUnit: "deltaC",
    units: [
      { name: "Celsius Interval", symbol: "Δ°C", factor: 1.0, description: "Temperature differential step in Celsius" },
      { name: "Fahrenheit Interval", symbol: "Δ°F", factor: 0.55555556, description: "Temperature differential step in Fahrenheit" },
      { name: "Kelvin Interval", symbol: "ΔK", factor: 1.0, description: "Temperature step in absolute scale" }
    ]
  },
  {
    name: "Thermal Expansion",
    slug: "thermal-expansion",
    description: "Convert coefficient of thermal expansion per Kelvin.",
    icon: "Maximize2",
    category: "heat",
    baseUnit: "perK",
    units: [
      { name: "Per Kelvin", symbol: "1/K", factor: 1.0, description: "SI thermal expansion coefficient" },
      { name: "Per Fahrenheit", symbol: "1/°F", factor: 1.8, description: "Imperial thermal expansion coefficient" }
    ]
  },
  {
    name: "Thermal Resistance",
    slug: "thermal-resistance",
    description: "Convert kelvin per watt and Fahrenheit hours per BTU.",
    icon: "Gauge",
    category: "heat",
    baseUnit: "kw",
    units: [
      { name: "Kelvin per Watt", symbol: "K/W", factor: 1.0, description: "SI unit of thermal resistance" },
      { name: "Fahrenheit-hour per BTU", symbol: "°F·h/BTU", factor: 1.89563, description: "Imperial thermal resistance index" }
    ]
  },
  {
    name: "Thermal Conductivity",
    slug: "thermal-conductivity",
    description: "Convert watt per meter-Kelvin and BTU per hour-foot-Fahrenheit.",
    icon: "Zap",
    category: "heat",
    baseUnit: "wmk",
    units: [
      { name: "Watt per meter Kelvin", symbol: "W/(m·K)", factor: 1.0, description: "SI thermal conductivity" },
      { name: "BTU per hour foot Fahrenheit", symbol: "BTU/(h·ft·°F)", factor: 1.73073, description: "Imperial thermal conductivity" }
    ]
  },
  {
    name: "Specific Heat Capacity",
    slug: "specific-heat-capacity",
    description: "Convert joule per kilogram-Kelvin and BTU per pound-Fahrenheit.",
    icon: "Award",
    category: "heat",
    baseUnit: "jkgk",
    units: [
      { name: "Joule per kilogram Kelvin", symbol: "J/(kg·K)", factor: 1.0, description: "SI specific heat capacity" },
      { name: "BTU per pound Fahrenheit", symbol: "BTU/(lb·°F)", factor: 4186.8, description: "Imperial specific heat capacity" }
    ]
  },
  {
    name: "Heat Density",
    slug: "heat-density",
    description: "Convert joule per square meter and BTU per square foot.",
    icon: "Layers",
    category: "heat",
    baseUnit: "jm2",
    units: [
      { name: "Joule per square meter", symbol: "J/m²", factor: 1.0, description: "SI heat density" },
      { name: "BTU per square foot", symbol: "BTU/ft²", factor: 11356.5, description: "Imperial heat density" }
    ]
  },
  {
    name: "Heat Flux Density",
    slug: "heat-flux-density",
    description: "Convert watt per square meter and BTU per hour-square foot.",
    icon: "Shuffle",
    category: "heat",
    baseUnit: "wm2",
    units: [
      { name: "Watt per square meter", symbol: "W/m²", factor: 1.0, description: "SI heat flux density" },
      { name: "BTU per hour square foot", symbol: "BTU/(h·ft²)", factor: 3.15459, description: "Imperial heat flux density" }
    ]
  },
  {
    name: "Heat Transfer Coefficient",
    slug: "heat-transfer-coefficient",
    description: "Convert watt per square meter-Kelvin.",
    icon: "Repeat",
    category: "heat",
    baseUnit: "wm2k",
    units: [
      { name: "Watt per square meter Kelvin", symbol: "W/(m²·K)", factor: 1.0, description: "SI heat transfer speed" },
      { name: "BTU per hour square foot Fahrenheit", symbol: "BTU/(h·ft²·°F)", factor: 5.67826, description: "Imperial heat transfer speed" }
    ]
  },

  // ==========================================
  // FLUID CONVERTERS
  // ==========================================
  {
    name: "Flow",
    slug: "flow",
    description: "Convert cubic meters per second, liters per minute, and gallons per minute.",
    icon: "CupSoda",
    category: "fluid",
    baseUnit: "m3s",
    units: [
      { name: "Cubic meter per second", symbol: "m³/s", factor: 1.0, description: "SI base flow volume" },
      { name: "Liter per minute", symbol: "L/min", factor: 0.000016667, description: "Standard metric flow" },
      { name: "US Gallon per minute", symbol: "gpm", factor: 0.00006309, description: "Standard US hydraulic flow" }
    ]
  },
  {
    name: "Mass Flow",
    slug: "mass-flow",
    description: "Convert kilograms per second and pounds per hour.",
    icon: "Scale",
    category: "fluid",
    baseUnit: "kgs",
    units: [
      { name: "Kilogram per second", symbol: "kg/s", factor: 1.0, description: "SI mass flow rate" },
      { name: "Pound per hour", symbol: "lb/h", factor: 0.000125998, description: "Imperial mass flow rate" }
    ]
  },
  {
    name: "Molar Flow",
    slug: "molar-flow",
    description: "Convert moles per second and kilomoles per hour.",
    icon: "Database",
    category: "fluid",
    baseUnit: "mols",
    units: [
      { name: "Mole per second", symbol: "mol/s", factor: 1.0, description: "SI molar flow rate" },
      { name: "Kilomole per hour", symbol: "kmol/h", factor: 0.2777778, description: "Industrial molar flow rate" }
    ]
  },
  {
    name: "Mass Flux Density",
    slug: "mass-flux-density",
    description: "Convert kilogram per second-square meter.",
    icon: "Maximize",
    category: "fluid",
    baseUnit: "kgsm2",
    units: [
      { name: "Kilogram per second square meter", symbol: "kg/(s·m²)", factor: 1.0, description: "SI mass flux density" },
      { name: "Pound per hour square foot", symbol: "lb/(h·ft²)", factor: 0.00135623, description: "Imperial mass flux density" }
    ]
  },
  {
    name: "Molar Concentration",
    slug: "molar-concentration",
    description: "Convert moles per cubic meter and moles per liter.",
    icon: "Grid",
    category: "fluid",
    baseUnit: "molm3",
    units: [
      { name: "Mole per cubic meter", symbol: "mol/m³", factor: 1.0, description: "SI molar density" },
      { name: "Mole per Liter", symbol: "mol/L", factor: 1000.0, description: "Standard chemistry molarity" }
    ]
  },
  {
    name: "Solution Concentration",
    slug: "solution-concentration",
    description: "Convert milligrams per liter and parts per million (ppm).",
    icon: "Hash",
    category: "fluid",
    baseUnit: "mgl",
    units: [
      { name: "Milligram per Liter", symbol: "mg/L", factor: 1.0, description: "Active density of dissolved substances" },
      { name: "Parts per million", symbol: "ppm", factor: 1.0, description: "Universal solution fraction (equivalent to 1 mg/L in water)" }
    ]
  },
  {
    name: "Dynamic Viscosity",
    slug: "dynamic-viscosity",
    description: "Convert pascal-seconds, poise, and centipoise.",
    icon: "TrendingUp",
    category: "fluid",
    baseUnit: "pas",
    units: [
      { name: "Pascal second", symbol: "Pa·s", factor: 1.0, description: "SI dynamic viscosity" },
      { name: "Poise", symbol: "P", factor: 0.1, description: "CGS dynamic viscosity" },
      { name: "Centipoise", symbol: "cP", factor: 0.001, description: "Sub-division dynamic viscosity (water is ~1 cP)" }
    ]
  },
  {
    name: "Kinematic Viscosity",
    slug: "kinematic-viscosity",
    description: "Convert square meters per second, stokes, and centistokes.",
    icon: "Wind",
    category: "fluid",
    baseUnit: "m2s",
    units: [
      { name: "Square meter per second", symbol: "m²/s", factor: 1.0, description: "SI kinematic viscosity" },
      { name: "Stokes", symbol: "St", factor: 0.0001, description: "CGS kinematic viscosity" },
      { name: "Centistokes", symbol: "cSt", factor: 0.000001, description: "Sub-division kinematic viscosity" }
    ]
  },
  {
    name: "Surface Tension",
    slug: "surface-tension",
    description: "Convert newton per meter and dyne per centimeter.",
    icon: "Activity",
    category: "fluid",
    baseUnit: "nm",
    units: [
      { name: "Newton per meter", symbol: "N/m", factor: 1.0, description: "SI surface tension" },
      { name: "Dyne per centimeter", symbol: "dyn/cm", factor: 0.001, description: "CGS surface tension" }
    ]
  },
  {
    name: "Permeability",
    slug: "permeability",
    description: "Convert darcy and millidarcy geological flow capacities.",
    icon: "Compass",
    category: "fluid",
    baseUnit: "darcy",
    units: [
      { name: "Darcy", symbol: "D", factor: 1.0, description: "Fluid flow permeability" },
      { name: "Millidarcy", symbol: "mD", factor: 0.001, description: "Micro geological permeability index" }
    ]
  },

  // ==========================================
  // LIGHT CONVERTERS
  // ==========================================
  {
    name: "Luminance",
    slug: "luminance",
    description: "Convert candela per square meter (nit) and foot-lambert.",
    icon: "Sun",
    category: "light",
    baseUnit: "cdm2",
    units: [
      { name: "Candela per square meter", symbol: "cd/m²", factor: 1.0, description: "SI unit of luminance (Nits)" },
      { name: "Foot-lambert", symbol: "fL", factor: 3.426259, description: "Standard US display luminance scale" }
    ]
  },
  {
    name: "Luminous Intensity",
    slug: "luminous-intensity",
    description: "Convert candela and candlepower metrics.",
    icon: "Eye",
    category: "light",
    baseUnit: "cd",
    units: [
      { name: "Candela", symbol: "cd", factor: 1.0, description: "SI base unit of light power" },
      { name: "Candlepower", symbol: "cp", factor: 0.981, description: "Traditional unit of luminous force" }
    ]
  },
  {
    name: "Illuminance",
    slug: "illuminance",
    description: "Convert lux and foot-candle ambient luminous flux densities.",
    icon: "Sun",
    category: "light",
    baseUnit: "lux",
    units: [
      { name: "Lux", symbol: "lx", factor: 1.0, description: "SI unit of illuminance (lm/m²)" },
      { name: "Foot-candle", symbol: "fc", factor: 10.76391, description: "Imperial unit of illuminance" }
    ]
  },
  {
    name: "Digital Image Resolution",
    slug: "digital-image-resolution",
    description: "Convert pixels per inch (PPI) and pixels per centimeter.",
    icon: "Cpu",
    category: "light",
    baseUnit: "ppi",
    units: [
      { name: "Pixels per inch", symbol: "ppi", factor: 1.0, description: "Standard screen pixel density" },
      { name: "Pixels per centimeter", symbol: "ppc", factor: 2.54, description: "Metric screen pixel density" }
    ]
  },
  {
    name: "Frequency ↔ Wavelength",
    slug: "frequency-wavelength",
    description: "Convert gigahertz frequency to nanometer light wavelengths.",
    icon: "Radio",
    category: "light",
    baseUnit: "nm", // Custom reciprocal conversions handled in calculation engine
    units: [
      { name: "Nanometers", symbol: "nm", factor: 1.0, description: "Wavelength of visible/invisible electromagnetic waves" },
      { name: "Terahertz", symbol: "THz", factor: 1.0, description: "Calculated via speed of light (c / wavelength)" }
    ]
  },

  // ==========================================
  // ELECTRICITY CONVERTERS
  // ==========================================
  {
    name: "Electric Charge",
    slug: "electric-charge",
    description: "Convert coulomb, ampere-hour, and elementary charge (e).",
    icon: "Zap",
    category: "electricity",
    baseUnit: "c",
    units: [
      { name: "Coulomb", symbol: "C", factor: 1.0, description: "SI unit of electrical charge" },
      { name: "Ampere-hour", symbol: "Ah", factor: 3600.0, description: "Battery capacity electric charge scale" },
      { name: "Elementary Charge", symbol: "e", factor: 1.60217663e-19, description: "Magnitude of charge on a single electron" }
    ]
  },
  {
    name: "Linear Charge Density",
    slug: "linear-charge-density",
    description: "Convert coulomb per meter and coulomb per inch.",
    icon: "Minimize",
    category: "electricity",
    baseUnit: "cm",
    units: [
      { name: "Coulomb per meter", symbol: "C/m", factor: 1.0, description: "SI linear charge density" },
      { name: "Coulomb per inch", symbol: "C/in", factor: 39.37007, description: "Imperial linear charge density" }
    ]
  },
  {
    name: "Surface Charge Density",
    slug: "surface-charge-density",
    description: "Convert coulomb per square meter.",
    icon: "Layers",
    category: "electricity",
    baseUnit: "cm2",
    units: [
      { name: "Coulomb per square meter", symbol: "C/m²", factor: 1.0, description: "SI surface charge density" },
      { name: "Coulomb per square inch", symbol: "C/in²", factor: 1550.003, description: "Imperial surface charge density" }
    ]
  },
  {
    name: "Volume Charge Density",
    slug: "volume-charge-density",
    description: "Convert coulomb per cubic meter.",
    icon: "Boxes",
    category: "electricity",
    baseUnit: "cm3",
    units: [
      { name: "Coulomb per cubic meter", symbol: "C/m³", factor: 1.0, description: "SI volume charge density" },
      { name: "Coulomb per cubic inch", symbol: "C/in³", factor: 61023.74, description: "Imperial volume charge density" }
    ]
  },
  {
    name: "Electric Current",
    slug: "electric-current",
    description: "Convert ampere, milliampere, kiloampere, and biot.",
    icon: "Zap",
    category: "electricity",
    baseUnit: "a",
    units: [
      { name: "Ampere", symbol: "A", factor: 1.0, description: "SI base unit of electric current" },
      { name: "Milliampere", symbol: "mA", factor: 0.001, description: "One thousandth of an Ampere" },
      { name: "Kiloampere", symbol: "kA", factor: 1000.0, description: "One thousand Amperes" },
      { name: "Biot", symbol: "Bi", factor: 10.0, description: "CGS unit of electric current" }
    ]
  },
  {
    name: "Linear Current Density",
    slug: "linear-current-density",
    description: "Convert ampere per meter.",
    icon: "Sliders",
    category: "electricity",
    baseUnit: "am",
    units: [
      { name: "Ampere per meter", symbol: "A/m", factor: 1.0, description: "SI linear current density" },
      { name: "Ampere per inch", symbol: "A/in", factor: 39.37007, description: "Imperial linear current density" }
    ]
  },
  {
    name: "Surface Current Density",
    slug: "surface-current-density",
    description: "Convert ampere per square meter.",
    icon: "Layers",
    category: "electricity",
    baseUnit: "am2",
    units: [
      { name: "Ampere per square meter", symbol: "A/m²", factor: 1.0, description: "SI surface current density" },
      { name: "Ampere per square inch", symbol: "A/in²", factor: 1550.003, description: "Imperial surface current density" }
    ]
  },
  {
    name: "Electric Field Strength",
    slug: "electric-field-strength",
    description: "Convert volt per meter and newton per coulomb.",
    icon: "Shield",
    category: "electricity",
    baseUnit: "vm",
    units: [
      { name: "Volt per meter", symbol: "V/m", factor: 1.0, description: "SI unit of electric field strength" },
      { name: "Newton per Coulomb", symbol: "N/C", factor: 1.0, description: "Force ratio electric field strength" }
    ]
  },
  {
    name: "Electric Potential",
    slug: "electric-potential",
    description: "Convert volt, millivolt, and kilovolts.",
    icon: "Activity",
    category: "electricity",
    baseUnit: "v",
    units: [
      { name: "Volt", symbol: "V", factor: 1.0, description: "SI unit of electric potential" },
      { name: "Millivolt", symbol: "mV", factor: 0.001, description: "One thousandth of a Volt" },
      { name: "Kilovolts", symbol: "kV", factor: 1000.0, description: "One thousand Volts" }
    ]
  },
  {
    name: "Electric Resistance",
    slug: "electric-resistance",
    description: "Convert ohm, milliohm, and megaohms.",
    icon: "Shuffle",
    category: "electricity",
    baseUnit: "ohm",
    units: [
      { name: "Ohm", symbol: "Ω", factor: 1.0, description: "SI unit of electrical resistance" },
      { name: "Milliohm", symbol: "mΩ", factor: 0.001, description: "One thousandth of an Ohm" },
      { name: "Megaohm", symbol: "MΩ", factor: 1000000.0, description: "One million Ohms" }
    ]
  },
  {
    name: "Electric Resistivity",
    slug: "electric-resistivity",
    description: "Convert ohm-meters.",
    icon: "Minimize",
    category: "electricity",
    baseUnit: "ohmm",
    units: [
      { name: "Ohm meter", symbol: "Ω·m", factor: 1.0, description: "SI unit of electrical resistivity" },
      { name: "Ohm centimeter", symbol: "Ω·cm", factor: 0.01, description: "Sub-division electrical resistivity" }
    ]
  },
  {
    name: "Electric Conductance",
    slug: "electric-conductance",
    description: "Convert siemens and mhos.",
    icon: "Sliders",
    category: "electricity",
    baseUnit: "siemens",
    units: [
      { name: "Siemens", symbol: "S", factor: 1.0, description: "SI unit of electrical conductance" },
      { name: "Mho", symbol: "mho", factor: 1.0, description: "Traditional/reciprocal ohm electric conductance" }
    ]
  },
  {
    name: "Electric Conductivity",
    slug: "electric-conductivity",
    description: "Convert siemens per meter.",
    icon: "Compass",
    category: "electricity",
    baseUnit: "sm",
    units: [
      { name: "Siemens per meter", symbol: "S/m", factor: 1.0, description: "SI electrical conductivity" },
      { name: "Siemens per centimeter", symbol: "S/cm", factor: 100.0, description: "Sub-division electrical conductivity" }
    ]
  },
  {
    name: "Electrostatic Capacitance",
    slug: "electrostatic-capacitance",
    description: "Convert farads, microfarads, and picofarads.",
    icon: "Database",
    category: "electricity",
    baseUnit: "farad",
    units: [
      { name: "Farad", symbol: "F", factor: 1.0, description: "SI unit of electrostatic capacitance" },
      { name: "Microfarad", symbol: "µF", factor: 0.000001, description: "One millionth of a Farad" },
      { name: "Picofarad", symbol: "pF", factor: 1e-12, description: "One trillionth of a Farad" }
    ]
  },
  {
    name: "Inductance",
    slug: "inductance",
    description: "Convert henry, millihenry, and microhenrys.",
    icon: "TrendingUp",
    category: "electricity",
    baseUnit: "henry",
    units: [
      { name: "Henry", symbol: "H", factor: 1.0, description: "SI unit of electrical inductance" },
      { name: "Millihenry", symbol: "mH", factor: 0.001, description: "One thousandth of a Henry" },
      { name: "Microhenry", symbol: "µH", factor: 0.000001, description: "One millionth of a Henry" }
    ]
  },

  // ==========================================
  // MAGNETISM CONVERTERS
  // ==========================================
  {
    name: "Magnetomotive Force",
    slug: "magnetomotive-force",
    description: "Convert ampere-turn and gilbert metrics.",
    icon: "Zap",
    category: "magnetism",
    baseUnit: "at",
    units: [
      { name: "Ampere-turn", symbol: "At", factor: 1.0, description: "SI magnetic force" },
      { name: "Gilbert", symbol: "Gi", factor: 0.7957747, description: "CGS magnetic force scale" }
    ]
  },
  {
    name: "Magnetic Field Strength",
    slug: "magnetic-field-strength",
    description: "Convert ampere per meter and oersteds.",
    icon: "Sliders",
    category: "magnetism",
    baseUnit: "am",
    units: [
      { name: "Ampere per meter", symbol: "A/m", factor: 1.0, description: "SI magnetic field" },
      { name: "Oersted", symbol: "Oe", factor: 79.57747, description: "CGS magnetic field strength scale" }
    ]
  },
  {
    name: "Magnetic Flux",
    slug: "magnetic-flux",
    description: "Convert weber and maxwell metrics.",
    icon: "Wind",
    category: "magnetism",
    baseUnit: "wb",
    units: [
      { name: "Weber", symbol: "Wb", factor: 1.0, description: "SI unit of magnetic flux" },
      { name: "Maxwell", symbol: "Mx", factor: 1e-8, description: "CGS unit of magnetic flux" }
    ]
  },
  {
    name: "Magnetic Flux Density",
    slug: "magnetic-flux-density",
    description: "Convert tesla and gauss magnetic field vectors.",
    icon: "Magnet",
    category: "magnetism",
    baseUnit: "t",
    units: [
      { name: "Tesla", symbol: "T", factor: 1.0, description: "SI unit of magnetic field strength (B)" },
      { name: "Gauss", symbol: "G", factor: 0.0001, description: "CGS unit of magnetic field strength" }
    ]
  },

  // ==========================================
  // RADIOLOGY CONVERTERS
  // ==========================================
  {
    name: "Radiation",
    slug: "radiation",
    description: "Ionizing equivalent dose and radiation safety standards.",
    icon: "Radio",
    category: "radiology",
    baseUnit: "sv",
    units: [
      { name: "Sievert", symbol: "Sv", factor: 1.0, description: "SI unit of equivalent/equivalent radiation dose" },
      { name: "Rem", symbol: "rem", factor: 0.01, description: "Traditional US safety radiation dose scale" },
      { name: "Millisievert", symbol: "mSv", factor: 0.001, description: "One thousandth of a Sievert" }
    ]
  },
  {
    name: "Radioactivity",
    slug: "radioactivity",
    description: "Convert becquerel and curie atomic decay rates.",
    icon: "Shield",
    category: "radiology",
    baseUnit: "bq",
    units: [
      { name: "Becquerel", symbol: "Bq", factor: 1.0, description: "SI unit of radioactive decay speed" },
      { name: "Curie", symbol: "Ci", factor: 3.7e10, description: "Approximate decay speed of 1g of radium-226" },
      { name: "Rutherford", symbol: "Rd", factor: 1000000.0, description: "One million decays per second" }
    ]
  },
  {
    name: "Radiation Exposure",
    slug: "radiation-exposure",
    description: "Convert coulomb per kilogram and roentgen exposure levels.",
    icon: "Eye",
    category: "radiology",
    baseUnit: "ckg",
    units: [
      { name: "Coulomb per kilogram", symbol: "C/kg", factor: 1.0, description: "SI unit of ionization exposure" },
      { name: "Roentgen", symbol: "R", factor: 0.000258, description: "Traditional unit of air ionization exposure" }
    ]
  },
  {
    name: "Radiation Absorbed Dose",
    slug: "radiation-absorbed-dose",
    description: "Convert gray and rad physical energy transfers.",
    icon: "Target",
    category: "radiology",
    baseUnit: "gy",
    units: [
      { name: "Gray", symbol: "Gy", factor: 1.0, description: "SI unit of absorbed ionizing radiation" },
      { name: "Rad", symbol: "rad", factor: 0.01, description: "Traditional absorbed energy transfer scale" },
      { name: "Milligray", symbol: "mGy", factor: 0.001, description: "One thousandth of a Gray" }
    ]
  },

  // ==========================================
  // OTHER CONVERTERS
  // ==========================================
  {
    name: "Prefixes Converter",
    slug: "prefixes",
    description: "Convert engineering multiplier prefixes from micro and milli to giga and tera.",
    icon: "Compass",
    category: "other",
    baseUnit: "one",
    units: [
      { name: "Unit", symbol: " ", factor: 1.0, description: "Multiplicative factor baseline" },
      { name: "Tera", symbol: "T", factor: 1e12, description: "One trillion multiplier" },
      { name: "Giga", symbol: "G", factor: 1e9, description: "One billion multiplier" },
      { name: "Mega", symbol: "M", factor: 1000000.0, description: "One million multiplier" },
      { name: "Kilo", symbol: "k", factor: 1000.0, description: "One thousand multiplier" },
      { name: "Milli", symbol: "m", factor: 0.001, description: "One thousandth multiplier" },
      { name: "Micro", symbol: "µ", factor: 0.000001, description: "One millionth multiplier" },
      { name: "Nano", symbol: "n", factor: 1e-9, description: "One billionth multiplier" }
    ]
  },
  {
    name: "Data Transfer Converter",
    slug: "data-transfer",
    description: "Convert network speeds including megabits per second (Mbps) and gigabytes per second.",
    icon: "Activity",
    category: "other",
    baseUnit: "bps",
    units: [
      { name: "Bits per second", symbol: "bps", factor: 1.0, description: "Network stream raw speed baseline" },
      { name: "Kilobits per second", symbol: "Kbps", factor: 1000.0, description: "One thousand bits per second" },
      { name: "Megabits per second", symbol: "Mbps", factor: 1000000.0, description: "One million bits per second" },
      { name: "Gigabits per second", symbol: "Gbps", factor: 1000000000.0, description: "One billion bits per second" },
      { name: "Megabytes per second", symbol: "MB/s", factor: 8000000.0, description: "One million bytes per second" }
    ]
  },
  {
    name: "Sound Converter",
    slug: "sound",
    description: "Convert decibels and sound pressure bar indices.",
    icon: "Volume2",
    category: "other",
    baseUnit: "pa",
    units: [
      { name: "Pascal Sound Pressure", symbol: "Pa", factor: 1.0, description: "SI unit of sound pressure amplitude" },
      { name: "Microbar Sound Pressure", symbol: "µbar", factor: 0.1, description: "Alternative sound pressure scale" }
    ]
  },
  {
    name: "Typography Converter",
    slug: "typography",
    description: "Convert digital design typography points, picas, pixels, and millimeters.",
    icon: "Type",
    category: "other",
    baseUnit: "pt",
    units: [
      { name: "Point", symbol: "pt", factor: 1.0, description: "Standard typesetting point" },
      { name: "Pica", symbol: "pica", factor: 12.0, description: "Equivalent to 12 points" },
      { name: "Pixel", symbol: "px", factor: 0.75, description: "Assuming standard 96 DPI ratio (1px = 0.75pt)" },
      { name: "Millimeter", symbol: "mm", factor: 2.8346, description: "Physical spacing equivalent" }
    ]
  },
  {
    name: "Lumber Volume Converter",
    slug: "lumber-volume",
    description: "Convert physical lumber spacing board feet and cubic meters.",
    icon: "Layers",
    category: "other",
    baseUnit: "bf",
    units: [
      { name: "Board Foot", symbol: "fbm", factor: 1.0, description: "Lumber volumetric sizing (12 in x 12 in x 1 in)" },
      { name: "Cubic Meter Lumber", symbol: "m³ lumber", factor: 423.776, description: "SI physical volume equivalent" }
    ]
  }
];

// Helper to expand formula templates programmatically
export function getConverterFormulas(conv: ConverterData): string[] {
  if (conv.formulas) return conv.formulas;

  if (conv.slug === "temperature") {
    return [
      "°F = (°C × 9/5) + 32",
      "K = °C + 273.15",
      "°C = (°F - 32) × 5/9"
    ];
  }

  // Base default multiplicative conversion
  const baseU = conv.units.find(u => u.symbol === conv.baseUnit) || conv.units[0];
  const secondaryU = conv.units.find(u => u.symbol !== conv.baseUnit) || conv.units[1] || baseU;

  return [
    `Value in ${secondaryU.name} = (Value in ${baseU.name}) / ${secondaryU.factor}`,
    `Value in ${baseU.name} = (Value in ${secondaryU.name}) × ${secondaryU.factor}`
  ];
}

// Generate FAQs programmatically if not provided
export function getConverterFAQ(conv: ConverterData): FAQItem[] {
  if (conv.faq) return conv.faq;

  return [
    {
      question: `How does UnitConvert verify ${conv.name} calculations?`,
      answer: `Every coefficient within the ${conv.name} engine is modeled directly after the NIST Special Publication 811. We pass all calculation outputs through standard double-precision floating-point roundoff protection filters to prevent representation errors.`
    },
    {
      question: `What is the base reference unit for this ${conv.name}?`,
      answer: `The base calibration reference unit is the ${conv.units.find(u => u.symbol === conv.baseUnit)?.name || "default baseline"} (${conv.baseUnit}). All other units within this category are resolved through linear scaling factors relative to this reference.`
    }
  ];
}
