import { useInView as useFramerInView } from "framer-motion";
import { useRef } from "react";

export function useInView(amount = 0.3) {
  const ref = useRef(null);
  const inView = useFramerInView(ref, { once: true, amount });
  return { ref, inView };
}
