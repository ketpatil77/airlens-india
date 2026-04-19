import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    color?: string;
  }
>;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart(): ChartContextProps {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer");
  }
  return context;
}

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("h-[320px] w-full text-xs", className)} {...props}>
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export const ChartTooltip = RechartsPrimitive.Tooltip;

export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> & {
  className?: string;
}) {
  const { config } = useChart();

  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "min-w-[160px] rounded-lg border border-hazard/25 bg-surface2/95 px-3 py-2 text-xs text-ivory shadow-xl backdrop-blur",
        className,
      )}
    >
      {label !== undefined && <div className="mb-1 font-mono text-muted">{label}</div>}
      <div className="space-y-1">
        {payload.map((entry) => {
          const key = String(entry.dataKey ?? entry.name ?? "value");
          const cfg = config[key];
          const color = entry.color ?? cfg?.color ?? "#FF6B35";

          return (
            <div key={`${key}-${entry.value}`} className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-muted">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                {cfg?.label ?? entry.name ?? key}
              </span>
              <span className="font-mono text-ivory">{entry.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const ChartLegend = RechartsPrimitive.Legend;
