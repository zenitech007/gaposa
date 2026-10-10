import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { faqs } from "@/content/faqs";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { Section } from "@/ui/Section";
import { Button } from "@/ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/Tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/ui/Accordion";
import { Tag } from "@/ui/Tag";
import { FinalCta } from "@/home/FinalCta";

export const metadata: Metadata = {
  title: "Admissions",
  description: `How to apply, entry requirements for ND and HND programmes, application guidelines, and frequently asked questions at ${site.name}.`,
};

const timelineSteps = [
  {
    num: 1,
    title: "Choose a programme",
    detail:
      "Review our directory of National Diploma and Higher National Diploma options in agriculture, environment, and community enterprise. Confirm that your academic background aligns with your selected curriculum.",
  },
  {
    num: 2,
    title: "Check entry requirements",
    detail:
      "Confirm you have at least five O-Level credit passes including English and Mathematics for ND admission, or an accredited ND certificate and verified industrial work experience for HND admission.",
  },
  {
    num: 3,
    title: "Submit online application",
    detail:
      "Create an applicant profile on our official online admissions portal. Complete your personal biodata, enter your examination results, and upload clear digital copies of required certificates.",
  },
  {
    num: 4,
    title: "Follow screening and registration instructions",
    detail:
      "Monitor your admission status on the portal. Once provisional admission is granted, download your clearance documents and follow departmental instructions to complete final physical verification and registration.",
  },
];

export default function AdmissionsPage() {
  const hasDates = site.admissions.dates.length > 0;
  const hasFees = site.admissions.fees.length > 0;

  return (
    <>
      {/* Header Band */}
      <section className="bg-white border-b border-mist pt-10 pb-12">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Admissions" }]} />

          <div className="space-y-3 max-w-3xl">
            <h1 className="font-display font-medium text-navy">Admissions</h1>
            <p className="text-slate text-lg sm:text-xl font-normal leading-relaxed">
              Find out how to apply, understand entry requirements, and prepare your application for
              ND and HND studies.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky In-page Anchor Nav (Desktop) */}
      <nav
        aria-label="In-page admissions navigation"
        className="sticky top-16 lg:top-20 z-30 bg-chalk/95 backdrop-blur-xs border-b border-mist py-3 hidden md:block"
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 flex items-center gap-8 text-sm">
          <a href="#how-to-apply" className="font-medium text-navy hover:text-forest">
            How to apply
          </a>
          <a href="#requirements" className="font-medium text-navy hover:text-forest">
            Entry requirements
          </a>
          {hasDates && (
            <a href="#dates" className="font-medium text-navy hover:text-forest">
              Important dates
            </a>
          )}
          {hasFees && (
            <a href="#fees" className="font-medium text-navy hover:text-forest">
              Fees & payment
            </a>
          )}
          <a href="#faqs" className="font-medium text-navy hover:text-forest">
            Frequently asked questions
          </a>
        </div>
      </nav>

      {/* 1. How to Apply */}
      <Section id="how-to-apply" background="white">
        <div className="space-y-10">
          <div className="space-y-2">
            <h2 className="font-display font-medium text-navy text-2xl sm:text-3xl">How to apply</h2>
            <p className="text-slate text-base sm:text-lg">
              Follow these four steps to submit your application for the upcoming session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((step) => (
              <div
                key={step.num}
                className="p-6 bg-chalk border border-mist flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-display font-semibold text-sm">
                    {step.num}
                  </div>
                  <h3 className="font-display font-medium text-xl text-navy">{step.title}</h3>
                  <p className="text-sm text-slate leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button href={site.applyUrl} external variant="primary">
              Apply now
            </Button>
            <Button href="/programmes" variant="secondary">
              Browse all programmes
            </Button>
          </div>
        </div>
      </Section>

      {/* 2. Entry Requirements */}
      <Section id="requirements" background="chalk">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-display font-medium text-navy text-2xl sm:text-3xl">
              Entry requirements
            </h2>
            <p className="text-slate text-base sm:text-lg">
              Minimum general criteria for admission into National Diploma and Higher National Diploma programmes.
            </p>
          </div>

          <Tabs defaultValue="nd" className="w-full">
            <TabsList aria-label="Select qualification level to view requirements">
              <TabsTrigger value="nd">National Diploma (ND)</TabsTrigger>
              <TabsTrigger value="hnd">Higher National Diploma (HND)</TabsTrigger>
            </TabsList>

            <TabsContent value="nd" className="space-y-4 max-w-3xl">
              <div className="p-6 bg-white border border-mist space-y-4">
                <div className="flex items-center gap-3">
                  <Tag variant="ND">ND</Tag>
                  <h3 className="font-display font-medium text-xl text-navy">
                    Requirements for ND Candidates
                  </h3>
                </div>
                <ul className="space-y-3 text-ink text-base">
                  {site.admissions.requirements.ND.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-forest font-bold text-lg leading-none">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate pt-3 border-t border-mist">
                  Candidates are advised to confirm specific O-Level subject prerequisites for individual departments before final portal submission.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="hnd" className="space-y-4 max-w-3xl">
              <div className="p-6 bg-white border border-mist space-y-4">
                <div className="flex items-center gap-3">
                  <Tag variant="HND">HND</Tag>
                  <h3 className="font-display font-medium text-xl text-navy">
                    Requirements for HND Candidates
                  </h3>
                </div>
                <ul className="space-y-3 text-ink text-base">
                  {site.admissions.requirements.HND.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-navy font-bold text-lg leading-none">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate pt-3 border-t border-mist">
                  Applicants with a Pass grade at ND may require additional documented industrial work experience as stipulated by regulatory guidelines.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Section>

      {/* 3. Important Dates (Rendered ONLY if data exists) */}
      {hasDates && (
        <Section id="dates" background="white">
          <div className="space-y-6">
            <h2 className="font-display font-medium text-navy text-2xl sm:text-3xl">
              Important dates
            </h2>
            <div className="divide-y divide-mist border-y border-mist max-w-3xl">
              {site.admissions.dates.map((d, i) => (
                <div key={i} className="py-4 flex items-center justify-between">
                  <span className="font-medium text-ink">{d.label}</span>
                  <span className="text-sm text-slate">{d.date}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* 4. Fees and Payment (Rendered ONLY if data exists) */}
      {hasFees && (
        <Section id="fees" background="white">
          <div className="space-y-6">
            <h2 className="font-display font-medium text-navy text-2xl sm:text-3xl">
              Fees and payment
            </h2>
            <div className="divide-y divide-mist border-y border-mist max-w-3xl">
              {site.admissions.fees.map((f, i) => (
                <div key={i} className="py-4 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-ink block">{f.item}</span>
                    {f.note && <span className="text-xs text-slate">{f.note}</span>}
                  </div>
                  <span className="font-display font-medium text-navy text-lg">{f.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* 5. FAQs */}
      <Section id="faqs" background="white">
        <div className="space-y-8 max-w-3xl">
          <div className="space-y-2">
            <h2 className="font-display font-medium text-navy text-2xl sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="text-slate text-base">
              Answers to common enquiries regarding admissions, qualifications, and the application process.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
