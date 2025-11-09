export interface Sample {
  id: string;
  name: string;
  formula: string;
  description?: string;
  category: string;
  tempo?: number;
  hz?: number;
  duration?: number;
  onTempoChange?: (value: number) => void;
  onHzChange?: (value: number) => void;
  onDurationChange?: (value: number) => void;
}

export const SAMPLES: Sample[] = [
  {
    id: "classic-1",
    name: "Classic Bytebeat",
    formula: "t&t>>8",
    description: "A compact classic using shifts and OR for melodic motion.",
    category: "Classic Bytebeats",
    tempo: 1.0,
    hz: 8000,
    duration: 4
  },
  {
    id: "bitwise-1",
    name: "Nibbles",
    formula: "(t*((t&4096?(t%65536<59392?7:(t&7)):16)^(1&(t>>14)))>>(3&-t>>((t&2048)?2:10)))|((t&16384)?((t&4096)?10:3):2)",
    description: "Famous bytebeat from the Windows XP Salinwine virus. Known for its distinctive pattern.",
    category: "Bitwise Patterns",
    tempo: 1.0,
    hz: 8000,
    duration: 4
  },
  {
    id: "exp-1",
    name: "Experimental Noise",
    formula: "t*5",
    description: "Noisy XOR patterns masked to the low byte.",
    category: "Experimental",
    tempo: 1.0,
    hz: 8000,
    duration: 4
  },
  {
    id: "float-1",
    name: "Floatbeat",
    formula: "Math.sin(100*Math.pow(2,(-t/2048%8)))/2+Math.tan(Math.cbrt(Math.sin(t*[1,0,2,4,0,2,3,2,1.5,2,1,0,2,3,2,1.5][t>>13&15]/41)))/[2,3,4,6,8,12,16,24][t/[1,1.5][t>>12&1]>>10&7]/4+Math.cbrt(Math.asin(Math.sin(t/[2,3,2.5,4][t>>16&3]/41)))/6",
    description: "Complex floatbeat with evolving harmonics and modulation.",
    category: "Floatbeat",
    tempo: 1.0,
    hz: 44100,
    duration: 8
  },
  {
    id: "float-2",
    name: "Techno Floatbeat",
    formula: "(t => { let d = 0; const b = Math.floor(t*1.5/16384); const c = (n, x, y) => { const m = 440 * Math.pow(2, n/12) / 48000; return (x(y(t*4*m%4)) + x(y(t*4*1.49*m%4))) / Math.max(2, t*1.5 % ((b&7) > 5 ? 32768 : 16384) / 499); }; const M = [0,0,0,0,-2,-2,-2,-2,-5,-7,-5,-3,-2,-2,-2,-2][b&15]; const lp = (inp, w) => { if (w === 0) return inp; const out = inp + d; d = out / (1 + 1/w); return d / w; }; const cb = c(M, Math.asin, Math.sin) * 1.2; const k = Math.min(1, Math.max(-1, Math.tan(Math.sin(Math.sqrt(t*1.5%32768)/2)) * (1 - t*1.5%32768/32768) * 2)) / 1.3; const h = Math.sin(Math.pow(t,7)) / Math.max(1, (t+32768)*1.5%32768/500) * (t*1.5&16384?1:0); const s = lp(Math.sin(Math.pow(t>>2,7)), 3) * (t*1.5&32768?.4:0) / Math.max(.5, (t+65536)*1.5%65536/3000); const bass = Math.min(1, Math.max(-1, Math.asin(Math.sin(t*Math.PI*110*Math.pow(2, (t*1.5&131072?5:0)/12)/48000)) * 4)) / 2.5; return ((cb + bass) * (t*1.5&16384?1:(t*1.5%32768/16384)) + k + h + s) / 1.1; })(t)",
    description: "Smoother techno-style floatbeat with balanced drums and bass.",
    category: "Floatbeat",
    tempo: 1.5,
    hz: 44100,
    duration: 8
  },
  {
    id: "perc-1",
    name: "Percussion-ish",
    formula: "((t*(t>>5|t>>8))>>(t>>16))&255",
    description: "Short transient hits derived from bit tricks.",
    category: "Percussion",
    tempo: 1.0,
    hz: 44100,
    duration: 2
  }
].sort((a, b) => a.name.localeCompare(b.name));

const STORAGE_KEYS = {
  AUDIO_MODE: 'bytebeat_audio_mode',
  LAST_HZ: 'bytebeat_last_hz'
};

export const storage = {
  getAudioMode: (): 'tempo' | 'hz' => {
    if (typeof window === 'undefined') return 'hz';
    return (localStorage.getItem(STORAGE_KEYS.AUDIO_MODE) as 'tempo' | 'hz') || 'hz';
  },
  setAudioMode: (mode: 'tempo' | 'hz') => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUDIO_MODE, mode);
    }
  },
  getLastHz: (): number => {
    if (typeof window === 'undefined') return 44100;
    const hz = localStorage.getItem(STORAGE_KEYS.LAST_HZ);
    return hz ? Number(hz) : 44100;
  },
  setLastHz: (hz: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.LAST_HZ, hz.toString());
    }
  }
};

export const FREQUENCY_OPTIONS = [
  { value: 8000, label: '8 kHz' },
  { value: 16000, label: '16 kHz' },
  { value: 22050, label: '22.05 kHz' },
  { value: 32000, label: '32 kHz' },
  { value: 44100, label: '44.1 kHz' },
  { value: 48000, label: '48 kHz' },
  { value: 96000, label: '96 kHz' },
];