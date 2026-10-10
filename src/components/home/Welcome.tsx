import { site } from "@/content/site";
import { Section } from "@/ui/Section";
import { Photo } from "@/ui/Photo";
import { Button } from "@/ui/Button";

export function Welcome() {
  return (
    <Section background="chalk" className="pt-16 sm:pt-20 lg:pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Column 1: Campus Photo (5 cols) */}
        <div className="lg:col-span-5">
          <Photo
            mediaKey="welcome.campus"
            caption={`${site.name} campus grounds`}
            aspectRatio="4/5"
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="w-full max-w-md mx-auto lg:max-w-none shadow-none"
          />
        </div>

        {/* Column 2: Practical Skills Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-navy font-display font-medium leading-tight">
            A polytechnic built around practical skills
          </h2>

          <div className="space-y-4 text-ink text-base sm:text-lg leading-relaxed max-w-[68ch]">
            <p>
              {site.name} delivers technical and vocational education structured
              around applied knowledge. Our curricula across technology, agriculture, environmental science, and
              management focus on hands-on competence, linking classroom theory directly to
              practical field and laboratory experience.
            </p>
            <p>
              Whether preparing for a National Diploma or advancing through Higher National Diploma
              training, learners gain skills designed to meet real production, environmental, and
              organisational demands across Nigeria.
            </p>
          </div>

          <div className="pt-2">
            <Button href="/about" variant="ghost">
              Read more about the polytechnic
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
