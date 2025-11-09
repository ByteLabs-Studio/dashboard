"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Play, Pause, Code, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  const [query] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedId] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{[key: string]: boolean}>({});
  const [samples, setSamples] = useState<Sample[]>(() => {
    return SAMPLES.map(sample => ({
      ...sample,
      tempo: sample.tempo || 1.0
    }));
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAudioWarning, setShowAudioWarning] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    setShowWarning(localStorage.getItem('hideAudioWarning') !== 'true');
    
    const hasDismissed = localStorage.getItem('audioWarningDismissed') === 'true';
    if (!hasDismissed) {
      setShowAudioWarning(true);
    }
  }, []);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioNodeRef = useRef<AudioWorkletNode | AudioBufferSourceNode | null>(null);

  const dismissWarning = () => {
    setShowWarning(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hideAudioWarning', 'true');
    }
  };

  const handleCopy = (text: string, id: string) => {
    safeWriteClipboard(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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

  const toggleHzMode = async () => {
    const newUseHz = !useHz;
    setUseHz(newUseHz);
    storage.setAudioMode(newUseHz ? 'hz' : 'tempo');
    
    await stopPlayback();
    
    if (playingId) {
      const sample = samples.find(s => s.id === playingId);
      if (sample) {
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        
        setTimeout(() => {
          playSample(sample);
        }, 100);
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
    
    const hasDismissed = localStorage.getItem('audioWarningDismissed') === 'true';
    if (!hasDismissed) {
      setShowAudioWarning(true);
      return;
    }
    
    const currentSample = samples.find(s => s.id === sample.id) || sample;
    
    const sampleWithDefaults = {
      ...currentSample,
      tempo: currentSample.tempo ?? 1.0,
      hz: currentSample.hz ?? 44100,
      duration: currentSample.duration ?? 4
    };
    
    setSamples(prevSamples => 
      prevSamples.map(s => 
        s.id === sample.id ? sampleWithDefaults : s
      )
    );
    
    if (currentSample.tempo === undefined || currentSample.hz === undefined) {
      setSamples(prevSamples => 
        prevSamples.map(s => 
          s.id === sample.id ? sampleWithDefaults : s
        )
      );
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
        fn = new Function("t", `${mathFuncs} return (${sampleWithDefaults.formula});`) as (t: number) => number;
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
              this.useHz = false;
              this.sampleRate = 44100;
              this.fn = null;
              
              this.port.onmessage = (e) => {
                const data = e.data || {};
                
                if (data.expr) {
                  try {
                    this.fn = new Function('t','Math','return (' + data.expr + ')');
                  } catch (err) {
                    console.error('Error parsing formula:', err);
                    this.fn = null;
                  }
                }
                
                if (typeof data.tempo === 'number') {
                  this.tempo = data.tempo;
                }
                
                if ('useHz' in data) {
                  this.useHz = data.useHz;
                }
                
                if ('sampleRate' in data) {
                  this.sampleRate = data.sampleRate;
                }
                
                // Handle updateSampleRate command
                if (data.command === 'updateSampleRate' && typeof data.sampleRate === 'number') {
                  this.sampleRate = data.sampleRate;
                }
              };
            }

            process(inputs, outputs, parameters) {
              const out = outputs[0];
              if (!out || !out[0]) return true;
              const channel = out[0];
              
              // Check if this is a floatbeat by looking at the sample ID
              const isFloatbeat = this.sampleId && this.sampleId.startsWith('float-');
              
              for (let i = 0; i < channel.length; i++) {
                let v = 0;
                try {
                  if (this.fn) {
                    // Calculate time value based on mode
                    const t = this.useHz 
                      ? Math.floor(this.t * (this.sampleRate / 44100))
                      : Math.floor(this.t * this.tempo);
                    
                    const raw = this.fn(t, Math);
                    
                    if (!isFinite(raw) || Number.isNaN(raw)) {
                      v = 0;
                    } else if (isFloatbeat) {
                      v = Math.max(-0.8, Math.min(0.8, Number(raw) * 0.2));
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
          throw error;
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
            { outputChannelCount: [1] }
          );

          node.port.postMessage({ 
            expr: sampleWithDefaults.formula, 
            tempo: sampleWithDefaults.tempo,
            useHz: useHz,
            sampleRate: sampleWithDefaults.hz,
            sampleId: sampleWithDefaults.id
          });

          node.connect(ctx.destination);
          sourceRef.current = node;
          setPlayingId(sample.id);
          return;
        } catch (error: unknown) {
          console.error("Error creating audio worklet node:", error);
        }
      }

      const sampleRate = 44100;
      const duration = sampleWithDefaults.duration;
      const length = Math.max(1, Math.floor(duration * sampleRate));
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < length; i++) {
        const t = useHz 
          ? Math.floor(i * (sampleWithDefaults.hz / sampleRate))
          : Math.floor(i * sampleWithDefaults.tempo);
        
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
        } catch (e) {
          console.error('Error in audio generation:', e);
          value = 0;
        }
        data[i] = value;
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <AudioWarningModal open={showAudioWarning} onOpenChange={setShowAudioWarning} />
      
      {isClient && showWarning && (
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-6">
            <div className="dark:hidden bg-amber-100 border-l-4 border-amber-500 p-4 mb-6 rounded-md shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center flex-1">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 text-center">
                    <div className="text-sm text-amber-800">
                      <p className="font-medium">Audio Processing Notice</p>
                      <p className="mt-1">This section is currently being improved. Some functions may not sound as expected. We&apos;re working hard to enhance your audio experience.</p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={dismissWarning}
                    className="inline-flex text-amber-500 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 rounded-md"
                    aria-label="Dismiss"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden dark:block bg-amber-900/30 border-l-4 border-amber-400 p-4 mb-6 rounded-md shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center flex-1">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 text-center">
                    <div className="text-sm text-amber-300">
                      <p className="font-medium">Audio Processing Notice</p>
                      <p className="mt-1">This section is currently being improved. Some functions may not sound as expected. We&apos;re working hard to enhance your audio experience.</p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={dismissWarning}
                    className="inline-flex text-amber-400 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 rounded-md"
                    aria-label="Dismiss"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                      } dark:!text-white dark:hover:!text-white`}
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
                        onChange={async (e) => {
                          const newHz = Number(e.target.value);
                          storage.setLastHz(newHz);
                          
                          setSamples(prevSamples => 
                            prevSamples.map(sample => 
                              sample.id === s.id ? { ...sample, hz: newHz } : sample
                            )
                          );
                          
                          if (playingId === s.id && audioContextRef.current && audioNodeRef.current) {
                            try {
                              if ('port' in audioNodeRef.current && audioNodeRef.current.port) {
                                audioNodeRef.current.port.postMessage({
                                  command: 'updateSampleRate',
                                  sampleRate: newHz
                                });
                              } else {
                                const currentSample = samples.find(samp => samp.id === s.id);
                                if (currentSample) {
                                  await stopPlayback();
                                  setTimeout(() => {
                                    playSample({ ...currentSample, hz: newHz });
                                  }, 50);
                                }
                              }
                            } catch (error) {
                              console.error('Error updating sample rate:', error);
                            }
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
                        className={`inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border transition-all duration-150 cursor-pointer ${
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
                        className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-border/50 bg-background/80 hover:bg-muted/30 text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
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
                          className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-border/50 bg-background/80 hover:bg-muted/30 text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
                        >
                          <Code className="w-3.5 h-3.5 mr-1.5" />
                          Show
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(`// ${s.name}\n${s.formula}`, `card-${s.id}`);
                          }}
                          className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md border border-border/50 bg-background/80 hover:bg-muted/30 text-foreground/80 hover:text-foreground transition-colors cursor-pointer min-w-[80px]"
                        >
                          {copiedId === `card-${s.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 mr-1.5" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 mr-1.5" />
                              Copy
                            </>
                          )}
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
              className="text-muted-foreground hover:text-foreground cursor-pointer"
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
                  handleCopy(showFormula.formula, 'modal-copy');
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer min-w-[150px] flex items-center justify-center gap-2"
              >
                {copiedId === 'modal-copy' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy to Clipboard
                  </>
                )}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
