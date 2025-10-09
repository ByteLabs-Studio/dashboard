"use client";

import React, { useEffect, useState } from "react";
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
    description:
      "Natural pine, soho vibes",
    color: "#ebbcba",
  },
];

export default function ThemeDropdown() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-theme-dropdown]")) {
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

  const currentTheme = resolvedTheme || theme || "light";
  const selectedTheme =
    themes.find((t) => t.value === currentTheme) || themes[0];
  const IconComponent = selectedTheme.icon;

  return (
    <div className="relative" data-theme-dropdown>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-foreground/10 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative w-4 h-4 flex-shrink-0">
          <IconComponent className="w-4 h-4" />
        </div>
        <span className="hidden sm:inline">{selectedTheme.label}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-lg z-50 overflow-hidden"
              data-framer-motion
            >
              <div className="py-1">
                {themes.map((themeOption) => {
                  const ThemeIcon = themeOption.icon;
                  const isSelected = themeOption.value === currentTheme;

                  return (
                    <button
                      key={themeOption.value}
                      onClick={() => {
                        setTheme(themeOption.value);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
                        isSelected
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-popover-foreground"
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <ThemeIcon className="w-4 h-4" />
                        {themeOption.value === "rose-pine" && (
                          <div
                            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                            style={{ backgroundColor: themeOption.color }}
                          />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{themeOption.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {themeOption.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full border border-border/50"
                          style={{ backgroundColor: themeOption.color }}
                        />
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
