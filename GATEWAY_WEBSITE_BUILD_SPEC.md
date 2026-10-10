# The Gateway Polytechnic, Saapade: Website Build Spec

> **For the coding AI.** Build the complete website described here in a single pass. Read the whole document first. Do not ask clarifying questions: where information is missing, follow the rules in **Section 7 (Content and placeholder policy)** and keep going. Finish by running the checklist in **Section 10**.

---

## 0. Ground rules

1. Deliver a runnable Next.js project: `npm install && npm run dev` works, and `npm run build` passes with zero TypeScript or ESLint errors.
2. Build **every route and component** listed here. Do not stub pages with "coming soon".
3. **Never invent facts.** No made-up statistics, dates, fees, staff names, quotes, accreditations, history or phone numbers presented as real. See Section 7.
4. Follow the design system in Section 3 exactly. Do not substitute a default look (generic SaaS cards, gradients, template hero).
5. Mobile-first. Most visitors are school leavers on mid-range Android phones with limited data.
6. At the end, generate `CONTENT_TODO.md` listing every placeholder the school must supply.

---

## 1. Project brief

**Client:** The Gateway Polytechnic, Saapade, Nigeria. Some materials call it "Gateway ICT Polytechnic Saapade", so the display name lives in one config value (see Section 6).

**Why:** The current website is dated and hard to use. This redesign is a proposal demo, so it must look and feel like a respected international university site (clarity of the University of London tier) while staying rooted in the school's real subject matter: agriculture, environment, cooperatives and community development.

**Primary job of the site:** help a prospective ND or HND student understand the programmes and start an application in as few taps as possible.
**Secondary:** build credibility with parents, partners and regulators. **Tertiary:** route current students to the portal and news.

**Audiences**
- School leavers aged 16 to 22, mostly on phones, often on limited data (primary)
- Parents and guardians
- ND graduates seeking HND admission
- Partners, NGOs, industry, regulators

**Tone:** confident, plain, warm, academic without being stiff. Sentence case. Active voice. No hype.

