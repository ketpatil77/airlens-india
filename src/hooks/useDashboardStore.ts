import { create } from "zustand";

export type PollutantType = "AQI" | "PM2.5" | "PM10" | "NO2" | "O3";

interface DashboardState {
  hoveredCity: string | null;
  selectedCity: string | null;
  activePollutant: PollutantType;
  setHoveredCity: (city: string | null) => void;
  setSelectedCity: (city: string | null) => void;
  setActivePollutant: (pollutant: PollutantType) => void;
}

/**
 * U9, U10 — Dashboard Store
 * Shared state for heatmap, top-10 list, and pollutant controls.
 * Uses selectors for performant re-renders.
 */
export const useDashboardStore = create<DashboardState>((set) => ({
  hoveredCity: null,
  selectedCity: null,
  activePollutant: "AQI",
  setHoveredCity: (city) => set({ hoveredCity: city }),
  setSelectedCity: (city) => set({ selectedCity: city }),
  setActivePollutant: (pollutant) => set({ activePollutant: pollutant }),
}));
