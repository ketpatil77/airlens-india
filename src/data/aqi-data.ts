import type { AQILabel, CityAQI, CityDashboardData, StateAQI } from "@/types";

export const AQI_SCALE = [
  { min: 0, max: 50, label: "Good" as const, color: "#27AE60" },
  { min: 51, max: 100, label: "Satisfactory" as const, color: "#A8D08D" },
  { min: 101, max: 200, label: "Moderate" as const, color: "#F39C12" },
  { min: 201, max: 300, label: "Poor" as const, color: "#E67E22" },
  { min: 301, max: 400, label: "Very Poor" as const, color: "#FF6B35" },
  { min: 401, max: 500, label: "Severe" as const, color: "#C0392B" },
];

export const getAQILabel = (value: number): AQILabel => {
  const matched = AQI_SCALE.find((item) => value >= item.min && value <= item.max);
  return matched?.label ?? "Severe";
};

export const getAQIColor = (value: number): string => {
  const matched = AQI_SCALE.find((item) => value >= item.min && value <= item.max);
  return matched?.color ?? "#C0392B";
};

export const liveDelhiAQI = {
  city: "Delhi",
  value: 287,
  label: getAQILabel(287),
};

export const marqueeCities: CityAQI[] = [
  { cityId: "delhi", city: "Delhi", aqi: 287, label: "Poor", pm25: 164, pm10: 241, trend: "rising" },
  { cityId: "kanpur", city: "Kanpur", aqi: 312, label: "Very Poor", pm25: 188, pm10: 279, trend: "rising" },
  { cityId: "patna", city: "Patna", aqi: 334, label: "Very Poor", pm25: 201, pm10: 301, trend: "rising" },
  { cityId: "lucknow", city: "Lucknow", aqi: 278, label: "Poor", pm25: 159, pm10: 238, trend: "stable" },
  { cityId: "agra", city: "Agra", aqi: 295, label: "Poor", pm25: 171, pm10: 247, trend: "rising" },
  { cityId: "varanasi", city: "Varanasi", aqi: 282, label: "Poor", pm25: 168, pm10: 251, trend: "stable" },
  { cityId: "gwalior", city: "Gwalior", aqi: 301, label: "Very Poor", pm25: 176, pm10: 258, trend: "rising" },
  { cityId: "jaipur", city: "Jaipur", aqi: 232, label: "Poor", pm25: 136, pm10: 211, trend: "falling" },
  { cityId: "mumbai", city: "Mumbai", aqi: 142, label: "Moderate", pm25: 86, pm10: 131, trend: "stable" },
  { cityId: "kolkata", city: "Kolkata", aqi: 196, label: "Moderate", pm25: 110, pm10: 169, trend: "rising" },
  { cityId: "bengaluru", city: "Bengaluru", aqi: 89, label: "Satisfactory", pm25: 48, pm10: 72, trend: "falling" },
  { cityId: "chennai", city: "Chennai", aqi: 102, label: "Moderate", pm25: 58, pm10: 85, trend: "stable" },
  { cityId: "hyderabad", city: "Hyderabad", aqi: 117, label: "Moderate", pm25: 67, pm10: 98, trend: "rising" },
  { cityId: "pune", city: "Pune", aqi: 95, label: "Satisfactory", pm25: 54, pm10: 79, trend: "stable" },
  { cityId: "ahmedabad", city: "Ahmedabad", aqi: 181, label: "Moderate", pm25: 101, pm10: 154, trend: "rising" },
];

export const topTenPolluted = [...marqueeCities]
  .sort((a, b) => b.aqi - a.aqi)
  .slice(0, 10);

export const stateAqiData: StateAQI[] = [
  { state: "Delhi", aqi: 287, label: getAQILabel(287) },
  { state: "Uttar Pradesh", aqi: 294, label: getAQILabel(294) },
  { state: "Bihar", aqi: 301, label: getAQILabel(301) },
  { state: "Maharashtra", aqi: 176, label: getAQILabel(176) },
  { state: "West Bengal", aqi: 196, label: getAQILabel(196) },
  { state: "Karnataka", aqi: 89, label: getAQILabel(89) },
  { state: "Tamil Nadu", aqi: 102, label: getAQILabel(102) },
  { state: "Telangana", aqi: 117, label: getAQILabel(117) },
  { state: "Gujarat", aqi: 181, label: getAQILabel(181) },
  { state: "Rajasthan", aqi: 232, label: getAQILabel(232) },
  { state: "Madhya Pradesh", aqi: 213, label: getAQILabel(213) },
  { state: "Haryana", aqi: 248, label: getAQILabel(248) },
  { state: "Punjab", aqi: 205, label: getAQILabel(205) },
  { state: "Jharkhand", aqi: 187, label: getAQILabel(187) },
  { state: "Odisha", aqi: 153, label: getAQILabel(153) },
  { state: "Andhra Pradesh", aqi: 122, label: getAQILabel(122) },
  { state: "Kerala", aqi: 74, label: getAQILabel(74) },
  { state: "Goa", aqi: 68, label: getAQILabel(68) },
  { state: "Chhattisgarh", aqi: 159, label: getAQILabel(159) },
  { state: "Assam", aqi: 141, label: getAQILabel(141) },
];

