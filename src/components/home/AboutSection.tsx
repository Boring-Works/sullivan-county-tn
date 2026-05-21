import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, MapPin, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CountySeal } from "~/components/shared/CountySeal";
import { useScrollReveal } from "~/hooks/useScrollReveal";

export function AboutSection() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const { t } = useTranslation();

  return (
    <section className="relative bg-white py-10 sm:py-16">
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Courthouse image */}
          <div data-reveal className="relative hidden overflow-hidden rounded-sm sm:block">
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
            <p className="mt-5 line-clamp-4 font-body text-base leading-relaxed text-brand-slate-light sm:text-lg lg:line-clamp-none">
              {t("home.about.body")}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-sage/20 bg-brand-sage/10 px-3 py-1.5 font-body text-xs font-semibold text-brand-sage">
              <CheckCircle2 aria-hidden="true" className="size-3.5" />
              Official Sullivan County government website
            </div>
            <p className="mt-4 hidden font-body text-base leading-relaxed text-brand-slate-light sm:block">
              <Link
                to="/history"
                className="text-brand-copper hover:text-brand-copper-light transition-colors font-medium"
              >
                {t("home.about.readFoundingStory")} &rarr;
              </Link>
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              <Link
                to="/contact"
                className="rounded-sm border border-brand-copper/30 bg-brand-cream p-3 transition-colors hover:border-brand-copper/50"
              >
                <MapPin aria-hidden="true" className="size-4 text-brand-copper" />
                <span className="mt-2 block font-body text-xs font-semibold leading-tight text-brand-navy sm:text-sm">
                  Contact offices
                </span>
              </Link>
              <Link
                to="/commissioners"
                className="rounded-sm border border-brand-surface bg-brand-cream p-3 transition-colors hover:border-brand-copper/40"
              >
                <Users aria-hidden="true" className="size-4 text-brand-copper" />
                <span className="mt-2 block font-body text-xs font-semibold leading-tight text-brand-navy sm:text-sm">
                  Your commissioners
                </span>
              </Link>
              <Link
                to="/documents"
                className="rounded-sm border border-brand-surface bg-brand-cream p-3 transition-colors hover:border-brand-copper/40"
              >
                <FileText aria-hidden="true" className="size-4 text-brand-copper" />
                <span className="mt-2 block font-body text-xs font-semibold leading-tight text-brand-navy sm:text-sm">
                  Public documents
                </span>
              </Link>
            </div>
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
