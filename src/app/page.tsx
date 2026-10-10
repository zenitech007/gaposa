import { Hero } from "@/home/Hero";
import { QuickBar } from "@/home/QuickBar";
import { Welcome } from "@/home/Welcome";
import { ProgrammeFinder } from "@/home/ProgrammeFinder";
import { AdmissionsSteps } from "@/home/AdmissionsSteps";
import { LearningByDoing } from "@/home/LearningByDoing";
import { AlumniSuccess } from "@/home/AlumniSuccess";
import { FactsStrip } from "@/home/FactsStrip";
import { NewsPreview } from "@/home/NewsPreview";
import { Gallery } from "@/home/Gallery";
import { FinalCta } from "@/home/FinalCta";
import { getProgrammes, getSchools } from "@/sanity/lib/fetch";

export default async function HomePage() {
  const [programmes, schools] = await Promise.all([
    getProgrammes(),
    getSchools(),
  ]);

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Quick bar */}
      <QuickBar />

      {/* 3. Welcome */}
      <Welcome />

      {/* 4. Programme finder */}
      <ProgrammeFinder initialProgrammes={programmes} initialSchools={schools} />

      {/* 5. Admissions steps */}
      <AdmissionsSteps />

      {/* 6. Learning by doing */}
      <LearningByDoing />

      {/* 7. Alumni success & testimonials */}
      <AlumniSuccess />

      {/* 8. Facts strip */}
      <FactsStrip />

      {/* 8. News and events */}
      <NewsPreview />

      {/* 9. Gallery */}
      <Gallery />

      {/* 10. Final CTA band */}
      <FinalCta />
    </>
  );
}
