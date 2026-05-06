import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "~/locales/en.json";
import es from "~/locales/es.json";

const LOCALE_COOKIE = "locale";

function getStoredLocale(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  return match?.[1] ?? "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: getStoredLocale(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export function setLocale(locale: string) {
  i18n.changeLanguage(locale);
  if (typeof document !== "undefined") {
    // biome-ignore lint/suspicious/noDocumentCookie: client-side locale persistence via cookie
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Strict`;
    document.documentElement.lang = locale;
  }
}

export function getLocale(): string {
  return i18n.language ?? "en";
}

export default i18n;
