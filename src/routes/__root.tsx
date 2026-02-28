/// <reference types="vite/client" />

import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AnnouncementBanner } from "~/components/layout/AnnouncementBanner";
import { SiteFooter } from "~/components/layout/SiteFooter";
import { SiteNav } from "~/components/layout/SiteNav";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

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
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "alternate", type: "application/rss+xml", title: "Sullivan County News", href: "/rss.xml" },
    ],
  }),
  component: RootComponent,
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
        {children}
        <Scripts />
      </body>
    </html>
  );
}
