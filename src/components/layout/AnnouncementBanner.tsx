import { AlertTriangle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { listPublicAnnouncements, type PublicAnnouncement } from "~/server/public-announcements";

export function AnnouncementBanner() {
  const [items, setItems] = useState<PublicAnnouncement[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = localStorage.getItem("dismissed-announcements");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    listPublicAnnouncements()
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        // D1 unavailable or network error — render nothing.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const active = items.filter((a) => !dismissed.has(a.id));

  // Keep --banner-height in sync so SiteNav can offset itself.
  useEffect(() => {
    const root = document.documentElement;
    if (active.length === 0) {
      root.style.removeProperty("--banner-height");
      return;
    }
    const el = ref.current;
    if (!el) return;
    const updateHeight = () => {
      root.style.setProperty("--banner-height", `${el.offsetHeight}px`);
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    window.addEventListener("resize", updateHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
      root.style.removeProperty("--banner-height");
    };
  }, [active.length]);

  if (active.length === 0) return null;

  function dismiss(id: string) {
    setDismissed((prev) => {
      const next = new Set(prev).add(id);
      try {
        // Cap to last 50 IDs so the key doesn't grow unbounded over time.
        const trimmed = Array.from(next).slice(-50);
        localStorage.setItem("dismissed-announcements", JSON.stringify(trimmed));
      } catch {
        // Storage may be unavailable (private mode, quota); silently fail.
      }
      return next;
    });
  }

  return (
    <div ref={ref} className="fixed top-0 left-0 right-0 z-[60]">
      {active.map((a) => (
        <div
          key={a.id}
          role={a.type === "urgent" ? "alert" : "status"}
          aria-live={a.type === "urgent" ? "assertive" : "polite"}
          className={
            a.type === "urgent" ? "bg-brand-copper text-white" : "bg-brand-navy text-brand-cream"
          }
        >
          <div className="mx-auto flex max-w-7xl items-start justify-between gap-4 px-4 py-2 sm:px-6">
            <div className="flex items-start gap-2.5 font-body text-sm leading-relaxed">
              {a.type === "urgent" && (
                <AlertTriangle aria-hidden="true" className="size-4 shrink-0 mt-0.5" />
              )}
              <span>
                <span className="font-semibold">{a.title}</span>
                {a.body ? <span className="ml-1.5 opacity-90">{a.body}</span> : null}
                {a.linkUrl ? (
                  <a
                    href={a.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 font-semibold underline underline-offset-2 hover:no-underline"
                  >
                    Learn more &rarr;
                  </a>
                ) : null}
              </span>
            </div>
            <button
              type="button"
              onClick={() => dismiss(a.id)}
              className="shrink-0 rounded p-1 hover:bg-white/20 transition-colors"
              aria-label={`Dismiss announcement: ${a.title}`}
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
