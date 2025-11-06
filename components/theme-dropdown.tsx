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

export default function ThemeDropdown({
  fixedLabelWidth = false,
}: {
  fixedLabelWidth?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const MENU_WIDTH = 192;

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
  }, []);

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

  const currentTheme = resolvedTheme || theme || "light";
  const selectedTheme =
    themes.find((t) => t.value === currentTheme) || themes[0];
  const IconComponent = selectedTheme.icon;

  return (
    <div className="relative" data-theme-dropdown>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm text-foreground hover:bg-foreground/10 transition-all duration-200 cursor-pointer w-auto"
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
                  className="bg-popover border border-border rounded-md shadow-lg overflow-hidden"
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
                            <div className="font-medium">
                              {themeOption.label}
                            </div>
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
                </motion.div>,
                document.body,
              )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
