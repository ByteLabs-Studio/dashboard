"use client";

import React, { useState, useEffect } from "react";

interface PerformanceStats {
  fps: number;
  memoryUsage?: number;
  frameTime: number;
  timestamp: number;
}

export function usePerformanceMonitor(enabled: boolean = false) {
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [frames, setFrames] = useState<number[]>([]);

  useEffect(() => {
    if (!enabled) return;

    let animationId: number;
    let lastTime = performance.now();
    const frameTimes: number[] = [];

    const measureFrame = (currentTime: number) => {
      const frameTime = currentTime - lastTime;
      frameTimes.push(frameTime);

      // Keep only last 60 frames for FPS calculation
      if (frameTimes.length > 60) {
        frameTimes.shift();
      }

      // Update stats every 30 frames (~500ms)
      if (frameTimes.length % 30 === 0) {
        const avgFrameTime =
          frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
        const fps = Math.round(1000 / avgFrameTime);

        let memoryUsage: number | undefined;
        if ("memory" in performance) {
          const memory = (performance as { memory: { usedJSHeapSize: number } })
            .memory;
          memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024); // MB
        }

        setStats({
          fps,
          frameTime: Math.round(avgFrameTime * 100) / 100,
          memoryUsage,
          timestamp: currentTime,
        });

        setFrames([...frameTimes]);
      }

      lastTime = currentTime;
      animationId = requestAnimationFrame(measureFrame);
    };

    animationId = requestAnimationFrame(measureFrame);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [enabled]);

  return { stats, frames };
}

interface PerformanceDebugProps {
  show: boolean;
  onToggle: () => void;
}

export default function PerformanceDebug({
  show,
  onToggle,
}: PerformanceDebugProps) {
  const { stats } = usePerformanceMonitor(show);

  if (!show) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 bg-black/50 text-white px-3 py-2 rounded text-xs hover:bg-black/70 transition-colors"
      >
        Show Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg text-xs font-mono max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Performance</h3>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>

      {stats ? (
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>FPS:</span>
            <span
              className={
                stats.fps < 30
                  ? "text-red-400"
                  : stats.fps < 50
                    ? "text-yellow-400"
                    : "text-green-400"
              }
            >
              {stats.fps}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Frame Time:</span>
            <span>{stats.frameTime}ms</span>
          </div>
          {stats.memoryUsage && (
            <div className="flex justify-between">
              <span>Memory:</span>
              <span>{stats.memoryUsage}MB</span>
            </div>
          )}
          <div className="mt-2 pt-2 border-t border-gray-600">
            <div className="text-gray-400 text-xs">
              Quality: {getQualityTier()}
            </div>
            <div className="text-gray-400 text-xs">
              WebGL: {hasWebGL() ? "Yes" : "No"}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-400">Measuring...</div>
      )}
    </div>
  );
}

function getQualityTier(): string {
  if (typeof window === "undefined") return "unknown";

  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

  if (!gl) return "low";

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  const hasGoodGPU = gl.getParameter(gl.MAX_TEXTURE_SIZE) >= 4096;
  const hasWebGL2 = gl instanceof WebGL2RenderingContext;

  if (isMobile && !hasGoodGPU && !hasWebGL2) return "medium";
  if (!isMobile || (hasGoodGPU && hasWebGL2)) return "high";
  return "medium";
}

function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
}
