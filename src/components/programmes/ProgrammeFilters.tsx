"use client";

import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { School, defaultSchools } from "@/content/programmes";
import { Tabs, TabsList, TabsTrigger } from "@/ui/Tabs";
import { cn } from "@/lib/utils";

interface ProgrammeFiltersProps {
  schools?: School[];
  level: string;
  school: string;
  query: string;
  totalCount: number;
  filteredCount: number;
}

export function ProgrammeFilters({
  schools: propSchools,
  level,
  school,
  query,
  totalCount,
  filteredCount,
}: ProgrammeFiltersProps) {
  const schoolsList = propSchools && propSchools.length > 0 ? propSchools : defaultSchools;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const updateFilters = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  const handleLevelChange = (newLevel: string) => {
    updateFilters({ level: newLevel === "all" ? null : newLevel.toUpperCase() });
  };

  const handleSchoolChange = (newSchool: string) => {
    updateFilters({ school: newSchool === "all" ? null : newSchool, area: null });
  };

  const handleQueryChange = (val: string) => {
    updateFilters({ q: val ? val : null });
  };

  const clearAll = () => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  const hasActiveFilters = level !== "all" || school !== "all" || Boolean(query);

  return (
    <div className="sticky top-16 lg:top-20 z-30 bg-white/95 backdrop-blur-xs border-b border-mist py-4 transition-all">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 space-y-4">
        {/* Level Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Tabs
            value={level.toLowerCase()}
            onValueChange={handleLevelChange}
            className="w-full sm:w-auto"
          >
            <TabsList className="border-b-0 gap-6">
              <TabsTrigger value="all">All levels</TabsTrigger>
              <TabsTrigger value="nd">National Diploma (ND)</TabsTrigger>
              <TabsTrigger value="hnd">Higher National Diploma (HND)</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search programmes..."
              className="w-full bg-chalk border border-mist pl-9 pr-8 py-1.5 text-sm rounded-[6px] text-ink placeholder:text-slate focus:outline-none focus:border-navy"
            />
            {query && (
              <button
                type="button"
                onClick={() => handleQueryChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate hover:text-ink"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* School Chips & Count Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleSchoolChange("all")}
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-[2px] border transition-colors",
                school === "all"
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-mist hover:border-navy"
              )}
            >
              All schools
            </button>
            {schoolsList.map((s) => {
              const isActive =
                school.toLowerCase() === s.slug.toLowerCase() ||
                school.toLowerCase() === s.title.toLowerCase();
              return (
                <button
                  key={s.slug || s.title}
                  type="button"
                  onClick={() => handleSchoolChange(s.slug)}
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

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-slate hover:text-crimson underline underline-offset-2 ml-2"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Polite live region for screen readers and count display */}
          <div aria-live="polite" className="text-xs text-slate font-medium">
            {filteredCount} {filteredCount === 1 ? "programme" : "programmes"}
          </div>
        </div>
      </div>
    </div>
  );
}
