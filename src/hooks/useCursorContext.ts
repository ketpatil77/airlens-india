import { useSyncExternalStore } from "react";

export type CursorVariant = "default" | "hover" | "cta" | "map" | "drag";

type CursorStore = {
  variant: CursorVariant;
};

const store: CursorStore = {
  variant: "default",
};

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const emit = () => {
  listeners.forEach((listener) => listener());
};

export const setCursorVariant = (variant: CursorVariant) => {
  if (store.variant === variant) {
    return;
  }

  store.variant = variant;
  emit();
};

export const useCursorContext = (): {
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
} => {
  const variant = useSyncExternalStore(
    subscribe,
    () => store.variant,
    () => "default" as CursorVariant,
  );

  return {
    variant,
    setVariant: setCursorVariant,
  };
};
