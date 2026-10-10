import { defineField, defineType } from "sanity";

export const programmeType = defineType({
  name: "programme",
  title: "Academic Programme",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Programme Title",
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
      name: "level",
      title: "Academic Level",
      type: "string",
      options: {
        list: [
          { title: "National Diploma (ND)", value: "ND" },
          { title: "Higher National Diploma (HND)", value: "HND" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "school",
      title: "School",
      type: "reference",
      to: [{ type: "school" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Programme Summary",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "requirements",
      title: "Entry Requirements",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Enter level-specific requirements (e.g., JAMB/O-Level requirements for ND, or IT/ND Certificate requirements for HND).",
    }),
    defineField({
      name: "durationYears",
      title: "Duration (Years)",
      type: "number",
      initialValue: 2,
    }),
    defineField({
      name: "studyMode",
      title: "Study Mode",
      type: "string",
      initialValue: "Full-time",
    }),
    defineField({
      name: "study",
      title: "Areas of Study / Key Modules",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "careers",
      title: "Career Opportunities",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "level",
    },
  },
});
