import { facilityFeatures } from "@/content/facilities";
import { Section } from "@/ui/Section";
import { Photo } from "@/ui/Photo";
import { Button } from "@/ui/Button";

export function LearningByDoing() {
  return (
    <Section background="white">
      <div className="space-y-16 lg:space-y-24">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-navy font-display font-medium">Learning by doing</h2>
          <p className="text-slate text-base sm:text-lg">
            Practical skills, technological competencies, and community engagement.
          </p>
        </div>

        {/* 3 Alternating Rows */}
        <div className="space-y-16 lg:space-y-20">
          {facilityFeatures.map((feature, idx) => {
            const isImageLeft = idx % 2 === 0;

            return (
              <div
                key={feature.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
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
                    className="w-full"
                  />
                </div>

                {/* Text Column */}
                <div
                  className={`lg:col-span-6 space-y-4 ${
                    isImageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <h3 className="text-navy font-display font-medium text-xl sm:text-2xl leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-slate text-base leading-relaxed max-w-[68ch]">
                    {feature.paragraphs[0]}
                  </p>

                  <div className="pt-2">
                    <Button href="/student-life" variant="ghost">
                      Explore student life
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
