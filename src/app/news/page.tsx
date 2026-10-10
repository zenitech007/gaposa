import { Suspense } from "react";
import type { Metadata } from "next";
import { getNews } from "@/sanity/lib/fetch";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { site } from "@/content/site";
import { FinalCta } from "@/home/FinalCta";
import { NewsContent } from "./NewsContent";

export const metadata: Metadata = {
  title: "News and Events",
  description: `Official notices, academic schedules, events, and community updates from ${site.name}.`,
};

export default async function NewsPage() {
  // Pull live news notices from Sanity (with graceful fallback)
  const newsItems = await getNews();

  return (
    <>
      {/* Header Band */}
      <section className="bg-white border-b border-mist pt-10 pb-12">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: "News and events" }]} />

          <div className="space-y-3 max-w-3xl">
            <h1 className="font-display font-medium text-navy">News and events</h1>
            <p className="text-slate text-lg sm:text-xl font-normal leading-relaxed">
              Official bulletins, academic notices, and polytechnic announcements.
            </p>
          </div>
        </div>
      </section>

      {/* Filterable News Content */}
      <Suspense fallback={<div className="p-12 text-center text-slate">Loading news updates...</div>}>
        <NewsContent initialItems={newsItems} />
      </Suspense>

      <FinalCta />
    </>
  );
}
