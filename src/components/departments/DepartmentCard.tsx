import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import type { Department, DepartmentCategory } from "~/data/departments";
import { DEPARTMENT_CATEGORIES } from "~/data/departments";

const categoryColors: Record<DepartmentCategory, string> = {
  administrative: "bg-blue-100 text-blue-800",
  courts: "bg-purple-100 text-purple-800",
  "public-safety": "bg-red-100 text-red-800",
  finance: "bg-green-100 text-green-800",
  operations: "bg-amber-100 text-amber-800",
  community: "bg-teal-100 text-teal-800",
};

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const categoryMeta = DEPARTMENT_CATEGORIES[department.category];

  return (
    <Card className="group transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      <CardHeader>
        <Badge className={categoryColors[department.category]}>{categoryMeta.label}</Badge>
        <CardTitle className="text-lg">
          <Link
            to="/departments/$slug"
            params={{ slug: department.slug }}
            className="text-brand-blue hover:text-brand-blue-light transition-colors"
          >
            {department.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {department.head.name} &mdash; {department.head.title}
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-sm text-brand-slate">
          <Phone className="size-4 shrink-0 text-brand-blue" />
          <a
            href={`tel:${department.contact.phone}`}
            className="hover:text-brand-blue hover:underline"
          >
            {department.contact.phone}
          </a>
        </div>
      </CardContent>

      <CardFooter>
        <Link
          to="/departments/$slug"
          params={{ slug: department.slug }}
          className="text-sm font-medium text-brand-orange hover:text-brand-orange-light transition-colors"
        >
          View Details &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
}
