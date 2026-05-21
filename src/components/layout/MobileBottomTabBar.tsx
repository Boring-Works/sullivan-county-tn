import { Link } from "@tanstack/react-router";
import { DollarSign, Phone, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { TelLink } from "~/components/shared/TelLink";

/**
 * Three-action bottom tab bar for mobile only. Hides at md+ where the desktop
 * nav is sufficient. Stays in the thumb zone per USWDS + UAE Design System
 * guidance ("3–5 critical actions in the thumb zone").
 *
 * Tap targets meet WCAG 2.2 AA (48x48 actual button size; visible icons
 * smaller). Hidden when the on-screen keyboard is open so it doesn't cover
 * a form input.
 */
export function MobileBottomTabBar() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;
    const vv = window.visualViewport;
    function handleResize() {
      // When the OS keyboard pushes the layout viewport up, the visual
      // viewport height shrinks below the layout viewport height.
      const ratio = vv.height / window.innerHeight;
      setKeyboardOpen(ratio < 0.85);
    }
    handleResize();
    vv.addEventListener("resize", handleResize);
    return () => vv.removeEventListener("resize", handleResize);
  }, []);

  function openSearch() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sullivan:open-search"));
    }
  }

  if (keyboardOpen) return null;

  return (
    <nav
      aria-label="Quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-brand-navy text-brand-cream border-t border-brand-brass/20 shadow-[0_-4px_20px_rgba(8,22,36,0.25)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-3">
        <li>
          <Link
            to="/property-taxes"
            className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] hover:bg-white/5 active:bg-white/10 transition-colors"
          >
            <DollarSign aria-hidden="true" className="size-5 text-brand-brass-light" />
            <span className="font-body text-[10px] font-semibold tracking-wide uppercase">Pay</span>
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={openSearch}
            aria-label="Open search"
            className="flex w-full flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] hover:bg-white/5 active:bg-white/10 transition-colors"
          >
            <Search aria-hidden="true" className="size-5 text-brand-brass-light" />
            <span className="font-body text-[10px] font-semibold tracking-wide uppercase">
              Search
            </span>
          </button>
        </li>
        <li>
          <TelLink
            phone="(423) 323-6417"
            ariaLabel="Call the main county number"
            className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] hover:bg-white/5 active:bg-white/10 transition-colors text-brand-cream"
          >
            <Phone aria-hidden="true" className="size-5 text-brand-brass-light" />
            <span className="font-body text-[10px] font-semibold tracking-wide uppercase">
              Call
            </span>
          </TelLink>
        </li>
      </ul>
    </nav>
  );
}
