import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "~/hooks/useScrollReveal";

export function AboutSection() {
  const containerRef = useScrollReveal<HTMLDivElement>();

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
            {/* Subtle brass frame accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-brass/60 via-brand-copper/40 to-transparent" />
          </div>

          {/* Text content */}
          <div data-reveal data-reveal-delay={120}>
            <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-brand-brass mb-4">
              Your County Government
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-navy leading-tight sm:text-4xl">
              Serving Sullivan County
              <br />
              <span className="text-brand-copper">Since 1779</span>
            </h2>
            <div className="mt-4 h-px w-20 bg-gradient-to-r from-brand-copper to-brand-brass/40" />
            <p className="mt-6 font-body text-base leading-relaxed text-brand-slate-light sm:text-lg">
              Sullivan County is the second oldest county in Tennessee and where Tennessee's
              government began. In 1790, Governor William Blount established the Southwest
              Territory's capital at Rocky Mount — the political entity from which the State of
              Tennessee was born. Today, our county covers 430 square miles of the Appalachian
              Highlands, serving over 158,000 residents.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-brand-slate-light">
              From property records to building permits, our 25 departments are here to help.{" "}
              <Link
                to="/history"
                className="text-brand-copper hover:text-brand-copper-light transition-colors font-medium"
              >
                Explore our founding story &rarr;
              </Link>
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-sm bg-brand-copper px-7 py-3 font-body text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-brand-copper-light hover:shadow-lg hover:shadow-brand-copper/20"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/commissioners"
                className="inline-flex items-center rounded-sm border border-brand-navy/15 px-7 py-3 font-body text-sm font-medium tracking-wide text-brand-navy transition-all duration-300 hover:border-brand-navy/30 hover:bg-brand-navy/5"
              >
                Meet Your Commissioners
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
