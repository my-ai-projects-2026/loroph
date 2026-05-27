"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Prevent hydration mismatch — render a placeholder with the same dimensions
    return (
      <button
        id="theme-toggle"
        aria-label="Toggle theme"
        className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-(--color-glass-stroke) bg-(--color-surface-card)/40 backdrop-blur-md cursor-pointer"
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      id="theme-toggle"
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        relative flex items-center justify-center w-9 h-9 rounded-xl
        border border-(--color-glass-stroke)
        bg-(--color-surface-card)/40 backdrop-blur-md
        cursor-pointer
        transition-all duration-300
        hover:border-(--color-electric-blue)/40
        hover:shadow-[0_0_14px_rgba(0,102,255,0.25)]
        active:scale-90
        group
      "
    >
      <Sun
        className={`
          w-4 h-4 absolute
          transition-all duration-500 ease-in-out
          ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}
          text-amber-500
        `}
      />
      <Moon
        className={`
          w-4 h-4 absolute
          transition-all duration-500 ease-in-out
          ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}
          text-indigo-300
        `}
      />
    </button>
  );
}
