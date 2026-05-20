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

    fetch('https://api.github.com/repos/ByteLabs-Studio/ByteLabs/releases/latest')
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
    <div className="relative">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-muted/20" />

      <div
        className={`relative transition-opacity duration-300 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col">
          <div className="py-3 md:py-4">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-14 items-center w-full">
                <div className="space-y-8">
                  <div className="surface-lift inline-flex items-center gap-2 rounded-md border border-primary/15 bg-primary/10 px-3.5 py-2 text-sm font-medium text-primary shadow-sm shadow-primary/5">
                    <span className={`h-2 w-2 rounded-full ${releaseDotClass}`}></span>
                    <span className="font-accent">{releaseLabel}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold tracking-normal leading-none">
                    <span className="font-accent text-primary">Byte</span>
                    <span className="text-foreground">Labs</span>
                  </h1>
                  
                  <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                    Create music and audio using the power of bytes and bitwise operations. A new approach to algorithmic sound generation.
                  </p>
                  
                  <DashboardActions />
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-3 pt-1 text-sm">
                    <div>
                      <div className="font-accent text-primary">3 developers</div>
                      <div className="text-muted-foreground">Building the future of audio</div>
                    </div>
                    <div>
                      <div className="font-accent text-primary">Rust rewrite</div>
                      <div className="text-muted-foreground">Performance and reliability</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="mx-auto flex aspect-square max-w-[430px] flex-col justify-center space-y-6 rounded-md border border-border/60 bg-gradient-to-br from-primary/15 via-card/70 to-muted/30 p-9 shadow-lg shadow-primary/5 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:border-primary/25 hover:shadow-primary/10 md:p-10">
                    <div className="text-center space-y-2">
                      <div className="font-accent text-5xl font-bold text-primary/80">01</div>
                      <div className="text-lg font-medium">Math</div>
                      <div className="text-sm text-muted-foreground">Generate audio as a function of time</div>
                    </div>
                    
                    <div className="h-px bg-border/50"></div>
                    
                    <div className="text-center space-y-2">
                      <div className="font-accent text-5xl font-bold text-primary/80">02</div>
                      <div className="text-lg font-medium">Bitwise</div>
                      <div className="text-sm text-muted-foreground">Transform counters into patterns</div>
                    </div>
                    
                    <div className="h-px bg-border/50"></div>
                    
                    <div className="text-center space-y-2">
                      <div className="font-accent text-5xl font-bold text-primary/80">03</div>
                      <div className="text-lg font-medium">Create</div>
                      <div className="text-sm text-muted-foreground">Craft evolving soundscapes</div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          <section className="border-t border-border/50 py-10 md:py-12">
            <Container>
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <div className="font-accent text-sm text-primary">about / bytebeat</div>
                  <h2 className="mt-3 text-3xl font-bold tracking-normal">
                    Turn small, or large formuale into actual sound.
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                    ByteLabs is a creative audio tool for writing small expressions that turn numbers into raw sound. It sits somewhere between a bytebeat composer, an algorithmic music sketchbook, and a compact sound design lab.
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="surface-lift rounded-md border border-border/60 bg-card/55 p-5 shadow-sm">
                    <div className="font-accent text-xs font-semibold uppercase text-primary">What it is</div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      A place to type formulas, hear them immediately, and shape noisy, melodic, glitchy, or rhythmic audio from code.
                    </p>
                  </div>

                  <div className="surface-lift rounded-md border border-border/60 bg-card/55 p-5 shadow-sm">
                    <div className="font-accent text-xs font-semibold uppercase text-primary">What it counts as</div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      ByteLabs counts as algorithmic music software: the instrument is math, and the output is generated sample by sample.
                    </p>
                  </div>

                  <div className="surface-lift rounded-md border border-border/60 bg-card/55 p-5 shadow-sm">
                    <div className="font-accent text-xs font-semibold uppercase text-primary">How bytebeats work</div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      A counter called time increases constantly. A formula transforms that counter into values, and those values become audio samples.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 rounded-md border border-border/60 bg-muted/20 p-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
                <div>
                  <div className="font-accent text-xs uppercase text-primary">time counter</div>
                  <p className="mt-1 text-sm text-muted-foreground">t climbs through integers very quickly.</p>
                </div>
                <div className="hidden font-accent text-muted-foreground md:block">/</div>
                <div>
                  <div className="font-accent text-xs uppercase text-primary">formula</div>
                  <code className="mt-1 block rounded-sm bg-background/70 px-3 py-2 font-accent text-sm">
                    {"t * ((t >> 5) | (t >> 8))"}
                  </code>
                </div>
                <div className="hidden font-accent text-muted-foreground md:block">/</div>
                <div>
                  <div className="font-accent text-xs uppercase text-primary">audio output</div>
                  <p className="mt-1 text-sm text-muted-foreground">Patterns emerge as pitch, rhythm, texture, and distortion.</p>
                </div>
              </div>
            </Container>
          </section>
        </div>
      </div>
    </div>
  );
}
