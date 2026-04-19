import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip } from "@/components/charts/CustomTooltip";
import { ChartContainer } from "@/components/ui/chart";
import type { ForecastPoint } from "@/api/airlensApi";
import { getAQIColor } from "@/data/aqi-data";
import { useInView } from "@/hooks/useInView";

const monthlyConfig = {
  value: { label: "Concentration", color: "#FF6B35" },
};

interface MonthlyAQIChartProps {
  animate: boolean;
  data: ForecastPoint[];
}

function StaggeredBarShape(props: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  index?: number;
}) {
  const { x = 0, y = 0, width = 0, height = 0, fill = "#FF6B35", index = 0 } = props;

  return (
    <motion.rect
      x={x}
      width={width}
      initial={{ y: y + height, height: 0 }}
      animate={{ y, height }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      fill={fill}
      rx={4}
    />
  );
}

export function MonthlyAQIChart({ animate, data }: MonthlyAQIChartProps) {
  const { ref, inView } = useInView(0.3);

  const average = (values: number[]) => {
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };

  const pollutantData = [
    { pollutant: "PM2.5", value: average(data.map((entry) => entry.pm25)) },
    { pollutant: "PM10", value: average(data.map((entry) => entry.pm10)) },
    { pollutant: "NO2", value: average(data.map((entry) => entry.no2)) },
    { pollutant: "SO2", value: average(data.map((entry) => entry.so2)) },
    { pollutant: "CO", value: average(data.map((entry) => entry.co)) / 10 },
    { pollutant: "O3", value: average(data.map((entry) => entry.o3)) },
  ].map((entry) => ({
    ...entry,
    rounded: Math.round(entry.value),
    fill: getAQIColor(entry.value),
  }));

  return (
    <div ref={ref}>
      <ChartContainer config={monthlyConfig} className="h-[320px] w-full">
        <BarChart data={pollutantData} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,107,53,0.06)" vertical={false} />
          <XAxis
            dataKey="pollutant"
            tick={{ fill: "#7D8590", fontSize: 11, fontFamily: "JetBrains Mono" }}
            axisLine={{ stroke: "rgba(255,107,53,0.15)" }}
          />
          <YAxis
            tick={{ fill: "#7D8590", fontSize: 11, fontFamily: "JetBrains Mono" }}
            axisLine={{ stroke: "rgba(255,107,53,0.15)" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="rounded"
            radius={[4, 4, 0, 0]}
            isAnimationActive={animate && inView}
            animationDuration={1000}
            shape={<StaggeredBarShape />}
          >
            {pollutantData.map((entry) => (
              <Cell key={entry.pollutant} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="rounded"
              position="top"
              style={{ fill: "#7D8590", fontSize: "9px", fontFamily: "JetBrains Mono" }}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
