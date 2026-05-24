# Metadata & SEO Strategy

## Philosophy

SEO is built on technical depth, not keyword stuffing. The strategy is: write genuinely useful technical content → rank for long-tail AI queries → convert readers into leads. Metadata ensures search engines understand and surface this content correctly.

## Title Tag Convention

```typescript
// Pattern: Page Name — Description | Site Name
// OR: Article Title — Daniel Kliewer

// Examples:
"Home: Daniel Kliewer — AI Infrastructure & Systems Engineering"
"Blog — AI Infrastructure & Systems Engineering"
"Building a Local-First Knowledge Graph with AI Agents — Daniel Kliewer"
"AI Consulting Services — Local Infrastructure & Systems Engineering"
"Contact — AI Infrastructure Consulting | Daniel Kliewer"
```

### Rules
- Max 60 characters (Google displays ~60)
- Include primary keyword near the beginning
- Brand name at the end (separated by —)
- No keyword stuffing
- Unique per page

## Meta Description Convention

```typescript
// Pattern: 1-2 sentences. Primary keyword near start. CTA at end.

"AI infrastructure consulting and systems engineering. Local-first AI deployment, custom RAG systems, and workflow automation. Production systems for organizations that own their stack."
```

### Rules
- Max 155 characters
- Include primary and 1-2 secondary keywords naturally
- Include value proposition
- End with implied CTA
- No quotation marks or special characters that get mangled
- Unique per page

## OpenGraph Protocol

Every page must have OpenGraph tags:

```typescript
export function generateOpenGraph({
  title,
  description,
  image = '/default-og.png',
  type = 'website',
  publishedTime,
  authors = ['Daniel Kliewer'],
  tags,
}: {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  authors?: string[]
  tags?: string[]
}) {
  return {
    title: `${title} | Daniel Kliewer`,
    description,
    type,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: 'Daniel Kliewer — AI Infrastructure & Systems Engineering',
    locale: 'en_US',
    images: [{ url: image, width: 1200, height: 630, alt: title }],
    ...(publishedTime && { publishedTime }),
    ...(authors?.length && { authors }),
    ...(tags?.length && { tags }),
  }
}
```

## Twitter Cards

Every page must have Twitter card tags:

```typescript
export function generateTwitterCard({
  title,
  description,
  image = '/default-og.png',
}: {
  title: string
  description: string
  image?: string
}) {
  return {
    card: 'summary_large_image',
    site: '@kliewerdaniel', // Update if handle changes
    title,
    description,
    images: [image],
  }
}
```

## Default OG Image

A consistent, branded default OG image:
- Dark background matching site theme
- Site name / logo
- Tagline or page title
- 1200x630px
- No photo (keeps it clean)
- Generate with Vercel OG or static image

## Dynamic Metadata Generation

```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) return { title: 'Post Not Found — Daniel Kliewer' }
  
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`
  
  return {
    title: `${post.title} — Daniel Kliewer`,
    description: post.description,
    authors: [{ name: 'Daniel Kliewer' }],
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.og?.title || post.title,
      description: post.og?.description || post.description,
      type: 'article',
      publishedTime: post.date,
      url,
      images: [{ url: post.og?.image || '/default-og.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitter?.title || post.title,
      description: post.twitter?.description || post.description,
      images: [post.twitter?.image || '/default-og.png'],
    },
    alternates: {
      canonical: post.canonical_url || url,
    },
  }
}
```

## robots.txt

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/lab/chat'], // Disallow interactive/dynamic pages
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
```

## Sitemap

Dynamic sitemap that includes:
- All static pages (home, about, services, contact, resources, lab)
- All blog posts
- All case studies

```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!
  
  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/resources`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/lab`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/case-studies`, changeFrequency: 'monthly', priority: 0.8 },
  ]
  
  // Blog posts
  const posts = await getPosts()
  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...blogPages]
}
```

## Canonical URLs

Every page and blog post must have a canonical URL:
- Set explicitly in frontmatter for old posts that may have been published elsewhere
- Default to the page's own URL
- Prevent duplicate content issues

## Heading Hierarchy Rules

| Heading Level | Usage | Page Count |
|---|---|---|
| H1 | Exactly one per page | Page title |
| H2 | Major section headings | As needed |
| H3 | Subsections within H2 sections | As needed |
| H4 | Fine-grained subsections | Sparingly |

- H1 must match the page's primary topic/keyword
- Heading hierarchy must not skip levels (H1 → H3 is invalid)
- Headings should contain keywords naturally where appropriate
- Blog posts use post title as H1

## Key SEO Metadata Fields (Per Blog Post)

| Field | Required | Purpose |
|---|---|---|
| title | Yes | H1 and title tag |
| description | Yes | Meta description |
| tags | Yes | Keywords, categorization |
| category | Yes | Content taxonomy |
| image | Yes | OG image |
| canonical_url | If republished | Prevent duplicate content |
| date | Yes | Article published time |
| reading_time | Yes | User experience, featured snippet |
