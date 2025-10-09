"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function BackgroundToggle() {
  const [mounted, setMounted] = useState(false);
  const [isEnabled, setIsEnabled] = useState(() => {
    // Get initial state from data attribute to prevent flash
    if (typeof document !== "undefined") {
      const dataAttr = document.documentElement.getAttribute(
        "data-background-enabled",
      );
      return dataAttr === "true";
    }
    return true;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Save to localStorage
    localStorage.setItem("background-animation", isEnabled.toString());

    // Update the data attribute
    document.documentElement.setAttribute(
      "data-background-enabled",
      isEnabled.toString(),
    );

    // Dispatch custom event for other components to listen to
    window.dispatchEvent(
      new CustomEvent("background-animation-change", {
        detail: { enabled: isEnabled },
      }),
    );
  }, [isEnabled, mounted]);

  const toggleBackground = () => {
    setIsEnabled(!isEnabled);
  };

  if (!mounted) {
    return <div className="w-9 h-9 bg-muted/50 animate-pulse rounded-md" />;
  }

  return (
    <button
      onClick={toggleBackground}
      className={`inline-flex items-center justify-center rounded-md p-2 text-sm transition-all duration-200 hover:bg-foreground/10 ${
        isEnabled ? "text-foreground" : "text-muted-foreground"
      }`}
      aria-label={`${isEnabled ? "Disable" : "Enable"} background animation`}
      title={`${isEnabled ? "Disable" : "Enable"} background animation`}
    >
      <div className="relative w-4 h-4 flex-shrink-0">
        {isEnabled ? (
          <Sparkles className="w-4 h-4" />
        ) : (
          <Sparkles className="w-4 h-4 opacity-50 stroke-1" />
        )}
      </div>
    </button>
  );
}
