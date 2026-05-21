import { ArrowRight, Compass, MapIcon, Smartphone } from "lucide-react";

const TOURISM_APP_URL = "https://wheretennesseebegan.com/";
const TOURISM_TOURS_URL = "https://wheretennesseebegan.com/tours";

export function TourismAppPromo() {
  return (
    <section
      aria-labelledby="tourism-app-heading"
      className="bg-brand-parchment px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-sm border border-brand-brass/20 bg-white shadow-xl shadow-brand-navy/5 lg:grid lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="p-4 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-copper/10 px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.18em] text-brand-copper">
              <Compass aria-hidden="true" className="size-3.5" />
              Visiting Sullivan County?
            </span>
            <span className="font-body text-xs font-semibold text-brand-stone">
              Free tourism app · No app store needed
            </span>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
            <div>
              <h2
                id="tourism-app-heading"
                className="font-display text-2xl font-bold leading-tight text-brand-navy text-balance sm:text-3xl"
              >
                Turn a county visit into a self-guided trail.
              </h2>
              <p className="mt-3 line-clamp-3 max-w-2xl font-body text-sm leading-relaxed text-brand-slate-light sm:text-base lg:line-clamp-none">
                Use Where Tennessee Began to find today&apos;s best stop, follow heritage tours, and
                build a trip around history, music, water, racing, and mountain views.
              </p>
            </div>

            <ul className="grid grid-cols-3 gap-2" aria-label="Tourism app features">
              <li className="rounded-sm border border-brand-surface bg-brand-cream p-2.5 sm:p-3">
                <Smartphone aria-hidden="true" className="size-4 text-brand-copper" />
                <span className="mt-2 block font-body text-xs font-bold leading-tight text-brand-navy">
                  Smart daily picks
                </span>
              </li>
              <li className="rounded-sm border border-brand-surface bg-brand-cream p-2.5 sm:p-3">
                <MapIcon aria-hidden="true" className="size-4 text-brand-copper" />
                <span className="mt-2 block font-body text-xs font-bold leading-tight text-brand-navy">
                  Maps and tours
                </span>
              </li>
              <li className="rounded-sm border border-brand-surface bg-brand-cream p-2.5 sm:p-3">
                <Compass aria-hidden="true" className="size-4 text-brand-copper" />
                <span className="mt-2 block font-body text-xs font-bold leading-tight text-brand-navy">
                  Stories to walk
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-5 overflow-hidden rounded-sm border border-brand-surface bg-brand-navy p-3 sm:hidden">
            <img
              src="/images/tourism-app/final-mobile-home.png"
              alt="Where Tennessee Began tourism app home screen"
              width={390}
              height={844}
              loading="lazy"
              decoding="async"
              className="mx-auto h-32 w-full rounded-sm object-cover object-top"
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center">
            <a
              href={TOURISM_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm bg-brand-navy px-4 py-2.5 font-body text-sm font-bold text-white transition-colors hover:bg-brand-copper"
            >
              Open the tourism app
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </a>
            <a
              href={TOURISM_TOURS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm border border-brand-navy/15 px-4 py-2.5 font-body text-sm font-bold text-brand-navy transition-colors hover:border-brand-copper hover:text-brand-copper"
            >
              See self-guided tours
            </a>
          </div>
        </div>

        <div className="relative hidden min-h-[300px] overflow-hidden bg-brand-navy lg:block">
          <div aria-hidden="true" className="absolute inset-0 bg-topo-pattern opacity-20" />
          <div className="absolute left-1/2 top-8 w-44 -translate-x-1/2 overflow-hidden rounded-[1.75rem] border-[8px] border-brand-navy-deep bg-brand-navy-deep shadow-2xl shadow-black/30">
            <img
              src="/images/tourism-app/final-mobile-home.png"
              alt="Where Tennessee Began tourism app home screen"
              width={390}
              height={844}
              loading="lazy"
              decoding="async"
              className="h-[360px] w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
