import { WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Adapted from where-tennessee-began. Listens to navigator.onLine and renders
 * a fixed top bar when the device is offline. Brand-copper styling for visual
 * urgency without the alarm-red of an actual emergency.
 */
export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    setIsOffline(!navigator.onLine);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-0 left-0 right-0 z-[70] bg-brand-copper text-white text-center text-sm py-1.5 px-4 flex items-center justify-center gap-2 pt-[max(env(safe-area-inset-top,0px),6px)]"
    >
      <WifiOff aria-hidden="true" className="h-3.5 w-3.5" />
      <span>You're offline — emergency contacts still available</span>
    </div>
  );
}
