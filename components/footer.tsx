"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Maximize2, Minimize2 } from "lucide-react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6">{children}</div>;
}

export default function Footer() {
  const [isFloating, setIsFloating] = useState(false);
  
  useEffect(() => {
    const savedPreference = localStorage.getItem('footerFloating');
    if (savedPreference !== null) {
      setIsFloating(savedPreference === 'true');
    }
  }, []);
  
  const toggleFloating = () => {
    const newState = !isFloating;
    setIsFloating(newState);
    localStorage.setItem('footerFloating', String(newState));
  };

  const placeholderHeight = 58;
  
  return (
    <>
      <div style={{ height: `${placeholderHeight}px` }} aria-hidden="true" />
      <footer 
        className={`fixed left-0 right-0 z-30 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isFloating ? 'bottom-3 px-4' : 'bottom-0 px-0'
        }`}
      >
        <div 
          className={`mx-auto overflow-hidden border bg-background/94 shadow-lg backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isFloating 
              ? 'max-w-6xl rounded-md border-border/70 shadow-primary/5' 
              : 'w-full max-w-none rounded-none border-border/50'
          }`}
        >
          <Container>
            <div className="flex min-h-14 flex-col gap-3 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-accent text-xs uppercase text-foreground">
                  ByteLabs Studio
                </div>
                <div className="text-xs">&copy; {new Date().getFullYear()} All rights reserved.</div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link href="/docs" className="rounded-sm px-2 py-1 transition-colors hover:bg-muted hover:text-foreground">
                  Docs
                </Link>
                <Link href="/terms" className="rounded-sm px-2 py-1 transition-colors hover:bg-muted hover:text-foreground">
                  Terms
                </Link>
                <Link href="/privacy" className="rounded-sm px-2 py-1 transition-colors hover:bg-muted hover:text-foreground">
                  Privacy
                </Link>
                <button 
                  onClick={toggleFloating}
                  className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border/60 bg-card/70 text-foreground transition-colors hover:bg-accent"
                  aria-label={isFloating ? 'Attach footer' : 'Detach footer'}
                  title={isFloating ? 'Attach to bottom' : 'Float above content'}
                >
                  {isFloating ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                </button>
              </div>
            </div>
          </Container>
        </div>
      </footer>
    </>
  )
};
