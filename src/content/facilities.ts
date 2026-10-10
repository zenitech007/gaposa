export interface FacilityFeature {
  id: "practical" | "digital" | "community";
  title: string;
  paragraphs: string[];
  image: string;
  draft: boolean;
}

export const facilityFeatures: FacilityFeature[] = [
  {
    id: "practical",
    title: "Practical training in field and laboratory settings",
    paragraphs: [
      "Technical training at Gateway ICT Polytechnic Saapade prioritises direct physical involvement over abstract theory. Students in agricultural technology, crop production, and horticulture spend substantial course time working directly in field plots and demonstration grounds.",
      "Laboratory sessions support fieldwork with hands-on practice in soil evaluation, seedling propagation, and pest observation. This structured practical exposure ensures graduates understand real production environments and can handle everyday agricultural operations with confidence.",
    ],
    image: "life.practical",
    draft: true,
  },
  {
    id: "digital",
    title: "Digital skills and technical tools",
    paragraphs: [
      "In line with the institution's emphasis on modern technology, students engage with computing tools relevant to their disciplines. Agribusiness and cooperative management students learn essential spreadsheet modelling, inventory recording, and electronic reporting systems.",
      "Learners in environmental science are introduced to digital spatial concepts and environmental data recording. These competencies equip graduates to bridge traditional vocational methods with contemporary information workflows.",
    ],
    image: "life.digital",
    draft: true,
  },
  {
    id: "community",
    title: "Community engagement and extension work",
    paragraphs: [
      "The polytechnic is situated within an active community context, providing a natural setting for extension education and social development practice. Students collaborate with local agricultural producers, cooperative groups, and community associations.",
      "Through structured outreach exercises, candidates develop communication techniques, group moderation skills, and participatory problem-solving abilities. This direct community relationship keeps classroom instruction relevant to surrounding societal needs.",
    ],
    image: "life.community",
    draft: true,
  },
];
