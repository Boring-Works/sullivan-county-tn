/// <reference types="vite/client" />

import {
  createRootRoute,
  type ErrorComponentProps,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { AnnouncementBanner } from "~/components/layout/AnnouncementBanner";
import { MobileBottomTabBar } from "~/components/layout/MobileBottomTabBar";
import { NotFound } from "~/components/layout/NotFound";
import { SiteFooter } from "~/components/layout/SiteFooter";
import { SiteNav } from "~/components/layout/SiteNav";
import { OfflineBanner } from "~/components/shared/OfflineBanner";
import { Button } from "~/components/ui/button";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import i18n, { syncStoredLocale } from "~/lib/i18n";
import { governmentOrganizationJsonLd, jsonLdString } from "~/lib/jsonld";
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
      <h1 className="font-display text-2xl font-bold text-brand-navy mb-2">Something went wrong</h1>
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
        <Button
          variant="copper"
          size="lg"
          onClick={() => {
            if (typeof window !== "undefined") window.location.reload();
          }}
        >
          Refresh Page
        </Button>
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
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      ...seo({
        title: "Sullivan County, Tennessee — Official Government Website",
        description:
          "Official website for Sullivan County, Tennessee. Find departments, services, contact information, and county resources. Established 1779.",
        image: "/images/og/og-default.jpg",
        url: "/",
      }),
      { name: "theme-color", content: "#0c1e33" },
      { name: "theme-color", media: "(prefers-color-scheme: light)", content: "#faf8f5" },
      // iOS PWA — match 2026 spec
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Sullivan County TN" },
      // Android PWA
      { name: "mobile-web-app-capable", content: "yes" },
      // Disable iOS auto-linking phone numbers — we use TelLink which controls
      // the format and tracks telLink semantics. iOS detection produces blue
      // underlines on numbers in body copy that conflict with our typography.
      { name: "format-detection", content: "telephone=no" },
      // Edge / Windows tile color
      { name: "msapplication-TileColor", content: "#0c1e33" },
      // Hint to user agents that we have a brand-light scheme; helps native
      // form controls (Select etc.) match our palette.
      { name: "color-scheme", content: "light" },
      { name: "view-transition", content: "same-origin" },
    ],
    links: [
      ...seoLinks("/"),
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://img.youtube.com" },
      { rel: "dns-prefetch", href: "https://www.youtube-nocookie.com" },
      { rel: "dns-prefetch", href: "https://www.google.com" },
      // Hero image preload moved to the home route — was firing a "preloaded but
      // not used" warning on every other page since the image only renders on /.
      {
        rel: "preload",
        href: "https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap",
        as: "style",
      },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", sizes: "32x32", href: "/favicon.ico" },
      // Multiple sizes — iOS picks the closest match. 180 is the canonical 2026 size.
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "apple-touch-icon", sizes: "192x192", href: "/android-chrome-192x192.png" },
      { rel: "apple-touch-icon", sizes: "512x512", href: "/android-chrome-512x512.png" },
      // Mask icon for Safari pinned tab + macOS dock
      { rel: "mask-icon", href: "/favicon.svg", color: "#0c1e33" },
      { rel: "manifest", href: "/manifest.webmanifest" },
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
  // Register the service worker once, in production only.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (!import.meta.env.PROD) return;
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.error("[sw] registration failed", err);
    });
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <TooltipProvider delayDuration={300}>
        <RootDocument>
          <OfflineBanner />
          <AnnouncementBanner />
          <SiteNav />
          <Outlet />
          <SiteFooter />
          <MobileBottomTabBar />
          <Toaster richColors position="bottom-right" closeButton />
        </RootDocument>
      </TooltipProvider>
    </I18nextProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { i18n } = useTranslation();
  useEffect(() => {
    syncStoredLocale();
  }, []);
  return (
    <html lang={i18n.language ?? "en"} dir="ltr" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Speculation rules removed — React's dangerouslySetInnerHTML rehydration
            causes the browser to ignore the rule set ("created using the innerHTML
            setter"). Reinstate only if served as static HTML outside the React tree. */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data must be inline JSON
          dangerouslySetInnerHTML={{
            __html: jsonLdString(governmentOrganizationJsonLd),
          }}
        />
      </head>
      <body
        className="min-h-screen bg-brand-cream text-brand-slate antialiased font-body"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          onClick={(e) => {
            e.preventDefault();
            const main = document.getElementById("main-content");
            if (main) {
              main.focus();
              main.scrollIntoView();
            }
          }}
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
