# Schema.org Structured Data

## Philosophy

Structured data helps search engines understand content type and enables rich results. Every page type gets its own schema.org type.

## Per-Page Schema Types

| Page | Schema Type | Key Properties |
|---|---|---|
| Homepage | `WebSite` + `Person` | name, url, description, sameAs |
| Blog listing | `CollectionPage` | name, description, numberOfItems |
| Blog post | `TechArticle` or `Article` | headline, description, datePublished, author, image |
| Services | `Service` | name, description, provider, offers |
| Case study | `Article` (with `HowTo` or `TechArticle`) | headline, description, datePublished |
| About | `Person` + `ProfilePage` | name, jobTitle, description, sameAs, knowsAbout |
| Contact | `ContactPage` | name, description, url |
| Resources | `CollectionPage` | name, description |
| Lab | `WebApplication` | name, description, applicationCategory |

## Implementation

```typescript
// lib/schema.ts

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Daniel Kliewer — AI Infrastructure & Systems Engineering',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    description: 'Local AI infrastructure consulting and systems engineering.',
    author: personSchema(),
  }
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Daniel Kliewer',
    givenName: 'Daniel',
    familyName: 'Kliewer',
    jobTitle: 'AI Systems Engineer',
    description: 'AI systems engineer building local-first AI infrastructure.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    sameAs: [
      'https://github.com/kliewerdaniel',
      'https://twitter.com/kliewerdaniel',
      'https://linkedin.com/in/kliewerdaniel',
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Large Language Models',
      'RAG',
      'AI Agents',
      'Knowledge Graphs',
      'System Architecture',
    ],
  }
}

export function techArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.description,
    image: post.image || '/default-og.png',
    datePublished: post.date,
    dateModified: post.date,
    author: personSchema(),
    publisher: {
      '@type': 'Person',
      name: 'Daniel Kliewer',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    },
    wordCount: post.content?.split(' ').length,
    timeRequired: `PT${post.readingTime}M`,
  }
}
```

## Adding Schema to Pages

```typescript
// In page components — add JSON-LD script
export default function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(techArticleSchema(post)),
        }}
      />
      <article>{/* content */}</article>
    </>
  )
}
```

## Breadcrumb Schema

```typescript
export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
```

## Frequently Asked Questions Schema (Services Page)

```typescript
export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
```

## Validation

After deployment, validate all schema:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Monitor Google Search Console for schema errors
