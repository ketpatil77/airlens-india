import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initLenis() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  const lenis = new Lenis({
    lerp: 0.08,
    duration: 0.75,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    orientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });

  let rafId = 0;

  const onScroll = () => {
    ScrollTrigger.update();
  };

  const raf = (time: number) => {
    lenis.raf(time);
    rafId = window.requestAnimationFrame(raf);
  };

  lenis.on("scroll", onScroll);
  rafId = window.requestAnimationFrame(raf);

  return {
    destroy() {
      window.cancelAnimationFrame(rafId);
      lenis.off("scroll", onScroll);
      lenis.destroy();
    },
  };
}
