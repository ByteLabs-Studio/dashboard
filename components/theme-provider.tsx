"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Custom hook to check if theme is ready
export function useThemeReady() {
  const [mounted, setMounted] = React.useState(false);
  const [themeReady, setThemeReady] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    // Check if theme is already initialized
    const isReady = document.documentElement.hasAttribute("data-theme-ready");
    setThemeReady(isReady);

    if (!isReady) {
      // Wait for theme initialization
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-theme-ready"
          ) {
            setThemeReady(true);
            observer.disconnect();
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme-ready"],
      });

      return () => observer.disconnect();
    }
  }, []);

  return mounted && themeReady;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    // Ensure theme is marked as ready
    if (!document.documentElement.hasAttribute("data-theme-ready")) {
      document.documentElement.setAttribute("data-theme-ready", "true");
    }
  }, []);

  // Prevent flash by not rendering until mounted and theme is ready
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
