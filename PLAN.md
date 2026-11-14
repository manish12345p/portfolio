# Implementation Plan: Manish Chandra Maity Portfolio Rebuild

## 1. Executive Summary & Design Synthesis

This rebuild seamlessly marries the high-motion editorial sophistication of **Douglus.co** with the tactile, utility-first clarity of **Get-Daffed.com**, unified under a bespoke **Forest Green Palette**:
- **From Douglus.co**:
  - Full-screen `0% → 100%` numerical preloader with split-curtain exit animation.
  - Oversized typographic hero with split name (`MANISH` / `CHANDRA MAITY`) utilizing display serif drop-caps and masked text reveals.
  - Interactive **Layout: Fine / Bold** toggle that flips the site from an airy, editorial warm-paper aesthetic (`#F6F8F1`) to a deep, dark brutalist green theme (`#344E41`).
  - Full-screen menu overlay featuring dynamic geometric artwork and 3-word rotating taglines per navigation destination.
  - Seamless curtain page transitions.
- **From Get-Daffed.com**:
  - Signature **CV Feature**: A subtle, playful "psst" floating badge on the edge + a dedicated CV button in the navbar that triggers an accessible slide-in CV drawer displaying high-resolution WebP resume pages, a prominent PDF download button, ESC/click-outside dismissals, and background scroll locking.
  - **Project & Case Study Structure**: Narrative problem-craft-outcome breakdown, high-density metadata bars (role, tech, client, timeline), and verified impact metrics.
- **Originality & Green Palette Rule**: Zero copied shapes or text. All colors adhere to the designated green tokens: `#344E41`, `#3A5A40`, `#588157`, `#5A9F68`, `#BBD58E`, and `#F6F8F1`.

---

## 2. Recommended Tech Stack & Justification

1. **Next.js 15+ App Router**: Delivers best-in-class performance with server-rendered static generation, zero runtime layout shift, and instant Vercel edge deployment.
2. **Tailwind CSS v4 with CSS Variables**: Enforces a strict token-driven design system enabling zero-overhead switching between Fine (light) and Bold (dark green) themes.
3. **Framer Motion**: Powers the 0–100% preloader, curtain page wipes, staggered menu reveals, and fluid mask animations with native 60fps hardware acceleration.
4. **Accessible React Dialog Modal**: Delivers a rock-solid CV drawer with scroll-locking, focus trapping, Escape dismissal, and responsive mobile adaptation.
5. **Single-Source Data Architecture**: Centralizes all resume facts, experiences, projects, hackathons, and contact details in `src/data/portfolioData.ts`, enabling instant content updates without touching JSX.

---

## 3. Folder Structure

```
portfolio/
├── design-reference/              # Verified screenshots and scraped reference data
├── public/
│   ├── docs/                     # Verified user PDFs
│   │   ├── BuildWithBharat-4.0-Certificate.pdf
│   │   ├── CodeFarming-Certificate.pdf
│   │   ├── Manish-Chandra-Maity-Resume.pdf
│   │   ├── MedSure-AI-Presentation.pdf
│   │   └── Vivekananda-Hackathon-Certificate.pdf
│   ├── resume/                   # Optimized WebP resume page images for the CV drawer
│   │   ├── page-1.webp
│   │   └── page-2.webp
│   └── shapes/                   # Original SVG geometric artwork for menu previews
│       ├── shape-projects.svg
│       ├── shape-about.svg
│       └── shape-contact.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Theme provider, preloader mount, font definitions
│   │   ├── page.tsx              # Home: Hero, Experience, Projects, Hackathons, Contact
│   │   ├── projects/[slug]/      # Case study detail pages (Dashmesh, QueuelessBharat, etc.)
│   │   └── globals.css           # Green design tokens, Fine/Bold themes, mask utilities
│   ├── components/
│   │   ├── cv/                   # CV "psst" trigger, modal drawer, and WebP viewer
│   │   │   ├── CvDrawer.tsx
│   │   │   ├── CvFloater.tsx
│   │   │   └── CvViewer.tsx
│   │   ├── layout/               # Header, LayoutToggle, FullscreenMenu, Footer
│   │   │   ├── Header.tsx
│   │   │   ├── LayoutToggle.tsx
│   │   │   ├── FullscreenMenu.tsx
│   │   │   ├── Preloader.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/             # Modular homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── HackathonsSection.tsx
│   │   │   ├── EducationSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── ui/                   # Buttons, tags, cards, modal triggers
│   │       ├── Button.tsx
│   │       ├── Tag.tsx
│   │       └── Card.tsx
│   ├── data/
│   │   └── portfolioData.ts      # UNIFIED DATA FILE (All content strictly isolated here)
│   └── context/
│       └── ThemeContext.tsx      # Fine / Bold state controller
├── DESIGN_ANALYSIS.md            # Reference site teardown
└── PLAN.md                       # This plan
```

---

## 4. Pages & Section Architecture

