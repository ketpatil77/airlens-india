export type AQIStatus =
  | "Good"
  | "Satisfactory"
  | "Moderate"
  | "Poor"
  | "Very Poor"
  | "Severe";

export function getAQIStatus(aqi: number): AQIStatus {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  return "Severe";
}

export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return "#27AE60";
  if (aqi <= 100) return "#A8D08D";
  if (aqi <= 200) return "#F39C12";
  if (aqi <= 300) return "#E67E22";
  if (aqi <= 400) return "#FF6B35";
  return "#C0392B";
}

export interface CityAQI {
  city: string;
  state: string;
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  trend: "up" | "down" | "stable";
  trendPct: number;
  lat: number;
  lng: number;
}

export const cityAQIData: CityAQI[] = [
  {
    city: "Delhi",
    state: "Delhi",
    aqi: 287,
    pm25: 156,
    pm10: 234,
    no2: 78,
    so2: 23,
    co: 1.2,
    o3: 45,
    trend: "up",
    trendPct: 12,
    lat: 28.6139,
    lng: 77.209,
  },
  {
    city: "Kanpur",
    state: "Uttar Pradesh",
    aqi: 312,
    pm25: 178,
    pm10: 267,
    no2: 89,
    so2: 34,
    co: 1.8,
    o3: 38,
    trend: "up",
    trendPct: 18,
    lat: 26.4499,
    lng: 80.3319,
  },
  {
    city: "Patna",
    state: "Bihar",
    aqi: 334,
    pm25: 198,
    pm10: 289,
    no2: 92,
    so2: 41,
    co: 2.1,
    o3: 31,
    trend: "up",
    trendPct: 22,
    lat: 25.5941,
    lng: 85.1376,
  },
  {
    city: "Faridabad",
    state: "Haryana",
    aqi: 298,
    pm25: 167,
    pm10: 256,
    no2: 84,
    so2: 29,
    co: 1.6,
    o3: 42,
    trend: "up",
    trendPct: 15,
    lat: 28.4089,
    lng: 77.3178,
  },
  {
    city: "Gurugram",
    state: "Haryana",
    aqi: 276,
    pm25: 154,
    pm10: 243,
    no2: 81,
    so2: 27,
    co: 1.4,
    o3: 44,
    trend: "up",
    trendPct: 10,
    lat: 28.4595,
    lng: 77.0266,
  },
  {
    city: "Agra",
    state: "Uttar Pradesh",
    aqi: 267,
    pm25: 148,
    pm10: 238,
    no2: 76,
    so2: 25,
    co: 1.3,
    o3: 47,
    trend: "stable",
    trendPct: 2,
    lat: 27.1767,
    lng: 78.0081,
  },
  {
    city: "Lucknow",
    state: "Uttar Pradesh",
    aqi: 243,
    pm25: 134,
    pm10: 224,
    no2: 72,
    so2: 22,
    co: 1.1,
    o3: 49,
    trend: "up",
    trendPct: 8,
    lat: 26.8467,
    lng: 80.9462,
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    aqi: 156,
    pm25: 89,
    pm10: 167,
    no2: 56,
    so2: 14,
    co: 0.8,
    o3: 58,
    trend: "down",
    trendPct: 4,
    lat: 19.076,
    lng: 72.8777,
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    aqi: 198,
    pm25: 112,
    pm10: 198,
    no2: 67,
    so2: 19,
    co: 1,
    o3: 52,
    trend: "up",
    trendPct: 6,
    lat: 22.5726,
    lng: 88.3639,
  },
  {
    city: "Ahmedabad",
    state: "Gujarat",
    aqi: 211,
    pm25: 118,
    pm10: 207,
    no2: 69,
    so2: 21,
    co: 1.1,
    o3: 50,
    trend: "stable",
    trendPct: 1,
    lat: 23.0225,
    lng: 72.5714,
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    aqi: 134,
    pm25: 72,
    pm10: 143,
    no2: 48,
    so2: 12,
    co: 0.6,
    o3: 62,
    trend: "down",
    trendPct: 3,
    lat: 17.385,
    lng: 78.4867,
  },
  {
    city: "Bengaluru",
    state: "Karnataka",
    aqi: 67,
    pm25: 34,
    pm10: 78,
    no2: 32,
    so2: 8,
    co: 0.4,
    o3: 71,
    trend: "down",
    trendPct: 6,
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    aqi: 89,
    pm25: 48,
    pm10: 97,
    no2: 39,
    so2: 10,
    co: 0.5,
    o3: 67,
    trend: "stable",
    trendPct: 2,
    lat: 13.0827,
    lng: 80.2707,
  },
  {
    city: "Jaipur",
    state: "Rajasthan",
    aqi: 189,
    pm25: 104,
    pm10: 188,
    no2: 63,
    so2: 18,
    co: 0.9,
    o3: 54,
    trend: "up",
    trendPct: 7,
    lat: 26.9124,
    lng: 75.7873,
  },
  {
    city: "Pune",
    state: "Maharashtra",
    aqi: 112,
    pm25: 61,
    pm10: 118,
    no2: 43,
    so2: 11,
    co: 0.6,
    o3: 65,
    trend: "down",
    trendPct: 2,
    lat: 18.5204,
    lng: 73.8567,
  },
  // ── NEW CITIES (U1 Expansion — 20 added) ──────────────────────────────────
  { city: "Bhopal",       state: "Madhya Pradesh",  aqi: 178, pm25: 96,  pm10: 183, no2: 58, so2: 16, co: 0.9, o3: 54, trend: "up",     trendPct: 5,  lat: 23.2599, lng: 77.4126 },
  { city: "Surat",        state: "Gujarat",          aqi: 167, pm25: 91,  pm10: 174, no2: 54, so2: 15, co: 0.8, o3: 56, trend: "stable", trendPct: 1,  lat: 21.1702, lng: 72.8311 },
  { city: "Nagpur",       state: "Maharashtra",      aqi: 156, pm25: 84,  pm10: 162, no2: 51, so2: 14, co: 0.7, o3: 58, trend: "down",   trendPct: 3,  lat: 21.1458, lng: 79.0882 },
  { city: "Varanasi",     state: "Uttar Pradesh",    aqi: 267, pm25: 147, pm10: 254, no2: 79, so2: 24, co: 1.3, o3: 46, trend: "up",     trendPct: 9,  lat: 25.3176, lng: 82.9739 },
  { city: "Coimbatore",   state: "Tamil Nadu",       aqi: 78,  pm25: 41,  pm10: 84,  no2: 35, so2: 9,  co: 0.4, o3: 69, trend: "down",   trendPct: 2,  lat: 11.0168, lng: 76.9558 },
  { city: "Indore",       state: "Madhya Pradesh",   aqi: 189, pm25: 103, pm10: 192, no2: 62, so2: 18, co: 1.0, o3: 52, trend: "up",     trendPct: 6,  lat: 22.7196, lng: 75.8577 },
  { city: "Thane",        state: "Maharashtra",      aqi: 143, pm25: 78,  pm10: 151, no2: 49, so2: 13, co: 0.7, o3: 60, trend: "stable", trendPct: 1,  lat: 19.2183, lng: 72.9781 },
  { city: "Bhubaneswar",  state: "Odisha",           aqi: 134, pm25: 72,  pm10: 139, no2: 46, so2: 12, co: 0.6, o3: 62, trend: "down",   trendPct: 2,  lat: 20.2961, lng: 85.8245 },
  { city: "Amritsar",     state: "Punjab",           aqi: 221, pm25: 122, pm10: 214, no2: 68, so2: 20, co: 1.1, o3: 50, trend: "up",     trendPct: 11, lat: 31.634,  lng: 74.8723 },
  { city: "Vijayawada",   state: "Andhra Pradesh",   aqi: 112, pm25: 60,  pm10: 117, no2: 42, so2: 11, co: 0.6, o3: 64, trend: "stable", trendPct: 2,  lat: 16.5062, lng: 80.648  },
  { city: "Visakhapatnam",state: "Andhra Pradesh",   aqi: 123, pm25: 66,  pm10: 128, no2: 44, so2: 12, co: 0.7, o3: 62, trend: "up",     trendPct: 3,  lat: 17.6868, lng: 83.2185 },
  { city: "Chandigarh",   state: "Chandigarh UT",    aqi: 198, pm25: 109, pm10: 201, no2: 64, so2: 19, co: 1.0, o3: 51, trend: "up",     trendPct: 7,  lat: 30.7333, lng: 76.7794 },
  { city: "Thiruvananthapuram", state: "Kerala",     aqi: 54,  pm25: 28,  pm10: 58,  no2: 26, so2: 7,  co: 0.3, o3: 74, trend: "down",   trendPct: 1,  lat: 8.5241,  lng: 76.9366 },
  { city: "Kochi",        state: "Kerala",           aqi: 67,  pm25: 35,  pm10: 71,  no2: 31, so2: 8,  co: 0.4, o3: 71, trend: "down",   trendPct: 2,  lat: 9.9312,  lng: 76.2673 },
  { city: "Guwahati",     state: "Assam",            aqi: 145, pm25: 79,  pm10: 152, no2: 49, so2: 13, co: 0.8, o3: 59, trend: "up",     trendPct: 5,  lat: 26.1445, lng: 91.7362 },
  { city: "Ranchi",       state: "Jharkhand",        aqi: 167, pm25: 91,  pm10: 174, no2: 55, so2: 15, co: 0.9, o3: 56, trend: "stable", trendPct: 2,  lat: 23.3441, lng: 85.3096 },
  { city: "Raipur",       state: "Chhattisgarh",     aqi: 189, pm25: 104, pm10: 194, no2: 61, so2: 18, co: 1.0, o3: 53, trend: "up",     trendPct: 7,  lat: 21.2514, lng: 81.6296 },
  { city: "Jodhpur",      state: "Rajasthan",        aqi: 201, pm25: 111, pm10: 207, no2: 65, so2: 19, co: 1.0, o3: 51, trend: "up",     trendPct: 8,  lat: 26.2389, lng: 73.0243 },
  { city: "Meerut",       state: "Uttar Pradesh",    aqi: 256, pm25: 141, pm10: 248, no2: 77, so2: 23, co: 1.3, o3: 47, trend: "up",     trendPct: 10, lat: 28.9845, lng: 77.7064 },
  { city: "Ghaziabad",    state: "Uttar Pradesh",    aqi: 278, pm25: 153, pm10: 269, no2: 82, so2: 26, co: 1.4, o3: 45, trend: "up",     trendPct: 13, lat: 28.6692, lng: 77.4538 },
];

