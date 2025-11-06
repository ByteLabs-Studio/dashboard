import React from "react";

export default function PrivacyPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <article className="prose prose-invert max-w-none">
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Privacy Policy
              </h1>
              <div className="mt-3 text-sm text-muted-foreground">
                Last updated & effective since: November 6, 2025
              </div>

              <p className="mt-6 text-muted-foreground max-w-3x1">
                ByteLabs fully respects your privacy. This page exists because
                it is a requirement of the General Data Protection Regulation
                (GDPR) and other data protection laws.
              </p>
            </div>

            <section id="summary" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Quick summary
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We do not collect, store, or sell personal data. There is no
                  tracking, no analytics, and no user profiling performed by
                  ByteLabs on this website or in the application by default.
                </p>
              </div>
            </section>

            <section id="no-collection" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                No data collection
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ByteLabs does not collect personal information from visitors
                  or users. If you do not explicitly provide information (for
                  example, via an email to the address below), none is stored or
                  processed by us.
                </p>
              </div>
            </section>

            <section id="cookies" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Cookies & tracking
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  This website does not set cookies for tracking or analytics.
                  Any incidental technical cookies required by third-party
                  hosting (if used) are not used to identify or profile
                  visitors.
                </p>
              </div>
            </section>

            <section id="third-parties" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Third parties
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We do not share personal data because we do not collect it. If
                  you use features that explicitly interact with third-party
                  services, those services own privacy policies apply.
                </p>
              </div>
            </section>

            <section id="data-requests" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Data requests
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Because we do not collect or store personal data, there is
                  nothing to access, modify, or delete. If you believe we hold
                  information about you, contact us and we will investigate.
                </p>
              </div>
            </section>

            <section id="changes" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Changes to this policy
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  It is unlikely we will make changes to this policy since we do
                  not collect any data; however, please check this page
                  occasionally for updates.
                </p>
              </div>
            </section>

            <section id="contact" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Contact
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  For questions about this policy, email:{" "}
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
        </div>
      </main>
    </div>
  );
}
