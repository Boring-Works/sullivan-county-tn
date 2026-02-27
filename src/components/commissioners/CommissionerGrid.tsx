import { commissioners, getCommissionersByDistrict } from "~/data/commissioners";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { CommissionerCard } from "./CommissionerCard";

const DISTRICTS = Array.from(new Set(commissioners.map((c) => c.district))).sort((a, b) => a - b);

export function CommissionerGrid() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={containerRef} className="flex flex-col gap-0">
      {DISTRICTS.map((district, districtIndex) => {
        const members = getCommissionersByDistrict(district);
        const isEven = districtIndex % 2 === 0;
        return (
          <section
            key={district}
            className={
              isEven ? "bg-brand-parchment rounded-sm p-6 sm:p-8 -mx-2 sm:-mx-4" : "py-6 sm:py-8"
            }
          >
            <div className="mb-5 flex items-baseline gap-3" data-reveal>
              <h2 className="font-display text-xl font-bold text-brand-navy">
                District {district}
              </h2>
              <span className="font-body text-sm text-brand-stone">
                {members.length} {members.length === 1 ? "commissioner" : "commissioners"}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((commissioner, cardIndex) => (
                <div key={commissioner.name} data-reveal data-reveal-delay={cardIndex * 60}>
                  <CommissionerCard commissioner={commissioner} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
