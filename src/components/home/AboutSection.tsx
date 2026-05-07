import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CountySeal } from "~/components/shared/CountySeal";
import { useScrollReveal } from "~/hooks/useScrollReveal";

export function AboutSection() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const { t } = useTranslation();

  return (
    <section className="relative bg-white py-20 sm:py-24">
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Courthouse image */}
          <div data-reveal className="relative overflow-hidden rounded-sm">
            <picture>
              <source
                media="(min-width: 640px)"
                srcSet="/images/about/courthouse-960.jpg"
                width={960}
                height={720}
              />
              <img
                src="/images/about/courthouse-640.jpg"
                alt="Sullivan County Court House in Blountville, Tennessee — brick building with white columns, American flag, and historical marker"
                width={640}
                height={480}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
            </picture>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-brass/60 via-brand-copper/40 to-transparent" />
          </div>

          <div data-reveal data-reveal-delay={120}>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
                  {t("home.about.eyebrow")}
                </span>
                <h2 className="font-display text-3xl font-bold text-brand-navy leading-tight sm:text-4xl">
                  {t("home.about.headingPart1")}
                  <br />
                  <span className="text-brand-stone">{t("home.about.headingPart2")}</span>
                </h2>
              </div>
              <CountySeal
                size={88}
                decorative={false}
                className="shrink-0 hidden sm:block opacity-90"
              />
            </div>
            <p className="mt-6 font-body text-base leading-relaxed text-brand-slate-light sm:text-lg">
              {t("home.about.body")}
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-brand-slate-light">
              <Link
                to="/history"
                className="text-brand-copper hover:text-brand-copper-light transition-colors font-medium"
              >
                {t("home.about.readFoundingStory")} &rarr;
              </Link>
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-copper transition-colors hover:text-brand-copper-light"
              >
                {t("home.about.contactUs")}
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/commissioners"
                className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-brand-slate transition-colors hover:text-brand-navy"
              >
                {t("home.about.meetCommissioners")}
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
