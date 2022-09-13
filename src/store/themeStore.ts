import create from "zustand";
import { persist } from "zustand/middleware";
import zustand from "zustand";

type ThemeStore = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useDarkTheme = create(
  persist<ThemeStore>(
    (set, get) => ({
      theme: "light",
      toggleTheme: () =>
        set((prevState) => ({
          theme: get().theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "dark-theme",
      getStorage: () => sessionStorage,
    }
  )
);
