import { createServerFn } from "@tanstack/react-start";
import { parcelLookupSchema } from "~/lib/schemas/parcel-lookup";
import { rateLimit } from "~/server/rate-limit";

const TPAD_AUTOCOMPLETE_URL = "https://assessment.cot.tn.gov/TPAD/Search/Autocomplete";
const SULLIVAN_TPAD_CODE = "082";
const FETCH_TIMEOUT_MS = 4000;
const MAX_SUGGESTIONS = 8;

export interface ParcelSuggestion {
  label: string;
}

export interface ParcelLookupResult {
  query: string;
  suggestions: ParcelSuggestion[];
  upstreamReachable: boolean;
}

/**
 * Proxies the Tennessee Comptroller's TPAD autocomplete endpoint for owner-name
 * suggestions on the /property-taxes page. We never scrape the upstream HTML —
 * suggestions come from the same JSON endpoint TPAD itself uses, and selecting
 * a suggestion deep-links the user to the canonical TPAD search results page.
 */
export const lookupParcelSuggestions = createServerFn({ method: "GET" })
  .inputValidator(parcelLookupSchema)
  .handler(async ({ data }): Promise<ParcelLookupResult> => {
    rateLimit("parcel-lookup", 30, 60_000);

    const url = `${TPAD_AUTOCOMPLETE_URL}/${SULLIVAN_TPAD_CODE}/${encodeURIComponent(data.query)}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          accept: "application/json",
          "user-agent": "sullivancountytn.gov-parcel-lookup/1.0",
        },
      });
      clearTimeout(timer);

      if (!res.ok) {
        return { query: data.query, suggestions: [], upstreamReachable: false };
      }

      const payload = (await res.json()) as unknown;
      if (!Array.isArray(payload)) {
        return { query: data.query, suggestions: [], upstreamReachable: true };
      }

      const seen = new Set<string>();
      const suggestions: ParcelSuggestion[] = [];
      for (const raw of payload) {
        if (typeof raw !== "string") continue;
        const label = raw.trim();
        if (!label || seen.has(label)) continue;
        seen.add(label);
        suggestions.push({ label });
        if (suggestions.length >= MAX_SUGGESTIONS) break;
      }

      return { query: data.query, suggestions, upstreamReachable: true };
    } catch (err) {
      clearTimeout(timer);
      console.error(
        JSON.stringify({
          event: "parcel_lookup_upstream_failed",
          reason: err instanceof Error ? err.name : "unknown",
        }),
      );
      return { query: data.query, suggestions: [], upstreamReachable: false };
    }
  });
