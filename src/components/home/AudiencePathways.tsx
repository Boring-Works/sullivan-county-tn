import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Compass, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "~/hooks/useScrollReveal";

const PATHWAYS = [
  {
    key: "residents",
    icon: Home,
    titleKey: "home.audiences.residentsTitle",
    bodyKey: "home.audiences.residentsBody",
    ctaKey: "home.audiences.residentsCta",
    to: "/departments" as const,
    search: { category: "community" },
  },
  {
    key: "businesses",
    icon: Briefcase,
    titleKey: "home.audiences.businessesTitle",
    bodyKey: "home.audiences.businessesBody",
    ctaKey: "home.audiences.businessesCta",
    to: "/economic-development" as const,
  },
  {
    key: "visitors",
    icon: Compass,
    titleKey: "home.audiences.visitorsTitle",
    bodyKey: "home.audiences.visitorsBody",
    ctaKey: "home.audiences.visitorsCta",
    to: "/visit" as const,
  },
] as const;

export function AudiencePathways() {
  const ref = useScrollReveal<HTMLElement>();
  const { t } = useTranslation();

  return (
    <section
      ref={ref}
      aria-labelledby="audiences-heading"
      className="relative bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10" data-reveal>
          <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-3">
            {t("home.audiences.eyebrow")}
          </span>
          <h2
            id="audiences-heading"
            className="font-display text-3xl font-bold text-brand-navy sm:text-4xl"
          >
            {t("home.audiences.heading")}
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PATHWAYS.map((p, i) => {
            const Icon = p.icon;
            return (
              <li
                key={p.key}
                data-reveal
                data-reveal-delay={i * 80}
                className="card-lift group relative flex"
              >
                {p.search ? (
                  <Link
                    to={p.to}
                    search={p.search}
                    className="flex flex-1 flex-col rounded-sm border border-brand-surface bg-white p-7 transition-colors hover:border-brand-navy/15"
                  >
                    <PathwayBody
                      Icon={Icon}
                      title={t(p.titleKey)}
                      body={t(p.bodyKey)}
                      cta={t(p.ctaKey)}
                    />
                  </Link>
                ) : (
                  <Link
                    to={p.to}
                    className="flex flex-1 flex-col rounded-sm border border-brand-surface bg-white p-7 transition-colors hover:border-brand-navy/15"
                  >
                    <PathwayBody
                      Icon={Icon}
                      title={t(p.titleKey)}
                      body={t(p.bodyKey)}
                      cta={t(p.ctaKey)}
                    />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function PathwayBody({
  Icon,
  title,
  body,
  cta,
}: {
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <>
      <Icon aria-hidden className="size-7 text-brand-copper" />
      <h3 className="mt-4 font-display text-lg font-bold text-brand-navy">{title}</h3>
      <p className="mt-2 font-body text-sm leading-relaxed text-brand-slate-light flex-1">{body}</p>
      <div className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-copper transition-colors group-hover:text-brand-copper-light">
        {cta}
        <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </>
  );
}
