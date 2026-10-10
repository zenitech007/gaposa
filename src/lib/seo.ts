import { site } from "@/content/site";
import { Programme } from "@/content/programmes";
import { NewsItem } from "@/content/news";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    alternateName: site.alternateName,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Saapade",
      addressRegion: "Ogun State",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Admissions",
      email: site.contact.email,
      telephone: site.contact.phone,
    },
  };
}

export function getCourseSchema(programme: Programme) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${programme.level} ${programme.title}`,
    description: programme.summary,
    provider: {
      "@type": "EducationalOrganization",
      name: site.name,
      sameAs: siteUrl,
    },
    courseCode: programme.slug,
    educationalCredentialAwarded:
      programme.level === "ND"
        ? "National Diploma (ND)"
        : "Higher National Diploma (HND)",
    timeToComplete: `P${programme.durationYears}Y`,
  };
}

export function getArticleSchema(item: NewsItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.excerpt,
    datePublished: item.date,
    dateModified: item.date,
    author: {
      "@type": "Organization",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/news/${item.slug}`,
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
