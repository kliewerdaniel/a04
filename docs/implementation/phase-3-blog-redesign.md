# Phase 3: Blog Redesign

## Duration: 3–5 days
## Goal: Enhanced blog experience with category system, search, reading time, related posts

## Deliverables

### Category System
- [ ] Category mapping from existing tags
- [ ] Category filter component (horizontal chips)
- [ ] URL-based filtering (`/blog?category=technical-guides`)
- [ ] Category badges on blog cards

### Search
- [ ] Client-side fuzzy search (Fuse.js or similar)
- [ ] Search bar component with debounce
- [ ] Results displayed inline (not separate page)
- [ ] Mobile search overlay
- [ ] Keyboard shortcut (`/` to focus search)

### Enhanced Post Display
- [ ] Reading time calculation and display
- [ ] Table of contents generation (auto from headings)
- [ ] Scroll-spy for active heading tracking
- [ ] Related posts (tag-based recommendations)
- [ ] Social share buttons (Twitter/X, LinkedIn, HN, Reddit, Email)
- [ ] Series navigation (for multi-part articles)
- [ ] Author bio box
- [ ] Newsletter embed within blog posts

### Blog Listing Enhancements
- [ ] Featured posts section
- [ ] Newsletter signup in sidebar
- [ ] Popular posts sidebar
- [ ] Categories sidebar
- [ ] Pagination (or "load more")

### Visual Polish
- [ ] Blog typography refinement (prose customization)
- [ ] Code block design (syntax highlighting theme, copy button)
- [ ] Image handling (lightbox, caption styling)
- [ ] Pull quote styling
- [ ] Blockquote refinement

## Components to Build

| Component | Purpose |
|---|---|
| CategoryFilter | Horizontal scrollable chip filter |
| SearchBar | Client-side search with results |
| TableOfContents | Sticky TOC with scroll-spy |
| RelatedPosts | Tag-based recommendations |
| SocialShare | Platform share buttons |
| NewsletterEmbed | In-content email capture |
| SeriesNavigation | Multi-part article links |
| AuthorBio | Blog post author box |
| BlogCard | Post listing card (enhanced) |
| BlogSidebar | Sidebar with multiple widgets |

## Content Migration Tasks

- [ ] Add `category` field to all existing posts (map from tags)
- [ ] Add `reading_time` calculation (automated)
- [ ] Ensure all images have proper alt text
- [ ] Fix any broken markdown patterns
- [ ] Standardize frontmatter across all 120+ posts
- [ ] Redirect old blog URLs (if changed)

## Risk

| Risk | Mitigation |
|---|---|
| Search performance with 120+ posts | Debounce, index only titles + descriptions initially |
| Inconsistent tagging across old posts | Manual audit + bulk update script |
| Table of contents for 3000+ line posts | Only H2/H3, with performance throttling |
| Newsletter embed reducing readability | A/B test placement (inline vs banner) |