export const hourlyAQI: Record<string, number[]> = {
  Delhi: [
    312, 298, 287, 276, 264, 258, 243, 234, 245, 267, 287, 298, 301, 289, 276,
    268, 274, 289, 301, 312, 298, 287, 276, 264,
  ],
  Mumbai: [
    143, 138, 134, 129, 124, 121, 118, 122, 131, 142, 156, 163, 167, 162, 158,
    154, 156, 161, 167, 172, 165, 158, 152, 147,
  ],
  Kolkata: [
    187, 181, 176, 172, 167, 163, 158, 162, 172, 183, 198, 207, 211, 205, 198,
    193, 196, 205, 214, 221, 212, 204, 198, 191,
  ],
  Bengaluru: [
    62, 59, 56, 53, 51, 49, 47, 51, 57, 62, 67, 71, 73, 71, 68, 65, 66, 69, 73,
    75, 72, 69, 66, 63,
  ],
  Chennai: [
    84, 81, 78, 76, 73, 71, 68, 72, 79, 84, 89, 94, 96, 93, 90, 87, 88, 92, 96,
    98, 94, 91, 88, 85,
  ],
};

export const annualTrend: Record<string, number[]> = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  Delhi: [312, 298, 334, 356, 389, 201, 287, 301, 318, 287],
  Mumbai: [142, 156, 167, 178, 189, 98, 134, 145, 151, 156],
  Kolkata: [187, 198, 211, 223, 234, 112, 178, 189, 196, 198],
  Bengaluru: [78, 72, 69, 67, 71, 45, 62, 65, 67, 67],
  Kanpur: [267, 278, 298, 312, 334, 167, 256, 278, 298, 312],
};

export const monthlyDelhi = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  aqi: [312, 278, 234, 189, 156, 134, 112, 98, 145, 356, 378, 334],
};

/**
 * Type-safe pollutant value getter
 * Eliminates need for `as any` casts throughout the codebase
 */
export function getPollutantValue(city: CityAQI, pollutant: string): number {
  const key = pollutant.toLowerCase().replace(".", "");
  switch (key) {
    case "aqi":
      return city.aqi;
    case "pm25":
      return city.pm25;
    case "pm10":
      return city.pm10;
    case "no2":
      return city.no2;
    case "so2":
      return city.so2;
    case "co":
      return city.co;
    case "o3":
      return city.o3;
    default:
      return 0;
  }
}
