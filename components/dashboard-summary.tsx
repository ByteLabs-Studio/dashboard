import React from "react";
import Link from "next/link";

/**
 * Server-side DashboardSummary component
 *
 * Purpose:
 * - Replace the previous "quick overview" with a compact, useful server-rendered
 *   summary for the homepage.
 * - No client-side interactivity included — this is a pure server component so it
 *   can be rendered directly inside server pages.
 *
 * Replace the mocked `data` object with real data fetches (DB / API) as needed.
 */

type Metric = {
  id: string;
  label: string;
  value: string | number;
  hint?: string;
};

type Activity = {
  id: string;
  title: string;
  when: string; // ISO timestamp or human readable
  meta?: string;
};

export default function DashboardSummary() {
  // Mocked data — replace these with real server-side queries when available
  const metrics: Metric[] = [
    { id: "projects", label: "Projects", value: 12 },
    { id: "activeUsers", label: "Active users (30d)", value: "2,134" },
    { id: "events", label: "Events (today)", value: "8,421" },
    { id: "uptime", label: "Uptime", value: "99.98%", hint: "30d" },
  ];

  const storageUsed = 48.2; // GB
  const storageTotal = 128; // GB

  const recentActivity: Activity[] = [
    { id: "a1", title: "Deployed v1.3.0", when: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), meta: "CI • 3 files changed" },
    { id: "a2", title: "New user signup", when: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), meta: "Email verified" },
    { id: "a3", title: "Automated backup", when: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), meta: "Duration: 4m" },
  ];

  function formatWhen(iso: string) {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  }

  function pct(part: number, total: number) {
    if (total <= 0) return 0;
    return Math.round((part / total) * 100);
  }

  return (
    <section aria-labelledby="dashboard-summary-heading" className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 id="dashboard-summary-heading" className="text-lg font-semibold">
            Summary
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Key metrics and recent activity — replace with real data sources as needed.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/downloads" className="hover:underline">
            Downloads
          </Link>
          <span>·</span>
          <Link href="/git" className="hover:underline">
            Repositories
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {/* Metrics column */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((m) => (
              <div key={m.id} className="rounded-md border border-border bg-background/50 p-3">
                <div className="text-sm text-muted-foreground">{m.label}</div>
                <div className="mt-1 text-2xl font-semibold">{m.value}</div>
                {m.hint && <div className="mt-1 text-xs text-muted-foreground">{m.hint}</div>}
              </div>
            ))}
          </div>

          <div className="rounded-md border border-border bg-background/50 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Storage</div>
                <div className="mt-1 text-lg font-semibold">
                  {storageUsed}GB / {storageTotal}GB
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{pct(storageUsed, storageTotal)}%</div>
            </div>

            <div className="mt-3 h-2 w-full rounded-full bg-muted/40">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${pct(storageUsed, storageTotal)}%` }}
                aria-hidden
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">Consider cleaning old artifacts if storage is above 80%.</div>
          </div>
        </div>

        {/* Recent activity column */}
        <div className="md:col-span-2 grid gap-4">
          <div className="rounded-md border border-border bg-background/50 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Recent activity</div>
                <div className="mt-1 text-base font-medium">Latest changes & events</div>
              </div>
              <div className="text-sm">
                <Link href="/activity" className="text-sm text-muted-foreground hover:underline">
                  View all
                </Link>
              </div>
            </div>

            <ul className="mt-3 space-y-3">
              {recentActivity.map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{a.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{a.meta}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{formatWhen(a.when)}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* System status / quick links */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-md border border-border bg-background/50 p-3 text-center">
              <div className="text-sm text-muted-foreground">API</div>
              <div className="mt-1 text-lg font-semibold text-foreground">Healthy</div>
            </div>

            <div className="rounded-md border border-border bg-background/50 p-3 text-center">
              <div className="text-sm text-muted-foreground">Last deploy</div>
              <div className="mt-1 text-lg font-semibold text-foreground">{formatWhen(new Date().toISOString())}</div>
            </div>

            <div className="rounded-md border border-border bg-background/50 p-3 text-center">
              <div className="text-sm text-muted-foreground">Backups</div>
              <div className="mt-1 text-lg font-semibold text-foreground">OK</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
