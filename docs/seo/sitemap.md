# Sitemap & RSS Strategy

## Sitemap

A dynamic XML sitemap generated at build time, listing all public pages with metadata.

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/lab`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.1 },
  ]

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

## RSS Feed

A full-content RSS feed for blog subscribers and feed readers.

```typescript
// app/feed.xml/route.ts
import { getPosts } from '@/lib/blog'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!
  const posts = await getPosts()

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Daniel Kliewer — AI Infrastructure & Systems Engineering</title>
    <link>${baseUrl}</link>
    <description>Deep technical content on AI systems, local LLMs, and production automation.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <category>${post.category}</category>
      ${post.tags?.map(tag => `<category>${tag}</category>`).join('')}
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
```

## robots.txt

```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/lab/chat'] },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
```

## Auto-Discovery

Add RSS feed auto-discovery to the root layout:

```html
<link rel="alternate" type="application/rss+xml" title="Daniel Kliewer — AI Infrastructure & Systems Engineering" href="/feed.xml" />
```

## Submission Checklist

- Submit sitemap to Google Search Console
- Submit sitemap to Bing Webmaster Tools
- Verify RSS feed in common readers (Feedly, Apple News)
- Include RSS in newsletter welcome sequence
