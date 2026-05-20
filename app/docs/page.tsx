import Link from "next/link";
import { BookOpen, Code2, Download, Music2, Terminal } from "lucide-react";

const sections = [
  { href: "#overview", label: "Overview" },
  { href: "#install", label: "Install" },
  { href: "#bytebeats", label: "Bytebeats" },
  { href: "#workflow", label: "Workflow" },
];

const quickCards = [
  {
    icon: Music2,
    title: "Audio Lab",
    text: "ByteLabs is for experimenting with algorithmic music, bytebeats, floatbeats, and compact sound formulas.",
  },
  {
    icon: Code2,
    title: "Formula Driven",
    text: "Instead of placing notes on a timeline, you write expressions that generate sample values over time.",
  },
  {
    icon: Terminal,
    title: "Developer Friendly",
    text: "The current rewrite is Rust-focused, with source access and Nix support available while builds mature.",
  },
];

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6">{children}</div>;
}

export default function DocsPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <main className="py-4 md:py-6">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-md border border-border/60 bg-card/50 p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2 font-accent text-xs font-semibold uppercase text-primary">
                  <BookOpen className="h-4 w-4" />
                  Docs
                </div>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <Link
                      key={section.href}
                      href={section.href}
                      className="block rounded-sm px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                    >
                      {section.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <article className="space-y-6">
              <header className="rounded-md border border-border/60 bg-gradient-to-br from-primary/10 via-card/70 to-muted/20 p-6 shadow-sm md:p-8">
                <div className="mb-4 inline-flex rounded-md border border-primary/15 bg-primary/10 px-3 py-1.5 font-accent text-xs font-semibold uppercase text-primary">
                  documentation
                </div>
                <h1 className="text-4xl font-bold tracking-normal md:text-5xl">
                  ByteLabs <span className="font-accent text-primary">Docs</span>
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                  A compact guide to what ByteLabs is, how it fits into algorithmic audio, and how bytebeat-style formulas become sound.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/downloads"
                    className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Downloads
                  </Link>
                  <Link
                    href="/git"
                    className="inline-flex h-10 items-center rounded-md border border-border/70 bg-card/80 px-4 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    Source code
                  </Link>
                </div>
              </header>

              <section id="overview" className="grid gap-3 md:grid-cols-3">
                {quickCards.map((card) => (
                  <div
                    key={card.title}
                    className="surface-lift rounded-md border border-border/60 bg-card/55 p-5 shadow-sm"
                  >
                    <card.icon className="mb-4 h-5 w-5 text-primary" />
                    <h2 className="font-accent text-lg font-bold">{card.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {card.text}
                    </p>
                  </div>
                ))}
              </section>

              <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                <div id="install" className="rounded-md border border-border/60 bg-card/50 p-6 shadow-sm">
                  <div className="font-accent text-xs font-semibold uppercase text-primary">
                    install
                  </div>
                  <h2 className="mt-3 text-2xl font-bold">Current install path</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    ByteLabs is still in active development. The most useful path right now is Nix or source access while packaged Linux, macOS, and Windows builds are prepared.
                  </p>
                  <div className="mt-5 rounded-md border border-border/50 bg-muted/20 p-4">
                    <div className="mb-2 text-sm font-medium">Run with Nix</div>
                    <code className="block overflow-x-auto whitespace-nowrap rounded-sm bg-background/70 px-3 py-2 font-accent text-sm">
                      nix run gitlab:bytelab-studio/ByteLab/reimpl
                    </code>
                  </div>
                </div>

                <div id="bytebeats" className="rounded-md border border-border/60 bg-card/50 p-6 shadow-sm">
                  <div className="font-accent text-xs font-semibold uppercase text-primary">
                    bytebeats
                  </div>
                  <h2 className="mt-3 text-2xl font-bold">How the sound is made</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    A bytebeat formula usually uses a steadily increasing counter, commonly named <span className="font-accent text-foreground">t</span>. Each formula result becomes an audio sample, so bit shifts, multiplication, masks, and mixes turn into rhythm, pitch, grit, and texture.
                  </p>
                </div>
              </section>

              <section id="workflow" className="rounded-md border border-border/60 bg-muted/20 p-5 shadow-sm">
                <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
                  <div>
                    <div className="font-accent text-xs uppercase text-primary">1. Counter</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Time moves forward as a stream of numbers.
                    </p>
                  </div>
                  <div className="hidden font-accent text-muted-foreground md:block">/</div>
                  <div>
                    <div className="font-accent text-xs uppercase text-primary">2. Expression</div>
                    <code className="mt-1 block overflow-x-auto whitespace-nowrap rounded-sm bg-background/70 px-3 py-2 font-accent text-sm">
                      {"t * ((t >> 5) | (t >> 8))"}
                    </code>
                  </div>
                  <div className="hidden font-accent text-muted-foreground md:block">/</div>
                  <div>
                    <div className="font-accent text-xs uppercase text-primary">3. Output</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      The resulting values are heard as generated audio.
                    </p>
                  </div>
                </div>
              </section>

              <section className="grid gap-3 md:grid-cols-2">
                <div className="rounded-md border border-border/60 bg-card/45 p-5">
                  <h2 className="text-xl font-bold">What to write first</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Start with small formulas, then change one operator or shift amount at a time. Bytebeat changes can be dramatic, so tiny edits are easier to understand.
                  </p>
                </div>
                <div className="rounded-md border border-border/60 bg-card/45 p-5">
                  <h2 className="text-xl font-bold">What is still changing</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    The app is being rewritten, so command names, packaged builds, and some workflow details may change as the first release settles.
                  </p>
                </div>
              </section>

              <footer className="border-t border-border/50 pt-5 text-sm text-muted-foreground">
                Last updated for the current dashboard redesign.
              </footer>
            </article>
          </div>
        </Container>
      </main>
    </div>
  );
}
