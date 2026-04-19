import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  shimmerWidth?: number;
}

export function AnimatedShinyText({
  className,
  shimmerWidth = 120,
  children,
  ...props
}: AnimatedShinyTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-hazard/60 via-ivory via-50% to-hazard/60 bg-[length:var(--shiny-width)_100%] bg-clip-text text-transparent animate-shiny-text",
        className,
      )}
      style={{ "--shiny-width": `${shimmerWidth}px` } as React.CSSProperties}
      {...props}
    >
      {children}
    </span>
  );
}
