# Services Page Specification

## Purpose

Convert visitors who know they need AI help into consultation bookings by clearly communicating what we build, how we build it, and what it costs.

## Target Audience

- Technical decision-makers evaluating AI consultants
- Business owners who've tried AI tools and want something more
- Engineering teams that need specialized AI expertise

## Conversion Goals

| Goal | Metric |
|---|---|
| Book consultation | Form submission |
| Understand service scope | Scroll depth, time on page |
| Perceive pricing | Click on pricing section |

## Layout Hierarchy

```
┌─────────────────────────────────────────────────┐
│  NAV                                               │
├─────────────────────────────────────────────────┤
│                                                   │
│  HERO (Services)                                  │
│  "AI Infrastructure, Built to Order"              │
│  "Custom systems for your specific needs."        │
│                                                   │
├─ HOW IT WORKS ───────────────────────────────────┤
│  3-step process:                                   │
│  1. Discovery (understand the problem)             │
│  2. Architecture (design the system)               │
│  3. Delivery (deploy working software)             │
│                                                   │
├─ SERVICE CARDS ───────────────────────────────────┤
│  Full service list with details:                   │
│                                                   │
│  1. AI Knowledge Systems                          │
│     Price: $5k–$25k                               │
│     Timeline: 2–8 weeks                           │
│     Description: Custom RAG, knowledge graphs,     │
│     document intelligence pipelines                │
│     [Learn More →]                                │
│                                                   │
│  2. Workflow Automation                           │
│     Price: $2k–$15k                               │
│     Timeline: 1–6 weeks                           │
│     Description: Multi-step AI agents,             │
│     automation pipelines, integration             │
│     [Learn More →]                                │
│                                                   │
│  3. AI-Powered Websites                           │
│     Price: $3k–$10k                               │
│     Timeline: 2–4 weeks                           │
│     Description: Intelligent interfaces,           │
│     AI-native web applications                    │
│     [Learn More →]                                │
│                                                   │
│  4. Local AI Deployment                           │
│     Price: $2k–$10k                               │
│     Timeline: 1–4 weeks                           │
│     Description: On-premise LLMs, private          │
│     inference, secure infrastructure              │
│     [Learn More →]                                │
│                                                   │
│  5. Content & Research Pipelines                  │
│     Price: $1k–$8k                                │
│     Timeline: 1–4 weeks                           │
│     Description: AI content generation,            │
│     research automation, data pipelines           │
│     [Learn More →]                                │
│                                                   │
├─ ENGAGEMENT MODELS ──────────────────────────────┤
│  Table or cards showing:                           │
│  - AI Systems Audit ($500, 1 week)                 │
│  - Technical Sprint ($5k–$10k, 2 weeks)            │
│  - Full System Build ($10k–$25k, 4–8 weeks)       │
│  - Fractional AI Engineer ($5k/mo, ongoing)        │
│                                                   │
├─ FAQ ─────────────────────────────────────────────┤
│  "How do you scope projects?"                      │
│  "What technologies do you use?"                   │
│  "Do you work remotely?"                           │
│  "What happens after we build?"                     │
│  "Do you sign NDAs?"                               │
│                                                   │
├─ FINAL CTA ──────────────────────────────────────┤
│  "Not sure what you need?"                         │
│  "Book a free 30-minute consultation."             │
│  [Book a Free Consultation] [Describe Your Project]│
│                                                   │
├─ FOOTER ──────────────────────────────────────────┤
└─────────────────────────────────────────────────┘
```

## CTA Strategy

| CTA | Placement | Destination |
|---|---|---|
| Learn More | Each service card | Scroll to detail section |
| Book a Free Consultation | Final CTA | /contact |
| Describe Your Project | Final CTA (secondary) | /contact (with prefill) |
| Get Started | Pricing cards | /contact |

## Copywriting Tone

- Direct and specific about what's included
- Transparent about pricing
- Technical but not jargon-heavy
- Outcome-focused: "What you get" not "what we do"

## Sections Detail

### How It Works
3-step visual process:
1. **Discovery** (Day 1-3) — Understand your stack, goals, constraints. Deliverable: Architecture document.
2. **Architecture** (Day 3-7) — Design the system, choose technologies, plan integration. Deliverable: Technical specification.
3. **Delivery** (Day 7+) — Build, test, deploy, document, hand off. Deliverable: Working system + documentation.

Each step should have an icon, short description, and timeline indicator.

### Engagement Models
A visual comparison of the four engagement types. Use a card layout or simple table. Each should show: price, duration, what's included, who it's for.

### FAQ
5-7 questions addressing common objections:
- "How do you scope projects?" → Fixed-price sprints based on clearly defined deliverables
- "What technologies do you use?" → Whatever solves the problem best, with a preference for open-source and local-first
- "Do you work remotely?" → Yes, fully remote. Occasional on-site for key milestones.
- "What happens after we build?" → Deployment, documentation, training, and optional ongoing support retainer
- "Do you sign NDAs?" → Yes, standard.
- "How is this different from [OpenAI/Anthropic consulting]?" → We build local-first, private systems you own
- "What size companies do you work with?" → Startups to mid-market enterprises

## SEO Targets

- **Primary:** "AI consulting services", "AI systems engineering"
- **Secondary:** "local AI deployment", "AI knowledge systems", "AI workflow automation"
- **Title:** "AI Consulting Services — Local Infrastructure & Systems Engineering"
- **Description:** "Custom AI infrastructure: knowledge systems, workflow automation, and local AI deployment. Fixed-price sprints. Production-ready delivery."

## Mobile Behavior

- Service cards full-width
- Pricing table converts to stacked cards
- Process steps become vertical timeline
- FAQ accordion (always accordion on all views)
- CTAs full-width
