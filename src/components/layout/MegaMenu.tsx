"use client";

import React from "react";
import Link from "next/link";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import {
  programmes as defaultProgrammes,
  defaultSchools,
  Programme,
  School,
} from "@/content/programmes";
import { mainNav } from "@/content/nav";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  schools?: School[];
  programmes?: Programme[];
}

export function MegaMenu({
  schools: propSchools,
  programmes: propProgrammes,
}: MegaMenuProps = {}) {
  const currentSchools = propSchools && propSchools.length > 0 ? propSchools : defaultSchools;
  const currentProgrammes = propProgrammes && propProgrammes.length > 0 ? propProgrammes : defaultProgrammes;

  // Determine which dropdown links should be shown based on real data
  const isLinkVisible = (requiresData?: string) => {
    if (!requiresData) return true;
    if (requiresData === "rector") return Boolean(site.rector);
    if (requiresData === "leadership") return site.leadership.length > 0;
    if (requiresData === "accreditation") return site.accreditation.length > 0;
    if (requiresData === "fees") return site.admissions.fees.length > 0;
    if (requiresData === "dates") return site.admissions.dates.length > 0;
    return true;
  };

  return (
    <NavigationMenuPrimitive.Root className="h-full static">
      <NavigationMenuPrimitive.List className="h-full flex items-center gap-0.5 xl:gap-1.5 list-none m-0 p-0 whitespace-nowrap static">
        {mainNav.map((item) => {
          /* ───────── Plain link ───────── */
          if (item.type === "link") {
            return (
              <NavigationMenuPrimitive.Item key={item.label} className="h-full flex items-center">
                <Link
                  href={item.href}
                  className="px-2.5 xl:px-3.5 py-2 text-[14px] xl:text-[15px] font-medium text-ink hover:text-navy hover:underline underline-offset-4 decoration-1 focus-visible:outline-none transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </NavigationMenuPrimitive.Item>
            );
          }

          /* ───────── Programmes dropdown (single-column, Admissions style) ───────── */
          if (item.type === "megamenu") {
            const schoolsWithProgrammes = currentSchools
              .map((school) => ({
                school,
                programmes: currentProgrammes.filter(
                  (p) =>
                    p.school?.slug === school.slug ||
                    p.school?.title === school.title
                ),
              }))
              .filter((group) => group.programmes.length > 0);

            // Any programmes that might not have matched a school
            const capturedSlugs = new Set(
              schoolsWithProgrammes.flatMap((g) => g.programmes.map((p) => p.slug))
            );
            const unassigned = currentProgrammes.filter((p) => !capturedSlugs.has(p.slug));

            return (
              <NavigationMenuPrimitive.Item key={item.label} value="programmes" className="h-full flex items-center relative">
                <NavigationMenuPrimitive.Trigger className="group px-2.5 xl:px-3.5 py-2 text-[14px] xl:text-[15px] font-medium text-ink hover:text-navy inline-flex items-center gap-1 focus-visible:outline-none data-[state=open]:text-navy whitespace-nowrap">
                  <span>{item.label}</span>
                  <ChevronDown
                    className="w-4 h-4 text-slate transition-transform duration-200 group-data-[state=open]:rotate-180"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </NavigationMenuPrimitive.Trigger>

                {/* ── Single-column dropdown panel matching Admissions visual style ── */}
                <NavigationMenuPrimitive.Content
                  className={cn(
                    "absolute top-full left-0",
                    "w-[min(440px,calc(100vw-2rem))]",
                    "bg-white border border-mist shadow-menu p-3",
                    "focus:outline-none z-50",
                    "max-h-[min(80vh,580px)] overflow-y-auto overscroll-contain"
                  )}
                >
                  <div className="space-y-1">
                    {schoolsWithProgrammes.map((group, groupIdx) => (
                      <div key={group.school.slug || group.school.title} className="space-y-1">
                        {/* School section header: small uppercase muted label */}
                        <div
                          className={cn(
                            "px-3.5 pb-1 select-none",
                            groupIdx > 0 ? "pt-3.5 border-t border-mist/50 mt-1.5" : "pt-1"
                          )}
                        >
                          <Link
                            href={`/programmes?school=${encodeURIComponent(group.school.slug)}`}
                            className="text-[11px] font-semibold uppercase tracking-wider text-slate/70 hover:text-navy transition-colors inline-flex items-center gap-1 group/header"
                          >
                            <span>{group.school.title}</span>
                          </Link>
                        </div>

                        {/* Programme list: generous row padding, title + description + far-right pill badge */}
                        <ul className="space-y-1 list-none p-0 m-0">
                          {group.programmes.map((p) => {
                            const cleanTitle = p.title.replace(/^(ND|HND)\s+/i, "");
                            return (
                              <li key={p.slug}>
                                <Link
                                  href={`/programmes/${p.slug}`}
                                  className="flex items-center justify-between gap-4 px-3.5 py-3 rounded-none hover:bg-chalk transition-colors group"
                                >
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium text-navy group-hover:text-forest transition-colors">
                                      {cleanTitle}
                                    </div>
                                    {p.summary && (
                                      <div className="text-xs text-slate mt-0.5 leading-snug line-clamp-1">
                                        {p.summary}
                                      </div>
                                    )}
                                  </div>
                                  <span
                                    className={cn(
                                      "shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border leading-tight tracking-wide select-none",
                                      p.level === "HND"
                                        ? "border-navy/25 text-navy/70 bg-navy/[0.02]"
                                        : "border-slate/25 text-slate/75 bg-transparent"
                                    )}
                                  >
                                    {p.level}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}

                    {/* Unassigned programmes fallback */}
                    {unassigned.length > 0 && (
                      <div className="space-y-1 pt-3.5 border-t border-mist/50 mt-1.5">
                        <div className="px-3.5 pt-1 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate/70 select-none">
                          Other Programmes
                        </div>
                        <ul className="space-y-1 list-none p-0 m-0">
                          {unassigned.map((p) => {
                            const cleanTitle = p.title.replace(/^(ND|HND)\s+/i, "");
                            return (
                              <li key={p.slug}>
                                <Link
                                  href={`/programmes/${p.slug}`}
                                  className="flex items-center justify-between gap-4 px-3.5 py-3 rounded-none hover:bg-chalk transition-colors group"
                                >
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium text-navy group-hover:text-forest transition-colors">
                                      {cleanTitle}
                                    </div>
                                    {p.summary && (
                                      <div className="text-xs text-slate mt-0.5 leading-snug line-clamp-1">
                                        {p.summary}
                                      </div>
                                    )}
                                  </div>
                                  <span
                                    className={cn(
                                      "shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border leading-tight tracking-wide select-none",
                                      p.level === "HND"
                                        ? "border-navy/25 text-navy/70 bg-navy/[0.02]"
                                        : "border-slate/25 text-slate/75 bg-transparent"
                                    )}
                                  >
                                    {p.level}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {/* Bottom action: View all programmes */}
                    <div className="pt-2.5 mt-2 border-t border-mist/60">
                      <Link
                        href="/programmes"
                        className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-navy hover:text-forest hover:bg-chalk transition-colors group"
                      >
                        <span>View all programmes</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate group-hover:text-forest group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </div>
                  </div>
                </NavigationMenuPrimitive.Content>
              </NavigationMenuPrimitive.Item>
            );
          }

          /* ───────── Regular dropdown (About, Admissions) ───────── */
          if (item.type === "dropdown" && item.items) {
            const visibleItems = item.items.filter((sub) => isLinkVisible(sub.requiresData));

            return (
              <NavigationMenuPrimitive.Item key={item.label} value={item.label.toLowerCase()} className="h-full flex items-center relative">
                <NavigationMenuPrimitive.Trigger className="group px-2.5 xl:px-3.5 py-2 text-[14px] xl:text-[15px] font-medium text-ink hover:text-navy inline-flex items-center gap-1 focus-visible:outline-none data-[state=open]:text-navy whitespace-nowrap">
                  <span>{item.label}</span>
                  <ChevronDown
                    className="w-4 h-4 text-slate transition-transform duration-200 group-data-[state=open]:rotate-180"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </NavigationMenuPrimitive.Trigger>

                <NavigationMenuPrimitive.Content className="absolute top-full left-0 w-72 bg-white border border-mist shadow-menu p-3 focus:outline-none z-50">
                  <ul className="space-y-1">
                    {visibleItems.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          className="block p-2.5 rounded-none hover:bg-chalk transition-colors group"
                        >
                          <div className="text-sm font-medium text-navy group-hover:text-forest">
                            {sub.label}
                          </div>
                          {sub.description && (
                            <div className="text-xs text-slate mt-0.5 leading-snug">
                              {sub.description}
                            </div>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuPrimitive.Content>
              </NavigationMenuPrimitive.Item>
            );
          }

          return null;
        })}
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  );
}
