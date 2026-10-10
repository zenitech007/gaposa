"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, ExternalLink } from "lucide-react";
import { site } from "@/content/site";

export function AnnouncementBar() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(true); // default true to avoid SSR flash

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem("gaposa_announcement_dismissed");
      if (!isDismissed) {
        setDismissed(false);
      }
    } catch {
      setDismissed(false);
    }
  }, []);

  if (pathname?.startsWith("/admin") || !site.admissions.open || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    try {
      sessionStorage.setItem("gaposa_announcement_dismissed", "true");
    } catch {
      // sessionStorage unavailable
    }
    setDismissed(true);
  };

  const announcementText = site.admissions.session
    ? `Admissions are open for the ${site.admissions.session} session.`
    : "Admissions are now open.";

  return (
    <aside
      aria-label="Announcement"
      className="bg-forest text-white min-h-[40px] py-1.5 px-4 text-sm flex items-center justify-between border-b border-forest/20 on-dark"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{announcementText}</span>
          <a
            href={site.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 font-semibold hover:text-mist inline-flex items-center gap-1"
          >
            Apply now
            <ExternalLink className="w-3.5 h-3.5 inline shrink-0" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <button
          onClick={handleDismiss}
          type="button"
          aria-label="Dismiss announcement"
          className="w-11 h-11 -mr-2 inline-flex items-center justify-center text-white/80 hover:text-white rounded focus-visible:outline-none"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
