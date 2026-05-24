# Blog Page Specification

## Purpose

The primary traffic acquisition engine. The blog demonstrates technical authority, drives SEO, captures email subscribers, and funnels readers toward consulting services. Every blog post is a potential lead generation entry point.

## Target Audience

- Technical readers searching for AI implementation guidance
- Prospective clients evaluating expertise before engaging
- Existing subscribers catching up on content
- Community peers and fellow engineers

## Conversion Goals

| Goal | Metric |
|---|---|
| Email capture | Newsletter signups (embedded in posts) |
| Lead magnet download | Resource page visits |
| Consultation booking | CTA clicks from relevant posts |
| Content engagement | Time on page, scroll depth |

## Blog Listing Page (`/blog`)

```
┌─────────────────────────────────────────────────┐
│  NAV                                               │
├─────────────────────────────────────────────────┤
│                                                   │
│  HERO                                              │
│  "Blog"                                            │
│  "Deep technical content on AI systems, local     │
│   LLMs, and production automation."               │
│  Newsletter signup (inline, minimal)               │
│                                                   │
├─ CATEGORY FILTER ────────────────────────────────┤
│  Horizontal scrollable chip list:                  │
│  [All] [Technical Guides] [AI Philosophy]         │
│  [Tutorials] [Project Write-ups] [News/Opinion]   │
│  Active category highlighted                       │
│                                                   │
├─ SEARCH BAR ─────────────────────────────────────┤
│  Minimal search input with icon                    │
│  Client-side fuzzy search over titles +           │
│  descriptions + tags                              │
│  Shows results as you type                         │
│                                                   │
├─ BLOG POSTS ─────────────────────────────────────┤
│  Grid layout (3 cols desktop, 2 tablet, 1 mobile) │
│                                                   │
│  ┌──────────┬──────────┬──────────┐               │
│  │ Card     │ Card     │ Card     │               │
│  │ Title    │ Title    │ Title    │               │
│  │ Excerpt  │ Excerpt  │ Excerpt  │               │
│  │ Date     │ Date     │ Date     │               │
│  │ Tags     │ Tags     │ Tags     │               │
│  │ Read     │ Read     │ Read     │               │
│  │ Time     │ Time     │ Time     │               │
│  └──────────┴──────────┴──────────┘               │
│                                                   │
│  Pagination at bottom                              │
│  [← Older] [1] [2] [3] ... [12] [Newer →]        │
│                                                   │
├─ SIDEBAR (desktop only) ─────────────────────────┤
│  - About (short bio + photo)                      │
│  - Newsletter signup                              │
│  - Popular posts                                  │
│  - Categories                                     │
│  - Resources (lead magnets)                       │
│                                                   │
├─ FOOTER ──────────────────────────────────────────┤
└─────────────────────────────────────────────────┘
```

## Blog Post Page (`/blog/[slug]`)

```
┌─────────────────────────────────────────────────┐
│  NAV                                               │
├─────────────────────────────────────────────────┤
│                                                   │
│  ARTICLE HEADER                                   │
│  Category tag | Reading time | Date               │
│  Title (H1, large)                                │
│  Description (2-3 sentences)                      │
│  Author byline + share buttons                    │
│                                                   │
├─ TWO-COLUMN LAYOUT ─────────────────────────────┤
│                                                   │
│  LEFT (content)                 RIGHT (sidebar)   │
│  ┌────────────────────────┐    ┌──────────────┐  │
│  │  Article content       │    │  Table of    │  │
│  │  (prose styling)       │    │  Contents    │  │
│  │                        │    │  (sticky)    │  │
│  │  Code blocks with      │    │              │  │
│  │  syntax highlighting   │    │  [Newsletter │  │
│  │                        │    │   Signup]    │  │
│  │  Images optimized      │    │              │  │
│  │                        │    │  Related     │  │
│  │  Blockquotes styled    │    │  Posts       │  │
│  │                        │    │              │  │
│  └────────────────────────┘    └──────────────┘  │
│                                                   │
├─ BELOW ARTICLE ─────────────────────────────────┤
│  Author bio box                                   │
│  Tags list                                        │
│  Share buttons                                    │
│  "Enjoyed this? Subscribe for more."              │
│  Newsletter signup (full-width)                   │
│                                                   │
├─ RELATED POSTS ──────────────────────────────────┤
│  3 related posts based on shared tags             │
│                                                   │
├─ SERVICES CTA ───────────────────────────────────┤
│  Contextual CTA based on post topic               │
│  "Need help implementing this?"                   │
│  [Book a Free Consultation]                        │
│                                                   │
├─ FOOTER ──────────────────────────────────────────┤
└─────────────────────────────────────────────────┘
```

## Blog Post Card (Listing)

Each card shows:
- **Title:** Linked to post
- **Excerpt:** First 150 chars of content (or manual excerpt from frontmatter)
- **Date:** Formatted (e.g., "Mar 12, 2026")
- **Category:** Colored tag chip
- **Reading time:** "8 min read"
- **Image:** Optional, from frontmatter
- **Hover:** Card lifts slightly, subtle border highlight
- **Click:** Entire card is clickable

## Table of Contents

- Auto-generated from headings within the article
- Sticky position on desktop (sidebar)
- Collapsible accordion on mobile
- Scroll-spy: Active heading highlighted as user scrolls
- Max depth: H2 and H3 only

## Related Posts

- Algorithm: Tag-based overlap scoring
- Exclude current post
- Show 3 related posts max
- If no related posts found (unlikely with 120+ posts), show most recent

## Category System

Categories are derived from existing tags. Each post can have multiple tags, but each post maps to exactly ONE primary category.

### Categories

| Category | Description | Example Tags |
|---|---|---|
| Technical Guides | How-to implementations | tutorial, guide, code, how-to |
| AI Philosophy | Big ideas and frameworks | philosophy, sovereignty, theory |
| Tutorials | Step-by-step walkthroughs | step-by-step, beginner, setup |
| Project Write-ups | What I built | project, case-study, architecture |
| News & Opinion | Commentary on AI trends | opinion, analysis, news |
| Research | Academic/technical deep dives | research, paper, analysis |

## Search

- **Scope:** Title, description, tags, content (excerpt)
- **Algorithm:** Client-side fuzzy match (Fuse.js or similar)
- **Performance:** Debounced input (300ms)
- **Empty state:** "No posts found matching [query]. Try different keywords."
- **Results:** Show matching posts in dropdown or inline list
- **Mobile:** Search is in a modal/overlay when focused

## SEO Targets (Blog Index)

- **Primary:** "AI blog", "AI systems blog"
- **Secondary:** "local LLM blog", "AI engineering blog"
- **Title:** "Blog — AI Infrastructure & Systems Engineering"
- **Description:** "Deep technical content on AI systems, local LLMs, RAG, AI agents, and production automation. 120+ articles from an AI systems engineer."

## SEO Targets (Individual Posts)

- Dynamic per-post metadata from frontmatter
- If frontmatter has `og:*` fields, use them directly
- Fallback to title + description + default image
- Schema.org `TechArticle` for technical posts, `Article` for philosophical ones

## Mobile Behavior

- Blog grid: 1 column on mobile
- Sidebar disappears (content moves below or collapses)
- Table of contents: Accordion at top of article (collapsed by default)
- Search: Tap to open full-screen search
- Category filter: Horizontal scrollable chips
- Pagination: "Load more" button instead of numbered pages (optional)
- Touch targets: Minimum 44px for all interactive elements
