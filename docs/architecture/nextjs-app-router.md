# Next.js App Router Architecture

## Route Structure

```
src/app/
├── layout.tsx                    # Root layout (html, body, providers)
├── not-found.tsx                 # 404 page
├── page.tsx                      # Homepage
│
├── about/
│   └── page.tsx                  # About page
│
├── blog/
│   ├── page.tsx                  # Blog listing (paginated)
│   └── [slug]/
│       └── page.tsx              # Individual blog post
│
├── case-studies/
│   ├── page.tsx                  # Case studies grid
│   └── [slug]/
│       └── page.tsx              # Individual case study
│
├── contact/
│   └── page.tsx                  # Contact form + Calendly
│
├── lab/
│   ├── page.tsx                  # Lab index
│   ├── knowledge-graph/
│   │   └── page.tsx              # Knowledge graph interactive
│   ├── chat/
│   │   └── page.tsx              # AI chat sandbox
│   └── architecture/
│       └── page.tsx              # Architecture explorer
│
├── resources/
│   └── page.tsx                  # Resources / downloads
│
├── services/
│   └── page.tsx                  # Services overview
│
├── shop/                         # (Phase 5)
│   ├── page.tsx                  # Products listing
│   └── [slug]/
│       └── page.tsx              # Individual product
│
├── sitemap.ts                    # Dynamic sitemap generation
├── robots.ts                     # Robots.txt generation
│
└── api/
    ├── subscribe/route.ts        # Newsletter subscription
    ├── contact/route.ts          # Contact form submission
    ├── download/route.ts         # Lead magnet delivery
    ├── search/route.ts           # Blog search API
    └── webhook/route.ts          # Stripe/LemonSqueezy webhooks (Phase 5)
```

## Rendering Strategy

| Route | Rendering | Reason |
|---|---|---|
| Homepage | Static (ISR, revalidate: 3600) | Content changes infrequently |
| Blog listing | Static (ISR, revalidate: 3600) | New posts trigger rebuild |
| Blog post | Static (ISR, revalidate: 3600) | Same as listing |
| Case studies | Static (ISR) | Infrequent updates |
| About | Static | Rarely changes |
| Contact | Static | No dynamic content |
| Resources | Static | Limited updates |
| Lab pages | Static + Client islands | Interactive demos need JS |
| Shop | Static (ISR) | Product updates trigger rebuild |
| API routes | Dynamic | Form submissions, search |

## Server Component vs Client Component Boundaries

### Server Components (default)
- Blog post content rendering
- Page layout shell (nav, footer)
- Metadata generation
- Static content sections
- Blog listing (data fetching)
- Case study display

### Client Components (opt in with "use client")
- Navigation menu toggle (mobile)
- Theme toggle
- Contact form (react-hook-form + Zod)
- Newsletter signup form
- Knowledge graph visualization
- AI chat interface
- Search bar (client-side fuzzy search)
- Table of contents (scroll-spy)
- Metrics count-up animation
- Any component using Framer Motion/motion/react
- Any component using useState/useEffect/useContext

## Layout Architecture

```
RootLayout (html, body, font loading)
├── ThemeProvider (next-themes)
├── Header (Server Component wrapper)
│   └── Navigation (Client Component for mobile toggle)
│       ├── Logo
│       ├── NavLinks
│       └── ThemeToggle (Client Component)
├── Main Content ({children})
└── Footer (Server Component)
    ├── NewsletterSignup (Client Component)
    ├── FooterNav (Server Component)
    └── SocialLinks (Server Component)
```

## Template System

Some pages benefit from shared layouts:

- **Blog layout:** Sidebar with TOC, newsletter signup, related posts
- **Standard layout:** Default, no sidebar
- **Lab layout:** Full-width, minimal chrome for interactive demos

## Metadata Generation

Use Next.js `generateMetadata` pattern consistently:

```typescript
// src/app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: `${post.title} — Daniel Kliewer`,
    description: post.description,
    openGraph: {
      title: post.og?.title || post.title,
      description: post.og?.description || post.description,
      type: post.og?.type || 'article',
      publishedTime: post.date,
      authors: ['Daniel Kliewer'],
      tags: post.tags,
      images: [{ url: post.og?.image || '/default-og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitter?.title || post.title,
      description: post.twitter?.description || post.description,
      images: [post.twitter?.image || '/default-og.png'],
    },
  }
}
```

## Data Fetching Patterns

### Static Pages
```typescript
// Server Component — data fetched at build time
async function getPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/blog'))
  return files.map(file => parsePost(file))
}

export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogGrid posts={posts} />
}
```

### Dynamic Routes
```typescript
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({ slug: post.slug }))
}
```

## Error Boundaries

- `error.tsx` at root level (catch-all)
- `error.tsx` for blog (graceful fallback for bad slugs)
- `error.tsx` for lab (interactive components may fail)
- `loading.tsx` at appropriate levels (minimal, no full-page spinners)

## Route Groups

```
src/app/
├── (marketing)/             # Route group for marketing pages
│   ├── page.tsx             # Homepage
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── case-studies/
│   └── contact/page.tsx
│
├── (content)/               # Route group for content pages
│   ├── blog/
│   ├── resources/
│   └── shop/
│
└── (experimental)/          # Route group for lab pages
    └── lab/
```

Route groups allow different layouts for different sections without affecting URL structure.
