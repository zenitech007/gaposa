export interface School {
  _id?: string;
  title: string;
  slug: string;
  description?: string;
}

export const defaultSchools: School[] = [
  {
    title: "School of Management",
    slug: "school-of-management",
    description:
      "Business administration, marketing, public administration, and entrepreneurial enterprise strategy.",
  },
  {
    title: "School of Financial Studies",
    slug: "school-of-financial-studies",
    description: "Accountancy, banking, insurance, taxation, and corporate fiscal management.",
  },
  {
    title: "School of Liberal Studies",
    slug: "school-of-liberal-studies",
    description:
      "Mass communication, digital broadcasting, language communication, and general foundational studies.",
  },
  {
    title: "School of Science and Technology",
    slug: "school-of-science-and-technology",
    description:
      "Computer science, software systems, science laboratory technology, and applied mathematics.",
  },
  {
    title: "School of Engineering",
    slug: "school-of-engineering",
    description:
      "Computer engineering, electrical & electronics systems, and mechanical engineering technologies.",
  },
  {
    title: "School of Environmental Studies",
    slug: "school-of-environmental-studies",
    description:
      "Surveying, geoinformatics, urban and regional planning, building technology, and estate management.",
  },
];

export const schools: School[] = defaultSchools;

export const schoolByTitle: Record<string, School> = Object.fromEntries(
  defaultSchools.map((s) => [s.title, s])
);

export const schoolBySlug: Record<string, School> = Object.fromEntries(
  defaultSchools.map((s) => [s.slug, s])
);

export const slugToSchoolSlug: Record<string, string> = {
  "school-of-management": "school-of-management",
  "management": "school-of-management",
  "school-of-financial-studies": "school-of-financial-studies",
  "financial-studies": "school-of-financial-studies",
  "school-of-liberal-studies": "school-of-liberal-studies",
  "liberal-studies": "school-of-liberal-studies",
  "school-of-science-and-technology": "school-of-science-and-technology",
  "science-technology": "school-of-science-and-technology",
  "school-of-engineering": "school-of-engineering",
  "engineering": "school-of-engineering",
  "school-of-environmental-studies": "school-of-environmental-studies",
  "environmental-studies": "school-of-environmental-studies",
  // Legacy aliases
  "agriculture": "school-of-management",
  "environment": "school-of-environmental-studies",
  "business-community": "school-of-financial-studies",
};

export interface Programme {
  slug: string;
  title: string;
  level: "ND" | "HND";
  school: School;
  durationYears: number;
  studyMode: "Full-time";
  summary: string;
  requirements?: string[];
  study: string[];
  careers: string[];
  image?: string;
}

