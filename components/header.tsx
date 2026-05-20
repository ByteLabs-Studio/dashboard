"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeDropdown from "./theme-dropdown";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`inline-flex h-9 items-center rounded-full border px-4 font-accent text-xs font-semibold uppercase transition-all duration-200 ${
        isActive
          ? "border-primary/30 bg-primary/10 text-foreground shadow-sm"
          : "border-border/70 bg-background/40 text-foreground/80 hover:border-primary/25 hover:bg-primary/5 hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-3 py-2 rounded-md transition-colors duration-200 ${
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "hover:bg-muted/50"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [detached, setDetached] = useState(false);

  const THRESHOLD = 24;

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        setDetached(y > THRESHOLD);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const wrapperClasses = `fixed left-0 right-0 top-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
    detached ? "px-4 pt-2" : "px-0 pt-0"
  }`;

  const headerClasses = `mx-auto w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
    detached
      ? "max-w-6xl rounded-[1.4rem] border border-border/80 bg-background/95 shadow-xl shadow-primary/5 backdrop-blur-md"
      : "max-w-[100vw] rounded-none border-b border-border bg-background"
  }`;

  const innerPadding = detached ? "px-5" : "px-6";

  return (
    <div className={wrapperClasses}>
      <header
        className={`${headerClasses} ${innerPadding}`}
      >
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 w-full mx-auto">
            <div className="flex items-center">
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-background shadow-sm">
                  BL
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-base font-semibold">ByteLabs</span>
                  <span className="text-xs text-muted-foreground -mt-0.5">
                    Homepage
                  </span>
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-2 justify-self-center">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/downloads">Downloads</NavLink>
              <NavLink href="/git">Git</NavLink>
              <NavLink href="/docs">Docs</NavLink>
            </nav>

            <div className="flex items-center justify-end gap-3 pr-1 justify-self-end">
              <div className="hidden md:flex items-center gap-3">
                <div className="w-[80px] flex items-center justify-end relative z-10">
                  <ThemeDropdown fixedLabelWidth={true} />
                </div>
              </div>

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
            <div className="md:hidden py-3 absolute top-full left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)]">
              <div className="flex flex-col gap-2 bg-background/95 p-3 rounded-md shadow">
                <MobileNavLink href="/" onClick={() => setOpen(false)}>
                  Home
                </MobileNavLink>
                <MobileNavLink href="/downloads" onClick={() => setOpen(false)}>
                  Downloads
                </MobileNavLink>
                <MobileNavLink href="/git" onClick={() => setOpen(false)}>
                  Git
                </MobileNavLink>
                <MobileNavLink href="/docs" onClick={() => setOpen(false)}>
                  Docs
                </MobileNavLink>

                <div className="pt-4 flex flex-col gap-8">
                  <div className="flex items-center justify-between gap-6">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <div className="min-w-[140px]">
                      <ThemeDropdown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </header>
    </div>
  );
}
