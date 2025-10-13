import React from "react";
export default function PrivacyPage() {
  const now = new Date();
  const updated = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
                Last updated & effective since: {" "}
                <time dateTime={now.toISOString()}>{updated}</time>
              </div>

              <p className="mt-6 text-muted-foreground max-w-3xl">
                At ByteLabs we value your privacy. This Privacy Policy
                explains what information we collect, how we use it, and the
                choices you have regarding your information when using the
                ByteLabs Website.
              </p>

            </div>

            <section id="what-we-collect" className="mt-6">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly (for example, when
                you fill out forms, or contact support). We do not collect
                information beyond this however, since the service does not
                require it. However, we may collect anonymous usage data to
                improve the service. This data does not include any personal
                information.
              </p>
            </section>

            <section id="how-we-use" className="mt-6">
              <h2>2. How We Use Information</h2>
              <p>
                We do not share or self your personal information to anyone,
                including third-party service providers, unless required by law.
              </p>
            </section>

            <section id="sharing" className="mt-6">
              <h2>3. Sharing & Third Parties</h2>
              <p>
                We may share information with third-party service providers who
                perform services on our behalf (hosting, analytics, payments).
                These providers are contractually required to protect your data.
                We may also disclose information to comply with legal
                obligations.
              </p>
            </section>

            <section id="data-retention" className="mt-6">
              <h2>4. Data Retention</h2>
              <p>
                We retain personal data as long as needed to provide the
                Service, comply with legal obligations, resolve disputes, and
                enforce our agreements. Retention periods vary depending on the
                type of data and purpose.
              </p>
            </section>

            <section id="security" className="mt-6">
              <h2>5. Security</h2>
              <p>
                We implement reasonable administrative, technical, and physical
                safeguards to protect your information. However, no method of
                transmission or storage is 100% secure. If a breach occurs, we
                will follow applicable notification laws.
              </p>
            </section>

            <section id="your-rights" className="mt-6">
              <h2>6. Your Choices</h2>
              <p>
                Where required by law, you may have rights to access, correct,
                or delete your personal data, or to restrict or object to
                certain processing. To exercise rights, contact us at the
                address below.
              </p>
            </section>

            <section id="children" className="mt-6">
              <h2>7. Children</h2>
              <p>
                Our Service is not directed to children under 13. We do not
                knowingly collect personal information from children under 13.
                If you believe a child has provided us personal information,
                contact us to request deletion.
              </p>
            </section>

            <section id="changes" className="mt-6">
              <h2>8. Changes to this Policy</h2>
              <p>
                We may update this Privacy Policy. When changes are material, we
                will provide notice via the Service or other reasonable means.
                Continued use after changes constitutes acceptance of the
                updated policy.
              </p>
            </section>

            <section id="contact" className="mt-6">
              <h2>9. Contact</h2>
              <p>
                If you have questions or requests about this Privacy Policy,
                contact us at{" "}
                <a
                  href="mailto:legal@ByteLabs.uk"
                  className="text-primary underline"
                >
                  legal@ByteLabs.uk
                </a>
                .
              </p>
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
