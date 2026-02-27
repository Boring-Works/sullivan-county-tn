import { Link } from "@tanstack/react-router";

export function HeroBanner() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-brand-navy">
      {/* Topographic texture */}
      <div className="absolute inset-0 bg-topo-pattern opacity-100" />

      {/* Gradient overlay — warm-to-cool diagonal */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-blue/90 to-brand-navy-light" />

      {/* Grain texture */}
      <div className="bg-grain absolute inset-0" />

      {/* Decorative brass accent line — top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-brass to-transparent opacity-40" />

      {/* Content — asymmetric left-aligned */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Established badge */}
          <div className="mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-2 border border-brand-brass/30 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-brand-brass">
              <span className="block h-1.5 w-1.5 rounded-full bg-brand-brass" />
              Established 1779
            </span>
          </div>

          {/* County name — large editorial serif */}
          <h1
            className="font-display text-6xl font-bold tracking-tight text-white leading-[1.05] opacity-0 animate-fade-up sm:text-7xl lg:text-8xl"
            style={{ animationDelay: "0.2s" }}
          >
            Sullivan
            <br />
            <span className="text-brand-brass/90">County</span>
          </h1>

          {/* State — tracking wide, smaller */}
          <p
            className="mt-4 font-body text-lg font-light tracking-[0.25em] uppercase text-white/50 opacity-0 animate-fade-up sm:text-xl"
            style={{ animationDelay: "0.35s" }}
          >
            Tennessee
          </p>

          {/* Decorative divider */}
          <div
            className="mt-8 h-px w-32 origin-left bg-gradient-to-r from-brand-copper to-brand-brass/40 opacity-0 animate-line-grow"
            style={{ animationDelay: "0.45s" }}
          />

          {/* Tagline */}
          <p
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/70 opacity-0 animate-fade-up sm:text-xl"
            style={{ animationDelay: "0.55s" }}
          >
            Second oldest county in Tennessee. Serving over 156,000 residents across 430 square
            miles of the Appalachian Highlands.
          </p>

          {/* CTA Buttons — horizontal with border treatments */}
          <div
            className="mt-12 flex flex-col gap-4 opacity-0 animate-fade-up sm:flex-row sm:gap-5"
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
        </div>

        {/* Decorative — vertical text on right (desktop) */}
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

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream to-transparent" />
    </section>
  );
}
