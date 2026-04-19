import { getAQIStatus } from "@/data/aqi-data";
import { useAirQuality } from "@/hooks/useAirQuality";
import { useLastUpdated } from "@/hooks/useLastUpdated";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { cn } from "@/lib/utils";
import { resolveAQIValue } from "@/services/pollutionService";

export function LiveAQIBadge({ className }: { className?: string }) {
  const { data, source } = useAirQuality("Delhi");
  const delhiAqi = resolveAQIValue(data?.aqi, 287);
  const status = getAQIStatus(delhiAqi).toUpperCase();
  const { relativeLabel } = useLastUpdated();

  return (
    <div className={cn("flex flex-col items-end gap-1", className)}>
      <div
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-hazard"
        style={{
          background: "rgba(192,57,43,0.12)",
          borderColor: "rgba(255,107,53,0.3)",
        }}
      >
        <span>DEL</span>
        <span>{delhiAqi}</span>
        <span className="inline-block animate-pulseDot">●</span>
        <span>{status}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <DataSourceBadge source={source} size="xs" />
        <span className="font-mono text-[8px] text-muted/50">{relativeLabel}</span>
      </div>
    </div>
  );
}

