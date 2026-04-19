import useSWR from "swr";
import { getUnifiedCitiesAirQuality, getUnifiedCityAirQuality, getUnifiedForecast } from "@/api/airlensApi";

const FIVE_MINUTES = 5 * 60 * 1000;

const swrConfig = {
  dedupingInterval: FIVE_MINUTES,
  focusThrottleInterval: FIVE_MINUTES,
  revalidateOnFocus: false,
  revalidateIfStale: false,
  refreshInterval: FIVE_MINUTES,
};

export function useAirQuality(city: string) {
  const { data, error, isLoading } = useSWR(["air-quality", city], () => getUnifiedCityAirQuality(city), swrConfig);
  return {
    data: data?.city ?? null,
    source: data?.source ?? "fallback",
    message: data?.message,
    error,
    isLoading,
  };
}

export function useCitiesAirQuality(cities: string[]) {
  const key = ["air-quality-cities", ...cities];
  const { data, error, isLoading } = useSWR(key, () => getUnifiedCitiesAirQuality(cities), swrConfig);

  return {
    data: data?.map((entry) => entry.city) ?? null,
    messages: data?.filter((entry) => entry.message).map((entry) => entry.message as string) ?? [],
    error,
    isLoading,
  };
}

export function useAirQualityForecast(city: string) {
  const { data, error, isLoading } = useSWR(["air-quality-forecast", city], () => getUnifiedForecast(city), swrConfig);
  return {
    data: data ?? [],
    error,
    isLoading,
  };
}
