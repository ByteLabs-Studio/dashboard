export default function TermsPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <article className="prose prose-invert max-w-none">
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Terms of Service
              </h1>
              <div className="mt-3 text-sm text-muted-foreground">
                Last updated & effective since: November 6, 2025
              </div>

              <p className="mt-6 text-muted-foreground max-w-3xl">
                These Terms of Service (&quot;Terms&quot;) govern your use of
                the ByteLabs Website and related services. They explain your
                rights and responsibilities as a user.
              </p>
            </div>

            <section id="overview" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Overview
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ByteLabs provides application software for exploring audio and
                  visuals. The Service is provided for your lawful personal or
                  internal use. These Terms describe the basic relationship
                  between you and ByteLabs.
                </p>
              </div>
            </section>

            <section id="no-accounts" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                No accounts / No payments
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Service does not require user accounts by default and does
                  not require payments for general use. If optional paid
                  features or account-based functionality are introduced in the
                  future, separate terms and instructions will be provided.
                </p>
                <p>
                  In the future we may offer a one-time lifetime purchase
                  (likely between $1–$5 USD) once the app reaches a stable
                  release. Any existing users would be grandfathered and would
                  not be required to pay.
                </p>
              </div>
            </section>

            <section id="acceptable-use" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Acceptable use
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  You may use the Service so long as your use complies with
                  applicable law. Do not use the Service to infringe rights,
                  commit unlawful acts, distribute malicious software, or
                  interfere with the Service or other users&apos; access.
                  (Although I really do not know how you could possibly do this
                  with a composer.)
                </p>
              </div>
            </section>

            <section id="ip" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Intellectual property
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ByteLabs and its licensors retain all rights to the Service,
                  including code, designs, and content. You retain ownership of
                  any content you create, subject to any rights you grant when
                  you choose to share or publish that content.
                </p>
              </div>
            </section>

            <section id="disclaimer" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                No warranties
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Service is provided &quot;as is&quot; without warranties
                  of any kind. To the fullest extent permitted by law, ByteLabs
                  disclaims all implied and express warranties.
                </p>
              </div>
            </section>

            <section id="liability" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Limitation of liability
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  To the extent permitted by law, ByteLabs&apos; liability for
                  any claim arising from or related to the Service is limited to
                  the amounts you actually paid for the Service (if any). We are
                  not liable for indirect or incidental damages.
                </p>
              </div>
            </section>

            <section id="changes" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Changes
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may update these Terms from time to time. If changes are
                  material, we will update the date above. Continued use after
                  changes means you accept the updated Terms.
                </p>
              </div>
            </section>

            <section id="contact" className="mt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Contact
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Questions about these Terms? Email{" "}
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
