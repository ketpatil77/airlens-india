import { create } from "zustand";

interface CommandPaletteStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * U6 — Zustand store for Command Palette open/close state.
 * Global — can be triggered from anywhere (keyboard, nav button, etc.)
 */
export const useCommandPaletteStore = create<CommandPaletteStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
