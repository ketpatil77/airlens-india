import { useEffect, useRef, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { MorphingText } from "@/components/ui/morphing-text";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Particles } from "@/components/ui/particles";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { Vortex } from "@/components/ui/vortex";
import { getAQIStatus } from "@/data/aqi-data";
import { useAirQuality } from "@/hooks/useAirQuality";
import { useLastUpdated } from "@/hooks/useLastUpdated";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { configureGsap, gsap, ScrollTrigger } from "@/lib/gsap.config";
import { resolveAQIValue } from "@/services/pollutionService";

const heroSkylineImage = "/images/optimized/hero-smog.webp";

const stats = [
  { value: "142M", label: "People in Severe AQI Zones" },
  { value: "18", label: "Indian Cities in Top 30 Polluted" },
  { value: "1.6M", label: "Deaths Per Year From Air Pollution" },
];

export function Hero() {
  const [mobile, setMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const smogOverlayRef = useRef<HTMLDivElement>(null);
  const aqiNumberRef = useRef<HTMLSpanElement>(null);
  const { data: delhiAirQuality, message, isLoading, source } = useAirQuality("Delhi");
  const heroAqi = resolveAQIValue(delhiAirQuality?.aqi, 287);
  const heroStatus = getAQIStatus(heroAqi);
  const { relativeLabel } = useLastUpdated();
  const marqueeTexts = [
    `DELHI - AQI ${heroAqi} - ${heroStatus.toUpperCase()}`,
    "KANPUR - AQI 312 - SEVERE",
    "PATNA - AQI 334 - SEVERE",
    "INDIA - 680M EXPOSED TODAY",
    "REAL-TIME AIR QUALITY DATA",
  ];
  const reducedMotion = useReducedMotion();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const onResize = (): void => {
      setMobile(window.innerWidth < 768);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || !heroRef.current) {
      return;
    }

    configureGsap();

    const context = gsap.context(() => {
      const heatmap = document.getElementById("heatmap");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=200vh",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          preventOverlaps: true,
        },
      });

      timeline.to(".hero-particles", { opacity: 1, duration: 0.3, willChange: "opacity" }, 0);
      if (aqiNumberRef.current) {
        timeline.to(aqiNumberRef.current, { color: "#C0392B", duration: 0.5, ease: "none", willChange: "color" }, 0);
      }
      if (heroTextRef.current) {
        timeline.to(
          heroTextRef.current,
          { opacity: 0, filter: "blur(12px)", y: -40, duration: 0.4, ease: "power2.in", willChange: "transform, opacity" },
          0.2,
        );
      }
      if (smogOverlayRef.current) {
        timeline.fromTo(
          smogOverlayRef.current,
          { opacity: 0, y: "60%" },
          { opacity: 0.55, y: "0%", duration: 0.4, ease: "power1.inOut", willChange: "transform, opacity" },
          0.4,
        );
      }
      if (heatmap) {
        timeline.fromTo(
          heatmap,
          { y: "80px", opacity: 0, filter: "blur(8px)" },
          { y: "0px", opacity: 1, filter: "blur(0px)", duration: 0.4, ease: "power2.out", willChange: "transform, opacity" },
          0.6,
        );
      }
      if (smogOverlayRef.current) {
        timeline.to(smogOverlayRef.current, { opacity: 0, duration: 0.2, ease: "power1.out", willChange: "opacity" }, 0.8);
      }
    }, heroRef);

    return () => {
      context.revert();
      ScrollTrigger.getById("hero")?.kill();
    };
  }, [reducedMotion]);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-[100vh] overflow-hidden border-b border-hazard/10 pt-24">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-35"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(8,10,15,0.94), rgba(8,10,15,0.52)), url(${heroSkylineImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      {!mobile && !reducedMotion && <Vortex className="hidden md:block z-0" opacity={0.12} />}

      {(mobile || reducedMotion) ? (
        <Particles quantity={20} color="#FF6B35" size={0.6} ease={72} staticity={34} className="hero-particles z-[1]" />
      ) : (
        <>
          <Particles quantity={140} color="#FF6B35" size={0.55} ease={72} staticity={34} className="hero-particles z-[1]" />
          <Particles quantity={80} color="#7D8590" size={0.35} ease={56} staticity={54} className="hero-particles z-[1] opacity-35" />
          <Particles quantity={40} color="#C0392B" size={1} ease={88} staticity={72} className="hero-particles z-[1] opacity-20" />
        </>
      )}

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,107,53,0.07), transparent), linear-gradient(to top, #080A0F 0%, transparent 55%), linear-gradient(to bottom, rgba(8,10,15,0.5) 0%, transparent 25%)",
        }}
      />

      <div
        ref={smogOverlayRef}
        className="smog-overlay absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(192,57,43,0.7) 0%, rgba(255,107,53,0.4) 30%, transparent 70%)",
          opacity: 0,
        }}
      />

      <div className="relative z-[3] mx-auto flex min-h-[calc(100vh-96px)] w-[min(1520px,100%-2rem)] items-end pb-16 md:pb-20">
        <div ref={heroTextRef} className="hero-text-layer max-w-[760px] md:pl-6">
          <BlurFade delay={0.2}>
            <div className="w-full max-w-[520px] overflow-hidden rounded-full border border-hazard/20 bg-surface2/70 px-4 py-2 text-left backdrop-blur">
              <MorphingText
                texts={marqueeTexts}
                className="h-5 max-w-none text-left font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-hazard lg:h-5 lg:text-[11px]"
              />
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="mt-4 flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Delhi AQI</span>
              <span ref={aqiNumberRef} className="hero-aqi-number" aria-live="polite" aria-label={`Current Delhi AQI is ${heroAqi}`}>
                <NumberTicker
                  value={heroAqi}
                  startValue={heroAqi}
                  className="font-mono text-[clamp(64px,12vw,160px)] font-black leading-none text-hazard"
                />
              </span>
              <span 
                className="w-fit rounded-full border border-critical/30 bg-critical/10 px-3 py-1 font-display text-[13px] tracking-wide text-critical"
                role="status"
              >
                {isLoading ? "LOADING" : message ? "AQI UNAVAILABLE" : heroStatus.toUpperCase()}
              </span>
              {/* U4+U5: source badge + last updated */}
              <div className="mt-1.5 flex items-center gap-2">
                <DataSourceBadge source={source} size="xs" />
                <span className="font-mono text-[9px] text-muted/50">{relativeLabel}</span>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.8}>
            <div className="mt-6 font-display font-black leading-[0.9]">
              <TextAnimate
                as="h1"
                animation="blurInUp"
                by="character"
                duration={1.3}
                className="block text-[clamp(40px,7vw,72px)] text-ivory"
              >
                {"See What"}
              </TextAnimate>
              <TextAnimate
                as="h1"
                animation="blurInUp"
                by="character"
                delay={0.24}
                duration={1.3}
                className="block text-[clamp(40px,7vw,72px)] italic text-hazard"
              >
                {"You Breathe."}
              </TextAnimate>
            </div>
          </BlurFade>

          <BlurFade delay={1.1}>
            <p className="mt-4 max-w-[440px] font-body text-[15px] leading-[1.7] text-muted">
              India&apos;s most polluted cities. Real data. Real consequences. Understand the air crisis before it&apos;s too late.
            </p>
          </BlurFade>

          <BlurFade delay={1.3}>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <ShimmerButton
                shimmerColor="rgba(255,255,255,0.12)"
                background="#FF6B35"
                shimmerDuration="2.5s"
                borderRadius="6px"
                className="px-8 py-4 font-mono text-[12px] tracking-[0.1em] text-void"
                onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="Explore the live air quality dashboard"
              >
                EXPLORE DASHBOARD -&gt;
              </ShimmerButton>
              <InteractiveHoverButton
                className="rounded border border-ivory/30 px-8 py-4 font-mono text-[12px] text-ivory hover:border-hazard hover:text-hazard"
                onClick={() => document.getElementById("heatmap")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="View the India pollutant heatmap"
              >
                VIEW HEATMAP
              </InteractiveHoverButton>
            </div>
          </BlurFade>


          <BlurFade delay={1.5}>
            <div className="mt-8 flex flex-wrap items-start gap-6 border-t border-hazard/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex max-w-[130px] flex-col gap-1">
                  <span className="font-mono text-[22px] font-bold text-hazard">{stat.value}</span>
                  <span className="font-body text-[11px] uppercase leading-tight tracking-wide text-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>

      <div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        style={{ opacity: scrollProgress > 0.2 ? 0 : 1 - scrollProgress / 0.2 }}
      >
        <span className="mb-2 -rotate-90 font-mono text-[9px] tracking-[0.3em] text-muted">SCROLL</span>
        <div className="h-12 w-[1px] overflow-hidden bg-muted/50">
          <div
            className="h-6 w-full origin-top bg-hazard"
            style={{ transform: `scaleY(${Math.max(0, 1 - scrollProgress)})` }}
          />
        </div>
      </div>
    </section>
  );
}
