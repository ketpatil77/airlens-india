import { motion } from "framer-motion";

/**
 * U13 — Chart Micro-Animations
 * Features: Glassmorphism toolkit with optimized blur and entrance.
 */
export function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ color?: string; name?: string; value?: string | number }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="transform-gpu pointer-events-none"
    >
      <div 
        className="overflow-hidden rounded-xl border bg-void/80 backdrop-blur-md p-3 shadow-2xl"
        style={{ borderColor: "rgba(255,107,53,0.15)" }}
      >
        <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-muted/60">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={`${entry.name}-${index}`} className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="font-mono text-[11px] text-muted">{entry.name}</span>
              <span className="ml-auto font-mono text-[14px] font-black" style={{ color: entry.color }}>
                {entry.value}
              </span>
            </div>
          ))}
        </div>
        
        {/* U13 — Tooltip Shimmer Effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none" 
             style={{ backgroundSize: '1000px 100%' }} />
      </div>
    </motion.div>
  );
}

