import type { Metadata } from "next";
import { site } from "@/content/site";
import { rector, principalOfficers } from "@/content/staff";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { Section } from "@/ui/Section";
import { Photo } from "@/ui/Photo";
import { FinalCta } from "@/home/FinalCta";
import { AcademicStaffTabs } from "./AcademicStaffTabs";
import { Mail, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Administration & Leadership",
  description: `Meet the governing leadership, management board, principal officers, and academic heads of department at ${site.name}.`,
};

export default function AdministrationPage() {
  return (
    <>
      {/* Header Band */}
      <section className="bg-white border-b border-mist pt-10 pb-12">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Administration" }]} />

          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase font-semibold text-forest tracking-wider">
              Governance & Leadership
            </span>
            <h1 className="font-display font-medium text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Administration & leadership
            </h1>
            <p className="text-slate text-lg sm:text-xl font-normal leading-relaxed">
              Meet the executive leadership, management board, principal officers, and academic
              heads guiding the institutional mission of {site.name}.
            </p>
          </div>
        </div>
      </section>

      {/* Tier 1: The Rector (Split 5/7 on Chalk Background) */}
      <Section background="chalk">
        <div className="space-y-6">
          <span className="text-xs uppercase font-semibold text-forest tracking-wider">
            Office of the Rector
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left 5 Cols: Photo Placeholder (Ratio 4:5) */}
            <div className="lg:col-span-5">
              <div className="max-w-md mx-auto lg:max-w-none">
                <Photo
                  mediaKey={rector.image || "about.rector"}
                  caption={`${rector.name} — ${rector.title}`}
                  aspectRatio="4/5"
                  className="w-full shadow-subtle border border-mist"
                  priority
                />
              </div>
            </div>

            {/* Right 7 Cols: Name, Title & Italicized Display Welcome Message */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="font-display font-medium text-3xl sm:text-4xl text-navy">
                  {rector.name}
                </h2>
                <p className="text-forest font-medium text-base sm:text-lg mt-1">
                  {rector.title}
                </p>
                <p className="text-xs text-slate mt-0.5">{rector.qualifications}</p>
              </div>

              {/* 2-Paragraph Italicized Message in Newsreader font-display */}
              <div className="space-y-4 text-ink font-display italic text-lg sm:text-xl leading-relaxed border-l-2 border-forest pl-5">
                {rector.message.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Tier 2: Principal Officers (Management Board Grid) */}
      <Section background="white">
        <div className="space-y-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase font-semibold text-forest tracking-wider">
              Management Board
            </span>
            <h2 className="text-navy font-display font-medium text-3xl sm:text-4xl">
              Principal Officers
            </h2>
            <p className="text-slate text-base sm:text-lg">
              Executive officers overseeing central administration, finance, learning resources, and
              technology infrastructure.
            </p>
          </div>

          {/* Grid: 1 col mobile, 2 cols tablet, 4 cols desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {principalOfficers.map((officer) => (
              <div
                key={officer.role}
                className="bg-white border border-mist p-4 flex flex-col justify-between space-y-4 hover:border-navy/30 transition-colors"
              >
                {/* 1:1 Photo placeholder */}
                <Photo
                  mediaKey={officer.image || "about.campus"}
                  caption={`${officer.name} — ${officer.role}`}
                  aspectRatio="1/1"
                  className="w-full"
                />

                <div className="space-y-1.5 flex-1 flex flex-col justify-between pt-2">
                  <div>
                    <h3 className="font-display font-medium text-xl text-navy leading-snug">
                      {officer.name}
                    </h3>
                    <p className="text-sm font-medium text-slate mt-0.5">{officer.role}</p>
                    {officer.qualifications && (
                      <p className="text-xs text-slate/80 mt-1 flex items-start gap-1">
                        <GraduationCap className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate/60" />
                        <span>{officer.qualifications}</span>
                      </p>
                    )}
                  </div>

                  {officer.email && (
                    <div className="pt-3 border-t border-mist/80">
                      <a
                        href={`mailto:${officer.email}`}
                        className="text-xs text-forest hover:text-navy hover:underline inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{officer.email}</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Tier 3: Academic Leadership (Ruled Rows Filterable by School) */}
      <Section background="chalk" className="border-t border-mist">
        <div className="space-y-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase font-semibold text-forest tracking-wider">
              Faculty & Programme Direction
            </span>
            <h2 className="text-navy font-display font-medium text-3xl sm:text-4xl">
              Academic Departments
            </h2>
            <p className="text-slate text-base sm:text-lg">
              Heads of Department leading curricula, technical fieldwork, and student learning across
              our core academic schools.
            </p>
          </div>

          {/* Interactive Ruled Rows with School Tabs */}
          <AcademicStaffTabs />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
