import { MetadataRoute } from "next";
import { programmes } from "@/content/programmes";
import { newsItems } from "@/content/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/administration",
    "/programmes",
    "/admissions",
    "/student-life",
    "/alumni",
    "/news",
    "/contact",
    "/privacy",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const programmeRoutes: MetadataRoute.Sitemap = programmes.map((p) => ({
    url: `${siteUrl}/programmes/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const newsRoutes: MetadataRoute.Sitemap = newsItems.map((n) => ({
    url: `${siteUrl}/news/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "never" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...programmeRoutes, ...newsRoutes];
}
