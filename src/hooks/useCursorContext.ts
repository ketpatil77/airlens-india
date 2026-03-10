export type CursorVariant = "default" | "hover" | "cta" | "map";

export const useCursorContext = (): {
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
} => {
  return {
    variant: "default",
    setVariant: () => {
      // Phase 3: custom cursor context is mounted globally.
    },
  };
};
