import { defineQuery } from "next-sanity";

export const SCHOOLS_QUERY = defineQuery(`
  *[_type == "school"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`);

export const PROGRAMMES_QUERY = defineQuery(`
  *[_type == "programme"] {
    _id,
    title,
    "slug": slug.current,
    level,
    school-> {
      _id,
      title,
      "slug": slug.current,
      description
    },
    durationYears,
    studyMode,
    summary,
    requirements,
    study,
    careers
  }
`);

export const PROGRAMME_BY_SLUG_QUERY = defineQuery(`
  *[_type == "programme" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    level,
    school-> {
      _id,
      title,
      "slug": slug.current,
      description
    },
    durationYears,
    studyMode,
    summary,
    requirements,
    study,
    careers
  }
`);

export const NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    type,
    excerpt,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    body
  }
`);

export const NEWS_BY_SLUG_QUERY = defineQuery(`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    type,
    excerpt,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    body
  }
`);
