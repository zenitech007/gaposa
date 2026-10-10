import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getNews, getNewsBySlug } from "@/sanity/lib/fetch";
import { getSanityImageUrl } from "@/sanity/lib/image";
import { getArticleSchema } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { Section } from "@/ui/Section";
import { Photo } from "@/ui/Photo";
import { Tag, SampleBadge } from "@/ui/Tag";
import { Button } from "@/ui/Button";
import { FinalCta } from "@/home/FinalCta";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allNews = await getNews();
  return allNews.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) {
    return { title: "News Item Not Found" };
  }

  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  const articleSchema = getArticleSchema(item);
  const allNews = await getNews();
  const otherNews = allNews.filter((n) => n.slug !== item.slug).slice(0, 3);
  const mainImageUrl = getSanityImageUrl(item.mainImage);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Header Band */}
      <section className="bg-white border-b border-mist pt-10 pb-12">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumbs
            items={[
              { label: "News and events", href: "/news" },
              { label: item.title },
            ]}
          />

          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate">{formatDate(item.date)}</span>
              <Tag variant={item.type === "event" ? "event" : "news"}>
                {item.type === "event" ? "Event" : "News"}
              </Tag>
              {item.sample && <SampleBadge />}
            </div>

            <h1 className="font-display font-medium text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {item.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Article Body */}
      <Section background="white">
        <article className="max-w-3xl space-y-8">
          {/* Hero Article Photo / Main Image */}
          {mainImageUrl ? (
            <figure className="space-y-2">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-mist/40 border border-mist">
                <Image
                  src={mainImageUrl}
                  alt={item.mainImage?.alt || item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
              {item.mainImage?.alt && (
                <figcaption className="text-xs text-slate italic">
                  {item.mainImage.alt}
                </figcaption>
              )}
            </figure>
          ) : item.image ? (
            <Photo
              mediaKey={item.image}
              caption={item.title}
              aspectRatio="3/2"
              className="w-full"
              priority={true}
            />
          ) : null}

          {/* Lead Excerpt */}
          <p className="text-lg sm:text-xl text-slate font-display leading-relaxed border-l-2 border-forest pl-4">
            {item.excerpt}
          </p>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-ink text-base sm:text-lg leading-relaxed max-w-[68ch]">
            {item.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Back link */}
          <div className="pt-6 border-t border-mist">
            <Button href="/news" variant="ghost">
              ← Back to all news and events
            </Button>
          </div>
        </article>

        {/* More News Section */}
        {otherNews.length > 0 && (
          <div className="mt-16 pt-12 border-t border-mist space-y-6 max-w-3xl">
            <h3 className="font-display font-medium text-2xl text-navy">More news and notices</h3>

            <div className="divide-y divide-mist border-y border-mist">
              {otherNews.map((n) => (
                <div key={n.slug} className="py-4 group">
                  <div className="flex items-center gap-3 text-xs text-slate mb-1">
                    <span>{formatDate(n.date)}</span>
                    <Tag variant={n.type === "event" ? "event" : "news"}>
                      {n.type === "event" ? "Event" : "News"}
                    </Tag>
                  </div>
                  <Link href={`/news/${n.slug}`} className="block">
                    <span className="font-display font-medium text-lg text-navy group-hover:underline underline-offset-4">
                      {n.title}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      <FinalCta />
    </>
  );
}
