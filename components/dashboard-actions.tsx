"use client";

import React from "react";
import Link from "next/link";

const DISCORD_INVITE =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_DISCORD_INVITE) ||
  "https://discord.gg/your-invite";

/**
 * Client-side component that contains interactive dashboard buttons.
 * - Keeps event handlers inside a client component so server pages can render it
 *   without passing functions (avoids the "Event handlers cannot be passed to
 *   Client Component props" runtime error).
 *
 * Usage:
 *   import DashboardActions from "@components/dashboard-actions";
 *   // Render inside a server component page without passing callbacks
 *   <DashboardActions />
 */
export default function DashboardActions() {
  // Create/export actions removed per request.

  return (
    <div className="mt-6 flex flex-wrap gap-3 items-center">
      <Link href="/downloads" className="inline-block">
        <button
          type="button"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow hover:brightness-95"
        >
          Go to Downloads
        </button>
      </Link>

      <Link href="/git" className="inline-block">
        <button
          type="button"
          className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:shadow-sm"
        >
          Go to Git
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
        >
          Support (Discord)
        </button>
      </a>

      {/* Create project and Export buttons removed */}
    </div>
  );
}
