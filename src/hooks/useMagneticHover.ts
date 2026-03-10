import { useCallback, useRef, type MouseEvent, type RefObject } from "react";

type MagneticOptions = {
  strength?: number;
};

export const useMagneticHover = (_options: MagneticOptions = {}): {
  elementRef: RefObject<HTMLElement>;
  onMouseMove: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
} => {
  const elementRef = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((_event: MouseEvent<HTMLElement>) => {
    // Phase 3: magnetic hover behavior is implemented globally.
  }, []);

  const onMouseLeave = useCallback(() => {
    // Phase 3: magnetic hover reset is implemented globally.
  }, []);

  return { elementRef, onMouseMove, onMouseLeave };
};
