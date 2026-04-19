import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCircularProgressBarProps {
  max?: number;
  min?: number;
  value: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  className?: string;
}

export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className,
}: AnimatedCircularProgressBarProps) {
  const normalized = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (normalized / 100) * circumference;

  return (
    <div className={cn("relative h-32 w-32", className)}>
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} fill="none" stroke={gaugeSecondaryColor} strokeWidth="10" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={gaugePrimaryColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: targetOffset }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-black text-hazard">
        {Math.round(normalized)}
      </span>
    </div>
  );
}
