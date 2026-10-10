export interface AlumniStory {
  id: string;
  name: string;
  programme: string;
  level: "ND" | "HND";
  graduationCohort: string;
  currentRole: string;
  organisation: string;
  quote: string;
  impactStory: string;
  image: string;
  sample: boolean;
}

export const alumniStories: AlumniStory[] = [
  {
    id: "alumni-agric-tech",
    name: "Olawale Babatunde",
    programme: "Agricultural Technology",
    level: "ND",
    graduationCohort: "Class of 2022",
    currentRole: "Commercial Farm Operations Supervisor",
    organisation: "Ogun Commercial Agro-Enterprises",
    quote:
      "The daily practical exercises on the polytechnic demonstration plots taught me how to operate modern farm machinery and manage crop irrigation under real pressure. That direct experience made my transition to commercial farm management seamless.",
    impactStory:
      "Supervises 45 hectares of mechanised grain and cassava production, coordinating technical field operators and seasonal harvest logistics.",
    image: "alumni.1",
    sample: true,
  },
  {
    id: "alumni-coop-mgmt",
    name: "Funmilayo Adeyemi",
    programme: "Cooperative Economics and Management",
    level: "ND",
    graduationCohort: "Class of 2021",
    currentRole: "Lead Cooperative Accounts Administrator",
    organisation: "Remo Farmers' Cooperative Credit Union",
    quote:
      "Learning cooperative bookkeeping, credit analysis, and statutory auditing fundamentals gave me immediate credibility with grassroots agricultural unions. The training wasn't abstract; it reflected actual Nigerian community financial practices.",
    impactStory:
      "Oversees microfinance loan reconciliation and member equity ledgers for over 300 cooperative farming families across southwestern agricultural clusters.",
    image: "alumni.2",
    sample: true,
  },
  {
    id: "alumni-env-science",
    name: "Ibrahim Sanusi",
    programme: "Environmental Science and Management Technology",
    level: "ND",
    graduationCohort: "Class of 2023",
    currentRole: "Environmental Compliance and Sanitation Officer",
    organisation: "Regional Waste & Environmental Advisory Service",
    quote:
      "Our water quality monitoring and waste auditing practicals took place directly in surrounding towns. When I started my compliance role, the testing procedures and reporting standards were already second nature.",
    impactStory:
      "Conducts environmental health inspections, municipal sanitation assessments, and environmental mitigation reports for industrial facilities.",
    image: "alumni.3",
    sample: true,
  },
];

// Re-export as testimonials for backward compatibility
export const testimonials = alumniStories;
export type AlumniTestimonial = AlumniStory;
