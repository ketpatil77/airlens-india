export type AQILabel =
  | "Good"
  | "Satisfactory"
  | "Moderate"
  | "Poor"
  | "Very Poor"
  | "Severe";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface CityMeta {
  id: string;
  name: string;
  state: string;
  coordinates: Coordinates;
  populationMillions: number;
}

export interface CityAQI {
  cityId: string;
  city: string;
  aqi: number;
  label: AQILabel;
  pm25: number;
  pm10: number;
  trend: "rising" | "falling" | "stable";
}

export interface StateAQI {
  state: string;
  aqi: number;
  label: AQILabel;
}

export interface PollutantValue {
  pollutant: "PM2.5" | "PM10" | "NO2" | "SO2" | "CO" | "O3";
  value: number;
}

export interface CityDashboardData extends CityAQI {
  hourly: number[];
  pollutants: PollutantValue[];
}
