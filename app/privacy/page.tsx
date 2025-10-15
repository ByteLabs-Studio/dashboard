import React from "react";
export default function PrivacyPage() {

  return (
    <div className="bg-background text-foreground antialiased">
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
          <article className="prose prose-invert max-w-none">
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Privacy Policy
              </h1>
              <div className="mt-3 text-sm text-muted-foreground">
                Last updated & effective since: October 10, 2025
              </div>

              <p className="mt-6 text-muted-foreground max-w-3xl">
                At ByteLabs we value your privacy. This Privacy Policy
                explains what information we collect, how we use it, and the
                choices you have regarding your information when using the
                ByteLabs Website.
              </p>

            </div>

            <section id="what-we-collect" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
              <p>
                We collect information you provide directly (for example, when
                you fill out forms, or contact support). We do not collect
                information beyond this however, since the service does not
                require it. However, we may collect anonymous usage data to
                improve the service. This data does not include any personal
                information.
              </p>
              </div>
            </section>

            <section id="how-we-use" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Information</h2>
              <div className="space-y-4 text-muted-foreground">
              <p>
                We do not share or self your personal information to anyone,
                including third-party service providers, unless required by law.
              </p>
              </div>
            </section>

            <section id="sharing" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Sharing & Third Parties</h2>
              <div className="space-y-4 text-muted-foreground">
              <p>
                We may share information with third-party service providers who
                perform services on our behalf (hosting, analytics, payments).
              </p>
              </div>
            </section>

            <section id="data-security" className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
            </section>

            <section id="your-rights" className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Access your personal data</li>
                  <li>Request correction or deletion</li>
                  <li>Object to processing</li>
                  <li>Request data portability</li>
                </ul>
              </div>
            </section>

            <section id="changes" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Changes to this Policy</h2>
              <div className="space-y-4 text-muted-foreground">
              <p>
                We may update this Privacy Policy. When changes are material, we
                will provide notice via the Service or other reasonable means.
                Continued use after changes constitutes acceptance of the
                updated policy.
              </p>
              </div>
            </section>

            <section id="contact" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact</h2>
              <div className="space-y-4 text-muted-foreground">
              <p>
                If you have questions or requests about this Privacy Policy,
                contact us at{" "}
                <a
                  href="mailto:legal@bytelabs.uk"
                  className="text-primary underline"
                >
                  legal@bytelabs.uk
                </a>
                .
              </p>
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-md border border-border bg-card p-5 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">On this page</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <a
                  href="#what-we-collect"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Information We Collect
                </a>
                <a
                  href="#how-we-use"
                  className="text-muted-foreground hover:text-foreground"
                >
                  How We Use Information
                </a>
                <a
                  href="#sharing"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sharing & Third Parties
                </a>
                <a
                  href="#data-retention"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Data Retention
                </a>
                <a
                  href="#security"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Security
                </a>
                <a
                  href="#your-rights"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Your Choices
                </a>
                <a
                  href="#children"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Children
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
    </div>
  );
}
