"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Sparkles } from "lucide-react";

export default function BackgroundToggle() {
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

  return (
    <button
      className={`w-9 h-9 rounded-md transform-gpu flex items-center justify-center transition-all duration-200 ${
        isEnabled 
          ? "hover:bg-muted/10" 
          : ""
      }`}
      onClick={toggleBackground}
      aria-label={isEnabled ? "Disable background animation" : "Enable background animation"}
      title={isEnabled ? "Disable background animation" : "Enable background animation"}
    >
      <Sparkles 
        className="w-4 h-4" 
        style={!isEnabled ? { 
          opacity: 0.5, 
          strokeWidth: 1 
        } : undefined} 
      />
    </button>
  );
}
