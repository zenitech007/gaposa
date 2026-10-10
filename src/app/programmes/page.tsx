import { Suspense } from "react";
import type { Metadata } from "next";
import { site } from "@/content/site";
import { getProgrammes, getSchools } from "@/sanity/lib/fetch";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { FinalCta } from "@/home/FinalCta";
import { ProgrammesContent } from "./ProgrammesContent";

export const metadata: Metadata = {
  title: "Programmes",
  description: `Explore National Diploma (ND) and Higher National Diploma (HND) courses in technology, agriculture, environmental science, and management at ${site.name}.`,
};

export default async function ProgrammesPage() {
  // Pull live programmes & schools from Sanity (with graceful fallback)
  const [programmes, schools] = await Promise.all([
    getProgrammes(),
    getSchools(),
  ]);

  return (
    <>
      {/* Header Band */}
      <section className="bg-white border-b border-mist pt-10 pb-12">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Programmes" }]} />

          <div className="space-y-2 max-w-3xl">
            <h1 className="font-display font-medium text-navy">Programmes</h1>
            <p className="text-slate text-lg sm:text-xl font-normal leading-relaxed">
              National Diploma (ND) and Higher National Diploma (HND) programmes.
            </p>
          </div>
        </div>
      </section>

      {/* Filterable Catalogue (Wrapped in Suspense for searchParams) */}
      <Suspense
        fallback={
          <div className="max-w-[1440px] mx-auto px-5 py-16 text-slate">
            Loading programmes catalogue...
          </div>
        }
      >
        <ProgrammesContent initialProgrammes={programmes} initialSchools={schools} />
      </Suspense>

      <FinalCta />
    </>
  );
}
