"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";


function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto w-full px-6">{children}</div>;
}

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
    { id: "linux", label: "Linux" },
    { id: "macos", label: "macOS" },
    { id: "windows", label: "Windows" },
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
            <button
              key={it.id}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-foreground/90 hover:bg-muted/50 hover:text-foreground flex items-center gap-2"
            >
              <span className="inline-block w-6 text-center text-muted-foreground">
                {it.id === "linux" ? "🐧" : it.id === "macos" ? "🍎" : "🪟"}
              </span>
              <span>{it.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
      if (prefersDark) document.documentElement.classList.add("dark");
    } catch {
    }
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      try {
        const root = window.document.documentElement;
        if (next) root.classList.add("dark");
        else root.classList.remove("dark");
      } catch {
      }
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-sm border-b border-border">
      <Container>
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
              href="/dashboard"
              className="text-sm font-medium text-foreground/90 hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium text-foreground/90 hover:text-foreground"
            >
              Projects
            </Link>
            <Link
              href="/settings"
              className="text-sm font-medium text-foreground/90 hover:text-foreground"
            >
              Settings
            </Link>
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
              {dark ? "Light" : "Dark"}
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
                href="/dashboard"
                className="px-3 py-2 rounded-md hover:bg-muted/50"
              >
                Dashboard
              </Link>
              <Link
                href="/projects"
                className="px-3 py-2 rounded-md hover:bg-muted/50"
              >
                Projects
              </Link>
              <Link
                href="/settings"
                className="px-3 py-2 rounded-md hover:bg-muted/50"
              >
                Settings
              </Link>
              <Link
                href="/docs"
                className="px-3 py-2 rounded-md hover:bg-muted/50"
              >
                Docs
              </Link>
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
      </Container>
    </header>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main className="py-12">
        <Container>
          <section className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                A clean starting dashboard
              </h1>
              <p className="mt-4 text-muted-foreground max-w-xl">
                This starter uses shadcn-style tokens and Tailwind to provide a
                neutral, polished base. The Download dropdown in the navbar
                contains OS options (Linux, macOS, Windows) as placeholders.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/dashboard" className="inline-block">
                  <button className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow hover:brightness-95">
                    Go to dashboard
                  </button>
                </Link>
                <Link href="/projects" className="inline-block">
                  <button className="rounded-md border border-border bg-card px-3 py-1 text-sm hover:shadow-sm">
                    View projects
                  </button>
                </Link>
              </div>
            </div>

            <div>
              <div className="rounded-lg border border-border p-6 bg-card shadow-sm">
                <h3 className="font-semibold">Quick overview</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>• Projects: 12</li>
                  <li>• Active users: 2,134</li>
                  <li>• Events today: 8,421</li>
                </ul>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => alert("Create project")}
                    className="rounded-md bg-foreground px-3 py-1 text-sm font-medium text-background shadow"
                  >
                    Create project
                  </button>
                  <button
                    onClick={() => alert("Export")}
                    className="rounded-md border border-border bg-card px-3 py-1 text-sm"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-lg font-semibold">Recent activity</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Deployed new release",
                "New user signup",
                "Backup complete",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-md border border-border p-4 bg-muted/30 shadow-sm"
                >
                  <div className="text-sm font-medium">{item}</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {new Date().toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Container>
      </main>

      <footer className="border-t border-border bg-background/50">
        <Container>
          <div className="flex items-center justify-between py-6 text-sm text-muted-foreground">
            <div>© {new Date().getFullYear()} Bytelab Studio</div>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
