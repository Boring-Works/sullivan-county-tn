import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  DEPARTMENT_CATEGORIES,
  type DepartmentCategory,
  getDepartmentsByCategory,
} from "~/data/departments";
import { cn } from "~/lib/utils";

const NAV_LINKS = [
  { label: "Commissioners", href: "/commissioners" },
  { label: "News", href: "/news" },
  { label: "Documents", href: "/documents" },
  { label: "Contact", href: "/contact" },
] as const;

const CATEGORY_ORDER: DepartmentCategory[] = [
  "administrative",
  "courts",
  "public-safety",
  "finance",
  "operations",
  "community",
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
    setExpandedCategory(null);
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-surface"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-18">
          {/* Left: Logo + Branding — serif treatment */}
          <Link to="/" className="flex items-center gap-3 shrink-0" onClick={closeMobile}>
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-navy border border-brand-brass/20">
              <span className="font-display text-sm font-bold text-brand-brass tracking-tight">
                SC
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-sm font-bold tracking-wide text-brand-navy leading-tight">
                Sullivan County
              </div>
              <div className="font-body text-[11px] font-light tracking-widest uppercase text-brand-stone leading-tight">
                Tennessee
              </div>
            </div>
          </Link>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {/* Departments Dropdown */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: dropdown container requires mouse handlers for hover interaction */}
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2 font-body text-sm font-medium",
                  "rounded-sm transition-all duration-200",
                  scrolled ? "text-brand-slate" : "text-white/90",
                  megaMenuOpen &&
                    (scrolled ? "bg-brand-surface text-brand-navy" : "bg-white/10 text-white"),
                  !megaMenuOpen && (scrolled ? "hover:text-brand-navy" : "hover:text-white"),
                )}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
              >
                Departments
                <svg
                  aria-hidden="true"
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    megaMenuOpen && "rotate-180",
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Toggle dropdown</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Menu — refined with category accents */}
              {megaMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                  <div className="w-[920px] rounded-md border border-brand-surface bg-white p-8 shadow-2xl shadow-brand-navy/8">
                    <div className="mb-5 flex items-center justify-between border-b border-brand-surface pb-4">
                      <h3 className="font-display text-base font-bold text-brand-navy">
                        County Departments
                      </h3>
                      <Link
                        to="/departments"
                        className="font-body text-xs font-semibold tracking-wide uppercase text-brand-copper hover:text-brand-copper-light transition-colors"
                        onClick={() => setMegaMenuOpen(false)}
                      >
                        View All &rarr;
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                      {CATEGORY_ORDER.map((catKey) => {
                        const category = DEPARTMENT_CATEGORIES[catKey];
                        const depts = getDepartmentsByCategory(catKey);
                        return (
                          <div key={catKey}>
                            <div className="mb-2.5 flex items-center gap-2">
                              <div className="h-px flex-1 bg-brand-surface" />
                              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-stone">
                                {category.label}
                              </span>
                              <div className="h-px flex-1 bg-brand-surface" />
                            </div>
                            <ul className="space-y-0.5">
                              {depts.map((dept) => (
                                <li key={dept.slug}>
                                  <Link
                                    to="/departments/$slug"
                                    params={{ slug: dept.slug }}
                                    className="block rounded-sm px-2.5 py-1.5 font-body text-sm text-brand-slate hover:bg-brand-parchment hover:text-brand-navy transition-colors"
                                    onClick={() => setMegaMenuOpen(false)}
                                  >
                                    {dept.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Static Nav Links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3.5 py-2 font-body text-sm font-medium rounded-sm transition-all duration-200",
                  scrolled
                    ? "text-brand-slate hover:text-brand-navy"
                    : "text-white/90 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Pay Taxes + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://sullivantntrustee.gov/property-tax/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden sm:inline-flex items-center rounded-sm px-5 py-2 font-body text-sm font-semibold tracking-wide transition-all duration-300",
                scrolled
                  ? "bg-brand-copper text-white hover:bg-brand-copper-light shadow-sm"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm",
              )}
            >
              Pay Taxes
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className={cn(
                "lg:hidden inline-flex items-center justify-center rounded-sm p-2 transition-colors",
                scrolled
                  ? "text-brand-slate hover:bg-brand-surface hover:text-brand-navy"
                  : "text-white/90 hover:text-white hover:bg-white/10",
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Close menu</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Open menu</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-white overflow-y-auto">
          <div className="px-4 py-6 space-y-1">
            {/* Departments Collapsible */}
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-sm px-3 py-3.5 font-body text-base font-medium text-brand-slate hover:bg-brand-parchment transition-colors"
                onClick={() => setExpandedCategory(expandedCategory === "all" ? null : "all")}
              >
                <span>Departments</span>
                <svg
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    expandedCategory === "all" && "rotate-180",
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Toggle section</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedCategory === "all" && (
                <div className="mt-2 space-y-5 pl-3">
                  {CATEGORY_ORDER.map((catKey) => {
                    const category = DEPARTMENT_CATEGORIES[catKey];
                    const depts = getDepartmentsByCategory(catKey);
                    return (
                      <div key={catKey}>
                        <div className="mb-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-stone px-3">
                          {category.label}
                        </div>
                        <ul className="space-y-0.5">
                          {depts.map((dept) => (
                            <li key={dept.slug}>
                              <Link
                                to="/departments/$slug"
                                params={{ slug: dept.slug }}
                                className="block rounded-sm px-3 py-2 font-body text-sm text-brand-slate hover:bg-brand-parchment hover:text-brand-navy transition-colors"
                                onClick={closeMobile}
                              >
                                {dept.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                  <Link
                    to="/departments"
                    className="block rounded-sm px-3 py-2 font-body text-sm font-semibold text-brand-copper hover:text-brand-copper-light transition-colors"
                    onClick={closeMobile}
                  >
                    View All Departments &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Static Links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block rounded-sm px-3 py-3.5 font-body text-base font-medium text-brand-slate hover:bg-brand-parchment hover:text-brand-navy transition-colors"
                onClick={closeMobile}
              >
                {link.label}
              </Link>
            ))}

            {/* Pay Taxes (Mobile) */}
            <div className="pt-5 mt-3 border-t border-brand-surface">
              <a
                href="https://sullivantntrustee.gov/property-tax/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-sm bg-brand-copper px-4 py-3.5 font-body text-base font-semibold text-white transition-colors hover:bg-brand-copper-light"
              >
                Pay Taxes
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
