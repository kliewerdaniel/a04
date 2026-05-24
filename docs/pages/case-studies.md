# Case Studies Page Specification

## Purpose

Provide concrete proof of capability through detailed project breakdowns. Each case study is a narrative that demonstrates technical depth, problem-solving ability, and real results.

## Target Audience

- Technical buyers evaluating whether we can solve their specific problem
- Decision-makers who need evidence before booking a consultation
- Peers/community interested in implementation details

## Conversion Goals

| Goal | Metric |
|---|---|
| Book consultation after reading | Click-through to contact |
| Download related case study PDF | Download event |
| Explore related services | Services page click |

## Layout Hierarchy

```
┌─────────────────────────────────────────────────┐
│  NAV                                               │
├─────────────────────────────────────────────────┤
│                                                   │
│  HERO                                              │
│  "Case Studies"                                   │
│  "Real systems, real results."                     │
│                                                   │
├─ FILTER BAR ─────────────────────────────────────┤
│  [All] [Knowledge Systems] [Automation]           │
│  [Web] [Local AI] [Research]                      │
│                                                   │
├─ CASE STUDY GRID ────────────────────────────────┤
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Image    │  │ Image    │  │ Image    │       │
│  │ Title    │  │ Title    │  │ Title    │       │
│  │ Metrics  │  │ Metrics  │  │ Metrics  │       │
│  │ Tags     │  │ Tags     │  │ Tags     │       │
│  └──────────┘  └──────────┘  └──────────┘       │
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ ...      │  │ ...      │  │ ...      │       │
│  └──────────┘  └──────────┘  └──────────┘       │
│                                                   │
├─ FINAL CTA ──────────────────────────────────────┤
│  "Want results like these?"                        │
│  "Let's talk about your project."                  │
│  [Book a Free Consultation]                        │
│                                                   │
├─ FOOTER ──────────────────────────────────────────┤
└─────────────────────────────────────────────────┘
```

## Individual Case Study Page

```
┌─────────────────────────────────────────────────┐
│  NAV                                               │
├─────────────────────────────────────────────────┤
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │  Hero Image / Architecture Diagram            │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  CASE STUDY HEADER                                │
│  Title | Client | Timeline | Tech Stack Tags      │
│                                                   │
│  KEY METRICS                                      │
│  3 big numbers (e.g., 60% faster, 50k docs,       │
│  200ms latency)                                   │
│                                                   │
│  THE CHALLENGE                                    │
│  What problem were we solving?                    │
│                                                   │
│  THE APPROACH                                     │
│  How did we solve it? Architecture decisions,     │
│  technology choices, trade-offs made.             │
│  Include architecture diagram.                    │
│                                                   │
│  THE IMPLEMENTATION                               │
│  Key code snippets, system diagrams,              │
│  deployment architecture.                         │
│                                                   │
│  THE RESULTS                                      │
│  Quantitative results, qualitative feedback,      │
│  lessons learned.                                 │
│                                                   │
│  CLIENT TESTIMONIAL (if available)                │
│  Pull quote in large format.                      │
│                                                   │
│  [View Live Project] [Read Related Posts]         │
│                                                   │
├─ RELATED CASE STUDIES ───────────────────────────┤
│  2-3 related case studies                         │
│                                                   │
├─ FINAL CTA ──────────────────────────────────────┤
│  "Have a similar challenge?"                       │
│  "Let's discuss how we can help."                  │
│  [Book a Free Consultation]                        │
│                                                   │
├─ FOOTER ──────────────────────────────────────────┤
└─────────────────────────────────────────────────┘
```

## Case Study Content Structure

Each case study should follow this template:

```markdown
---
title: "Project Name"
client: "Client Name (or anonymous)"
timeline: "2 weeks"
role: "AI Systems Engineer"
technologies: ["Ollama", "Next.js", "RAG", "LangChain"]
metrics:
  - value: "60%"
    label: "Faster processing"
  - value: "50k"
    label: "Documents indexed"
  - value: "200ms"
    label: "Average query latency"
featured: true
---

## The Challenge

[2-3 paragraphs describing the problem]

## The Approach

[3-5 paragraphs describing the solution architecture]

## The Implementation

[Technical details, code snippets, deployment]

## The Results

[Quantitative and qualitative outcomes]

## Lessons Learned

[What went well, what could be improved]
```

## Case Study Cards (Grid View)

Each card shows:
- **Image/Diagram:** Architecture preview or result screenshot
- **Title:** Project name
- **Metrics:** 2-3 key numbers
- **Tags:** Technologies used
- **Hover:** Slight lift, shows "Read case study →"

## SEO Targets

- **Primary:** "AI case studies", "AI implementation examples"
- **Secondary:** Specific technology + "case study" (e.g., "RAG implementation case study")
- **Title:** "Case Studies — AI Systems Engineering & Implementation"
- **Description:** "Real AI systems we've built. Detailed case studies with architecture, code, and measurable results."

## Empty State

If case studies are still being written:
- Show "Coming soon" message with newsletter signup
- Link to blog posts that serve as proto-case-studies
- "Be the first case study — [book a consultation]"
