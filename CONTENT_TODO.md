# Content & Assets To-Do Checklist (The Gateway Polytechnic, Saapade)

This document itemises every asset, verified figure, and institutional detail that requires confirmation or provision by **The Gateway Polytechnic, Saapade** before production deployment.

---

## 1. Brand Identity
- [ ] **Official Logo Vector**: Supply official vector file (`logo.svg`) to place in `/public/brand/logo.svg` to replace the inline SVG approximation in `src/components/brand/Logo.tsx`.
- [ ] **Colour Token Verification**: Confirm brand crimson (`#B01E2E`), navy (`#1D1D52`), and green (`#14532D` / `#2E9E3F`) hex codes against official brand style guides.
- [ ] **Display Wordmark**: Confirm exact naming hierarchy between "The Gateway Polytechnic, Saapade" and "Gateway ICT Polytechnic Saapade".

---

## 2. Contact Details & Official URLs (`src/content/site.ts`)
- [ ] **Postal Address**: Confirm full official postal address (currently placeholder: `"Saapade, Ogun State, Nigeria"`).
- [ ] **Official Admissions Email**: Replace placeholder (`admissions@example.com`) with the institutional admissions email address.
- [ ] **Official Telephone Numbers**: Replace placeholder (`+234 000 000 0000`) with working admissions telephone / desk numbers.
- [ ] **Office Operating Hours**: Provide official operating hours (e.g., "Monday – Friday: 8:00 AM – 4:00 PM") in `site.contact.hours`.
- [ ] **Admissions Application Portal URL**: Update `site.applyUrl` with the live student application link (currently `"https://example.com/apply"`).
- [ ] **Student Portal URL**: Update `site.portalUrl` with the live student management portal link (currently `"https://example.com/portal"`).
- [ ] **Social Media Channels**: Provide verified links for official Facebook, X (Twitter), Instagram, LinkedIn, and YouTube in `site.social`.

---

## 3. Admissions & Academic Calendar (`src/content/site.ts`)
- [ ] **Active Academic Session**: Populate `site.admissions.session` with the current admissions session (e.g., `"2026/2027"`).
- [ ] **Admissions Status Toggle**: Set `site.admissions.open` to `true` or `false` based on current admission cycles.
- [ ] **Important Academic & Admission Dates**: Populate `site.admissions.dates` array with verified application deadlines, screening schedules, and resumption dates.
- [ ] **Fee Schedules**: Populate `site.admissions.fees` array with approved school fees, acceptance fees, or screening charges once officially released.
- [ ] **Entry Requirements Verification**: Verify default ND and HND O-Level credit combinations, UTME cut-off requirements, and post-ND industrial training guidelines with the Academic Registry.

---

## 4. Academic Programmes (`src/content/programmes.ts`)
- [ ] **Departmental Curricula**: Review the 8 seeded programmes to confirm or refine the draft study areas:
  - [ ] `nd-agricultural-technology`
  - [ ] `nd-cooperative-economics-and-management`
  - [ ] `nd-environmental-science-and-management-technology`
  - [ ] `nd-horticulture-technology`
  - [ ] `nd-social-development`
  - [ ] `hnd-agribusiness-management`
  - [ ] `hnd-crop-production-technology`
  - [ ] `hnd-agricultural-extension-and-management`
- [ ] **Programme Durations & Study Modes**: Confirm whether any programmes offer part-time / weekend streams in addition to full-time study.
- [ ] **Career Directions**: Review and align draft career progression paths with departmental recommendations.

---

## 5. Institutional Leadership & People (`src/content/site.ts`)
- [ ] **Rector's Welcome Address**: Supply the official name, title, high-resolution portrait photograph, and message text for the Rector to enable `site.rector`.
- [ ] **Principal Officers / Management**: Provide the verified list of Principal Officers (Rector, Deputy Rector, Registrar, Bursar, Librarian) and departmental deans for `site.leadership`.
- [ ] **Mission and Vision Statements**: Supply approved institutional mission and vision statements in `site.mission` and `site.vision`.

---

## 6. Regulatory Accreditation & Affiliations (`src/content/site.ts`)
- [ ] **Accreditation Bodies**: List approved programmes and institutional accreditations (e.g. National Board for Technical Education - NBTE) in `site.accreditation`.

---

## 7. Institutional Photography (`src/content/media.ts`)
Place real photographs into `/public/images/` and update the `src` field in `src/content/media.ts` for each slot:
- [ ] `hero.field` (1:1) — Real students conducting practical crop/field exercises
- [ ] `hero.classroom` (1:1) — Real students in lecture theatres or science/technical laboratories
- [ ] `hero.community` (1:1) — Students and faculty conducting agricultural extension or community outreach
- [ ] `welcome.campus` (4:5) — Institutional entrance gate or landmark campus structure
- [ ] `life.practical` (3:2) — Technical workshop or nursery propagation activity
- [ ] `life.digital` (3:2) — Students in computing centres / ICT laboratory
- [ ] `life.community` (3:2) — Extension training session with local farming cooperatives
- [ ] `about.campus` (3:2) — Broad view of campus academic buildings
- [ ] `about.rector` (4:5) — Formal official portrait of the Rector
- [ ] `gallery.1` to `gallery.6` — Authentic student life, sporting activities, exhibitions, and matriculation moments
- [ ] `news.default` (3:2) — Default high-resolution campus photo for news bulletins
- [ ] `alumni.1` to `alumni.3` (1:1) — Authentic square portrait photography of graduates in Agricultural Technology, Cooperative Economics, and Environmental Science

---

## 8. News and Notices (`src/content/news.ts`)
- [ ] **Replace Seed Bulletins**: Replace the 4 placeholder items (`sample: true`) with genuine news bulletins, rectorate memos, and event announcements.
- [ ] **Sample Badges**: Once real articles are added, remove `sample: true` from the news items or set `NEXT_PUBLIC_SHOW_SAMPLE_BADGES=false` in environment variables.

---

## 9. Legal & Policies (`src/app/privacy/page.tsx`)
- [ ] **Institutional Privacy Policy**: Review and replace the draft website enquiry privacy notice with the polytechnic's legal data protection statement.

---

## 10. Alumni Success & Testimonials (`src/content/testimonials.ts`)
- [ ] **Graduate Profiles**: Collect verified names, graduation cohorts, programme titles, current job titles, and employing organisations for featured alumni.
- [ ] **Direct Quotes**: Obtain approved direct quotes detailing how hands-on polytechnic coursework prepared graduates for their careers.
- [ ] **Consent**: Ensure written media consent is obtained from graduates before publishing real names and portrait photographs.
- [ ] **Remove Sample Badges**: Once verified, set `sample: false` in `src/content/testimonials.ts`.

---

## 11. Hero 3-Ring Drone / Field Video Loop (Optional) (`src/content/media.ts`)
- [ ] **Video Asset**: Place an optimized, 5-second looping video file in `/public/videos/` (e.g. `/public/videos/campus-loop.mp4`).
- [ ] **Encoding Parameters**:
  - Format: MP4 (H.264 / AAC) and/or WebM (VP9).
  - Duration: 4 to 6 seconds maximum (seamless loop).
  - Target File Size: Under 1.5MB to ensure fast loading on mobile/limited data connections.
  - Audio: Must be exported without audio track (muted).
  - Framing: 1:1 square crop or center-focused subject to fit circular mask.
- [ ] **Update Configuration**: Set `heroVideo.src = "/videos/campus-loop.mp4"` in `src/content/media.ts`.
