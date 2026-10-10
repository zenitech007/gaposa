export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
  requiresData?: "rector" | "leadership" | "accreditation" | "fees" | "dates";
}

export const mainNav: {
  label: string;
  href: string;
  type: "link" | "dropdown" | "megamenu";
  items?: NavDropdownItem[];
}[] = [
  {
    label: "About",
    href: "/about",
    type: "dropdown",
    items: [
      { label: "Overview", href: "/about#overview", description: "Institution background and focus" },
      {
        label: "Message from the Rector",
        href: "/about#rector",
        description: "Welcome address",
        requiresData: "rector",
      },
      {
        label: "Leadership",
        href: "/about#leadership",
        description: "Principal officers and administration",
        requiresData: "leadership",
      },
      {
        label: "Accreditation",
        href: "/about#accreditation",
        description: "Official recognitions and bodies",
        requiresData: "accreditation",
      },
    ],
  },
  {
    label: "Administration",
    href: "/administration",
    type: "link",
  },
  {
    label: "Programmes",
    href: "/programmes",
    type: "megamenu",
  },
  {
    label: "Admissions",
    href: "/admissions",
    type: "dropdown",
    items: [
      { label: "How to apply", href: "/admissions#how-to-apply", description: "Application process and timeline" },
      { label: "Entry requirements", href: "/admissions#requirements", description: "ND and HND qualifications" },
      { label: "Fees and payment", href: "/admissions#fees", description: "Fee schedules and payment instructions", requiresData: "fees" },
      { label: "Frequently asked questions", href: "/admissions#faqs", description: "Common admissions enquiries" },
    ],
  },
  {
    label: "Student life",
    href: "/student-life",
    type: "link",
  },
  {
    label: "Alumni",
    href: "/alumni",
    type: "link",
  },
  {
    label: "News and events",
    href: "/news",
    type: "link",
  },
  {
    label: "Contact",
    href: "/contact",
    type: "link",
  },
];
