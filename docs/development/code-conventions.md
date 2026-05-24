# Code Conventions

## General

- **TypeScript strict mode** enabled. No `any` unless absolutely necessary and documented.
- **Functional components** only (no class components).
- **Server Components by default** — only add `'use client'` when browser APIs needed.
- **Named exports** preferred over default exports (better tree-shaking, refactoring).

## Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| Components | PascalCase | `HeroSection`, `BlogCard` |
| Files (components) | kebab-case | `hero-section.tsx`, `blog-card.tsx` |
| Files (pages) | `page.tsx`, `layout.tsx` | Next.js convention |
| Utilities | camelCase | `getPosts()`, `formatDate()` |
| Constants | UPPER_SNAKE_CASE (file-level) | `SITE_URL`, `MAX_POSTS` |
| Types/Interfaces | PascalCase with `Type`/`I` prefix | `BlogPost`, `HeroSectionProps` |
| CSS classes | Tailwind utilities (no custom classes unless necessary) | |

## File Organization

### Component Files
```typescript
// components/sections/hero-section.tsx

// 1. Imports
import { motion } from 'motion/react'

// 2. Types
interface HeroSectionProps {
  headline: string
  subtitle?: string
}

// 3. Component
export function HeroSection({ headline, subtitle }: HeroSectionProps) {
  return (
    <section>
      <h1>{headline}</h1>
    </section>
  )
}
```

### Page Files
```typescript
// app/services/page.tsx

// Metadata export first (for SEO)
export const metadata: Metadata = { ... }

// Then component
export default function ServicesPage() {
  return ( ... )
}
```

## CSS Conventions

- **Tailwind utility classes only** — no custom CSS unless absolutely unavoidable.
- **Design tokens** (colors, spacing) defined in `tailwind.config.ts`.
- **Animations** use Framer Motion `motion` components, not CSS animations.
- **Global styles** only in `globals.css` (body, scrollbar, selection color).
- **`cn()` utility** for conditional class merging (from shadcn/ui).

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Component Patterns

### Server Component (Default)
```typescript
export async function BlogList() {
  const posts = await getPosts()
  return (
    <div className="grid grid-cols-3 gap-6">
      {posts.map(post => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
```

### Client Component
```typescript
'use client'

import { useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
```

### Animation Wrapper
```typescript
'use client'

import { motion } from 'motion/react'

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}
```

## Performance Rules

1. **No `'use client'` on layout.tsx** — keeps the shell server-rendered.
2. **Dynamic imports** for heavy components (knowledge graph, chat).
3. **next/image** for all images — never `<img>`.
4. **No inline styles** — use Tailwind classes.
5. **Minimal useEffect** — prefer Server Components for data fetching.
6. **No `any` type** — use `unknown` if type is truly dynamic.
7. **No `dangerouslySetInnerHTML` except for JSON-LD structured data.**

## State Management Rules

1. **Server State** — Props from Server Components, fetched at build time.
2. **URL State** — Search params for filters, pagination.
3. **Local State** — `useState` for UI interactions (menus, toggles).
4. **No global state** — not needed for this site.
5. **No `useReducer`** unless state logic is complex (unlikely here).

## Accessibility Rules

1. All images need `alt` text (empty `alt=""` for decorative).
2. All interactive elements need focus styles.
3. Headings must be semantic and hierarchical.
4. Forms need labels associated with inputs.
5. Color alone should not convey information.
6. Motion respects `prefers-reduced-motion`.
7. Skip link at top of every page.
