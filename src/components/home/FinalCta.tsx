import { site } from "@/content/site";
import { Button } from "@/ui/Button";

interface FinalCtaProps {
  title?: string;
  description?: string;
}

export function FinalCta({
  title = "Start your application today",
  description = `Join our next cohort of ND and HND students at ${site.name}.`,
}: FinalCtaProps) {
  return (
    <section className="relative w-full bg-navy text-white py-16 sm:py-20 lg:py-24 overflow-hidden on-dark border-t border-navy/40">
      {/* Decorative large ring motif drawn in white at 15% opacity, cropped by section edge */}
      <svg
        className="absolute -right-20 -top-20 lg:-right-10 lg:-top-10 w-[420px] h-[420px] pointer-events-none opacity-15 text-white"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="36" cy="44" r="24" stroke="currentColor" strokeWidth="4" strokeDasharray="5 3" />
        <circle cx="62" cy="32" r="20" stroke="currentColor" strokeWidth="4" strokeDasharray="5 3" />
        <circle cx="50" cy="62" r="22" stroke="currentColor" strokeWidth="4" strokeDasharray="5 3" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-2xl space-y-6 text-left">
          <h2 className="font-display font-medium text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            {title}
          </h2>

          <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-[60ch]">
            {description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button href={site.applyUrl} external variant="primary">
              Apply now
            </Button>
            <Button href="/contact" variant="white-outline">
              Contact admissions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
