import React from "react";
import { FaGithub, FaGitlab } from "react-icons/fa";

export default function GitPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <main className="py-4 md:py-6">
        <div className="px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <div className="surface-lift mb-4 inline-flex rounded-md border border-primary/15 bg-primary/10 px-3 py-1.5 font-accent text-xs font-semibold uppercase text-primary">
                repositories
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-normal mb-4">
                Source <span className="font-accent text-primary">Code</span>
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Access the ByteLabs repository on your preferred platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://github.com/ByteLabs-Studio/ByteLab"
                target="_blank"
                rel="noopener noreferrer"
                className="surface-lift group relative rounded-md border border-border/60 bg-gradient-to-br from-[#24292f]/10 to-card/70 p-6 shadow-sm"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <FaGithub className="w-10 h-10 text-[#24292f] group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-accent text-2xl font-bold mb-2">GitHub</h3>
                    <p className="text-muted-foreground">
                      Public mirror for ByteLabs on GitHub
                    </p>
                  </div>
                  <div className="w-full pt-6 border-t border-border/30">
                    <span className="font-accent text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Visit repository →
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="https://gitlab.com/bytelab-studio/ByteLab"
                target="_blank"
                rel="noopener noreferrer"
                className="surface-lift group relative rounded-md border border-border/60 bg-gradient-to-br from-[#FC6D26]/10 to-card/70 p-6 shadow-sm"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <FaGitlab
                    className="w-10 h-10 text-[#FC6D26] group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <h3 className="font-accent text-2xl font-bold mb-2">GitLab</h3>
                    <p className="text-muted-foreground">
                      Origin of ByteLabs, the main repository
                    </p>
                  </div>
                  <div className="w-full pt-6 border-t border-border/30">
                    <span className="font-accent text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Visit repository →
                    </span>
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="surface-lift rounded-md border border-border/50 bg-card/45 p-4 shadow-sm">
                <div className="font-accent text-xs font-semibold uppercase text-primary">origin</div>
                <p className="mt-2 text-sm text-muted-foreground">GitLab stays closest to day-to-day development.</p>
              </div>
              <div className="surface-lift rounded-md border border-border/50 bg-card/45 p-4 shadow-sm">
                <div className="font-accent text-xs font-semibold uppercase text-primary">mirror</div>
                <p className="mt-2 text-sm text-muted-foreground">GitHub is available for browsing, stars, and discovery.</p>
              </div>
              <div className="surface-lift rounded-md border border-border/50 bg-card/45 p-4 shadow-sm">
                <div className="font-accent text-xs font-semibold uppercase text-primary">issues</div>
                <p className="mt-2 text-sm text-muted-foreground">Use whichever host fits your workflow best.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 py-7">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-muted-foreground">
              Both repositories are maintained in parallel. Choose the platform that works best for you.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
