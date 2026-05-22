import { CreditCard, ExternalLink, Loader2, MapPin, Search } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { externalHandoffs } from "~/data/external-handoffs";
import { lookupParcelSuggestions, type ParcelSuggestion } from "~/server/parcel-lookup";

const SULLIVAN_TPAD_CODE = "082";

const DEBOUNCE_MS = 280;
const MIN_QUERY_LENGTH = 3;

function buildTpadUrl(query: string): string {
  const params = new URLSearchParams({ Jur: SULLIVAN_TPAD_CODE, Query: query });
  return `${externalHandoffs.tpadAssessment.url}?${params.toString()}`;
}

export function ParcelLookup() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [suggestions, setSuggestions] = useState<ParcelSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [upstreamReachable, setUpstreamReachable] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const listboxId = useId();

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Debounce the query to avoid hammering the upstream
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query]);

  // Fetch suggestions when debounced query crosses the threshold
  useEffect(() => {
    if (debounced.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    lookupParcelSuggestions({ data: { query: debounced } })
      .then((res) => {
        if (cancelled) return;
        setSuggestions(res.suggestions);
        setUpstreamReachable(res.upstreamReachable);
        setActiveIndex(-1);
        setOpen(true);
      })
      .catch(() => {
        if (cancelled) return;
        setSuggestions([]);
        setUpstreamReachable(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  // Close suggestions on outside pointer
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: PointerEvent) {
      const w = wrapperRef.current;
      if (!w) return;
      if (e.target instanceof Node && !w.contains(e.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const submit = useCallback((q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) return;
    window.open(buildTpadUrl(trimmed), "_blank", "noopener,noreferrer");
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
        submit(query);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = activeIndex >= 0 ? suggestions[activeIndex].label : query;
      submit(target);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const showHint = query.trim().length > 0 && query.trim().length < MIN_QUERY_LENGTH;
  const showNoResults =
    open &&
    !loading &&
    debounced.length >= MIN_QUERY_LENGTH &&
    suggestions.length === 0 &&
    upstreamReachable;
  const showOffline =
    open && !loading && debounced.length >= MIN_QUERY_LENGTH && !upstreamReachable;

  return (
    <section
      aria-labelledby="parcel-lookup-heading"
      className="mt-8 rounded-sm border border-brand-surface bg-white p-6 sm:p-8 shadow-sm"
    >
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex size-12 shrink-0 items-center justify-center rounded-sm bg-brand-navy/5 text-brand-navy">
          <Search aria-hidden="true" className="size-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h2
            id="parcel-lookup-heading"
            className="font-display text-xl font-bold text-brand-navy sm:text-2xl"
          >
            {t("propertyTaxes.lookup.heading")}
          </h2>
          <p className="mt-1 font-body text-sm text-brand-slate-light leading-relaxed">
            {t("propertyTaxes.lookup.subheading")}
          </p>

          <div ref={wrapperRef} className="relative mt-5">
            <label htmlFor={inputId} className="sr-only">
              {t("propertyTaxes.lookup.inputLabel")}
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-stone"
              />
              <input
                ref={inputRef}
                id={inputId}
                type="search"
                inputMode="search"
                enterKeyHint="search"
                autoComplete="off"
                autoCapitalize="words"
                spellCheck={false}
                disabled={!hydrated}
                value={query}
                placeholder={t("propertyTaxes.lookup.placeholder")}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => suggestions.length > 0 && setOpen(true)}
                onKeyDown={onKeyDown}
                role="combobox"
                aria-controls={listboxId}
                aria-expanded={open && suggestions.length > 0}
                aria-autocomplete="list"
                aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
                aria-busy={loading || undefined}
                className="w-full rounded-sm border border-brand-surface bg-white py-3 pl-10 pr-12 font-body text-base text-brand-slate placeholder:text-brand-stone/70 focus:border-brand-copper focus:outline-none focus:ring-2 focus:ring-brand-copper/30 disabled:cursor-wait disabled:opacity-60 min-h-[44px]"
              />
              {loading && (
                <Loader2
                  aria-hidden="true"
                  className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 animate-spin text-brand-stone"
                />
              )}
            </div>

            {/* Suggestions listbox */}
            {open && suggestions.length > 0 && (
              <ul
                id={listboxId}
                role="listbox"
                aria-label={t("propertyTaxes.lookup.suggestionsLabel")}
                className="absolute z-30 mt-1 max-h-72 w-full overflow-y-auto rounded-sm border border-brand-surface bg-white shadow-lg"
              >
                {suggestions.map((s, i) => (
                  <li
                    key={s.label}
                    id={`${listboxId}-${i}`}
                    role="option"
                    aria-selected={i === activeIndex}
                  >
                    <button
                      type="button"
                      tabIndex={-1}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setQuery(s.label);
                        setOpen(false);
                        submit(s.label);
                      }}
                      className={`block w-full px-4 py-2.5 text-left font-body text-sm transition-colors ${
                        i === activeIndex
                          ? "bg-brand-parchment text-brand-navy"
                          : "text-brand-slate hover:bg-brand-parchment/60"
                      }`}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Hints + states */}
            {showHint && (
              <p className="mt-2 font-body text-xs text-brand-stone">
                {t("propertyTaxes.lookup.minChars")}
              </p>
            )}
            {showNoResults && (
              <p className="mt-2 font-body text-xs text-brand-stone">
                No matching parcel appeared. You can still search the official state assessment site
                with this name, address, or parcel ID.
              </p>
            )}
            {showOffline && (
              <p className="mt-2 font-body text-xs text-brand-safety">
                {t("propertyTaxes.lookup.offline")}
              </p>
            )}
          </div>

          {/* Three side-by-side actions — explain that three official portals exist
              and route the user to the right one with their query in hand. */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Button
              type="button"
              variant="navy"
              size="lg"
              onClick={() => submit(query)}
              disabled={!hydrated || query.trim().length < MIN_QUERY_LENGTH}
              className="min-h-[44px]"
            >
              <Search aria-hidden="true" />
              {t("propertyTaxes.lookup.viewAssessment")}
              <ExternalLink aria-hidden="true" className="size-3.5 opacity-70" />
            </Button>
            <Button asChild variant="copper" size="lg" className="min-h-[44px]">
              <a
                href={externalHandoffs.trusteePayTaxes.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CreditCard aria-hidden="true" />
                {t("propertyTaxes.lookup.payNow")}
                <ExternalLink aria-hidden="true" className="size-3.5 opacity-70" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-h-[44px]">
              <a href={externalHandoffs.gisMap.url} target="_blank" rel="noopener noreferrer">
                <MapPin aria-hidden="true" />
                {t("propertyTaxes.lookup.viewOnMap")}
                <ExternalLink aria-hidden="true" className="size-3.5 opacity-70" />
              </a>
            </Button>
          </div>
          <p className="mt-3 font-body text-[11px] leading-relaxed text-brand-stone">
            {t("propertyTaxes.lookup.disclosure")} External property tools open official partner
            systems in a new tab.
          </p>
        </div>
      </div>
    </section>
  );
}
