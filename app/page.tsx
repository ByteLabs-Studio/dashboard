"use client";

import { useEffect, useState } from "react";
import DashboardActions from "@components/dashboard-actions";

type ReleaseState = "loading" | "ready" | "empty" | "error";

type GitHubRelease = {
  tag_name?: unknown;
};

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto w-full px-6 select-none">{children}</div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [latestRelease, setLatestRelease] = useState<string | null>(null);
  const [releaseState, setReleaseState] = useState<ReleaseState>("loading");

  useEffect(() => {
    setMounted(true);

    fetch('https://api.github.com/repos/ByteLabs-Studio/ByteLab/releases/latest')
      .then(res => {
        if (res.status === 404) {
          setReleaseState("empty");
          return null;
        }

        if (!res.ok) {
          throw new Error(`GitHub release request failed: ${res.status}`);
        }

        return res.json() as Promise<GitHubRelease>;
      })
      .then(data => {
        if (!data) {
          return;
        }

        if (typeof data.tag_name === "string" && data.tag_name.length > 0) {
          setLatestRelease(data.tag_name);
          setReleaseState("ready");
          return;
        }

        setReleaseState("empty");
      })
      .catch(err => {
        console.error('Failed to fetch latest release:', err);
        setReleaseState("error");
      });
  }, []);

  const releaseLabel =
    releaseState === "ready"
      ? latestRelease
      : releaseState === "empty"
        ? "No current release"
        : releaseState === "error"
          ? "Release unavailable"
          : "Loading release...";

  const releaseDotClass =
    releaseState === "ready"
      ? "bg-primary animate-pulse"
      : releaseState === "empty"
        ? "bg-muted-foreground"
        : releaseState === "error"
          ? "bg-destructive"
          : "bg-primary animate-pulse";

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-muted/20" />

      <div
        className={`relative transition-opacity duration-300 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex items-center">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <span className={`w-2 h-2 rounded-full ${releaseDotClass}`}></span>
                    <span>{releaseLabel}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none">
                    <span className="text-primary">Byte</span>
                    <span className="text-foreground">Labs</span>
                  </h1>
                  
                  <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                    Create music and audio using the power of bytes and bitwise operations. A new approach to algorithmic sound generation.
                  </p>
                  
                  <DashboardActions />
                  
                  <div className="pt-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">3</span>
                      </div>
                      <div>
                        <div className="font-semibold">Active Developers</div>
                        <div className="text-sm text-muted-foreground">Building the future of audio</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">R</span>
                      </div>
                      <div>
                        <div className="font-semibold">Rust Rewrite</div>
                        <div className="text-sm text-muted-foreground">Performance & reliability</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-muted/20 border border-border/50 backdrop-blur-sm p-8 flex flex-col justify-center space-y-6">
                    <div className="text-center space-y-2">
                      <div className="text-5xl font-bold text-primary/80">01</div>
                      <div className="text-lg font-medium">Math</div>
                      <div className="text-sm text-muted-foreground">Generate audio as a function of time</div>
                    </div>
                    
                    <div className="h-px bg-border/50"></div>
                    
                    <div className="text-center space-y-2">
                      <div className="text-5xl font-bold text-primary/80">02</div>
                      <div className="text-lg font-medium">Bitwise</div>
                      <div className="text-sm text-muted-foreground">Transform counters into patterns</div>
                    </div>
                    
                    <div className="h-px bg-border/50"></div>
                    
                    <div className="text-center space-y-2">
                      <div className="text-5xl font-bold text-primary/80">03</div>
                      <div className="text-lg font-medium">Create</div>
                      <div className="text-sm text-muted-foreground">Craft evolving soundscapes</div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          <div className="py-16 border-t border-border/50">
            <Container>
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Ready to explore?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Check out our downloads, documentation, or source code to get started with ByteLabs.
                </p>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
