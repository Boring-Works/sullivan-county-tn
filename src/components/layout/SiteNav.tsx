import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, ExternalLink as ExternalLinkIcon, Search } from "lucide-react";
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "~/components/layout/LanguageToggle";
import { CountySeal } from "~/components/shared/CountySeal";
import {
  DEPARTMENT_CATEGORIES,
  type DepartmentCategory,
  getDepartmentsByCategory,
} from "~/data/departments";
import { NAV_VERBS, type NavTask } from "~/data/nav-verbs";
import { cn } from "~/lib/utils";

const LazySearchDialog = lazy(() =>
  import("~/components/layout/SearchDialog").then((m) => ({
    default: m.SearchDialog,
  })),
);

const DEPARTMENTS_PANEL_KEY = "departments";

const CATEGORY_ORDER: DepartmentCategory[] = [
  "administrative",
  "courts",
  "public-safety",
  "finance",
  "operations",
  "community",
];

interface FlatTask {
  href: string;
  external: boolean;
}

function flattenVerbTasks(verbKey: string): FlatTask[] {
  const verb = NAV_VERBS.find((v) => v.key === verbKey);
  if (!verb) return [];
  const flat: FlatTask[] = [];
  if (verb.tasks) {
    for (const t of verb.tasks) {
      flat.push({ href: t.external ? t.href : t.to, external: !!t.external });
    }
  }
  if (verb.groups) {
    for (const g of verb.groups) {
      for (const t of g.tasks) {
        flat.push({ href: t.external ? t.href : t.to, external: !!t.external });
      }
    }
  }
  return flat;
}

function buildDepartmentLinks() {
  const items: { slug: string; name: string; category: DepartmentCategory }[] = [];
  for (const catKey of CATEGORY_ORDER) {
    for (const dept of getDepartmentsByCategory(catKey)) {
      items.push({ slug: dept.slug, name: dept.name, category: catKey });
    }
  }
  return items;
}

