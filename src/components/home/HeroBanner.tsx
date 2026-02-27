import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { MountainDivider } from "~/components/shared/MountainDivider";
import { useCountUp } from "~/hooks/useCountUp";

function StatCounter({ end, suffix, label }: { end: number; suffix?: string; label: string }) {
  const { ref, display } = useCountUp({ end, suffix, duration: 2200 });
  return (
    <div className="px-5 py-3 sm:px-7 sm:py-4 text-center">
      <div ref={ref} className="font-display text-2xl font-bold text-white sm:text-3xl">
        {display}
      </div>
      <div className="mt-1 font-body text-[10px] font-medium tracking-widest uppercase text-white/50">
        {label}
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
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-navy"
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
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy/40" />

      {/* Topo texture overlay */}
      <div className="absolute inset-0 bg-topo-pattern" />

      {/* Grain */}
      <div className="bg-grain absolute inset-0" />

      {/* Brass accent line — top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-brass to-transparent opacity-40" />

      {/* Content — asymmetric left-aligned */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Established badge */}
          <div className="mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-2 border border-brand-brass/30 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-brand-brass backdrop-blur-sm">
              <span className="block h-1.5 w-1.5 rounded-full bg-brand-brass" />
              Established 1779
            </span>
          </div>

          {/* County name */}
          <h1
            className="font-display text-6xl font-bold tracking-tight text-white leading-[1.05] opacity-0 animate-fade-up sm:text-7xl lg:text-[8rem]"
            style={{ animationDelay: "0.2s" }}
          >
            Sullivan
            <br />
            <span className="text-brand-brass/90">County</span>
          </h1>

          {/* State */}
          <p
            className="mt-4 font-body text-lg font-light tracking-[0.25em] uppercase text-white/50 opacity-0 animate-fade-up sm:text-xl"
            style={{ animationDelay: "0.35s" }}
          >
            Tennessee
          </p>

          {/* Divider */}
          <div
            className="mt-6 h-px w-32 origin-left bg-gradient-to-r from-brand-copper to-brand-brass/40 opacity-0 animate-line-grow"
            style={{ animationDelay: "0.45s" }}
          />

          {/* Tagline */}
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 opacity-0 animate-fade-up sm:text-xl"
            style={{ animationDelay: "0.55s" }}
          >
            Second oldest county in Tennessee. Serving the Appalachian Highlands.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col gap-4 opacity-0 animate-fade-up sm:flex-row sm:gap-5"
            style={{ animationDelay: "0.7s" }}
          >
            <Link
              to="/departments"
              className="group inline-flex items-center gap-3 rounded-sm bg-brand-copper px-7 py-3.5 font-body text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-brand-copper-light hover:shadow-lg hover:shadow-brand-copper/20"
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
              className="inline-flex items-center justify-center rounded-sm border border-white/20 px-7 py-3.5 font-body text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-brand-brass/50 hover:text-brand-brass hover:bg-white/5"
            >
              Pay Property Taxes
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-sm border border-white/20 px-7 py-3.5 font-body text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-brand-brass/50 hover:text-brand-brass hover:bg-white/5"
            >
              Contact Us
            </Link>
          </div>

          {/* Stat counters — in flow, below CTAs */}
          <div className="mt-14 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
            <div className="inline-flex rounded-sm border border-white/10 backdrop-blur-sm bg-white/5 divide-x divide-white/10">
              <StatCounter end={156000} suffix="+" label="Residents" />
              <StatCounter end={430} label="Square Miles" />
              <StatCounter end={27} label="Departments" />
              <StatCounter end={1779} label="Established" />
            </div>
          </div>
        </div>

        {/* Vertical text */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
          <div
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: "1s", writingMode: "vertical-rl" }}
          >
            <span className="text-xs font-body font-light tracking-[0.4em] uppercase text-white/15">
              Appalachian Highlands
            </span>
          </div>
        </div>
      </div>

      {/* Mountain silhouette divider — replaces gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <MountainDivider fill="var(--color-brand-cream)" />
      </div>
    </section>
  );
}
