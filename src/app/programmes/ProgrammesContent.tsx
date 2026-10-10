"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Programme,
  School,
  defaultSchools,
  slugToSchoolSlug,
  formatProgrammeTitle,
} from "@/content/programmes";
import { ProgrammeFilters } from "@/programmes/ProgrammeFilters";
import { ProgrammeList } from "@/programmes/ProgrammeList";
import { Section } from "@/ui/Section";

interface ProgrammesContentProps {
  initialProgrammes: Programme[];
  initialSchools?: School[];
}

export function ProgrammesContent({
  initialProgrammes,
  initialSchools = defaultSchools,
}: ProgrammesContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const levelParam = (searchParams.get("level") || "all").toLowerCase().trim();
  const rawSchool = (searchParams.get("school") || searchParams.get("area") || "all").trim();
  const queryParam = searchParams.get("q") || "";

  const filtered = useMemo(() => {
    return initialProgrammes.filter((prog) => {
      // 1. Strict Level filter (All / ND / HND)
      if (levelParam !== "all" && prog.level.trim().toLowerCase() !== levelParam) {
        return false;
      }

      // 2. School filter (support slug, title, or legacy alias)
      if (rawSchool !== "all") {
        const normRaw = rawSchool.toLowerCase();
        const mappedSlug = slugToSchoolSlug[normRaw] || normRaw;
        const progSchoolSlug = (prog.school?.slug || "").toLowerCase();
        const progSchoolTitle = (prog.school?.title || "").toLowerCase();
        const matchesSchool =
          progSchoolSlug === mappedSlug ||
          progSchoolTitle === normRaw ||
          progSchoolSlug === normRaw;
        if (!matchesSchool) {
          return false;
        }
      }

      // 3. Text query
      if (queryParam.trim() !== "") {
        const q = queryParam.toLowerCase();
        const matchesTitle = prog.title.toLowerCase().includes(q);
        const matchesFormattedTitle = formatProgrammeTitle(prog.level, prog.title)
          .toLowerCase()
          .includes(q);
        const matchesSummary = prog.summary.toLowerCase().includes(q);
        const matchesSchool = (prog.school?.title || "").toLowerCase().includes(q);
        if (!matchesTitle && !matchesFormattedTitle && !matchesSummary && !matchesSchool) {
          return false;
        }
      }

      return true;
    });
  }, [initialProgrammes, levelParam, rawSchool, queryParam]);

  const handleClear = () => {
    router.replace(pathname, { scroll: false });
  };

  return (
    <>
      <ProgrammeFilters
        schools={initialSchools}
        level={levelParam}
        school={rawSchool}
        query={queryParam}
        totalCount={initialProgrammes.length}
        filteredCount={filtered.length}
      />

      <Section background="white" className="py-12 sm:py-16">
        <ProgrammeList programmes={filtered} onClearFilters={handleClear} />
      </Section>
    </>
  );
}
