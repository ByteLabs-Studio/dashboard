"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import DashboardActions from "@components/dashboard-actions";
import Plasma from "./Plasma";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto w-full px-6">{children}</div>;
}

export default function HomePage() {
  const [backgroundEnabled, setBackgroundEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);

  const deviceQuality = useMemo(() => {
    if (typeof window === "undefined") return "high";

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

    if (!gl) return "medium";

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    const hasGoodGPU = gl.getParameter(gl.MAX_TEXTURE_SIZE) >= 4096;
    const hasWebGL2 = gl instanceof WebGL2RenderingContext;

    if (isMobile && !hasGoodGPU && !hasWebGL2) return "medium";
    if (!isMobile || (hasGoodGPU && hasWebGL2)) return "high";
    return "medium";
  }, []);

  const handleBackgroundChange = useCallback((event: CustomEvent) => {
    setBackgroundEnabled(event.detail.enabled);
  }, []);

  useEffect(() => {
    const dataAttr = document.documentElement.getAttribute(
      "data-background-enabled",
    );
    const initialEnabled = dataAttr !== null ? dataAttr === "true" : true;
    setBackgroundEnabled(initialEnabled);

    setMounted(true);

    const contentTimer = setTimeout(() => {
      setContentLoaded(true);

      const animationTimer = setTimeout(() => {
        setAnimationReady(true);
      }, 100);

      return () => clearTimeout(animationTimer);
    }, 50);

    window.addEventListener(
      "background-animation-change",
      handleBackgroundChange as EventListener,
    );

    return () => {
      clearTimeout(contentTimer);
      window.removeEventListener(
        "background-animation-change",
        handleBackgroundChange as EventListener,
      );
    };
  }, [handleBackgroundChange]);

  return (
    <div className="bg-background text-foreground antialiased relative h-[calc(100vh-4rem)] overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-out ${
          mounted && contentLoaded && backgroundEnabled && animationReady
            ? "opacity-60"
            : "opacity-0"
        }`}
        data-plasma-background
        style={{
          willChange: animationReady ? "contents" : "auto",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {mounted && contentLoaded && (
          <Plasma
            color="#D375DF"
            speed={1.0}
            opacity={1.0}
            mouseInteractive={false}
            quality={deviceQuality}
          />
        )}
      </div>

      <div className={`relative h-full transition-opacity duration-300 ${
        contentLoaded ? "opacity-100" : "opacity-0"
      }`}>
        <div className="pt-20">
        <Container>
          <div className="flex flex-col md:flex-row items-start justify-center h-full gap-8 px-6">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-3">
                <span className="text-primary">ByteLabs</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-3">
              Code. Sound. Visualize — ByteLabs is an App made with Electron desgined
              to create Music or just Audio in general just by using Bytes.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <DashboardActions />
              </div>
            </div>

            <div className="w-full md:w-1/2 pt-1.5">
              <div className="rounded-lg border border-border p-8 bg-card/80 backdrop-blur-sm shadow-sm h-full">
                <h3 className="font-semibold text-lg">Quick Overview</h3>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span>
                    <span>Version: v1.1.0 Public Release</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span>
                    <span>Contributors: 3</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span>
                    <span>Status: Active Development</span>
                  </li>
                  <li className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-muted"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-2 text-xs uppercase tracking-wider text-muted-foreground">
                        Developers Note
                      </span>
                    </div>
                  </li>
                  <li className="text-sm text-muted-foreground mb-4 text-center px-4">
                    This website is being constantly updated. The ByteLabs app will not have any active releases until the Rust rewrite is complete. Please be patient.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
        </div>
      </div>
    </div>
  );
}
