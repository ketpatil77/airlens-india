export type { CityAQI, AQIStatus } from "@/data/aqi-data";
export type { CityMeta } from "@/data/cities";

export interface NavItem {
  label: string;
  href: string;
}

export interface StatCard {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}
