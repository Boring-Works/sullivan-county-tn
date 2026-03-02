import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import type { Department, DepartmentCategory } from "~/data/departments";
import { DEPARTMENT_CATEGORIES } from "~/data/departments";

const categoryColors: Record<DepartmentCategory, string> = {
  administrative: "bg-brand-navy/10 text-brand-navy",
  courts: "bg-brand-courts/10 text-brand-courts",
  "public-safety": "bg-brand-safety/10 text-brand-safety",
  finance: "bg-brand-sage/10 text-brand-sage",
  operations: "bg-brand-brass/10 text-brand-brass",
  community: "bg-brand-community/10 text-brand-community",
};

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const categoryMeta = DEPARTMENT_CATEGORIES[department.category];

  return (
    <div className="card-lift group relative flex flex-col rounded-sm border border-brand-surface bg-white overflow-hidden">
      {/* Top accent bar */}
      <div className="h-0.5 bg-brand-copper scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-3">
          <Badge
            className={`rounded-sm font-body text-[10px] font-medium ${categoryColors[department.category]}`}
          >
            {categoryMeta.label}
          </Badge>
        </div>

        <h3 className="font-display text-lg font-bold mb-1">
          <Link
            to="/departments/$slug"
            params={{ slug: department.slug }}
            className="text-brand-navy hover:text-brand-copper transition-colors"
          >
            {department.name}
          </Link>
        </h3>

        <p className="font-body text-sm text-brand-slate-light mb-4">
          {department.head.name} &mdash; {department.head.title}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-body text-sm text-brand-slate">
            <Phone className="size-3.5 shrink-0 text-brand-navy/50" />
            <a
              href={`tel:${department.contact.phone}`}
              className="hover:text-brand-navy hover:underline"
            >
              {department.contact.phone}
            </a>
          </div>

          <Link
            to="/departments/$slug"
            params={{ slug: department.slug }}
            className="inline-flex items-center gap-1 font-body text-sm font-semibold text-brand-copper hover:text-brand-copper-light transition-colors"
          >
            Details
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
