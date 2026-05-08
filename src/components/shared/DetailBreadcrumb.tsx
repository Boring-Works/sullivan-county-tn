import { Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

export interface BreadcrumbCrumb {
  /** Visible label for the crumb. */
  label: string;
  /** Internal route path. Last crumb (the current page) should omit `to`. */
  to?: string;
}

interface DetailBreadcrumbProps {
  items: BreadcrumbCrumb[];
  className?: string;
}

/**
 * Visible breadcrumb nav for detail pages — `/departments/$slug`,
 * `/news/$slug`, `/communities/$slug`, `/history/$slug`. Pairs with the
 * existing BreadcrumbList JSON-LD: this provides the visual trail; the
 * structured data describes it for crawlers.
 *
 * The last item is rendered as `<BreadcrumbPage>` (no link, current location).
 */
export function DetailBreadcrumb({ items, className }: DetailBreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="font-body text-xs text-brand-stone">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={`${item.label}-${i}`} className="contents">
              <BreadcrumbItem>
                {isLast || !item.to ? (
                  <BreadcrumbPage className="text-brand-slate">{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.to} className="hover:text-brand-copper transition-colors">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
