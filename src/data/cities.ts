export interface CityMeta {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  iata: string;
  population: number;
}

export const CITIES: CityMeta[] = [
  { id: "delhi",              name: "Delhi",              state: "Delhi",             lat: 28.6139, lng: 77.2090,  iata: "DEL", population: 31_000_000 },
  { id: "mumbai",             name: "Mumbai",             state: "Maharashtra",       lat: 19.0760, lng: 72.8777,  iata: "BOM", population: 20_700_000 },
  { id: "kolkata",            name: "Kolkata",            state: "West Bengal",       lat: 22.5726, lng: 88.3639,  iata: "CCU", population: 14_800_000 },
  { id: "bengaluru",          name: "Bengaluru",          state: "Karnataka",         lat: 12.9716, lng: 77.5946,  iata: "BLR", population: 12_500_000 },
  { id: "chennai",            name: "Chennai",            state: "Tamil Nadu",        lat: 13.0827, lng: 80.2707,  iata: "MAA", population: 10_900_000 },
  { id: "hyderabad",          name: "Hyderabad",          state: "Telangana",         lat: 17.3850, lng: 78.4867,  iata: "HYD", population: 10_500_000 },
  { id: "ahmedabad",          name: "Ahmedabad",          state: "Gujarat",           lat: 23.0225, lng: 72.5714,  iata: "AMD", population:  8_300_000 },
  { id: "pune",               name: "Pune",               state: "Maharashtra",       lat: 18.5204, lng: 73.8567,  iata: "PNQ", population:  7_400_000 },
  { id: "kanpur",             name: "Kanpur",             state: "Uttar Pradesh",     lat: 26.4499, lng: 80.3319,  iata: "KNU", population:  3_100_000 },
  { id: "patna",              name: "Patna",              state: "Bihar",             lat: 25.5941, lng: 85.1376,  iata: "PAT", population:  2_100_000 },
  { id: "faridabad",          name: "Faridabad",          state: "Haryana",           lat: 28.4089, lng: 77.3178,  iata: "-",   population:  1_900_000 },
  { id: "gurugram",           name: "Gurugram",           state: "Haryana",           lat: 28.4595, lng: 77.0266,  iata: "-",   population:  1_200_000 },
  { id: "agra",               name: "Agra",               state: "Uttar Pradesh",     lat: 27.1767, lng: 78.0081,  iata: "AGR", population:  1_800_000 },
  { id: "lucknow",            name: "Lucknow",            state: "Uttar Pradesh",     lat: 26.8467, lng: 80.9462,  iata: "LKO", population:  3_700_000 },
  { id: "jaipur",             name: "Jaipur",             state: "Rajasthan",         lat: 26.9124, lng: 75.7873,  iata: "JAI", population:  4_100_000 },
  // ── NEW (U1 Expansion) ───────────────────────────────────────────────────
  { id: "bhopal",             name: "Bhopal",             state: "Madhya Pradesh",    lat: 23.2599, lng: 77.4126,  iata: "BHO", population:  1_880_000 },
  { id: "surat",              name: "Surat",              state: "Gujarat",           lat: 21.1702, lng: 72.8311,  iata: "STV", population:  6_100_000 },
  { id: "nagpur",             name: "Nagpur",             state: "Maharashtra",       lat: 21.1458, lng: 79.0882,  iata: "NAG", population:  2_500_000 },
  { id: "varanasi",           name: "Varanasi",           state: "Uttar Pradesh",     lat: 25.3176, lng: 82.9739,  iata: "VNS", population:  1_200_000 },
  { id: "coimbatore",         name: "Coimbatore",         state: "Tamil Nadu",        lat: 11.0168, lng: 76.9558,  iata: "CJB", population:  2_100_000 },
  { id: "indore",             name: "Indore",             state: "Madhya Pradesh",    lat: 22.7196, lng: 75.8577,  iata: "IDR", population:  3_300_000 },
  { id: "thane",              name: "Thane",              state: "Maharashtra",       lat: 19.2183, lng: 72.9781,  iata: "-",   population:  2_400_000 },
  { id: "bhubaneswar",        name: "Bhubaneswar",        state: "Odisha",            lat: 20.2961, lng: 85.8245,  iata: "BBI", population:  1_000_000 },
  { id: "amritsar",           name: "Amritsar",           state: "Punjab",            lat: 31.6340, lng: 74.8723,  iata: "ATQ", population:  1_100_000 },
  { id: "vijayawada",         name: "Vijayawada",         state: "Andhra Pradesh",    lat: 16.5062, lng: 80.6480,  iata: "VGA", population:  1_500_000 },
  { id: "visakhapatnam",      name: "Visakhapatnam",      state: "Andhra Pradesh",    lat: 17.6868, lng: 83.2185,  iata: "VTZ", population:  2_100_000 },
  { id: "chandigarh",         name: "Chandigarh",         state: "Chandigarh UT",     lat: 30.7333, lng: 76.7794,  iata: "IXC", population:  1_050_000 },
  { id: "thiruvananthapuram", name: "Thiruvananthapuram", state: "Kerala",            lat:  8.5241, lng: 76.9366,  iata: "TRV", population:  1_000_000 },
  { id: "kochi",              name: "Kochi",              state: "Kerala",            lat:  9.9312, lng: 76.2673,  iata: "COK", population:  2_100_000 },
  { id: "guwahati",           name: "Guwahati",           state: "Assam",             lat: 26.1445, lng: 91.7362,  iata: "GAU", population:    960_000 },
  { id: "ranchi",             name: "Ranchi",             state: "Jharkhand",         lat: 23.3441, lng: 85.3096,  iata: "IXR", population:  1_100_000 },
  { id: "raipur",             name: "Raipur",             state: "Chhattisgarh",      lat: 21.2514, lng: 81.6296,  iata: "RPR", population:  1_000_000 },
  { id: "jodhpur",            name: "Jodhpur",            state: "Rajasthan",         lat: 26.2389, lng: 73.0243,  iata: "JDH", population:  1_500_000 },
  { id: "meerut",             name: "Meerut",             state: "Uttar Pradesh",     lat: 28.9845, lng: 77.7064,  iata: "-",   population:  1_400_000 },
  { id: "ghaziabad",          name: "Ghaziabad",          state: "Uttar Pradesh",     lat: 28.6692, lng: 77.4538,  iata: "-",   population:  1_600_000 },
];

