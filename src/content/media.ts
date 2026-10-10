export interface MediaItem {
  src?: string;
  alt: string;
  ratio: "1/1" | "4/5" | "3/2";
}

export interface HeroVideoConfig {
  src?: string; // e.g. "/videos/campus-loop.mp4"
  poster?: string;
  alt: string;
}

export const heroVideo: HeroVideoConfig = {
  src: undefined, // Drop in "/videos/campus-loop.mp4" (5s compressed mp4, 1:1 circular crop)
  poster: undefined,
  alt: "Hands-on training, technology, and campus facilities at Gateway ICT Polytechnic Saapade",
};

/**
 * Primary active site images - centralized for easy swapping
 */
export const siteImages = {
  heroField: "/images/1.jpg",
  heroClassroom: "/images/2.jpg",
  heroLab: "/images/3.jpg",
  welcomeCampus: "/images/doc.jpg",
} as const;

export const media: Record<string, MediaItem> = {
  "hero.field": { src: siteImages.heroField, alt: "Crop production and agricultural training in the field", ratio: "1/1" },
  "hero.classroom": { src: siteImages.heroClassroom, alt: "Classroom and laboratory studies in computer lab", ratio: "1/1" },
  "hero.community": { src: siteImages.heroLab, alt: "Science and technology laboratory research with microscopes", ratio: "1/1" },
  "welcome.campus": { src: siteImages.welcomeCampus, alt: "Gateway ICT Polytechnic Saapade campus grounds and students", ratio: "4/5" },
  "life.practical": { src: undefined, alt: "Practical training session", ratio: "3/2" },
  "life.digital": { src: undefined, alt: "Students using computers", ratio: "3/2" },
  "life.community": { src: undefined, alt: "Extension and community work", ratio: "3/2" },
  "about.campus": { src: undefined, alt: "The polytechnic campus", ratio: "3/2" },
  "about.rector": { src: undefined, alt: "The Rector", ratio: "4/5" },
  "gallery.1": { src: undefined, alt: "Practical fieldwork and crop management", ratio: "4/5" },
  "gallery.2": { src: undefined, alt: "Laboratory analysis and soil testing", ratio: "1/1" },
  "gallery.3": { src: undefined, alt: "Classroom lecture and technical drafting", ratio: "3/2" },
  "gallery.4": { src: undefined, alt: "Cooperative society workshop discussion", ratio: "4/5" },
  "gallery.5": { src: undefined, alt: "Campus grounds and green research space", ratio: "3/2" },
  "gallery.6": { src: undefined, alt: "Students collaborating on a project", ratio: "1/1" },
  "news.default": { src: undefined, alt: "News update from Gateway ICT Polytechnic Saapade", ratio: "3/2" },
  "alumni.1": { src: undefined, alt: "Graduate in Agricultural Technology", ratio: "1/1" },
  "alumni.2": { src: undefined, alt: "Graduate in Cooperative Economics and Management", ratio: "1/1" },
  "alumni.3": { src: undefined, alt: "Graduate in Environmental Science and Management Technology", ratio: "1/1" },
  "staff.registrar": { src: undefined, alt: "The Registrar", ratio: "1/1" },
  "staff.bursar": { src: undefined, alt: "The Bursar", ratio: "1/1" },
  "staff.librarian": { src: undefined, alt: "The Polytechnic Librarian", ratio: "1/1" },
  "staff.director_ict": { src: undefined, alt: "The Director of ICT Services", ratio: "1/1" },
};

export type MediaKey = keyof typeof media;
