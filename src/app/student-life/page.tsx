import type { Metadata } from "next";
import { facilityFeatures } from "@/content/facilities";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { Section } from "@/ui/Section";
import { site } from "@/content/site";
import { Photo } from "@/ui/Photo";
import { Gallery } from "@/home/Gallery";
import { FinalCta } from "@/home/FinalCta";

export const metadata: Metadata = {
  title: "Student Life",
  description: `Discover practical field training, digital skills development, and community engagement at ${site.name}.`,
};

export default function StudentLifePage() {
  return (
    <>
      {/* Header Band */}
      <section className="bg-white border-b border-mist pt-10 pb-12">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Student life" }]} />

          <div className="space-y-3 max-w-3xl">
            <h1 className="font-display font-medium text-navy">Student life</h1>
            <p className="text-slate text-lg sm:text-xl font-normal leading-relaxed">
              Hands-on training, interactive workshops, and real-world community immersion.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Sections (Alternating Rows from facilities.ts) */}
      <Section background="white">
        <div className="space-y-20 lg:space-y-28">
          {facilityFeatures.map((feature, idx) => {
            const isImageLeft = idx % 2 === 0;

            return (
              <div
                key={feature.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Photo Column */}
                <div
                  className={`lg:col-span-6 ${
                    isImageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Photo
                    mediaKey={feature.image}
                    caption={feature.title}
                    aspectRatio="3/2"
                    className="w-full shadow-none"
                  />
                </div>

                {/* Text Column */}
                <div
                  className={`lg:col-span-6 space-y-4 ${
                    isImageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <span className="text-xs uppercase font-semibold text-forest tracking-wider">
                    Practical Experience
                  </span>

                  <h2 className="text-navy font-display font-medium text-2xl sm:text-3xl leading-snug">
                    {feature.title}
                  </h2>

                  <div className="space-y-4 text-ink text-base sm:text-lg leading-relaxed max-w-[68ch]">
                    {feature.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Campus Gallery */}
      <Gallery />

      <FinalCta />
    </>
  );
}
