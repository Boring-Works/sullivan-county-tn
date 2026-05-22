import { useNavigate } from "@tanstack/react-router";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command";
import { buildSearchIndex, type SearchItem, SUGGESTED_QUERIES } from "~/data/search-index";
import { cn } from "~/lib/utils";

const TYPE_LABELS: Record<SearchItem["type"], string> = {
  department: "Department",
  news: "News",
  commissioner: "Commissioner",
  document: "Documents",
  page: "Page",
  task: "Task",
};

const QUICK_ACTIONS = [
  { label: "Pay property taxes", to: "/property-taxes" },
  { label: "Browse departments", to: "/departments" },
  { label: "Find forms", to: "/forms" },
  { label: "View meeting calendar", to: "/calendar" },
  { label: "Contact county offices", to: "/contact" },
] as const;

const TYPE_COLORS: Record<SearchItem["type"], string> = {
  department: "bg-brand-navy/10 text-brand-navy",
  news: "bg-brand-copper/10 text-brand-copper",
  commissioner: "bg-brand-sage/10 text-brand-sage",
  document: "bg-brand-stone/10 text-brand-stone",
  page: "bg-brand-brass/10 text-brand-brass",
  task: "bg-brand-community/10 text-brand-community",
};

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pre-fills the search input on open — used by suggested-query chips. */
  initialQuery?: string;
}

export function SearchDialog({ open, onOpenChange, initialQuery = "" }: SearchDialogProps) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const searchIndex = useMemo(() => buildSearchIndex(), []);
  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: "title", weight: 2 },
          // Citizen-language aliases (e.g. "food stamps", "tags", "deed")
          // weighted nearly as high as the title — Search.gov guidance:
          // citizens rarely use official program names.
          { name: "aliases", weight: 1.8 },
          { name: "description", weight: 1 },
          { name: "category", weight: 0.5 },
        ],
        threshold: 0.3,
        includeScore: true,
      }),
    [searchIndex],
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query, { limit: 8 });
  }, [fuse, query]);

  // Reset on open/close
  useEffect(() => {
    if (open) {
      setQuery(initialQuery);
    }
  }, [open, initialQuery]);

  function navigateTo(to: string) {
    onOpenChange(false);
    if (/^https?:\/\//.test(to) || /\.(pdf|doc|docx|tif|mp4)$/i.test(to)) {
      window.open(to, "_blank", "noopener,noreferrer");
      return;
    }
    navigate({ to });
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Sullivan County"
      description="Search across departments, services, news, commissioners, and documents."
      shouldFilter={false}
      className="top-[calc(env(safe-area-inset-top)+1rem)] max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-2rem)] max-w-xl translate-y-0 overflow-hidden rounded-md border-brand-surface p-0 shadow-2xl shadow-brand-navy/10 sm:top-[12%]"
    >
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search departments, services, people..."
        aria-label="Search Sullivan County"
        autoFocus
      />
      <CommandList
        className="max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-9rem)] p-2 sm:max-h-[420px]"
        aria-live="polite"
        aria-atomic="true"
      >
        {!query.trim() && (
          <>
            <CommandGroup heading="Quick actions">
              {QUICK_ACTIONS.map((action) => (
                <CommandItem
                  key={action.to}
                  value={action.label}
                  onSelect={() => navigateTo(action.to)}
                >
                  <span className="font-body text-sm text-brand-slate">{action.label}</span>
                  <CommandShortcut>Open</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Try one of these">
              <div className="flex flex-wrap gap-1.5 px-2 py-2">
                {SUGGESTED_QUERIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuery(q)}
                    className="rounded-full border border-brand-surface bg-brand-parchment px-3 py-1 font-body text-xs text-brand-slate transition-colors hover:border-brand-copper/40 hover:text-brand-copper"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </CommandGroup>
          </>
        )}

        {query.trim() && results.length === 0 && (
          <CommandEmpty>
            <span className="block font-body text-sm text-brand-slate">
              No results for <strong className="text-brand-navy">"{query}"</strong>.
            </span>
            <span className="mt-2 block font-body text-xs text-brand-stone">
              Try “taxes,” “marriage,” “building permit,” or “sheriff.”
            </span>
          </CommandEmpty>
        )}

        {results.length > 0 && (
          <CommandGroup heading="Search results">
            {results.map((result) => (
              <CommandItem
                key={`${result.item.type}-${result.item.url}-${result.item.title}`}
                value={`${result.item.title} ${result.item.description} ${result.item.category ?? ""} ${(result.item.aliases ?? []).join(" ")}`}
                onSelect={() => navigateTo(result.item.url)}
                className="items-start py-2.5"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-display text-sm font-bold text-brand-navy">
                      {result.item.title}
                    </span>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 font-body text-[10px] font-medium",
                        TYPE_COLORS[result.item.type],
                      )}
                    >
                      {TYPE_LABELS[result.item.type]}
                    </span>
                  </div>
                  <p className="line-clamp-2 font-body text-xs text-brand-stone">
                    {result.item.description}
                  </p>
                </div>
                <CommandShortcut>{result.item.actionLabel ?? "Open"}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
      <div className="flex items-center gap-4 border-t border-brand-surface px-4 py-2 font-body text-[10px] text-brand-stone">
        <span>
          <kbd className="rounded border border-brand-surface px-1 py-0.5 font-mono text-[10px]">
            ↑↓
          </kbd>{" "}
          move
        </span>
        <span>
          <kbd className="rounded border border-brand-surface px-1 py-0.5 font-mono text-[10px]">
            ↵
          </kbd>{" "}
          open
        </span>
        <span>
          <kbd className="rounded border border-brand-surface px-1 py-0.5 font-mono text-[10px]">
            esc
          </kbd>{" "}
          close
        </span>
      </div>
    </CommandDialog>
  );
}
