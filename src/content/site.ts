export const site = {
  name: "Gateway ICT Polytechnic Saapade",
  shortName: "Gateway ICT Polytechnic Saapade",
  alternateName: "Gateway ICT Polytechnic Saapade", // used in metadata keywords and JSON-LD alternateName
  applyUrl: "https://onlineappsaapade.gaposa.edu.ng/OnlineApp/",
  portalUrl: "https://studentportal.gaposa.edu.ng/Portal/Default",
  contact: {
    address: "Saapade, Ogun State, Nigeria", // TODO: confirm full postal address
    email: "admissions@example.com", // PLACEHOLDER
    phone: "+234 000 000 0000", // PLACEHOLDER
    hours: undefined as string | undefined,
  },
  social: {} as Partial<Record<"facebook" | "instagram" | "x" | "youtube" | "linkedin", string>>,
  admissions: {
    open: true,
    session: undefined as string | undefined, // e.g. "2026/2027" once confirmed
    dates: [] as { label: string; date: string }[],
    fees: [] as { item: string; amount: string; note?: string }[],
    requirements: {
      // Typical Nigerian polytechnic requirements. Mark for confirmation in CONTENT_TODO.md.
      ND: [
        "At least five credit passes in WAEC, NECO or NABTEB, including English Language and Mathematics, and subjects relevant to the chosen programme.",
        "A valid UTME result, as required for polytechnic admission.",
        "Successful completion of the school's screening and admission process.",
      ],
      HND: [
        "An ND in a relevant field with at least a Lower Credit grade.",
        "At least one year of relevant work experience after the ND.",
        "Successful completion of the school's screening and admission process.",
      ],
    },
  },
  rector: undefined as { name: string; title: string; message: string[]; photo?: string } | undefined,
  leadership: [] as { name: string; role: string; photo?: string }[],
  mission: undefined as string | undefined,
  vision: undefined as string | undefined,
  accreditation: [] as { body: string; note?: string }[],
};
