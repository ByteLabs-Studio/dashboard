"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DISCORD_INVITE =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_DISCORD_INVITE
    ? (process.env.NEXT_PUBLIC_DISCORD_INVITE as string)
    : "https://discord.gg/wd7N28Uq64";

/**
 * Small chevron icon used inside the DownloadDropdown button.
 */
function IconChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/**
 * Shared Navbar component exported for inclusion in layouts/pages.
 * - Client component
 * - Uses next-themes `useTheme` to toggle and display theme
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme || theme) === "dark" : false;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto w-full px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary text-background shadow">
                BL
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold">Bytelab</span>
                <span className="text-xs text-muted-foreground -mt-0.5">
                  Dashboard
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/downloads"
              className="text-sm font-medium text-foreground/90 hover:text-foreground"
            >
              Downloads
            </Link>
            <Link
              href="/git"
              className="text-sm font-medium text-foreground/90 hover:text-foreground"
            >
              Git
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-foreground/90 hover:text-foreground"
            >
              Docs
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="hidden md:inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-foreground hover:bg-foreground/10 transition"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "sun" : "moon"}
                  initial={{
                    rotate: isDark ? -90 : 90,
                    opacity: 0,
                    scale: 0.8,
                    y: -6,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    rotate: isDark ? 90 : -90,
                    opacity: 0,
                    scale: 0.8,
                    y: 6,
                  }}
                  transition={{
                    duration: 0.28,
                    ease: [0.22, 0.61, 0.36, 1], // smooth cubic-bezier ease
                  }}
                  className="flex items-center justify-center"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_4px_rgba(255,255,100,0.4)]" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-400 drop-shadow-[0_0_4px_rgba(100,150,255,0.3)]" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
            <a
              href={DISCORD_INVITE}
              className="hidden sm:inline-flex items-center rounded-md bg-foreground p-6 py-2 text-sm font-medium text-background shadow hover:brightness-95"
            >
              Support
            </a>

            <button
              className="inline-flex items-center gap-2 rounded-md p-2 md:hidden hover:bg-muted"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-foreground"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden py-3">
            <div className="flex flex-col gap-2">
              <Link
                href="/downloads"
                className="px-3 py-2 rounded-md hover:bg-muted/50"
              >
                Downloads
              </Link>
              <Link
                href="/git"
                className="px-3 py-2 rounded-md hover:bg-muted/50"
              >
                Git
              </Link>

              <div className="pt-2 flex gap-2 items-center">
                <button
                  onClick={toggleTheme}
                  className="rounded-md bg-card px-3 py-1 text-sm"
                >
                  Theme
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
