import type { Feature, Geometry } from "geojson";
import { scaleLinear } from "d3-scale";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { getAQIColor, getAQIStatus, getPollutantValue, type CityAQI } from "@/data/aqi-data";
import { CityMarker } from "@/components/maps/CityMarker";
import { useDashboardStore } from "@/hooks/useDashboardStore";
import { useMemo } from "react"; // Added useMemo import

const geoUrl = "/india-states.json";

type GeoProperties = {
  NAME_1?: string;
  st_nm?: string;
};

// U9 — Pollutant Specific Scales
const SCALES = {
  AQI: scaleLinear<string>()
    .domain([0, 100, 200, 300, 400, 500])
    .range(["#27AE60", "#F39C12", "#E67E22", "#FF6B35", "#C0392B", "#8B0000"]),
  "PM2.5": scaleLinear<string>()
    .domain([0, 30, 60, 90, 120, 250])
    .range(["#D1C4E9", "#9575CD", "#673AB7", "#E91E63", "#C2185B", "#880E4F"]), // Purple to Red/Pink
  PM10: scaleLinear<string>()
    .domain([0, 50, 100, 250, 350, 430])
    .range(["#B2EBF2", "#4DD0E1", "#00ACC1", "#FB8C00", "#F4511E", "#BF360C"]), // Cyan to Orange
  NO2: scaleLinear<string>()
    .domain([0, 40, 80, 180, 280, 400])
    .range(["#C8E6C9", "#81C784", "#4CAF50", "#FFEB3B", "#FBC02D", "#F57F17"]), // Green to Yellow
  O3: scaleLinear<string>()
    .domain([0, 50, 100, 168, 208, 748])
    .range(["#E8F5E9", "#A5D6A7", "#43A047", "#FFB300", "#FB8C00", "#E65100"]), // Green to Orange
};

const aliasMap: Record<string, string> = {
  "Andaman and Nicobar Islands": "Andaman and Nicobar",
  "Dadra and Nagar Haveli and Daman and Diu": "Dadra and Nagar Haveli",
  Orissa: "Odisha",
  Pondicherry: "Puducherry",
  Uttaranchal: "Uttarakhand",
};

interface IndiaMapProps {
  cityData: CityAQI[];
  inView?: boolean;
  activePollutant: string;
  onCityClick?: (city: string) => void;
}

export function IndiaMap({ cityData, inView = false, activePollutant, onCityClick }: IndiaMapProps) {
  const { hoveredCity, setHoveredCity } = useDashboardStore();

  const stateValuesMap = useMemo(() => {
    return cityData.reduce<Record<string, number>>((acc, city) => {
      const val = getPollutantValue(city, activePollutant);
      const current = acc[city.state];
      acc[city.state] = current ? Math.max(current, val) : val;
      return acc;
    }, {});
  }, [cityData, activePollutant]);

  const currentScale = (SCALES as Record<string, ReturnType<typeof scaleLinear<string>>>)[activePollutant] || SCALES.AQI;

  const hoveredCityData = useMemo(() => {
    return cityData.find(c => c.city === hoveredCity);
  }, [cityData, hoveredCity]);

  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-hazard/15 bg-surface/40 backdrop-blur-sm p-4">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [80, 22.5], scale: 1100 }}
        width={800}
        height={800}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: Array<Feature<Geometry, GeoProperties>> }) =>
            geographies.map((geo: Feature<Geometry, GeoProperties>) => {
              const rawName = String(geo.properties.st_nm ?? geo.properties.NAME_1 ?? "Unknown");
              const mappedName = aliasMap[rawName] ?? rawName;
              const value = stateValuesMap[mappedName] ?? (activePollutant === "AQI" ? 150 : 30);

              return (
                <Geography
                  key={String(geo.id ?? rawName)}
                  geography={geo}
                  fill={inView ? currentScale(value) : "#1A1F2E"}
                  stroke="#0D1117"
                  strokeWidth={0.8}
                  style={{
                    default: { outline: "none", transition: "fill 400ms ease" },
                    hover: { fill: currentScale(value * 1.1), outline: "none", transition: "fill 200ms ease" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {cityData.map((city, index) => {
          const val = getPollutantValue(city, activePollutant);
          return (
            <CityMarker
              key={city.city}
              cityIndex={index}
              cityName={city.city}
              city={city}
              lat={city.lat}
              lng={city.lng}
              aqi={city.aqi}
              displayValue={val}
              color={currentScale(val)}
              inView={inView}
              isHovered={hoveredCity === city.city}
              onHover={setHoveredCity}
              onClick={onCityClick ? () => onCityClick(city.city) : undefined}
            />
          );
        })}
      </ComposableMap>

      {/* U10 — Shared Tooltip */}
      {hoveredCityData && (
        <div 
          className="absolute bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <div className="rounded-2xl border border-hazard/20 bg-surface2/95 p-5 shadow-2xl backdrop-blur-xl min-w-[200px] transform-gpu">
            <p className="font-display text-[11px] font-bold text-hazard uppercase tracking-widest">{hoveredCityData.state}</p>
            <h4 className="mt-1 font-display text-2xl font-black text-ivory">{hoveredCityData.city}</h4>
            
            <div className="mt-4 flex items-end gap-3">
              <span className="font-mono text-4xl font-black leading-none" style={{ color: getAQIColor(hoveredCityData.aqi) }}>
                {hoveredCityData.aqi}
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase text-muted leading-tight">Current AQI</span>
                <span className="font-mono text-[11px] font-bold uppercase" style={{ color: getAQIColor(hoveredCityData.aqi) }}>
                  {getAQIStatus(hoveredCityData.aqi)}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-hazard/10 space-y-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-muted">PM2.5</span>
                <span className="text-ivory">{hoveredCityData.pm25} µg/m³</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-muted">NO₂</span>
                <span className="text-ivory">{hoveredCityData.no2} µg/m³</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
