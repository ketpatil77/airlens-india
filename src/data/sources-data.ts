export interface PollutionSource {
  id: string;
  name: string;
  icon: string;
  category: string;
  categoryColor: string;
  contributionPct: number;
  description: string;
  detail: string;
  affectedCities: string[];
  aqiTrigger: string;
}

export const pollutionSources: PollutionSource[] = [
  {
    id: "industrial",
    name: "Industrial Emissions",
    icon: "Factory",
    category: "INDUSTRY",
    categoryColor: "#FF6B35",
    contributionPct: 34,
    description:
      "Thermal power plants, factories, and industrial zones release SO₂, NOₓ, and particulate matter continuously into the atmosphere.",
    detail:
      "Coal-based power plants alone account for nearly 60% of industrial air pollution, operating 24/7 with minimal filtration in older facilities.",
    affectedCities: ["Kanpur", "Ahmedabad", "Ludhiana", "Surat", "Korba"],
    aqiTrigger: "Contributes year-round. Spikes during winter inversions.",
  },
  {
    id: "vehicles",
    name: "Vehicle Exhaust",
    icon: "Car",
    category: "TRANSPORT",
    categoryColor: "#E67E22",
    contributionPct: 28,
    description:
      "Over 300 million vehicles on Indian roads emit PM2.5, NO₂, and CO directly at breathing level in the densest urban corridors.",
    detail:
      "Two-wheelers and older diesel trucks contribute disproportionately - a single BS-II truck emits as much particulate matter as 50 modern passenger cars.",
    affectedCities: ["Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai"],
    aqiTrigger: "Rush hours: 8-10am and 6-9pm. Worst in winter fog.",
  },
  {
    id: "crop",
    name: "Crop Residue Burning",
    icon: "Flame",
    category: "SEASONAL",
    categoryColor: "#C0392B",
    contributionPct: 17,
    description:
      "October-November crop residue burning in Punjab and Haryana blankets North India in toxic smog for weeks every harvest season.",
    detail:
      "In peak burning days, satellite imagery shows over 70,000 fire hotspots across Punjab alone - each adding directly to Delhi's AQI.",
    affectedCities: ["Delhi", "Chandigarh", "Amritsar", "Ludhiana", "Ambala"],
    aqiTrigger: "Seasonal: October 15 - November 30 annually.",
  },
  {
    id: "construction",
    name: "Construction Dust",
    icon: "HardHat",
    category: "URBAN GROWTH",
    categoryColor: "#F39C12",
    contributionPct: 11,
    description:
      "Rapid urbanization generates coarse PM10 particles that settle deep in lungs, causing chronic respiratory disease in construction workers and nearby residents.",
    detail:
      "India is the world's fastest-growing construction market - with 700+ million sq. ft. under construction, dust suppression compliance remains under 30%.",
    affectedCities: ["Delhi", "Gurugram", "Noida", "Hyderabad", "Pune"],
    aqiTrigger: "Year-round. Peaks in dry season: February-June.",
  },
  {
    id: "waste",
    name: "Waste Burning",
    icon: "Trash2",
    category: "WASTE",
    categoryColor: "#7D8590",
    contributionPct: 6,
    description:
      "Open burning of municipal solid waste releases dioxins, furans, and fine particulates - especially dangerous in winter months when smoke stays low.",
    detail:
      "Only 22% of India's municipal solid waste is formally processed. The remainder is often dumped and burned in open sites near residential areas.",
    affectedCities: ["Delhi", "Kolkata", "Patna", "Lucknow", "Varanasi"],
    aqiTrigger: "Year-round. Intensifies October-February.",
  },
  {
    id: "weather",
    name: "Weather & Geography",
    icon: "Wind",
    category: "AMPLIFIER",
    categoryColor: "#58A6FF",
    contributionPct: 4,
    description:
      "Temperature inversions, low wind speed, and bowl-shaped topography trap pollutants at ground level - turning moderate pollution into a health emergency overnight.",
    detail:
      "Delhi sits in the Indo-Gangetic Plain surrounded by the Himalayas to the north. Cold winter air creates a lid that locks pollution below 500 metres.",
    affectedCities: ["Delhi", "Kolkata", "Patna", "Lucknow", "Kanpur"],
    aqiTrigger: "Winter: November-February. Fog + cold = maximum trapping.",
  },
];
