import { AnimatePresence, motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";
import { BorderBeam } from "@/components/ui/border-beam";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cityAQIData, getAQIColor, getAQIStatus, hourlyAQI } from "@/data/aqi-data";
import { useAirQuality } from "@/hooks/useAirQuality";
import { useLastUpdated } from "@/hooks/useLastUpdated";
import { useURLState } from "@/hooks/useURLState";

const cities = ["Delhi", "Mumbai", "Kolkata", "Bengaluru", "Chennai"];

export function CityComparison() {
  // U8: URL state persistence — ?city=mumbai
  const [activeCity, setActiveCity] = useURLState("city", "delhi");
  const { relativeLabel } = useLastUpdated();

  // Listen for external city-select events (e.g. from Command Palette)
  useEffect(() => {
    const handler = (e: Event) => {
      const city = (e as CustomEvent<{ city: string }>).detail.city.toLowerCase();
      const validCities = cities.map((c) => c.toLowerCase());
      if (validCities.includes(city)) setActiveCity(city);
    };
    window.addEventListener("airlens:city-select", handler);
    return () => window.removeEventListener("airlens:city-select", handler);
  }, [setActiveCity]);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("Link copied!", {
        description: `Share ${activeCity} AQI dashboard`,
        duration: 2000,
      });
    });
  }

  return (
    <section id="cities" className="mx-auto w-[min(1520px,100%-2rem)] py-24">
      <h2 className="font-display text-[clamp(34px,4.5vw,54px)] font-black leading-[0.95] text-ivory">
        City AQI Comparison Dashboard
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
        Switch between major cities to compare current index, pollutant composition, and 24-hour behavior.
      </p>

      <Tabs defaultValue="delhi" value={activeCity} onValueChange={setActiveCity} className="mt-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          <TabsList className="min-w-full rounded-lg border border-hazard/10 bg-surface2 p-1">
            {cities.map((city) => (
              <TabsTrigger
                key={city}
                value={city.toLowerCase()}
                className="rounded-sm px-4 py-2 font-mono text-[11px] tracking-wide data-[state=active]:border-b-2 data-[state=active]:border-hazard data-[state=active]:text-hazard"
              >
                {city}
              </TabsTrigger>
            ))}
          </TabsList>
          {/* U8: Share button */}
          <button
            onClick={handleShare}
            className="ml-auto flex shrink-0 items-center gap-1.5 rounded border border-hazard/15 px-3 py-2 font-mono text-[10px] text-muted transition-all duration-200 hover:border-hazard/30 hover:text-ivory"
            title="Copy shareable link"
          >
            <Share2 size={12} />
            Share
          </button>
        </div>
        {/* U5: Last updated */}
        <p className="mt-2 font-mono text-[10px] text-muted/40">Updated {relativeLabel}</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCity}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {cities.map((city) => (
              <TabsContent key={city} value={city.toLowerCase()}>
                {activeCity === city.toLowerCase() ? <CityDashboard cityName={city} /> : null}
              </TabsContent>
            ))}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </section>
  );
}