### 4.1 Master Single-Page Experience (`/`)
1. **Interactive Preloader**: 0% to 100% animated counter on `#344E41` background, revealing the site via a split curtain wipe.
2. **Fixed Header**: Logo ("MCM / Manish"), Layout Switcher (`Fine / Bold`), "CV (psst)" trigger button, and Full-Screen Menu trigger (`Menu ☰`).
3. **Hero Section**:
   - Oversized split name: `MANISH` (left-aligned) & `CHANDRA MAITY` (right-aligned) with custom serif display initials and masked sliding text.
   - Subtitle: `B.Tech CSE (AI) Student | Flutter Developer | Delhi NCR`.
   - Goal statement: *"Seeking a Flutter developer internship where I can keep building production software."*
   - Scroll indicator arrow (`Scroll ↓`).
4. **Summary & Current Focus ("Now")**:
   - 3-line statement highlighting BLoC, clean architecture, and production mindset.
   - Narrative of active projects, 1,500+ client service visits, and Play Store achievements.
5. **Technical Skills Grid**:
   - Languages: Dart, Python, Java, C, SQL.
   - Flutter Ecosystem: BLoC, Clean Architecture, SOLID, Freezed, very_good_cli, package structure.
   - Frameworks: FastAPI, aiogram, Next.js & React.
   - Backend & QA: Firebase, Supabase, REST APIs (CRUD), manual QA.
   - Tools: Git/GitHub, Vercel, FileZilla, prompt engineering.
6. **Experience Section (StuckNot)**:
   - Timeline: Dec 2024 to Present (Flutter Developer Intern → Engineer Intern → Freelance Developer).
   - High-density cards for:
     - StuckNot App (Google Play, BLoC).
     - StuckNot Admin App (Sample-paper PDF management).
     - Baani.Net Live Gurbani Kirtan (100K+ downloads restoration).
     - StuckNot Website v2 (React.js UI).
     - CampusMaster College ERP (12 modules QA, 60+ logged defects).
     - StuckNot Studio AI Carousel Generator (Gemini-powered).
7. **Featured Projects Section**:
   - **Dashmesh Mechanix** (Client CRM, 1,500+ visits, BLoC + Supabase, EMI module sync).
   - **QueuelessBharat** (Emergency Hospital Finder, Next.js + Vercel, Build With Bharat 4.0).
   - **SnackTrack** (Team Flutter app, Clean Architecture, Login/Signup).
   - **Other Projects Grid**: To-do App (FastAPI), Telegram Bot (aiogram + OpenAI), User Details API.
8. **Hackathons & Achievements Section**:
   - Build With Bharat 4.0 (The Malwares) → Direct download link: `/docs/BuildWithBharat-4.0-Certificate.pdf`.
   - Vivekananda Innovation Hackathon 2026 (DTU) → Direct download link: `/docs/Vivekananda-Hackathon-Certificate.pdf`.
   - EY Techathon 6.0 (Bug Hunters, MedSure AI) → Direct view deck link: `/docs/MedSure-AI-Presentation.pdf`.
   - Code Farming 24-hr Code-a-thon → Direct download link: `/docs/CodeFarming-Certificate.pdf`.
   - Smart India Hackathon 2025 & 2026 (SIH25032, SIH26184) → Clean card without download link.
9. **Education Section**:
   - KCC Institute of Technology & Management (AKTU) — B.Tech CSE (AI) [2024 – 2028].
   - Vinay Nagar Bengali Senior Secondary School — Class XII [2022 – 2023].
10. **Contact & Footer Section**:
    - Direct email CTA (`manishmaity39@gmail.com`).
    - Social links: LinkedIn, GitHub.
    - Colophon, time status, and back-to-top button.

### 4.2 Dedicated Case-Study Modals / Subpages (`/projects/[slug]`)
- Comprehensive case studies for **Dashmesh Mechanix** and **QueuelessBharat** following Get-Daffed's 4-tier model:
  *Proposition → Problem & Context → Technical Craft & BLoC Architecture → Real-World Outcomes & Repos*.

### 4.3 CV Feature (Trigger & Drawer)
- Fixed corner pill with bouncing "psst" label.
- Header "CV" button.
- Clicking either opens the `<dialog>` drawer containing:
  - Header with title "Manish Chandra Maity — Curriculum Vitae" + download CTA (`/docs/Manish-Chandra-Maity-Resume.pdf`).
  - High-res crisp WebP rendered sheets of the resume pages.
  - Backdrop blur, background scroll freeze, and Escape/Outside-click dismissal.

---

## 5. Numbered Build Order & Verification Checklists

### Step 1: Design Tokens, Typography & Data Centralization
- [ ] Create `src/data/portfolioData.ts` containing 100% of user data with strict typing.
- [ ] Configure Tailwind CSS v4 and `globals.css` with the 6 green palette tokens (`#344E41`, `#3A5A40`, `#588157`, `#5A9F68`, `#BBD58E`, `#F6F8F1`).
- [ ] Implement `ThemeContext.tsx` supporting instantaneous `fine` (light) and `bold` (dark) theme switches.
- **Verification**: Browser check theme tokens, contrast ratios, and verify data file exports.