function MobileTaskLink({
  task,
  labelKey,
  onNavigate,
  t,
}: {
  task: NavTask;
  labelKey: string;
  onNavigate: () => void;
  t: (key: string) => string;
}) {
  const cls =
    "flex items-center justify-between gap-2 rounded-sm px-3 py-2.5 font-body text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors min-h-[44px]";
  if (task.external) {
    return (
      <li>
        <a
          href={task.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          onClick={onNavigate}
        >
          <span>{t(labelKey)}</span>
          <ExternalLinkIcon aria-hidden="true" className="size-3 opacity-60 shrink-0" />
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link to={task.to} className={cls} onClick={onNavigate}>
        {t(labelKey)}
      </Link>
    </li>
  );
}

function DesktopTaskLink({
  task,
  labelKey,
  pathname,
  onNavigate,
  t,
}: {
  task: NavTask;
  labelKey: string;
  pathname: string;
  onNavigate: () => void;
  t: (key: string) => string;
}) {
  const linkClass = (active: boolean) =>
    cn(
      "flex items-center justify-between gap-2 rounded-sm px-2.5 py-1.5 font-body text-sm transition-colors",
      "hover:bg-brand-parchment hover:text-brand-navy focus:bg-brand-parchment focus:text-brand-navy focus:outline-none",
      active ? "bg-brand-parchment text-brand-navy font-semibold" : "text-brand-slate",
    );
  if (task.external) {
    return (
      <li>
        <a
          href={task.href}
          target="_blank"
          rel="noopener noreferrer"
          data-panel-link=""
          className={linkClass(false)}
          onClick={onNavigate}
        >
          <span>{t(labelKey)}</span>
          <ExternalLinkIcon aria-hidden="true" className="size-3 opacity-60 shrink-0" />
        </a>
      </li>
    );
  }
  const active = pathname === task.to || pathname.startsWith(`${task.to}/`);
  return (
    <li>
      <Link
        to={task.to}
        data-panel-link=""
        aria-current={active ? "page" : undefined}
        className={linkClass(active)}
        onClick={onNavigate}
      >
        {t(labelKey)}
      </Link>
    </li>
  );
}

export function SiteNav() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [mobilePanel, setMobilePanel] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [panelFocusIndex, setPanelFocusIndex] = useState(-1);
  // Coarse pointers (touch) get click-to-toggle only; fine pointers also get hover.
  const [canHover, setCanHover] = useState(false);

  const panelContentRef = useRef<HTMLDivElement>(null);
  const panelButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const panelWrapperRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hasDarkHeader =
    pathname === "/" ||
    /^\/departments\/[^/]+/.test(pathname) ||
    /^\/history(\/|$)/.test(pathname) ||
    /^\/communities(\/|$)/.test(pathname) ||
    /^\/(about|visit|people|education|economic-development|transportation)(\/|$)/.test(pathname);
  const solid = !hasDarkHeader || scrolled;

  const departmentLinks = useMemo(() => buildDepartmentLinks(), []);
  const activePanelTasks = useMemo(() => {
    if (!activePanel) return [] as FlatTask[];
    if (activePanel === DEPARTMENTS_PANEL_KEY) {
      return departmentLinks.map((d) => ({ href: `/departments/${d.slug}`, external: false }));
    }
    return flattenVerbTasks(activePanel);
  }, [activePanel, departmentLinks]);

  // Detect hover-capable pointers so we can disable hover open on touch.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll listener
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
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

  // Cmd+K search shortcut + custom event so other components can open the same dialog.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    function handleOpenSearch() {
      setSearchOpen(true);
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("sullivan:open-search", handleOpenSearch as EventListener);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("sullivan:open-search", handleOpenSearch as EventListener);
    };
  }, []);

  // Close any open panel on outside pointer down (touch + click)
  useEffect(() => {
    if (!activePanel) return;
    function handlePointerDown(e: PointerEvent) {
      const wrapper = panelWrapperRef.current;
      if (!wrapper) return;
      if (e.target instanceof Node && !wrapper.contains(e.target)) {
        setActivePanel(null);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [activePanel]);

  // Mobile focus trap
  useEffect(() => {
    if (!mobileOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;

    function handleTab(e: KeyboardEvent) {
      if (!menu) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileOpen(false);
        setMobileDeptsOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = menu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [mobileOpen]);

  // Reset panel focus when no panel is open
  useEffect(() => {
    if (!activePanel) {
      setPanelFocusIndex(-1);
    }
  }, [activePanel]);

  // Focus the active link inside the open panel when the index changes
  useEffect(() => {
    if (panelFocusIndex < 0 || !panelContentRef.current) return;
    const links = panelContentRef.current.querySelectorAll<HTMLElement>("[data-panel-link]");
    links[panelFocusIndex]?.focus();
  }, [panelFocusIndex]);

  const handlePanelKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!activePanel) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setActivePanel(null);
        panelButtonRefs.current.get(activePanel)?.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setPanelFocusIndex((i) => (i + 1) % Math.max(activePanelTasks.length, 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setPanelFocusIndex((i) => (i <= 0 ? Math.max(activePanelTasks.length - 1, 0) : i - 1));
        return;
      }
    },
    [activePanel, activePanelTasks.length],
  );

  function closeMobile() {
    setMobileOpen(false);
    setMobilePanel(null);
  }

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{ top: "var(--banner-height, 0px)" }}
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-300",
          solid
            ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-brand-surface"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-18">
            {/* Left: Logo + Branding */}
            <Link to="/" className="flex items-center gap-3 shrink-0" onClick={closeMobile}>
              <CountySeal
                size={40}
                variant="raster"
                decorative={false}
                className={cn(
                  "transition-all duration-300 shrink-0",
                  solid ? "" : "invert opacity-95",
                )}
              />
              <div className="hidden sm:block">
                <div
                  className={cn(
                    "font-display text-sm font-bold tracking-wide leading-tight transition-colors duration-300",
                    solid ? "text-brand-navy" : "text-white",
                  )}
                >
                  Sullivan County
                </div>
                <div
                  className={cn(
                    "font-body text-[11px] font-light tracking-widest uppercase leading-tight transition-colors duration-300",
                    solid ? "text-brand-stone" : "text-white/50",
                  )}
                >
                  Tennessee
                </div>
              </div>
            </Link>

            {/* Center: Desktop Nav — verb-based primary nav */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: positioning wrapper around real <button> triggers and disclosure panels */}
            <div
              ref={panelWrapperRef}
              className="hidden lg:flex items-center gap-0.5"
              onKeyDown={handlePanelKeyDown}
              onMouseLeave={() => canHover && setActivePanel(null)}
            >
              {NAV_VERBS.map((verb) => {
                const isOpen = activePanel === verb.key;
                // Verb is "active" if pathname matches any of its concrete tasks
                const verbActive = (() => {
                  const tasks = flattenVerbTasks(verb.key);
                  return tasks.some(
                    (tt) =>
                      !tt.external && (pathname === tt.href || pathname.startsWith(`${tt.href}/`)),
                  );
                })();
                const ariaControlsId = `verb-panel-${verb.key}`;
                return (
                  // biome-ignore lint/a11y/noStaticElementInteractions: positioning wrapper around real <button> trigger and its disclosure panel
                  <div
                    key={verb.key}
                    className="relative"
                    onMouseEnter={() => canHover && setActivePanel(verb.key)}
                  >
                    <button
                      ref={(el) => {
                        if (el) panelButtonRefs.current.set(verb.key, el);
                        else panelButtonRefs.current.delete(verb.key);
                      }}
                      type="button"
                      className={cn(
                        "relative flex items-center gap-1.5 px-3.5 py-2 font-body text-sm rounded-sm transition-all duration-200",
                        verbActive ? "font-semibold" : "font-medium",
                        solid ? "text-brand-slate" : "text-white/90",
                        isOpen &&
                          (solid ? "bg-brand-surface text-brand-navy" : "bg-white/10 text-white"),
                        !isOpen && (solid ? "hover:text-brand-navy" : "hover:text-white"),
                        verbActive &&
                          (solid
                            ? "text-brand-navy after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-0.5 after:rounded-full after:bg-brand-copper"
                            : "text-white after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-0.5 after:rounded-full after:bg-brand-brass-light"),
                      )}
                      onClick={() => setActivePanel(isOpen ? null : verb.key)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                          if (!isOpen) {
                            e.preventDefault();
                            setActivePanel(verb.key);
                            setPanelFocusIndex(0);
                          }
                        }
                      }}
                      aria-expanded={isOpen}
                      aria-controls={ariaControlsId}
                    >
                      {t(verb.labelKey)}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>

                    {isOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
                        <div
                          ref={panelContentRef}
                          id={ariaControlsId}
                          className={cn(
                            "rounded-md border border-brand-surface bg-white shadow-2xl shadow-brand-navy/8 animate-scale-in",
                            verb.key === DEPARTMENTS_PANEL_KEY
                              ? "w-[920px] p-8"
                              : verb.groups
                                ? "w-[720px] p-6"
                                : "w-[320px] p-4",
                          )}
                        >
                          {verb.key === DEPARTMENTS_PANEL_KEY ? (
                            <>
                              <div className="mb-5 flex items-center justify-between border-b border-brand-surface pb-4">
                                <h3 className="font-display text-base font-bold text-brand-navy">
                                  {t("nav.countyDepartments")}
                                </h3>
                                <Link
                                  to="/departments"
                                  search={{ category: undefined }}
                                  className="font-body text-xs font-semibold tracking-wide uppercase text-brand-copper hover:text-brand-copper-light transition-colors"
                                  onClick={() => setActivePanel(null)}
                                >
                                  {t("nav.viewAll")} &rarr;
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
                                      <ul className="space-y-0.5" aria-label={category.label}>
                                        {depts.map((dept) => {
                                          const active = pathname === `/departments/${dept.slug}`;
                                          return (
                                            <li key={dept.slug}>
                                              <Link
                                                to="/departments/$slug"
                                                params={{ slug: dept.slug }}
                                                data-panel-link=""
                                                aria-current={active ? "page" : undefined}
                                                className={cn(
                                                  "block rounded-sm px-2.5 py-1.5 font-body text-sm transition-colors",
                                                  "hover:bg-brand-parchment hover:text-brand-navy focus:bg-brand-parchment focus:text-brand-navy focus:outline-none",
                                                  active
                                                    ? "bg-brand-parchment text-brand-navy font-semibold"
                                                    : "text-brand-slate",
                                                )}
                                                onClick={() => setActivePanel(null)}
                                              >
                                                {dept.name}
                                              </Link>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          ) : verb.groups ? (
                            <div className="grid grid-cols-3 gap-6">
                              {verb.groups.map((group) => (
                                <div key={group.headingKey}>
                                  <div className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-stone">
                                    {t(group.headingKey)}
                                  </div>
                                  <ul className="space-y-0.5">
                                    {group.tasks.map((task) => (
                                      <DesktopTaskLink
                                        key={`${task.labelKey}-${task.external ? task.href : task.to}`}
                                        task={task}
                                        labelKey={task.labelKey}
                                        pathname={pathname}
                                        onNavigate={() => setActivePanel(null)}
                                        t={t}
                                      />
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-0.5">
                              {(verb.tasks ?? []).map((task) => (
                                <DesktopTaskLink
                                  key={`${task.labelKey}-${task.external ? task.href : task.to}`}
                                  task={task}
                                  labelKey={task.labelKey}
                                  pathname={pathname}
                                  onNavigate={() => setActivePanel(null)}
                                  t={t}
                                />
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Search + Pay Taxes + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "hidden lg:inline-flex items-center gap-2 rounded-sm px-3 py-1.5 font-body text-sm transition-all duration-200",
                  solid
                    ? "text-brand-stone border border-brand-surface hover:border-brand-copper/30 hover:text-brand-navy"
                    : "text-white/70 border border-white/20 hover:border-white/40 hover:text-white",
                )}
                aria-label="Search"
              >
                <Search className="size-3.5" />
                <kbd className="text-[10px] text-brand-slate-light font-mono">&#8984;K</kbd>
              </button>
              <div className="hidden lg:block">
                <LanguageToggle solid={solid} />
              </div>
              <a
                href="https://sullivantntrustee.gov/property-tax/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "hidden sm:inline-flex items-center rounded-sm px-5 py-2 font-body text-sm font-semibold tracking-wide transition-all duration-300",
                  solid
                    ? "bg-brand-copper text-white hover:bg-brand-copper-light shadow-sm"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm",
                )}
              >
                {t("nav.payTaxes")}
              </a>

              {/* Mobile Hamburger */}
              <button
                ref={hamburgerRef}
                type="button"
                className={cn(
                  "lg:hidden inline-flex items-center justify-center rounded-sm p-2 transition-colors",
                  solid
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — rendered as a sibling of <nav> because <nav>'s
          backdrop-blur establishes a containing block for fixed children,
          which made the drawer compute height: 0 (top: 64px, bottom: 0). */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          style={{ top: "calc(var(--banner-height, 0px) + 4rem)" }}
          className="lg:hidden fixed right-0 bottom-0 left-0 z-40 bg-brand-navy overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="px-4 py-6 space-y-1">
            {/* Verb accordions */}
            {NAV_VERBS.map((verb, vIdx) => {
              const isOpen = mobilePanel === verb.key;
              const VerbIcon = verb.icon;
              const verbActive = flattenVerbTasks(verb.key).some(
                (tt) =>
                  !tt.external && (pathname === tt.href || pathname.startsWith(`${tt.href}/`)),
              );
              return (
                <div
                  key={verb.key}
                  className="opacity-0 animate-slide-in-right"
                  style={{ animationDelay: `${0.05 + vIdx * 0.04}s` }}
                >
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-sm px-3 py-3.5 font-body text-base text-white/90 hover:bg-white/10 transition-colors",
                      verbActive ? "font-semibold text-white" : "font-medium",
                    )}
                    onClick={() => setMobilePanel(isOpen ? null : verb.key)}
                    aria-expanded={isOpen}
                    aria-controls={`mobile-panel-${verb.key}`}
                  >
                    <span className="flex items-center gap-3">
                      <VerbIcon aria-hidden="true" className="size-4 text-brand-brass-light" />
                      {t(verb.labelKey)}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "h-5 w-5 text-white/70 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div id={`mobile-panel-${verb.key}`} className="mt-1 space-y-3 pl-3 pb-2">
                      {verb.key === DEPARTMENTS_PANEL_KEY ? (
                        <>
                          {CATEGORY_ORDER.map((catKey) => {
                            const category = DEPARTMENT_CATEGORIES[catKey];
                            const depts = getDepartmentsByCategory(catKey);
                            return (
                              <div key={catKey}>
                                <div className="mb-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-brass/70 px-3">
                                  {category.label}
                                </div>
                                <ul className="space-y-0.5">
                                  {depts.map((dept) => (
                                    <li key={dept.slug}>
                                      <Link
                                        to="/departments/$slug"
                                        params={{ slug: dept.slug }}
                                        className="block rounded-sm px-3 py-2 font-body text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors min-h-[44px]"
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
                            search={{ category: undefined }}
                            className="block rounded-sm px-3 py-2 font-body text-sm font-semibold text-brand-brass hover:text-brand-brass/80 transition-colors"
                            onClick={closeMobile}
                          >
                            {t("nav.viewAllDepartments")} &rarr;
                          </Link>
                        </>
                      ) : verb.groups ? (
                        verb.groups.map((group) => (
                          <div key={group.headingKey}>
                            <div className="mb-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-brass/70 px-3">
                              {t(group.headingKey)}
                            </div>
                            <ul className="space-y-0.5">
                              {group.tasks.map((task) => (
                                <MobileTaskLink
                                  key={`${task.labelKey}-${task.external ? task.href : task.to}`}
                                  task={task}
                                  labelKey={task.labelKey}
                                  onNavigate={closeMobile}
                                  t={t}
                                />
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <ul className="space-y-0.5">
                          {(verb.tasks ?? []).map((task) => (
                            <MobileTaskLink
                              key={`${task.labelKey}-${task.external ? task.href : task.to}`}
                              task={task}
                              labelKey={task.labelKey}
                              onNavigate={closeMobile}
                              t={t}
                            />
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Search + Pay Taxes (Mobile) */}
            <div
              className="pt-5 mt-3 border-t border-white/10 space-y-3 opacity-0 animate-slide-in-right"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex justify-center">
                <LanguageToggle solid={false} />
              </div>
              <button
                type="button"
                onClick={() => {
                  closeMobile();
                  setSearchOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-sm border border-white/20 px-4 py-3.5 font-body text-base font-medium text-white/90 transition-colors hover:bg-white/10"
              >
                <Search className="size-4" />
                {t("nav.search")}
              </button>
              <a
                href="https://sullivantntrustee.gov/property-tax/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-sm bg-brand-copper px-4 py-3.5 font-body text-base font-semibold text-white transition-colors hover:bg-brand-copper-light"
              >
                {t("nav.payTaxes")}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Lazy-loaded search dialog — only fetched when opened */}
      {searchOpen && (
        <Suspense fallback={null}>
          <LazySearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        </Suspense>
      )}
    </>
  );
}
