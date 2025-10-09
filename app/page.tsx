import Link from "next/link";
import DashboardActions from "@components/dashboard-actions";

const DISCORD_INVITE =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_DISCORD_INVITE) ||
  "https://discord.gg/wd7N28Uq64";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto w-full px-6">{children}</div>;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <main className="py-12 pb-28 md:pb-32">
        <Container>
          <section className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                ByteLabs
              </h1>
              <p className="mt-4 text-muted-foreground max-w-xl">
                Code. Sound. Visualize — ByteLab is an App made with Electron desgined to create Music or just Audio in general just by using Bytes.

              </p>

              <DashboardActions />
            </div>

            <div>
              <div className="rounded-lg border border-border p-6 bg-card shadow-sm">
                <h3 className="font-semibold">Quick overview</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>• Version: v1.1.0 Public Release</li>
                  <li>• Contributors: 3</li>
                  <li>• Status: Active Development</li>
                </ul>
                <div className="mt-6" />
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-lg font-semibold">Recent activity</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Deployed new release",
                // "New user signup",
                // "Backup complete",
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

      <footer className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/60">
        <Container>
          <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
            <div>© {new Date().getFullYear()} Bytelab Studio</div>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
