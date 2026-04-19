import { motion } from "framer-motion";
import { useCursorContext } from "@/hooks/useCursorContext";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { type CityAQI, getAQIColor, getAQIStatus } from "@/data/aqi-data";

export function CityAQICard({ city }: { city: CityAQI }) {
  const { setVariant } = useCursorContext();
  const color = getAQIColor(city.aqi);
  const status = getAQIStatus(city.aqi);
  const isSevere = city.aqi > 300;

  const card = (
    <motion.div
      className="relative flex h-[108px] w-[168px] select-none flex-col justify-between overflow-hidden rounded-[14px] border bg-surface2/90 px-4 py-3 backdrop-blur-sm"
      style={{
        borderColor: `${color}25`,
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        willChange: "transform, box-shadow, border-color",
      }}
      whileHover={{ y: -2, scale: 1.015, boxShadow: "0 10px 28px rgba(255,107,53,0.16)" }}
      transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.7 }}
      onMouseEnter={(event) => {
        setVariant("hover");
        event.currentTarget.style.borderColor = `${color}72`;
        event.currentTarget.style.boxShadow = `0 10px 24px ${color}26`;
      }}
      onMouseLeave={(event) => {
        setVariant("default");
        event.currentTarget.style.borderColor = `${color}25`;
        event.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-display text-[13px] font-bold leading-tight text-ivory">{city.city}</p>
          <p className="mt-1 truncate font-body text-[11px] leading-none text-muted">{city.state}</p>
        </div>
        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      </div>
      <div className="space-y-1">
        <p className="font-mono text-[3rem] font-black leading-[0.88] tabular-nums" style={{ color }}>
          {city.aqi}
        </p>
        <p className="font-body text-[10px] uppercase tracking-[0.14em]" style={{ color }}>
          {status}
        </p>
      </div>
    </motion.div>
  );

  if (isSevere) {
    return (
      <NeonGradientCard
        neonColors={{ firstColor: color, secondColor: "#C0392B" }}
        borderRadius={14}
        borderSize={1}
        className="h-[108px] w-[168px]"
      >
        {card}
      </NeonGradientCard>
    );
  }

  return card;
}
