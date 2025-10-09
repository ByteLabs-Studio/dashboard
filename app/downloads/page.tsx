import Link from "next/link";
import { FaLinux, FaApple, FaWindows } from "react-icons/fa";

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <main className="py-12 pb-28 md:pb-32">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <header className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Downloads
              </h1>
              <p className="text-muted-foreground">
                Choose your platform below to get the latest builds or
                installers.
              </p>
            </header>

            <section className="grid gap-4 sm:grid-cols-3 auto-rows-fr items-stretch">
              <div
                className="min-w-0 relative rounded-md border border-border pt-4 pb-6 px-6 bg-card hover:shadow-md transition flex flex-col gap-4 h-full"
                aria-label="Linux downloads"
                role="group"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">Linux</h3>
                      <p className="text-sm text-muted-foreground italic mt-1">
                        Tarballs and packages for popular distributions.
                      </p>
                    </div>

                    <div className="absolute top-4 right-4 w-12 h-12 text-2xl">
                      <FaLinux className="text-foreground/80" aria-hidden />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 items-center">
                  <a
                    href="https://example.com/downloads/linux/latest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center whitespace-nowrap rounded-md border border-border bg-foreground px-3 py-1 text-sm font-medium text-background hover:brightness-95"
                  >
                    Download Latest
                  </a>
                  <a
                    href="https://example.com/downloads/linux/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center whitespace-nowrap rounded-md border border-border bg-card px-3 py-1 text-sm hover:shadow-sm"
                  >
                    Releases
                  </a>
                </div>
              </div>

              <div
                className="min-w-0 relative rounded-md border border-border pt-4 pb-6 px-6 bg-card hover:shadow-md transition flex flex-col gap-4 h-full"
                aria-label="macOS downloads"
                role="group"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">macOS</h3>
                      <p className="text-sm text-muted-foreground italic mt-1">
                        Universal binaries and installers for macOS.
                      </p>
                    </div>

                    <div className="absolute top-4 right-4 w-12 h-12 text-2xl">
                      <FaApple className="text-foreground/80" aria-hidden />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 items-center">
                  <a
                    href="https://example.com/downloads/macos/latest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center whitespace-nowrap rounded-md border border-border bg-foreground px-3 py-1 text-sm font-medium text-background hover:brightness-95"
                  >
                    Download Latest
                  </a>
                  <a
                    href="https://example.com/downloads/macos/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center whitespace-nowrap rounded-md border border-border bg-card px-3 py-1 text-sm hover:shadow-sm"
                  >
                    Releases
                  </a>
                </div>
              </div>

              <div
                className="min-w-0 relative rounded-md border border-border pt-4 pb-6 px-6 bg-card hover:shadow-md transition flex flex-col gap-4 h-full"
                aria-label="Windows downloads"
                role="group"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">Windows</h3>
                      <p className="text-sm text-muted-foreground italic mt-1">
                        Installers and portable builds for Windows.
                      </p>
                    </div>

                    <div className="absolute top-4 right-4 w-12 h-12 text-2xl">
                      <FaWindows className="text-foreground/80" aria-hidden />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 items-center">
                  <a
                    href="https://example.com/downloads/windows/latest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center whitespace-nowrap rounded-md border border-border bg-foreground px-3 py-1 text-sm font-medium text-background hover:brightness-95"
                  >
                    Download Latest
                  </a>
                  <a
                    href="https://example.com/downloads/windows/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center whitespace-nowrap rounded-md border border-border bg-card px-3 py-1 text-sm hover:shadow-sm"
                  >
                    Releases
                  </a>
                </div>
              </div>
            </section>

            <section>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm text-muted-foreground hover:underline"
                >
                  ← Back to home
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
