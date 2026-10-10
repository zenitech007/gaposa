export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "nd-vs-hnd",
    question: "What is the difference between an ND and an HND programme?",
    answer:
      "A National Diploma (ND) is a two-year foundation programme designed for secondary school leavers with relevant O-Level credits. A Higher National Diploma (HND) is an advanced two-year programme for candidates who have completed an accredited ND programme (usually with a minimum of Lower Credit) and fulfilled the required post-ND industrial work experience.",
  },
  {
    id: "how-to-apply",
    question: "How do I apply for admission?",
    answer:
      "All applications are submitted online through the polytechnic admission portal. You select your preferred programme, create an applicant account, fill in your personal and academic biodata, upload the required documentation, and submit your application for screening.",
  },
  {
    id: "documents-required",
    question: "What documents do I need to prepare before applying?",
    answer:
      "For ND applicants: O-Level results (WAEC, NECO, or NABTEB), a valid UTME registration slip/result, birth certificate or declaration of age, and a certificate of state or local government origin. For HND applicants: official ND academic transcripts, ND statement of result or certificate, proof of mandatory post-ND industrial training, and basic identification credentials.",
  },
  {
    id: "admission-status",
    question: "How can I check my admission status?",
    answer:
      "Once screening is conducted, admission lists and status notifications are updated on the student portal. Applicants can log in to the portal using their application credentials to verify their screening outcome and print provisional admission notices.",
  },
  {
    id: "external-nd-graduates",
    question: "Can an ND graduate from another institution apply for HND programmes?",
    answer:
      "Yes. Qualified ND graduates from any accredited polytechnic or monotechnic in Nigeria may apply for HND programmes, provided they meet the basic entry requirements, have completed the required industrial work experience, and arrange for their official academic transcripts to be forwarded.",
  },
  {
    id: "online-application",
    question: "Is the application process conducted entirely online?",
    answer:
      "Yes. Form registration, upload of academic documents, and status tracking are managed through the online portal. Shortlisted candidates may subsequently be requested to present original copies of their credentials for physical verification during final registration.",
  },
  {
    id: "admissions-enquiries",
    question: "Where can I ask questions about specific programmes or eligibility?",
    answer:
      "Prospective candidates can reach out directly using the Contact form on this website or email the Admissions Office. General guidance on requirements and programme paths can also be found in the Programmes section.",
  },
  {
    id: "technical-help",
    question: "Who should I contact if I experience technical challenges with the portal?",
    answer:
      "If you experience technical issues while completing your online application, please contact the admissions support desk via email or phone using the details listed on our Contact page.",
  },
];
