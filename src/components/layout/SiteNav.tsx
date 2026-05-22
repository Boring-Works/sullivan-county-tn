import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, ExternalLink as ExternalLinkIcon, Menu, Search, X } from "lucide-react";
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "~/components/layout/LanguageToggle";
import { isTaskActive, isVerbActive } from "~/components/layout/site-nav-state";
import { CountySeal } from "~/components/shared/CountySeal";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { NAV_VERBS, type NavTask } from "~/data/nav-verbs";
import { cn } from "~/lib/utils";

const LazySearchDialog = lazy(() =>
  import("~/components/layout/SearchDialog").then((m) => ({
    default: m.SearchDialog,
  })),
);

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

function MobileTaskLink({
  task,
  labelKey,
  pathname,
  searchStr,
  onNavigate,
  t,
}: {
  task: NavTask;
  labelKey: string;
  pathname: string;
  searchStr: string;
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
      <Link
        to={task.to}
        search={task.search}
        aria-current={isTaskActive(task, pathname, searchStr) ? "page" : undefined}
        className={cls}
        onClick={onNavigate}
      >
        {t(labelKey)}
      </Link>
    </li>
  );
}

function DesktopTaskLink({
  task,
  labelKey,
  pathname,
  searchStr,
  onNavigate,
  t,
}: {
  task: NavTask;
  labelKey: string;
  pathname: string;
  searchStr: string;
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
  const active = isTaskActive(task, pathname, searchStr);
  return (
    <li>
      <Link
        to={task.to}
        search={task.search}
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
  const [searchInitialQuery, setSearchInitialQuery] = useState("");
  const [panelFocusIndex, setPanelFocusIndex] = useState(-1);
  // Coarse pointers (touch) get click-to-toggle only; fine pointers also get hover.
  const [canHover, setCanHover] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const panelContentRef = useRef<HTMLDivElement>(null);
  const panelButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const panelWrapperRef = useRef<HTMLDivElement>(null);

  const location = useRouterState({ select: (s) => s.location });
  const pathname = location.pathname;
  const searchStr = location.searchStr;
  const hasDarkHeader =
    pathname === "/" ||
    /^\/departments\/[^/]+/.test(pathname) ||
    /^\/history(\/|$)/.test(pathname) ||
    /^\/communities(\/|$)/.test(pathname) ||
    /^\/(about|visit|people|education|economic-development|transportation)(\/|$)/.test(pathname);
  const solid = !hasDarkHeader || scrolled;

  const activePanelTasks = useMemo(() => {
    if (!activePanel) return [] as FlatTask[];
    return flattenVerbTasks(activePanel);
  }, [activePanel]);

  // Detect hover-capable pointers so we can disable hover open on touch.
  useEffect(() => {
    setHydrated(true);
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

  // Cmd+K search shortcut + custom event so other components can open the same dialog.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    function handleOpenSearch(e: Event) {
      // Suggested-search chips may dispatch with detail.query; otherwise the
      // event is a no-op trigger (e.g. from the hero search button).
      const detail = (e as CustomEvent<{ query?: string }>).detail;
      setSearchInitialQuery(typeof detail?.query === "string" ? detail.query : "");
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
      <Sheet
        open={mobileOpen}
        onOpenChange={(open) => {
          setMobileOpen(open);
          if (!open) setMobilePanel(null);
        }}
      >
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
                  const verbActive = isVerbActive(verb, pathname, searchStr);
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
                        disabled={!hydrated}
                        className={cn(
                          "relative flex items-center gap-1.5 px-3.5 py-2 font-body text-sm rounded-sm transition-all duration-200 disabled:cursor-wait disabled:opacity-60",
                          verbActive ? "font-semibold" : "font-medium",
                          solid ? "text-brand-navy" : "text-white/90",
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
                              verb.groups ? "w-[720px] p-6" : "w-[320px] p-4",
                            )}
                          >
                            {verb.groups ? (
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
                                          searchStr={searchStr}
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
                                    searchStr={searchStr}
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
                  disabled={!hydrated}
                  className={cn(
                    "hidden lg:inline-flex items-center gap-2 rounded-sm px-3 py-1.5 font-body text-sm transition-all duration-200 disabled:cursor-wait disabled:opacity-60",
                    solid
                      ? "text-brand-navy border border-brand-surface hover:border-brand-copper/30"
                      : "text-white/70 border border-white/20 hover:border-white/40 hover:text-white",
                  )}
                  aria-label="Search"
                >
                  <Search className="size-3.5" />
                  <kbd
                    className={cn(
                      "text-[10px] font-mono font-semibold",
                      solid ? "text-brand-navy" : "text-white",
                    )}
                  >
                    &#8984;K
                  </kbd>
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
                    // Copper bg in both states guarantees AA contrast even when
                    // the nav floats over a light hero (e.g. /history scroll-top).
                    solid
                      ? "bg-brand-copper text-white hover:bg-brand-copper-light shadow-sm"
                      : "bg-brand-copper/95 text-white border border-white/20 hover:bg-brand-copper backdrop-blur-sm shadow-sm",
                  )}
                >
                  {t("nav.payTaxes")}
                </a>

                {/* Mobile Hamburger */}
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "lg:hidden inline-flex items-center justify-center rounded-sm p-2 transition-colors disabled:cursor-wait disabled:opacity-60",
                      solid
                        ? "text-brand-slate hover:bg-brand-surface hover:text-brand-navy"
                        : "text-white/90 hover:text-white hover:bg-white/10",
                    )}
                    disabled={!hydrated}
                    aria-expanded={mobileOpen}
                    aria-label="Open menu"
                  >
                    <Menu aria-hidden="true" className="size-6" />
                  </button>
                </SheetTrigger>
              </div>
            </div>
          </div>
        </nav>

        <SheetContent
          side="right"
          showCloseButton={false}
          className="lg:hidden w-[min(92vw,28rem)] border-l border-white/10 bg-brand-navy p-0 text-white sm:max-w-md"
        >
          <SheetHeader className="border-b border-white/10 px-4 py-4 text-left">
            <div className="flex items-center justify-between gap-3">
              <div>
                <SheetTitle className="font-display text-lg text-white">Navigation menu</SheetTitle>
                <SheetDescription className="font-body text-xs text-white/60">
                  Sullivan County services, departments, meetings, and county contacts.
                </SheetDescription>
              </div>
              <SheetClose className="inline-flex size-10 items-center justify-center rounded-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40">
                <X aria-hidden="true" className="size-5" />
                <span className="sr-only">Close navigation menu</span>
              </SheetClose>
            </div>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4 py-5">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={closeMobile}
                aria-current={pathname === "/" ? "page" : undefined}
                className="mb-2 flex items-center justify-center rounded-sm border border-white/20 px-4 py-3 font-body text-sm font-semibold tracking-wide text-white/95 transition-colors hover:bg-white/10"
              >
                {t("nav.home")}
              </Link>
              {/* Verb accordions */}
              {NAV_VERBS.map((verb, vIdx) => {
                const isOpen = mobilePanel === verb.key;
                const VerbIcon = verb.icon;
                const verbActive = isVerbActive(verb, pathname, searchStr);
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
                        {verb.groups ? (
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
                                    pathname={pathname}
                                    searchStr={searchStr}
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
                                pathname={pathname}
                                searchStr={searchStr}
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
              <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-5 opacity-0 animate-slide-in-right">
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
        </SheetContent>
      </Sheet>

      {/* Lazy-loaded search dialog — only fetched when opened */}
      {searchOpen && (
        <Suspense fallback={null}>
          <LazySearchDialog
            open={searchOpen}
            onOpenChange={setSearchOpen}
            initialQuery={searchInitialQuery}
          />
        </Suspense>
      )}
    </>
  );
}
