"use client";

import React from "react";
import Link from "next/link";

const DISCORD_INVITE =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_DISCORD_INVITE) ||
  "https://discord.gg/vortexbot";

/**
 * QuickActions
 *
 * Small client-side component that exposes quick overview actions for the dashboard.
 * Keep interactive logic inside this component so server components can render it
 * without passing event handlers (avoids runtime errors about passing handlers to
 * client component props).
 *
 * Usage:
 *   import QuickActions from "@components/quick-actions";
 *   <QuickActions />
 */
export default function QuickActions() {
  function handleViewActivity() {
    // Example client-only behavior — navigate or open panel
    window.alert("View recent activity (placeholder)");
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <Link href="/downloads" className="inline-block">
        <button
          type="button"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow hover:brightness-95"
          aria-label="Go to Downloads"
        >
          Downloads
        </button>
      </Link>

      <Link href="/git" className="inline-block">
        <button
          type="button"
          className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:shadow-sm"
          aria-label="Go to Git"
        >
          Git
        </button>
      </Link>

      <a
        href={DISCORD_INVITE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <button
          type="button"
          className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:shadow-sm"
          aria-label="Open Support (Discord)"
        >
          Support
        </button>
      </a>

      {/* Create project button removed */}

      {/* Export button removed */}

      <button
        type="button"
        onClick={handleViewActivity}
        className="rounded-md bg-muted/30 px-3 py-1 text-sm text-muted-foreground hover:bg-muted"
        aria-label="View recent activity"
      >
        Activity
      </button>
    </div>
  );
}
