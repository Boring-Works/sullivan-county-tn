import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Compass, Home, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AUDIENCE_PATHWAYS, type AudiencePathway } from "~/data/audience-pathways";
import { useScrollReveal } from "~/hooks/useScrollReveal";

const ICONS: Record<AudiencePathway["iconKey"], LucideIcon> = {
  home: Home,
  compass: Compass,
  briefcase: Briefcase,
};

export function AudiencePathways() {
  const ref = useScrollReveal<HTMLElement>();
  const { t } = useTranslation();

  return (
    <section
      ref={ref}
      aria-labelledby="audience-pathways-heading"
      className="relative bg-brand-cream py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10" data-reveal>
          <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-3">
            {t("audiencePathways.eyebrow")}
          </span>
          <h2
            id="audience-pathways-heading"
            className="font-display text-3xl font-bold text-brand-navy sm:text-4xl"
          >
            {t("audiencePathways.heading")}
          </h2>
          <p className="mt-3 font-body text-base text-brand-slate">{t("audiencePathways.intro")}</p>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {AUDIENCE_PATHWAYS.map((pathway, i) => (
            <li key={pathway.key} data-reveal data-reveal-delay={i * 80} className="flex">
              <PathwayTile pathway={pathway} t={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PathwayTile({
  pathway,
  t,
}: {
  pathway: AudiencePathway;
  t: ReturnType<typeof useTranslation>["t"];
}) {
  const Icon = ICONS[pathway.iconKey];

  return (
    <article className="card-lift group flex flex-1 flex-col overflow-hidden rounded-sm border border-brand-surface bg-white">
      <div className="relative h-44 overflow-hidden bg-brand-navy">
        <picture>
          {pathway.photo.srcSet?.map((s) => (
            <source key={s.minWidth} srcSet={s.src} media={`(min-width: ${s.minWidth}px)`} />
          ))}
          <img
            src={pathway.photo.src}
            alt={pathway.photo.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </picture>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/30 to-transparent"
        />
        <div className="absolute top-4 left-4 inline-flex size-11 items-center justify-center rounded-sm bg-brand-cream/95 text-brand-copper">
          <Icon aria-hidden className="size-6" />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-2xl font-bold text-white">{t(pathway.headingKey)}</h3>
          <p className="font-body text-sm font-medium text-white/85">{t(pathway.subheadingKey)}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <dl className="grid grid-cols-3 gap-2 border-b border-brand-surface pb-4">
          {pathway.stats.map((stat) => (
            <div key={stat.labelKey} className="text-center">
              <dt className="sr-only">{t(stat.labelKey)}</dt>
              <dd className="font-display text-xl font-bold text-brand-navy leading-tight">
                {stat.value}
              </dd>
              <p
                aria-hidden
                className="font-body text-[10px] font-medium uppercase tracking-wider text-brand-stone leading-tight mt-1"
              >
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </dl>

        <p className="mt-4 font-body text-sm leading-relaxed text-brand-slate-light">
          {t(pathway.bodyKey)}
        </p>

        <ul className="mt-5 space-y-2">
          {pathway.links.map((link) => (
            <li key={link.labelKey}>
              <Link
                to={link.to}
                {...(link.search ? { search: link.search } : {})}
                className="group/link inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-copper transition-colors hover:text-brand-copper-light"
              >
                {t(link.labelKey)}
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform group-hover/link:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
