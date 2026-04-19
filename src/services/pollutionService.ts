import type { CityAQI } from "@/data/aqi-data";

export interface OpenAQMeasurement {
  parameter?: string;
  value?: number;
  lastUpdated?: string;
  unit?: string;
}

export interface OpenAQResult {
  location?: string;
  measurements?: OpenAQMeasurement[];
}

export interface NormalizedPollutionData {
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  aqi?: number;
  location?: string;
  timestamp?: string;
}

const PARAMETER_ALIASES: Record<string, keyof Omit<NormalizedPollutionData, "location" | "timestamp">> = {
  aqi: "aqi",
  pm25: "pm25",
  "pm2.5": "pm25",
  pm10: "pm10",
  no2: "no2",
  nitrogen_dioxide: "no2",
  so2: "so2",
  sulphur_dioxide: "so2",
  co: "co",
  carbon_monoxide: "co",
  o3: "o3",
  ozone: "o3",
};

const EMPTY_POLLUTION: NormalizedPollutionData = {
  pm25: 0,
  pm10: 0,
  no2: 0,
  so2: 0,
  co: 0,
  o3: 0,
};

export function resolveAQIValue(value: unknown, fallback: number) {
  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.round(parsed);
}

export function ensureValidCityAQI(city: CityAQI, fallback: CityAQI) {
  return {
    ...city,
    aqi: resolveAQIValue(city.aqi, fallback.aqi),
  };
}

function getParameterKey(parameter?: string) {
  if (!parameter) return null;
  return PARAMETER_ALIASES[parameter.toLowerCase()] ?? null;
}

export function estimateAQIFromPM25(pm25: number) {
  const ranges = [
    { cLow: 0, cHigh: 12, iLow: 0, iHigh: 50 },
    { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
    { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
    { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
    { cLow: 250.5, cHigh: 350.4, iLow: 301, iHigh: 400 },
    { cLow: 350.5, cHigh: 500.4, iLow: 401, iHigh: 500 },
  ];

  const value = Math.max(0, pm25);
  const range = ranges.find((entry) => value >= entry.cLow && value <= entry.cHigh) ?? ranges[ranges.length - 1];

  return Math.round(
    ((range.iHigh - range.iLow) / (range.cHigh - range.cLow)) * (value - range.cLow) + range.iLow,
  );
}

export function normalizeOpenAQResults(results: OpenAQResult[]): NormalizedPollutionData | null {
  if (!results.length) {
    return null;
  }

  const normalized: NormalizedPollutionData = { ...EMPTY_POLLUTION };
  let latestTimestamp = "";

  for (const result of results) {
    if (!normalized.location && result.location) {
      normalized.location = result.location;
    }

    for (const measurement of result.measurements ?? []) {
      const key = getParameterKey(measurement.parameter);
      if (!key || typeof measurement.value !== "number") {
        continue;
      }

      normalized[key] = measurement.value;

      if (measurement.lastUpdated && measurement.lastUpdated > latestTimestamp) {
        latestTimestamp = measurement.lastUpdated;
      }
    }
  }

  normalized.timestamp = latestTimestamp || undefined;
  return normalized;
}

export function mergeCityAQI(base: CityAQI, pollution: NormalizedPollutionData | null): CityAQI {
  if (!pollution) {
    return base;
  }

  let aqi = base.aqi;

  if (pollution.aqi !== undefined) {
    aqi = resolveAQIValue(pollution.aqi, base.aqi);
  } else if (pollution.pm25 > 0) {
    aqi = resolveAQIValue(estimateAQIFromPM25(pollution.pm25), base.aqi);
  }

  return ensureValidCityAQI({
    ...base,
    aqi,
    pm25: pollution.pm25 || base.pm25,
    pm10: pollution.pm10 || base.pm10,
    no2: pollution.no2 || base.no2,
    so2: pollution.so2 || base.so2,
    co: pollution.co || base.co,
    o3: pollution.o3 || base.o3,
  }, base);
}
