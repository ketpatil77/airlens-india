import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap.config";

export type LenisController = {
  lenis: Lenis;
  destroy: () => void;
};

export const setupLenis = (): LenisController => {
  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    smoothTouch: false,
    lerp: 0.09,
  });

  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });

  const update = (time: number): void => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    },
  };
};
