import { Link, useRouterState } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import {
	DEPARTMENT_CATEGORIES,
	type DepartmentCategory,
	getDepartmentsByCategory,
} from "~/data/departments";
import { cn } from "~/lib/utils";

const LazySearchDialog = lazy(() =>
	import("~/components/layout/SearchDialog").then((m) => ({
		default: m.SearchDialog,
	})),
);

const NAV_LINKS = [
	{ label: "Commissioners", href: "/commissioners" },
	{ label: "News", href: "/news" },
	{ label: "Calendar", href: "/calendar" },
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

// Build flat list of all mega-menu department links for keyboard navigation
function buildMegaMenuItems() {
	const items: { slug: string; name: string; category: DepartmentCategory }[] = [];
	for (const catKey of CATEGORY_ORDER) {
		for (const dept of getDepartmentsByCategory(catKey)) {
			items.push({ slug: dept.slug, name: dept.name, category: catKey });
		}
	}
	return items;
}

export function SiteNav() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [megaMenuOpen, setMegaMenuOpen] = useState(false);
	const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
	const [searchOpen, setSearchOpen] = useState(false);
	const [megaFocusIndex, setMegaFocusIndex] = useState(-1);

	const megaMenuRef = useRef<HTMLDivElement>(null);
	const megaButtonRef = useRef<HTMLButtonElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const hamburgerRef = useRef<HTMLButtonElement>(null);

	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const hasDarkHeader = pathname === "/" || /^\/departments\/[^/]+/.test(pathname);
	const solid = !hasDarkHeader || scrolled;

	const megaMenuItems = buildMegaMenuItems();

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

	// Cmd+K search shortcut
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setSearchOpen(true);
			}
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Mobile focus trap
	useEffect(() => {
		if (!mobileOpen) return;
		const menu = mobileMenuRef.current;
		if (!menu) return;

		function handleTab(e: KeyboardEvent) {
			if (e.key === "Escape") {
				e.preventDefault();
				setMobileOpen(false);
				setExpandedCategory(null);
				hamburgerRef.current?.focus();
				return;
			}
			if (e.key !== "Tab") return;

			const focusable = menu!.querySelectorAll<HTMLElement>(
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

	// Reset mega-menu focus when it closes
	useEffect(() => {
		if (!megaMenuOpen) {
			setMegaFocusIndex(-1);
		}
	}, [megaMenuOpen]);

	// Focus the active mega-menu link when index changes
	useEffect(() => {
		if (megaFocusIndex < 0 || !megaMenuRef.current) return;
		const links = megaMenuRef.current.querySelectorAll<HTMLAnchorElement>("[data-mega-link]");
		links[megaFocusIndex]?.focus();
	}, [megaFocusIndex]);

	const handleMegaKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				setMegaMenuOpen(false);
				megaButtonRef.current?.focus();
				return;
			}
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setMegaFocusIndex((i) => (i + 1) % megaMenuItems.length);
				return;
			}
			if (e.key === "ArrowUp") {
				e.preventDefault();
				setMegaFocusIndex((i) => (i <= 0 ? megaMenuItems.length - 1 : i - 1));
				return;
			}
		},
		[megaMenuItems.length],
	);

	function closeMobile() {
		setMobileOpen(false);
		setExpandedCategory(null);
	}

	return (
		<nav
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				solid
					? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-brand-surface"
					: "bg-transparent",
			)}
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between lg:h-18">
					{/* Left: Logo + Branding */}
					<Link to="/" className="flex items-center gap-3 shrink-0" onClick={closeMobile}>
						<div
							className={cn(
								"flex h-10 w-10 items-center justify-center rounded-sm transition-all duration-300",
								solid
									? "bg-brand-navy border border-brand-brass/20"
									: "bg-white border border-white/80",
							)}
						>
							<span
								className={cn(
									"font-display text-sm font-bold tracking-tight transition-colors duration-300",
									solid ? "text-brand-brass" : "text-brand-navy",
								)}
							>
								SC
							</span>
						</div>
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

					{/* Center: Desktop Nav */}
					<div className="hidden lg:flex items-center gap-0.5">
						{/* Departments Dropdown */}
						{/* biome-ignore lint/a11y/noStaticElementInteractions: dropdown container requires mouse handlers for hover interaction */}
						<div
							className="relative"
							onMouseEnter={() => setMegaMenuOpen(true)}
							onMouseLeave={() => setMegaMenuOpen(false)}
							onKeyDown={handleMegaKeyDown}
						>
							<button
								ref={megaButtonRef}
								type="button"
								className={cn(
									"flex items-center gap-1.5 px-3.5 py-2 font-body text-sm font-medium",
									"rounded-sm transition-all duration-200",
									solid ? "text-brand-slate" : "text-white/90",
									megaMenuOpen &&
										(solid ? "bg-brand-surface text-brand-navy" : "bg-white/10 text-white"),
									!megaMenuOpen && (solid ? "hover:text-brand-navy" : "hover:text-white"),
								)}
								onClick={() => setMegaMenuOpen(!megaMenuOpen)}
								onKeyDown={(e) => {
									if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
										if (!megaMenuOpen) {
											e.preventDefault();
											setMegaMenuOpen(true);
											setMegaFocusIndex(0);
										}
									}
								}}
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

							{/* Mega Menu */}
							{megaMenuOpen && (
								<div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
									<div
										ref={megaMenuRef}
										className="w-[920px] rounded-md border border-brand-surface bg-white p-8 shadow-2xl shadow-brand-navy/8 animate-scale-in"
										role="menu"
									>
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
														<ul className="space-y-0.5" role="group" aria-label={category.label}>
															{depts.map((dept) => (
																<li key={dept.slug} role="none">
																	<Link
																		to="/departments/$slug"
																		params={{ slug: dept.slug }}
																		data-mega-link=""
																		role="menuitem"
																		tabIndex={-1}
																		className="block rounded-sm px-2.5 py-1.5 font-body text-sm text-brand-slate hover:bg-brand-parchment hover:text-brand-navy focus:bg-brand-parchment focus:text-brand-navy focus:outline-none transition-colors"
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
									solid
										? "text-brand-slate hover:text-brand-navy"
										: "text-white/90 hover:text-white",
								)}
							>
								{link.label}
							</Link>
						))}
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
							<kbd className="text-[10px] opacity-60 font-mono">&#8984;K</kbd>
						</button>
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
							Pay Taxes
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

			{/* Mobile Menu — with focus trap */}
			{mobileOpen && (
				<div
					ref={mobileMenuRef}
					className="lg:hidden fixed inset-0 top-16 z-40 bg-brand-navy overflow-y-auto"
					role="dialog"
					aria-label="Navigation menu"
				>
					<div className="px-4 py-6 space-y-1">
						{/* Departments Collapsible */}
						<div className="opacity-0 animate-slide-in-right" style={{ animationDelay: "0.05s" }}>
							<button
								type="button"
								className="flex w-full items-center justify-between rounded-sm px-3 py-3.5 font-body text-base font-medium text-white/90 hover:bg-white/10 transition-colors"
								onClick={() => setExpandedCategory(expandedCategory === "all" ? null : "all")}
							>
								<span>Departments</span>
								<svg
									aria-hidden="true"
									className={cn(
										"h-5 w-5 text-white/70 transition-transform duration-200",
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
												<div className="mb-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-brass/70 px-3">
													{category.label}
												</div>
												<ul className="space-y-0.5">
													{depts.map((dept) => (
														<li key={dept.slug}>
															<Link
																to="/departments/$slug"
																params={{ slug: dept.slug }}
																className="block rounded-sm px-3 py-2 font-body text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
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
										className="block rounded-sm px-3 py-2 font-body text-sm font-semibold text-brand-brass hover:text-brand-brass/80 transition-colors"
										onClick={closeMobile}
									>
										View All Departments &rarr;
									</Link>
								</div>
							)}
						</div>

						{/* Static Links */}
						{NAV_LINKS.map((link, index) => (
							<Link
								key={link.href}
								to={link.href}
								className="block rounded-sm px-3 py-3.5 font-body text-base font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors opacity-0 animate-slide-in-right"
								style={{ animationDelay: `${0.1 + index * 0.05}s` }}
								onClick={closeMobile}
							>
								{link.label}
							</Link>
						))}

						{/* Search + Pay Taxes (Mobile) */}
						<div
							className="pt-5 mt-3 border-t border-white/10 space-y-3 opacity-0 animate-slide-in-right"
							style={{ animationDelay: "0.3s" }}
						>
							<button
								type="button"
								onClick={() => {
									closeMobile();
									setSearchOpen(true);
								}}
								className="flex w-full items-center justify-center gap-2 rounded-sm border border-white/20 px-4 py-3.5 font-body text-base font-medium text-white/90 transition-colors hover:bg-white/10"
							>
								<Search className="size-4" />
								Search
							</button>
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

			{/* Lazy-loaded search dialog — only fetched when opened */}
			{searchOpen && (
				<Suspense fallback={null}>
					<LazySearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
				</Suspense>
			)}
		</nav>
	);
}
