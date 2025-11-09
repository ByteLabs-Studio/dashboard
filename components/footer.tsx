"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FluidGlass from "./FluidGlass";
import { Maximize2, Minimize2 } from "lucide-react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto w-full px-1">{children}</div>;
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

  const placeholderHeight = 60;
  
  return (
    <>
      <div style={{ height: `${placeholderHeight}px` }} aria-hidden="true" />
      <footer 
        className={`fixed left-0 right-0 z-30 transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
          isFloating ? 'bottom-4' : 'bottom-0'
        }`}
      >
        <div 
          className={`transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
            isFloating 
              ? 'mx-4 rounded-[1rem]' 
              : 'inset-x-0'
          } border border-border/10 shadow-xl overflow-hidden`}
          style={{
            width: isFloating ? 'calc(100% - 2rem)' : '100%',
            margin: '0 auto',
            maxWidth: isFloating ? 'calc(100% - 2rem)' : '100%'
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10">
              <FluidGlass 
                opacity={0.15}
                blur={12}
                className={`transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
                  isFloating ? 'rounded-[1rem]' : 'rounded-none'
                }`}
              />
            </div>
            <Container>
              <div className="flex items-center justify-between py-4 text-sm text-muted-foreground w-full px-4">
                <span>&copy; {new Date().getFullYear()} ByteLabs Studio</span>
                <div className="flex items-center gap-4">
                  <Link href="/docs" className="hover:underline">
                    Docs
                  </Link>
                  <Link href="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                  <button 
                    onClick={toggleFloating}
                    className="p-1.5 rounded-full hover:bg-foreground/10 transition-colors flex-shrink-0"
                    aria-label={isFloating ? 'Attach footer' : 'Detach footer'}
                    title={isFloating ? 'Attach to bottom' : 'Float above content'}
                  >
                    {isFloating ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </footer>
    </>
  )
};

