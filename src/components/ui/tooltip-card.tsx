import { cn } from "@/lib/utils";

interface TooltipCardProps {
  title: string;
  lines: string[];
  className?: string;
}

export function TooltipCard({ title, lines, className }: TooltipCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-hazard/30 bg-surface2/95 px-3 py-2 shadow-2xl backdrop-blur-md",
        className,
      )}
    >
      <p className="font-display text-sm font-bold text-ivory">{title}</p>
      <div className="mt-1 space-y-1">
        {lines.map((line) => (
          <p key={line} className="font-mono text-[10px] text-muted">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
