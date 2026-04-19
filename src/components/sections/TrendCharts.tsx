import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { EyebrowLabel } from "@/components/motion/EyebrowLabel";
import { SectionHeadline } from "@/components/motion/SectionHeadline";
import { TextReveal } from "@/components/ui/text-reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggeredEntrance";
import { useAirQualityForecast } from "@/hooks/useAirQuality";
import { useInView } from "@/hooks/useInView";
import { useLastUpdated } from "@/hooks/useLastUpdated";
import { cn } from "@/lib/utils";

const AnnualTrendChart = lazy(() =>
  import("@/components/charts/AnnualTrendChart").then((module) => ({ default: module.AnnualTrendChart })),
);
const MonthlyAQIChart = lazy(() =>
  import("@/components/charts/MonthlyAQIChart").then((module) => ({ default: module.MonthlyAQIChart })),
);

const TREND_CITIES = ["Delhi", "Mumbai", "Kolkata", "Bengaluru", "Chennai"] as const;
type TrendCity = (typeof TREND_CITIES)[number];

/**
 * U14, U15 — TrendCharts
 * Features: Staggered entry, swipe/wipe transitions for city switch, glass cards.
 */
export function TrendCharts() {
  const { ref, inView } = useInView(0.25);
  const [selectedCity, setSelectedCity] = useState<TrendCity>("Delhi");
  const { data: forecast } = useAirQualityForecast(selectedCity);
  const { relativeLabel, formatted } = useLastUpdated();

  return (
    <section id="trends" className="mx-auto w-[min(1520px,100%-2rem)] py-24" ref={ref}>
      <StaggerContainer>
        <StaggerItem>
          <EyebrowLabel className="mb-3 inline-block">Pollution Trends</EyebrowLabel>
          <SectionHeadline size="3xl">Critical Trajectories</SectionHeadline>
          <p className="mt-3 max-w-[520px] font-body text-[14px] leading-[1.7] text-muted">
            Analyzing historical patterns and short-term forecasts to predict visibility and health impact across major metros.
          </p>
          <p className="mt-1 font-mono text-[10px] text-muted/40 uppercase tracking-widest">
            Last Checked {relativeLabel} · IST {formatted}
          </p>
        </StaggerItem>

        <StaggerItem className="mt-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hazard font-bold whitespace-nowrap">MONITORING STATION:</span>
            <div className="flex gap-1 rounded-xl border border-hazard/10 bg-surface2/50 backdrop-blur-sm p-1 shrink-0">
              {TREND_CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={cn(
                    "relative rounded-lg px-4 py-2 font-mono text-[11px] transition-all duration-300",
                    selectedCity === city
                      ? "text-void font-bold"
                      : "text-muted hover:text-ivory"
                  )}
                >
                  {selectedCity === city && (
                    <motion.div 
                      layoutId="city-tab"
                      className="absolute inset-0 bg-hazard rounded-lg z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{city}</span>
                </button>
              ))}
            </div>
          </div>
        </StaggerItem>

        {/* U15 — Wipe Transition for Charts */}
        <div className="mt-12 overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCity}
              initial={{ x: "10%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-10%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-2"
            >
              <GlassCard intensity="low" className="p-8 border-hazard/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="font-mono text-8xl font-black">24H</span>
                </div>
                <SectionHeadline size="xl" className="mb-1">
                  24-Hour Forecast
                </SectionHeadline>
                <p className="mb-8 font-mono text-[11px] text-muted uppercase tracking-widest">
                  PM2.5 Concentration · Next 24 Hours
                </p>
                <Suspense fallback={<div className="h-[320px] animate-pulse rounded-2xl bg-surface2/40" />}>
                  <AnnualTrendChart animate={inView} data={forecast} />
                </Suspense>
              </GlassCard>

              <GlassCard intensity="low" className="p-8 border-hazard/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="font-mono text-8xl font-black">MIX</span>
                </div>
                <SectionHeadline size="xl" className="mb-1">
                  Pollutant Breakdown
                </SectionHeadline>
                <p className="mb-8 font-mono text-[11px] text-muted uppercase tracking-widest">
                  Average Concentration by Type
                </p>
                <Suspense fallback={<div className="h-[320px] animate-pulse rounded-2xl bg-surface2/40" />}>
                  <MonthlyAQIChart animate={inView} data={forecast} />
                </Suspense>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>

        <StaggerItem className="mt-10">
          <GlassCard intensity="medium" className="p-6 border-critical/20 relative overflow-hidden">
             <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-critical/10 text-critical border border-critical/20">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-ivory">Forecast Methodology</h4>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted max-w-3xl">
                    <TextReveal>
                      Data is processed via the Open-Meteo Air Quality API. We utilize specialized dispersion models that account for wind speed, temperature inversions, and local emissions to project high-fidelity pollution curves for the immediate future.
                    </TextReveal>
                  </p>
                </div>
             </div>
             <BorderBeam colorFrom="#C0392B" colorTo="#FF6B35" duration={6} size={150} />
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}


