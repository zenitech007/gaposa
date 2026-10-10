# The Gateway Polytechnic, Saapade — Website

Official proposal and modern web platform for **The Gateway Polytechnic, Saapade** (Gateway ICT Polytechnic Saapade), Ogun State, Nigeria.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and accessible Radix UI primitives.

---

## Getting Started

### Prerequisites
- Node.js 18+ (tested on Node.js 20+ and 26+)
- npm, pnpm, or yarn

### Installation & Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the site.

### Building for Production
```bash
# Compile and verify static build
npm run build

# Start production server
npm start
```

---

## Where to Edit Content

All copy, institution data, programme curricula, and announcements live in isolated data files inside `src/content/`. You do not need to modify React components to update school information:

| File | Content Controlled |
|---|---|
| `src/content/site.ts` | Institution name, contact details, portal links, admission status, entry requirements, leadership, rector's message. |
| `src/content/programmes.ts` | ND & HND programmes list, descriptions, what you will study, and career paths. |
| `src/content/news.ts` | News bulletins, events, press releases, dates, and excerpts. |
| `src/content/faqs.ts` | Frequently asked questions for prospective and returning students. |
| `src/content/facilities.ts` | Student life, practical fieldwork, and learning environment features. |
| `src/content/media.ts` | Photo map mapping every image slot across the entire site. |

---

## How to Add Real Photos

1. Place high-resolution image files into the `public/images/` directory (e.g. `public/images/campus-gate.jpg`).
2. Open `src/content/media.ts`.
3. Locate the corresponding key (e.g. `welcome.campus`) and update `src`:
   ```ts
   "welcome.campus": {
     src: "/images/campus-gate.jpg",
     alt: "Front entrance of The Gateway Polytechnic, Saapade",
     ratio: "4/5",
   },
   ```
4. If an image has no `src` provided (`src: undefined`), the website automatically renders an accessible, branded placeholder with the slot caption and gear-tooth pattern.

---

## Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project into your [Vercel Dashboard](https://vercel.com/new).
3. Set the Environment Variables:
   - `NEXT_PUBLIC_SITE_URL`: Your production domain (e.g. `https://gaposa.edu.ng`)
   - `NEXT_PUBLIC_SHOW_SAMPLE_BADGES`: `false` (in production) or `true` (in demo/review)
   - `CONTACT_EMAIL_TO`: Institutional inbox for contact form notifications
4. Click **Deploy**. Next.js will automatically generate all static routes and edge OpenGraph images.

---

## Architecture & Design Rules

- **Strict Colour Semantics**:
  - `Crimson (#B01E2E)`: Reserved exclusively for primary action buttons (**Apply now**) and the crimson gear ring.
  - `Navy (#1D1D52)`: Headings, authoritative bars, and footers.
  - `Forest (#14532D)` & `Leaf (#2E9E3F)`: Growth, nature, tags, and timeline markers.
- **Accurate Content Policy**: No invented statistics, quotes, cut-off marks, or dates. Refer to `CONTENT_TODO.md` for items pending school confirmation.
