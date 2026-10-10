import { defineField, defineType } from "sanity";

export const newsType = defineType({
  name: "news",
  title: "News & Bulletins",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Headline / Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Notice Type",
      type: "string",
      options: {
        list: [
          { title: "News & Bulletin", value: "news" },
          { title: "Academic Event", value: "event" },
        ],
        layout: "radio",
      },
      initialValue: "news",
    }),
    defineField({
      name: "excerpt",
      title: "Short Summary / Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Featured / Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for accessibility and SEO describing the image.",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "array",
      of: [{ type: "string" }],
      description: "Paragraphs of content for this news article or announcement.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
    },
  },
});
