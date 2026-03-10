export const DURATIONS = {
  instant: 0.15,
  fast: 0.24,
  base: 0.4,
  slow: 0.7,
  cinematic: 1.2,
} as const;

export const EASINGS = {
  standard: [0.25, 0.1, 0.25, 1],
  drift: [0.22, 1, 0.36, 1],
  reveal: [0.16, 1, 0.3, 1],
  reluctant: [0.28, 0.84, 0.42, 1],
} as const;

export const STAGGER = {
  tight: 0.06,
  base: 0.12,
  relaxed: 0.2,
} as const;
