"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { NewsItem } from "@/content/news";
import { Section } from "@/ui/Section";
import { Tabs, TabsList, TabsTrigger } from "@/ui/Tabs";
import { Photo } from "@/ui/Photo";
import { Tag, SampleBadge } from "@/ui/Tag";
import { formatDate } from "@/lib/utils";
import { getSanityImageUrl } from "@/sanity/lib/image";

interface NewsContentProps {
  initialItems: NewsItem[];
}

export function NewsContent({ initialItems }: NewsContentProps) {
  const searchParams = useSearchParams();
  const [filterType, setFilterType] = useState<string>("all");

  const page = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  const filtered = useMemo(() => {
    if (filterType === "all") return initialItems;
    return initialItems.filter((item) => item.type === filterType);
  }, [initialItems, filterType]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayedItems = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const [featured, ...otherItems] = displayedItems;

  const featuredImageUrl = featured ? getSanityImageUrl(featured.mainImage) : null;
  const hasFeaturedImage = Boolean(featuredImageUrl || featured?.image);

  return (
    <Section background="white">
      <div className="space-y-10">
        {/* Type Filter Tabs */}
        <Tabs value={filterType} onValueChange={setFilterType} className="w-full">
          <TabsList aria-label="Filter news and announcements by type">
            <TabsTrigger value="all">All updates</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
          </TabsList>
        </Tabs>

        {displayedItems.length === 0 ? (
          <div className="py-16 text-center text-slate border-y border-mist">
            No updates found in this category.
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Item */}
            {featured && (
              <div
                className={`grid grid-cols-1 ${
                  hasFeaturedImage ? "lg:grid-cols-12 gap-8 lg:gap-12" : "gap-4"
                } items-center pb-12 border-b border-mist`}
              >
                {hasFeaturedImage && (
                  <div className="lg:col-span-7">
                    <Link href={`/news/${featured.slug}`} className="block overflow-hidden group">
                      {featuredImageUrl ? (
                        <div className="relative aspect-[3/2] w-full overflow-hidden bg-mist/40 border border-mist">
                          <Image
                            src={featuredImageUrl}
                            alt={featured.mainImage?.alt || featured.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                            priority
                          />
                        </div>
                      ) : (
                        <Photo
                          mediaKey={featured.image || "news.default"}
                          caption={featured.title}
                          aspectRatio="3/2"
                          className="w-full transition-transform duration-300 group-hover:scale-[1.01]"
                        />
                      )}
                    </Link>
                  </div>
                )}

                <div className={hasFeaturedImage ? "lg:col-span-5 space-y-3" : "max-w-3xl space-y-3"}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate">{formatDate(featured.date)}</span>
                    <Tag variant={featured.type === "event" ? "event" : "news"}>
                      {featured.type === "event" ? "Event" : "News"}
                    </Tag>
                    {featured.sample && <SampleBadge />}
                  </div>

                  <Link href={`/news/${featured.slug}`} className="block group">
                    <h2 className="font-display font-medium text-2xl sm:text-3xl text-navy group-hover:underline underline-offset-4 decoration-1 leading-snug">
                      {featured.title}
                    </h2>
                  </Link>

                  <p className="text-slate text-base leading-relaxed">{featured.excerpt}</p>
                </div>
              </div>
            )}

            {/* Ruled Rows */}
            {otherItems.length > 0 && (
              <div className="divide-y divide-mist border-b border-mist">
                {otherItems.map((item) => {
                  const itemImageUrl = getSanityImageUrl(item.mainImage);

                  return (
                    <div
                      key={item.slug}
                      className="py-6 first:pt-0 group flex flex-col sm:flex-row sm:items-start justify-between gap-6"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs text-slate">{formatDate(item.date)}</span>
                          <Tag variant={item.type === "event" ? "event" : "news"}>
                            {item.type === "event" ? "Event" : "News"}
                          </Tag>
                          {item.sample && <SampleBadge />}
                        </div>

                        <Link href={`/news/${item.slug}`} className="block">
                          <h3 className="font-display font-medium text-xl sm:text-2xl text-navy group-hover:underline underline-offset-4 decoration-1 leading-snug">
                            {item.title}
                          </h3>
                        </Link>

                        <p className="text-sm text-slate mt-1.5 max-w-[70ch] leading-relaxed">
                          {item.excerpt}
                        </p>
                      </div>

                      {itemImageUrl && (
                        <Link
                          href={`/news/${item.slug}`}
                          className="relative shrink-0 w-full sm:w-44 aspect-[3/2] overflow-hidden bg-mist/40 border border-mist group-hover:opacity-95"
                        >
                          <Image
                            src={itemImageUrl}
                            alt={item.mainImage?.alt || item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 176px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 text-sm">
                {page > 1 ? (
                  <Link
                    href={`/news?page=${page - 1}`}
                    className="font-medium text-navy hover:underline"
                  >
                    ← Newer posts
                  </Link>
                ) : (
                  <span />
                )}

                <span className="text-slate">
                  Page {page} of {totalPages}
                </span>

                {page < totalPages ? (
                  <Link
                    href={`/news?page=${page + 1}`}
                    className="font-medium text-navy hover:underline"
                  >
                    Older posts →
                  </Link>
                ) : (
                  <span />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
