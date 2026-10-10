import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Programme, formatProgrammeTitle } from "@/content/programmes";
import { getProgrammes, getProgrammeBySlug } from "@/sanity/lib/fetch";
import { site } from "@/content/site";
import { faqs } from "@/content/faqs";
import { getCourseSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { Tag } from "@/ui/Tag";
import { Button } from "@/ui/Button";
import { Section } from "@/ui/Section";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/ui/Accordion";
import { FinalCta } from "@/home/FinalCta";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allProgrammes = await getProgrammes();
  return allProgrammes.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programme = await getProgrammeBySlug(slug);

  if (!programme) {
    return { title: "Programme Not Found" };
  }

  const formattedTitle = formatProgrammeTitle(programme.level, programme.title);

  return {
    title: formattedTitle,
    description: programme.summary,
  };
}

export default async function ProgrammeDetailPage({ params }: Props) {
  const { slug } = await params;
  const programme = await getProgrammeBySlug(slug);

  if (!programme) {
    notFound();
  }

  const courseSchema = getCourseSchema(programme);
  const formattedTitle = formatProgrammeTitle(programme.level, programme.title);
  const requirements =
    programme.requirements && programme.requirements.length > 0
      ? programme.requirements
      : site.admissions.requirements[programme.level];

  // Related programmes: other courses in the same school reference
  const allProgrammes = await getProgrammes();
  const sameSchoolProgrammes = allProgrammes.filter(
    (p) =>
      p.slug !== programme.slug &&
      (p.school?.slug === programme.school?.slug ||
        p.school?.title === programme.school?.title)
  );

  // If current course is ND, prioritize showing HND equivalent / progression path
  const sortedRelated = [...sameSchoolProgrammes].sort((a, b) => {
    if (programme.level === "ND") {
      if (a.level === "HND" && b.level !== "HND") return -1;
      if (b.level === "HND" && a.level !== "HND") return 1;
    }
    return 0;
  });

  const fallbackProgrammes = allProgrammes.filter(
    (p) => p.slug !== programme.slug && !sortedRelated.some((r) => r.slug === p.slug)
  );

  const relatedProgrammes = [...sortedRelated, ...fallbackProgrammes].slice(0, 3);

  // Relevant FAQs for this programme
  const relevantFaqs = faqs.slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      {/* Header Band (Chalk) */}
      <section className="bg-chalk border-b border-mist pt-10 pb-12">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs
            items={[
              { label: "Programmes", href: "/programmes" },
              { label: formattedTitle },
            ]}
          />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-3">
                <Tag variant={programme.level}>{programme.level}</Tag>
                <span className="text-sm text-slate">{programme.school?.title}</span>
                <span className="text-sm text-slate">•</span>
                <span className="text-sm text-slate">{programme.durationYears} Years Duration</span>
              </div>

              <h1 className="font-display font-medium text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                {formattedTitle}
              </h1>
            </div>

            <div className="shrink-0">
              <Button href={site.applyUrl} external variant="primary">
                Apply now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Quick Facts Grid */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Column (8 cols desktop) */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. About this programme */}
            <div className="space-y-4">
              <h2 className="font-display font-medium text-2xl sm:text-3xl text-navy">
                About this programme
              </h2>
              <p className="text-ink text-base sm:text-lg leading-relaxed max-w-[68ch]">
                {programme.summary}
              </p>
            </div>

            {/* 2. What you will study */}
            <div className="space-y-4">
              <h3 className="font-display font-medium text-xl sm:text-2xl text-navy">
                What you will study
              </h3>
              <p className="text-sm text-slate mb-2">
                Core technical areas covered throughout the {programme.durationYears}-year curriculum:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-ink text-sm sm:text-base">
                {programme.study.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5 p-3 bg-chalk border border-mist/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest mt-2 shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Entry requirements */}
            <div className="space-y-4 bg-chalk p-6 border border-mist">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-medium text-xl text-navy">
                  Entry requirements ({programme.level})
                </h3>
                <Tag variant={programme.level}>{programme.level}</Tag>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-ink">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-navy font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate pt-2 border-t border-mist/80">
                Specific subject prerequisites and UTME subject combinations may apply. Confirm exact details with the Admissions Office.
              </p>
            </div>

            {/* 4. Where this can lead */}
            <div className="space-y-4">
              <h3 className="font-display font-medium text-xl sm:text-2xl text-navy">
                Where this can lead
              </h3>
              <p className="text-sm text-slate mb-2">
                Typical career paths, entrepreneurial opportunities, and academic progression:
              </p>
              <div className="space-y-2">
                {programme.careers.map((career, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-mist">
                    <span className="text-forest font-semibold text-sm">→</span>
                    <span className="text-ink font-medium text-sm sm:text-base">{career}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. FAQ Accordion */}
            <div className="space-y-4 pt-6">
              <h3 className="font-display font-medium text-xl sm:text-2xl text-navy">
                Frequently asked questions
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {relevantFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Aside: Quick Facts (4 cols desktop, sticky) */}
          <div className="lg:col-span-4 order-first lg:order-last">
            <div className="sticky top-28 bg-chalk border border-mist p-6 space-y-6">
              <h3 className="font-display font-medium text-xl text-navy pb-3 border-b border-mist">
                Quick facts
              </h3>

              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs uppercase font-semibold text-slate tracking-wider">Level</dt>
                  <dd className="font-medium text-navy text-base mt-0.5">
                    {programme.level === "ND" ? "National Diploma (ND)" : "Higher National Diploma (HND)"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase font-semibold text-slate tracking-wider">Duration</dt>
                  <dd className="font-medium text-navy text-base mt-0.5">
                    {programme.durationYears} Years (4 Semesters)
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase font-semibold text-slate tracking-wider">School</dt>
                  <dd className="font-medium text-navy text-base mt-0.5">
                    {programme.school?.title}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase font-semibold text-slate tracking-wider">Study Mode</dt>
                  <dd className="font-medium text-navy text-base mt-0.5">{programme.studyMode}</dd>
                </div>
              </dl>

              <div className="space-y-3 pt-4 border-t border-mist">
                <Button href={site.applyUrl} external variant="primary" className="w-full">
                  Apply now
                </Button>

                <div className="text-center">
                  <Button
                    href={`/contact?subject=${encodeURIComponent(programme.title)}`}
                    variant="ghost"
                    className="text-xs"
                  >
                    Ask admissions a question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Programmes */}
        {relatedProgrammes.length > 0 && (
          <div className="mt-20 pt-12 border-t border-mist space-y-6">
            <h3 className="font-display font-medium text-2xl text-navy">Related programmes</h3>

            <div className="divide-y divide-mist border-y border-mist">
              {relatedProgrammes.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/programmes/${rel.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-4 px-2 hover:bg-chalk transition-colors gap-2"
                >
                  <div className="flex items-center gap-3">
                    <Tag variant={rel.level}>{rel.level}</Tag>
                    <span className="font-display font-medium text-lg text-navy group-hover:underline underline-offset-4">
                      {formatProgrammeTitle(rel.level, rel.title)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate">
                    <span>{rel.school?.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate group-hover:text-navy" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>

      <FinalCta />
    </>
  );
}
