"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Programme, formatProgrammeTitle } from "@/content/programmes";
import { Tag } from "@/ui/Tag";

interface ProgrammeListProps {
  programmes: Programme[];
  onClearFilters?: () => void;
}

export function ProgrammeList({ programmes, onClearFilters }: ProgrammeListProps) {
  if (programmes.length === 0) {
    return (
      <div className="py-16 text-center border-y border-mist space-y-4">
        <p className="text-slate text-base">
          No programmes match. Clear the filters to see every programme.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm font-semibold text-navy hover:underline underline-offset-4"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="divide-y divide-mist border-y border-mist">
      {programmes.map((p) => (
        <Link
          key={p.slug}
          href={`/programmes/${p.slug}`}
          className="group flex flex-col md:flex-row md:items-center justify-between py-6 px-4 -mx-4 hover:bg-chalk transition-colors cursor-pointer gap-3 md:gap-6"
        >
          {/* Title, Level, and Desktop Summary */}
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-start sm:items-center gap-3">
              <Tag variant={p.level} className="shrink-0 mt-0.5 sm:mt-0">
                {p.level}
              </Tag>
              <h2 className="font-display font-medium text-xl sm:text-2xl text-navy group-hover:underline underline-offset-4 decoration-1 leading-snug">
                {formatProgrammeTitle(p.level, p.title)}
              </h2>
            </div>

            {/* Desktop one-line summary */}
            <p className="text-slate text-sm line-clamp-1 pl-9 sm:pl-0 max-w-[70ch]">
              {p.summary}
            </p>
          </div>

          {/* School, Duration & Chevron */}
          <div className="flex items-center justify-between md:justify-end gap-6 text-sm text-slate shrink-0 pl-9 sm:pl-0">
            <span>{p.school?.title}</span>
            <span className="text-slate/80">{p.durationYears} Years</span>
            <ChevronRight
              className="w-5 h-5 text-slate group-hover:text-navy group-hover:translate-x-0.5 transition-all"
              strokeWidth={1.75}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
