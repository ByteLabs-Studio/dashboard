"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FaLinux, FaApple, FaWindows } from "react-icons/fa";

const DISCORD_INVITE =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_DISCORD_INVITE
    ? (process.env.NEXT_PUBLIC_DISCORD_INVITE as string)
    : "https://discord.gg/your-invite";

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
 * Simple Download dropdown used in the navbar.
 * - Links to the unified /downloads page (can be adjusted to deep-link)
 * - Uses icons for platforms
 */
function DownloadDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (ref.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const items = [
    { id: "linux", label: "Linux", href: "/downloads" },
    { id: "macos", label: "macOS", href: "/downloads" },
    { id: "windows", label: "Windows", href: "/downloads" },
  ];

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1 text-sm font-medium text-foreground shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Download
        <IconChevronDown className={open ? "rotate-180" : ""} />
      </button>

      <div
        role="menu"
        aria-hidden={!open}
        className={`origin-top-right right-0 mt-2 w-44 rounded-md bg-background shadow-lg ring-1 ring-black/5 border border-border transition-opacity ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="py-1">
          {items.map((it) => (
            <Link key={it.id} href={it.href}>
              <div
                onClick={() => setOpen(false)}
                role="menuitem"
                className="w-full text-left px-4 py-2 text-sm text-foreground/90 hover:bg-muted/50 hover:text-foreground flex items-center gap-2 cursor-pointer"
              >
                <span className="inline-block w-6 text-center text-muted-foreground">
                  {it.id === "linux" ? (
                    <FaLinux aria-hidden />
                  ) : it.id === "macos" ? (
                    <FaApple aria-hidden />
                  ) : (
                    <FaWindows aria-hidden />
                  )}
                </span>
                <span>{it.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
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
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/90 hover:text-foreground"
            >
              Support
            </a>
            <Link
              href="/docs"
              className="text-sm font-medium text-foreground/90 hover:text-foreground"
            >
              Docs
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <DownloadDropdown />
            </div>

            <button
              onClick={toggleTheme}
              className="hidden md:inline-flex items-center gap-2 rounded-md bg-card px-3 py-1 text-sm text-foreground border border-border hover:shadow-sm"
            >
              {isDark ? "Light" : "Dark"}
            </button>

            <button
              onClick={() => alert("Sign in clicked")}
              className="hidden sm:inline-flex items-center rounded-md bg-foreground px-3 py-1 text-sm font-medium text-background shadow hover:brightness-95"
            >
              Sign in
            </button>

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
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md hover:bg-muted/50"
              >
                Support
              </a>

              <div className="pt-2 flex gap-2 items-center">
                <DownloadDropdown />
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
