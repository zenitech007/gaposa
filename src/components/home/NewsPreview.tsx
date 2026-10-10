import Link from "next/link";
import { newsItems } from "@/content/news";
import { Section } from "@/ui/Section";
import { Photo } from "@/ui/Photo";
import { Tag, SampleBadge } from "@/ui/Tag";
import { Button } from "@/ui/Button";
import { formatDate } from "@/lib/utils";

export function NewsPreview() {
  const [featured, ...otherItems] = newsItems;
  const listItems = otherItems.slice(0, 3);

  return (
    <Section background="white">
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-navy font-display font-medium">News and events</h2>
            <p className="text-slate text-base sm:text-lg">
              Notices, academic updates, and announcements from Saapade.
            </p>
          </div>
          <Button href="/news" variant="ghost" className="shrink-0">
            All news and events
          </Button>
        </div>

        {/* Layout: Featured Left + Ruled List Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Featured Item (6 cols) */}
          {featured && (
            <div className="lg:col-span-6 flex flex-col group">
              <Link href={`/news/${featured.slug}`} className="block overflow-hidden mb-4">
                <Photo
                  mediaKey={featured.image || "news.default"}
                  caption={featured.title}
                  aspectRatio="3/2"
                  className="w-full transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </Link>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate">{formatDate(featured.date)}</span>
                  <Tag variant={featured.type === "event" ? "event" : "news"}>
                    {featured.type === "event" ? "Event" : "News"}
                  </Tag>
                  {featured.sample && <SampleBadge />}
                </div>

                <Link href={`/news/${featured.slug}`} className="block">
                  <h3 className="font-display font-medium text-xl sm:text-2xl text-navy group-hover:underline underline-offset-4 decoration-1 leading-snug">
                    {featured.title}
                  </h3>
                </Link>

                <p className="text-slate text-sm sm:text-base leading-relaxed line-clamp-2">
                  {featured.excerpt}
                </p>
              </div>
            </div>
          )}

          {/* Ruled List Right (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between divide-y divide-mist border-y lg:border-t-0 border-mist">
            {listItems.map((item) => (
              <div key={item.slug} className="py-5 first:pt-0 last:pb-0 group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-slate">{formatDate(item.date)}</span>
                  <Tag variant={item.type === "event" ? "event" : "news"}>
                    {item.type === "event" ? "Event" : "News"}
                  </Tag>
                  {item.sample && <SampleBadge />}
                </div>

                <Link href={`/news/${item.slug}`} className="block">
                  <h4 className="font-display font-medium text-lg sm:text-xl text-navy group-hover:underline underline-offset-4 decoration-1 leading-snug">
                    {item.title}
                  </h4>
                </Link>

                <p className="text-sm text-slate mt-1 line-clamp-1">{item.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
