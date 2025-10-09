import Link from "next/link";

export default function TermsPage() {
  const now = new Date();
  const updated = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
          <article className="prose prose-invert max-w-none">
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Terms of Service
              </h1>
              <div className="mt-3 text-sm text-muted-foreground">
                Last updated:{" "}
                <time dateTime={now.toISOString()}>{updated}</time>
              </div>
              <p className="mt-6 text-muted-foreground max-w-3xl">
                These Terms of Service (&quot;Terms&quot;) govern your use of
                the Bytelabs Website and related services. They explain your
                rights and responsibilities as a user.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/" className="text-sm underline">
                  Back to home
                </Link>
                <Link href="/privacy" className="text-sm underline">
                  View privacy policy
                </Link>
              </div>
            </div>

            <section id="introduction" className="mt-6">
              <h2>1. Introduction</h2>
              <p>
                By using the Service you agree to these Terms. If you do not
                agree, do not use the Service. We may modify these Terms from
                time to time; continued use after changes constitutes acceptance
                of the updated Terms.
              </p>
            </section>

            <section id="use" className="mt-6">
              <h2>2. Use of the Service</h2>
              <p>
                The Service is provided for your internal business or personal
                use. You agree to comply with all applicable laws and not to
                misuse the Service, including but not limited to attempting to
                breach security, reverse-engineer, or interfere with the normal
                operation of the Service.
              </p>

              <ul>
                <li>
                  Do not attempt to access data you are not authorized to view.
                </li>
                <li>
                  Do not attempt to disrupt the Service or overwhelm our
                  systems.
                </li>
                <li>
                  Follow any posted policies and documentation for features you
                  use.
                </li>
              </ul>
            </section>

            <section id="accounts" className="mt-6">
              <h2>3. Accounts</h2>
              <p>
                Some parts of the Service require an account. You are
                responsible for maintaining the confidentiality of account
                credentials and are liable for actions taken using your account.
                Notify us immediately if you suspect unauthorized access.
              </p>
            </section>

            <section id="ip" className="mt-6">
              <h2>4. Intellectual Property</h2>
              <p>
                All content, features and functionality of the Service are the
                exclusive property of Bytelabs or its licensors. You
                retain ownership of content you submit, but you grant us the
                license necessary to operate the Service.
              </p>
            </section>

            <section id="termination" className="mt-6">
              <h2>5. Termination</h2>
              <p>
                We may suspend or terminate your access to the Service at any
                time for violations of these Terms or for other reasonable
                causes. On termination your access to the Service ends and any
                data retention will follow our retention policies.
              </p>
            </section>

            <section id="warranties" className="mt-6">
              <h2>6. Warranties and Disclaimers</h2>
              <p>
                The Service is provided &quot;as is&quot; and &quot;as
                available&quot;. To the fullest extent permitted by law, Bytelabs
                disclaims all warranties, express or implied.
              </p>
            </section>

            <section id="liability" className="mt-6">
              <h2>7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event will Bytelabs be liable for any indirect,
                incidental, special, consequential or punitive damages arising
                out of or related to your use of the Service.
              </p>
            </section>

            <section id="changes" className="mt-6">
              <h2>8. Changes to the Service and Terms</h2>
              <p>
                We may modify the Service and these Terms. When changes are
                material, we will provide notice. Your continued use after
                notice constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section id="contact" className="mt-6">
              <h2>9. Contact</h2>
              <p>
                Questions about these Terms? Contact us at{" "}
                <a
                  href="mailto:support@bytelab.example"
                  className="text-primary underline"
                >
                  legal@bytelabs.uk
                </a>
                .
              </p>
            </section>

            <section className="mt-12 text-sm text-muted-foreground">
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-md border border-border bg-card p-5 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">On this page</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <a
                  href="#introduction"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Introduction
                </a>
                <a
                  href="#use"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Use of the Service
                </a>
                <a
                  href="#accounts"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Accounts
                </a>
                <a
                  href="#ip"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Intellectual Property
                </a>
                <a
                  href="#termination"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Termination
                </a>
                <a
                  href="#warranties"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Warranties
                </a>
                <a
                  href="#liability"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Limitation of Liability
                </a>
                <a
                  href="#changes"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Changes
                </a>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </a>
              </nav>
            </div>
          </aside>
        </div>
      </main>

      {/* Sticky footer (keeps the existing footer consistent) */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
            <div>© {new Date().getFullYear()} Bytelab Studio</div>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
