import React from "react";
import Link from "next/link";

const DISCORD_INVITE =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_DISCORD_INVITE) ||
  "https://discord.gg/vortexbot";

export default function DashboardActions() {
  return (
    <div className="mt-6 flex flex-wrap gap-3 items-center">
      <Link href="/downloads" className="inline-block">
        <button
          type="button"
          className="cursor-pointer rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out transform-gpu"
        >
          Go to Downloads
        </button>
      </Link>

      <Link href="/git" className="inline-block">
        <button
          type="button"
          className="cursor-pointer rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:shadow-sm hover:bg-accent hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out transform-gpu"
        >
          Go to Git
        </button>
      </Link>

      {/* <a
        href={DISCORD_INVITE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block" */}
      {/* > */}
        {/* <button
          type="button"
          className="cursor-pointer rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:shadow-sm hover:bg-accent hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out transform-gpu"
        >
          Support (Discord)
        </button> */}
      {/* </a> */}
    </div>
  );
}
