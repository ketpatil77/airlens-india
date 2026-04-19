import { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { cityAQIData, getAQIColor, getAQIStatus } from "@/data/aqi-data";
import { useCommandPaletteStore } from "@/hooks/useCommandPaletteStore";

/**
 * U6 — Command Palette ⌘K
 * Searches all 35 cities. On select:
 *  1. Scrolls to the India Heatmap section
 *  2. Fires airlens:city-select event → CityComparison switches tab
 *  3. Fires airlens:city-highlight event → IndiaHeatmap highlights marker
 */
export function CommandPalette() {
  const { isOpen, close } = useCommandPaletteStore();
  const [query, setQuery] = useState("");

  const filtered =
    query.trim() === ""
      ? cityAQIData.slice().sort((a, b) => b.aqi - a.aqi)
      : cityAQIData.filter(
          (c) =>
            c.city.toLowerCase().includes(query.toLowerCase()) ||
            c.state.toLowerCase().includes(query.toLowerCase()),
        );

  function handleSelect(cityName: string) {
    close();
    setQuery("");

    // 1. Scroll to heatmap
    const heatmapEl = document.getElementById("heatmap");
    if (heatmapEl) {
      heatmapEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // 2. Switch CityComparison tab
    window.dispatchEvent(new CustomEvent("airlens:city-select", { detail: { city: cityName } }));

    // 3. Highlight map marker
    window.dispatchEvent(new CustomEvent("airlens:city-highlight", { detail: { city: cityName } }));
  }

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      title="City Search"
      description="Search any of 35 Indian cities to view live AQI data"
    >
      {/* Custom wrapper styled to match AirLens brand */}
      <Command
        className="overflow-hidden rounded-xl border"
        style={{ background: "#0D1117", borderColor: "rgba(255,107,53,0.2)" }}
      >
        {/* Search input */}
        <div className="border-b px-4 py-3" style={{ borderColor: "rgba(255,107,53,0.12)" }}>
          <CommandInput
            placeholder="Search cities… (35 available)"
            value={query}
            onValueChange={setQuery}
            className="bg-transparent font-mono text-[13px] text-ivory placeholder:text-muted/60"
          />
        </div>

        {/* Results */}
        <CommandList className="max-h-[380px]">
          <CommandEmpty className="py-8 text-center font-mono text-[12px] text-muted">
            No city found for &ldquo;{query}&rdquo;
          </CommandEmpty>

          <CommandGroup heading="Indian Cities — sorted by AQI">
            {filtered.map((city) => {
              const color = getAQIColor(city.aqi);
              const status = getAQIStatus(city.aqi);
              return (
                <CommandItem
                  key={city.city}
                  value={city.city}
                  onSelect={() => handleSelect(city.city)}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition-colors duration-150 hover:bg-white/5 data-selected:bg-white/5"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display text-[14px] font-bold text-ivory">
                      {city.city}
                    </span>
                    <span className="font-mono text-[10px] text-muted">{city.state}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {/* Trend arrow */}
                    <span
                      className="font-mono text-[10px]"
                      style={{ color: city.trend === "up" ? "#E74C3C" : city.trend === "down" ? "#27AE60" : "#7D8590" }}
                    >
                      {city.trend === "up" ? "↑" : city.trend === "down" ? "↓" : "→"}
                      {city.trendPct}%
                    </span>
                    {/* Status badge */}
                    <span
                      className="rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wide"
                      style={{ color, borderColor: color + "40", backgroundColor: color + "12" }}
                    >
                      {status}
                    </span>
                    {/* AQI number */}
                    <span className="w-12 text-right font-mono text-[20px] font-black leading-none" style={{ color }}>
                      {city.aqi}
                    </span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>

        {/* Footer hint bar */}
        <div
          className="flex items-center gap-4 border-t px-4 py-2"
          style={{ borderColor: "rgba(255,107,53,0.1)", background: "rgba(255,107,53,0.03)" }}
        >
          <span className="font-mono text-[9px] text-muted/60">↵ Navigate to city</span>
          <span className="font-mono text-[9px] text-muted/60">ESC Close</span>
          <DataSourceBadge source="fallback" size="xs" className="ml-auto" />
          <span className="font-mono text-[9px] text-muted/40">⌘K</span>
        </div>
      </Command>
    </CommandDialog>
  );
}
