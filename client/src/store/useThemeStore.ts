import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "dark" | "light";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  loadThemeFromStorage: (storageKey: string, defaultTheme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme: Theme) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("vite-ui-theme", theme);
        set({ theme });
      },
      loadThemeFromStorage: (storageKey: string, defaultTheme: Theme) => {
        const storeTheme =
          (localStorage.getItem(storageKey) as Theme) || defaultTheme;
        set({ theme: storeTheme });
      },
      initializeTheme: () => {
        if (typeof window !== "undefined") {
          const storeTheme = localStorage.getItem("vite-ui-theme") as Theme;
          const themeToApply = storeTheme;
          const root = window.document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(themeToApply);
          set({ theme: themeToApply });
        }
      },
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
