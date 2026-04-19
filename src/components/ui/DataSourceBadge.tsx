/**
 * U4 — Data Source Attribution Badge
 * Shows LIVE / FORECAST / CACHED next to every AQI number.
 * LIVE pulses green, FORECAST is static blue, CACHED is static grey.
 */

interface DataSourceBadgeProps {
  source: "api" | "fallback" | "forecast" | undefined;
  className?: string;
  size?: "sm" | "xs";
}

const SOURCE_CONFIG = {
  api: {
    label: "● LIVE",
    color: "#27AE60",
    bg: "rgba(39,174,96,0.12)",
    border: "rgba(39,174,96,0.3)",
    pulse: true,
  },
  forecast: {
    label: "◌ FORECAST",
    color: "#58A6FF",
    bg: "rgba(88,166,255,0.10)",
    border: "rgba(88,166,255,0.25)",
    pulse: false,
  },
  fallback: {
    label: "○ CACHED",
    color: "#7D8590",
    bg: "rgba(125,133,144,0.10)",
    border: "rgba(125,133,144,0.25)",
    pulse: false,
  },
} as const;

export function DataSourceBadge({ source, className = "", size = "xs" }: DataSourceBadgeProps) {
  if (!source) return null;
  const cfg = SOURCE_CONFIG[source] ?? SOURCE_CONFIG.fallback;
  const textSize = size === "xs" ? "text-[9px]" : "text-[11px]";

  return (
    <span
      className={`font-mono ${textSize} tracking-[0.15em] px-2 py-0.5 rounded-full border inline-flex items-center ${cfg.pulse ? "animate-dsLivePulse" : ""} ${className}`}
      style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: cfg.border }}
    >
      {cfg.label}
    </span>
  );
}
