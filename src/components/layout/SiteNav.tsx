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

  // Lock body scroll when mobile menu is open
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
        "fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200",
        scrolled && "shadow-md",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + Branding */}
          <Link to="/" className="flex items-center gap-3 shrink-0" onClick={closeMobile}>
            <div className="flex h-9 w-9 items-center justify-center rounded bg-brand-blue">
              <span className="text-sm font-bold text-white tracking-tight">SC</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold tracking-wide text-brand-blue uppercase leading-tight">
                Sullivan County
              </div>
              <div className="text-xs text-brand-slate-light leading-tight">Tennessee</div>
            </div>
          </Link>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
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
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-slate",
                  "rounded-md hover:bg-brand-surface hover:text-brand-blue transition-colors",
                  megaMenuOpen && "bg-brand-surface text-brand-blue",
                )}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
              >
                Departments
                <svg
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
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

              {/* Mega Menu */}
              {megaMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2">
                  <div className="w-[900px] rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-brand-blue uppercase tracking-wide">
                        County Departments
                      </h3>
                      <Link
                        to="/departments"
                        className="text-xs font-medium text-brand-orange hover:text-brand-orange-light transition-colors"
                        onClick={() => setMegaMenuOpen(false)}
                      >
                        View All Departments &rarr;
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {CATEGORY_ORDER.map((catKey) => {
                        const category = DEPARTMENT_CATEGORIES[catKey];
                        const depts = getDepartmentsByCategory(catKey);
                        return (
                          <div key={catKey}>
                            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-slate-light">
                              {category.label}
                            </div>
                            <ul className="space-y-1">
                              {depts.map((dept) => (
                                <li key={dept.slug}>
                                  <Link
                                    to="/departments/$slug"
                                    params={{ slug: dept.slug }}
                                    className="block rounded px-2 py-1 text-sm text-brand-slate hover:bg-brand-surface hover:text-brand-blue transition-colors"
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
                className="px-3 py-2 text-sm font-medium text-brand-slate rounded-md hover:bg-brand-surface hover:text-brand-blue transition-colors"
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
              className="hidden sm:inline-flex items-center rounded-md bg-brand-orange px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-orange-light transition-colors"
            >
              Pay Taxes
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-brand-slate hover:bg-brand-surface hover:text-brand-blue transition-colors"
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
          <div className="px-4 py-6 space-y-2">
            {/* Departments Collapsible */}
            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium text-brand-slate hover:bg-brand-surface transition-colors"
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
                <div className="mt-2 space-y-4 pl-3">
                  {CATEGORY_ORDER.map((catKey) => {
                    const category = DEPARTMENT_CATEGORIES[catKey];
                    const depts = getDepartmentsByCategory(catKey);
                    const _isExpanded = expandedCategory === "all";
                    return (
                      <div key={catKey}>
                        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-slate-light px-3">
                          {category.label}
                        </div>
                        <ul className="space-y-0.5">
                          {depts.map((dept) => (
                            <li key={dept.slug}>
                              <Link
                                to="/departments/$slug"
                                params={{ slug: dept.slug }}
                                className="block rounded-md px-3 py-2 text-sm text-brand-slate hover:bg-brand-surface hover:text-brand-blue transition-colors"
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
                    className="block rounded-md px-3 py-2 text-sm font-medium text-brand-orange hover:text-brand-orange-light transition-colors"
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
                className="block rounded-md px-3 py-3 text-base font-medium text-brand-slate hover:bg-brand-surface hover:text-brand-blue transition-colors"
                onClick={closeMobile}
              >
                {link.label}
              </Link>
            ))}

            {/* Pay Taxes (Mobile) */}
            <div className="pt-4 border-t border-gray-200">
              <a
                href="https://sullivantntrustee.gov/property-tax/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-md bg-brand-orange px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-orange-light transition-colors"
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
