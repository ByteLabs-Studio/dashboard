"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import FunctionStyles from '../components/FunctionStyles';
import AudioWarningModal from '../components/AudioWarningModal';

type Sample = {
  id: string;
  name: string;
  formula: string;
  description?: string;
  category: string;
  tempo?: number;
  duration?: number;
};

const SAMPLES: Sample[] = [
  {
    id: "classic-1",
    name: "Classic Bytebeat (8kHz)",
    formula: "t&t>>8",
    description:
      "A compact classic using shifts and OR for melodic motion. Playing at 8000 Hz for a lo-fi effect.",
    category: "Classic Bytebeats",
    tempo: 1.0,
    duration: 4
  },
  {
    id: "bitwise-1",
    name: "Crackle Bass (8kHz)",
    formula:
      "(t*((t&4096?(t%65536<59392?7:(t&7)):16)^(1&(t>>14)))>>(3&-t>>((t&2048)?2:10)))|((t&16384)?((t&4096)?10:3):2)",
    description:
      "Layered bitwise operations for a crunchy bass texture. Playing at 8000 Hz for a lo-fi effect.",
    category: "Bitwise Patterns",
    tempo: 1.0,
    duration: 4
  },
  {
    id: "float-1",
    name: "Floatbeat (32kHz)",
    formula:
      "Math.sin(100*Math.pow(2,(-t/2048%8)))/2+Math.tan(Math.cbrt(Math.sin(t*[1,0,2,4,0,2,3,2,1.5,2,1,0,2,3,2,1.5][t>>13&15]/41)))/[2,3,4,6,8,12,16,24][t/[1,1.5][t>>12&1]>>10&7]/4+Math.cbrt(Math.asin(Math.sin(t/[2,3,2.5,4][t>>16&3]/41)))/6",
    description:
      "Complex floatbeat with evolving harmonics and modulation. Playing at 32,000 Hz for higher fidelity.",
    category: "Floatbeat",
    tempo: 1.0,
    duration: 8
  },
  {
    id: "float-2",
    name: "Techno Floatbeat (48kHz)",
    formula:
      "(t=>{let d=0;const b=Math.floor(t*1.5/16384),M=[0,0,0,0,-2,-2,-2,-2,-5,-7,-5,-3,-2,-2,-2,-2][b&15],c=(n,x,y)=>{const m=440*Math.pow(2,1/12)**n/48e3;return(x(y(t*4*m%4))+x(y(t*4*1.49*m%4)))/Math.max(2,t*1.5%((b&7)>5?32768:16384)/499)},lp=(inp,w)=>{if(w==0)return inp;const out=inp+d;d=out/(1+1/w);return d/w},cb=c(M,Math.asin,Math.sin)*1.2,k=Math.min(1,Math.max(-1,Math.tan(Math.sin(Math.sqrt(t*1.5%32768)/2))*(1-t*1.5%32768/32768)*2))/1.3,h=Math.sin(t**7)/Math.max(1,(t+32768)*1.5%32768/500)*(t*1.5&16384?1:0),s=lp(Math.sin((t>>2)**7),3)*(t*1.5&32768?.4:0)/Math.max(.5,(t+65536)*1.5%65536/3000),bass=Math.min(1,Math.max(-1,Math.asin(Math.sin(t*Math.PI*110*Math.pow(2,1/12)**(t*1.5&131072?5:0)/48e3))*4))/2.5;return((cb+bass)*(t*1.5&16384?1:(t*1.5%32768/16384))+k+h+s)/1.1})(t)",
    description:
      "Techno-style floatbeat with drums and bass. Playing at 48,000 Hz for studio quality.",
    category: "Floatbeat",
    tempo: 1.5,
    duration: 8
  },
  {
    id: "perc-1",
    name: "Percussion-ish (8kHz)",
    formula: "((t*(t>>5|t>>8))>>(t>>16))&255",
    description:
      "Short transient hits derived from bit tricks. Playing at 8000 Hz for a lo-fi effect.",
    category: "Percussion",
    tempo: 1.0,
    duration: 2
  },
  {
    id: "exp-1",
    name: "Experimental Noise (8kHz)",
    formula: "((t*5) ^ (t>>7)) & 255",
    description: "Noisy XOR patterns masked to the low byte.",
    category: "Experimental",
    tempo: 1.0,
    duration: 4
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(SAMPLES.map((s) => s.category))),
];

function clamp(v: number, a = -1, b = 1) {
  return Math.max(a, Math.min(b, v));
}

