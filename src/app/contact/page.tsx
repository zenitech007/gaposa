import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { Section } from "@/ui/Section";
import { ContactForm } from "@/forms/ContactForm";
import { FinalCta } from "@/home/FinalCta";

export const metadata: Metadata = {
  title: "Contact Admissions",
  description: `Get in touch with the admissions office at ${site.name}. Send an enquiry, check our address, or obtain directions.`,
};

export default function ContactPage() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.name}, ${site.contact.address}`
  )}`;

  return (
    <>
      {/* Header Band */}
      <section className="bg-white border-b border-mist pt-10 pb-12">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Contact admissions" }]} />

          <div className="space-y-3 max-w-3xl">
            <h1 className="font-display font-medium text-navy">Contact admissions</h1>
            <p className="text-slate text-lg sm:text-xl font-normal leading-relaxed">
              Have questions regarding ND or HND programmes, entry qualifications, or the
              application process? Send our admissions desk an enquiry below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-8 text-slate">Loading enquiry form...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Right Column: Contact Details & Useful Links (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 bg-chalk border border-mist space-y-6">
              <h2 className="font-display font-medium text-2xl text-navy">
                Admissions Office
              </h2>

              <div className="space-y-4 text-sm text-ink">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-navy">Postal Address</span>
                    <span className="text-slate leading-relaxed">{site.contact.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-navy">Email Address</span>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-slate hover:text-navy hover:underline"
                    >
                      {site.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-navy">Telephone</span>
                    <a
                      href={`tel:${site.contact.phone}`}
                      className="text-slate hover:text-navy hover:underline"
                    >
                      {site.contact.phone}
                    </a>
                  </div>
                </div>

                {site.contact.hours && (
                  <div>
                    <span className="font-semibold block text-navy">Operating Hours</span>
                    <span className="text-slate">{site.contact.hours}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-mist rounded-[6px] text-sm font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
                >
                  <span>Get directions on Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Useful Links */}
            <div className="p-6 bg-chalk border border-mist space-y-4">
              <h3 className="font-display font-medium text-xl text-navy">Useful resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={site.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy hover:text-forest hover:underline underline-offset-2 flex items-center justify-between"
                  >
                    <span>Apply online via admissions portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate" />
                  </a>
                </li>
                <li>
                  <Link
                    href="/admissions#requirements"
                    className="text-navy hover:text-forest hover:underline underline-offset-2 block"
                  >
                    Check entry requirements (ND & HND)
                  </Link>
                </li>
                <li>
                  <a
                    href={site.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy hover:text-forest hover:underline underline-offset-2 flex items-center justify-between"
                  >
                    <span>Student portal login</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
