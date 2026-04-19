import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";

export function EyebrowLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatedShinyText
      className={cn("font-mono text-[10px] uppercase tracking-[0.3em] text-hazard", className)}
    >
      {children}
    </AnimatedShinyText>
  );
}
