"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Sparkles } from "lucide-react";

interface BackgroundToggleProps {
  className?: string;
}

export default function BackgroundToggle({
  className = "",
}: BackgroundToggleProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("background-animation");
      const shouldEnable = stored !== null ? stored === "true" : true;
      setIsEnabled(shouldEnable);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("background-animation", isEnabled.toString());

    document.documentElement.setAttribute(
      "data-background-enabled",
      isEnabled.toString(),
    );

    document.documentElement.style.setProperty(
      "--initial-background-opacity",
      isEnabled ? "0.6" : "0",
    );

    window.dispatchEvent(
      new CustomEvent("background-animation-change", {
        detail: { enabled: isEnabled },
      }),
    );
  }, [isEnabled, mounted]);

  const toggleBackground = useCallback(() => {
    setIsEnabled((prev) => !prev);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md transform-gpu flex items-center justify-center">
        <Sparkles className="w-4 h-4 opacity-50 stroke-1" />
      </div>
    );
  }

  const getButtonClasses = () => {
    const baseClasses = "transition-all duration-400 ease-[cubic-bezier(0.4, 0, 0.2, 1)]";
    
    if (!isEnabled) {
      if (theme === 'rose-pine') {
        return `${baseClasses} text-muted-foreground/60 hover:bg-[#c4a7e7]/50 hover:text-foreground/80`;
      }
      if (theme === 'dark') {
        return `${baseClasses} text-muted-foreground/60 hover:bg-white/20 hover:text-foreground/80`;
      }
      return `${baseClasses} text-muted-foreground/60 hover:bg-black/20 hover:text-foreground/80`;
    }

    switch (theme) {
      case "light":
        return `${baseClasses} bg-black/90 text-white ring-1 ring-border/20 hover:bg-black/80`;
      case "rose-pine":
        return `${baseClasses} bg-[#c4a7e7]/90 text-black ring-1 ring-[#c4a7e7]/20 hover:bg-[#c4a7e7]/80`;
      case "dark":
        return `${baseClasses} bg-white/90 text-black ring-1 ring-border/20 hover:bg-white/80`;
      default:
        return `${baseClasses} bg-white/90 text-black ring-1 ring-border/20 hover:bg-white/80`;
    }
  };

  return (
    <button
      className={`w-9 h-9 rounded-lg transform-gpu flex items-center justify-center ${getButtonClasses()} ${className}`}
      onClick={toggleBackground}
      aria-label={
        isEnabled
          ? "Disable background animation"
          : "Enable background animation"
      }
      title={
        isEnabled
          ? "Disable background animation"
          : "Enable background animation"
      }
    >
      <Sparkles
        className="w-4 h-4 transition-all duration-400 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
        style={
          !isEnabled
            ? {
                opacity: 2,
                strokeWidth: 1,
              }
            : {
                transform: "scale(1.3)",
                filter: "drop-shadow(0 0 2px rgba(255,255,255,0.3))",
              }
        }
      />
    </button>
  );
}
