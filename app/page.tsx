"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import DashboardActions from "@components/dashboard-actions";
import Plasma from "./Plasma";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto w-full px-6 select-none">{children}</div>;
}

export default function HomePage() {
  const [backgroundEnabled, setBackgroundEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);
  const [theme, setTheme] = useState<string>("light");
  const [remountKey, setRemountKey] = useState(0);

  // Force remount of Plasma component when theme changes
  useEffect(() => {
    setRemountKey(prev => prev + 1);
  }, [theme]);

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
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme);

    const themeObserver = new MutationObserver(() => {
    const newTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(newTheme);
    });

    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

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
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        {mounted && contentLoaded && (
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-out ${
              backgroundEnabled && animationReady ? "opacity-60" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 w-full h-full">
              <Plasma
                key={`plasma-${theme}-${remountKey}`}
                color={
                  theme === "dark"
                    ? "#333333" // Dark
                    : theme === "rose-pine"
                    ? "#D375DF" // Rose-Pine
                    : "#FFFFFF" // Light
                }
                speed={1.0}
                opacity={1.0}
                mouseInteractive={false}
                quality={deviceQuality}
              />
            </div>
          </div>
        )}
      </div>

      <div className={`relative flex-grow transition-opacity duration-300 ${
        contentLoaded ? "opacity-100" : "opacity-0"
      }`}>
        <div className="pt-20 pb-16">
        <Container>
          <div className="flex flex-col md:flex-row items-start justify-center h-full gap-8 px-6">
            <div className="w-full md:w-1/2 text-center md:text-left select-none">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-3 select-none">
                <span className="text-primary">ByteLabs</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-3 select-none">
              Code. Sound. Visualize — ByteLabs is an App made with Electron designed
              to create Music or just Audio in general just by using Bytes.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <DashboardActions />
              </div>
            </div>

            <div className="w-full md:w-1/2 pt-1.5 select-none">
              <div className="rounded-lg border border-border p-8 bg-card/80 backdrop-blur-sm shadow-sm h-full select-none">
                <h3 className="font-semibold text-lg">Quick Overview</h3>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span>
                    <span>Version: v1.1.0 Initial Release</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span>
                    <span>Developers: 3</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span>
                    <span>Status: Rust Rewrite</span>
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
        
        <div className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How ByteBeats Work</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the magic behind algorithmically generated music
              </p>
            </div>
            
            <div className="space-y-8 max-w-3xl mx-auto">
              <div className="flex items-start p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-0.5">
                  <span className="text-primary font-medium">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">The Math Behind the Music</h3>
                  <p className="text-muted-foreground">
                    Byte beats work by using short programs that generate audio as a function of time, 
                    typically producing sound in a loop. These programs use mathematical operations to create musical patterns, 
                    with each output representing a sample of sound played at specific intervals.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-0.5">
                  <span className="text-primary font-medium">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Bitwise Operations</h3>
                  <p className="text-muted-foreground">
                    The magic comes from <strong>bitwise operations</strong> (like <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) applied to a simple counter variable. 
                    These operations manipulate the binary data in unique ways, turning the counter into intricate, often musical patterns. 
                    This is what gives Bytebeats their distinctive glitchy, 8-bit sound.
                    However, if you change the type of counter or use different kinds of operations—for example, using floating-point math instead of integers—you
                    get a variation known as <strong>Floatbeat</strong>, which can produce smoother or more fluid sounds.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-0.5">
                  <span className="text-primary font-medium">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">The ByteLabs Difference</h3>
                  <p className="text-muted-foreground">
                    ByteLabs aims to capture the simplicity of Bytebeats and the creative power of bitwise operations 
                    in a user-friendly application that is both intuitive and accessible. 
                    Inspired by <a href="https://dollchan.net/bytebeat/" className="text-primary hover:underline">Dollchan&apos;s Bytebeat Composer</a>, 
                    ByteLabs expands on the concept by offering an offline experience 
                    designed for creators who want to experiment, compose, and explore sound without limitations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-0.5">
                  <span className="text-primary font-medium">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Endless Possibilities</h3>
                  <p className="text-muted-foreground">
                    From simple beeps to intricate musical patterns, the possibilities are virtually limitless. 
                    You can blend different formulas, experiment with effects, and craft evolving soundscapes that grow and change over time.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
