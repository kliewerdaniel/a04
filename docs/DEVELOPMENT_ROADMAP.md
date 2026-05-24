# Development Roadmap

## Overview

The rebuild is organized into six phases. Each phase produces a deployable, production-quality increment. No phase depends on future phases — the site is launchable after Phase 2.

## Phase 1: Foundation

**Duration:** 3–5 days
**Goal:** Scaffolded Next.js project with design system, layout shell, and blog rendering

### Deliverables
- Next.js App Router project with TypeScript strict mode
- Tailwind CSS configuration with design tokens (colors, spacing, typography)
- Dark/light theme toggle (next-themes)
- Global layout shell (navigation + footer)
- shadcn/ui installation and base component customization
- MDX blog rendering pipeline (gray-matter + rehype + remark)
- Blog listing page (`/blog`) with all old posts migrated
- Blog post page (`/blog/[slug]`) with proper typography
- Sitemap generation (dynamic, from blog posts)
- RSS feed generation
- 404 page
- Vercel deployment configuration
- SEO metadata configuration (generateMetadata pattern)

### Key Files Created
```
src/app/layout.tsx
src/app/page.tsx (placeholder)
src/app/blog/page.tsx
src/app/blog/[slug]/page.tsx
src/app/not-found.tsx
src/components/layout/header.tsx
src/components/layout/footer.tsx
src/components/layout/theme-toggle.tsx
src/lib/blog.ts
src/lib/mdx.ts
src/app/sitemap.ts
src/app/feed.xml/route.ts
src/styles/globals.css
tailwind.config.ts
```

### Risks
- Old blog posts may have inconsistent frontmatter — need validation
- Some old posts use custom HTML/MDX that may not render cleanly
- Image paths from old posts need mapping to new `/public` structure

## Phase 2: Core Pages

**Duration:** 4–7 days
**Goal:** All primary marketing pages built and styled

### Deliverables
- **Homepage** — Hero, service cards, case study preview, blog preview, metrics, CTAs
- **Services page** — Full service descriptions, pricing, process visualization
- **Case studies page** — Filterable case study grid with individual pages
- **About page** — Bio, philosophy, approach, timeline
- **Contact page** — Form with validation, Calendly embed
- **Resources page** — Lead magnet download cards
- All pages responsive and animated (motion/react)

### Key Patterns
- Server Components by default, Client Components only for interactivity
- Framer Motion (motion/react) for page transitions and scroll animations
- Consistent CTA placement across all pages
- Schema.org structured data on every page

### Key Files Created
```
src/app/page.tsx (full implementation)
src/app/services/page.tsx
src/app/case-studies/page.tsx
src/app/case-studies/[slug]/page.tsx
src/app/about/page.tsx
src/app/contact/page.tsx
src/app/resources/page.tsx
src/components/sections/hero.tsx
src/components/sections/services-grid.tsx
src/components/sections/case-study-card.tsx
src/components/sections/metrics-bar.tsx
src/components/sections/cta-section.tsx
src/components/sections/testimonial-block.tsx
src/components/forms/contact-form.tsx
src/lib/constants.ts
src/lib/metadata.ts
```

### Risks
- Homepage design iteration could extend timeline — lock design after 2 rounds
- Calendly embed may need styling to match dark/light theme
- Form validation with Zod + react-hook-form needs thorough testing

## Phase 3: Blog Redesign

**Duration:** 3–5 days
**Goal:** Enhanced blog experience with category system, search, reading time, related posts

### Deliverables
- Category-based blog organization (tags → categories)
- Blog search (client-side, fuzzy)
- Reading time estimation
- Table of contents generation for long posts
- Related posts (tag-based recommendation)
- Series support (sequential posts grouped)
- Code block styling (syntax highlighting)
- Image optimization (next/image)
- Social share buttons
- Newsletter signup embedded in blog posts

### Key Files Created
```
src/components/blog/blog-card.tsx
src/components/blog/blog-layout.tsx
src/components/blog/table-of-contents.tsx
src/components/blog/related-posts.tsx
src/components/blog/category-filter.tsx
src/components/blog/search-bar.tsx
src/components/blog/newsletter-embed.tsx
src/components/blog/social-share.tsx
src/lib/categories.ts
src/lib/search.ts
```

### Risks
- Search indexing of 120+ posts may cause build slowdown — consider client-side search
- Old posts have inconsistent tagging — manual cleanup may be needed
- Table of contents for 3000+ line posts needs scroll-spy optimization

## Phase 4: Conversion Systems

**Duration:** 3–5 days
**Goal:** Lead generation infrastructure, email capture, CRM integration

