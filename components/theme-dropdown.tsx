"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun, Palette, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
    description: "Clean light theme",
    color: "#f4f4f5",
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
    description: "Classic dark theme",
    color: "#09090b",
  },
  {
    value: "rose-pine",
    label: "Rosé Pine",
    icon: Palette,
    description: "Natural pine, soho vibes",
    color: "#ebbcba",
  },
];

const lightVariableKeys = [
  "--background",
  "--card",
  "--popover",
  "--muted",
  "--secondary",
  "--accent",
  "--border",
  "--input",
];

function applyLightStrength(strength: number, activeTheme: string) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  if (activeTheme !== "light") {
    lightVariableKeys.forEach((key) => root.style.removeProperty(key));
    root.removeAttribute("data-light-strength");
    return;
  }

  const clampedStrength = Math.min(100, Math.max(0, strength));
  const mix = clampedStrength / 100;
  const lerp = (start: number, end: number) => start + (end - start) * mix;

  root.style.setProperty("--background", `oklch(${lerp(0.86, 1).toFixed(3)} 0.003 286.32)`);
  root.style.setProperty("--card", `oklch(${lerp(0.895, 1).toFixed(3)} 0.003 286.32)`);
  root.style.setProperty("--popover", `oklch(${lerp(0.895, 1).toFixed(3)} 0.003 286.32)`);
  root.style.setProperty("--muted", `oklch(${lerp(0.82, 0.967).toFixed(3)} 0.004 286.375)`);
  root.style.setProperty("--secondary", `oklch(${lerp(0.82, 0.967).toFixed(3)} 0.004 286.375)`);
  root.style.setProperty("--accent", `oklch(${lerp(0.82, 0.967).toFixed(3)} 0.004 286.375)`);
  root.style.setProperty("--border", `oklch(${lerp(0.70, 0.92).toFixed(3)} 0.006 286.32)`);
  root.style.setProperty("--input", `oklch(${lerp(0.70, 0.92).toFixed(3)} 0.006 286.32)`);
  root.setAttribute("data-light-strength", String(clampedStrength));
}

export default function ThemeDropdown({
  fixedLabelWidth = false,
}: {
  fixedLabelWidth?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lightStrength, setLightStrength] = useState(88);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const MENU_WIDTH = 304;

  const updatePos = React.useCallback(() => {
    if (!buttonRef.current) return;
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    setPos({
      top: buttonRect.bottom + window.scrollY,
      left: Math.min(
        buttonRect.left + window.scrollX,
        window.innerWidth + window.scrollX - MENU_WIDTH - 8
      ),
    });
  }, []);

  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    updatePos();

    const delayedId = window.setTimeout(() => {
      updatePos();
    }, 260);

    const onResize = () => updatePos();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onResize, { passive: true });

    return () => {
      clearTimeout(delayedId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize);
    };
  }, [isOpen, updatePos]);

  useEffect(() => {
    setMounted(true);
    const storedStrength = Number(localStorage.getItem("lightStrength") || "88");
    setLightStrength(
      Math.min(100, Math.max(0, Number.isFinite(storedStrength) ? storedStrength : 88)),
    );
  }, []);

  const currentTheme = resolvedTheme || theme || "light";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", currentTheme);
      document.documentElement.style.colorScheme =
        currentTheme === "light" ? "light" : "dark";
    }

    applyLightStrength(lightStrength, currentTheme);
  }, [currentTheme, lightStrength]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickedInsideButton = !!target.closest("[data-theme-dropdown]");
      const clickedInsidePortal = !!target.closest(
        "[data-theme-dropdown-portal]",
      );
      if (!clickedInsideButton && !clickedInsidePortal) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  if (!mounted) {
    return <div className="w-24 h-9 bg-muted/50 animate-pulse rounded-md" />;
  }

  const selectedTheme =
    themes.find((t) => t.value === currentTheme) || themes[0];
  const IconComponent = selectedTheme.icon;
  const lightStrengthLabel =
    lightStrength >= 86 ? "Crisp" : lightStrength >= 48 ? "Soft" : "Gray";
  const updateLightStrength = (value: number) => {
    setLightStrength(value);
    localStorage.setItem("lightStrength", String(value));
    applyLightStrength(value, "light");
  };

  return (
    <div className="relative" data-theme-dropdown>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-border/60 bg-background/50 px-3 py-1.5 text-sm text-foreground shadow-sm transition-all duration-200 hover:border-primary/25 hover:bg-foreground/5 cursor-pointer w-auto"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative w-4 h-4 flex-shrink-0">
          <IconComponent className="w-4 h-4" />
        </div>
        <span
          className={`hidden sm:inline-block text-center ${fixedLabelWidth ? "w-20" : "w-auto"} min-w-[40px]`}
        >
          {selectedTheme.label}
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {typeof document !== "undefined" &&
              createPortal(
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                  ref={menuRef}
                  data-theme-dropdown-portal
                  data-framer-motion
                  style={{
                    position: "absolute",
                    top: pos.top,
                    left: pos.left,
                    width: MENU_WIDTH,
                    zIndex: 9999,
                  }}
                  className="overflow-hidden rounded-md border border-border/70 bg-popover/98 shadow-xl shadow-primary/5 backdrop-blur-md"
                >
                  <div className="border-b border-border/60 px-3 py-3">
                    <div className="font-accent text-xs font-semibold uppercase text-primary">
                      theme
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Choose a palette for the dashboard.
                    </div>
                  </div>

                  <div className="space-y-1 p-2">
                    {themes.map((themeOption) => {
                      const ThemeIcon = themeOption.icon;
                      const isSelected = themeOption.value === currentTheme;

                      return (
                        <button
                          key={themeOption.value}
                          onClick={() => {
                            setTheme(themeOption.value);
                            applyLightStrength(lightStrength, themeOption.value);
                          }}
                          className={`w-full rounded-sm border px-3 py-2.5 text-left text-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
                            isSelected
                              ? "border-primary/25 bg-accent text-accent-foreground"
                              : "border-transparent text-popover-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm border border-border/60 bg-background/70">
                              <ThemeIcon className="w-4 h-4" />
                              {themeOption.value === "rose-pine" && (
                                <div
                                  className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full"
                                  style={{ backgroundColor: themeOption.color }}
                                />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium">
                                {themeOption.label}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {themeOption.description}
                              </div>
                            </div>
                            <div
                              className="h-4 w-4 rounded-sm border border-border/50"
                              style={{ backgroundColor: themeOption.color }}
                            />
                            {isSelected && (
                              <div className="h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {currentTheme === "light" && (
                    <div className="border-t border-border/60 p-3">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="font-accent text-xs font-semibold uppercase text-primary">
                            light strength
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {lightStrengthLabel} · {lightStrength}%
                          </div>
                        </div>
                        <div className="h-8 w-8 rounded-sm border border-border/60 bg-background" />
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={lightStrength}
                        onInput={(event) => {
                          updateLightStrength(Number(event.currentTarget.value));
                        }}
                        onChange={(event) => {
                          updateLightStrength(Number(event.target.value));
                        }}
                        className="mt-3 h-2 w-full cursor-pointer accent-primary"
                        aria-label="Light mode strength"
                      />
                      <div className="mt-2 grid grid-cols-3 font-accent text-[10px] uppercase text-muted-foreground">
                        <span>gray</span>
                        <span className="text-center">soft</span>
                        <span className="text-right">crisp</span>
                      </div>
                    </div>
                  )}
                </motion.div>,
                document.body,
              )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