export default function FunctionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [query, setQuery] = useState<string>("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [samples, setSamples] = useState<Sample[]>(SAMPLES);

  const audioCtxRef = useRef<AudioContext | null>(null);
  type AudioNodeType = AudioBufferSourceNode | AudioWorkletNode;
  const sourceRef = useRef<AudioNodeType | null>(null);

  useEffect(() => {
    return () => {
      try {
        if (sourceRef.current) {
          const node = sourceRef.current;
          try {
            if ('stop' in node && typeof node.stop === 'function') {
              node.stop();
            }
          } catch {}
          try {
            if (typeof node.disconnect === 'function') {
              node.disconnect();
            }
          } catch {}
          try {
            if ('port' in node && node.port && typeof node.port.postMessage === 'function') {
              node.port.postMessage({ command: "stop" });
            }
          } catch {}
          sourceRef.current = null;
        }
      } catch {}
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return samples.filter((s) => {
      if (selectedCategory !== "All" && s.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.formula.toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, query, samples]);

  function safeWriteClipboard(text: string) {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).catch(() => {});
  }

  async function stopPlayback() {
    try {
      if (sourceRef.current) {
        const node = sourceRef.current;
        try {
          if ('stop' in node && typeof node.stop === 'function') {
            node.stop();
          }
        } catch {}
        try {
          if (typeof node.disconnect === 'function') {
            node.disconnect();
          }
        } catch {}
        try {
          if ('port' in node && node.port && typeof node.port.postMessage === 'function') {
            node.port.postMessage({ command: "stop" });
          }
        } catch {}
        sourceRef.current = null;
      }
    } catch (error) {
      console.error('Error stopping playback:', error);
    } finally {
      setPlayingId(null);
    }
  }

  async function playSample(sample: Sample) {
    await stopPlayback();

    try {
      type AudioCtorType = typeof AudioContext;
      const audioWindow = window as unknown as {
        AudioContext?: AudioCtorType;
        webkitAudioContext?: AudioCtorType;
      };
      const AudioCtor = audioWindow.AudioContext ?? audioWindow.webkitAudioContext;

      if (!AudioCtor) {
        alert("Web Audio API is not available in this browser.");
        return;
      }

      const ctx = audioCtxRef.current || new AudioCtor();
      audioCtxRef.current = ctx;

      let fn: (t: number) => number;
      try {
        const mathFuncs = `const { sin, cos, tan, asin, atan, cbrt, pow, sqrt, PI } = Math;`;
        fn = new Function("t", `${mathFuncs} return (${sample.formula});`) as (
          t: number,
        ) => number;
      } catch (error: unknown) {
        console.error("Error parsing formula:", error);
        alert(
          "Invalid formula: " +
            (error instanceof Error ? error.message : String(error)),
        );
        return;
      }

      if (
        ctx.audioWorklet &&
        typeof (window as { AudioWorkletNode?: unknown }).AudioWorkletNode !== "undefined"
      ) {
        const processorName = "bytebeat-processor";
        const moduleCode = `
          class BytebeatProcessor extends AudioWorkletProcessor {
            constructor() {
              super();
              this.t = 0;
              this.tempo = 1.0;
              this.fn = null;
              this.port.onmessage = (e) => {
                if (e.data && e.data.expr) {
                  try {
                    this.fn = new Function('t','Math','return (' + e.data.expr + ');');
                  } catch (err) {
                    this.fn = null;
                  }
                }
                if (e.data && typeof e.data.tempo === 'number') {
                  this.tempo = e.data.tempo;
                }
              };
            }

            process(inputs, outputs, parameters) {
              const out = outputs[0];
              if (!out || !out[0]) return true;
              const channel = out[0];
              for (let i = 0; i < channel.length; i++) {
                let v = 0;
                try {
                  if (this.fn) {
                    const tv = Math.floor(this.t * this.tempo);
                    const raw = this.fn(tv, Math);
                    if (!isFinite(raw) || Number.isNaN(raw)) {
                      v = 0;
                    } else {
                      if (Math.abs(raw) > 3 || Math.floor(raw) === raw) {
                        const asInt = raw | 0;
                        v = (asInt & 255) / 128 - 1;
                      } else {
                        v = Math.max(-1, Math.min(1, Number(raw)));
                      }
                    }
                  }
                } catch (e) {
                  v = 0;
                }
                channel[i] = v;
                this.t++;
              }
              return true;
            }
          }
          registerProcessor('${processorName}', BytebeatProcessor);
        `;

        const blob = new Blob([moduleCode], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        try {
          await ctx.audioWorklet.addModule(url);
        } catch (error: unknown) {
          console.error("Error adding audio worklet module:", error);
          URL.revokeObjectURL(url);
        } finally {
          try {
            URL.revokeObjectURL(url);
          } catch {}
        }

        try {
          const AudioWorkletNode = globalThis.AudioWorkletNode;
          const node = new AudioWorkletNode(
            ctx,
            processorName,
            {
              outputChannelCount: [1],
            },
          );

          node.port.postMessage({ expr: sample.formula, tempo: sample.tempo || 1.0 });

          node.connect(ctx.destination);
          sourceRef.current = node;
          setPlayingId(sample.id);
          return;
        } catch (error: unknown) {
          console.error("Error creating audio worklet node:", error);
        }
      }

      const sampleRate = ctx.sampleRate || 44100;
      const duration = sample.duration || 4;
      const sampleTempo = sample.tempo || 1.0;
      const length = Math.max(1, Math.floor(duration * sampleRate));
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < length; i++) {
        const t = Math.floor(i * sampleTempo);
        let value = 0;
        try {
          const raw = fn(t);
          if (!isFinite(raw) || Number.isNaN(raw)) {
            value = 0;
          } else {
            if (Math.abs(raw) > 3 || Math.floor(raw) === raw) {
              const asInt = raw | 0;
              value = (asInt & 255) / 128 - 1;
            } else {
              value = clamp(Number(raw));
            }
          }
        } catch {}
        data[i] = clamp(value);
      }

      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      src.connect(ctx.destination);
      src.start(0);
      sourceRef.current = src;
      setPlayingId(sample.id);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      alert("Playback failed: " + msg);
    }
  }

  const btnBase =
    "px-3 py-1 rounded-md border border-border bg-card/80 text-xs transition-all duration-150";
  const btnHover =
    "hover:bg-primary/10 hover:border-primary hover:shadow-sm hover:scale-[1.01]";

  return (
    <div className="bg-background text-foreground antialiased min-h-[calc(100vh-4rem)]">
      <AudioWarningModal />
      <FunctionStyles />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
    
          <aside className="hidden lg:block sticky top-28 self-start">
            <div className="functions-sidebar rounded-md border border-border bg-card p-5 shadow-sm w-[220px]">
              <h3 className="text-base font-semibold mb-3">Function Types</h3>
              <nav className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`func-btn ${isSelected ? "selected" : ""} text-left px-3 py-2 rounded-md transition-colors text-sm ${
                        isSelected
                          ? "bg-primary/10 border border-primary text-primary"
                          : "hover:bg-muted/5 text-muted-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-3 border-t border-border/30">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Controls
                </h4>
                <p className="text-xs text-muted-foreground">
                  Adjust tempo and duration for each sample using the controls below each sample.
                </p>
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Functions</h1>
              <p className="text-muted-foreground max-w-2xl mt-2">
                Explore function categories and sample formulas you can try.
                Click Play to preview or Copy to paste into the app.
              </p>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center">
              <input
                placeholder="Search name, formula or description..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 rounded-md border border-border bg-input px-4 py-3 focus:outline-none focus:ring focus:ring-primary/20 text-sm"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("All");
                  }}
                  className={`${btnBase} ${btnHover} rounded-md px-4 py-2`}
                >
                  Reset
                </button>
                <button
                  onClick={() =>
                    safeWriteClipboard(
                      filtered.map((s) => `${s.name}: ${s.formula}`).join("\n"),
                    )
                  }
                  className={`${btnBase} ${btnHover} rounded-md px-4 py-2`}
                >
                  Copy List
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filtered.map((s) => (
                <article
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`rounded-lg border border-border p-6 bg-card shadow-sm flex flex-col justify-between transition-shadow ${selectedId === s.id ? "ring-1 ring-primary/25 shadow-md" : "hover:shadow-lg"}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 pr-4">
                        <h3 className="font-semibold text-lg">{s.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {s.description}
                        </p>
                      </div>

                      <div className="text-right text-xs text-muted-foreground w-36">
                        <div className="mb-2 text-sm">{s.category}</div>
                        <div className="text-sm">
                          <div className="font-medium">Controls</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="text-xs">
                              <div>Tempo: {s.tempo?.toFixed(1)}x</div>
                              <input
                                type="range"
                                min="0.1"
                                max="4"
                                step="0.1"
                                value={s.tempo || 1.0}
                                onChange={(e) => {
                                  const newTempo = parseFloat(e.target.value);
                                  setSamples(samples.map(sample => 
                                    sample.id === s.id ? { ...sample, tempo: newTempo } : sample
                                  ));
                                }}
                                className="w-16"
                              />
                            </div>
                            <div className="text-xs">
                              <div>Dur: {s.duration}s</div>
                              <input
                                type="range"
                                min="1"
                                max="60"
                                step="1"
                                value={s.duration || 4}
                                onChange={(e) => {
                                  const newDuration = parseInt(e.target.value);
                                  setSamples(samples.map(sample => 
                                    sample.id === s.id ? { ...sample, duration: newDuration } : sample
                                  ));
                                }}
                                className="w-16"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <pre className="mt-4 bg-muted/5 rounded-md p-4 text-sm overflow-x-auto leading-relaxed">
                      <code className="text-foreground">{s.formula}</code>
                    </pre>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => safeWriteClipboard(s.formula)}
                      className={`${btnBase} ${btnHover}`}
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => playSample(s)}
                      disabled={playingId === s.id}
                      className={`${btnBase} ${btnHover} ${playingId === s.id ? "bg-green-600/10 border-green-600 text-green-600 hover:scale-105" : "bg-card/80 hover:border-primary hover:scale-105"}`}
                    >
                      {playingId === s.id ? "Playing..." : "Play"}
                    </button>
                    <button
                      onClick={stopPlayback}
                      className={`${btnBase} ${btnHover}`}
                    >
                      Stop
                    </button>
                    <button
                      onClick={() =>
                        safeWriteClipboard(`// ${s.name}\n${s.formula}`)
                      }
                      className={`${btnBase} ${btnHover}`}
                    >
                      Copy as Snippet
                    </button>
                    <div className="ml-auto text-xs text-muted-foreground" />
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-8 text-center text-muted-foreground">
                No functions match your search.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
