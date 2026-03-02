import type { ReactNode } from "react";

import { useScrollReveal } from "~/hooks/useScrollReveal";

interface HistoryNarrativeProps {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  id?: string;
  background?: "white" | "parchment";
}

export function HistoryNarrative({
  eyebrow,
  title,
  children,
  id,
  background = "white",
}: HistoryNarrativeProps) {
  const containerRef = useScrollReveal<HTMLElement>();
  const bg = background === "parchment" ? "bg-brand-parchment" : "bg-white";

  return (
    <section id={id} ref={containerRef} className={`${bg} py-16 sm:py-20`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div data-reveal>
          {eyebrow && (
            <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-2xl font-bold text-brand-navy leading-tight sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <div className="mt-4 h-px w-20 bg-gradient-to-r from-brand-copper to-brand-brass/40" />
        </div>
        <div
          data-reveal
          data-reveal-delay={120}
          className="mt-8 font-body text-base leading-relaxed text-brand-slate-light space-y-5 sm:text-lg [&_strong]:text-brand-navy [&_strong]:font-semibold"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
