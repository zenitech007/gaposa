import Link from "next/link";
import { site } from "@/content/site";
import { ArrowRight, ExternalLink } from "lucide-react";

interface QuickBarItem {
  label: string;
  desc: string;
  href: string;
  external?: boolean;
}

const items: QuickBarItem[] = [
  {
    label: "Programmes",
    desc: "Browse ND and HND courses",
    href: "/programmes",
  },
  {
    label: "How to apply",
    desc: "Step-by-step admissions guide",
    href: "/admissions#how-to-apply",
  },
  {
    label: "Entry requirements",
    desc: "Academic criteria by level",
    href: "/admissions#requirements",
  },
  {
    label: "Student portal",
    desc: "Login to student services",
    href: site.portalUrl,
    external: true,
  },
  {
    label: "Contact",
    desc: "Reach our admissions team",
    href: "/contact",
  },
];

export function QuickBar() {
  return (
    <div className="w-full relative z-20 lg:-mt-10 px-5 md:px-8 lg:px-12 max-w-[1440px] mx-auto">
      <div className="bg-white border border-mist divide-y lg:divide-y-0 lg:divide-x divide-mist grid grid-cols-1 lg:grid-cols-5">
        {items.map((item) => {
          const content = (
            <div className="p-4 sm:p-5 flex flex-col justify-between group h-full hover:bg-chalk transition-colors">
              <div>
                <span className="font-body font-semibold text-base text-navy group-hover:underline underline-offset-4 decoration-1 inline-flex items-center gap-1.5">
                  {item.label}
                  {item.external ? (
                    <ExternalLink className="w-3.5 h-3.5 text-slate inline shrink-0" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-slate opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all inline shrink-0" />
                  )}
                </span>
                <p className="text-sm text-slate mt-1 leading-snug">{item.desc}</p>
              </div>
            </div>
          );

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full focus-visible:outline-none"
              >
                {content}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="block h-full focus-visible:outline-none"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
