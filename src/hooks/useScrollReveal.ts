import { useEffect, useRef } from "react";

const ARM_CLASS = "js-reveal-armed";
const REVEAL_FAILSAFE_MS = 2500;

export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>("[data-reveal]");
    if (elements.length === 0) return;

    // Arm the global "we have reveal-capable JS" flag so CSS hides elements.
    // Without this class, [data-reveal] stays visible — fail-open accessibility.
    document.documentElement.classList.add(ARM_CLASS);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay || "0";
            setTimeout(() => {
              el.classList.add("revealed");
            }, Number(delay));
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.15 },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    // Failsafe: any element still not revealed after the timer (below the fold,
    // observer never intersected, headless screenshots, etc.) — force-reveal so
    // the page is never visually broken.
    const failsafe = window.setTimeout(() => {
      for (const el of elements) {
        el.classList.add("revealed");
      }
    }, REVEAL_FAILSAFE_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return containerRef;
}