const HOURS = [
  "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11",
  "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
];

export const hourlyLabels = HOURS;

export const cityDashboardData: Record<string, CityDashboardData> = {
  delhi: {
    cityId: "delhi",
    city: "Delhi",
    aqi: 287,
    label: "Poor",
    pm25: 164,
    pm10: 241,
    trend: "rising",
    hourly: [241, 233, 225, 218, 213, 220, 236, 252, 271, 281, 289, 294, 297, 301, 299, 296, 290, 284, 281, 285, 288, 287, 286, 287],
    pollutants: [
      { pollutant: "PM2.5", value: 164 },
      { pollutant: "PM10", value: 241 },
      { pollutant: "NO2", value: 67 },
      { pollutant: "SO2", value: 24 },
      { pollutant: "CO", value: 46 },
      { pollutant: "O3", value: 58 },
    ],
  },
  mumbai: {
    cityId: "mumbai",
    city: "Mumbai",
    aqi: 142,
    label: "Moderate",
    pm25: 86,
    pm10: 131,
    trend: "stable",
    hourly: [133, 129, 124, 121, 119, 122, 130, 136, 141, 144, 145, 147, 149, 148, 146, 145, 144, 143, 142, 141, 142, 142, 142, 142],
    pollutants: [
      { pollutant: "PM2.5", value: 86 },
      { pollutant: "PM10", value: 131 },
      { pollutant: "NO2", value: 42 },
      { pollutant: "SO2", value: 18 },
      { pollutant: "CO", value: 38 },
      { pollutant: "O3", value: 47 },
    ],
  },
  kolkata: {
    cityId: "kolkata",
    city: "Kolkata",
    aqi: 196,
    label: "Moderate",
    pm25: 110,
    pm10: 169,
    trend: "rising",
    hourly: [168, 164, 160, 159, 157, 161, 170, 180, 189, 195, 198, 200, 203, 205, 204, 202, 199, 198, 197, 196, 196, 196, 196, 196],
    pollutants: [
      { pollutant: "PM2.5", value: 110 },
      { pollutant: "PM10", value: 169 },
      { pollutant: "NO2", value: 55 },
      { pollutant: "SO2", value: 21 },
      { pollutant: "CO", value: 41 },
      { pollutant: "O3", value: 53 },
    ],
  },
  bengaluru: {
    cityId: "bengaluru",
    city: "Bengaluru",
    aqi: 89,
    label: "Satisfactory",
    pm25: 48,
    pm10: 72,
    trend: "falling",
    hourly: [103, 100, 98, 95, 94, 93, 95, 98, 101, 99, 96, 94, 91, 90, 89, 88, 88, 87, 88, 89, 90, 89, 89, 89],
    pollutants: [
      { pollutant: "PM2.5", value: 48 },
      { pollutant: "PM10", value: 72 },
      { pollutant: "NO2", value: 31 },
      { pollutant: "SO2", value: 12 },
      { pollutant: "CO", value: 24 },
      { pollutant: "O3", value: 34 },
    ],
  },
  chennai: {
    cityId: "chennai",
    city: "Chennai",
    aqi: 102,
    label: "Moderate",
    pm25: 58,
    pm10: 85,
    trend: "stable",
    hourly: [92, 90, 88, 87, 87, 89, 93, 97, 101, 104, 106, 108, 109, 108, 106, 105, 104, 103, 102, 101, 101, 102, 102, 102],
    pollutants: [
      { pollutant: "PM2.5", value: 58 },
      { pollutant: "PM10", value: 85 },
      { pollutant: "NO2", value: 35 },
      { pollutant: "SO2", value: 14 },
      { pollutant: "CO", value: 27 },
      { pollutant: "O3", value: 39 },
    ],
  },
};

export const comparisonCities = ["delhi", "mumbai", "kolkata", "bengaluru", "chennai"] as const;
