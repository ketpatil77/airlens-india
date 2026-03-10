import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    const update = (): void => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return prefersReducedMotion;
};
