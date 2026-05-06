import { useLocale } from "~/hooks/useLocale";
import { cn } from "~/lib/utils";

interface LanguageToggleProps {
  solid?: boolean;
}

export function LanguageToggle({ solid = true }: LanguageToggleProps) {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-2 py-1 font-body text-xs font-semibold tracking-wide uppercase transition-colors",
        solid
          ? "text-brand-stone hover:text-brand-navy border border-brand-surface hover:border-brand-copper/30"
          : "text-white/70 hover:text-white border border-white/20 hover:border-white/40",
      )}
      aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
      title={locale === "en" ? "Español" : "English"}
    >
      <svg
        className="size-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <title>Language</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      {locale === "en" ? "ES" : "EN"}
    </button>
  );
}