export const programmes: Programme[] = [
  {
    slug: "nd-agricultural-technology",
    title: "Agricultural Technology",
    level: "ND",
    school: schoolByTitle["School of Science and Technology"],
    durationYears: 2,
    studyMode: "Full-time",
    summary:
      "A comprehensive foundational programme covering modern agricultural techniques, crop cultivation, and farm mechanisation. Students acquire practical competencies needed to support sustainable agricultural production.",
    study: [
      "Soil science and fertility management",
      "Principles of crop production and protection",
      "Farm machinery operations and maintenance",
      "Introduction to animal husbandry and health",
      "Post-harvest handling and storage techniques",
      "Agricultural surveying and farm water management",
      "Basic farm records and agricultural accounting",
    ],
    careers: [
      "Farm supervisor or agricultural field officer",
      "Agricultural machinery technician",
      "Produce quality control assistant",
      "Progression to Higher National Diploma (HND) in Agriculture",
    ],
    image: "hero.field",
  },
  {
    slug: "nd-cooperative-economics-and-management",
    title: "Cooperative Economics and Management",
    level: "ND",
    school: schoolByTitle["School of Management"],
    durationYears: 2,
    studyMode: "Full-time",
    summary:
      "Focuses on the principles of collective enterprise, financial record keeping, and grassroots economic organisation. Prepares learners to assist in managing cooperative societies and microfinance initiatives.",
    study: [
      "Principles and history of cooperative movements",
      "Financial accounting and bookkeeping for cooperatives",
      "Microfinance and rural credit administration",
      "Business communication and commercial law",
      "Organisational management and leadership",
      "Agricultural marketing and consumer cooperatives",
      "Auditing fundamentals for cooperative accounts",
    ],
    careers: [
      "Cooperative society officer or secretary",
      "Credit union loan coordinator",
      "Community enterprise administrator",
      "Progression to Higher National Diploma (HND) in Agribusiness or Management",
    ],
    image: "gallery.4",
  },
  {
    slug: "nd-accountancy",
    title: "Accountancy",
    level: "ND",
    school: schoolByTitle["School of Financial Studies"],
    durationYears: 2,
    studyMode: "Full-time",
    summary:
      "Provides foundational training in financial accounting, auditing, taxation, cost accounting, and business finance. Prepares candidates for accounting technician roles and professional accreditation.",
    study: [
      "Principles of financial accounting and ledger management",
      "Cost and management accounting basics",
      "Nigerian tax system and computations",
      "Auditing and internal control standards",
      "Business law and corporate governance",
      "Quantitative techniques in business",
    ],
    careers: [
      "Assistant accountant or audit trainee",
      "Taxation and payroll assistant",
      "Accounts officer in corporate or public sector",
      "Progression to HND Accountancy or ICAN certification",
    ],
    image: "gallery.4",
  },
  {
    slug: "nd-environmental-science-and-management-technology",
    title: "Environmental Science and Management Technology",
    level: "ND",
    school: schoolByTitle["School of Environmental Studies"],
    durationYears: 2,
    studyMode: "Full-time",
    summary:
      "Introduces students to environmental assessment, sanitation management, and resource conservation practices. Emphasises fieldwork and data collection to address community environmental challenges.",
    study: [
      "Fundamentals of ecology and environmental biology",
      "Environmental sanitation and waste management",
      "Pollution monitoring and air/water quality assessment",
      "Geographical Information Systems (GIS) introductory tools",
      "Health, safety, and environmental regulations",
      "Natural resource conservation and land degradation",
      "Environmental impact reporting principles",
    ],
    careers: [
      "Environmental sanitation inspector",
      "Waste management technician",
      "Field environmental monitoring assistant",
      "Progression to relevant Higher National Diploma (HND) programmes",
    ],
    image: "gallery.2",
  },
  {
    slug: "nd-surveying-and-geoinformatics",
    title: "Surveying and Geoinformatics",
    level: "ND",
    school: schoolByTitle["School of Environmental Studies"],
    durationYears: 2,
    studyMode: "Full-time",
    summary:
      "Combines practical geodetic surveying, spatial analysis, and drone/satellite mapping tools to equip learners with essential land boundary and engineering measurement skills.",
    study: [
      "Cadastral and topographic land surveying",
      "Cartography and computer-aided drafting (CAD)",
      "Photogrammetry and remote sensing basics",
      "Global Navigation Satellite Systems (GNSS)",
      "Geographic Information Systems (GIS) mapping",
    ],
    careers: [
      "Land surveying technician",
      "GIS and cartographic mapping assistant",
      "Construction setting-out supervisor",
      "Progression to HND Surveying and Geoinformatics",
    ],
    image: "gallery.2",
  },
  {
    slug: "nd-computer-engineering-technology",
    title: "Computer Engineering Technology",
    level: "ND",
    school: schoolByTitle["School of Engineering"],
    durationYears: 2,
    studyMode: "Full-time",
    summary:
      "A rigorous, hands-on engineering programme covering computer hardware architecture, digital electronics, embedded microcontrollers, network configuration, and system maintenance.",
    study: [
      "Digital electronics and logic circuits",
      "Computer hardware architecture and troubleshooting",
      "Microprocessor programming and embedded systems",
      "Local area network design and cabling",
      "Electrical measurement and workshop practice",
    ],
    careers: [
      "Computer hardware and network technician",
      "Systems maintenance officer",
      "Embedded electronics assistant",
      "Progression to HND Computer Engineering Technology",
    ],
    image: "life.digital",
  },
  {
    slug: "nd-mass-communication",
    title: "Mass Communication",
    level: "ND",
    school: schoolByTitle["School of Liberal Studies"],
    durationYears: 2,
    studyMode: "Full-time",
    summary:
      "Prepares communicators in journalistic reporting, audio/visual broadcast production, public relations, digital media content creation, and media law in Nigeria.",
    study: [
      "Introduction to news reporting and feature writing",
      "Broadcast radio and television production",
      "Principles of public relations and advertising",
      "Digital media communication and web editing",
      "Media ethics and communication law",
    ],
    careers: [
      "Journalist and news reporter",
      "Media producer or broadcast assistant",
      "Corporate communications assistant",
      "Progression to HND Mass Communication",
    ],
    image: "gallery.3",
  },
  {
    slug: "nd-horticulture-technology",
    title: "Horticulture Technology",
    level: "ND",
    school: schoolByTitle["School of Environmental Studies"],
    durationYears: 2,
    studyMode: "Full-time",
    summary:
      "Explores nursery management, landscape design, and fruit, vegetable, and ornamental plant production. Provides hands-on training in propagation, greenhouse methods, and urban gardening.",
    study: [
      "Plant propagation techniques and nursery practices",
      "Vegetable and commercial fruit crop production",
      "Ornamental horticulture and landscape gardening",
      "Weed, pest, and disease control in horticultural plants",
      "Irrigation and greenhouse management",
      "Post-harvest care for fruits, flowers, and vegetables",
      "Horticultural marketing and small-scale enterprise",
    ],
    careers: [
      "Horticultural nursery supervisor",
      "Landscape maintenance specialist",
      "Commercial garden or greenhouse technician",
      "Progression to Higher National Diploma (HND) in Crop Production",
    ],
    image: "hero.field",
  },
  {
    slug: "hnd-agribusiness-management",
    title: "Agribusiness Management",
    level: "HND",
    school: schoolByTitle["School of Management"],
    durationYears: 2,
    studyMode: "Full-time",
    summary:
      "An advanced programme integrating business strategy, commodity supply chains, and financial management in the agricultural sector. Prepares graduates for leadership in agribusiness enterprises.",
    study: [
      "Strategic management for agricultural enterprises",
      "Agricultural marketing and commodity trade systems",
      "Farm finance, project analysis, and investment appraisal",
      "Supply chain logistics and cold chain management",
      "Agribusiness risk management and insurance",
      "Agro-processing business operations",
      "Quantitative decision models for agribusiness",
    ],
    careers: [
      "Agribusiness enterprise manager",
      "Agricultural supply chain coordinator",
      "Agricultural credit analyst or loan officer",
      "Independent commercial agribusiness founder",
    ],
    image: "gallery.3",
  },
  {
    slug: "hnd-crop-production-technology",
    title: "Crop Production Technology",
    level: "HND",
    school: schoolByTitle["School of Science and Technology"],
    durationYears: 2,
    studyMode: "Full-time",
    summary:
      "Advanced technical training in agronomic practices, seed production, and large-scale arable crop management. Focuses on maximising yield, soil health, and resilient crop systems.",
    study: [
      "Advanced cereal, legume, and root crop agronomy",
      "Seed technology, certification, and genetic improvement",
      "Soil fertility diagnostics and integrated plant nutrition",
      "Mechanised crop production and precision farming",
      "Crop disease epidemiology and biological pest control",
      "Storage engineering and commercial post-harvest loss reduction",
      "Farm experimental design and field data analysis",
    ],
    careers: [
      "Commercial farm manager or plantation supervisor",
      "Agronomist or crop production consultant",
      "Seed production specialist",
      "Agricultural research or trials officer",
    ],
    image: "hero.field",
  },
  {
    slug: "hnd-agricultural-extension-and-management",
    title: "Agricultural Extension and Management",
    level: "HND",
    school: schoolByTitle["School of Management"],
    durationYears: 2,
    studyMode: "Full-time",
    summary:
      "Focuses on rural advisory systems, participatory technology transfer, and managing agricultural development projects. Prepares professionals to bridge research innovations and practicing farmers.",
    study: [
      "Agricultural communication strategies and adult education",
      "Extension programme planning and participatory evaluation",
      "Rural sociology and farmer group organisation",
      "Management of extension services and agricultural projects",
      "ICT applications in agricultural advisory work",
      "Gender, youth, and inclusive rural development",
      "Agricultural policy analysis and farm advisory ethics",
    ],
    careers: [
      "Agricultural extension officer or team lead",
      "Rural development project manager",
      "Outreach coordinator for agricultural NGOs or agencies",
      "Training officer for farmers' associations",
    ],
    image: "hero.community",
  },
];

export function formatProgrammeTitle(level?: string, title?: string): string {
  if (!title) return "";
  if (!level) return title;
  const upperLevel = level.toUpperCase();
  const trimmed = title.trim();
  if (trimmed.toUpperCase().startsWith(`${upperLevel} `)) {
    return trimmed;
  }
  return `${upperLevel} ${trimmed}`;
}
