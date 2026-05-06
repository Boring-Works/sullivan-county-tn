import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { setLocale } from "~/lib/i18n";

export function useLocale() {
  const { i18n } = useTranslation();

  const locale = i18n.language ?? "en";

  const toggleLocale = useCallback(() => {
    const next = locale === "en" ? "es" : "en";
    setLocale(next);
  }, [locale]);

  return {
    locale,
    setLocale,
    toggleLocale,
    isSpanish: locale === "es",
  };
}
