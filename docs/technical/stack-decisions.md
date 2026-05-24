# Technology Stack Decisions

## Core Framework

### Next.js (App Router) — WHY

- **File-based routing** — Pages map directly to files. No routing config needed.
- **Server Components** — Most content is static. Server components eliminate client-side JS for content rendering.
- **ISR** — Blog posts can be regenerated without full rebuild.
- **API Routes** — Form handling and webhooks live in the same project.
- **Image optimization** — Built-in with next/image.
- **Vercel integration** — Deployment is `git push`.
- **SEO** — generateMetadata, sitemap generation, all built-in.

**Not chosen:** Remix (less ecosystem), SvelteKit (smaller community), Astro (not ideal for interactive pages).

## Language

### TypeScript (Strict Mode) — WHY

- Catches type errors at build time rather than runtime.
- Self-documenting component props and API contracts.
- Better IDE support (autocomplete, refactoring).
- Required by shadcn/ui ecosystem.

**Not chosen:** JavaScript (loses type safety), plain JS with JSDoc (worse DX).

## Styling

### Tailwind CSS — WHY

- Utility-first eliminates context-switching between HTML and CSS files.
- Design tokens via tailwind.config.ts — single source of truth for colors, spacing, typography.
- Dark mode via class strategy — toggle `dark` class on `<html>`.
- Responsive design via utility variants (`md:`, `lg:`) — no media queries in component files.
- Small bundle size — purges unused CSS in production.
- Consistent with the modern Next.js ecosystem.

**Not chosen:** CSS Modules (more files, slower development), styled-components (runtime cost), vanilla CSS (no design system).

## Animation

### motion/react (formerly Framer Motion) — WHY

- Declarative animation API (`motion.div`, `AnimatePresence`).
- Layout animations (shared layout between routes).
- Gesture handling (hover, tap, drag — though drag isn't used here).
- Scroll-triggered animations via `whileInView`.
- Reduced motion support built-in.

**Not chosen:** GSAP (more complex, imperative), CSS animations only (not powerful enough for page transitions).

## Component Library

### shadcn/ui — WHY

- Not a component library — it's a collection of copy-paste components.
- Full control over styling (no CSS override battles).
- Accessible out of the box (Radix UI primitives).
- Themeable with CSS variables — hooks into our color system.
- Includes: Button, Card, Dialog, Input, Select, Accordion, Tabs, Toast.

**Not chosen:** Material UI (heavy, hard to customize), Chakra (declining), Ant Design (enterprise feel), Radix raw (too low-level).

## Content

### MDX + gray-matter — WHY

- Markdown files are version-controlled alongside code.
- No CMS subscription cost.
- Build-time rendering = fast pages.
- Support for custom components within markdown (via `next-mdx-remote`).
- Familiar editing workflow for a developer.

**Not chosen:** Contentful (cost, lock-in), Sanity (cost, overkill for single author), Notion as CMS (unreliable API).

## Forms

### react-hook-form + Zod — WHY

- react-hook-form: Performant (uncontrolled inputs), minimal re-renders.
- Zod: Type-safe schema validation shared between client and server.
- Combined: Type-safe, validated forms with minimal boilerplate.

**Not chosen:** Formik (more re-renders, more code), plain HTML forms (no validation DX).

## Icons

### lucide-react — WHY

- Consistent, clean icon set.
- Tree-shakeable (only imported icons in bundle).
- Works with Tailwind (can style with className).
- Active maintenance.

**Not chosen:** Heroicons (fewer icons), Phosphor (larger set, less familiar).

## Deployment

### Vercel — WHY

- Zero-config Next.js deployment.
- Global CDN with edge caching.
- ISR support.
- Preview deployments for every branch.
- Built-in analytics (privacy-friendly).
- Automatic SSL and custom domain.

**Not chosen:** Netlify (slower build times), AWS (too complex), self-hosted (maintenance overhead).

## Email

### Resend (Transactional) + ConvertKit / Buttondown (Marketing) — WHY

- Resend: Developer-friendly API, React email templates, great deliverability.
- ConvertKit: Creator-focused, good automation, tagging.
- Buttondown: Simpler, cheaper, plain-text focused alternative.

**Not chosen:** Mailchimp (expensive, complex), SendGrid (developer-hostile), Mailgun (older).

## Analytics

### Vercel Analytics (Core) + PostHog (Product) — WHY

- Vercel Analytics: Privacy-preserving, automatic, no cookies.
- PostHog: Self-hostable, product analytics, session recording (optional).
- Combined: Understand traffic sources AND user behavior.

**Not chosen:** Google Analytics (privacy concerns, slow), Plausible (paid, less powerful), Fathom (paid, limited).
