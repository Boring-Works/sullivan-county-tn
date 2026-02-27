import { Link } from "@tanstack/react-router";

export function HeroBanner() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-blue to-brand-blue-dark">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        {/* County name */}
        <h1
          className="font-display text-5xl font-bold tracking-tight text-white opacity-0 animate-fade-up sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.1s" }}
        >
          Sullivan County
        </h1>

        {/* State */}
        <p
          className="mt-2 font-display text-xl font-light tracking-widest uppercase text-brand-cream/80 opacity-0 animate-fade-up sm:text-2xl"
          style={{ animationDelay: "0.25s" }}
        >
          Tennessee
        </p>

        {/* Decorative line */}
        <div
          className="mx-auto mt-6 h-px w-24 origin-left bg-brand-orange opacity-0 animate-line-grow"
          style={{ animationDelay: "0.4s" }}
        />

        {/* Subtitle */}
        <p
          className="mt-6 text-lg font-medium text-brand-cream/90 opacity-0 animate-fade-up sm:text-xl"
          style={{ animationDelay: "0.5s" }}
        >
          Established 1779 &mdash; Second Oldest County in Tennessee
        </p>

        {/* Body */}
        <p
          className="mt-3 text-base text-brand-cream/70 opacity-0 animate-fade-up sm:text-lg"
          style={{ animationDelay: "0.65s" }}
        >
          Serving over 156,000 residents across 430 square miles
        </p>

        {/* CTA Buttons */}
        <div
          className="mt-10 flex flex-col items-center justify-center gap-4 opacity-0 animate-fade-up sm:flex-row"
          style={{ animationDelay: "0.8s" }}
        >
          <Link
            to="/departments"
            className="inline-flex items-center rounded-md border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-blue"
          >
            Find a Department
          </Link>
          <a
            href="https://sullivantntrustee.gov/property-tax/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-orange-light"
          >
            Pay Property Taxes
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-md border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-blue"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
