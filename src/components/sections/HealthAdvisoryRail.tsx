import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cityAQIData, getAQIColor } from "@/data/aqi-data";

/**
 * U11 — Health Advisory Horizontal Rail
 * Performance Features:
 * - rAF loop for slow auto-scroll (mutation via transform)
 * - touch-action: pan-x for mobile swipe
 * - GPU acceleration via transform/will-change
 * - Pauses on hover
 */
export function HealthAdvisoryRail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // Get top 5 most polluted cities for the rail
  const topFive = [...cityAQIData].sort((a, b) => b.aqi - a.aqi).slice(0, 5);

  const getAdvisory = (aqi: number) => {
    if (aqi > 300) return "Avoid all outdoor physical activities.";
    if (aqi > 200) return "Reduce prolonged or heavy exertion.";
    if (aqi > 100) return "Sensitive groups should limit exertion.";
    return "Ideal for outdoor activities.";
  };

  // IntersectionObserver to pause animation when rail is off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isVisible) return;

    let startTime = performance.now();
    let scrollPos = 0;

    const animate = (time: number) => {
      if (isPaused || !isVisible || !scrollRef.current) return;
      
      const delta = time - startTime;
      startTime = time;
      
      // Slow scroll effect (0.05px per ms approx)
      scrollPos -= 0.04 * (delta / 16.67); 
      
      // Reset scroll position to loop infinitely
      // (Using a double-list approach for seamless loop)
      const firstSetWidth = scrollRef.current.scrollWidth / 2;
      if (Math.abs(scrollPos) >= firstSetWidth) {
        scrollPos = 0;
      }

      scrollRef.current.style.transform = `translateX(${scrollPos}px) translateZ(0)`;
      requestAnimationFrame(animate);
    };

    const requestId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestId);
  }, [isPaused, isVisible]);

  return (
    <div 
      ref={containerRef}
      className="relative mt-[86px] z-30 w-full overflow-hidden border-y border-hazard/10 bg-void/80 backdrop-blur-md"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex w-full overflow-x-auto no-scrollbar pointer-events-auto select-none">
        <div 
          ref={scrollRef}
          className="flex whitespace-nowrap py-3 px-4 will-change-transform"
          style={{ transform: "translateZ(0)" }}
        >
          {/* Double content for seamless loop */}
          {[...topFive, ...topFive].map((city, idx) => {
            const color = getAQIColor(city.aqi);
            return (
              <motion.div
                key={`${city.city}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-3 px-6 border-r border-hazard/10 last:border-r-0"
              >
                <span 
                  className="h-2 w-2 rounded-full animate-pulse" 
                  style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                />
                <span className="font-display text-[12px] font-bold text-ivory uppercase">
                  {city.city}:
                </span>
                <span className="font-mono text-[12px] font-bold" style={{ color }}>
                  {city.aqi} AQI
                </span>
                <span className="font-body text-[11px] text-muted tracking-tight">
                  {getAdvisory(city.aqi)}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
