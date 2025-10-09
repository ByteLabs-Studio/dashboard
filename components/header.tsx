"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

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
export default function Header() {
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
              href="/"
              className="text-sm font-medium text-foreground/90 hover:text-foreground"
            >
              Home
            </Link>
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
              className="hidden md:inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-foreground hover:bg-foreground/10"
              style={{ transition: "background-color 0.2s ease" }}
            >
              <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <motion.div
                  animate={{
                    opacity: isDark ? 1 : 0,
                    scale: isDark ? 1 : 0.6,
                    rotate: isDark ? 0 : -90,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                  data-framer-motion
                >
                  <Sun className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_4px_rgba(255,255,100,0.4)]" />
                </motion.div>

                {/* Moon Icon */}
                <motion.div
                  animate={{
                    opacity: isDark ? 0 : 1,
                    scale: isDark ? 0.6 : 1,
                    rotate: isDark ? 90 : 0,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                  data-framer-motion
                >
                  <Moon className="w-5 h-5 text-blue-400 drop-shadow-[0_0_4px_rgba(100,150,255,0.3)]" />
                </motion.div>
              </div>
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
                href="/"
                className="px-3 py-2 rounded-md hover:bg-muted/50"
              >
                Home
              </Link>
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
                  className="rounded-md bg-card px-3 py-1 text-sm transition-colors"
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
