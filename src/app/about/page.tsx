import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { defaultSchools } from "@/content/programmes";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { Section } from "@/ui/Section";
import { Photo } from "@/ui/Photo";
import { FinalCta } from "@/home/FinalCta";

export const metadata: Metadata = {
  title: "About the Polytechnic",
  description: `Learn about ${site.name}: our vocational focus, academic faculties, and commitment to practical education in Ogun State.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Header Band */}
      <section className="bg-white border-b border-mist pt-10 pb-12">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "About" }]} />

          <div className="space-y-3 max-w-3xl">
            <h1 className="font-display font-medium text-navy">About the polytechnic</h1>
            <p className="text-slate text-lg sm:text-xl font-normal leading-relaxed">
              A vocational higher institution focused on applied technology, agricultural production,
              and community advancement.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Overview */}
      <Section id="overview" background="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-medium text-navy text-2xl sm:text-3xl">
              Practical learning rooted in national priorities
            </h2>

            <div className="space-y-4 text-ink text-base sm:text-lg leading-relaxed max-w-[68ch]">
              <p>
                {site.name} was established to provide quality technical, vocational, and entrepreneurship education
                for students seeking applied knowledge.
              </p>
              <p>
                Our institution prioritises programmes directly relevant to the economic vitality of
                Ogun State and Nigeria as a whole: commercial agricultural technologies, environmental
                resource management, and cooperative economic structures. Training combines rigorous
                classroom fundamentals with extensive field, laboratory, and community practicals.
              </p>
              <p>
                Graduates emerge equipped with actionable capabilities—ready to operate modern farm
                technologies, coordinate community initiatives, maintain environmental standards, or
                establish viable commercial enterprises.
              </p>
            </div>
          </div>

          {/* Photo (5 cols) */}
          <div className="lg:col-span-5">
            <Photo
              mediaKey="about.campus"
              caption="Campus administration and learning facilities at Saapade"
              aspectRatio="3/2"
              className="w-full"
            />
          </div>
        </div>
      </Section>

      {/* 2. Message from the Rector (Rendered ONLY if site.rector exists) */}
      {site.rector && (
        <Section id="rector" background="chalk">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <Photo
                mediaKey="about.rector"
                caption={site.rector.name}
                aspectRatio="4/5"
                className="w-full max-w-xs mx-auto lg:max-w-none"
              />
            </div>
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-forest">
                  Welcome Address
                </span>
                <h2 className="font-display font-medium text-navy text-2xl sm:text-3xl">
                  Message from the Rector
                </h2>
                <p className="text-sm text-slate">
                  {site.rector.name} — {site.rector.title}
                </p>
              </div>

              <div className="space-y-4 font-display italic text-lg sm:text-xl text-ink leading-relaxed max-w-[68ch]">
                {site.rector.message.map((para, i) => (
                  <p key={i}>&ldquo;{para}&rdquo;</p>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* 3. Mission & Vision (Rendered ONLY if supplied) */}
      {(site.mission || site.vision) && (
        <Section background="chalk">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {site.mission && (
              <div className="p-8 bg-white border border-mist space-y-3">
                <h3 className="font-display font-medium text-xl text-navy">Our Mission</h3>
                <p className="text-slate text-base leading-relaxed">{site.mission}</p>
              </div>
            )}
            {site.vision && (
              <div className="p-8 bg-white border border-mist space-y-3">
                <h3 className="font-display font-medium text-xl text-navy">Our Vision</h3>
                <p className="text-slate text-base leading-relaxed">{site.vision}</p>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* 4. Leadership (Rendered ONLY if site.leadership.length > 0) */}
      {site.leadership.length > 0 && (
        <Section id="leadership" background="white">
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="font-display font-medium text-navy text-2xl sm:text-3xl">
                Principal Officers & Leadership
              </h2>
              <p className="text-slate text-base">Key administrative officers of the institution.</p>
            </div>

            <div className="divide-y divide-mist border-y border-mist">
              {site.leadership.map((officer, i) => (
                <div key={i} className="py-4 flex items-center justify-between">
                  <span className="font-medium text-navy text-lg">{officer.name}</span>
                  <span className="text-sm text-slate">{officer.role}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* 5. Accreditation & Affiliations (Rendered ONLY if supplied) */}
      {site.accreditation.length > 0 && (
        <Section id="accreditation" background="chalk">
          <div className="space-y-6">
            <h2 className="font-display font-medium text-navy text-2xl sm:text-3xl">
              Accreditation and Recognitions
            </h2>
            <div className="divide-y divide-mist border-y border-mist max-w-2xl bg-white p-6 border border-mist">
              {site.accreditation.map((item, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <span className="font-medium text-navy">{item.body}</span>
                  {item.note && <span className="text-xs text-slate">{item.note}</span>}
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* 6. What We Teach (Six Academic Schools) */}
      <Section background="white">
        <div className="space-y-10">
          <div className="space-y-2 max-w-3xl">
            <h2 className="font-display font-medium text-navy text-2xl sm:text-3xl">
              Our academic schools
            </h2>
            <p className="text-slate text-base sm:text-lg">
              Our academic programmes are organised across six specialised schools designed to foster real-world technical competence and career readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultSchools.map((school) => (
              <div
                key={school.slug || school.title}
                className="p-6 bg-chalk border border-mist flex flex-col justify-between space-y-6"
              >
                <div className="space-y-2.5">
                  <h3 className="font-display font-medium text-xl text-navy">
                    {school.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">
                    {school.description}
                  </p>
                </div>

                <Link
                  href={`/programmes?school=${encodeURIComponent(school.slug)}`}
                  className="text-sm font-semibold text-navy hover:text-forest inline-flex items-center gap-1.5 underline underline-offset-4"
                >
                  <span>Explore programmes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
