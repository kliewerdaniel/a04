# MDX / CMS Architecture

## Philosophy: Git-Based Markdown CMS

The content system is intentionally simple. No database, no headless CMS, no admin panel. Content lives in markdown files in the repository, versioned with git, and rendered through Next.js.

### Why Git-Based MDX
- **No lock-in:** Content is portable plain text
- **Version control:** Every change is tracked
- **Developer-friendly:** Edit in any editor, preview locally
- **Build-time rendering:** Fast, no database queries
- **Cost:** Free (no CMS subscription)

### When We'd Add a CMS
- Non-technical team members need to publish
- Content volume exceeds 500+ pages
- Client wants to edit their case study
- Structured content needs relational queries

If a CMS is needed later: **Sanity** or **Contentlayer** — but NOT yet.

## Content Directory Structure

```
content/
├── blog/
│   ├── 2024-10-04-detailed-description-of-insight-journal.md
│   ├── 2024-10-09-how-to-build-a-persona-based-blog-post-generator.md
│   └── ... (120+ files)
│
├── case-studies/
│   ├── knowledge-system-enterprise.md
│   └── automation-pipeline-saas.md
│
├── resources/
│   ├── ai-audit-checklist.md
│   └── local-llm-deployment-guide.md
│
├── pages/
│   ├── services.md (if pages need rich content)
│   └── about.md
│
└── series/
    ├── local-llm-mastery/
    │   ├── 01-getting-started.md
    │   ├── 02-deployment.md
    │   └── 03-production.md
    └── index.json
```

## Frontmatter Schema

### Blog Post

```yaml
---
title: "Building a Local-First Knowledge Graph with AI Agents"
date: 2026-03-17
author: "Daniel Kliewer"
description: "A step-by-step guide to building a private knowledge graph using local AI agents, Ollama, and Python."
tags:
  - knowledge-graph
  - local-llm
  - agents
  - tutorial
category: "Technical Guides"
canonical_url: "https://danielkliewer.com/blog/building-a-private-knowledge-graph-with-local-ai-agents"
image: "/images/knowledge-graph-hero.png"
reading_time: 12
draft: false
featured: false

og:
  title: "Building a Private Knowledge Graph with Local AI Agents"
  description: "Step-by-step guide to building a private knowledge graph using local AI agents"
  image: "/images/og-knowledge-graph.png"

twitter:
  title: "Building a Private Knowledge Graph with Local AI Agents"
  description: "Step-by-step guide to building a private knowledge graph using local AI agents"
  image: "/images/twitter-knowledge-graph.png"

series:
  name: "Local LLM Mastery"
  part: 3
---
```

### Case Study

```yaml
---
title: "Enterprise Knowledge System"
client: "Anonymous SaaS Company"
timeline: "4 weeks"
role: "AI Systems Architect"
technologies:
  - Ollama
  - RAG
  - LangChain
  - Next.js
metrics:
  - value: "60%"
    label: "Faster document retrieval"
  - value: "50k"
    label: "Documents indexed"
  - value: "200ms"
    label: "Average query latency"
results:
  - Reduced manual research time by 60%
  - Scaled to 50k documents without performance degradation
  - Deployed on-premise with zero data exposure
featured: true
published: true
date: 2026-02-15
---
```

### Resource

```yaml
---
title: "AI Infrastructure Audit Checklist"
type: "guide"
price: "free"
file: "/downloads/ai-audit-checklist.pdf"
description: "A 10-point checklist to assess your organization's AI readiness and identify automation opportunities."
cover: "/images/resources/ai-audit-cover.png"
tags:
  - audit
  - checklist
  - assessment
---
```

## MDX Rendering Pipeline

```typescript
// src/lib/blog.ts

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrism from 'rehype-prism-plus'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  category: string
  readingTime: number
  featured: boolean
  draft: boolean
  image?: string
  content: string
}

export async function getPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  
  const posts = files.map(file => {
    const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
    const { data, content } = matter(source)
    return {
      slug: file.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
      ...data,
      content,
    } as BlogPost
  })
  
  return posts
    .filter(p => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const posts = await getPosts()
  return posts.find(p => p.slug === slug) || null
}
```

## MDX Compilation

```typescript
// In the blog post page component
import { compileMDX } from 'next-mdx-remote/rsc'

// Custom components available in MDX
const mdxComponents = {
  CodeBlock,
  ArchitectureDiagram,
  MetricHighlight,
  CTABox,
  NewsletterSignup,
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [rehypePrism, { ignoreMissing: true }],
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
      },
    },
  })
  
  return <article>{content}</article>
}
```

## Custom MDX Components

| Component | Purpose | When to Use |
|---|---|---|
| `<CodeBlock language="..." showLines>` | Syntax-highlighted code with copy button | Any code snippet |
| `<ArchitectureDiagram src="..." caption="...">` | Architecture diagrams with lightbox | System design explanations |
| `<MetricHighlight value="60%" label="Faster">` | Standalone metric emphasis | Key result callouts |
| `<CTABox service="consulting">` | Contextual CTA within content | Converting readers mid-article |
| `<NewsletterSignup variant="inline">` | Email capture in content | Every post, contextually placed |
| `<ImageGrid images={[...]}>` | Gallery of screenshots or diagrams | Tutorials with multiple images |
| `<Note type="info|warning|tip">` | Callout boxes | Side information |
| `<SeriesNavigation series="..." part={3}>` | Multi-part article navigation | Series-based content |

## Content Migration

Old blog posts need minimal migration:
1. Copy `.md` files from `old/blog/` to `content/blog/`
2. Validate frontmatter (ensure all required fields exist)
3. Add missing fields: `category`, `reading_time`
4. Handle inconsistent date formats
5. Strip raw HTML if MDX rendering has issues
6. Move images from `old/public/images/` to `public/images/`
7. Validate all image paths in frontmatter and content

## Build Optimization

- **Static generation:** All blog pages built at deploy time
- **ISR:** Revalidate content without full rebuild
- **On-demand revalidation:** Webhook for rebuild on git push
- **Partial prerendering:** For blog-heavy pages, static shell + dynamic content
