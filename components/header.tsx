"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeDropdown from "./theme-dropdown";
import { BackgroundSelector } from "./background-selector";

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
      className="relative text-sm font-medium text-foreground/90 hover:text-foreground transition-colors duration-200 py-2 group"
    >
      {children}

      <span
        className={`absolute bottom-0 left-0 right-0 h-[2.45px] bg-primary transform origin-center transition-transform duration-300 ease-out ${
          isActive ? "scale-x-92" : "scale-x-0 group-hover:scale-x-65"
        }`}
      />
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

  const THRESHOLD = 40;

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

  const wrapperClasses = "fixed top-0 left-0 right-0 z-40 flex justify-center";

  const headerClasses = `w-full max-w-6xl transition-all duration-300 ease-out transform-gpu ${
    detached
      ? "mt-4 mx-4 rounded-xl bg-background/95 backdrop-blur-md border border-border/10 shadow-xl pointer-events-auto"
      : "bg-background/95 backdrop-blur-md border-b border-border/20 pointer-events-auto"
  }`;

  const innerPadding = detached ? "px-4 py-2" : "max-w-[100vw] w-full px-6";

  return (
    <div
      className={wrapperClasses}
      style={
        {
          "--tw-translate-y": detached ? "0" : "0",
        } as React.CSSProperties
      }
      aria-hidden={detached ? "false" : "true"}
    >
      <div className={detached ? "h-24" : "h-16"} />

      <header
        className={`${headerClasses} ${innerPadding}`}
        style={{
          transition: "all 300ms ease-out",
          transform: detached
            ? "translateY(8px) scale(0.98)"
            : "translateY(0) scale(1)",
          opacity: 1,
        }}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 w-full mx-auto">
          <div className="flex items-center">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary text-background shadow">
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

          <nav className="hidden md:flex items-center gap-6 justify-self-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/downloads">Downloads</NavLink>
            <NavLink href="/git">Git</NavLink>
            <NavLink href="/functions">Functions</NavLink>
            <NavLink href="/docs">Docs</NavLink>
          </nav>

          <div className="flex items-center justify-end gap-3 pr-1 justify-self-end">
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 border-r border-border/20 pr-8 mr-4">
                <BackgroundSelector />
              </div>
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
              <MobileNavLink href="/functions" onClick={() => setOpen(false)}>
                Functions
              </MobileNavLink>
              <MobileNavLink href="/docs" onClick={() => setOpen(false)}>
                Docs
              </MobileNavLink>

              <div className="pt-4 flex flex-col gap-8">
                <div className="flex items-center justify-between gap-6">
                  <span className="text-sm text-muted-foreground">Background</span>
                  <div className="min-w-[140px]">
                    <BackgroundSelector />
                  </div>
                </div>
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
