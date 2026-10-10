export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  type: "news" | "event";
  excerpt: string;
  body: string[];
  image?: string;
  mainImage?: {
    asset?: {
      _id?: string;
      url?: string;
    };
    alt?: string;
  };
  sample?: boolean;
}

export const newsItems: NewsItem[] = [
  {
    slug: "admissions-now-open-nd-hnd-programmes",
    title: "Applications Open for National Diploma and Higher National Diploma Programmes",
    date: "2026-09-15",
    type: "news",
    excerpt:
      "Prospective candidates are invited to submit applications for accredited ND and HND programmes across agriculture, environment, and community management.",
    body: [
      "Gateway ICT Polytechnic Saapade announces that applications are officially being accepted for admission into its National Diploma (ND) and Higher National Diploma (HND) programmes.",
      "Eligible candidates who meet the foundational entry requirements are encouraged to review programme offerings and complete their registrations online via the polytechnic admission portal.",
      "Prospective students should prepare certified copies of relevant academic credentials before submitting their online profile to ensure a smooth evaluation process.",
    ],
    image: "hero.classroom",
    sample: true,
  },
  {
    slug: "practical-fieldwork-and-demonstration-session",
    title: "Hands-on Demonstration and Fieldwork Commences for New Semester",
    date: "2026-09-02",
    type: "event",
    excerpt:
      "Agricultural technology and horticulture students begin practical field demonstrations as part of semester coursework.",
    body: [
      "Field demonstration exercises for the current academic session have commenced across the polytechnic demonstration plots and laboratory facilities.",
      "Students participate in supervised nursery propagation, soil testing, and equipment handling under the guidance of technical staff.",
      "These scheduled practical sessions form the backbone of the curriculum, ensuring students build direct technical competence alongside theoretical studies.",
    ],
    image: "life.practical",
    sample: true,
  },
  {
    slug: "community-outreach-and-extension-workshop",
    title: "Polytechnic Hosts Grassroots Community Advisory Workshop",
    date: "2026-08-18",
    type: "event",
    excerpt:
      "Agricultural extension and social development teams engage local farming groups and cooperative representatives.",
    body: [
      "In keeping with its commitment to community development, the polytechnic facilitated an interactive advisory session connecting extension learners with local cooperative members.",
      "Discussions centered on sustainable crop protection, cooperative bookkeeping practices, and participatory community development.",
      "Staff and students gained firsthand insight into current field priorities while sharing modern farm management principles.",
    ],
    image: "life.community",
    sample: true,
  },
  {
    slug: "orientation-programme-for-incoming-students",
    title: "Orientation Session Scheduled for Newly Admitted Students",
    date: "2026-08-05",
    type: "news",
    excerpt:
      "Information on academic guidelines, campus life, and student support services to be presented during orientation.",
    body: [
      "An orientation briefing has been scheduled for incoming candidates to familiarise them with academic regulations, facility access, and support services.",
      "Departmental advisers will review academic standards, examination protocols, and code of conduct expectations.",
      "New students are advised to confirm their admission clearance on the portal prior to attending the session.",
    ],
    image: "welcome.campus",
    sample: true,
  },
];
