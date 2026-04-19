import { Area, AreaChart, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip } from "@/components/charts/CustomTooltip";
import { ChartContainer } from "@/components/ui/chart";
import type { ForecastPoint } from "@/api/airlensApi";
import { useInView } from "@/hooks/useInView";

const chartConfig = {
  pm25: { label: "PM2.5", color: "#FF6B35" },
};

interface AnnualTrendChartProps {
  animate: boolean;
  data: ForecastPoint[];
}

export function AnnualTrendChart({ animate, data }: AnnualTrendChartProps) {
  const { ref, inView } = useInView(0.3);

  const chartData = data.map((point) => ({
    hour: new Date(point.time).toLocaleTimeString("en-IN", {
      hour: "numeric",
      hour12: false,
    }),
    pm25: Math.round(point.pm25),
  }));

  return (
    <div ref={ref}>
      <ChartContainer config={chartConfig} className="h-[320px] w-full">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="forecastPm25" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,107,53,0.06)" />
          <XAxis
            dataKey="hour"
            tick={{ fill: "#7D8590", fontSize: 11, fontFamily: "JetBrains Mono" }}
            axisLine={{ stroke: "rgba(255,107,53,0.15)" }}
            interval={3}
          />
          <YAxis
            tick={{ fill: "#7D8590", fontSize: 11, fontFamily: "JetBrains Mono" }}
            axisLine={{ stroke: "rgba(255,107,53,0.15)" }}
          />
          <ReferenceLine
            y={100}
            stroke="rgba(243,156,18,0.25)"
            strokeDasharray="4 4"
            label={{ value: "Moderate", fill: "#F39C12", fontSize: 9, fontFamily: "JetBrains Mono" }}
          />
          <ReferenceLine
            y={200}
            stroke="rgba(230,126,34,0.25)"
            strokeDasharray="4 4"
            label={{ value: "Poor", fill: "#E67E22", fontSize: 9, fontFamily: "JetBrains Mono" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="pm25"
            stroke="#FF6B35"
            strokeWidth={2}
            fill="url(#forecastPm25)"
            isAnimationActive={animate && inView}
            animationDuration={1200}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
