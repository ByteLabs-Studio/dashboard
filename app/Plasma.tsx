"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: "forward" | "reverse" | "pingpong";
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
  quality?: "low" | "medium" | "high";
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const vertex = `#version 300 es
precision mediump float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Optimized fragment shader with adjustable iterations
const fragment = `#version 300 es
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
uniform float uIterations;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;

  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);

  float i = 0.0, d, z = 0.0, T = iTime * uSpeed * uDirection;
  vec3 O = vec3(0.0), p, S;

  for (vec2 r = iResolution.xy, Q; i < uIterations; i += 1.0, O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y));
    p.z -= 4.;
    S = p;
    d = p.y-T;

    p.x += .6*(1.+p.y)*sin(d + p.x*0.15)*cos(.5*d + p.x*0.08);
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T));
    z+= d = abs(sqrt(length(Q*Q)) - .35*(4.+S.y))/2.5+1e-3;
    o = 1.2+sin(S.y+p.z*.8+S.z-length(S-p)+vec4(2,1,0,8));
  }

  o.xyz = tanh(O/5e3);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);

  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor * 1.5;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));

  float alpha = (length(rgb) + 0.3) * uOpacity;
  fragColor = vec4(finalColor * 1.2, alpha);
}`;

// Debounce utility
const debounce = (func: (...args: unknown[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility
const throttle = (func: (...args: unknown[]) => void, limit: number) => {
  let inThrottle: boolean;
  return (...args: unknown[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const Plasma: React.FC<PlasmaProps> = ({
  color = "#ffffff",
  speed = 1,
  direction = "forward",
  scale = 1,
  opacity = 1,
  mouseInteractive = true,
  quality = "medium",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);
  const animationFrameRef = useRef<number>(0);

  // Quality settings
  const qualitySettings = useMemo(() => {
    switch (quality) {
      case "low":
        return {
          dpr: 0.75,
          iterations: 35,
          targetFps: 45,
          antialias: false,
        };
      case "high":
        return {
          dpr: Math.min(window.devicePixelRatio || 1, 2),
          iterations: 60,
          targetFps: 60,
          antialias: true,
        };
      default: // medium
        return {
          dpr: 1,
          iterations: 50,
          targetFps: 60,
          antialias: false,
        };
    }
  }, [quality]);

  // Throttled mouse move handler
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (!mouseInteractive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current.x = e.clientX - rect.left;
      mousePos.current.y = e.clientY - rect.top;
    }, 16), // ~60fps
    [mouseInteractive],
  );

  // Visibility API to pause when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    let renderer: unknown = null;
    let mesh: unknown = null;
    let lastTime = 0;
    const frameInterval = 1000 / qualitySettings.targetFps;

    const initialize = async () => {
      try {
        const { Renderer, Program, Mesh, Triangle } = await import("ogl");

        const useCustomColor = color ? 1.0 : 0.0;
        const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];
        const directionMultiplier = direction === "reverse" ? -1.0 : 1.0;

        renderer = new Renderer({
          webgl: 2,
          alpha: true,
          antialias: qualitySettings.antialias,
          dpr: qualitySettings.dpr,
          powerPreference: "low-power", // Better for battery life
        });

        const gl = renderer.gl;
        const canvas = gl.canvas as HTMLCanvasElement;
        canvas.style.display = "block";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.willChange = "contents"; // Optimize for frequent repaints
        currentContainer.appendChild(canvas);

        const geometry = new Triangle(gl);

        const program = new Program(gl, {
          vertex: vertex,
          fragment: fragment,
          uniforms: {
            iTime: { value: 0 },
            iResolution: { value: new Float32Array([1, 1]) },
            uCustomColor: { value: new Float32Array(customColorRgb) },
            uUseCustomColor: { value: useCustomColor },
            uSpeed: { value: speed * 0.8 },
            uDirection: { value: directionMultiplier },
            uScale: { value: scale },
            uOpacity: { value: Math.min(opacity * 1.5, 1.0) },
            uMouse: { value: new Float32Array([0, 0]) },
            uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 },
            uIterations: { value: qualitySettings.iterations },
          },
        });

        mesh = new Mesh(gl, { geometry, program });

        if (mouseInteractive) {
          currentContainer.addEventListener("mousemove", handleMouseMove, {
            passive: true,
          });
        }

        // Debounced resize handler
        const setSize = debounce(() => {
          if (!currentContainer) return;
          const rect = currentContainer.getBoundingClientRect();
          const width = Math.max(1, Math.floor(rect.width));
          const height = Math.max(1, Math.floor(rect.height));
          renderer.setSize(width, height);
          const res = program.uniforms.iResolution.value as Float32Array;
          res[0] = gl.drawingBufferWidth;
          res[1] = gl.drawingBufferHeight;
        }, 100);

        const ro = new ResizeObserver(setSize);
        ro.observe(currentContainer);
        setSize();

        const t0 = performance.now();

        // Frame-rate limited render loop
        const loop = (currentTime: number) => {
          if (!isVisibleRef.current) {
            animationFrameRef.current = requestAnimationFrame(loop);
            return;
          }

          // Frame rate limiting
          if (currentTime - lastTime >= frameInterval) {
            const timeValue = (currentTime - t0) * 0.001;

            if (direction === "pingpong") {
              const cycle = Math.sin(timeValue * 0.5) * directionMultiplier;
              program.uniforms.uDirection.value = cycle;
            }

            // Update mouse position
            if (mouseInteractive) {
              const mouseUniform = program.uniforms.uMouse
                .value as Float32Array;
              mouseUniform[0] = mousePos.current.x;
              mouseUniform[1] = mousePos.current.y;
            }

            program.uniforms.iTime.value = timeValue;
            renderer.render({ scene: mesh });

            lastTime = currentTime;
          }

          animationFrameRef.current = requestAnimationFrame(loop);
        };

        animationFrameRef.current = requestAnimationFrame(loop);

        return { ro };
      } catch (error) {
        console.error("Failed to initialize Plasma:", error);
      }
    };

    const cleanup = initialize();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      cleanup.then((result) => {
        if (result) {
          result.ro.disconnect();
        }
        if (mouseInteractive) {
          currentContainer.removeEventListener("mousemove", handleMouseMove);
        }
      });
      try {
        if (currentContainer.firstChild) {
          currentContainer.removeChild(currentContainer.firstChild);
        }
      } catch {}
    };
  }, [
    color,
    speed,
    direction,
    scale,
    opacity,
    mouseInteractive,
    qualitySettings,
    handleMouseMove,
  ]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      style={{ contain: "layout style paint" }} // CSS containment for performance
    />
  );
};

export default Plasma;
