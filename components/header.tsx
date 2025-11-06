"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeDropdown from "./theme-dropdown";
import BackgroundToggle from "./background-toggle";

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

  const wrapperClasses = detached
    ? "fixed top-4 left-0 right-0 z-40 flex justify-center pointer-events-none transition-all duration-700 ease-out"
    : "sticky top-0 z-40 w-full transition-all duration-700 ease-out";

  const headerClasses = detached
    ? `pointer-events-auto w-[calc(100%-2rem)] max-w-6xl rounded-xl bg-background/90 backdrop-blur-md border border-border/10 shadow-xl
       transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
         detached ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-100"
       }`
    : `w-full bg-background/95 backdrop-blur-md border-b border-border/20
       transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
         detached ? "opacity-100" : "opacity-100"
       }`;

  const innerPadding = detached ? "px-4 py-2" : "max-w-[100vw] w-full px-4";

  return (
    <div
      className={`${wrapperClasses} ${detached ? "opacity-100" : "opacity-100"}`}
      style={
        {
          "--tw-translate-y": detached ? "-1rem" : "0",
        } as React.CSSProperties
      }
      aria-hidden={detached ? "false" : "true"}
    >
      <div className={detached ? "h-16" : "h-0"} />

      <header className={`${headerClasses} ${innerPadding}`}>
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-2 w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
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

          <nav className="hidden md:flex items-center gap-6 justify-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/downloads">Downloads</NavLink>
            <NavLink href="/git">Git</NavLink>
            <NavLink href="/docs">Docs</NavLink>
          </nav>

          <div className="flex items-center justify-end gap-3 min-w-[150px]">
            <div className="hidden md:flex items-center gap-2">
              <BackgroundToggle />
              <div className="w-[92px] flex items-center justify-end">
                <ThemeDropdown {...({ fixedLabelWidth: true } as any)} />
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

              <div className="pt-2 flex gap-2 items-center">
                <BackgroundToggle />
                <ThemeDropdown />
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
