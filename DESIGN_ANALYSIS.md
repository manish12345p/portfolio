# Design Analysis: Reference Sites Study

This document details the architectural and aesthetic breakdown of the two reference websites:
1. **[Get-Daffed](https://www.get-daffed.com/)** (`daffed-*`)
2. **[Douglus.co](https://douglus.co/)** (`douglus-*`)

All captured screenshots and raw asset analyses reside in [`/design-reference/`](file:///c:/Users/manis/OneDrive/Desktop/portfolio/design-reference/).

---

## 1. Reference Site 1: Get-Daffed (https://www.get-daffed.com/)

### 1.1 Section Order & Layout Architecture
- **Header**: Fixed, minimalist top bar with brand mark ("Get Daffed"), compact text links ("Work", "How I work", "About", "Contact"), and status pill.
- **Hero**: Clean typographic introduction with subtitle, year ("2026"), and directional indicator ("Scroll ↓").
- **Intro / Mission**: 3-line punchy ethos ("Designer by training. Marketer by trade. Builder by habit.") followed by two narrative paragraphs with high tracking and comfortable line height.
- **Now / Current Focus**: Highlights active role and context ("Head of Marketing at Advanced Biomedical Concept since Jan 2026").
- **Selected Work (Project List)**:
  - Clean two-column / single-column responsive list.
  - Each item displays: Client/Title in bold, followed by a concise 1–2 sentence narrative summary.
  - Hover triggers an underlined transition and subtle opacity change.
- **Case-Study Structure (e.g. `/work/abc-brand-and-digital/`)**:
  1. *Hero Proposition*: Large editorial H1 statement (e.g., "Building a medtech brand from the inside").
  2. *Metadata Grid*: 4-column breakdown — Role, Timeline/Year, Tech/Deliverables, Team/Client, Live link.
  3. *Problem*: Context, background, friction points, why the project matters.
  4. *Craft & Architecture*: Deep dive into implementation, architectural choices, and technical execution.
  5. *Key Pillars*: 3 structured thematic modules with bold takeaways.
  6. *Visual Gallery / Interactive Showcase*: Media embeds with subtle rounded frames and caption labels.
  7. *Outcomes & Impact*: Concrete verified metrics (e.g. live service counts, conversion boosts, defect reductions).
  8. *Navigation & Code*: Direct links to repos and live deployments.
- **Footer**: Colophon, direct email trigger, social links, location statement ("Based in Europe"), and copyright mark.

### 1.2 Color System (Original Reference)
- Background: `#fbfaf8` (Warm natural paper off-white)
- Body Text: `#161616` (Near black, softened)
- Muted Text: `#686866` (Subtle graphite)
- Border / Dividers: `rgba(22, 22, 22, 0.08)`
- Accent / Pill: `#161616` with inverted text

### 1.3 Typography & Sizing
- Font Family: High-end humanist sans-serif (`-apple-system`, `BlinkMacSystemFont`, `Inter`, `system-ui`) with editorial grotesque titling.
- Hero Title: `clamp(2rem, 5vw, 4.25rem)` with `line-height: 1.1` and `-0.02em` letter-spacing.
- Body Copy: `1.0625rem` (`17px`), `line-height: 1.6`, font-weight 400.
- Micro Labels / Tags: `0.75rem` (`12px`), uppercase with `0.06em` tracking.

### 1.4 The CV Feature ("psst" & Resume Drawer) — In-Depth Specification
- **Trigger Element (`cvtab` & `floater`)**:
  - A fixed trigger tab placed unobtrusively on the screen edge (with a playful "psst" micro-badge).
  - Hover/focus triggers preloading of the CV resources.
  - Collision-detection logic: shifts (`is-dodge`) if overlapping primary interactive elements or headings during scroll.
- **Overlay Drawer (`<dialog class="cvd">`)**:
  - Modal container with backdrop blur and dimmed background overlay.
  - Page scroll lock: Adds `cvd-open` class to `<html>` and sets `overflow: hidden` on `<body>` to prevent background drift.
  - Visual presentation: Displays high-fidelity, optimized page renders (rendered as WebP page images) within a document stage with subtle page drop-shadows.
  - Action Controls:
    - Primary "Download PDF" CTA button pinned at the header/footer of the modal.
    - Dedicated close button (`✕`) at the top right.
  - Keyboard & Event Handling:
    - Native `Escape` key closes the dialog immediately.
    - Clicking the backdrop outside the paper sheet closes the drawer.
    - Focus is trapped inside the dialog while open, and restored to the trigger element upon closing (`preventScroll: true`).
  - Mobile Behavior:
    - Automatically shifts from side-drawer to full-screen slide-up sheet on screens `< 768px`.
    - Touch scroll enabled inside the paper viewer with horizontal centering.

---

## 2. Reference Site 2: Douglus.co (https://douglus.co/)

### 2.1 Motion & Atmosphere Breakdown
- **0 to 100% Preloader**:
  - Full-screen cover (`position: fixed; inset: 0; z-index: 2000`).
  - Dark container (`#1e1e1e`) with clean white typographic counter (`0%` to `100%`).
  - Animated thin progress line (`--preloader-bar`) tracking the numerical counter.
  - Subtle multi-fragment silhouette/artwork SVG that reveals dynamically.
  - Exit Animation: Vertical curtain split / upward wipe band revealing the off-white hero underneath.
- **Oversized Split Name Hero**:
  - H1 headline split across two lines/words (e.g. `MANISH` and `CHANDRA MAITY`).
  - First letter of each word uses an oversized editorial display serif glyph (`font-rox` styling), while the remainder of the word slides in from an overflow-hidden mask (`home-hero__rest-mask`).
  - Dynamic positioning: words justify to opposite screen bounds (left/right) creating editorial balance around the central whitespace.
  - Subtitle narrative revealed via sliding line masks (`text-reveal-mask`).
- **"Layout: Fine / Bold" Dual Engine Toggle**:
  - Header / Hero control: `Layout: Fine / Bold`.
  - **Fine Mode (Editorial)**:
    - Background: Warm off-white (`#fefff8`).
    - Typography: High-contrast dark typography, elegant serif display accents, delicate 1px hairline dividers, generous breathing space.
  - **Bold Mode (Brutalism)**:
    - Background: Rich deep dark tone (`#1e1e1e`).
    - Typography: Heavyweight condensed uppercase display banners, stark high-contrast typography, structural grid borders, bold impact tags.
  - Smooth instantaneous theme class transition without layout shifting.
- **Full-Screen Menu Overlay**:
  - Fixed full-screen takeover with frosted backdrop (`rgba(30, 30, 30, 0.95)`).
  - Left Stage: Dynamic preview display featuring an abstract geometric shape image and 3 changing thematic taglines (e.g. "Connect", "Collab", "Talk") that update as the user hovers over different navigation items.
  - Right Stage: Monumental navigation links (`Home`, `Works`, `About`, `Contact`) with oversized typography (`clamp(3.25rem, 6vw, 6rem)`). Each link features a custom display serif initial letter and a hover slide-in indicator dot.
  - Bottom Panel: Quick contact emails, telephone, location status, and interactive status dots.
  - Entrance: Cascading staggered fade-and-slide from bottom.
- **Page Transitions**:
  - Smooth Barba-style swipe/fade curtain that sweeps across the viewport on navigation, preventing white flashes.

### 2.2 Color System (Original Reference)
- Off-white (Fine Mode): `#fefff8`
- Dark Background (Bold Mode / Preloader / Menu): `#1e1e1e`
- Dark Neutral Text: `#292724`
- Muted Grey / Hairlines: `#ebebeb`
- Pure White Accents: `#ffffff`

---

## 3. The Synthesis: Unified Design System & Green Palette

As requested, we discard the reference sites' monochrome palettes and integrate the user's signature **Green Forest Palette** across both Fine and Bold layouts.

### 3.1 Color Palette Tokens & Semantic Mapping

| Token Name | Hex Code | Visual Swatch | Semantic Role | Contrast Rules |
|---|---|---|---|---|
| `--color-dark-primary` | `#344E41` | Brunswick Green | Main body text in Fine mode; Background in Bold mode; Footers | White or `#F6F8F1` text on top |
| `--color-dark-secondary` | `#3A5A40` | Hunter Green | Full-screen menu overlay; Card surfaces in Bold mode; Hover states | White or `#F6F8F1` text on top |
| `--color-mid-tone` | `#588157` | Fern Green | Hairline borders, metadata tags, secondary buttons, icons | White text on top; `#F6F8F1` background |
| `--color-accent` | `#5A9F68` | Shamrock Green | Primary buttons, active state indicators, hover highlights | **Dark text (`#344E41`) for small text**; White text for large bold headings |
| `--color-light-accent` | `#BBD58E` | Pistachio | Preloader counter, "psst" CV trigger badge, active pill fills | **Always dark text (`#344E41`)** (High contrast) |
| `--color-bg-light` | `#F6F8F1` | Warm Off-White | Default background for Fine mode; Card surfaces in Fine mode | Dark `#344E41` text |

### 3.2 Fine vs. Bold Theme Matrix

```css
/* Fine Mode (Editorial) */
:root[data-theme="fine"] {
  --bg-primary: #F6F8F1;
  --bg-surface: #FFFFFF;
  --text-primary: #344E41;
  --text-secondary: #588157;
  --border-color: rgba(52, 78, 65, 0.15);
  --accent: #5A9F68;
  --pill-bg: #BBD58E;
  --pill-text: #344E41;
}

/* Bold Mode (Brutalist) */
:root[data-theme="bold"] {
  --bg-primary: #344E41;
  --bg-surface: #3A5A40;
  --text-primary: #F6F8F1;
  --text-secondary: #BBD58E;
  --border-color: rgba(187, 213, 142, 0.25);
  --accent: #BBD58E;
  --pill-bg: #5A9F68;
  --pill-text: #F6F8F1;
}
```

### 3.3 Visual Asset Strategy (Original & Tailored)
- Zero copied assets from reference websites.
- Custom SVG geometric shapes for the menu hover previews:
  - *Projects / Works*: Dynamic 3D wireframe polyhedra rendered in `#5A9F68` and `#BBD58E`.
  - *About*: Sculptural abstract organic curve.
  - *Contact*: Concentric pulsing signal rings.
- Custom resume page renders converted directly from the verified `/public/docs/Manish-Chandra-Maity-Resume.pdf`.

