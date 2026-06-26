"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import SunIcon from "@/components/icons/sun";
import MoonIcon from "@/components/icons/moon";

export default function ThemeControl() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDark(storedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark === true);
  }, [isDark]);

  return (
    <Button size="icon" variant="ghost" onClick={() => setIsDark(!isDark)}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
