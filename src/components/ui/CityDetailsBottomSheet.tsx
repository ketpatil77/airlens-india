import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStore } from "@/hooks/useDashboardStore";
import { cityAQIData, getAQIColor, getAQIStatus } from "@/data/aqi-data";
import { X } from "lucide-react";
import { GlassCard } from "./GlassCard";

/**
 * U16 — Mobile Bottom Sheet
 * Features:
 * - Drag-to-close with snap-to-top.
 * - Detailed pollutant breakdown.
 * - Glassmorphism UI (U12).
 */
export function CityDetailsBottomSheet() {
  const { selectedCity, setSelectedCity } = useDashboardStore();
  
  const city = cityAQIData.find(c => c.city === selectedCity);

  if (!city) return null;

  return (
    <AnimatePresence>
      {selectedCity && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCity(null)}
            className="fixed inset-0 z-[100] bg-void/60 backdrop-blur-sm lg:hidden"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 150) {
                setSelectedCity(null);
              }
            }}
            className="fixed inset-x-0 bottom-0 z-[101] max-h-[92vh] overflow-hidden rounded-t-[32px] bg-surface2 border-t border-hazard/20 lg:hidden shadow-[0_-12px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Handle bar */}
            <div className="flex justify-center p-4">
              <div className="h-1.5 w-12 rounded-full bg-ivory/10" />
            </div>

            <div className="relative h-full overflow-y-auto pb-12 px-6">
              <div className="flex items-start justify-between">
                <div>
                   <p className="font-mono text-[11px] uppercase tracking-widest text-hazard font-bold">{city.state}</p>
                   <h2 className="font-display text-4xl font-black text-ivory mt-1">{city.city}</h2>
                </div>
                <button 
                  onClick={() => setSelectedCity(null)}
                  className="p-2 rounded-full bg-white/5 text-muted hover:text-ivory"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-8">
                 <div className="flex items-baseline gap-4">
                    <span className="font-mono text-7xl font-black leading-none" style={{ color: getAQIColor(city.aqi) }}>
                      {city.aqi}
                    </span>
                    <div className="flex flex-col">
                       <span className="font-mono text-xs text-muted uppercase tracking-widest leading-none mb-1">Live AQI</span>
                       <span className="font-display text-lg font-bold" style={{ color: getAQIColor(city.aqi) }}>
                         {getAQIStatus(city.aqi)}
                       </span>
                    </div>
                 </div>
              </div>

              <div className="mt-10 space-y-6">
                <PollutantRow label="PM 2.5" value={city.pm25} unit="µg/m³" max={300} color="#FF6B35" />
                <PollutantRow label="PM 10" value={city.pm10} unit="µg/m³" max={500} color="#F39C12" />
                <PollutantRow label="NO₂" value={city.no2} unit="µg/m³" max={200} color="#27AE60" />
                <PollutantRow label="SO₂" value={city.so2} unit="µg/m³" max={100} color="#A8D08D" />
                <PollutantRow label="O₃" value={city.o3} unit="µg/m³" max={180} color="#E67E22" />
              </div>

              <div className="mt-12">
                 <GlassCard intensity="low" className="p-5 border-hazard/10">
                    <h4 className="font-display text-sm font-bold text-ivory flex items-center gap-2">
                       <span className="flex h-2 w-2 rounded-full bg-hazard" />
                       Health Advisory
                    </h4>
                    <p className="mt-3 font-body text-[13px] leading-relaxed text-muted">
                       Current levels exceed national safety limits. Prolonged outdoor exposure is not recommended. Vulnerable groups should stay indoors.
                    </p>
                 </GlassCard>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PollutantRow({ label, value, unit, max, color }: { label: string, value: number, unit: string, max: number, color: string }) {
  const percentage = Math.min(100, (value / max) * 100);
  
  return (
    <div className="group">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono text-[11px] font-bold text-muted uppercase tracking-widest">{label}</span>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-lg font-bold text-ivory">{value}</span>
          <span className="font-mono text-[10px] text-muted">{unit}</span>
        </div>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
