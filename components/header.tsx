"use client";
import React, { useState } from "react";
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

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto w-full px-6">
        <div className="flex h-16 items-center justify-between">
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

          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/downloads">Downloads</NavLink>
            <NavLink href="/git">Git</NavLink>
            <NavLink href="/docs">Docs</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <BackgroundToggle />
              <ThemeDropdown />
            </div>
            {/* <a
              href={DISCORD_INVITE}
              className="hidden sm:inline-flex items-center rounded-md bg-[#6577E6] p-6 py-2 text-sm font-medium text-background shadow hover:brightness-95"
            >
              <BsDiscord className="w-5 h-5" />
              <span className="w-2" />
              Support
            </a> */}

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
          <div className="md:hidden py-3 aboslute top-0">
            <div className="flex flex-col gap-2">
              <MobileNavLink href="/" onClick={closeMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/downloads" onClick={closeMenu}>
                Downloads
              </MobileNavLink>
              <MobileNavLink href="/git" onClick={closeMenu}>
                Git
              </MobileNavLink>
              <MobileNavLink href="/docs" onClick={closeMenu}>
                Docs
              </MobileNavLink>

              <div className="pt-2 flex gap-2 items-center">
                <BackgroundToggle />
                <ThemeDropdown />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
