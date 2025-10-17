"use client"

import { FaLinux, FaApple, FaWindows } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { SiNixos } from "react-icons/si";
import DownloadOption from "@/components/DownloadOption";
import { ClipboardIcon } from "lucide-react";

export default function DownloadsPage() {
  const [isCopied, setIsCopied] = useState(false);
  const [sourceCodeOpen, setSourceCodeOpen] = useState(false);
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }
    };
  }, []);


  return (
    <div className="bg-background text-foreground antialiased px-6">
      <main className="py-12 pb-28 md:pb-32">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <header className="flex flex-col gap-2 select-none">
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Downloads
              </h1>
              <p className="text-muted-foreground">
                Choose your platform below to get the latest builds or installers.
              </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 select-none">
              <div className="space-y-4">
                <p className="mb-1 uppercase font-bold text-white/95 select-none">Download for</p>
                <div className="space-y-4">
                  <DownloadOption
                    title="Nix"
                    description="A Nix flake output and overlay"
                    instructions ={(
                      <div className="flex flex-col">
                        <h3 className="text-foreground text-xl font-semibold select-none">Installing via Flake</h3>
                        <p className="select-none">Running the flake is as simple as</p>
                        <div className="relative mt-2">
                          <div className="bg-accent/10 rounded-md p-3 font-mono text-sm overflow-x-auto text-foreground/90 border border-border">
                            <div className="flex items-center justify-between mb-1 select-none">
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-muted-foreground font-mono cursor-default">$</span>
                              </div>
                              <button
                                onClick={handleCopy}
                                disabled={isCopied}
                                className={`transition-colors cursor-pointer select-none ${isCopied ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                title={isCopied ? 'Copied!' : 'Copy to clipboard'}
                              >
                                {isCopied ? 'Copied!' : <ClipboardIcon className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                            <div className="font-mono text-[15px] leading-5 tracking-tight font-medium text-foreground select-text">nix run gitlab:bytelab-studio/ByteLab/reimpl</div>
                          </div>
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
