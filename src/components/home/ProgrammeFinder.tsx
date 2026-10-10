"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  programmes as defaultProgrammes,
  defaultSchools,
  Programme,
  School,
  formatProgrammeTitle,
} from "@/content/programmes";
import { Section } from "@/ui/Section";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/Tabs";
import { Tag } from "@/ui/Tag";
import { Button } from "@/ui/Button";
import { cn } from "@/lib/utils";

interface ProgrammeFinderProps {
  initialProgrammes?: Programme[];
  initialSchools?: School[];
}

export function ProgrammeFinder({
  initialProgrammes = defaultProgrammes,
  initialSchools = defaultSchools,
}: ProgrammeFinderProps = {}) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeSchool, setActiveSchool] = useState<string>("all");

  const programmesList = initialProgrammes.length > 0 ? initialProgrammes : defaultProgrammes;
  const schoolsList = initialSchools.length > 0 ? initialSchools : defaultSchools;

  const sortedProgrammes = [...programmesList].sort((a, b) => {
    if (a.level === "ND" && b.level === "HND") return -1;
    if (a.level === "HND" && b.level === "ND") return 1;
    return a.title.localeCompare(b.title);
  });

  const filtered = sortedProgrammes.filter((p) => {
    // 1. Strict Level filter (All / ND / HND)
    const matchesLevel =
      activeTab === "all" || p.level.trim().toUpperCase() === activeTab.trim().toUpperCase();
    if (!matchesLevel) return false;

    // 2. School filter
    const matchesSchool =
      activeSchool === "all" ||
      p.school?.slug === activeSchool ||
      p.school?.title === activeSchool;
    if (!matchesSchool) return false;

    return true;
  });

  return (
    <Section background="white">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-navy font-display font-medium">Find your programme</h2>
          <p className="text-slate text-base sm:text-lg">
            Choose a qualification level or school to explore what we offer.
          </p>
        </div>

        {/* Level Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList aria-label="Filter programmes by qualification level">
            <TabsTrigger value="all">All programmes</TabsTrigger>
            <TabsTrigger value="nd">National Diploma (ND)</TabsTrigger>
            <TabsTrigger value="hnd">Higher National Diploma (HND)</TabsTrigger>
          </TabsList>

          {/* School Filter Chips */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSchool("all")}
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-[2px] border transition-colors",
                activeSchool === "all"
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-mist hover:border-navy"
              )}
            >
              All schools
            </button>
            {schoolsList.map((s) => {
              const isActive = activeSchool === s.slug || activeSchool === s.title;
              return (
                <button
                  key={s.slug || s.title}
                  type="button"
                  onClick={() => setActiveSchool(s.slug)}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-[2px] border transition-colors",
                    isActive
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-navy border-mist hover:border-navy"
                  )}
                >
                  {s.title}
                </button>
              );
            })}
          </div>

          <TabsContent value={activeTab} className="pt-4">
            {/* Ruled Rows (Not cards) */}
            <div className="divide-y divide-mist border-y border-mist">
              {filtered.map((programme) => (
                <Link
                  key={programme.slug}
                  href={`/programmes/${programme.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 px-3 -mx-3 hover:bg-chalk transition-colors cursor-pointer gap-2 sm:gap-4"
                >
                  {/* Left: Title & Level Tag */}
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <Tag variant={programme.level} className="shrink-0 mt-1 sm:mt-0">
                      {programme.level}
                    </Tag>
                    <h3 className="font-display font-medium text-lg sm:text-xl text-navy group-hover:underline underline-offset-4 decoration-1">
                      {formatProgrammeTitle(programme.level, programme.title)}
                    </h3>
                  </div>

                  {/* Right: School, Duration, Chevron */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 text-sm text-slate shrink-0 pl-9 sm:pl-0">
                    <span>{programme.school?.title}</span>
                    <span className="text-slate/80">{programme.durationYears} Years</span>
                    <ChevronDownRight className="w-5 h-5 text-slate group-hover:text-navy group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              ))}

              {filtered.length === 0 && (
                <div className="py-12 text-center text-slate">
                  No courses found matching this qualification level and school.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Link */}
        <div className="pt-4">
          <Button href="/programmes" variant="ghost">
            See all programmes
          </Button>
        </div>
      </div>
    </Section>
  );
}

function ChevronDownRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <ChevronRight
      {...props}
      strokeWidth={1.75}
      className={`shrink-0 ${props.className || ""}`}
      aria-hidden="true"
    />
  );
}
