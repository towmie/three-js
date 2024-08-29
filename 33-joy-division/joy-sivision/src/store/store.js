import { create } from "zustand";

export const useStore = create((set) => ({
  isPlaying: false,
  setIsPlaying: (value) => set({ isPlaying: value }),
}));
