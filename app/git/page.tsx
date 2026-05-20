import React from "react";
import { FaGithub, FaGitlab } from "react-icons/fa";

export default function GitPage() {
  return (
    <div className="bg-background text-foreground antialiased min-h-screen">
      <main className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-6xl w-full">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                Source <span className="text-primary">Code</span>
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Access the ByteLabs repository on your preferred platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a
                href="https://github.com/ByteLabs-Studio/ByteLab"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#24292f]/10 to-[#24292f]/5 border border-border/50 hover:border-[#24292f]/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <FaGithub className="w-10 h-10 text-[#24292f] group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">GitHub</h3>
                    <p className="text-muted-foreground">
                      Public mirror for ByteLabs on GitHub
                    </p>
                  </div>
                  <div className="w-full pt-6 border-t border-border/30">
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Visit repository →
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="https://gitlab.com/bytelab-studio/ByteLab"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#FC6D26]/10 to-[#FC6D26]/5 border border-border/50 hover:border-[#FC6D26]/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <FaGitlab
                    className="w-10 h-10 text-[#FC6D26] group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">GitLab</h3>
                    <p className="text-muted-foreground">
                      Origin of ByteLabs, the main repository
                    </p>
                  </div>
                  <div className="w-full pt-6 border-t border-border/30">
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Visit repository →
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="py-8 border-t border-border/50">
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
