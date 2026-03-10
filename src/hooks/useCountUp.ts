import { useEffect, useMemo, useState } from "react";

export const useCountUp = (target: number, duration = 1600): number => {
  const [value, setValue] = useState(0);

  const frameDuration = useMemo(() => 1000 / 60, []);

  useEffect(() => {
    const frames = Math.max(Math.round(duration / frameDuration), 1);
    let frame = 0;
    let rafId = 0;

    const tick = (): void => {
      frame += 1;
      const next = Math.round((target * frame) / frames);
      setValue(next);

      if (frame < frames) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [duration, frameDuration, target]);

  return value;
};
