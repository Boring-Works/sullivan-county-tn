import { Clock, MessageSquare, Tv } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "~/hooks/useScrollReveal";

export function PromisesSection() {
  const ref = useScrollReveal<HTMLElement>();
  const { t } = useTranslation();

  const promises = [
    { icon: Clock, title: t("home.promises.p1Title"), body: t("home.promises.p1Body") },
    { icon: Tv, title: t("home.promises.p2Title"), body: t("home.promises.p2Body") },
    {
      icon: MessageSquare,
      title: t("home.promises.p3Title"),
      body: t("home.promises.p3Body"),
    },
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="promises-heading"
      className="relative bg-brand-navy text-brand-cream overflow-hidden"
    >
      <div className="absolute inset-0 bg-topo-pattern opacity-60 pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-brass/40 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-2xl mb-12" data-reveal>
          <span className="inline-flex items-center gap-2 font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-brass-light">
            <span className="block size-1 rounded-full bg-brand-brass-light" />
            {t("home.promises.eyebrow")}
          </span>
          <h2
            id="promises-heading"
            className="mt-4 font-display text-3xl font-bold text-white leading-tight sm:text-4xl"
          >
            {t("home.promises.heading")}
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden md:grid-cols-3">
          {promises.map((p, i) => {
            const Icon = p.icon;
            return (
              <li
                key={p.title}
                data-reveal
                data-reveal-delay={i * 80}
                className="bg-brand-navy p-7 sm:p-8"
              >
                <Icon aria-hidden="true" className="size-6 text-brand-brass-light" />
                <h3 className="mt-4 font-display text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-brand-cream/70">
                  {p.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
