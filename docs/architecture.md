# Architecture Overview

## Purpose

AIRLENS INDIA turns air-quality data for Indian cities into a public-facing product with live status, fallback behavior, city exploration, and health context.

## System Shape

```text
User
  -> React/Vite frontend
  -> city search, map, comparison, and story sections
  -> local API adapter
  -> Open-Meteo air-quality data
  -> cache/fallback/stale response handling
```

## Frontend Layers

- `src/sections/`: page-level storytelling and product sections.
- `src/components/`: maps, charts, layout, motion, and UI primitives.
- `src/api/`: client fetch and city data access.
- `src/data/`: static fallback and explanatory content.
- `src/services/`: AQI and pollutant helper logic.

## Server/API Layer

`server/air-quality-api.ts` normalizes upstream data, caches results, and returns usable responses even when the live source is unavailable.

## Reliability Choices

- Live data with fallback rendering.
- Stale-data handling rather than blank UI.
- Local seed content for product continuity.
- Portable Windows launcher for easy handoff.

## Product Goals

- Explain AQI beyond a single number.
- Compare city conditions clearly.
- Connect pollutant levels to health context.
- Keep public UX polished and readable.
