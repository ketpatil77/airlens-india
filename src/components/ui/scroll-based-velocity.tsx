import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

interface ScrollBasedVelocityProps {
  text: string;
  velocity?: number;
  className?: string;
}

export function ScrollBasedVelocity({
  text,
  velocity = 3,
  className,
}: ScrollBasedVelocityProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });
  const directionFactor = useRef<number>(1);

  const x = useTransform(baseX, (value) => `${wrap(-25, -75, value)}%`);

  useAnimationFrame((_, delta) => {
    const moveBy = directionFactor.current * velocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    baseX.set(baseX.get() + moveBy + directionFactor.current * moveBy * velocityFactor.get());
  });

  return (
    <div className="w-full overflow-hidden whitespace-nowrap">
      <motion.div className={cn("inline-flex gap-10", className)} style={{ x }}>
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
      </motion.div>
    </div>
  );
}
