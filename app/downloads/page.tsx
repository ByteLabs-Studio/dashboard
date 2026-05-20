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
    <div className="bg-background text-foreground antialiased">
      <main className="py-4 md:py-6">
        <div className="mx-auto max-w-6xl px-6">
          <div className="space-y-8">
            <header className="mx-auto max-w-3xl text-center space-y-4">
              <div className="surface-lift inline-flex rounded-md border border-primary/15 bg-primary/10 px-3 py-1.5 font-accent text-xs font-semibold uppercase text-primary">
                downloads
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-normal">
                Get <span className="font-accent text-primary">ByteLabs</span>
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Choose your platform, grab the flake command, or compile it from source.
              </p>
            </header>

            <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="surface-lift rounded-md border border-border/50 bg-gradient-to-br from-primary/10 via-card/70 to-muted/20 p-6 shadow-sm">
                <div className="flex items-start gap-6 mb-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-primary/20 ring-1 ring-primary/15">
                    <SiNixos className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-accent text-xl font-bold mb-1">Nix</h2>
                    <p className="text-muted-foreground">A Nix flake output and overlay</p>
                  </div>
                </div>
                <div className="rounded-md border border-border/40 bg-background/60 p-4">
                  <p className="text-sm font-medium mb-2">Install via Flake:</p>
                  <div className="relative">
                    <div className="rounded-md border border-border/30 bg-muted/30 pr-10 font-accent text-sm overflow-x-auto">
                      <div className="absolute top-1/2 right-3 -translate-y-1/2">
                        <button
                          onClick={handleCopy}
                          disabled={isCopied}
                          className={`rounded-md p-1.5 transition-all duration-200 ${isCopied ? 'text-primary' : 'text-muted-foreground hover:bg-background hover:text-foreground hover:scale-110'}`}
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

              <div className="surface-lift rounded-md border border-border/50 bg-card/50 p-6 shadow-sm">
                <h2 className="font-accent text-xl font-bold mb-2">Source Code</h2>
                <p className="text-muted-foreground mb-6">
                  Get the source directly from GitLab while packaged builds are being prepared.
                </p>
                <a
                  className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 active:translate-y-0"
                  href="https://gitlab.com/ByteLabs-studio/ByteLabs/-/archive/main/ByteLabs-main.tar.gz?ref_type=heads"
                >
                  Download .tar.gz
                </a>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              <div className="surface-lift rounded-md border border-border/50 bg-muted/25 p-5 opacity-75 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-muted/60">
                    <FaLinux className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-accent text-lg font-bold mb-1">Linux</h2>
                    <p className="text-sm text-muted-foreground">FUSE2 AppImage</p>
                    <span className="mt-3 inline-flex rounded-md bg-muted px-2 py-1 font-accent text-xs text-muted-foreground">coming soon</span>
                  </div>
                </div>
              </div>

              <div className="surface-lift rounded-md border border-border/50 bg-muted/25 p-5 opacity-75 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-muted/60">
                    <FaApple className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-accent text-lg font-bold mb-1">macOS</h2>
                    <p className="text-sm text-muted-foreground">Universal DMG</p>
                    <span className="mt-3 inline-flex rounded-md bg-muted px-2 py-1 font-accent text-xs text-muted-foreground">coming soon</span>
                  </div>
                </div>
              </div>

              <div className="surface-lift rounded-md border border-border/50 bg-muted/25 p-5 opacity-75 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-muted/60">
                    <FaWindows className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-accent text-lg font-bold mb-1">Windows</h2>
                    <p className="text-sm text-muted-foreground">Windows executable</p>
                    <span className="mt-3 inline-flex rounded-md bg-muted px-2 py-1 font-accent text-xs text-muted-foreground">coming soon</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
