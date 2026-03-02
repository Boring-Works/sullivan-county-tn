import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { MountainDividerInverted } from "~/components/shared/MountainDivider";

const QUICK_LINKS = [
  { label: "Departments", href: "/departments" },
  { label: "History", href: "/history" },
  { label: "Communities", href: "/communities" },
  { label: "Commissioners", href: "/commissioners" },
  { label: "News", href: "/news" },
  { label: "Documents", href: "/documents" },
  { label: "Contact", href: "/contact" },
] as const;

const EXTERNAL_RESOURCES = [
  { label: "Schools", url: "https://www.sullivank12.net" },
  { label: "Library", url: "https://www.scpltn.org" },
  { label: "Sheriff", url: "https://www.scsotn.com" },
  { label: "Animal Shelter", url: "https://www.animalshelter-sullivancounty.org" },
] as const;

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="relative bg-brand-navy-deep text-brand-cream/70">
      <MountainDividerInverted fill="var(--color-brand-navy-deep)" />

      {/* Top accent */}
      <div className="divider-heritage" />

      {/* Topo texture */}
      <div className="absolute inset-0 bg-topo-pattern opacity-100 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-14">
          {/* Column 1: County Branding */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-navy-light border border-brand-brass/20">
                <span className="font-display text-sm font-bold text-brand-brass">SC</span>
              </div>
              <div>
                <div className="font-display text-sm font-bold text-brand-cream leading-tight">
                  Sullivan County
                </div>
                <div className="font-body text-[10px] font-light tracking-widest uppercase text-brand-stone leading-tight">
                  Tennessee
                </div>
              </div>
            </div>
            <address className="not-italic space-y-2 font-body text-sm leading-relaxed">
              <p>3411 TN-126, Blountville, TN 37617</p>
              <p>
                <a href="tel:+14233236417" className="hover:text-brand-cream transition-colors">
                  (423) 323-6417
                </a>
              </p>
              <p className="text-brand-cream/50">Monday&ndash;Friday, 8am&ndash;5pm</p>
            </address>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display text-sm font-bold text-brand-cream mb-5 tracking-wide">
              {t("footer.government")}
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm hover:text-brand-brass transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: External Resources */}
          <div>
            <h3 className="font-display text-sm font-bold text-brand-cream mb-5 tracking-wide">
              {t("footer.resources")}
            </h3>
            <ul className="space-y-2.5">
              {EXTERNAL_RESOURCES.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm hover:text-brand-brass transition-colors inline-flex items-center gap-1.5"
                  >
                    {resource.label}
                    <svg
                      aria-hidden="true"
                      className="h-3 w-3 opacity-40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <title>External link</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Heritage Note */}
          <div>
            <h3 className="font-display text-sm font-bold text-brand-cream mb-3 tracking-wide">
              Our Heritage
            </h3>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-brand-cream/10" />
              <span className="inline-block h-2 w-2 rotate-45 bg-brand-brass/60" />
              <div className="h-px flex-1 bg-brand-cream/10" />
            </div>
            <blockquote className="border-l-2 border-brand-brass/40 pl-4">
              <p className="font-accent text-base italic leading-relaxed text-brand-cream/60">
                Established in 1779, Sullivan County is the second oldest county in Tennessee.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-brand-cream/40">
                Named after General John Sullivan, our county covers 430 square miles of the
                Appalachian Highlands.
              </p>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-xs text-brand-cream/40">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>&copy; 2026 Sullivan County, Tennessee</span>
              <span className="hidden sm:inline text-brand-cream/20">&middot;</span>
              <span className="italic font-accent">Est. 1779</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/ada-compliance" className="hover:text-brand-cream/60 transition-colors">
                {t("footer.ada")}
              </Link>
              <Link to="/privacy-policy" className="hover:text-brand-cream/60 transition-colors">
                {t("footer.privacy")}
              </Link>
              <a href="/rss.xml" className="hover:text-brand-cream/60 transition-colors">
                RSS Feed
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
