import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <main className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
          How Sullivan County collects, uses, and protects your information when you visit our
          website.
        </p>

        <div className="space-y-10 max-w-3xl">
          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-4">Data Collection</h2>
            <div className="space-y-4 font-body text-sm leading-relaxed text-brand-slate">
              <div>
                <h3 className="font-display text-base font-bold text-brand-navy mb-2">Comments</h3>
                <p>
                  When visitors leave comments, we collect the data shown in the comment form, the
                  visitor's IP address, and browser user agent string to help spam detection.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-brand-navy mb-2">Gravatar</h3>
                <p>
                  An anonymized string created from your email address (a hash) may be provided to
                  the Gravatar service to see if you are using it.
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-brand-navy mb-2">Media</h3>
                <p>
                  If you upload images to the website, you should avoid uploading images with
                  embedded location data (EXIF GPS). Visitors to the website can download and
                  extract location data from images.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-4">Cookies</h2>
            <div className="overflow-x-auto rounded-sm border border-brand-surface">
              <table className="w-full font-body text-sm">
                <thead>
                  <tr className="border-b border-brand-surface bg-brand-parchment">
                    <th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
                      Cookie Type
                    </th>
                    <th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-brand-surface">
                    <td className="px-5 py-3.5 text-brand-slate">
                      Comment cookies (name/email/website)
                    </td>
                    <td className="px-5 py-3.5 text-brand-slate">1 year</td>
                  </tr>
                  <tr className="border-b border-brand-surface bg-brand-parchment/50">
                    <td className="px-5 py-3.5 text-brand-slate">Login cookies</td>
                    <td className="px-5 py-3.5 text-brand-slate">
                      2 days (14 days with "Remember Me")
                    </td>
                  </tr>
                  <tr className="border-b border-brand-surface">
                    <td className="px-5 py-3.5 text-brand-slate">Session cookie</td>
                    <td className="px-5 py-3.5 text-brand-slate">Discarded on browser close</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3.5 text-brand-slate">Post-edit cookie</td>
                    <td className="px-5 py-3.5 text-brand-slate">1 day</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-4">
              Embedded Content
            </h2>
            <p className="font-body text-sm leading-relaxed text-brand-slate">
              Pages on this site may include embedded content from other websites (e.g., videos,
              images, articles). Embedded content from other websites behaves in the exact same way
              as if the visitor has visited the other website directly. These websites may collect
              data about you, use cookies, embed additional third-party tracking, and monitor your
              interaction.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-4">Data Retention</h2>
            <div className="space-y-3 font-body text-sm leading-relaxed text-brand-slate">
              <p>
                Comment data and associated metadata are retained indefinitely so follow-up comments
                can be recognized and approved automatically.
              </p>
              <p>
                Registered users can view, edit, or delete their personal information at any time
                (except usernames). Website administrators can also view and edit that information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-4">Your Rights</h2>
            <div className="rounded-sm border border-brand-surface bg-brand-parchment p-5">
              <p className="font-body text-sm leading-relaxed text-brand-slate">
                If you have an account on this site or have left comments, you can request to
                receive an exported file of the personal data we hold about you. You can also
                request that we erase any personal data we hold about you. This does not include any
                data we are obliged to keep for administrative, legal, or security purposes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-navy mb-4">
              Third-Party Services
            </h2>
            <p className="font-body text-sm leading-relaxed text-brand-slate">
              Visitor comments may be checked through an automated spam detection service.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
