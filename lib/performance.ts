"use client";

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage?: number;
  gpuMemoryUsage?: number;
  renderTime: number;
}

interface PerformanceConfig {
  enableLogging?: boolean;
  sampleInterval?: number;
  maxSamples?: number;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

class PerformanceMonitor {
  private config: Required<PerformanceConfig>;
  private frames: number[] = [];
  private renderTimes: number[] = [];
  private lastFrameTime = 0;
  private animationFrame = 0;
  private isRunning = false;
  private startTime = 0;

  constructor(config: PerformanceConfig = {}) {
    this.config = {
      enableLogging: config.enableLogging ?? false,
      sampleInterval: config.sampleInterval ?? 1000,
      maxSamples: config.maxSamples ?? 60,
      onMetricsUpdate: config.onMetricsUpdate ?? (() => {}),
    };
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = performance.now();
    this.lastFrameTime = this.startTime;

    this.measureFrame();
    this.startMetricsCollection();
  }

  stop() {
    if (!this.isRunning) return;

    this.isRunning = false;
    cancelAnimationFrame(this.animationFrame);
  }

  private measureFrame = () => {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const frameTime = currentTime - this.lastFrameTime;

    this.frames.push(frameTime);
    if (this.frames.length > this.config.maxSamples) {
      this.frames.shift();
    }

    this.lastFrameTime = currentTime;
    this.animationFrame = requestAnimationFrame(this.measureFrame);
  };

  private startMetricsCollection() {
    const collectMetrics = () => {
      if (!this.isRunning) return;

      const metrics = this.getMetrics();

      if (this.config.enableLogging) {
        console.log("Performance Metrics:", metrics);
      }

      this.config.onMetricsUpdate(metrics);

      setTimeout(collectMetrics, this.config.sampleInterval);
    };

    collectMetrics();
  }

  getMetrics(): PerformanceMetrics {
    const avgFrameTime =
      this.frames.length > 0
        ? this.frames.reduce((a, b) => a + b, 0) / this.frames.length
        : 0;

    const fps = avgFrameTime > 0 ? 1000 / avgFrameTime : 0;

    const avgRenderTime =
      this.renderTimes.length > 0
        ? this.renderTimes.reduce((a, b) => a + b, 0) / this.renderTimes.length
        : 0;

    let memoryUsage: number | undefined;
    let gpuMemoryUsage: number | undefined;

    if ("memory" in performance) {
      const memory = (performance as { memory: { usedJSHeapSize: number } })
        .memory;
      memoryUsage = memory.usedJSHeapSize / 1024 / 1024;
    }

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (gl && "getExtension" in gl) {
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        if (ext) {
          gpuMemoryUsage = undefined;
        }
      }
    } catch {
    }

    return {
      fps: Math.round(fps * 100) / 100,
      frameTime: Math.round(avgFrameTime * 100) / 100,
      memoryUsage,
      gpuMemoryUsage,
      renderTime: Math.round(avgRenderTime * 100) / 100,
    };
  }

  measureRenderTime<T>(fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();

    this.renderTimes.push(end - start);
    if (this.renderTimes.length > this.config.maxSamples) {
      this.renderTimes.shift();
    }

    return result;
  }

  async measureAsyncRenderTime<T>(fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();

    this.renderTimes.push(end - start);
    if (this.renderTimes.length > this.config.maxSamples) {
      this.renderTimes.shift();
    }

    return result;
  }

  getDeviceCapabilities() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

    if (!gl) {
      return {
        webgl: false,
        webgl2: false,
        maxTextureSize: 0,
        maxViewportDims: [0, 0],
        vendor: "unknown",
        renderer: "unknown",
      };
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");

    return {
      webgl: true,
      webgl2: gl instanceof WebGL2RenderingContext,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
      vendor: debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        : gl.getParameter(gl.VENDOR),
      renderer: debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : gl.getParameter(gl.RENDERER),
    };
  }
}

export const performanceUtils = {
  debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number,
    immediate?: boolean,
  ): T {
    let timeout: NodeJS.Timeout | null = null;

    return ((...args: Parameters<T>) => {
      const later = () => {
        timeout = null;
        if (!immediate) {
          const start = performance.now();
          func(...args);
          const end = performance.now();

          if (end - start > 16) {
            console.warn(`Slow debounced function execution: ${end - start}ms`);
          }
        }
      };

      const callNow = immediate && !timeout;
      clearTimeout(timeout!);
      timeout = setTimeout(later, wait);

      if (callNow) {
        const start = performance.now();
        func(...args);
        const end = performance.now();

        if (end - start > 16) {
          console.warn(`Slow immediate function execution: ${end - start}ms`);
        }
      }
    }) as T;
  },

  throttle<T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number,
  ): T {
    let inThrottle: boolean;

    return ((...args: Parameters<T>) => {
      if (!inThrottle) {
        const start = performance.now();
        func(...args);
        const end = performance.now();

        if (end - start > limit) {
          console.warn(
            `Function execution (${end - start}ms) exceeded throttle limit (${limit}ms)`,
          );
        }

        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    }) as T;
  },

  prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },
  getPerformanceTier(): "low" | "medium" | "high" {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

    if (!gl) return "low";

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    const hasHighDPR = window.devicePixelRatio > 1.5;
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const hasGoodGPU = maxTextureSize >= 4096;

    let hasEnoughMemory = true;
    if ("memory" in performance) {
      const memory = (performance as { memory: { jsHeapSizeLimit: number } })
        .memory;
      hasEnoughMemory = memory.jsHeapSizeLimit > 1024 * 1024 * 1024;
    }

    if (isMobile && (!hasGoodGPU || !hasEnoughMemory)) return "low";
    if (hasHighDPR && hasGoodGPU && hasEnoughMemory) return "high";
    return "medium";
  },

  getTargetFrameRate(): number {
    const tier = this.getPerformanceTier();
    const prefersReduced = this.prefersReducedMotion();

    if (prefersReduced) return 30;

    switch (tier) {
      case "low":
        return 30;
      case "high":
        return 60;
      default:
        return 45;
    }
  },

  createRAFLoop(
    callback: (deltaTime: number, timestamp: number) => void,
    targetFPS?: number,
  ) {
    const target = targetFPS || this.getTargetFrameRate();
    const interval = 1000 / target;

    let lastTime = 0;
    let rafId = 0;

    const loop = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;

      if (deltaTime >= interval - 1) {
        callback(deltaTime, timestamp);
        lastTime = timestamp;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  },
};

export function usePerformanceMonitor(config?: PerformanceConfig) {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics | null>(null);
  const [monitor] = React.useState(
    () =>
      new PerformanceMonitor({
        ...config,
        onMetricsUpdate: (newMetrics) => {
          setMetrics(newMetrics);
          config?.onMetricsUpdate?.(newMetrics);
        },
      }),
  );

  React.useEffect(() => {
    monitor.start();
    return () => monitor.stop();
  }, [monitor]);

  return {
    metrics,
    monitor,
    deviceCapabilities: React.useMemo(
      () => monitor.getDeviceCapabilities(),
      [monitor],
    ),
  };
}

export default PerformanceMonitor;

import React from "react";
