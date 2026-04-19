import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  colorFrom?: string;
  colorTo?: string;
  duration?: number;
  size?: number;
}

export function BorderBeam({
  className,
  colorFrom = "#FF8C42",
  colorTo = "#C0392B",
  duration = 4,
  size = 80,
}: BorderBeamProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <span
        className={cn("absolute top-0 h-[2px] animate-border-beam", className)}
        style={
          {
            width: `${size}px`,
            background: `linear-gradient(90deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
            animationDuration: `${duration}s`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
