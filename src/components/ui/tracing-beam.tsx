import { memo } from "react";
import { cn } from "@/lib/utils";

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
  beamColor?: string;
  dotColor?: string;
}

function TracingBeamComponent({
  children,
  className,
  beamColor = "#FF6B35",
  dotColor = "#FF6B35",
}: TracingBeamProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-4xl", className)}>
      <div className="pointer-events-none absolute left-2 top-3 hidden md:block">
        <div
          className="sticky top-28 ml-5 flex h-4 w-4 items-center justify-center rounded-full border border-hazard/40 bg-surface shadow-sm"
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dotColor }} />
        </div>
        <div
          className="absolute bottom-0 left-6 top-4 w-px"
          style={{
            background: `linear-gradient(to bottom, ${beamColor}55 0%, rgba(125,133,144,0.2) 22%, rgba(125,133,144,0.12) 100%)`,
          }}
        />
      </div>
      <div className="pl-0 md:pl-14">
        {children}
      </div>
    </div>
  );
}

export const TracingBeam = memo(TracingBeamComponent);
