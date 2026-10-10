import type { Metadata } from "next";
import { site } from "@/content/site";
import { alumniStories } from "@/content/alumni";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { Section } from "@/ui/Section";
import { Photo } from "@/ui/Photo";
import { Tag, SampleBadge } from "@/ui/Tag";
import { Button } from "@/ui/Button";
import { FinalCta } from "@/home/FinalCta";
import { Briefcase, GraduationCap, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Alumni Voices & Success Stories",
  description: `Discover how graduates of ${site.name} are advancing industries in technology, agriculture, environmental management, and enterprise.`,
};

export default function AlumniPage() {
  return (
    <>
      {/* Header Band */}
      <section className="bg-white border-b border-mist pt-10 pb-12">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Alumni Voices" }]} />

          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase font-semibold text-forest tracking-wider">
              Graduate Trajectories
            </span>
            <h1 className="font-display font-medium text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Alumni voices & career pathways
            </h1>
            <p className="text-slate text-lg sm:text-xl font-normal leading-relaxed">
              From foundational technical classrooms to leadership across Nigeria: explore how our
              graduates translate practical vocational training into direct societal and economic impact.
            </p>
          </div>
        </div>
      </section>

      {/* Main Alumni Stories Roster */}
      <Section background="white">
        <div className="space-y-16">
          <div className="space-y-2">
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-navy">
              Featured graduate perspectives
            </h2>
            <p className="text-slate text-base sm:text-lg">
              Insights from recent cohorts on how hands-on polytechnic education shaped their professional readiness.
            </p>
          </div>

          <div className="space-y-12">
            {alumniStories.map((alumnus) => (
              <article
                key={alumnus.id}
                className="bg-chalk border border-mist p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Alumnus Circular Portrait with Gear Ring */}
                <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-4">
                    <svg
                      className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none text-leaf"
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
                        mediaKey={alumnus.image}
                        caption={alumnus.name}
                        aspectRatio="1/1"
                        className="w-full h-full border-none"
                      />
                    </div>
                  </div>

                  <h3 className="font-display font-medium text-xl sm:text-2xl text-navy text-center sm:text-left">
                    {alumnus.name}
                  </h3>

                  <div className="space-y-1 mt-1 text-sm text-center sm:text-left">
                    <p className="font-medium text-slate flex items-center justify-center sm:justify-start gap-1.5">
                      <Briefcase className="w-4 h-4 text-slate shrink-0" />
                      <span>{alumnus.currentRole}</span>
                    </p>
                    <p className="text-xs text-forest font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-forest shrink-0" />
                      <span>{alumnus.organisation}</span>
                    </p>
                  </div>
                </div>

                {/* Pull Quote & Impact Story */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Tag variant={alumnus.level}>{alumnus.level}</Tag>
                    <span className="text-sm font-semibold text-navy">
                      {alumnus.programme}
                    </span>
                    <span className="text-xs text-slate">
                      • {alumnus.graduationCohort}
                    </span>
                    {alumnus.sample && <SampleBadge />}
                  </div>

                  <blockquote className="font-display italic text-xl sm:text-2xl text-navy leading-relaxed border-l-2 border-forest pl-4 sm:pl-6">
                    &ldquo;{alumnus.quote}&rdquo;
                  </blockquote>

                  <div className="pt-2 space-y-2">
                    <h4 className="text-xs uppercase font-semibold text-slate tracking-wider">
                      Current Career Responsibilities
                    </h4>
                    <p className="text-ink text-sm sm:text-base leading-relaxed max-w-[68ch]">
                      {alumnus.impactStory}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Invitation Banner */}
          <div className="p-8 bg-white border border-mist flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <h3 className="font-display font-medium text-2xl text-navy">
                Are you an alumnus of {site.name}?
              </h3>
              <p className="text-sm text-slate">
                We celebrate the accomplishments of our graduates across industries. Share your career milestones with our Alumni Relations desk.
              </p>
            </div>

            <Button href="/contact?subject=Other" variant="secondary" className="shrink-0">
              Share your story
            </Button>
          </div>
        </div>
      </Section>

      <FinalCta
        title="Begin your journey today"
        description={`Join the next cohort of accomplished students at ${site.name}. Applications are open online.`}
      />
    </>
  );
}
