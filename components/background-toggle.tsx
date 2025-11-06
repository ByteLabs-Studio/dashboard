"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Sparkles } from "lucide-react";

interface BackgroundToggleProps {
  className?: string;
}

export default function BackgroundToggle({ className = '' }: BackgroundToggleProps) {
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
    setIsEnabled(prev => !prev);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md transform-gpu flex items-center justify-center">
        <Sparkles className="w-4 h-4 opacity-50 stroke-1" />
      </div>
    );
  }

  const getButtonClasses = () => {
    if (!isEnabled) return 'text-muted-foreground/60 hover:text-foreground/80 hover:bg-muted/50';
    
    switch(theme) {
      case 'light':
        return 'bg-black/90 text-white ring-1 ring-border/20';
      case 'rose-pine':
        return 'bg-[#c4a7e7] text-[#191724] ring-1 ring-[#c4a7e7]/30';
      case 'dark':
      default:
        return 'bg-white/90 text-black ring-1 ring-border/20';
    }
  };

  return (
    <button
      className={`w-9 h-9 rounded-lg transform-gpu flex items-center justify-center transition-all duration-200 ${getButtonClasses()} ${className}`}
      onClick={toggleBackground}
      aria-label={isEnabled ? "Disable background animation" : "Enable background animation"}
      title={isEnabled ? "Disable background animation" : "Enable background animation"}
    >
      <Sparkles 
        className="w-4 h-4 transition-transform duration-200" 
        style={!isEnabled ? { 
          opacity: 0.5, 
          strokeWidth: 1 
        } : { 
          transform: 'scale(1.1)',
          filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))'
        }} 
      />
    </button>
  );
}
