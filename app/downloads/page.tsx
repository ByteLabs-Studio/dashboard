"use client"

import { FaLinux, FaApple, FaWindows, FaSnowflake } from "react-icons/fa";
import { LiaSnowflake } from "react-icons/lia";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function DownloadsPage() {
  const [sourceCodeOpen, setSourceCodeOpen] = useState(false);

  return (
    <div className="bg-background text-foreground antialiased px-6">
      <main className="py-12 pb-28 md:pb-32">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <header className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Downloads
              </h1>
              <p className="text-muted-foreground">
                Choose your platform below to get the latest builds or
                installers.
              </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="mb-1 uppercase font-bold text-white/95">Download for</p>
                <div className="flex flex-col gap-3">
                <button
                  className="h-23.5 w-full rounded-md border border-border bg-card hover:shadow-md transition flex gap-4"
                >
                  <div className="flex items-center justify-between w-full px-6 text-left">
                    <div>
                      <h3 className="text-lg font-semibold">Nix</h3>
                      <p className="text-sm text-muted-foreground italic mt-1 mr-4">
                        A Nix flake output and overlay
                      </p>
                    </div>

                    <FaSnowflake className="text-foreground/70 w-6.5 h-6.5" aria-hidden />
                  </div>
                </button>
                <button
                  className="h-23.5 w-full rounded-md border border-border bg-card hover:shadow-md transition flex gap-4"
                >
                  <div className="flex items-center justify-between w-full px-6 text-left">
                    <div>
                      <h3 className="text-lg font-semibold">Linux</h3>
                      <p className="text-sm text-muted-foreground italic mt-1 mr-4">
                        FUSE2 (AppImage)
                      </p>
                    </div>

                    <FaLinux className="text-foreground/70 w-6.5 h-6.5" aria-hidden />
                  </div>
                </button>
                <button
                  className="h-23.5 w-full rounded-md border border-border bg-card hover:shadow-md transition flex gap-4"
                >
                  <div className="flex items-center justify-between w-full px-6 text-left">
                    <div>
                      <h3 className="text-lg font-semibold">macOS</h3>
                      <p className="text-sm text-muted-foreground italic mt-1 mr-4">
                        Universal DMG.
                      </p>
                    </div>

                    <FaApple className="text-foreground/70 w-6.5 h-6.5" aria-hidden />
                  </div>
                </button>
                <button
                  className="h-23.5 w-full rounded-md border border-border bg-card hover:shadow-md transition flex gap-4"
                >
                  <div className="flex items-center justify-between w-full px-6 text-left">
                    <div>
                      <h3 className="text-lg font-semibold">Windows</h3>
                      <p className="text-sm text-muted-foreground italic mt-1 mr-4">
                        Windows executable (exe)
                      </p>
                    </div>

                    <FaWindows className="text-foreground/70 w-6.5 h-6.5" aria-hidden />
                  </div>
                </button>
                </div>
              </div>

              <div>
                <h1 className="mb-1 uppercase font-bold text-white/95">Additional info</h1>
                <div className="border border-border bg-card flex flex-col rounded-md overflow-hidden pb-1">
                  <button
                    className="text-lg font-bold text-center cursor-pointer pt-2 pb-1"
                    onClick={() => setSourceCodeOpen(!sourceCodeOpen)}
                  >
                    Source Code
                  </button>

                  <AnimatePresence initial={false}>
                    {sourceCodeOpen && (
                      <motion.div
                        key="source"
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col p-3 pb-2 pt-0">
                          <p className="text-sm text-muted-foreground">
                            The source code can be found simply on its GitLab.
                          </p>
                          <a
                            className="bg-foreground font-semibold hover:brightness-95 py-1.5 px-5 mt-4 rounded text-background text-center"
                            href="https://gitlab.com/bytelab-studio/ByteLab/-/archive/main/ByteLab-main.tar.gz?ref_type=heads"
                          >
                            Download .tar.gz (main)
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
