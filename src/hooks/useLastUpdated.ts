import { useState, useEffect } from "react";

/**
 * U5 — Last Updated Timestamp
 * Tracks when data was last refreshed and provides formatted IST time
 * and relative label ("3m ago", "Just now").
 */
export function useLastUpdated(refreshIntervalMs = 300_000) {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date);
  const [now, setNow] = useState<number>(Date.now);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, refreshIntervalMs);
    return () => clearInterval(interval);
  }, [refreshIntervalMs]);

  // Update 'now' every second for relative time calculation
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = lastUpdated.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const relativeLabel = (() => {
    const diffMs = now - lastUpdated.getTime();
    const diffMin = Math.floor(diffMs / 60_000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    return `${Math.floor(diffMin / 60)}h ago`;
  })();

  return { formatted, relativeLabel, raw: lastUpdated };
}
