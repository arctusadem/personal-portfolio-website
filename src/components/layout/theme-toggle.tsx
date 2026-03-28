"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

import { useEasterEggs } from "@/components/layout/easter-egg-provider";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const { registerThemeToggle } = useEasterEggs();

  useEffect(() => {
    const root = document.documentElement;
    const current = root.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [mounted, theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--surface-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      onClick={() => {
        registerThemeToggle();
        setTheme(nextTheme);
      }}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === "dark" ? <SunMedium className="size-4.5" /> : <MoonStar className="size-4.5" />}
    </button>
  );
}
