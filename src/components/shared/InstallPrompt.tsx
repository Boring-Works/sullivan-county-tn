import { Download, Share, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "pwa-install-dismissed-at";
const IOS_DISMISS_KEY = "pwa-install-ios-dismissed-at";
const DISMISS_TTL_DAYS = 30;

function isRecentlyDismissed(key: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    const at = localStorage.getItem(key);
    if (!at) return false;
    const ageDays = (Date.now() - Number.parseInt(at, 10)) / (1000 * 60 * 60 * 24);
    return ageDays < DISMISS_TTL_DAYS;
  } catch {
    return false;
  }
}

/**
 * Detect iOS Safari (not Chrome on iOS, not Firefox on iOS) where
 * `beforeinstallprompt` never fires but the user CAN install via the
 * native Share sheet.
 */
function isIosSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Mac") && "ontouchend" in document);
  const isStandalone =
    "standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true;
  // Chrome/Firefox/Edge on iOS contain CriOS/FxiOS/EdgiOS. Real Safari doesn't.
  const isOtherBrowser = /CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
  return isIos && !isStandalone && !isOtherBrowser;
}

export function InstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(false);
  const [iosOpen, setIosOpen] = useState(false);
  const iosAvailable = useRef(false);

  useEffect(() => {
    iosAvailable.current = isIosSafari() && !isRecentlyDismissed(IOS_DISMISS_KEY);
    if (!iosAvailable.current && isRecentlyDismissed(DISMISS_KEY)) {
      setHidden(true);
      return;
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Re-render so iOS path picks up after mount.
  const showIos = !hidden && !event && iosAvailable.current;

  if (hidden) return null;

  async function handleInstall() {
    if (!event) return;
    await event.prompt();
    const choice = await event.userChoice;
    if (choice.outcome === "dismissed") {
      try {
        localStorage.setItem(DISMISS_KEY, Date.now().toString());
      } catch {
        // ignore
      }
    }
    setEvent(null);
  }

  function dismissIos() {
    try {
      localStorage.setItem(IOS_DISMISS_KEY, Date.now().toString());
    } catch {
      // ignore
    }
    setIosOpen(false);
    iosAvailable.current = false;
    setHidden(true);
  }

  if (event) {
    return (
      <button
        type="button"
        onClick={handleInstall}
        className="inline-flex items-center gap-2 font-body text-xs text-brand-cream/60 hover:text-brand-brass-light transition-colors"
      >
        <Download aria-hidden="true" className="size-3.5" />
        Add to home screen
      </button>
    );
  }

  if (!showIos) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIosOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={iosOpen}
        className="inline-flex items-center gap-2 font-body text-xs text-brand-cream/60 hover:text-brand-brass-light transition-colors"
      >
        <Share aria-hidden="true" className="size-3.5" />
        Add to home screen
      </button>
      {iosOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-install-heading"
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-brand-navy/60 backdrop-blur-sm"
          onClick={dismissIos}
          onKeyDown={(e) => {
            if (e.key === "Escape") dismissIos();
          }}
        >
          <div
            className="relative w-full max-w-md rounded-t-md sm:rounded-md bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="document"
          >
            <button
              type="button"
              onClick={dismissIos}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-sm p-1 text-brand-stone hover:bg-brand-parchment"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
            <h2 id="ios-install-heading" className="font-display text-lg font-bold text-brand-navy">
              Install Sullivan County
            </h2>
            <ol className="mt-3 list-decimal pl-5 space-y-2 font-body text-sm text-brand-slate">
              <li>
                Tap the <span className="font-semibold">Share</span> button{" "}
                <Share aria-hidden="true" className="inline-block size-4 align-text-bottom" /> in
                Safari's toolbar.
              </li>
              <li>
                Choose <span className="font-semibold">Add to Home Screen</span>.
              </li>
              <li>
                Tap <span className="font-semibold">Add</span>.
              </li>
            </ol>
            <p className="mt-4 font-body text-xs text-brand-stone">
              You'll get one-tap access to county hours, phone numbers, and emergency info.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
