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
    setIsEnabled(!isEnabled);
  }, [isEnabled]);

  if (!mounted) {
    const dataAttr =
      typeof document !== "undefined"
        ? document.documentElement.getAttribute("data-background-enabled")
        : null;
    const initialEnabled = dataAttr !== null ? dataAttr === "true" : true;

    return (
      <div
        className={`w-9 h-9 bg-muted/50 rounded-md transform-gpu flex items-center justify-center ${
          initialEnabled ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <Sparkles
          className={`w-4 h-4 ${initialEnabled ? "" : "opacity-50 stroke-1"}`}
        />
      </div>
    );
  }

  return (
    <button
      onClick={toggleBackground}
      className={`inline-flex items-center justify-center rounded-md p-2 text-sm transition-all duration-200 ease-out hover:bg-foreground/10 hover:scale-110 active:scale-95 transform-gpu ${
        isEnabled ? "text-foreground" : "text-muted-foreground"
      }`}
      aria-label={`${isEnabled ? "Disable" : "Enable"} background animation`}
      title={`${isEnabled ? "Disable" : "Enable"} background animation`}
    >
      <div className="relative w-4 h-4 flex-shrink-0">
        {isEnabled ? (
          <Sparkles className="w-4 h-4 transition-transform duration-200 hover:rotate-12" />
        ) : (
          <Sparkles className="w-4 h-4 opacity-50 stroke-1 transition-all duration-200" />
        )}
      </div>
    </button>
  );
}
