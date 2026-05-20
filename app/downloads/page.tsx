"use client"

import { FaLinux, FaApple, FaWindows } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { SiNixos } from "react-icons/si";
import { Copy } from "lucide-react";

export default function DownloadsPage() {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    if (isCopied) return;
    
    navigator.clipboard.writeText("nix run gitlab:bytelab-studio/ByteLab/reimpl");
    setIsCopied(true);
    
    if (copyTimeout.current) {
      clearTimeout(copyTimeout.current);
    }
    
    copyTimeout.current = setTimeout(() => {
      setIsCopied(false);
      copyTimeout.current = null;
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }
    };
  }, []);


  return (
    <div className="bg-background text-foreground antialiased min-h-screen">
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">
            <header className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Get <span className="text-primary">ByteLabs</span>
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Choose your platform to download the latest version
              </p>
            </header>

            <section className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-muted/10 border border-border/50">
                <div className="flex items-start gap-6 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <SiNixos className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-1">Nix</h2>
                    <p className="text-muted-foreground">A Nix flake output and overlay</p>
                  </div>
                </div>
                <div className="bg-background/50 rounded-xl p-4 border border-border/30">
                  <p className="text-sm font-medium mb-2">Install via Flake:</p>
                  <div className="relative">
                    <div className="bg-muted/30 rounded-lg pr-10 font-mono text-sm overflow-x-auto border border-border/30">
                      <div className="absolute top-1/2 right-3 -translate-y-1/2">
                        <button
                          onClick={handleCopy}
                          disabled={isCopied}
                          className={`transition-colors ${isCopied ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                          title={isCopied ? 'Copied!' : 'Copy to clipboard'}
                        >
                          {isCopied ? '✓' : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <pre className="p-3 text-foreground"><code>nix run gitlab:bytelab-studio/ByteLab/reimpl</code></pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 opacity-60">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
                    <FaLinux className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">Linux</h2>
                    <p className="text-muted-foreground">FUSE2 (AppImage) — Coming Soon</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 opacity-60">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
                    <FaApple className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">macOS</h2>
                    <p className="text-muted-foreground">Universal DMG — Coming Soon</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 opacity-60">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
                    <FaWindows className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">Windows</h2>
                    <p className="text-muted-foreground">Windows executable — Coming Soon</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="pt-6 border-t border-border/50">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-xl font-bold mb-4">Source Code</h2>
                <p className="text-muted-foreground mb-6">
                  Get the source code directly from GitLab
                </p>
                <a
                  className="inline-flex items-center gap-2 bg-foreground text-background font-semibold px-6 py-3 rounded-xl hover:brightness-110 transition-colors"
                  href="https://gitlab.com/ByteLabs-studio/ByteLabs/-/archive/main/ByteLabs-main.tar.gz?ref_type=heads"
                >
                  Download .tar.gz (main)
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
