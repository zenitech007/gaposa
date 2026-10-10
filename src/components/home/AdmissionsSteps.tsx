import { site } from "@/content/site";
import { Section } from "@/ui/Section";
import { Button } from "@/ui/Button";

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Choose a programme",
    description: "Browse ND and HND options to find the curriculum aligned with your goals.",
  },
  {
    number: 2,
    title: "Check entry requirements",
    description: "Confirm O-Level credits, UTME eligibility, or required post-ND industrial training.",
  },
  {
    number: 3,
    title: "Apply online",
    description: "Create an applicant account through our official admissions portal and submit your credentials.",
  },
  {
    number: 4,
    title: "Complete registration",
    description: "Follow the instructions you receive to verify documents and finalise enrolment.",
  },
];

export function AdmissionsSteps() {
  return (
    <Section background="chalk">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-navy font-display font-medium">How to apply</h2>
          <p className="text-slate text-base sm:text-lg">
            A straightforward application process for prospective ND and HND candidates.
          </p>
        </div>

        {/* Timeline Steps (Horizontal on desktop, vertical on mobile) */}
        <div className="relative">
          {/* Desktop Horizontal Line (2px leaf green connecting line) */}
          <div
            className="hidden lg:block absolute top-4 left-6 right-6 h-[2px] bg-leaf -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div key={step.number} className="relative flex lg:flex-col items-start gap-4 lg:gap-4">
                {/* Mobile vertical connecting line */}
                {idx < steps.length - 1 && (
                  <div
                    className="lg:hidden absolute top-8 left-4 bottom-0 w-[2px] bg-leaf -z-10"
                    aria-hidden="true"
                  />
                )}

                {/* Step Circle Marker */}
                <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-display font-semibold text-sm shrink-0 ring-4 ring-chalk shadow-xs">
                  {step.number}
                </div>

                {/* Step Content */}
                <div className="space-y-1 pt-0.5 lg:pt-2">
                  <h3 className="font-display font-medium text-lg text-navy leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
          <Button href={site.applyUrl} external variant="primary">
            Apply now
          </Button>
          <Button href="/admissions" variant="ghost">
            See full admission details
          </Button>
        </div>
      </div>
    </Section>
  );
}
