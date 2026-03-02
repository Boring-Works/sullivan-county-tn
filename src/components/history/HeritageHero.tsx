import { useEffect, useRef } from "react";

import { MountainDivider } from "~/components/shared/MountainDivider";

interface HeritageHeroProps {
  title: string;
  subtitle?: string;
  tagline?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
}

export function HeritageHero({
  title,
  subtitle,
  tagline = "Where Tennessee Began and Begins",
  backgroundImage = "/images/hero/boone-lake-1920.jpg",
  backgroundAlt = "Sullivan County, Tennessee landscape",
}: HeritageHeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function handleScroll() {
      if (heroRef.current) {
        heroRef.current.style.setProperty("--scroll-y", `${window.scrollY}`);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <section
      ref={heroRef}
      className="relative min-h-[70vh] flex flex-col overflow-hidden bg-brand-navy"
    >
      <img
        src={backgroundImage}
        alt={backgroundAlt}
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: "translateY(calc(var(--scroll-y, 0) * 0.3px))",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/60 via-brand-navy/30 to-transparent" />

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-brass to-transparent opacity-40" />

      <div className="relative z-10 flex-1 flex items-center px-6 pt-24 pb-32 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            {/* Two Dates device */}
            <div className="mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-flex items-center gap-3 font-display text-sm font-bold tracking-widest text-brand-brass/80">
                1790 <span className="h-px w-6 bg-brand-brass/40" /> {currentYear}
              </span>
            </div>

            <h1
              className="font-display text-4xl font-bold tracking-tight text-white leading-[1.1] opacity-0 animate-fade-up sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "0.2s" }}
            >
              {title}
            </h1>

            <div
              className="mt-5 h-0.5 w-16 origin-left bg-gradient-to-r from-brand-copper via-brand-brass to-brand-brass/20 opacity-0 animate-line-grow sm:w-24"
              style={{ animationDelay: "0.35s" }}
            />

            {subtitle && (
              <p
                className="mt-5 max-w-xl font-accent text-base italic leading-relaxed text-white/70 opacity-0 animate-fade-up sm:text-xl"
                style={{ animationDelay: "0.55s" }}
              >
                {subtitle}
              </p>
            )}

            <p
              className="mt-4 font-body text-sm tracking-widest uppercase text-brand-brass/60 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.7s" }}
            >
              {tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <MountainDivider fill="#ffffff" />
      </div>
    </section>
  );
}
