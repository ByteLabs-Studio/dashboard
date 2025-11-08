"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Monitor, Sparkles, Stars, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

type BackgroundType = "galaxy" | "plasma" | "none";

const backgrounds = [
  {
    value: "galaxy",
    label: "Galaxy",
    icon: Stars,
    description: "Interactive star field",
  },
  {
    value: "plasma",
    label: "Plasma",
    icon: Sparkles,
    description: "Colorful plasma effect",
  },
  {
    value: "none",
    label: "None",
    icon: Monitor,
    description: "No background effect",
  },
];

export function BackgroundSelector() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [background, setBackground] = useState<BackgroundType>("galaxy");
  
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const MENU_WIDTH = 192;

  const updatePos = useCallback(() => {
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

  // Load saved background preference
  useEffect(() => {
    const savedBackground = localStorage.getItem("background") as BackgroundType | null;
    if (savedBackground) {
      setBackground(savedBackground);
    }
    setMounted(true);
  }, []);

  // Save background preference and notify other components
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("background", background);
    window.dispatchEvent(new CustomEvent("background-change", { detail: { background } }));
  }, [background, mounted]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickedInsideButton = !!target.closest("[data-background-selector]");
      const clickedInsidePortal = !!target.closest(
        "[data-background-selector-portal]"
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

  const selectedBackground = backgrounds.find(bg => bg.value === background) || backgrounds[0];
  const IconComponent = selectedBackground.icon;

  return (
    <div className="relative" data-background-selector>
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
        <span className="hidden sm:inline-block text-center w-20 min-w-[40px]">
          {selectedBackground.label}
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
                  data-background-selector-portal
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
                    {backgrounds.map((bg) => {
                      const BgIcon = bg.icon;
                      const isSelected = bg.value === background;

                      return (
                        <button
                          key={bg.value}
                          onClick={() => {
                            setBackground(bg.value as BackgroundType);
                            setIsOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
                            isSelected
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-popover-foreground"
                          }`}
                        >
                          <div className="relative flex-shrink-0">
                            <BgIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium">{bg.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {bg.description}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          )}
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
