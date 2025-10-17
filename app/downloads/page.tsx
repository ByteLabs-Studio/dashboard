"use client"

import { FaLinux, FaApple, FaWindows } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { SiNixos } from "react-icons/si";
import DownloadOption from "@/components/DownloadOption";
import { ClipboardIcon } from "lucide-react";

export default function DownloadsPage() {
  const [cbHovered, setCbHovered] = useState(false);
  const [sourceCodeOpen, setSourceCodeOpen] = useState(false);

  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setCbHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setCbHovered(false);
      hoverTimeout.current = null;
    }, 500);
  };


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
                Choose your platform below to get the latest builds or installers.
              </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <p className="mb-1 uppercase font-bold text-white/95">Download for</p>
                <div className="space-y-4">
                  <DownloadOption
                    title="Nix"
                    description="A Nix flake output and overlay"
                    instructions ={(
                      <div className="flex flex-col">
                        <h3 className="text-foreground text-xl font-semibold">Installing via Flake</h3>
                        <p>Running the flake is as simple as</p>
                        <div className="relative">
                          <pre className="mt-2">
                            <code
                              id="nix-run-cb-content"
                              className="bg-foreground/5 rounded py-2 px-4"
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                            >
                              nix run gitlab:bytelab-studio/ByteLab/reimpl
                            </code>
                          </pre>
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(
                                document.getElementById("nix-run-cb-content")?.textContent ?? ""
                              )
                            }
                            className={`absolute top-1 right-14 bg-background rounded p-1 transition-opacity ${
                              cbHovered ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            <ClipboardIcon />
                          </button>
                        </div>
                      </div>
                    )}
                    icon={<SiNixos className="text-foreground/70 w-6 h-6" />}
                    type="commands"
                    disabled={false}
                  />
                  
                    <DownloadOption
                    title="Linux"
                    description="FUSE2 (AppImage)"
                    icon={<FaLinux className="text-foreground/70 w-6 h-6" />}
                    type="file"
                    fileType="AppImage"
                    disabled={true}
                  />
                  
                  <DownloadOption
                    title="macOS"
                    description="Universal DMG"
                    icon={<FaApple className="text-foreground/70 w-6 h-6" />}
                    type="file"
                    fileType="DMG"
                    disabled={true}
                  />
                  
                  <DownloadOption
                    title="Windows"
                    description="Windows executable"
                    icon={<FaWindows className="text-foreground/70 w-6 h-6" />}
                    type="file"
                    fileType="EXE"
                    disabled={true}
                  />
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
                            href="https://gitlab.com/ByteLabs-studio/ByteLabs/-/archive/main/ByteLabs-main.tar.gz?ref_type=heads"
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