### Deliverables
- Email capture forms (blog embed, footer, resources, popover)
- Lead magnet delivery (email autoresponder via Resend)
- Contact form → CRM pipeline (HubSpot / manual CRM)
- Calendly consultation booking flow
- Download tracking with analytics events
- Abandoned form recovery (email reminder)
- GDPR-compliant privacy controls
- Form analytics (submission rate, abandonment)

### Key Files Created
```
src/components/forms/email-capture.tsx
src/components/forms/lead-magnet-form.tsx
src/components/forms/consultation-booking.tsx
src/app/api/subscribe/route.ts
src/app/api/contact/route.ts
src/app/api/download/route.ts
src/lib/email.ts
src/lib/crm.ts
src/lib/analytics.ts
```

### Risks
- Email deliverability requires proper SPF/DKIM/DMARC setup
- CRM integration may need manual CSV export initially
- Form spammers — need rate limiting and CAPTCHA (honeypot fields)

## Phase 5: Monetization

**Duration:** 4–7 days
**Goal:** Digital product storefront, payment processing, purchase flows

### Deliverables
- Product listing page (shop/resources)
- Individual product page with detailed description
- Stripe / LemonSqueezy integration for payment processing
- Secure download delivery after purchase
- License key generation (if applicable)
- Receipt/invoice generation
- Purchase confirmation email sequence
- Bundle/packaging system
- Affiliate tracking (future)

### Key Files Created
```
src/app/shop/page.tsx
src/app/shop/[slug]/page.tsx
src/app/api/checkout/route.ts
src/app/api/webhook/route.ts
src/components/shop/product-card.tsx
src/components/shop/pricing-table.tsx
src/components/shop/purchase-button.tsx
src/lib/stripe.ts
src/lib/products.ts
```

### Risks
- Payment processing requires PCI-compliant implementation (Stripe handles this)
- Digital product delivery must be reliable — test thoroughly
- Tax handling (VAT, sales tax) requires Stripe Tax or manual calculation
- Refund policy must be clear and legally reviewed

## Phase 6: Advanced Features

**Duration:** 5–10 days
**Goal:** Interactive systems, knowledge graph, AI chat, lab environment

### Deliverables
- **Lab page** — Interactive AI demos (knowledge graph, chat, architecture explorer)
- **Knowledge Graph** — 3D visualization of blog content relationships (react-force-graph-3d)
- **AI Chat** — Local LLM integration for blog Q&A (optional: Vercel AI SDK)
- **Architecture Explorer** — Interactive system diagrams
- **Search** — Full-text search across all content (client-side or Meilisearch)
- **Analytics dashboard** — Public metrics / blog statistics
- **API routes** — Public API for blog content (future use)
- **Performance optimization** — Lighthouse score optimization, Core Web Vitals

### Key Files Created
```
src/app/lab/page.tsx
src/app/lab/knowledge-graph/page.tsx
src/app/lab/chat/page.tsx
src/app/lab/architecture/page.tsx
src/app/api/search/route.ts
src/app/api/posts/route.ts
src/components/lab/knowledge-graph.tsx
src/components/lab/chat-interface.tsx
src/components/lab/architecture-viewer.tsx
src/lib/embeddings.ts
src/lib/search-fulltext.ts
```

### Risks
- 3D knowledge graph is computationally heavy — lazy load, fallback for mobile
- AI chat requires running local LLM or API key — design for graceful fallback
- Architecture explorer is custom work — scope carefully
- Lab features should not degrade overall site performance (code splitting)

## Post-Launch Maintenance

| Frequency | Activity |
|---|---|
| Weekly | Publish 1 new blog post, share on social |
| Monthly | Review analytics, optimize top pages, update SEO |
| Quarterly | Content audit, update case studies, refresh homepage |
| As needed | Bug fixes, dependency updates, performance optimization |
| Pre-planned | Seasonal promotions, product launches, course cohorts |

## Dependencies Graph

```
Phase 1 (Foundation)
    │
    ▼
Phase 2 (Core Pages) ──→ Phase 3 (Blog Redesign)
    │                         │
    ▼                         ▼
Phase 4 (Conversion) ←────────┘
    │
    ▼
Phase 5 (Monetization)
    │
    ▼
Phase 6 (Advanced)
```

Phase 2 and Phase 3 can be worked in parallel if needed.
Phase 4 depends on Phase 2 (needs contact page) and Phase 3 (needs blog newsletter embed).
Phase 5 depends on Phase 4 (needs email infrastructure for purchase receipts).
Phase 6 depends on all previous phases for full content integration.
