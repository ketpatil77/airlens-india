import { useEffect, useRef } from "react";
import { useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MagneticHoverReturn = {
  ref: React.RefObject<HTMLElement>;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
};

export const useMagneticHover = (): MagneticHoverReturn => {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const springX = useSpring(0, { stiffness: 150, damping: 15 });
  const springY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      springX.set(0);
      springY.set(0);
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > 80) {
        springX.set(0);
        springY.set(0);
        return;
      }

      springX.set(deltaX * 0.4);
      springY.set(deltaY * 0.4);
    };

    const handleMouseLeave = () => {
      springX.set(0);
      springY.set(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion, springX, springY]);

  return { ref, springX, springY };
};
