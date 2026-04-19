import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps extends React.ComponentPropsWithoutRef<"span"> {
  value: number;
  startValue?: number;
  delay?: number;
  decimalPlaces?: number;
  startOnView?: boolean;
}

export function NumberTicker({
  value,
  startValue = 0,
  delay = 0,
  decimalPlaces = 0,
  startOnView = true,
  className,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(startValue);
  const spring = useSpring(motionValue, {
    damping: 34,
    stiffness: 80,
  });
  const inView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    const shouldStart = startOnView ? inView : true;
    if (!shouldStart) return;

    const timer = window.setTimeout(() => {
      motionValue.set(value);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [delay, inView, motionValue, startOnView, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (!ref.current) return;
      ref.current.textContent = new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(Number(latest.toFixed(decimalPlaces)));
    });
  }, [decimalPlaces, spring]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)} {...props}>
      {startValue}
    </span>
  );
}
