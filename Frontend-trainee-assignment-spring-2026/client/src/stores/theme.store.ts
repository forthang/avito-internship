import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  colorMode: 'light' | 'dark';
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorMode: 'light',
      toggle: () =>
        set((state) => ({
          colorMode: state.colorMode === 'light' ? 'dark' : 'light',
        })),
    }),
    { name: 'theme-mode' },
  ),
);
