import { motion, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useCursorContext, type CursorVariant } from "@/hooks/useCursorContext";

type CursorConfig = {
  dotSize: number;
  dotColor: string;
  ringSize: number;
  ringBorder: string;
  label?: string;
};

const variants: Record<CursorVariant, CursorConfig> = {
  default: {
    dotSize: 10,
    dotColor: "#FF6B35",
    ringSize: 40,
    ringBorder: "rgba(255,107,53,0.6)",
  },
  hover: {
    dotSize: 20,
    dotColor: "#FF6B35",
    ringSize: 64,
    ringBorder: "rgba(255,107,53,0.9)",
  },
  cta: {
    dotSize: 24,
    dotColor: "#C0392B",
    ringSize: 72,
    ringBorder: "rgba(192,57,43,0.8)",
    label: "GO",
  },
  map: {
    dotSize: 12,
    dotColor: "#FF6B35",
    ringSize: 80,
    ringBorder: "rgba(255,107,53,0.4)",
  },
  drag: {
    dotSize: 16,
    dotColor: "#58A6FF",
    ringSize: 56,
    ringBorder: "rgba(88,166,255,0.6)",
    label: "DRAG",
  },
};

export function AirLensCursor() {
  const { variant } = useCursorContext();
  const [enabled, setEnabled] = useState(false);
  const cursor = useMemo(() => variants[variant], [variant]);

  const dotX = useSpring(0, { stiffness: 1500, damping: 40 });
  const dotY = useSpring(0, { stiffness: 1500, damping: 40 });
  const ringX = useSpring(0, { stiffness: 400, damping: 28 });
  const ringY = useSpring(0, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => setEnabled(!mediaQuery.matches);

    const onMove = (event: MouseEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      ringX.set(event.clientX);
      ringY.set(event.clientY);
    };

    update();
    mediaQuery.addEventListener("change", update);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", update);
      window.removeEventListener("mousemove", onMove);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: cursor.dotSize,
          height: cursor.dotSize,
          backgroundColor: cursor.dotColor,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          width: cursor.ringSize,
          height: cursor.ringSize,
          borderColor: cursor.ringBorder,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {cursor.label ? (
          <span className="font-mono text-[9px] tracking-widest text-ivory">{cursor.label}</span>
        ) : null}
      </motion.div>
    </>
  );
}
