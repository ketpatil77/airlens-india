import { useCursorContext } from "@/hooks/useCursorContext";
import { CityAQICard } from "@/components/ui/CityAQICard";
import { Marquee } from "@/components/ui/marquee";
import { cityAQIData } from "@/data/aqi-data";
import { useCitiesAirQuality } from "@/hooks/useAirQuality";

const marqueeCities = ["Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai", "Hyderabad", "Pune", "Ahmedabad"];

export function AQIStrip() {
  const { setVariant } = useCursorContext();
  const { data } = useCitiesAirQuality(marqueeCities);
  const cities = data ?? cityAQIData.filter((city) => marqueeCities.includes(city.city));

  return (
    <section
      id="dashboard"
      className="w-full border-y border-hazard/10 bg-surface py-0"
      onMouseEnter={() => setVariant("drag")}
      onMouseLeave={() => setVariant("default")}
    >
      <Marquee
        pauseOnHover
        speed={52}
        className="py-4 [--gap:1rem] md:[--gap:1.25rem]"
        style={{ willChange: "transform", contain: "layout paint" }}
      >
        {cities.map((city) => (
          <CityAQICard key={`${city.city}-${city.aqi}`} city={city} />
        ))}
      </Marquee>
    </section>
  );
}
