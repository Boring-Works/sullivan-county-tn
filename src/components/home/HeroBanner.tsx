import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { MountainDivider } from "~/components/shared/MountainDivider";
import { useCountUp } from "~/hooks/useCountUp";

function StatItem({
  end,
  suffix,
  label,
  icon,
}: {
  end: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}) {
  const { ref, display } = useCountUp({ end, suffix, duration: 2200 });
  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      <span className="text-brand-brass/70">{icon}</span>
      <div>
        <div
          ref={ref}
          className="font-display text-lg font-bold text-white sm:text-xl leading-none"
        >
          {display}
        </div>
        <div className="font-body text-[10px] font-medium tracking-widest uppercase text-white/40">
          {label}
        </div>
      </div>
    </div>
  );
}

export function HeroBanner() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (heroRef.current) {
        heroRef.current.style.setProperty("--scroll-y", `${window.scrollY}`);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-brand-navy"
    >
      {/* Background image with parallax */}
      <img
        src="/hero-mountains.jpg"
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "translateY(calc(var(--scroll-y, 0) * 0.3px))" }}
      />

      {/* Dark overlay — gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/75 to-brand-navy/35" />

      {/* Topo texture overlay */}
      <div className="absolute inset-0 bg-topo-pattern" />

      {/* Grain */}
      <div className="bg-grain absolute inset-0" />

      {/* Brass accent line — top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-brass to-transparent opacity-40" />

      {/* Main content — centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-48 sm:pb-56 text-center">
        {/* Established badge */}
        <div className="mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="inline-flex items-center gap-2 border border-brand-brass/30 rounded-full px-5 py-2 text-xs font-medium tracking-widest uppercase text-brand-brass backdrop-blur-sm">
            <span className="block h-1.5 w-1.5 rounded-full bg-brand-brass" />
            Established 1779
          </span>
        </div>

        {/* County name — centered, commanding */}
        <h1
          className="font-display text-6xl font-bold tracking-tight text-white leading-[1.05] opacity-0 animate-fade-up sm:text-7xl lg:text-[8rem]"
          style={{ animationDelay: "0.2s" }}
        >
          Sullivan
          <br />
          <span className="text-brand-brass/90">County</span>
        </h1>

        {/* Location */}
        <p
          className="mt-4 font-body text-sm font-light tracking-[0.3em] uppercase text-white/50 opacity-0 animate-fade-up sm:text-base"
          style={{ animationDelay: "0.35s" }}
        >
          Blountville, Tennessee
        </p>

        {/* Tagline — italic editorial */}
        <p
          className="mt-6 max-w-md font-accent text-lg italic leading-relaxed text-white/60 opacity-0 animate-fade-up sm:text-xl"
          style={{ animationDelay: "0.5s" }}
        >
          Second oldest county in Tennessee. Serving the Appalachian Highlands.
        </p>

        {/* CTAs — stacked centered, wider */}
        <div
          className="mt-10 flex flex-col items-center gap-3.5 opacity-0 animate-fade-up sm:flex-row sm:gap-4"
          style={{ animationDelay: "0.65s" }}
        >
          <Link
            to="/departments"
            className="group inline-flex items-center justify-center gap-3 rounded-sm bg-brand-copper px-10 py-4 font-body text-sm font-semibold tracking-widest uppercase text-white transition-all duration-300 hover:bg-brand-copper-light hover:shadow-lg hover:shadow-brand-copper/20 min-w-[220px]"
          >
            Find a Department
            <svg
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <title>Arrow</title>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="https://sullivantntrustee.gov/property-tax/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm border border-white/20 px-10 py-4 font-body text-sm font-semibold tracking-widest uppercase text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-brand-brass/50 hover:text-brand-brass hover:bg-white/5 min-w-[220px]"
          >
            Pay Property Taxes
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-12 flex flex-col items-center gap-1.5 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.85s" }}
        >
          <span className="font-body text-[10px] font-medium tracking-[0.3em] uppercase text-white/30">
            Scroll
          </span>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-white/30 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <title>Scroll down</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Stat bar — pinned at bottom above mountain divider */}
      <div className="absolute bottom-[80px] sm:bottom-[100px] lg:bottom-[120px] left-0 right-0 z-30">
        <div
          className="mx-auto max-w-4xl px-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.95s" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 py-4 px-6 rounded-sm backdrop-blur-md bg-brand-navy/40 border border-white/8">
            <StatItem
              end={156000}
              suffix="+"
              label="Residents"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <title>Residents</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H9m6 0a5.98 5.98 0 00-.786-3.07M9 19.128A9.38 9.38 0 016.375 19.5a9.337 9.337 0 01-4.121-.952 4.125 4.125 0 017.533-2.493M9 19.128v-.003c0-1.113.285-2.16.786-3.07m0 0a5.97 5.97 0 014.428 0M12 9.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                  />
                </svg>
              }
            />
            <StatItem
              end={430}
              label="Square Miles"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <title>Area</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                  />
                </svg>
              }
            />
            <StatItem
              end={27}
              label="Departments"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <title>Departments</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                  />
                </svg>
              }
            />
            <StatItem
              end={1779}
              label="Established"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <title>Established</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      {/* Mountain silhouette divider */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <MountainDivider fill="var(--color-brand-cream)" />
      </div>
    </section>
  );
}
