# Phase 2: Core Pages

## Duration: 4–7 days
## Goal: All primary marketing pages built and styled

## Deliverables

### Homepage
- [ ] Hero section with animated headline
- [ ] Services overview (3-card grid)
- [ ] Featured case studies section
- [ ] Metrics bar with count-up animation
- [ ] Recent blog posts (3 cards)
- [ ] Philosophy strip
- [ ] Final CTA section
- [ ] Trust bar (if applicable)

### Services Page
- [ ] Hero with value proposition
- [ ] Process visualization (3-step)
- [ ] Service cards (detailed variant with pricing)
- [ ] Engagement models comparison
- [ ] FAQ accordion
- [ ] Final CTA

### Case Studies Page
- [ ] Case study grid with cards
- [ ] Category filter
- [ ] Individual case study page (dynamic route)

### About Page
- [ ] Profile photo + bio
- [ ] Personal narrative section
- [ ] Philosophy section
- [ ] Timeline
- [ ] Approach section
- [ ] Public presence links
- [ ] CTA

### Contact Page
- [ ] Contact form with validation (react-hook-form + Zod)
- [ ] Calendly integration section
- [ ] Process visualization (what to expect)
- [ ] FAQ

### Resources Page
- [ ] Featured resource (lead magnet)
- [ ] Resource grid (free + paid)
- [ ] Newsletter signup section

### Shared Components
- [ ] All section components built and placed in component library
- [ ] Responsive behavior verified on all pages
- [ ] Animations implemented (fade-in, stagger, scroll)
- [ ] Schema.org structured data on all pages

## Key Components to Build

| Component | Pages | Priority |
|---|---|---|
| HeroSection | Home, Services, Blog, Case Studies | High |
| ServiceCardGrid | Home, Services | High |
| CaseStudyCard | Home, Case Studies | High |
| MetricsBar | Home, About | Medium |
| CTASection | All pages | High |
| BlogCard | Home, Blog | High |
| ContactForm | Contact | High |
| NewsletterSignup | All pages | Medium |
| PhilosophyStrip | Home | Low |
| ProcessVisualization | Services | Medium |
| Timeline | About | Low |

## Risk

| Risk | Mitigation |
|---|---|
| Homepage design iteration exceeds timeline | Lock design after 2 rounds |
| Calendly dark/light theme mismatch | Check Calendly theme customization options |
| Form validation edge cases | Comprehensive Zod schemas + tests |
| Hero animation performance | GPU-composited properties only, respect reduced-motion |
