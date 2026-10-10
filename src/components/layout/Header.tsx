"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, ExternalLink, Mail, Phone } from "lucide-react";
import { site } from "@/content/site";
import { School, Programme } from "@/content/programmes";
import { Logo } from "@/brand/Logo";
import { MegaMenu } from "@/layout/MegaMenu";
import { MobileNav } from "@/layout/MobileNav";
import { SiteSearch } from "@/layout/SiteSearch";
import { Button } from "@/ui/Button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  initialSchools?: School[];
  initialProgrammes?: Programme[];
}

export function Header({ initialSchools, initialProgrammes }: HeaderProps = {}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header className="w-full z-40 sticky top-0 bg-white">
        {/* Desktop Utility Strip (Navy, 36px) */}
        <div className="hidden lg:block bg-navy text-white text-[13px] h-9 border-b border-navy/40 on-dark">
          <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 h-full flex items-center justify-between">
            <a
              href={site.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white underline underline-offset-4 inline-flex items-center gap-1.5 focus-visible:outline-none"
            >
              <span>Student portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/70" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>

            <div className="flex items-center gap-6 text-white/80">
              <a
                href={`mailto:${site.contact.email}`}
                className="hover:text-white inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none"
              >
                <Mail className="w-3.5 h-3.5 text-white/60" aria-hidden="true" />
                <span>{site.contact.email}</span>
              </a>
              <a
                href={`tel:${site.contact.phone}`}
                className="hover:text-white inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none"
              >
                <Phone className="w-3.5 h-3.5 text-white/60" aria-hidden="true" />
                <span>{site.contact.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar (Condenses from 80px to 64px on scroll) */}
        <div
          className={cn(
            "w-full bg-white border-b border-mist transition-[height] duration-200 ease-in-out flex items-center relative",
            scrolled ? "h-16" : "h-16 lg:h-20"
          )}
        >
          <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full flex items-center justify-between gap-4 h-full">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 h-full static">
              <MegaMenu schools={initialSchools} programmes={initialProgrammes} />
            </div>

            {/* Actions: Search & Apply */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search programmes, pages and news"
                className="w-11 h-11 flex items-center justify-center text-slate hover:text-navy rounded focus-visible:outline-none transition-colors"
              >
                <Search className="w-5 h-5" strokeWidth={1.75} />
              </button>

              <div className="hidden sm:block">
                <Button href={site.applyUrl} external variant="primary">
                  Apply now
                </Button>
              </div>

              {/* Mobile Hamburger Sheet */}
              <div className="lg:hidden">
                <MobileNav />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Global Site Search Modal */}
      <SiteSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
