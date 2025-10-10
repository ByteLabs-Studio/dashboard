"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import DashboardActions from "@components/dashboard-actions";
import Plasma from "./Plasma";
import PerformanceDebug from "@components/performance-debug";

const DISCORD_INVITE =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_DISCORD_INVITE) ||
  "https://discord.gg/vortexbot";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto w-full px-6">{children}</div>;
}

export default function HomePage() {
  const [backgroundEnabled, setBackgroundEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  const deviceQuality = useMemo(() => {
    if (typeof window === "undefined") return "high";

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

    if (!gl) return "medium";

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    const hasHighDPR = window.devicePixelRatio > 1.5;
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
    <div className="bg-background text-foreground antialiased relative min-h-screen">
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

      <main
        className={`py-12 pb-28 md:pb-32 relative z-10 transition-opacity duration-300 ${
          contentLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Container>
          <section className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                ByteLabs
              </h1>
              <p className="mt-4 text-muted-foreground max-w-xl">
                Code. Sound. Visualize — ByteLab is an App made with Electron
                desgined to create Music or just Audio in general just by using
                Bytes.
              </p>

              <DashboardActions />
            </div>

            <div>
              <div className="rounded-lg border border-border p-6 bg-card/80 backdrop-blur-sm shadow-sm">
                <h3 className="font-semibold">Quick overview</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>• Version: v1.1.0 Public Release</li>
                  <li>• Contributors: 3</li>
                  <li>• Status: Active Development</li>
                </ul>
                <div className="mt-6" />
              </div>
            </div>
          </section>
        </Container>
      </main>

      {process.env.NODE_ENV === "development" && (
        <PerformanceDebug
          show={showDebug}
          onToggle={() => setShowDebug(!showDebug)}
        />
      )}
    </div>
  );
}