function CityDashboard({ cityName }: { cityName: string }) {
  const { data, source } = useAirQuality(cityName);
  const citySource = source;
  const city = data ?? cityAQIData.find((item) => item.city === cityName);
  if (!city) {
    return null;
  }

  const hourly = (hourlyAQI[cityName] ?? []).map((aqi, index) => ({
    hour: `${index}:00`,
    aqi,
  }));

  const pollutants = [
    { key: "pm25", label: "PM2.5", value: city.pm25, unit: "µg/m³" },
    { key: "pm10", label: "PM10", value: city.pm10, unit: "µg/m³" },
    { key: "no2", label: "NO2", value: city.no2, unit: "µg/m³" },
    { key: "so2", label: "SO2", value: city.so2, unit: "µg/m³" },
    { key: "co", label: "CO (×100)", value: city.co * 100, unit: "mg/m³" },
    { key: "o3", label: "O3", value: city.o3, unit: "µg/m³" },
  ];

  const trendSign = city.trend === "up" ? "+" : city.trend === "down" ? "-" : "~";

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative overflow-hidden rounded-xl">
          <CardSpotlight className="rounded-xl border border-hazard/10 bg-surface p-5" style={{ minHeight: 150 }}>
            <span className="font-mono text-[11px] uppercase tracking-wide text-muted">Current AQI</span>
            <span className="mt-1 block font-mono text-[52px] font-black leading-none" style={{ color: getAQIColor(city.aqi) }}>
              {city.aqi}
            </span>
            <span
              className="mt-1 block font-body text-[12px] uppercase tracking-wide"
              style={{ color: getAQIColor(city.aqi) }}
            >
              {getAQIStatus(city.aqi)}
            </span>
            {/* U4: data source badge */}
            <DataSourceBadge source={citySource} className="mt-2" size="xs" />
          </CardSpotlight>
          <BorderBeam colorFrom="#FF6B35" colorTo="#C0392B" duration={3} size={80} />
        </div>

        <CardSpotlight className="rounded-xl border border-hazard/10 bg-surface p-5" style={{ minHeight: 150 }}>
          <span className="font-mono text-[11px] uppercase tracking-wide text-muted">PM2.5</span>
          <span className="mt-3 block font-mono text-[44px] font-black leading-none text-hazard">{city.pm25}</span>
          <span className="mt-1 block text-xs text-muted">µg/m³</span>
        </CardSpotlight>

        <CardSpotlight className="rounded-xl border border-hazard/10 bg-surface p-5" style={{ minHeight: 150 }}>
          <span className="font-mono text-[11px] uppercase tracking-wide text-muted">PM10</span>
          <span className="mt-3 block font-mono text-[44px] font-black leading-none text-warning">{city.pm10}</span>
          <span className="mt-1 block text-xs text-muted">µg/m³</span>
        </CardSpotlight>

        <CardSpotlight className="rounded-xl border border-hazard/10 bg-surface p-5" style={{ minHeight: 150 }}>
          <span className="font-mono text-[11px] uppercase tracking-wide text-muted">Trend</span>
          <span className="mt-3 block font-mono text-[44px] font-black leading-none text-critical">
            {trendSign}
            {city.trendPct}%
          </span>
          <span className="mt-1 block text-xs capitalize text-muted">{city.trend}</span>
        </CardSpotlight>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="relative rounded-xl border border-hazard/12 bg-surface p-4">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">24 Hour AQI</p>
          <ChartContainer
            config={{
              aqi: { label: "AQI", color: "#FF6B35" },
            }}
            className="h-[320px]"
          >
            <AreaChart data={hourly}>
              <defs>
                <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,107,53,0.08)" />
              <XAxis
                dataKey="hour"
                tick={{ fill: "#7D8590", fontSize: 10, fontFamily: "JetBrains Mono" }}
                tickLine={false}
                axisLine={false}
                interval={3}
              />
              <YAxis
                tick={{ fill: "#7D8590", fontSize: 10, fontFamily: "JetBrains Mono" }}
                tickLine={false}
                axisLine={false}
              />
              <ReferenceLine
                y={100}
                stroke="#F39C12"
                strokeDasharray="4 4"
                label={{ value: "Moderate", fill: "#F39C12", fontSize: 10 }}
              />
              <ReferenceLine
                y={200}
                stroke="#E67E22"
                strokeDasharray="4 4"
                label={{ value: "Poor", fill: "#E67E22", fontSize: 10 }}
              />
              <ReferenceLine
                y={300}
                stroke="#FF6B35"
                strokeDasharray="4 4"
                label={{ value: "Very Poor", fill: "#FF6B35", fontSize: 10 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="aqi"
                stroke="#FF6B35"
                strokeWidth={2}
                fill="url(#aqiGrad)"
                isAnimationActive
                animationDuration={1500}
              />
            </AreaChart>
          </ChartContainer>
        </div>

        <div className="relative rounded-xl border border-hazard/12 bg-surface p-4">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Pollutant Mix</p>
          <ChartContainer
            config={{
              value: { label: "Concentration", color: "#58A6FF" },
            }}
            className="h-[320px]"
          >
            <BarChart data={pollutants} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid horizontal={false} stroke="rgba(255,107,53,0.08)" />
              <XAxis
                type="number"
                tick={{ fill: "#7D8590", fontSize: 10, fontFamily: "JetBrains Mono" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fill: "#E6EDF3", fontSize: 11, fontFamily: "JetBrains Mono" }}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="value"
                fill="#58A6FF"
                radius={[0, 6, 6, 0]}
                isAnimationActive
                animationDuration={1200}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </>
  );
}
