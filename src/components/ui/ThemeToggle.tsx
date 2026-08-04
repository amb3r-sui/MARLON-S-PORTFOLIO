"use client";

import { Desktop, Moon, Sun } from "@phosphor-icons/react";
import { useSyncExternalStore } from "react";

type ThemePreference = "system" | "light" | "dark";

const order: ThemePreference[] = ["system", "light", "dark"];

function nextPreference(preference: ThemePreference): ThemePreference {
  return order[(order.indexOf(preference) + 1) % order.length] ?? "system";
}

function applyPreference(preference: ThemePreference) {
  const system = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.dataset.theme = preference === "system" ? system : preference;
}

export function ThemeToggle() {
  const preference = useSyncExternalStore<ThemePreference>(
    (notify) => {
      window.addEventListener("portfolio-theme-change", notify);
      const media = window.matchMedia("(prefers-color-scheme: light)");
      const handleSystemChange = () => {
        if (document.documentElement.dataset.themePreference === "system") {
          applyPreference("system");
          notify();
        }
      };
      media.addEventListener("change", handleSystemChange);
      return () => {
        window.removeEventListener("portfolio-theme-change", notify);
        media.removeEventListener("change", handleSystemChange);
      };
    },
    () => (document.documentElement.dataset.themePreference as ThemePreference) || "system",
    () => "system",
  );

  function toggleTheme() {
    const next = nextPreference(preference);
    applyPreference(next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      // The visual preference still applies when storage is unavailable.
    }
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }

  const Icon = preference === "system" ? Desktop : preference === "dark" ? Moon : Sun;
  const next = nextPreference(preference);

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Theme: ${preference}. Switch to ${next}.`}>
      <Icon size={17} weight="bold" />
      <span>{preference}</span>
    </button>
  );
}
