import { motion } from "framer-motion";
import { IconByName } from "@/components/ui/lucide-icon";
import { type PollutionSource } from "@/data/sources-data";
import { useInView } from "@/hooks/useInView";
import { DURATION, EASE_OUT } from "@/lib/animation.constants";

const sourceImages: Partial<Record<PollutionSource["id"], string>> = {
  industrial: "/images/optimized/industrial-pollution.webp",
  crop: "/images/optimized/crop-burning.webp",
  waste: "/images/optimized/dust-texture.webp",
  weather: "/images/optimized/india-aqi-map.webp",
  // vehicles and construction use icon-only layout (no unique images)
};

export function SourceItem({
  source,
  index,
  total,
  showConnector = true,
}: {
  source: PollutionSource;
  index: number;
  total: number;
  showConnector?: boolean;
}) {
  const { ref, inView } = useInView(0.3);
  const imageSrc = sourceImages[source.id];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: DURATION.base, ease: EASE_OUT, delay: 0.04 }}
      className="grid grid-cols-[72px_1fr] items-start gap-6 md:grid-cols-[80px_1fr] md:gap-8"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "720px",
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-300"
          style={{
            borderColor: `${source.categoryColor}60`,
            backgroundColor: `${source.categoryColor}10`,
          }}
        >
          <IconByName name={source.icon} size={24} style={{ color: source.categoryColor }} />
        </div>
        {showConnector && index < total - 1 && (
          <div className="h-8 w-[1px] bg-gradient-to-b from-hazard/30 to-transparent" />
        )}
      </div>

      <div className="pb-4">
        <span
          className="rounded-full border px-2 py-1 font-mono text-[10px] tracking-[0.2em]"
          style={{
            color: source.categoryColor,
            borderColor: `${source.categoryColor}40`,
            backgroundColor: `${source.categoryColor}10`,
          }}
        >
          {source.category}
        </span>

        <h3 className="mt-3 font-display text-[26px] font-bold leading-tight text-ivory">
          <span className="block">{source.name}</span>
        </h3>

        <p className="mt-2 max-w-[600px] font-body text-[14px] leading-[1.75] text-muted">
          {source.description}
        </p>
        <p className="mt-1 max-w-[600px] font-body text-[13px] leading-[1.75] text-muted/70">
          {source.detail}
        </p>

        {imageSrc ? (
          <div className="mt-5 overflow-hidden rounded-2xl border border-hazard/12 bg-surface2">
            <img
              src={imageSrc}
              alt={source.name}
              loading="lazy"
              decoding="async"
              width={1600}
              height={900}
              draggable={false}
              className="h-[220px] w-full object-cover opacity-85"
            />
          </div>
        ) : null}

        <div className="mt-5 flex items-center gap-4">
          <div className="flex flex-col">
            <span
              className="font-mono text-[36px] font-black leading-none"
              style={{ color: source.categoryColor }}
            >
              {source.contributionPct}%
            </span>
            <span className="mt-1 font-mono text-[10px] tracking-wide text-muted">
              OF TOTAL POLLUTION
            </span>
          </div>
          <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-surface2">
            <div
              className="h-full rounded-full origin-left transition-transform duration-700 ease-out"
              style={{
                backgroundColor: source.categoryColor,
                transform: `scaleX(${inView ? (source.contributionPct * 2.5) / 100 : 0})`,
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="self-center font-mono text-[10px] text-muted/60">WORST IN:</span>
          {source.affectedCities.map((city) => (
            <span
              key={city}
              className="rounded border border-hazard/10 bg-surface2 px-2 py-1 font-mono text-[10px] text-muted"
            >
              {city}
            </span>
          ))}
        </div>

        <p className="mt-3 flex items-center gap-2 font-mono text-[11px] text-muted/50">
          <span className="text-hazard">◆</span>
          {source.aqiTrigger}
        </p>
      </div>
    </motion.div>
  );
}
