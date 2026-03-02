import { createFileRoute, Link } from "@tanstack/react-router";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/privacy-policy")({
	component: PrivacyPolicyPage,
	head: () => ({
		meta: seo({
			title: "Privacy Policy — Sullivan County, TN",
			description:
				"How Sullivan County collects, uses, and protects your information when you visit our website.",
			url: "/privacy-policy",
		}),
		links: seoLinks("/privacy-policy"),
	}),
});

function PrivacyPolicyPage() {
	return (
		<main id="main-content" className="pt-24 pb-14">
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
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Information We Collect
						</h2>
						<div className="space-y-4 font-body text-sm leading-relaxed text-brand-slate">
							<div>
								<h3 className="font-display text-base font-bold text-brand-navy mb-2">
									Contact Form Submissions
								</h3>
								<p>
									When you submit a message through our contact form, we collect your name, email
									address, subject selection, and message content. This information is stored
									securely and used solely to respond to your inquiry.
								</p>
							</div>
							<div>
								<h3 className="font-display text-base font-bold text-brand-navy mb-2">
									Automatic Information
								</h3>
								<p>
									Our website is hosted on Cloudflare Workers. Cloudflare may collect standard web
									server logs including your IP address, browser type, referring page, and pages
									visited. This data is used for security, performance monitoring, and aggregate
									analytics. Sullivan County does not use this data to identify individual visitors.
								</p>
							</div>
						</div>
					</section>

					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">Cookies</h2>
						<div className="space-y-3 font-body text-sm leading-relaxed text-brand-slate">
							<p>
								This website uses minimal cookies. We store a small preference in your browser's
								local storage to remember whether you have dismissed the announcement banner. No
								tracking cookies, advertising cookies, or third-party analytics cookies are used.
							</p>
							<div className="overflow-x-auto rounded-sm border border-brand-surface">
								<table className="w-full font-body text-sm">
									<thead>
										<tr className="border-b border-brand-surface bg-brand-parchment">
											<th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
												Storage Type
											</th>
											<th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
												Purpose
											</th>
											<th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
												Duration
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="px-5 py-3.5 text-brand-slate">
												Local Storage (announcement banner)
											</td>
											<td className="px-5 py-3.5 text-brand-slate">
												Remembers banner dismissal
											</td>
											<td className="px-5 py-3.5 text-brand-slate">Persistent until cleared</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</section>

					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Embedded Content
						</h2>
						<p className="font-body text-sm leading-relaxed text-brand-slate">
							Some pages include embedded content from third-party services, such as YouTube
							videos (loaded via privacy-enhanced youtube-nocookie.com) and Google Maps. These
							services are loaded only when you choose to interact with them (click-to-load).
							Once loaded, these services may collect data about you, use cookies, and monitor
							your interaction according to their own privacy policies.
						</p>
					</section>

					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Data Retention
						</h2>
						<p className="font-body text-sm leading-relaxed text-brand-slate">
							Contact form submissions are retained for 90 days and then automatically deleted.
							No user accounts, comment systems, or persistent personal data storage exist on
							this website.
						</p>
					</section>

					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">Your Rights</h2>
						<div className="rounded-sm border border-brand-surface bg-brand-parchment p-5">
							<p className="font-body text-sm leading-relaxed text-brand-slate">
								You may request information about the personal data we hold about you, or request
								that we delete any personal data associated with your contact form submissions.
								To make a request, please{" "}
								<Link
									to="/contact"
									className="text-brand-copper hover:text-brand-copper-light hover:underline font-medium"
								>
									contact us
								</Link>{" "}
								or call the County Mayor's Office at (423) 323-6417.
							</p>
						</div>
					</section>

					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Third-Party Services
						</h2>
						<div className="space-y-3 font-body text-sm leading-relaxed text-brand-slate">
							<p>This website uses the following third-party services:</p>
							<ul className="list-disc pl-5 space-y-1.5">
								<li>
									<strong>Cloudflare</strong> — Hosting, edge delivery, and security (
									<a
										href="https://www.cloudflare.com/privacypolicy/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-brand-copper hover:underline"
									>
										Privacy Policy
									</a>
									)
								</li>
								<li>
									<strong>Google Fonts</strong> — Web typography (
									<a
										href="https://policies.google.com/privacy"
										target="_blank"
										rel="noopener noreferrer"
										className="text-brand-copper hover:underline"
									>
										Privacy Policy
									</a>
									)
								</li>
								<li>
									<strong>YouTube</strong> — Embedded videos via privacy-enhanced mode (
									<a
										href="https://policies.google.com/privacy"
										target="_blank"
										rel="noopener noreferrer"
										className="text-brand-copper hover:underline"
									>
										Privacy Policy
									</a>
									)
								</li>
								<li>
									<strong>Google Maps</strong> — Embedded map on contact page (
									<a
										href="https://policies.google.com/privacy"
										target="_blank"
										rel="noopener noreferrer"
										className="text-brand-copper hover:underline"
									>
										Privacy Policy
									</a>
									)
								</li>
							</ul>
						</div>
					</section>

					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Document Downloads
						</h2>
						<p className="font-body text-sm leading-relaxed text-brand-slate">
							County documents (PDFs, forms, agendas) are served directly from our servers. No
							third-party download tracking is used. Documents may contain metadata from their
							original creation.
						</p>
					</section>

					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Changes to This Policy
						</h2>
						<p className="font-body text-sm leading-relaxed text-brand-slate">
							This privacy policy may be updated periodically to reflect changes to our website
							or legal requirements. The effective date will be noted when changes are made.
						</p>
						<p className="mt-3 font-body text-xs text-brand-stone">
							Last updated: March 2026
						</p>
					</section>
				</div>
			</div>
		</main>
	);
}
