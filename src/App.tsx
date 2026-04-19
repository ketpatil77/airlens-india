import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "sonner";
import { AirLensCursor } from "@/components/cursor/AirLensCursor";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { AQIStrip } from "@/components/sections/AQIStrip";
import { HealthAdvisoryRail } from "@/components/sections/HealthAdvisoryRail";
import { Hero } from "@/components/sections/Hero";
import { CityDetailsBottomSheet } from "@/components/ui/CityDetailsBottomSheet";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCommandPaletteStore } from "@/hooks/useCommandPaletteStore";
import { SectionErrorBoundary } from "@/components/ui/SectionErrorBoundary";
import { initLenis } from "@/lib/lenis.setup";

// U7: React.lazy for all heavy below-fold sections
const IndiaHeatmap    = lazy(() => import("@/components/sections/IndiaHeatmap").then((m) => ({ default: m.IndiaHeatmap })));
const CityComparison  = lazy(() => import("@/components/sections/CityComparison").then((m) => ({ default: m.CityComparison })));
const PollutionSources = lazy(() => import("@/components/sections/PollutionSources").then((m) => ({ default: m.PollutionSources })));
const HealthImpact    = lazy(() => import("@/components/sections/HealthImpact").then((m) => ({ default: m.HealthImpact })));
const TrendCharts     = lazy(() => import("@/components/sections/TrendCharts").then((m) => ({ default: m.TrendCharts })));
const CallToAction    = lazy(() => import("@/components/sections/CallToAction").then((m) => ({ default: m.CallToAction })));

export default function App() {

  useEffect(() => {
    const lenis = initLenis();
    return () => {
      lenis?.destroy();
    };
  }, []);

  // U6: Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        useCommandPaletteStore.getState().toggle();
      }
      if (e.key === "Escape") {
        useCommandPaletteStore.getState().close();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <TooltipProvider>
      <div className="bg-void text-ivory">
        <AirLensCursor />
        <Navigation />
        <HealthAdvisoryRail />
        <main>
          <Hero />
          <AQIStrip />
          
          {/* Gradient Divider */}
          <div className="h-24 w-full bg-gradient-to-b from-transparent via-hazard/[0.02] to-transparent" />
          
          <Suspense fallback={<SectionSkeleton height="700px" />}>
            {/* IndiaHeatmap now receives setSelectedCity to handle item clicks */}
            <SectionErrorBoundary sectionName="India Air Map">
              <IndiaHeatmap />
            </SectionErrorBoundary>
          </Suspense>
          
          {/* Gradient Divider */}
          <div className="h-24 w-full bg-gradient-to-b from-transparent via-hazard/[0.02] to-transparent" />
          
          <Suspense fallback={<SectionSkeleton height="700px" />}>
            <SectionErrorBoundary sectionName="City Comparison">
              <CityComparison />
            </SectionErrorBoundary>
          </Suspense>
          
          {/* Gradient Divider */}
          <div className="h-24 w-full bg-gradient-to-b from-transparent via-hazard/[0.02] to-transparent" />
          
          <Suspense fallback={<SectionSkeleton height="500px" />}>
            <SectionErrorBoundary sectionName="Pollution Sources">
              <PollutionSources />
            </SectionErrorBoundary>
          </Suspense>
          
          {/* Gradient Divider */}
          <div className="h-24 w-full bg-gradient-to-b from-transparent via-hazard/[0.02] to-transparent" />
          
          <Suspense fallback={<SectionSkeleton height="600px" />}>
            <SectionErrorBoundary sectionName="Health Impact">
              <HealthImpact />
            </SectionErrorBoundary>
          </Suspense>
          
          {/* Gradient Divider */}
          <div className="h-24 w-full bg-gradient-to-b from-transparent via-hazard/[0.02] to-transparent" />
          
          <Suspense fallback={<SectionSkeleton height="500px" />}>
            <SectionErrorBoundary sectionName="Trend Analysis">
              <TrendCharts />
            </SectionErrorBoundary>
          </Suspense>
          
          {/* Gradient Divider */}
          <div className="h-24 w-full bg-gradient-to-b from-transparent via-hazard/[0.02] to-transparent" />
          
          <Suspense fallback={<SectionSkeleton height="400px" />}>
             <SectionErrorBoundary sectionName="Action Plate">
              <CallToAction />
            </SectionErrorBoundary>
          </Suspense>
        </main>
        <Footer />
      </div>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: { background: "#0D1117", border: "1px solid rgba(255,107,53,0.25)", color: "#E6EDF3" },
        }}
      />
      {/* U6: Command Palette - mounted at root so it overlays everything */}
      <CommandPalette />
      <CityDetailsBottomSheet />
    </TooltipProvider>
  );
}

