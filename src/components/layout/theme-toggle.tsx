"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEasterEggs } from "@/components/layout/easter-egg-provider";

export function ThemeToggle() {
  const { registerThemeToggle } = useEasterEggs();
  function toggle() {
    const root = document.documentElement;
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* Theme remains usable when storage is unavailable. */
    }
    registerThemeToggle();
  }

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
    >
      <MoonStar aria-hidden className="theme-light-icon size-[18px]" />
      <SunMedium aria-hidden className="theme-dark-icon size-[18px]" />
    </button>
  );
}
