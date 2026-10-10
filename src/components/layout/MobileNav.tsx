"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { site } from "@/content/site";
import { programmes } from "@/content/programmes";
import { mainNav } from "@/content/nav";
import { Logo } from "@/brand/Logo";
import { Button } from "@/ui/Button";
import { Tag } from "@/ui/Tag";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (label: string) => {
    setOpenSection((prev) => (prev === label ? null : label));
  };

  const isLinkVisible = (requiresData?: string) => {
    if (!requiresData) return true;
    if (requiresData === "rector") return Boolean(site.rector);
    if (requiresData === "leadership") return site.leadership.length > 0;
    if (requiresData === "accreditation") return site.accreditation.length > 0;
    if (requiresData === "fees") return site.admissions.fees.length > 0;
    if (requiresData === "dates") return site.admissions.dates.length > 0;
    return true;
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="w-11 h-11 flex items-center justify-center text-navy hover:text-ink focus-visible:outline-none"
        >
          <Menu className="w-6 h-6" strokeWidth={1.75} />
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-ink/40 z-50 backdrop-blur-xs transition-opacity duration-200" />
        <DialogPrimitive.Content
          className="fixed top-0 right-0 bottom-0 w-full max-w-[min(85vw,360px)] bg-white z-50 shadow-menu flex flex-col justify-between overflow-hidden focus:outline-none transition-transform duration-220 ease-out"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">Navigation Menu</DialogPrimitive.Title>

          {/* Sheet Header */}
          <div className="flex items-center justify-between p-4 border-b border-mist">
            <Logo className="shrink-0 max-w-[240px]" />
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center text-navy hover:text-crimson focus-visible:outline-none"
              >
                <X className="w-6 h-6" strokeWidth={1.75} />
              </button>
            </DialogPrimitive.Close>
          </div>

          {/* Navigation Items (Scrollable Body) */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <nav className="space-y-2">
              {mainNav.map((item) => {
                if (item.type === "link") {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 px-2 text-lg font-medium text-ink hover:text-navy hover:bg-chalk border-b border-mist/50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  );
                }

                if (item.type === "megamenu") {
                  const isOpen = openSection === item.label;
                  return (
                    <div key={item.label} className="border-b border-mist/50">
                      <button
                        type="button"
                        onClick={() => toggleSection(item.label)}
                        className="w-full flex items-center justify-between py-3 px-2 text-lg font-medium text-ink hover:text-navy text-left"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="pb-4 pl-3 space-y-2 bg-chalk/50 p-2 border-l-2 border-navy">
                          <Link
                            href="/programmes"
                            onClick={() => setOpen(false)}
                            className="block py-1 text-sm font-semibold text-navy hover:underline"
                          >
                            All programmes →
                          </Link>
                          {programmes.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/programmes/${p.slug}`}
                              onClick={() => setOpen(false)}
                              className="flex items-baseline justify-between py-1 text-sm text-ink hover:text-navy"
                            >
                              <span className="truncate pr-2">{p.title}</span>
                              <Tag variant={p.level}>{p.level}</Tag>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.type === "dropdown" && item.items) {
                  const isOpen = openSection === item.label;
                  const visibleItems = item.items.filter((sub) => isLinkVisible(sub.requiresData));

                  return (
                    <div key={item.label} className="border-b border-mist/50">
                      <button
                        type="button"
                        onClick={() => toggleSection(item.label)}
                        className="w-full flex items-center justify-between py-3 px-2 text-lg font-medium text-ink hover:text-navy text-left"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="pb-3 pl-3 space-y-2 bg-chalk/50 p-2 border-l-2 border-navy">
                          {visibleItems.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              className="block py-1.5 text-sm text-ink hover:text-navy"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return null;
              })}
            </nav>
          </div>

          {/* Sticky Bottom Area */}
          <div className="p-4 border-t border-mist bg-chalk space-y-3">
            <Button
              href={site.applyUrl}
              external
              variant="primary"
              className="w-full justify-center"
            >
              Apply now
            </Button>
            <div className="text-center">
              <a
                href={site.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate hover:text-navy underline inline-flex items-center gap-1"
              >
                Student portal
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
