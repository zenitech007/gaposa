import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { client } from "./client";
import {
  SCHOOLS_QUERY,
  PROGRAMMES_QUERY,
  PROGRAMME_BY_SLUG_QUERY,
  NEWS_QUERY,
  NEWS_BY_SLUG_QUERY,
} from "./queries";
import {
  programmes as localProgrammes,
  Programme,
  defaultSchools,
  School,
} from "@/content/programmes";
import { newsItems as localNews, NewsItem } from "@/content/news";

export async function sanityFetch<const QueryString extends string, Result = any>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}): Promise<Result> {
  let isDraftMode = false;

  try {
    const draft = await draftMode();
    isDraftMode = draft.isEnabled;
  } catch {
    // Draft mode unavailable in certain build contexts
    isDraftMode = false;
  }

  try {
    // Skip remote fetch if placeholder credentials without valid Sanity project
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId || projectId === "gaposa-cms" || projectId === "your-project-id") {
      return null as Result;
    }

    if (isDraftMode) {
      return await client.fetch<Result>(query, params, {
        token: process.env.SANITY_API_READ_TOKEN,
        perspective: "previewDrafts",
        stega: true,
        useCdn: false,
        next: { revalidate: 0 },
      });
    }

    return await client.fetch<Result>(query, params, {
      perspective: "published",
      stega: false,
      useCdn: true,
      next: { revalidate, tags },
    });
  } catch (error) {
    console.warn("sanityFetch warning (falling back to local content):", error);
    return null as Result;
  }
}

/**
 * High-level fetchers that pull from Sanity and gracefully fall back to local content
 */
export async function getSchools(): Promise<School[]> {
  const remote = await sanityFetch<typeof SCHOOLS_QUERY, School[]>({
    query: SCHOOLS_QUERY,
    tags: ["school"],
  });

  if (Array.isArray(remote) && remote.length > 0) {
    return remote;
  }

  return defaultSchools;
}

export async function getProgrammes(): Promise<Programme[]> {
  const remote = await sanityFetch<typeof PROGRAMMES_QUERY, Programme[]>({
    query: PROGRAMMES_QUERY,
    tags: ["programme"],
  });

  if (Array.isArray(remote) && remote.length > 0) {
    return remote;
  }

  return localProgrammes;
}

export async function getProgrammeBySlug(slug: string): Promise<Programme | undefined> {
  const remote = await sanityFetch<typeof PROGRAMME_BY_SLUG_QUERY, Programme>({
    query: PROGRAMME_BY_SLUG_QUERY,
    params: { slug },
    tags: [`programme:${slug}`],
  });

  if (remote && remote.slug) {
    return remote;
  }

  return localProgrammes.find((p) => p.slug === slug);
}

export async function getNews(): Promise<NewsItem[]> {
  const remote = await sanityFetch<typeof NEWS_QUERY, NewsItem[]>({
    query: NEWS_QUERY,
    tags: ["news"],
  });

  if (Array.isArray(remote) && remote.length > 0) {
    return remote;
  }

  return localNews;
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const remote = await sanityFetch<typeof NEWS_BY_SLUG_QUERY, NewsItem>({
    query: NEWS_BY_SLUG_QUERY,
    params: { slug },
    tags: [`news:${slug}`],
  });

  if (remote && remote.slug) {
    return remote;
  }

  return localNews.find((n) => n.slug === slug);
}
