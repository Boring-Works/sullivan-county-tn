/// <reference types="vite/client" />

import {
	type ErrorComponentProps,
	Link,
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AnnouncementBanner } from "~/components/layout/AnnouncementBanner";
import { NotFound } from "~/components/layout/NotFound";
import { SiteFooter } from "~/components/layout/SiteFooter";
import { SiteNav } from "~/components/layout/SiteNav";
import appCss from "~/styles/app.css?url";
import { seo, seoLinks } from "~/utils/seo";

function RouteErrorFallback({ error }: ErrorComponentProps) {
	return (
		<main id="main-content" className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
			<div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-safety/10">
				<svg
					className="h-8 w-8 text-brand-safety"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<title>Error</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
					/>
				</svg>
			</div>
			<h1 className="font-display text-2xl font-bold text-brand-navy mb-2">
				Something went wrong
			</h1>
			<p className="font-body text-brand-slate-light mb-6 max-w-md mx-auto">
				We encountered an unexpected error. Please try refreshing the page or return to the
				homepage.
			</p>
			{error instanceof Error && (
				<p className="font-body text-xs text-brand-stone mb-6 max-w-lg mx-auto break-words">
					{error.message}
				</p>
			)}
			<div className="flex items-center justify-center gap-4">
				<button
					type="button"
					onClick={() => window.location.reload()}
					className="rounded-sm bg-brand-copper px-6 py-2.5 font-body text-sm font-semibold text-white hover:bg-brand-copper-light transition-colors"
				>
					Refresh Page
				</button>
				<Link
					to="/"
					className="rounded-sm border border-brand-surface px-6 py-2.5 font-body text-sm font-semibold text-brand-navy hover:bg-brand-parchment transition-colors"
				>
					Go Home
				</Link>
			</div>
		</main>
	);
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...seo({
        title: "Sullivan County, Tennessee — Official Government Website",
        description:
          "Official website for Sullivan County, Tennessee. Find departments, services, contact information, and county resources. Established 1779.",
        image: "/images/og/og-default.jpg",
        url: "/",
      }),
    ],
    links: [
      ...seoLinks("/"),
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", sizes: "32x32", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Sullivan County News",
        href: "/rss.xml",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: RouteErrorFallback,
});

function RootComponent() {
  return (
    <RootDocument>
      <AnnouncementBanner />
      <SiteNav />
      <Outlet />
      <SiteFooter />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-brand-cream text-brand-slate antialiased font-body">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:bg-brand-copper focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
        <Scripts />
        {/* Cloudflare Web Analytics — Add CF Dashboard token to enable:
            1. Go to dash.cloudflare.com → Web Analytics → Add Site
            2. Replace YOUR_TOKEN_HERE with the provided token
            3. Uncomment the script tag below
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"YOUR_TOKEN_HERE"}'
        /> */}
      </body>
    </html>
  );
}
