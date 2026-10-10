import { School } from "@/content/programmes";

export interface StaffMember {
  name: string;
  role: string;
  department?: string;
  school?: string | School;
  qualifications?: string;
  image?: string;
  email?: string;
}

export interface RectorProfile {
  name: string;
  title: string;
  qualifications: string;
  image: string;
  message: string[];
}

export const rector: RectorProfile = {
  name: "Dr. Kolawole Oyeyinka",
  title: "Rector, Gateway ICT Polytechnic Saapade",
  qualifications: "Ph.D., FNSE, M.Sc. Eng",
  image: "about.rector",
  message: [
    "Welcome to Gateway ICT Polytechnic Saapade. Our institution stands on the firm foundation of technical mastery, academic discipline, and technological innovation. In an evolving national economy, our duty is clear: to equip our National Diploma and Higher National Diploma candidates with hands-on vocational capabilities, ethical leadership, and problem-solving agility.",
    "Through our purpose-built demonstration fields, contemporary computing laboratories, and dedicated faculty, we bridge the gap between classroom theory and real-world industrial practice. Whether you join us to pioneer modern sustainable agriculture, lead environmental conservation, or drive digital commerce, Gateway ICT Polytechnic Saapade is committed to nurturing your career trajectory.",
  ],
};

export const principalOfficers: StaffMember[] = [
  {
    name: "Mr. J. O. Popoola",
    role: "Registrar",
    qualifications: "B.Sc., M.Sc. Pub. Admin, MCIPM",
    image: "staff.registrar",
    email: "registrar@gaposa.edu.ng",
  },
  {
    name: "Mrs. F. A. Adebambo",
    role: "Bursar",
    qualifications: "B.Sc. Accounting, FCA, MBA",
    image: "staff.bursar",
    email: "bursar@gaposa.edu.ng",
  },
  {
    name: "Dr. A. M. Olatunji",
    role: "Polytechnic Librarian",
    qualifications: "CLN, Ph.D. Library Science",
    image: "staff.librarian",
    email: "library@gaposa.edu.ng",
  },
  {
    name: "Engr. T. S. Babatunde",
    role: "Director of ICT Services",
    qualifications: "B.Eng., M.Eng. Comp. Sci., MNSE",
    image: "staff.director_ict",
    email: "ict@gaposa.edu.ng",
  },
];

export const academicLeadership: StaffMember[] = [
  // School of Management
  {
    name: "Dr. S. K. Adegoke",
    role: "Head of Department",
    department: "Business Administration & Management",
    school: "School of Management",
    qualifications: "Ph.D. Business Admin, NIM",
    email: "busadmin@gaposa.edu.ng",
  },
  {
    name: "Mr. H. M. Dosunmu",
    role: "Head of Department",
    department: "Marketing & Agribusiness Management",
    school: "School of Management",
    qualifications: "M.Sc. Cooperative Economics, ACMA",
    email: "marketing@gaposa.edu.ng",
  },
  {
    name: "Mrs. B. E. Olufemi",
    role: "Head of Department",
    department: "Public Administration",
    school: "School of Management",
    qualifications: "M.Sc. Public Admin",
    email: "pubadmin@gaposa.edu.ng",
  },

  // School of Financial Studies
  {
    name: "Mrs. O. C. Alabi",
    role: "Head of Department",
    department: "Accountancy",
    school: "School of Financial Studies",
    qualifications: "FCA, M.Sc. Finance",
    email: "accountancy@gaposa.edu.ng",
  },
  {
    name: "Mr. D. A. Adeleke",
    role: "Head of Department",
    department: "Banking and Finance",
    school: "School of Financial Studies",
    qualifications: "M.Sc. Banking & Finance, ACIB",
    email: "banking@gaposa.edu.ng",
  },
  {
    name: "Dr. E. K. Sowunmi",
    role: "Head of Department",
    department: "Insurance & Taxation",
    school: "School of Financial Studies",
    qualifications: "Ph.D. Taxation, ACTI",
    email: "taxation@gaposa.edu.ng",
  },

  // School of Liberal Studies
  {
    name: "Dr. F. T. Adeniyi",
    role: "Head of Department",
    department: "Mass Communication",
    school: "School of Liberal Studies",
    qualifications: "Ph.D. Mass Communication",
    email: "masscomm@gaposa.edu.ng",
  },
  {
    name: "Mr. A. O. Oyenuga",
    role: "Head of Department",
    department: "Languages & General Studies",
    school: "School of Liberal Studies",
    qualifications: "M.A. English Studies",
    email: "generalstudies@gaposa.edu.ng",
  },

  // School of Science and Technology
  {
    name: "Dr. M. I. Sanusi",
    role: "Head of Department",
    department: "Computer Science & ICT",
    school: "School of Science and Technology",
    qualifications: "Ph.D. Computer Systems, MCPN",
    email: "compsci@gaposa.edu.ng",
  },
  {
    name: "Mrs. K. A. Balogun",
    role: "Head of Department",
    department: "Science Laboratory Technology",
    school: "School of Science and Technology",
    qualifications: "M.Sc. Biochemistry, NISLT",
    email: "slt@gaposa.edu.ng",
  },
  {
    name: "Mr. O. R. Fadeyi",
    role: "Head of Department",
    department: "Statistics & Mathematics",
    school: "School of Science and Technology",
    qualifications: "M.Sc. Applied Statistics",
    email: "statistics@gaposa.edu.ng",
  },

  // School of Engineering
  {
    name: "Engr. K. A. Lawal",
    role: "Head of Department",
    department: "Computer Engineering",
    school: "School of Engineering",
    qualifications: "M.Eng. Computer Systems, MNSE, COREN",
    email: "compeng@gaposa.edu.ng",
  },
  {
    name: "Engr. M. B. Bello",
    role: "Head of Department",
    department: "Electrical & Electronics Engineering",
    school: "School of Engineering",
    qualifications: "M.Eng. Power Systems, MNSE, COREN",
    email: "electrical@gaposa.edu.ng",
  },
  {
    name: "Engr. O. T. Adeleke",
    role: "Head of Department",
    department: "Mechanical Engineering",
    school: "School of Engineering",
    qualifications: "M.Eng. Production Eng, MNSE, COREN",
    email: "mechanical@gaposa.edu.ng",
  },

  // School of Environmental Studies
  {
    name: "Surv. E. O. Oladipo",
    role: "Head of Department",
    department: "Surveying and Geoinformatics",
    school: "School of Environmental Studies",
    qualifications: "MNIS, M.Sc. Geomatics",
    email: "surveying@gaposa.edu.ng",
  },
  {
    name: "Tpl. K. N. Bankole",
    role: "Head of Department",
    department: "Urban and Regional Planning",
    school: "School of Environmental Studies",
    qualifications: "MNITP, RTP, M.Sc. Planning",
    email: "urbanplanning@gaposa.edu.ng",
  },
  {
    name: "Dr. Y. T. Ogunleye",
    role: "Head of Department",
    department: "Building Technology & Estate Management",
    school: "School of Environmental Studies",
    qualifications: "Ph.D. Environmental Toxicology, NIOB",
    email: "building@gaposa.edu.ng",
  },
];
