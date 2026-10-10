import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate">
        <li>
          <Link
            href="/"
            className="hover:text-navy underline-offset-2 hover:underline transition-colors"
          >
            Home
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <span className="text-mist text-base select-none" aria-hidden="true">
                /
              </span>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-navy underline-offset-2 hover:underline transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-ink font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
