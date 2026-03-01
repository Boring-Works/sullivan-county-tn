import { Link } from "@tanstack/react-router";
import { Building2, FileText, Home, Users } from "lucide-react";

const quickLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/departments", label: "Departments", icon: Building2 },
  { to: "/documents", label: "Documents", icon: FileText },
  { to: "/commissioners", label: "Commissioners", icon: Users },
] as const;

export function NotFound() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="font-display text-7xl font-bold text-brand-brass/30 sm:text-9xl">404</p>

      <h1 className="mt-4 font-display text-3xl font-bold text-brand-navy sm:text-4xl">
        Page Not Found
      </h1>

      <p className="mt-4 mx-auto max-w-lg font-body text-base leading-relaxed text-brand-slate-light">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved. Try searching
        for what you need, or visit one of the links below.
      </p>

      <div className="mt-8 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-brand-copper to-transparent" />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex flex-col items-center gap-2 rounded-lg border border-brand-surface bg-white p-4 font-body text-sm font-medium text-brand-navy transition-all hover:border-brand-copper hover:shadow-sm"
          >
            <link.icon className="size-5 text-brand-copper" />
            {link.label}
          </Link>
        ))}
      </div>

      <p className="mt-8 font-body text-sm text-brand-stone">
        Press{" "}
        <kbd className="rounded border border-brand-surface bg-brand-parchment px-1.5 py-0.5 font-mono text-xs">
          ⌘K
        </kbd>{" "}
        to search the site
      </p>
    </main>
  );
}
