import { commissioners, getCommissionersByDistrict } from "~/data/commissioners";
import { CommissionerCard } from "./CommissionerCard";

const DISTRICTS = Array.from(
  new Set(commissioners.map((c) => c.district))
).sort((a, b) => a - b);

export function CommissionerGrid() {
  return (
    <div className="flex flex-col gap-10">
      {DISTRICTS.map((district) => {
        const members = getCommissionersByDistrict(district);
        return (
          <section key={district}>
            <div className="mb-4 flex items-baseline gap-3">
              <h2 className="font-display text-xl font-bold text-brand-blue">
                District {district}
              </h2>
              <span className="text-sm text-brand-slate-light">
                {members.length} {members.length === 1 ? "commissioner" : "commissioners"}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((commissioner) => (
                <CommissionerCard key={commissioner.name} commissioner={commissioner} />
              ))}
            </div>
            {district !== DISTRICTS[DISTRICTS.length - 1] && (
              <hr className="mt-10 border-border" />
            )}
          </section>
        );
      })}
    </div>
  );
}
