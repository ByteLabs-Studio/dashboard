"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Search, Play, Pause, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FunctionStyles from '../components/FunctionStyles';
import AudioWarningModal from '../components/AudioWarningModal';
import ElasticSlider from '../../components/ElasticSlider';
import { Sample, SAMPLES, FREQUENCY_OPTIONS, storage } from './functions';

const CATEGORIES = [
  "All",
  ...Array.from(new Set(SAMPLES.map((s) => s.category))),
];

function clamp(v: number, a = -1, b = 1) {
  return Math.max(a, Math.min(b, v));
}

export default function FunctionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showFormula, setShowFormula] = useState<{open: boolean, formula: string, name: string}>({open: false, formula: '', name: ''});
  const [useHz, setUseHz] = useState<boolean>(storage.getAudioMode() === 'hz');
  const [query, setQuery] = useState<string>("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{[key: string]: boolean}>({});
  const [samples, setSamples] = useState<Sample[]>(() => {
    const lastHz = storage.getLastHz();
    return SAMPLES.map(sample => ({
      ...sample,
      hz: sample.hz || lastHz,
      tempo: sample.tempo || 1.0
    }));
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAudioWarning, setShowAudioWarning] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const filteredSamples = useMemo(() => {
    return samples.filter((sample) => {
      if (selectedCategory && selectedCategory !== 'All' && sample.category !== selectedCategory) {
        return false;
      }
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          sample.name.toLowerCase().includes(term) ||
          sample.description?.toLowerCase().includes(term) ||
          sample.category.toLowerCase().includes(term) ||
          sample.formula.toLowerCase().includes(term)
        );
      }
      
      return true;
    });
  }, [samples, searchTerm, selectedCategory]);

  const toggleHzMode = () => {
    const newUseHz = !useHz;
    setUseHz(newUseHz);
    storage.setAudioMode(newUseHz ? 'hz' : 'tempo');
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (playingId) {
      const sample = samples.find(s => s.id === playingId);
      if (sample) {
        stopPlayback().then(() => {
          setTimeout(() => {
            audioContextRef.current = null;
            playSample(sample);
          }, 100);
        });
      }
    }
  };
  const copyAllFormulas = async () => {
    try {
      const allFormulas = samples.map((s) => s.formula).join('\n\n');
      await navigator.clipboard.writeText(allFormulas);
    } catch (err) {
      console.error('Failed to copy formulas:', err);
    }
  };

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
    
    const currentSample = samples.find(s => s.id === sample.id) || sample;
    
    if (useHz && !currentSample.hz) {
      const updatedSamples = samples.map(s => 
        s.id === currentSample.id 
          ? { ...s, hz: storage.getLastHz() } 
          : s
      );
      setSamples(updatedSamples);
      return;
    }
    
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

      const sampleRate = useHz ? currentSample.hz! : 44100;
      const effectiveTempo = useHz ? 1.0 : (currentSample.tempo || 1.0);
      
      if (useHz) {
        storage.setLastHz(currentSample.hz!);
      }
      const duration = sample.duration || 4;
      const sampleTempo = effectiveTempo;
      const length = Math.max(1, Math.floor(duration * sampleRate));
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < length; i++) {
        const t = useHz 
          ? Math.floor(i * (currentSample.hz! / 44100))
          : Math.floor(i * sampleTempo);
        
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

              <div className="mt-4 pt-3 border-t border-border/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {filteredSamples.length} {filteredSamples.length === 1 ? 'result' : 'results'}
                  </span>
                  {selectedCategory && selectedCategory !== 'All' && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap">
                      {selectedCategory}
                    </span>
                  )}
                </div>
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
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search functions..."
                  className="pl-9 w-full"
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-2 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleHzMode}
                >
                  {useHz ? 'Hertz' : 'Tempo'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyAllFormulas}
                >
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  Copy All
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredSamples.map((s) => (
                <article
                  key={s.id}
                  className={`group relative h-full flex flex-col rounded-xl border border-border/40 bg-card/60 backdrop-blur-sm overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/20 ${
                    selectedId === s.id ? 'ring-2 ring-primary/30 shadow-md' : ''
                  }`}
                >
                  <div className="p-5 pb-3">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{s.name}</h3>
                        <p 
                          className={`text-sm text-muted-foreground mt-1 transition-all duration-200 ${
                            expandedDescriptions[s.id] ? 'line-clamp-none' : 'line-clamp-2 cursor-pointer hover:opacity-80'
                          }`}
                          onClick={() => {
                            setExpandedDescriptions(prev => ({
                              ...prev,
                              [s.id]: !prev[s.id]
                            }));
                          }}
                        >
                          {s.description}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary whitespace-nowrap">
                        {s.category}
                      </span>
                    </div>
                  </div>

                  <div className="px-5 py-2">
                    <div className="mb-1">
                      <span className="text-xs font-medium text-foreground">
                        {useHz 
                          ? `${s.hz ? (s.hz / 1000).toFixed(1) : '44.1'} kHz` 
                          : `${s.tempo?.toFixed(1)}x`}
                      </span>
                    </div>
                    
                    {useHz ? (
                      <select
                        value={s.hz || storage.getLastHz()}
                        onChange={(e) => {
                          const newHz = Number(e.target.value);
                          storage.setLastHz(newHz);
                          
                          setSamples(prevSamples => 
                            prevSamples.map(sample => 
                              sample.id === s.id ? { ...sample, hz: newHz } : sample
                            )
                          );
                          
                          if (playingId === s.id) {
                            stopPlayback().then(() => {
                              setTimeout(() => {
                                const updatedSample = samples.find(samp => samp.id === s.id);
                                if (updatedSample) {
                                  playSample({ ...updatedSample, hz: newHz });
                                }
                              }, 50);
                            });
                          }
                        }}
                        className="w-full p-2 text-sm rounded-md border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {FREQUENCY_OPTIONS.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs text-muted-foreground px-1">
                          <span>Slower</span>
                          <span>Faster</span>
                        </div>
                        <ElasticSlider
                          defaultValue={s.tempo || 1.0}
                          startingValue={0.1}
                          maxValue={4}
                          stepSize={0.1}
                          isStepped={true}
                          className="w-full px-2"
                          leftIcon={<span className="text-xs">-</span>}
                          rightIcon={<span className="text-xs">+</span>}
                          onChange={(value) => {
                            setSamples(samples.map(sample => 
                              sample.id === s.id ? { ...sample, tempo: value } : sample
                            ));
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-auto p-4 pt-2 border-t border-border/20 bg-muted/5">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playSample(s);
                        }}
                        disabled={playingId === s.id}
                        className={`inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border transition-all duration-150 ${
                          playingId === s.id
                            ? 'bg-green-500/10 border-green-500/30 text-green-600 cursor-not-allowed'
                            : 'bg-primary/5 border-border/50 text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary'
                        }`}
                      >
                        {playingId === s.id ? (
                          <>
                            <span className="w-2 h-2 mr-2 rounded-full bg-green-500 animate-pulse"></span>
                            Playing...
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 mr-1.5" />
                            Play
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          stopPlayback();
                        }}
                        className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-border/50 bg-background/80 hover:bg-muted/30 text-foreground/80 hover:text-foreground transition-colors"
                      >
                        <Pause className="w-3.5 h-3.5 mr-1.5" />
                        Stop
                      </button>
                      <div className="flex gap-2 ml-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowFormula({
                              open: true,
                              formula: `// ${s.name}\n${s.formula}`,
                              name: s.name
                            });
                          }}
                          className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-border/50 bg-background/80 hover:bg-muted/30 text-foreground/80 hover:text-foreground transition-colors"
                        >
                          <Code className="w-3.5 h-3.5 mr-1.5" />
                          Show
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            safeWriteClipboard(`// ${s.name}\n${s.formula}`);
                          }}
                          className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-border/50 bg-background/80 hover:bg-muted/30 text-foreground/80 hover:text-foreground transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 mr-1.5" />
                          Copy
                        </button>
                      </div>
                    </div>
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

      <div className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-200 ${showFormula.open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-card rounded-xl border border-border/50 p-6 w-full max-w-2xl max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">{showFormula.name}</h3>
            <button 
              onClick={() => setShowFormula({open: false, formula: '', name: ''})}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
          <pre className="bg-muted/20 p-4 rounded-md flex-1 overflow-auto font-mono text-sm">
            <code>{showFormula.formula}</code>
          </pre>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                safeWriteClipboard(showFormula.formula);
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
