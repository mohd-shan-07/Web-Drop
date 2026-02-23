"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />; // Spacer to prevent layout shift

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 transition-all duration-300 scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-5 w-5 transition-all duration-300 scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
    </button>
  );
}