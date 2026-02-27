import { Link } from "@tanstack/react-router";

const QUICK_LINKS = [
  { label: "Departments", href: "/departments" },
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
  return (
    <footer className="bg-brand-blue-dark text-brand-cream/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Column 1: County Info */}
          <div>
            <h3 className="text-lg font-semibold text-brand-cream mb-4">
              Sullivan County, Tennessee
            </h3>
            <address className="not-italic space-y-2 text-sm leading-relaxed">
              <p>3411 TN-126, Blountville, TN 37617</p>
              <p>
                <a href="tel:+14233236417" className="hover:text-brand-cream transition-colors">
                  (423) 323-6417
                </a>
              </p>
              <p>Monday-Friday, 8am-5pm</p>
            </address>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-brand-cream mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm hover:text-brand-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: External Resources */}
          <div>
            <h3 className="text-lg font-semibold text-brand-cream mb-4">External Resources</h3>
            <ul className="space-y-2">
              {EXTERNAL_RESOURCES.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-brand-cream transition-colors inline-flex items-center gap-1"
                  >
                    {resource.label}
                    <svg
                      aria-hidden="true"
                      className="h-3 w-3 opacity-50"
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
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-cream/60">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>&copy; 2026 Sullivan County, Tennessee. All rights reserved.</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>Established 1779</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/ada-compliance" className="hover:text-brand-cream/80 transition-colors">
                ADA Compliance
              </Link>
              <Link to="/privacy-policy" className="hover:text-brand-cream/80 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
