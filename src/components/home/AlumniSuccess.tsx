"use client";

import { useState } from "react";
import { testimonials, AlumniTestimonial } from "@/content/testimonials";
import { Section } from "@/ui/Section";
import { Photo } from "@/ui/Photo";
import { Tag, SampleBadge } from "@/ui/Tag";
import { Button } from "@/ui/Button";
import { ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function AlumniSuccess() {
  const [selectedId, setSelectedId] = useState<string>(testimonials[0].id);

  const activeAlumnus =
    testimonials.find((t) => t.id === selectedId) || testimonials[0];

  return (
    <Section background="chalk" className="border-t border-mist">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase font-semibold text-forest tracking-wider">
              Graduate Outcomes
            </span>
            <h2 className="text-navy font-display font-medium text-3xl sm:text-4xl">
              Alumni success & community impact
            </h2>
            <p className="text-slate text-base sm:text-lg leading-relaxed">
              Where practical training leads: our graduates apply technical knowledge to agricultural enterprise, resource management, and cooperative leadership.
            </p>
          </div>

          <Button href="/alumni" variant="ghost" className="shrink-0">
            See all alumni voices
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Featured Pull Quote & Story (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-mist p-8 sm:p-10 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Tag variant={activeAlumnus.level}>{activeAlumnus.level}</Tag>
                <span className="text-sm font-medium text-navy">
                  {activeAlumnus.programme}
                </span>
                <span className="text-xs text-slate">
                  • {activeAlumnus.graduationCohort}
                </span>
                {activeAlumnus.sample && <SampleBadge />}
              </div>

              {/* Editorial Pull Quote in Newsreader Italic */}
              <blockquote className="font-display italic text-2xl sm:text-3xl text-navy leading-snug">
                &ldquo;{activeAlumnus.quote}&rdquo;
              </blockquote>

              {/* Career Impact Detail */}
              <div className="pt-4 border-t border-mist/80 space-y-3">
                <h4 className="font-body font-semibold text-sm text-navy uppercase tracking-wider">
                  Current Professional Impact
                </h4>
                <p className="text-slate text-sm sm:text-base leading-relaxed">
                  {activeAlumnus.impactStory}
                </p>
              </div>
            </div>

            {/* Alumnus Identity Footer */}
            <div className="pt-6 border-t border-mist flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
              <div>
                <span className="font-display font-medium text-lg sm:text-xl text-navy block leading-tight">
                  {activeAlumnus.name}
                </span>
                <span className="text-slate text-sm block mt-0.5">
                  {activeAlumnus.currentRole}
                </span>
                <span className="text-forest text-xs font-medium block">
                  {activeAlumnus.organisation}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait & Interactive Profile Switcher (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Circular Portrait with subtle dashed gear ring */}
            <div className="relative w-36 h-36 mx-auto sm:mx-0">
              <svg
                className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none text-leaf"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="6 4"
                />
              </svg>
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-xs">
                <Photo
                  mediaKey={activeAlumnus.image}
                  caption={activeAlumnus.name}
                  aspectRatio="1/1"
                  className="w-full h-full border-none"
                />
              </div>
            </div>

            {/* Profile List Switcher */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-semibold text-slate tracking-wider block mb-1">
                Select an Alumnus Story
              </span>

              <div className="divide-y divide-mist border-y border-mist bg-white">
                {testimonials.map((t) => {
                  const isSelected = t.id === selectedId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedId(t.id)}
                      className={cn(
                        "w-full text-left p-4 transition-colors flex items-center justify-between group focus-visible:outline-none",
                        isSelected
                          ? "bg-chalk border-l-4 border-navy text-navy font-semibold"
                          : "hover:bg-chalk/60 text-ink"
                      )}
                      aria-current={isSelected ? "true" : undefined}
                    >
                      <div className="space-y-0.5 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{t.name}</span>
                          <Tag variant={t.level}>{t.level}</Tag>
                        </div>
                        <p className="text-xs text-slate truncate max-w-[260px]">
                          {t.currentRole}
                        </p>
                      </div>

                      <ArrowRight
                        className={cn(
                          "w-4 h-4 transition-all shrink-0",
                          isSelected
                            ? "text-navy translate-x-1"
                            : "text-slate/40 group-hover:text-navy group-hover:translate-x-0.5"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
