# Homepage Specification

## Purpose

The homepage must accomplish four things simultaneously within 5 seconds:
1. Communicate what we do (AI infrastructure consultancy)
2. Establish technical credibility (implicitly, through design and content)
3. Create desire to explore further
4. Provide a clear next action

## Target Audience

- Technical founders evaluating AI consultants
- Engineering leaders looking for AI implementation partners
- CTOs researching local AI deployment
- Returning visitors looking for new content

## Conversion Goals

| Goal | Primary Metric | Secondary Metric |
|---|---|---|
| Book a consultation | CTA click → form submission | Scroll depth |
| Explore services | Services page click | Time on page |
| Read blog | Blog link click | Bounce rate |
| Subscribe to newsletter | Email signup | — |

## Emotional Tone

- **Authoritative:** This is a person who ships production AI systems
- **Approachable:** Technical depth without arrogance
- **Clear:** No jargon without explanation
- **Calm:** Cinematic, not frantic

## Layout Hierarchy

```
┌─────────────────────────────────────────────────┐
│  NAV (sticky, transparent → solid on scroll)     │
│  Logo | Services | Blog | About | Contact        │
├─────────────────────────────────────────────────┤
│                                                   │
│  HERO                                              │
│  ┌─────────────────────────────────────────────┐  │
│  │                                               │  │
│  │  "Local AI Infrastructure.                    │  │
│  │   Production Systems.                        │  │
│  │   Technical Authority."                       │  │
│  │                                               │  │
│  │  [Book a Free Consultation] [View Services]  │  │
│  │                                               │  │
│  │  (subtle animated grid/particle background)  │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
├─ TRUST BAR ───────────────────────────────────────┤
│  Featured in / Used by (logos, minimal)           │
│                                                   │
├─ SERVICES OVERVIEW ───────────────────────────────┤
│  "What I Build"                                    │
│  3-card grid: Knowledge Systems, Automation,       │
│  Local AI Deployment                               │
│  Each card: icon, title, 2-line desc, learn more  │
│                                                   │
├─ FEATURED CASE STUDIES ───────────────────────────┤
│  "Recent Work"                                     │
│  2-3 case study cards with metrics                 │
│  Each: problem → approach → result (with numbers)  │
│                                                   │
├─ METRICS BAR ─────────────────────────────────────┤
│  "By the Numbers"                                  │
│  X years building AI systems                       │
│  Y projects delivered                              │
│  Z% avg. efficiency gain                           │
│  N blog posts (technical content)                  │
│                                                   │
├─ RECENT BLOG ─────────────────────────────────────┤
│  "Latest Writing"                                  │
│  3 recent posts with categories                   │
│  Subtitle: "Deep technical content on AI systems" │
│                                                   │
├─ PHILOSOPHY STRIP ───────────────────────────────┤
│  Single sentence or short paragraph on AI philosophy
│  "I believe AI infrastructure should be owned,     │
│   not rented. Local-first, private, and built      │
│   to last."                                        │
│                                                   │
├─ FINAL CTA ───────────────────────────────────────┤
│  "Ready to Build?"                                 │
│  "Let's talk about your AI infrastructure needs."  │
│  [Book a Free Consultation]                        │
│                                                   │
├─ FOOTER ──────────────────────────────────────────┤
│  Newsletter signup | Social links | Legal          │
│  Navigation repeat | "© Daniel Kliewer"            │
└─────────────────────────────────────────────────┘
```

## Section Specifications

### Hero
- **Height:** 100vh (or 90vh with subtle scroll hint)
- **Headline:** "Local AI Infrastructure. Production Systems. Technical Authority."
- **Subheadline:** 1-2 sentence value proposition
- **CTAs:** Primary (Book Consultation) + Secondary (View Services)
- **Background:** Subtle animated geometric pattern or grid (not distracting, feels technical)
- **Animation:** Text fade-in on load, grid parallax on scroll
- **Mobile:** Stack CTAs vertically, smaller headline

### Trust Bar
- **Content:** Logos of publications/companies (if applicable) or text: "Content featured in / trusted by"
- **Style:** Grayscale, low opacity, no animation
- **Conditional:** Only include if there are credible logos to display
- **Fallback:** Skip section if no trust signals available

### Services Overview
- **Header:** "What I Build"
- **Subtitle:** "Production AI systems for organizations that need control, privacy, and real integration."
- **Cards:** 3 columns desktop, 1 column mobile
- **Each card:** Lucide icon, title, 2-line description, subtle arrow on hover
- **Hover effect:** Card lifts slightly, icon color shifts
- **Bottom link:** "See all services →" linking to /services