### Step 2: Preloader & Full-Screen Navigation Menu
- [ ] Build the `Preloader.tsx` component with `0 → 100%` numerical animation and split curtain reveal.
- [ ] Build `Header.tsx` with logo, `LayoutToggle.tsx` (Fine/Bold), CV link, and Menu button.
- [ ] Build `FullscreenMenu.tsx` overlay with animated geometric shape previews and 3 taglines per page link.
- **Verification**: Refresh page to view smooth preloader, test Fine/Bold toggle, and open/close menu on desktop and mobile.

### Step 3: Hero Section & About / "Now" Focus
- [ ] Build `HeroSection.tsx` with oversized split name (`MANISH` / `CHANDRA MAITY`), display drop-caps, and sliding mask text.
- [ ] Implement fine vs. bold hero variants (editorial typography vs. brutalist impact).
- [ ] Build `AboutSection.tsx` ("Now" narrative, 1,500+ service visits, engineering mindset).
- **Verification**: Test hero responsive layout from 375px to 1920px; verify text alignment and mask animations.

### Step 4: Technical Skills & Experience Section
- [ ] Build `SkillsSection.tsx` showcasing languages, Flutter/BLoC ecosystem, frameworks, and testing tools.
- [ ] Build `ExperienceSection.tsx` showcasing StuckNot career progression and detailed project cards (StuckNot App, Admin App, Baani.Net, CampusMaster ERP QA, StuckNot Studio).
- **Verification**: Inspect card readability in both Fine and Bold modes; verify QA defect metrics and Play Store highlights.

### Step 5: Projects & Case-Study Architecture
- [ ] Build `ProjectsSection.tsx` with rich cards for Dashmesh Mechanix, QueuelessBharat, and SnackTrack.
- [ ] Implement secondary project grid (To-do App, Telegram Bot, User Details API) with GitHub links.
- [ ] Implement interactive case-study modal or drawer with Problem-Craft-Outcome narrative.
- **Verification**: Verify repository links open in new tabs with `rel="noopener noreferrer"`.

### Step 6: Hackathons & Education Section
- [ ] Build `HackathonsSection.tsx` with verified download links:
  - Build With Bharat 4.0 (`/docs/BuildWithBharat-4.0-Certificate.pdf`)
  - Vivekananda Innovation Hackathon 2026 (`/docs/Vivekananda-Hackathon-Certificate.pdf`)
  - EY Techathon 6.0 (`/docs/MedSure-AI-Presentation.pdf`)
  - Code Farming (`/docs/CodeFarming-Certificate.pdf`)
  - Smart India Hackathon (clean card, zero broken download links)
- [ ] Build `EducationSection.tsx` (AKTU & Vinay Nagar School).
- **Verification**: Click each hackathon link and confirm direct PDF download/viewing works smoothly.

### Step 7: Contact Section, Footer & Floating Elements
- [ ] Build `ContactSection.tsx` with direct email CTA, location, and social links.
- [ ] Build `Footer.tsx` with colophon and back-to-top button.
- [ ] Verify contact form or direct mailto integration.
- **Verification**: Test all outgoing links and mobile responsiveness.

### Step 8: The Signature CV Feature ("psst" Trigger & WebP Drawer)
- [ ] Generate optimized WebP page renders from `/public/docs/Manish-Chandra-Maity-Resume.pdf` and store in `/public/resume/`.
- [ ] Build `CvFloater.tsx` with floating "psst" pill, collision avoidance, and hover animation.
- [ ] Build `CvDrawer.tsx` utilizing `<dialog>` with backdrop blur, scroll locking, Escape key handler, outside-click handler, and "Download PDF" button.
- [ ] Connect the navbar "CV" button to the same drawer controller.
- **Verification**: Test opening from both floater and navbar; test Escape key, backdrop click, mobile swipe/scroll, and PDF download button.

### Step 9: Responsive Polish, Motion Optimization & SEO
- [ ] Audit touch targets, typography scaling, and padding across 375px, 768px, 1024px, and 1440px viewports.
- [ ] Implement `prefers-reduced-motion` fallbacks for all Framer Motion sequences.
- [ ] Add OpenGraph metadata, title tags, and favicon.
- **Verification**: Run Lighthouse audit and verify 95+ performance, accessibility, and SEO scores.

### Step 10: Production Build & Vercel Deployment Verification
- [ ] Run `npm run build` and ensure zero TypeScript or Lint errors.
- [ ] Test production build locally via `npm run start`.
- [ ] Commit and push to Git for automated Vercel deployment.
- **Verification**: Live smoke test on `https://portfolio-manish-chandra-maityv.vercel.app/` confirming all PDF links, CV drawer, Fine/Bold toggle, and preloader.

---

## 6. Stop Condition

**STOP HERE.** Awaiting user approval of `PLAN.md` before writing any site code.

