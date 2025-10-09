import Link from "next/link";
import DashboardActions from "@components/dashboard-actions";
import Plasma from "./Plasma";

const DISCORD_INVITE =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_DISCORD_INVITE) ||
  "https://discord.gg/wd7N28Uq64";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto w-full px-6">{children}</div>;
}

export default function HomePage() {
  return (
    <div className="bg-background text-foreground antialiased relative min-h-screen">
      <div className="absolute inset-0 opacity-20">
        <Plasma
          color="#60a5fa"
          speed={0.3}
          opacity={1.0}
          mouseInteractive={false}
        />
      </div>
      <main className="py-12 pb-28 md:pb-32 relative z-10">
        <Container>
          <section className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                ByteLabs
              </h1>
              <p className="mt-4 text-muted-foreground max-w-xl">
                Code. Sound. Visualize — ByteLab is an App made with Electron
                desgined to create Music or just Audio in general just by using
                Bytes.
              </p>

              <DashboardActions />
            </div>

            <div>
              <div className="rounded-lg border border-border p-6 bg-card/80 backdrop-blur-sm shadow-sm">
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
        </Container>
      </main>
    </div>
  );
}
