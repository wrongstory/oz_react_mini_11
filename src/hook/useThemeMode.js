import { useEffect, useState } from "react";

export default function useThemeMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isInitiallyDark =
      storedTheme === "dark" || (!storedTheme && prefersDark);
    setIsDark(isInitiallyDark);
    document.documentElement.classList.toggle("dark", isInitiallyDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDark);
  };

  return { isDark, toggleTheme };
}