### Featured Case Studies
- **Header:** "Recent Work"
- **Subtitle:** "Real systems, real results."
- **Cards:** 2-3 case studies, each showing: client/problem badge, metrics, key technology used
- **CTA:** "View all case studies →"
- **Layout:** Grid or alternating layout, not carousel

### Metrics Bar
- **Numbers:** 3-4 key metrics
  - Projects delivered (e.g., "20+")
  - Years in AI (e.g., "3+")
  - Blog posts (e.g., "120+")
  - Efficiency gains (e.g., "60% avg.")
- **Style:** Large numbers, small labels, centered
- **Animation:** Count-up on scroll into view

### Recent Blog
- **Header:** "Latest Writing"
- **Subtitle:** "Deep technical content on AI systems, local LLMs, and production automation."
- **Cards:** 3 most recent posts
- **Each card:** Title, date, category tag, reading time, 2-line excerpt
- **Layout:** Grid or list, consistent with blog page
- **CTA:** "Read the blog →"

### Philosophy Strip
- **Content:** 1-2 sentence brand philosophy statement
- **Style:** Large italic or serif quote styling, centered
- **Visual:** Could be on a subtly different background color
- **Purpose:** Humanize the technical content, show values

### Final CTA
- **Header:** "Ready to Build?"
- **Body:** "Let's talk about your AI infrastructure needs. Free 30-minute consultation."
- **Button:** Primary style, prominent
- **Bonus:** Add a secondary small text: "No pressure, no pitch. Just a conversation about your needs."

## CTA Strategy

| CTA | Placement | Destination | Design |
|---|---|---|---|
| Book a Free Consultation | Hero (primary) | /contact | Large, filled button |
| View Services | Hero (secondary) | /services | Outlined button |
| See all services | Services section | /services | Text link with arrow |
| View all case studies | Case studies section | /case-studies | Text link with arrow |
| Read the blog | Blog section | /blog | Text link with arrow |
| Book a Free Consultation | Final CTA | /contact | Largest button on page |

## Animations

| Element | Animation | Trigger |
|---|---|---|
| Hero title | Staggered fade-in, letters slide up | Page load |
| Hero grid | Slow parallax, subtle float | Scroll |
| Service cards | Staggered fade-up, lift on hover | Scroll into view |
| Metrics numbers | Count-up animation | Scroll into viewport |
| Case study cards | Fade-in with slight scale | Scroll into view |
| Blog cards | Staggered fade-up | Scroll into view |
| Final CTA | Fade-in | Scroll into view |

## Component Requirements

| Component | Reused On | Props |
|---|---|---|
| HeroSection | Homepage only | headline, subheadline, primaryCTA, secondaryCTA, animationConfig |
| ServiceCardGrid | Homepage, Services | services[], columns, maxItems |
| CaseStudyCard | Homepage, Case Studies | title, metrics, tags, slug, image |
| MetricsBar | Homepage, About | metrics[], animation enabled? |
| BlogCard | Homepage, Blog, Related | post, variant (compact/full) |
| PhilosophyStrip | Homepage only | quote, author |
| CTASection | All pages | headline, body, buttonText, buttonUrl, variant |
| TrustBar | Homepage | logos[] or fallback text |

## SEO Targets

- **Primary keyword:** "AI infrastructure consultant", "local AI consulting"
- **Secondary:** "AI systems engineer", "private AI deployment"
- **Title tag:** "Daniel Kliewer — AI Infrastructure & Systems Engineering"
- **Meta description:** "Local AI infrastructure for organizations that own their stack. Consulting, architecture, and production systems for private AI deployment."
- **H1:** "Local AI Infrastructure. Production Systems. Technical Authority."
- **H2s:** "What I Build", "Recent Work", "By the Numbers", "Latest Writing", "Ready to Build?"

## Mobile Behavior

- Single column layout throughout
- Hero text smaller (text-4xl instead of text-7xl)
- Service cards stack vertically
- Case studies stack vertically
- Metrics bar: 2x2 grid instead of single row
- Blog posts: list instead of grid
- CTAs full-width buttons
- Navigation collapses to hamburger
- Touch targets minimum 44px

## Performance Considerations

- LCP: Hero section must load < 2.5s (optimize background image or use CSS-only pattern)
- CLS: Reserve space for dynamically loaded content (blog, case studies)
- No heavy third-party scripts on load
- Metrics animation uses IntersectionObserver, not scroll libraries
- All images use next/image with proper sizes
- Font display: swap with preload for primary font
