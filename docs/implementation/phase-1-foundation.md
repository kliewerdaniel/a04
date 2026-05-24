# Phase 1: Foundation

## Duration: 3–5 days
## Goal: Scaffolded Next.js project with design system, layout shell, and blog rendering

## Deliverables

### Project Scaffolding
- [ ] Initialize Next.js project with TypeScript strict mode
- [ ] Configure Tailwind CSS with design tokens
- [ ] Install and configure base shadcn/ui components
- [ ] Set up next-themes for dark/light mode
- [ ] Create fonts configuration (Inter + JetBrains Mono via next/font)

### Layout Shell
- [ ] Global layout with html/body setup
- [ ] Header component (logo, navigation skeleton, theme toggle)
- [ ] Footer component (links, newsletter signup placeholder, social)
- [ ] Theme provider wrapper
- [ ] Skip-to-main-content accessibility link

### Blog System
- [ ] Move blog posts from `old/blog/` to `content/blog/`
- [ ] Validate and normalize frontmatter across all posts
- [ ] Create `lib/blog.ts` — post parsing, sorting, filtering
- [ ] Create blog listing page (`/blog`) with grid layout
- [ ] Create blog post page (`/blog/[slug]`) with MDX rendering
- [ ] Configure rehype/remark plugins (GFM, syntax highlighting, heading links)
- [ ] Code block styling (syntax highlighting, copy button)
- [ ] Image component with next/image optimization

### SEO Foundation
- [ ] Dynamic sitemap generation
- [ ] RSS feed generation
- [ ] robots.txt
- [ ] Base metadata configuration
- [ ] OpenGraph default image

### Static Pages (Skeleton)
- [ ] Homepage placeholder
- [ ] About placeholder
- [ ] 404 page

### Infrastructure
- [ ] Vercel deployment configuration
- [ ] Domain DNS setup
- [ ] Environment variables setup
- [ ] GitHub repository setup (or configure existing)
- [ ] vercel.json with headers and redirects

### Quality
- [ ] ESLint configuration
- [ ] TypeScript strict mode verified
- [ ] Lighthouse audit (target 95+)
- [ ] Mobile responsive check
- [ ] Dark/light theme toggle working

## Technical Dependencies

| Dependency | Version | Purpose |
|---|---|---|
| next | ^15.x | Framework |
| react | ^19.x | UI |
| typescript | ^5.x | Type safety |
| tailwindcss | ^4.x | Styling |
| motion | ^12.x | Animation |
| next-themes | ^0.4.x | Theme |
| next-mdx-remote | ^5.x | MDX rendering |
| gray-matter | ^4.x | Frontmatter |
| rehype-prism-plus | ^2.x | Syntax highlight |
| rehype-autolink-headings | ^7.x | Heading links |
| remark-gfm | ^4.x | GitHub Flavored Markdown |
| lucide-react | ^0.x | Icons |
| shadcn/ui | latest | Base components |
| @vercel/analytics | ^1.x | Analytics |

## Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Old MDX content has rendering issues | Medium | Medium | Validate all 120+ posts, fix patterns |
| Frontmatter inconsistencies | Medium | Low | Normalize script for frontmatter |
| Image path mapping issues | Medium | Medium | Script to update image paths |
| Theme flash on load | Low | Medium | test-themes script injection |
| Build time with 120+ posts | Low | Low | ISR, optimize post parsing |

## Dependencies (For Later Phases)

Phase 1 enables: Phase 2 (core pages), Phase 3 (blog redesign)
Phase 1 must be complete before any other phase begins.
