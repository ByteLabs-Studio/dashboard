export default function GitPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <main className="py-12 pb-28 md:pb-32">
        <div className="max-w-6xl mx-auto w-full px-6">
          <div className="mx-auto max-w-3xl space-y-6">
            <header className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Repositories
              </h1>
              <p className="text-muted-foreground">
                Visit the project repositories. These links open the repo pages
                on their respective hosts (GitHub, GitLab).
              </p>
            </header>

            <section className="grid gap-4 sm:grid-cols-2">
              <a
                href="https://github.com/ByteLabs-Studio/ByteLabs"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border p-6 bg-card hover:shadow-md transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">GitHub</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Open the repository on GitHub.
                    </p>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-foreground/80"
                    aria-hidden
                  >
                    <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.87 3.16 9 7.54 10.45.55.1.75-.24.75-.53v-1.86c-3.07.66-3.72-1.49-3.72-1.49-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.67.08-.67 1.09.08 1.67 1.12 1.67 1.12.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.45-.28-5.02-1.23-5.02-5.46 0-1.21.43-2.2 1.13-2.98-.12-.28-.49-1.42.11-2.96 0 0 .92-.29 3.02 1.13a10.5 10.5 0 012.75-.37c.93 0 1.87.13 2.75.37 2.1-1.42 3.02-1.13 3.02-1.13.6 1.54.23 2.68.12 2.96.7.78 1.13 1.77 1.13 2.98 0 4.23-2.58 5.18-5.04 5.45.39.34.74 1.02.74 2.06v3.05c0 .29.2.64.76.53 4.38-1.45 7.54-5.58 7.54-10.45C23.25 5.48 18.27.5 12 .5z" />
                  </svg>
                </div>
              </a>

              <a
                href="https://gitlab.com/ByteLabs-studio/ByteLabs"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border p-6 bg-card hover:shadow-md transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">GitLab</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Open the repository on GitLab.
                    </p>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-foreground/80"
                    aria-hidden
                  >
                    <path d="M22.965 13.21l-2.334-6.666a1.037 1.037 0 00-1.305-.66L12 7.21 4.708 5.9a1.038 1.038 0 00-1.305.66L1.068 12.235a.517.517 0 00.08.55L11.5 23.5a1 1 0 001.5 0l10.852-10.515a.517.517 0 00.013-.775z" />
                  </svg>
                </div>
              </a>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
