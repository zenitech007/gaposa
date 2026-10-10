import type { Metadata } from "next";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { Section } from "@/ui/Section";
import { FinalCta } from "@/home/FinalCta";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Information regarding data privacy and the collection of contact details at ${site.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      {/* Header Band */}
      <section className="bg-white border-b border-mist pt-10 pb-12">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "Privacy policy" }]} />

          <div className="space-y-3 max-w-3xl">
            <h1 className="font-display font-medium text-navy">Privacy policy</h1>
            <p className="text-slate text-lg sm:text-xl font-normal leading-relaxed">
              Draft guidelines regarding information handling on this website.
            </p>
          </div>
        </div>
      </section>

      {/* Main Policy Content */}
      <Section background="white">
        <article className="max-w-3xl space-y-8 text-ink text-base sm:text-lg leading-relaxed">
          <div className="p-4 bg-chalk border border-mist text-sm text-slate">
            <strong>Draft Notice:</strong> This privacy summary covers website contact and enquiry
            submissions. The official institutional privacy policy of {site.name} will be
            published upon confirmation by the polytechnic administration.
          </div>

          <section className="space-y-3">
            <h2 className="font-display font-medium text-2xl text-navy">
              1. Information We Collect
            </h2>
            <p>
              When you submit an enquiry through our online contact form, we collect the details you
              voluntarily provide: your full name, email address, phone number (optional), the subject
              of your enquiry, and your written message.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-medium text-2xl text-navy">
              2. How Your Information Is Used
            </h2>
            <p>
              Information submitted via the enquiry form is used solely by the Admissions Office and
              relevant academic administrative staff to respond to your questions regarding
              programmes, admission eligibility, or polytechnic procedures.
            </p>
            <p>
              We do not sell, rent, or distribute contact submission details to external commercial
              third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-medium text-2xl text-navy">
              3. Online Admissions and Student Portals
            </h2>
            <p>
              Formal applications and fee transactions are conducted on dedicated secure student and
              admissions portals. Those portals are governed by their respective security and data
              protection terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-medium text-2xl text-navy">4. Contact Enquiries</h2>
            <p>
              If you have any questions about this draft privacy statement, please contact the
              admissions desk at{" "}
              <a href={`mailto:${site.contact.email}`} className="text-navy underline">
                {site.contact.email}
              </a>
              .
            </p>
          </section>
        </article>
      </Section>

      <FinalCta />
    </>
  );
}
