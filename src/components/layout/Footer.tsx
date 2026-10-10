"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { site } from "@/content/site";
import { programmes } from "@/content/programmes";
import { Logo } from "@/brand/Logo";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const ndProgrammes = programmes.filter((p) => p.level === "ND").slice(0, 4);
  const hndProgrammes = programmes.filter((p) => p.level === "HND").slice(0, 4);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.name}, ${site.contact.address}`
  )}`;

  return (
    <footer className="relative bg-navy text-white/85 overflow-hidden on-dark border-t border-navy/60">
      {/* Decorative low-contrast ring motif on the right side */}
      <svg
        className="absolute -right-24 -bottom-24 w-96 h-96 pointer-events-none opacity-6 text-white"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="36" cy="44" r="24" stroke="currentColor" strokeWidth="4" strokeDasharray="5 3" />
        <circle cx="62" cy="32" r="20" stroke="currentColor" strokeWidth="4" strokeDasharray="5 3" />
        <circle cx="50" cy="62" r="22" stroke="currentColor" strokeWidth="4" strokeDasharray="5 3" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/15">
          {/* Column 1: Brand & Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="light" />
            <p className="text-sm text-white/75 leading-relaxed max-w-[36ch]">
              Practical vocational education, agricultural technology, and community development in
              Ogun State, Nigeria.
            </p>
            <div className="pt-2 text-sm text-white/70 space-y-1">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white/50 shrink-0 mt-0.5" />
                <span>{site.contact.address}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Programmes (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-medium text-lg text-white">Programmes</h4>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs uppercase font-semibold text-white/50 block mb-1.5 tracking-wider">
                  National Diploma (ND)
                </span>
                <ul className="space-y-1.5">
                  {ndProgrammes.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/programmes/${p.slug}`}
                        className="text-white/80 hover:text-white hover:underline underline-offset-2 transition-colors"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs uppercase font-semibold text-white/50 block mb-1.5 tracking-wider">
                  Higher National Diploma (HND)
                </span>
                <ul className="space-y-1.5">
                  {hndProgrammes.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/programmes/${p.slug}`}
                        className="text-white/80 hover:text-white hover:underline underline-offset-2 transition-colors"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-1">
                <Link
                  href="/programmes"
                  className="font-medium text-white hover:underline underline-offset-4 inline-flex items-center gap-1"
                >
                  All programmes →
                </Link>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-medium text-lg text-white">Quick links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white hover:underline underline-offset-2"
                >
                  About the polytechnic
                </Link>
              </li>
              <li>
                <Link
                  href="/administration"
                  className="text-white/80 hover:text-white hover:underline underline-offset-2"
                >
                  Administration & leadership
                </Link>
              </li>
              <li>
                <a
                  href={site.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white hover:underline underline-offset-2 inline-flex items-center gap-1"
                >
                  Apply now
                  <ExternalLink className="w-3.5 h-3.5 text-white/50" />
                </a>
              </li>
              <li>
                <Link
                  href="/admissions#how-to-apply"
                  className="text-white/80 hover:text-white hover:underline underline-offset-2"
                >
                  How to apply
                </Link>
              </li>
              <li>
                <Link
                  href="/admissions#requirements"
                  className="text-white/80 hover:text-white hover:underline underline-offset-2"
                >
                  Entry requirements
                </Link>
              </li>
              <li>
                <a
                  href={site.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white hover:underline underline-offset-2 inline-flex items-center gap-1"
                >
                  Student portal
                  <ExternalLink className="w-3.5 h-3.5 text-white/50" />
                </a>
              </li>
              <li>
                <Link
                  href="/alumni"
                  className="text-white/80 hover:text-white hover:underline underline-offset-2"
                >
                  Alumni voices
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-white/80 hover:text-white hover:underline underline-offset-2"
                >
                  News and events
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white hover:underline underline-offset-2"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Directions (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-medium text-lg text-white">Contact & Visit</h4>
            <div className="space-y-2.5 text-sm">
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-2 text-white/80 hover:text-white hover:underline underline-offset-2 transition-colors"
              >
                <Mail className="w-4 h-4 text-white/60 shrink-0" />
                <span>{site.contact.email}</span>
              </a>

              <a
                href={`tel:${site.contact.phone}`}
                className="flex items-center gap-2 text-white/80 hover:text-white hover:underline underline-offset-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-white/60 shrink-0" />
                <span>{site.contact.phone}</span>
              </a>

              <div className="pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/30 rounded-[6px] text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <span>Get directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {currentYear} {site.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-white/70 hover:text-white hover:underline underline-offset-2"
            >
              Privacy policy
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              className="text-white/70 hover:text-white hover:underline underline-offset-2 inline-flex items-center gap-1 focus-visible:outline-none"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
