# Feature: Blog Search

## Overview

A fast, client-side fuzzy search across all blog content. Enables users to find relevant posts without navigating categories or scrolling through pagination.

## Technical Approach

### Phase 3 (Initial): Client-Side Only
- **Library:** Fuse.js
- **Index size:** ~200KB (titles, descriptions, tags only)
- **Scope:** Title, description, tags, category
- **Performance:** Debounced (300ms), runs on input
- **Bundle impact:** <15KB gzipped

### Phase 6 (Enhanced): Server-Side Option
- **Option A:** Meilisearch (self-hosted or cloud)
- **Option B:** Custom vector search with embeddings
- **Scope:** Full content search
- **Performance:** Sub-100ms responses

## Search Algorithm (Fuse.js)

```typescript
const fuse = new Fuse(posts, {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
    { name: 'category', weight: 0.1 },
  ],
  threshold: 0.4,
  distance: 100,
  minMatchCharLength: 2,
})
```

## UI Components

### SearchBar
- Minimal input with search icon
- Expands on focus (mobile: full-width overlay)
- Clear button when query is active
- Keyboard shortcut: `/` to focus
- ESC to blur/clear

### SearchResults
- Dropdown below search input (desktop)
- Full-screen overlay (mobile)
- Results update as user types
- Top 10 results shown
- Each result shows: title, category badge, date, excerpt snippet
- Click navigates to post
- "No results" state with suggestion to try different keywords

## Search Index Generation

```typescript
// At build time, generate search index
export function generateSearchIndex(posts: BlogPost[]): SearchIndex {
  return posts.map(post => ({
    title: post.title,
    slug: post.slug,
    description: post.description,
    tags: post.tags,
    category: post.category,
    date: post.date,
  }))
}

// Injected into page via Server Component props
// Client component receives index as prop → Fuse.js instance
```