**Facts taken from the current website (these are real and may be used)**
- Logo: three interlocking gear rings (crimson, navy, green) with the wordmark "THE GATEWAY POLYTECHNIC / SAAPADE"
- Primary call to action: "Apply Here" (links to the school's existing application portal)
- Headline: "Admission: Now Open for Exciting New Courses"
- The eight programmes in Section 6
- Old site used the Raleway font, a dark slate button and a green leaf underline. We are replacing the typography but keeping green as a brand colour.

---

## 2. Tech stack and setup

- **Next.js** (latest stable, App Router), **TypeScript** (strict), **Tailwind CSS** (use whichever version `create-next-app` installs; define design tokens as CSS variables in `globals.css` and map them into the Tailwind theme)
- **framer-motion** (hero sequence and interaction motion only)
- **Radix primitives** for accessible behaviour, styled by us (do not use shadcn's default look): `@radix-ui/react-dialog`, `react-accordion`, `react-tabs`, `react-navigation-menu`
- **lucide-react** (icons), **react-hook-form** + **zod** + **@hookform/resolvers** (forms), **clsx** + **tailwind-merge**
- Fonts via `next/font/google`
- Static-first: every page is statically generated. Only `/api/contact` is dynamic.
- Light theme only for v1.

```bash
npx create-next-app@latest gateway-polytechnic --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd gateway-polytechnic
npm i framer-motion lucide-react react-hook-form zod @hookform/resolvers clsx tailwind-merge \
  @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-tabs @radix-ui/react-navigation-menu
```

### Folder structure

```
src/
  app/
    layout.tsx                 # fonts, header, footer, announcement bar, skip link, JSON-LD
    page.tsx                   # Home
    about/page.tsx
    programmes/page.tsx
    programmes/[slug]/page.tsx
    admissions/page.tsx
    student-life/page.tsx
    news/page.tsx
    news/[slug]/page.tsx
    contact/page.tsx
    privacy/page.tsx
    api/contact/route.ts
    not-found.tsx
    sitemap.ts  robots.ts  opengraph-image.tsx
  components/
    brand/   Logo.tsx  Rings.tsx
    layout/  Header.tsx  MegaMenu.tsx  MobileNav.tsx  AnnouncementBar.tsx  Footer.tsx  SiteSearch.tsx
    ui/      Button.tsx  Tag.tsx  Photo.tsx  Section.tsx  Breadcrumbs.tsx  Accordion.tsx  Tabs.tsx
    home/    Hero.tsx  QuickBar.tsx  Welcome.tsx  ProgrammeFinder.tsx  AdmissionsSteps.tsx
             LearningByDoing.tsx  FactsStrip.tsx  NewsPreview.tsx  Gallery.tsx  FinalCta.tsx
    programmes/  ProgrammeList.tsx  ProgrammeFilters.tsx
    forms/   ContactForm.tsx
  content/
    site.ts  programmes.ts  news.ts  faqs.ts  facilities.ts  media.ts  nav.ts
  lib/  utils.ts  seo.ts
public/
  brand/            # official logo goes here when supplied
  images/placeholders/
```

### Environment variables (`.env.example`)

```
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_SHOW_SAMPLE_BADGES=true
CONTACT_EMAIL_TO=admissions@example.com
```

---

## 3. Design system

### 3.1 Concept

Spend the boldness in **one place**: the hero. Everything else stays quiet, disciplined and editorial.

**The memorable element:** the school's logo is three interlocking rings. The hero is built from **three overlapping circular photographs**, each outlined by a dashed ring in crimson, navy and green (the dashes read as gear teeth). The motif returns, small and restrained, in the final call-to-action band and the footer.

**Colour meaning is fixed:** crimson = take action. Navy = structure and authority. Green = growth and progress. Never use them decoratively against these meanings.

### 3.2 Colour tokens

```css
:root {
  --color-ink:      #17212B;  /* body text */
  --color-navy:     #1D1D52;  /* headings, header utility bar, footer, dark bands */
  --color-crimson:  #B01E2E;  /* primary action buttons ONLY, plus the crimson ring */
  --color-forest:   #14532D;  /* green text, tags, announcement bar */
  --color-leaf:     #2E9E3F;  /* decorative green only (rules, ring, underline); never for text on white */
  --color-chalk:    #F5F7F4;  /* alternate section background */
  --color-mist:     #DDE4DC;  /* borders and dividers */
  --color-white:    #FFFFFF;
  --color-slate:    #5A6672;  /* secondary text (passes AA on white and chalk) */
}
```

Page background is white. Alternate sections use chalk. Do not add cream, terracotta, gradient washes, or a near-black background.

Contrast rules: body text uses `ink` on white or chalk. White text only on navy, crimson or forest. Never place `leaf` text on white.

### 3.3 Typography

Two clearly distinct families.

| Role | Family | Notes |
|---|---|---|
| Display and headings | **Newsreader** | serif, weights 400, 500, 600, italic available |
| Body and UI | **Public Sans** | clear at small sizes on low-end screens |

```ts
// layout.tsx
import { Newsreader, Public_Sans } from "next/font/google";
const display = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-display", display: "swap" });
const body = Public_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
// If the build rejects `axes`, remove that option.
// Fallbacks: display -> Georgia, serif. body -> system-ui, sans-serif.
```

**Scale** (modular, ratio about 1.25):

| Token | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| h1 | `clamp(2.5rem, 1.4rem + 4.6vw, 4.5rem)` | 500 | 1.05 | -0.02em |
| h2 | `clamp(1.9rem, 1.3rem + 2.4vw, 3rem)` | 500 | 1.12 | -0.015em |
| h3 | `1.5rem` | 500 | 1.25 | -0.01em |
| h4 / lead | `1.25rem` | 400 | 1.5 | 0 |
| body | `1.0625rem` (17px) | 400 | 1.65 | 0 |
| small | `0.875rem` | 400 | 1.5 | 0 |

- Max line length: **68 characters** (`max-w-[68ch]`) for paragraphs.
- All text is **left-aligned**. No centred paragraphs anywhere.
- Headings are sentence case. **Do not** use all-caps labels, tracked-out eyebrows above headings, or a single accented word inside a headline.
- Use the italic serif sparingly, only for pull quotes and the Rector's message.

### 3.4 Layout, spacing, shape

- Container: `max-w-[1240px]`, side padding `20px` (mobile), `32px` (md), `48px` (lg)
- Desktop uses a 12-column grid with 24px gutters. Spacing scale is a 4px base.
- Section vertical rhythm: `py-16` mobile, `py-24` desktop. Separate sections by background change (white / chalk) or a 1px mist rule, never both.
- **Radius scale (deliberate, not uniform):** structure, panels, list rows and images: `0`. Buttons and inputs: `6px`. Tags: `2px`. Circles only for the ring motif and avatars.
- **Elevation:** none by default. Only the mega menu, mobile sheet and search dialog get a shadow: `0 12px 32px -12px rgba(23,33,43,.28)`.
- Borders: 1px `mist`.
- **No identical-card grids.** Programmes, news and steps each use a form that fits their content (ruled rows, a featured item plus a list, a timeline), not a grid of matching rounded cards.

### 3.5 Components (visual rules)

**Button** (`ui/Button.tsx`), variants:
- `primary`: crimson background, white text, 6px radius, height 48px, padding x 24px, font 600. Hover darkens 8%. Used for **Apply now** and other application actions only.
- `secondary`: white background, 1.5px navy border, navy text. Hover fills navy with white text.
- `ghost`: text link with underline offset 4px; underline thickens on hover. No appended arrow characters in text.
- Minimum tap target 44x44px. Focus ring below.

**Tag** (`ui/Tag.tsx`): level badge. `ND` = forest outline, `HND` = navy outline, 2px radius, 12px text, semibold. No fill.

**Focus ring (global):** `outline: 3px solid var(--color-navy); outline-offset: 3px;`. On dark backgrounds use white (`.on-dark`). Never remove outlines.

**Photo** (`ui/Photo.tsx`): wraps `next/image`. If the source is missing, renders a branded placeholder (chalk background, faint dashed-ring pattern in mist, a small caption of what photo belongs here). All images need `alt`, `sizes`, and fixed aspect ratios to prevent layout shift.

**Icons:** lucide, stroke 1.75, 20px. Use icons only where they aid recognition (search, menu, external link, chevrons). Do not add an icon to every list item.

### 3.6 Motion

- **One orchestrated moment:** the hero ring reveal on first load. Three circles scale from 0.92 and fade in, staggered 120ms, 700ms each, easing `cubic-bezier(.2,.7,.2,1)`. The dashed ring strokes draw in over 900ms. Then the headline and buttons appear (no slide, opacity only).
- Everything else is **interaction-driven**: mega menu open/close (160ms), mobile sheet slide (220ms), accordion height, tab underline slide, link underline thickening, button hover colour.
- **Do not** add fade-and-slide-up on every section, hover lifts on cards, parallax, or autoplay carousels.
- Respect `prefers-reduced-motion`: disable the hero sequence (render final state) and all non-essential transitions.

### 3.7 Imagery direction

Real photography only, once supplied: natural light, real students, real fields, labs and classrooms. No stock handshake or generic office photos. Until real photos exist, every slot uses the `Photo` placeholder, and **all slots are defined in one map** (`content/media.ts`) so the school's photos can be dropped in by editing one file.

### 3.8 Writing voice (for all UI copy you write)

- Say what something is or does in plain words. No marketing superlatives.
- Button labels name the action: "Apply now", "Browse programmes", "See entry requirements", "Contact admissions", "Send message".
- Errors state what went wrong and how to fix it. They never apologise vaguely.
- Empty states invite an action ("No programmes match. Clear the filters to see every programme.").
- Spelling: British/Nigerian English (programme, organisation, centre).

---

## 4. Global layout components

### 4.1 Announcement bar (`AnnouncementBar.tsx`)
- Full width, 40px, background `forest`, white text 14px, left-aligned inside the container.
- Text: "Admissions are open for the {session} session." (if `site.admissions.session` is undefined, use "Admissions are now open.") followed by an underlined link "Apply now" (external, new tab, `rel="noopener noreferrer"`).
- Dismissible with an icon button (X, 44px target, `aria-label="Dismiss announcement"`). Remember dismissal in `sessionStorage` inside try/catch.
- Hidden entirely if `site.admissions.open` is false.

### 4.2 Header (`Header.tsx`, `MegaMenu.tsx`, `MobileNav.tsx`)

**Desktop (>= 1024px)**
- **Utility strip:** 36px, background `navy`, white 13px text. Left: "Student portal" (external link to `site.portalUrl`). Right: admissions email and phone from `site.contact`.
- **Main bar:** sticky, white, height 80px that condenses to 64px after 24px scroll (animate height only; no layout jump). 1px mist bottom border.
  - Left: `<Logo>` (rings mark + wordmark "The Gateway Polytechnic" in Newsreader 600 with "Saapade" beneath in Public Sans 13px slate)
  - Centre/right nav (Public Sans 15px, 500): **About**, **Programmes**, **Admissions**, **Student life**, **News and events**, **Contact**
  - Far right: search icon button (opens `SiteSearch`) and the primary **Apply now** button (crimson)
- **Programmes** opens a **mega menu** (Radix NavigationMenu): full-width panel under the bar, white, one shadow, three columns (Agriculture / Environment / Business and community), each listing its programmes as links with `ND` or `HND` tags. A fourth narrow column holds a short "Admissions open" note and an **Apply now** link. Opens on hover, focus or click. Closes on Escape. Fully keyboard operable.
- **About** and **Admissions** open simple dropdowns:
  - About: Overview, Message from the Rector, Leadership (only if data exists), Accreditation (only if data exists)
  - Admissions: How to apply, Entry requirements, Fees (only if data exists), FAQs. These link to anchors on `/admissions`.

**Mobile and tablet (< 1024px)**
- Bar height 64px: rings mark + short name on the left, search icon, then a 44px hamburger button (navy bars, `aria-label="Open menu"`).
- Opens a full-height right-side sheet (Radix Dialog, 220ms slide, focus trapped). Inside: accordion nav groups (About, Programmes, Admissions), then flat links. A sticky bottom area holds a full-width **Apply now** button and a "Student portal" link.

### 4.3 Site search (`SiteSearch.tsx`)
Radix Dialog with a text input and instant client-side results from a static index built from programmes, pages and news. Up to 8 results grouped by type. Arrow keys move, Enter opens, Escape closes. Empty state: "No results for '{query}'. Try a programme name such as horticulture."

### 4.4 Footer (`Footer.tsx`)
- Background `navy`, text white at 85% opacity, links underline on hover. Use the `.on-dark` focus ring.
- Top row (desktop four columns, mobile stacked):
  1. Logo (white version), one-line description, address from `site.contact`
  2. **Programmes**: ND and HND links grouped, plus "All programmes"
  3. **Quick links**: Apply now, How to apply, Entry requirements, Student portal, News, Contact
  4. **Contact**: email, phone, "Get directions" link to `https://www.google.com/maps/search/?api=1&query=` plus the URL-encoded school name and address. Social links render only for entries that exist in `site.social`.
- A large, low-contrast (white at 6%) ring motif sits behind the right side of the footer, cropped by the edge. Decorative, `aria-hidden`.
- Bottom bar: `© {year} {site.name}`, links to Privacy, and a "Back to top" link.

---

## 5. Pages

All pages share: breadcrumb (except Home), a page header band (white, title in h1, one-line intro in the lead style), and the standard footer. Set unique `<title>` and meta description per page via the Metadata API.

### 5.1 Home `/`

Sections in this exact order.

**1. Hero (`Hero.tsx`)**
- Height `min(88svh, 760px)` on desktop, auto on mobile. White background.
- **Desktop:** two columns (7/5). Left: h1, a lead paragraph, two buttons. Right: the three-ring composition.
  - h1: "Hands-on training in agriculture, environment and community development."
  - Lead: "Admissions are open for ND and HND programmes at The Gateway Polytechnic, Saapade."
  - Buttons: **Apply now** (primary, external link to `site.applyUrl`) and **Browse programmes** (secondary, `/programmes`).
- **Ring composition (`Rings.tsx`):** a square container (`aspect-square`, max 560px). Three circular photos (`clip-path: circle` or `border-radius: 9999px`, each a `Photo`) overlapping like the logo. Percentages relative to the container:
  - Crimson circle: diameter 56%, left 0%, top 14%
  - Navy circle: diameter 48%, left 50%, top 0%
  - Green circle: diameter 52%, left 27%, top 46%
  - Each circle has an SVG ring offset 10px outside the photo: `stroke-dasharray: 7 5`, stroke width 5, `stroke-linecap: butt` (gives gear-tooth feel), coloured crimson / navy / leaf respectively. Z-order: green over crimson over navy.
  - Photo slots: `hero.field` (crop/field work), `hero.classroom` (classroom or lab), `hero.community` (community/extension). Placeholder until supplied.
- **Mobile:** headline and buttons first, then the ring composition at max 340px, left-aligned. Buttons stack full width.
- Motion: the one orchestrated reveal in Section 3.6.

**2. Quick bar (`QuickBar.tsx`)**
A single bar (not separate cards) overlapping the hero's bottom edge by 40px on desktop: white background, 1px mist border, one shadow-free container with five equal cells divided by 1px mist rules: **Programmes**, **How to apply**, **Entry requirements**, **Student portal**, **Contact**. Each cell: a one-line label (600) and a short descriptor (14px slate). Whole cell is the link; hover underlines the label. Mobile: vertical list of five full-width rows.

**3. Welcome (`Welcome.tsx`)** on chalk background
Two columns (5/7). Left: a rectangular `Photo` (slot `welcome.campus`, 4:5). Right: h2 "A polytechnic built around practical skills", two short paragraphs of draft copy describing the school's focus on practical, field-based training in its programme areas, then a ghost link "Read more about the polytechnic" to `/about`. Draft copy must stay general and verifiable (see Section 7).

**4. Programme finder (`ProgrammeFinder.tsx`)** on white
- h2 "Find your programme". Intro line: "Choose a level to see what we offer."
- Radix Tabs: **All**, **ND**, **HND**. A thin crimson underline slides under the active tab.
- Below: **ruled rows** (not cards), one per programme, sorted ND first. Each row: title (h3, Newsreader), `Tag` for level, the area name in slate, duration, and a chevron. Whole row links to `/programmes/{slug}`. Hover: chalk background, title underline.
- Footer link: "See all programmes".
- Mobile: row stacks (title above, tag and area beneath).

**5. Admissions steps (`AdmissionsSteps.tsx`)** on chalk
This content **is** a sequence, so numbering is appropriate.
- h2 "How to apply". Four steps on a horizontal timeline (desktop) joined by a 2px leaf-green line with a small filled circle at each step; vertical timeline on mobile.
  1. Choose a programme: browse ND and HND options.
  2. Check entry requirements for your level.
  3. Apply online through the admissions portal.
  4. Follow the instructions you receive to complete registration.
- Under it: primary **Apply now** button and a ghost link "See full admission details" (`/admissions`).

**6. Learning by doing (`LearningByDoing.tsx`)** on white
Three alternating image/text rows (image left, then right, then left), each with h3, a short paragraph and a ghost link. Topics from `content/facilities.ts`: **Practical training**, **Digital skills**, **Community and extension work**. Alternate full-bleed on mobile (image above text). Each uses a `Photo` slot (`life.practical`, `life.digital`, `life.community`).

**7. Facts strip (`FactsStrip.tsx`)** on navy
One quiet horizontal line, not big stat numbers. Four items separated by 1px white/20% rules: "{programmes.length} programmes", "ND and HND levels", "Saapade" (location), and "Admissions open" (only if open). All values are computed from data. White text, labels 14px, values in Newsreader 24px. No invented figures.

**8. News and events (`NewsPreview.tsx`)** on white
h2 "News and events". Layout: one featured item on the left (image 3:2, date, title in h3, two-line excerpt) and a ruled list of the next three items on the right (date in slate, title, tag "News" or "Event"). Ghost link "All news and events". Sample items show the sample badge (Section 7).

**9. Gallery (`Gallery.tsx`)** on chalk
h2 "Life at the polytechnic". CSS columns masonry (2 columns mobile, 3 desktop) of six `Photo` slots (`gallery.1` to `gallery.6`) with varied aspect ratios (4:5, 1:1, 3:2). Click opens a Radix Dialog lightbox with the image, caption, arrow keys and Escape support. No autoplay.

**10. Final CTA band (`FinalCta.tsx`)** on navy
Left: h2 in white "Start your application today", one line of supporting text, primary **Apply now** and a white-outline secondary **Contact admissions**. Right: a large ring motif drawn in white at 15% opacity, cropped by the section edge. Left-aligned content, not centred.

### 5.2 Programmes `/programmes`
- Header band: h1 "Programmes", lead "National Diploma (ND) and Higher National Diploma (HND) programmes."
- **Sticky filter bar** (below the header on scroll): Radix Tabs for level (All / ND / HND), a row of area filter buttons (All areas, Agriculture, Environment, Business and community) styled as outlined 2px-radius chips, and a search field (client-side, matches title and summary).
- Results: ruled rows as in the Home finder, with an additional one-line summary under the title on desktop.
- Result count in a live region (`aria-live="polite"`): "{n} programmes".
- Empty state per Section 3.8. Filters sync to the URL query string (`?level=ND&area=agriculture&q=`) so results are shareable.

### 5.3 Programme detail `/programmes/[slug]`
Statically generated via `generateStaticParams` and `generateMetadata`.
- **Header band** (chalk): breadcrumb (Programmes / {title}), h1 title, `Tag`, duration, area. Primary **Apply now** button.
- **Two columns** (8/4 on desktop; single column on mobile with the aside first, collapsed):
  - **Main:**
    - "About this programme" (draft summary)
    - "What you will study" (a list of 6 to 8 areas, drafted generally; do not claim specific course codes)
    - "Entry requirements" (from the level defaults in `content/site.ts`, flagged for confirmation)
    - "Where this can lead" (3 to 5 general career or progression directions; for ND programmes include progression to HND)
    - FAQ accordion (3 to 4 general questions, e.g. "What is the difference between ND and HND?")
  - **Aside** (sticky on desktop): a bordered "Quick facts" panel, no shadow. Definition list: Level, Duration, Area, Study mode. Then primary **Apply now**, and below it a ghost link "Ask admissions a question" (to `/contact?subject={title}`).
- Bottom: "Related programmes", up to three ruled rows from the same area (or the other level in the same field).
- JSON-LD `Course` data.

### 5.4 Admissions `/admissions`
One long page with anchored sections and a sticky in-page nav on desktop (anchors: How to apply, Entry requirements, Fees, FAQs).
1. **How to apply** (`#how-to-apply`): the four-step timeline from Home, expanded with a sentence per step and the primary **Apply now** button.
2. **Entry requirements** (`#requirements`): Radix Tabs **ND** and **HND**. Content comes from `site.admissions.requirements` (typical Nigerian polytechnic requirements, clearly marked "Confirm with the Admissions Office" in `CONTENT_TODO.md`, not in the UI).
3. **Important dates** (`#dates`): rendered **only** if `site.admissions.dates.length > 0`.
4. **Fees and payment** (`#fees`): rendered **only** if fee data exists.
5. **FAQs** (`#faqs`): Radix Accordion from `content/faqs.ts` (8 general questions: ND vs HND, how to apply, documents needed, who to contact, portal access, etc.).
6. Final CTA band.

### 5.5 About `/about`
- Header band: h1 "About the polytechnic".
- **Overview:** two columns (text / photo `about.campus`). General draft copy only.
- **Message from the Rector:** photo slot `about.rector` plus a text block. The real message must be supplied, so until then render the section **only if** `site.rector` exists. Use the italic serif for the message.
- **Mission and vision:** rendered only if supplied.
- **Leadership:** rendered only if `site.leadership.length > 0`. Plain ruled list: name, role, optional photo.
- **Accreditation and affiliations:** rendered only if supplied.
- A "What we teach" section summarising the three areas (Agriculture, Environment, Business and community) with links to filtered `/programmes` results.
- Final CTA band.

### 5.6 Student life `/student-life`
- Header band: h1 "Student life".
- Three feature sections from `content/facilities.ts` (practical training, digital skills, community and extension work), reusing the alternating row layout from Home but with more copy and a second photo each.
- "Support and services" rendered only if data exists.
- Gallery (same component as Home).
- Final CTA band.

### 5.7 News and events `/news` and `/news/[slug]`
- **List:** h1 "News and events". Radix Tabs: All / News / Events. A featured latest item (large, image 3:2) then ruled rows with date, title, excerpt and tag. 10 items per page; use simple "Older posts" link pagination (query `?page=`).
- **Detail:** breadcrumb, h1, date and tag, a hero `Photo`, body (array of paragraph strings; support simple sub-headings), "Back to news" ghost link, and "More news" (3 ruled rows). Include `Article` JSON-LD.
- Sample items show the sample badge (Section 7).

### 5.8 Contact `/contact`
- Header band: h1 "Contact admissions".
- Two columns. Left: the form (`ContactForm.tsx`). Right: contact details from `site.contact` (address, email, phone), opening hours (only if supplied), "Get directions" button (Google Maps search URL, no API key), and a ruled list of useful links (Apply now, Entry requirements, Student portal).
- **Form fields:** Full name (required), Email (required, validated), Phone (optional), Subject (select: Admissions, Programmes, Fees, Other; pre-selected from `?subject=`), Message (required, 20 to 1000 characters), plus a hidden honeypot field.
- Validate with zod on client and server. Show inline errors under each field in plain language (e.g. "Enter an email address like name@example.com"). Labels always visible above inputs (no placeholder-only labels). Submit button text "Send message"; while sending "Sending…"; on success replace the form with: "Message sent. We reply to admissions questions by email, usually within a few working days." Do **not** promise a specific reply time.
- `/api/contact` (POST): validates, rejects honeypot hits silently, and for now logs the payload and returns `{ ok: true }`. Include a commented-out example for sending via Resend using `CONTACT_EMAIL_TO`.

### 5.9 Other
- `/privacy`: short, plain-language draft privacy page covering the contact form only. Mark as draft in `CONTENT_TODO.md`.
- `not-found.tsx`: h1 "Page not found", one line of help, buttons **Go home** and **Browse programmes**.
- `sitemap.ts`, `robots.ts` (allow all, reference sitemap), and `opengraph-image.tsx` (navy background, the rings mark and school name, generated with `next/og`).

---

## 6. Content and data models

All copy and data live in `src/content/`. Components read from these files only, so the school can edit content without touching components, and the shape maps cleanly to a CMS later (Sanity or Payload).

### 6.1 `content/site.ts`

```ts
export const site = {
  name: "The Gateway Polytechnic, Saapade",
  shortName: "Gateway Polytechnic",
  alternateName: "Gateway ICT Polytechnic Saapade", // used in metadata keywords and JSON-LD alternateName
  applyUrl: "https://example.com/apply",   // TODO: school's existing application portal
  portalUrl: "https://example.com/portal", // TODO: student portal
  contact: {
    address: "Saapade, Ogun State, Nigeria", // TODO: confirm full postal address
    email: "admissions@example.com",         // PLACEHOLDER
    phone: "+234 000 000 0000",              // PLACEHOLDER
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
```

### 6.2 `content/programmes.ts`

```ts
export type Area = "agriculture" | "environment" | "business-community";
export const areaLabels: Record<Area, string> = {
  agriculture: "Agriculture",
  environment: "Environment",
  "business-community": "Business and community",
};

export type Programme = {
  slug: string;
  title: string;
  level: "ND" | "HND";
  area: Area;
  durationYears: number;            // ND and HND: 2 (typical, confirm)
  studyMode: "Full-time";           // confirm
  summary: string;                  // 2 sentences, general, DRAFT
  study: string[];                  // 6 to 8 general study areas, DRAFT
  careers: string[];                // 3 to 5 general directions, DRAFT
  image?: keyof typeof media;
};
```

**Seed these eight programmes exactly (titles are from the school's current site).** Write the `summary`, `study` and `careers` fields yourself as short, general, neutral descriptions of the field. Do not state course codes, grading, fees or facilities.

| slug | title | level | area |
|---|---|---|---|
| `nd-agricultural-technology` | Agricultural Technology | ND | agriculture |
| `nd-cooperative-economics-and-management` | Cooperative Economics and Management | ND | business-community |
| `nd-environmental-science-and-management-technology` | Environmental Science and Management Technology | ND | environment |
| `nd-horticulture-technology` | Horticulture Technology | ND | agriculture |
| `nd-social-development` | Social Development | ND | business-community |
| `hnd-agribusiness-management` | Agribusiness Management | HND | business-community |
| `hnd-crop-production-technology` | Crop Production Technology | HND | agriculture |
| `hnd-agricultural-extension-and-management` | Agricultural Extension and Management | HND | agriculture |

Display titles in the UI as "{level} {title}" where a level is needed (e.g. "ND Horticulture Technology"), and as `title` plus a `Tag` where there is room.

### 6.3 `content/media.ts` (single source for every photo slot)

```ts
export const media = {
  "hero.field":        { src: undefined, alt: "Students working in a crop field", ratio: "1/1" },
  "hero.classroom":    { src: undefined, alt: "Students in a classroom or laboratory", ratio: "1/1" },
  "hero.community":    { src: undefined, alt: "Students and staff working with a community group", ratio: "1/1" },
  "welcome.campus":    { src: undefined, alt: "The polytechnic campus", ratio: "4/5" },
  "life.practical":    { src: undefined, alt: "Practical training session", ratio: "3/2" },
  "life.digital":      { src: undefined, alt: "Students using computers", ratio: "3/2" },
  "life.community":    { src: undefined, alt: "Extension and community work", ratio: "3/2" },
  "about.campus":      { src: undefined, alt: "The polytechnic campus", ratio: "3/2" },
  "about.rector":      { src: undefined, alt: "The Rector", ratio: "4/5" },
  "gallery.1":         { src: undefined, alt: "Student life photo 1", ratio: "4/5" },
  // ... gallery.2 to gallery.6 with ratios 1/1, 3/2, 4/5, 3/2, 1/1
  "news.default":      { src: undefined, alt: "News", ratio: "3/2" },
} as const;
```

When `src` is `undefined`, `Photo` renders the branded placeholder with the slot description as its caption. When the school supplies photos, they go in `public/images/` and only `src` changes.

### 6.4 `content/news.ts`

```ts
export type NewsItem = {
  slug: string; title: string; date: string; // ISO
  type: "news" | "event"; excerpt: string; body: string[];
  image?: keyof typeof media; sample?: boolean;
};
```
Seed **four** items, all with `sample: true`, written as plausible but clearly generic announcements (admissions open; new students orientation; a community outreach day; a practical training session). Avoid specific names, numbers or venues.

### 6.5 `content/faqs.ts` and `content/facilities.ts`
- `faqs.ts`: 8 general Q&As (difference between ND and HND, how to apply, what documents to prepare, how to check admission status via the portal, where to ask questions, can an ND graduate apply for HND, is the application online, how to contact admissions). Answers are general and point to the portal or the contact page; no dates or fees.
- `facilities.ts`: three entries (`practical`, `digital`, `community`) each with a title, 2 to 3 paragraphs of general descriptive copy tied to what the programmes involve (field-based learning, digital skills in the school's ICT focus, extension and community work), and a media key. Mark `draft: true`.

### 6.6 The `Logo` and `Rings` components
Until the official logo file is supplied, draw an inline SVG approximation, `viewBox="0 0 100 100"`, three circles with `fill="none"`, `stroke-width="4"`, `stroke-dasharray="5 3"` (gear-tooth feel):
- crimson `#B01E2E`: centre (36, 44), r 24
- navy `#1D1D52`: centre (62, 32), r 20
- green `#14532D`: centre (50, 62), r 22

`Logo` = this mark + the wordmark. Accept a `variant` prop (`"default" | "light"`) for the footer and a `markOnly` prop for small mobile headers. If `/public/brand/logo.svg` is later added, only `Logo.tsx` changes. List "replace logo with official file" in `CONTENT_TODO.md`.

---

## 7. Content and placeholder policy

This is a proposal demo for a real institution, so **accuracy beats completeness**.

**You may write:**
- UI microcopy, navigation, button labels, form messages
- General, descriptive copy about what each programme area involves
- General FAQs and typical entry requirements (flagged in `CONTENT_TODO.md`)

**You must not invent or present as fact:**
- Statistics, rankings, awards, years of establishment, student or staff counts
- Fees, deadlines, session dates, cut-off marks
- Names, titles or quotes of people (Rector, lecturers, students)
- Accreditation, affiliations or partnerships
- Specific facilities, equipment, farm sizes or locations beyond what the programmes imply
- Real-looking phone numbers or email addresses (use `example.com` and `+234 000 000 0000`)

**Behaviour rules**
- Any section whose data is empty or undefined **does not render** (no "TBC", no empty headings, no orphan nav links). Nav items that point to hidden sections are removed automatically.
- Anything in `news.ts` or elsewhere with `sample: true` shows a small outlined "Sample content" tag (2px radius, 12px slate text) when `NEXT_PUBLIC_SHOW_SAMPLE_BADGES === "true"`. Photo placeholders always show their caption.
- Generate **`CONTENT_TODO.md`** at the repo root with a checklist grouped by: Brand (official logo, colours check), Contact details, Application and portal URLs, Admissions (session, dates, fees, requirements), Programmes (verify summaries, durations, study areas), People (Rector message, leadership), Accreditation, Photography (every key in `media.ts`), News, Legal (privacy).

---

## 8. Quality: accessibility, performance, SEO

**Accessibility (target WCAG 2.2 AA)**
- Skip link as the first focusable element ("Skip to main content").
- One `h1` per page; heading levels never skip. Landmarks: `header`, `nav` (labelled), `main`, `footer`.
- Visible focus on every interactive element. All targets at least 44x44px.
- All interactive Radix components keep their built-in keyboard and focus behaviour. Do not override it.
- Colour is never the only signal (tags show text; errors show text and an icon).
- Respect `prefers-reduced-motion`. Set `<html lang="en-NG">`.
- External links that open a new tab include a visually hidden "(opens in a new tab)" and use the external-link icon.

**Performance (target Lighthouse mobile: Performance 90+, Accessibility 100, Best Practices 100, SEO 100)**
- LCP under 2.5s on a throttled 4G profile. The hero uses `priority` on the first image only.
- All images via `next/image` with correct `sizes`; no layout shift (reserve aspect ratios).
- Subset fonts to Latin, `display: swap`, load only the weights used. No video, no autoplay, no third-party scripts, no heavy animation libraries.
- Client components only where interaction needs them (header state, tabs, filters, forms, dialogs). Everything else is a Server Component.
- Keep first-load JS lean: lazy-load `SiteSearch` and the gallery lightbox with `next/dynamic`.

**SEO**
- Metadata API on every page (title template `%s | The Gateway Polytechnic, Saapade`, description, canonical, Open Graph, Twitter card).
- JSON-LD: `EducationalOrganization` (sitewide, include `alternateName`), `Course` (programme pages), `Article` (news), `BreadcrumbList`.
- Clean slugs, `sitemap.ts` listing all static routes, programme pages and news items; `robots.ts`.

---

## 9. Responsive behaviour

| Breakpoint | Layout |
|---|---|
| < 640px | Single column. Full-width stacked buttons. Hamburger sheet nav. Hero text first, rings below at max 340px. Quick bar becomes five stacked rows. Timeline vertical. |
| 640 to 1023px | Mostly single column with two-column galleries and image/text rows. Hamburger nav. Rings centred-left at max 420px. |
| >= 1024px | Utility strip, full nav and mega menu. 12-column grid. Hero is two columns. Sticky programme aside and in-page admissions nav. |
| >= 1440px | Container stays at 1240px. Hero height capped at 760px. Do not stretch content. |

Test at 360, 390, 768, 1024, 1280 and 1440px widths. No horizontal scrolling at any width.

---

## 10. Build order and acceptance checklist

**Build order**
1. Scaffold, install dependencies, add fonts, tokens in `globals.css`, `utils.ts`
2. `content/*` files with the seed data above
3. UI primitives: `Button`, `Tag`, `Photo`, `Section`, `Breadcrumbs`, `Accordion`, `Tabs`, `Logo`, `Rings`
4. Layout: `AnnouncementBar`, `Header` (desktop, mega menu, mobile sheet), `SiteSearch`, `Footer`
5. Home, in the order listed in 5.1
6. Programmes list and detail
7. Admissions, About, Student life
8. News list and detail
9. Contact page, form and API route
10. SEO files, JSON-LD, 404, privacy, OG image
11. `CONTENT_TODO.md` and a short `README.md` (how to run, where to edit content, how to add photos, how to deploy to Vercel)
12. Run `npm run build` and `npm run lint`. Fix every error. Then review the checklist below.

**Done means all of these are true**
- [ ] Every route in Section 5 exists and renders without errors
- [ ] The hero shows three overlapping, dash-ringed circular photo slots with the single orchestrated reveal, and static final state under reduced motion
- [ ] Crimson appears only on action buttons and the crimson ring
- [ ] No all-caps eyebrow labels, no single-word headline accents, no identical-card grids, no fade-up-on-scroll sections
- [ ] The mega menu, mobile sheet, search dialog, tabs and accordions are keyboard operable
- [ ] The programme filter works, updates the URL, and announces result counts
- [ ] The contact form validates on client and server and shows the success state
- [ ] Empty-data sections are hidden, not shown as "TBC"
- [ ] Sample content is badged; no invented facts exist anywhere
- [ ] `CONTENT_TODO.md` and `README.md` are present and accurate
- [ ] `npm run build` and `npm run lint` pass with no errors
- [ ] Layout is clean at 360px and 1440px with no horizontal scroll

---

## 11. Do not

- Do not use a template look: generic gradient hero, identical rounded cards with the same soft shadow, stock photography, emoji as icons
- Do not centre-align body text or use centred hero layouts
- Do not add a dark theme, cookie banner, chatbot or popup in v1
- Do not add autoplaying carousels, video backgrounds or scroll-jacking
- Do not use `localStorage`. The only browser storage is `sessionStorage` for dismissing the announcement bar (inside try/catch)
- Do not hard-code copy inside components; read from `content/`
- Do not claim anything about the school that Section 1 and the seed data do not support
