import { useRef } from "react";
import { useInView as useMotionInView } from "framer-motion";

type InViewOptions = {
  once?: boolean;
  margin?: string;
  amount?: number | "some" | "all";
};

export const useInView = (options: InViewOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useMotionInView(ref, {
    once: options.once ?? true,
    margin: options.margin,
    amount: options.amount ?? 0.3,
  });

  return { ref, inView };
};
