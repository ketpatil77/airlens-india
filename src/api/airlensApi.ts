import { cityAQIData, type CityAQI } from "@/data/aqi-data";
import { CITIES } from "@/data/cities";
import { getCityAQI } from "@/services/airQualityService";
import { getAQIForecast } from "@/services/weatherService";
import { ensureValidCityAQI, mergeCityAQI, normalizeOpenAQResults } from "@/services/pollutionService";

export interface ForecastPoint {
  time: string;
  pm25: number;
  pm10: number;
  co: number;
  no2: number;
  so2: number;
  o3: number;
  uvIndex: number;
}

export interface CityAirQualityResponse {
  city: CityAQI;
  source: "api" | "fallback" | "forecast";
  message?: string;
}

const CITY_QUERY_ALIASES: Record<string, string> = {
  Bengaluru: "Bangalore",
  Bangalore: "Bangalore",
};

function toFiniteNumber(value: unknown, fallback: number) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getHourlyStartIndex(times?: string[]) {
  if (!times?.length) {
    return 0;
  }

  const now = new Date();
  const currentHour = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), 0, 0, 0),
  );

  const currentHourIso = currentHour.toISOString().slice(0, 16);
  const exactIndex = times.findIndex((time) => time === currentHourIso);

  if (exactIndex >= 0) {
    return exactIndex;
  }

  const firstFutureIndex = times.findIndex((time) => time >= currentHourIso);
  return firstFutureIndex >= 0 ? firstFutureIndex : 0;
}

function getFallbackCity(city: string) {
  return cityAQIData.find((item) => item.city.toLowerCase() === city.toLowerCase()) ?? null;
}

function getCityMeta(city: string) {
  return CITIES.find((item) => item.name.toLowerCase() === city.toLowerCase()) ?? null;
}

function getOpenAQCityName(city: string) {
  return CITY_QUERY_ALIASES[city] ?? city;
}

export async function getUnifiedCityAirQuality(city: string): Promise<CityAirQualityResponse> {
  const fallback = getFallbackCity(city);
  const meta = getCityMeta(city);

  if (!fallback || !meta) {
    throw new Error(`Unsupported city: ${city}`);
  }

  try {
    const hourly = await getAQIForecast(meta.lat, meta.lng);
    const startIndex = getHourlyStartIndex(hourly?.time);
    const forecastPoint = hourly?.time?.length
      ? {
          pm25: toFiniteNumber(hourly.pm2_5?.[startIndex], fallback.pm25),
          pm10: toFiniteNumber(hourly.pm10?.[startIndex], fallback.pm10),
          no2: toFiniteNumber(hourly.nitrogen_dioxide?.[startIndex], fallback.no2),
          so2: toFiniteNumber(hourly.sulphur_dioxide?.[startIndex], fallback.so2),
          co: toFiniteNumber(hourly.carbon_monoxide?.[startIndex], fallback.co),
          o3: toFiniteNumber(hourly.ozone?.[startIndex], fallback.o3),
          timestamp: hourly.time?.[startIndex],
        }
      : null;

    const forecastCity = forecastPoint ? mergeCityAQI(fallback, forecastPoint) : fallback;

    const results = await getCityAQI(getOpenAQCityName(city));
    const pollution = normalizeOpenAQResults(results);

    if (!pollution) {
      return {
        city: ensureValidCityAQI(forecastCity, fallback),
        source: forecastPoint ? "forecast" : "fallback",
        message: forecastPoint ? undefined : "AQI unavailable",
      };
    }

    const mergedCity = mergeCityAQI(forecastCity, pollution);

    return {
      city: ensureValidCityAQI(mergedCity, fallback),
      source: "api",
    };
  } catch (error) {
    return {
      city: ensureValidCityAQI(fallback, fallback),
      source: "fallback",
      message: error instanceof Error ? error.message : "AQI unavailable",
    };
  }
}

export async function getUnifiedCitiesAirQuality(cities: string[]) {
  return Promise.all(cities.map((city) => getUnifiedCityAirQuality(city)));
}

export async function getUnifiedForecast(city: string): Promise<ForecastPoint[]> {
  const meta = getCityMeta(city);

  if (!meta) {
    throw new Error(`Unsupported forecast city: ${city}`);
  }

  const hourly = await getAQIForecast(meta.lat, meta.lng);

  if (!hourly?.time?.length) {
    return [];
  }

  const startIndex = getHourlyStartIndex(hourly.time);

  return hourly.time.slice(startIndex, startIndex + 24).map((time: string, offset: number) => {
    const index = startIndex + offset;

    return {
      time,
      pm25: toFiniteNumber(hourly.pm2_5?.[index], 0),
      pm10: toFiniteNumber(hourly.pm10?.[index], 0),
      co: toFiniteNumber(hourly.carbon_monoxide?.[index], 0),
      no2: toFiniteNumber(hourly.nitrogen_dioxide?.[index], 0),
      so2: toFiniteNumber(hourly.sulphur_dioxide?.[index], 0),
      o3: toFiniteNumber(hourly.ozone?.[index], 0),
      uvIndex: toFiniteNumber(hourly.uv_index?.[index], 0),
    };
  });
}
