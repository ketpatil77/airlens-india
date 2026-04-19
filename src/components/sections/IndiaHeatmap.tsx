import { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { IndiaMap } from "@/components/maps/IndiaMap";
import { EyebrowLabel } from "@/components/motion/EyebrowLabel";
import { SectionHeadline } from "@/components/motion/SectionHeadline";
import { GlassCard } from "@/components/ui/GlassCard";
import { cityAQIData, getAQIColor, getPollutantValue } from "@/data/aqi-data";
import { useCitiesAirQuality } from "@/hooks/useAirQuality";
import { useInView } from "@/hooks/useInView";
import { useDashboardStore, type PollutantType } from "@/hooks/useDashboardStore";
import { useURLState } from "@/hooks/useURLState";
import { configureGsap, gsap } from "@/lib/gsap.config";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// U9 — Pollutant options
const POLLUTANTS: PollutantType[] = ["AQI", "PM2.5", "PM10", "NO2", "O3"];

export function IndiaHeatmap() {
  const { ref, inView } = useInView(0.2);
  const [activePollutant, setActivePollutant] = useURLState("pollutant", "AQI" as PollutantType);
  const [mobile, setMobile] = useState(false);
  
  const { hoveredCity, setHoveredCity, setSelectedCity } = useDashboardStore();
  const { data } = useCitiesAirQuality(cityAQIData.map((city) => city.city));
  
  const cities = data ?? cityAQIData;

  useEffect(() => {
    const onResize = (): void => {
      setMobile(window.innerWidth < 1024);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // U10 — Top 10 sorting based on active pollutant
  const sortedCities = useMemo(() => {
    return [...cities].sort((a, b) => {
      const valA = getPollutantValue(a, activePollutant);
      const valB = getPollutantValue(b, activePollutant);
      return valB - valA;
    });
  }, [cities, activePollutant]);

  const topTen = useMemo(() => sortedCities.slice(0, 10), [sortedCities]);

  useEffect(() => {
    if (!inView) return;
    
    configureGsap();
    // U10 — Transition bars using transformX for 60fps
    gsap.utils.toArray<HTMLElement>(".top10-bar").forEach((bar, index) => {
      const targetScale = Number(bar.dataset.progress ?? "0");
      gsap.fromTo(
        bar,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: targetScale,
          duration: 0.6,
          ease: "expo.out",
          delay: index * 0.05,
          scrollTrigger: { trigger: "#heatmap", start: "top 70%", once: true },
        }
      );
    });
  }, [inView, topTen]);

  const handleCityHover = useCallback((city: string | null) => {
    // 50ms debounce logic technically handled by setHoveredCity if we want,
    // but React state updates are fast enough here.
    setHoveredCity(city);
  }, [setHoveredCity]);

  // U10 — Scroll Top-10 card into view when map hovered
  const listRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (hoveredCity && listRefs.current[hoveredCity]) {
      listRefs.current[hoveredCity]?.scrollIntoView({ 
        behavior: "smooth", 
        block: "nearest" 
      });
    }
  }, [hoveredCity]);

  return (
    <section id="heatmap" className="relative mx-auto w-[min(1520px,100%-2rem)] py-24" ref={ref}>
      <EyebrowLabel className="inline-block">India Air Map</EyebrowLabel>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <SectionHeadline size="3xl">The National Pulse</SectionHeadline>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Visualize critical clusters across the subcontinent. Switch pollutants to see how different particle types affect the population.
          </p>
        </div>

        {/* U9 — Pollutant Segmented Control */}
        <div className="flex p-1 bg-surface2 rounded-xl border border-hazard/10 shrink-0 h-10 w-fit overflow-x-auto">
          {POLLUTANTS.map((pollutant) => (
            <button
              key={pollutant}
              onClick={() => setActivePollutant(pollutant)}
              className={cn(
                "relative flex items-center justify-center px-4 py-1.5 font-mono text-[11px] font-bold tracking-wider transition-all duration-300 rounded-lg",
                activePollutant === pollutant ? "text-void" : "text-muted hover:text-ivory"
              )}
            >
              {activePollutant === pollutant && (
                <motion.div 
                  layoutId="pollutant-pill"
                  className="absolute inset-0 bg-hazard rounded-[7px] z-0"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{pollutant}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Heatmap Layer */}
        <div className="relative min-w-0 h-[500px] lg:h-[720px]">
          {/* Hint text for marker interaction */}
          <div className="absolute top-4 right-4 z-10 rounded-lg border border-hazard/10 bg-surface2/90 backdrop-blur-sm px-3 py-2">
            <p className="font-mono text-[9px] text-muted/60 tracking-wider uppercase">
              {mobile ? "Tap markers for details" : "Hover markers to explore"}
            </p>
          </div>
          <IndiaMap 
            cityData={cities} 
            inView={inView} 
            activePollutant={activePollutant}
            onCityClick={mobile ? setSelectedCity : undefined}
          />
        </div>

        {/* U10, U12 — Most Polluted Sidebar */}
        <aside className="lg:sticky lg:top-32 h-fit">
          <GlassCard intensity="medium" className="p-5 flex flex-col gap-6">
            <h3 className="font-display text-xl font-bold text-ivory flex items-center justify-between">
              Top 10 Centers
              <span className="text-[10px] font-mono font-normal text-muted/60 uppercase tracking-[0.2em]">
                Sorted by {activePollutant}
              </span>
            </h3>

            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2">
              {topTen.map((city, index) => {
                const isHovered = hoveredCity === city.city;
                const value = getPollutantValue(city, activePollutant);
                const color = getAQIColor(activePollutant === "AQI" ? city.aqi : value * 4); // Adaptive scaling

                return (
                  <div 
                    key={city.city} 
                    ref={el => listRefs.current[city.city] = el}
                    onMouseEnter={() => handleCityHover(city.city)}
                    onMouseLeave={() => handleCityHover(null)}
                    className={cn(
                      "group relative flex items-start gap-4 p-3 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden",
                      isHovered ? "border-hazard/40 bg-hazard/10" : "border-hazard/5 bg-surface2/50"
                    )}
                  >
                    <span className="shrink-0 font-mono text-2xl font-black text-hazard/30 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-[14px] font-bold text-ivory truncate group-hover:text-hazard transition-colors">
                          {city.city}
                        </span>
                        <span className="font-mono text-[16px] font-bold tabular-nums" style={{ color }}>
                          {value}
                        </span>
                      </div>
                      <span className="block mt-1 font-mono text-[9px] text-muted tracking-widest uppercase">
                        {city.state}
                      </span>
                      {/* Bar indicator - GPU Accelerated transformX */}
                      <div className="mt-3 h-[2px] w-full bg-surface-2 rounded-full overflow-hidden">
                        <div 
                          className="top10-bar h-full rounded-full transition-transform duration-700 ease-out"
                          data-progress={(city.aqi / 500).toFixed(3)}
                          style={{
                            backgroundColor: color,
                            transform: `scaleX(${isHovered ? 1 : (city.aqi / 500)})`,
                            transformOrigin: "left"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-hazard/10 pt-4 flex flex-col gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-hazard font-bold">LEGEND {activePollutant}</span>
              <div className="grid grid-cols-6 h-1 w-full rounded-full overflow-hidden">
                <div className="bg-[#27AE60]" />
                <div className="bg-[#A8D08D]" />
                <div className="bg-[#F39C12]" />
                <div className="bg-[#E67E22]" />
                <div className="bg-[#FF6B35]" />
                <div className="bg-[#C0392B]" />
              </div>
            </div>
          </GlassCard>
        </aside>
      </div>
    </section>
  );
}

