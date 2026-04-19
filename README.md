# AIRLENS INDIA

AIRLENS INDIA is a public-awareness web experience focused on air quality across India. It turns AQI data into a clearer, more visual product through an interactive map, city comparison panels, health context, trend sections, and action-oriented messaging.

## What This Project Does

AIRLENS INDIA helps users understand:

- how polluted different Indian cities are
- how air quality compares across locations
- what pollution levels mean in practical health terms
- which sources contribute to air pollution
- why AQI trends matter over time

The application is designed as an informative front-end experience rather than a generic dashboard. It combines data storytelling, motion, map-based exploration, and responsive UI patterns.

## Main Features

- Interactive India AQI map with city markers
- City comparison and drill-down sections
- AQI strip and live visual summaries
- Health impact and advisory sections
- Pollution source breakdowns
- Trend visualizations for AQI patterns
- Command palette and supporting UI overlays
- Responsive React UI built for local development and deployment

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- React Simple Maps

## Getting Started

### Requirements

- Node.js 18 or newer
- npm 9 or newer

### Option 1: Start with the Windows launcher

```bat
start.bat
```

This validates the local environment and starts the development server.

### Option 2: Start manually

```bash
npm install
npm run dev
```

Then open:

```text
http://127.0.0.1:5173
```

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Production Build

Create a production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/   # UI, map, chart, layout, and section components
  data/         # AQI and supporting content data
  hooks/        # Reusable React hooks
  lib/          # App utilities and configuration
  services/     # Data access helpers
  styles/       # Global styling
  types/        # Shared TypeScript types
public/         # Static assets
start.bat       # Windows launcher
```

## GitHub Notes

- Project name: `AIRLENS INDIA`
- Package name: `airlens-india`
- GitHub repository names cannot contain spaces, so the repository uses `airlens-india`

## Purpose

This repository is intended to present AIRLENS INDIA as a polished front-end project for air quality awareness, mapping, and environmental storytelling.
