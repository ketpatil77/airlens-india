# AIRLENS INDIA

Interactive air-quality platform focused on India. AIRLENS INDIA turns AQI, pollutant, forecast, and health data into public-facing product experience with motion-rich storytelling, city comparison, and resilient live-data handling.

## Proof Points

- Live + fallback AQI delivery for Indian cities
- Searchable multi-city exploration flow
- Forecast, pollutant, and health context in one product
- Public-facing UX built beyond plain dashboard patterns

## Project Overview

The goal of this project is to:

- explain air pollution across Indian cities in a clear visual format
- present live AQI information in a readable way
- compare conditions across major cities
- show the main pollution sources behind poor air quality
- connect AQI levels to practical health risk and action

The application combines storytelling, motion design, map exploration, and data visualization into a polished public-facing product.

## Key Features

- Live Delhi hero section with AQI status, source badge, and last-updated info
- Interactive India heatmap with city markers
- Command palette for searching 35 Indian cities with `Ctrl+K` / `Cmd+K`
- City comparison dashboard for Delhi, Mumbai, Kolkata, Bengaluru, and Chennai
- 24-hour AQI trend charts and pollutant breakdown cards
- Forecast section powered by Open-Meteo air-quality data
- Health advisory and impact sections
- Pollution source storytelling for industrial, crop-burning, dust, and urban contributors
- Shareable city state through URL query parameters
- Fallback and stale-data handling when live upstream data is unavailable
- Responsive React UI with GSAP, Lenis, Framer Motion, particles, and custom interactions

## Data Flow

The project works in two layers.

### Frontend

- React + TypeScript + Vite application
- SWR-based client fetching and refresh behavior
- lazy-loaded below-the-fold sections
- local seed data for fallback rendering

### Server API

`server/air-quality-api.ts` handles the local API layer.

Available routes:

- `GET /api/cities/current?cities=Delhi,Mumbai`
- `GET /api/cities/:city/current`
- `GET /api/cities/:city/forecast`
- `GET /api/cities/:city/metadata`

This API fetches data from Open-Meteo, normalizes the payload, caches results, and returns fallback or stale responses when the upstream source fails.

## Main Sections

- `Hero`: live Delhi AQI, source metadata, animated intro
- `AQIStrip`: top-level air quality summary
- `IndiaHeatmap`: map-based city exploration
- `CityComparison`: tabbed city dashboard with charts and sharing
- `PollutionSources`: breakdown of major pollution contributors
- `HealthImpact`: health context tied to AQI conditions
- `TrendCharts`: forecast and pollutant trend analysis
- `CallToAction`: awareness and action messaging

## Tech Stack

### Core

- React 18
- TypeScript
- Vite
- Tailwind CSS

### UI and Motion

- Framer Motion
- GSAP
- Lenis
- Radix UI
- shadcn/ui patterns

### Data and Charts

- SWR
- Recharts
- React Simple Maps

### Additional UI Libraries

- Lucide React
- Sonner
- Three.js
- React Three Fiber

## Local Setup

### Requirements

- Node.js `18+`
- npm `9+`

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

## Windows Quick Start

The repository includes `start.bat`. This launcher is portable-first.

It will:

- use normal Windows PowerShell as the bootstrap engine
- auto-download a portable Node.js runtime into `.portable/` if Node is not installed
- install dependencies only when package files change
- rebuild the production bundle only when source files change
- start a local preview server on the next free port from `5173` to `5193`
- open the app in the browser automatically

Run:

```bat
start.bat
```

Zip handoff flow:

1. extract the zip
2. open the project folder
3. run `start.bat`

No manual `npm install` step is required for normal use.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Script Summary

- `npm run dev`: start the Vite development server
- `npm run build`: run TypeScript compilation and create a production build
- `npm run preview`: preview the production build locally
- `npm run lint`: run ESLint checks

## Project Structure

```text
AIRLENCE/
  public/
    images/                # visual assets and optimized webp images
    india-states.json      # map geo/support data
  server/
    air-quality-api.ts     # local API adapter, cache, fallback logic
  src/
    api/                   # frontend API client
    components/
      charts/              # chart components
      cursor/              # custom cursor
      layout/              # navigation and footer
      maps/                # India map and city markers
      motion/              # shared motion helpers
      sections/            # page sections
      ui/                  # reusable UI primitives
    data/                  # static AQI, health, and source content
    hooks/                 # app hooks
    lib/                   # utility, animation, and config helpers
    services/              # AQI calculation helpers
    styles/                # global styles
    types/                 # shared TypeScript models
    App.tsx                # main page composition
    main.tsx               # app entry
  docs/                    # internal notes on animations and components
  start.bat                # portable Windows launcher
  tools/
    check_portable.mjs     # project and port validation
    smart_deps.mjs         # install only when dependency inputs change
    portable_bootstrap.mjs # rebuild only when source inputs change
```

## Build and Preview

Production build:

```bash
npm run build
```

Local preview:

```bash
npm run preview
```

## Why This Project Matters

AIRLENS INDIA turns raw pollution data into something easier to understand and act on. It gives users more than a number:

- how severe the air quality is
- which cities are under greater risk
- what the trend looks like
- what pollutants are contributing
- what the health implications are

## Repository Notes

- Product name: `AIRLENS INDIA`
- Package name: `airlens-india`
- Folder name: `AIRLENCE`

GitHub repository names cannot contain spaces, so the package and repository naming may differ from the product name.
