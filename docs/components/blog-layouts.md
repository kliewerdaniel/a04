# Blog Layout Components

## BlogCard

A card for displaying post summaries in grid/list views.

### Props

```typescript
interface BlogCardProps {
  title: string
  slug: string
  description: string
  date: string
  category: string
  tags: string[]
  readingTime: number
  image?: string
  variant?: 'default' | 'compact' | 'featured'
}
```

### Variants

| Variant | Layout | Used On |
|---|---|---|
| `default` | Image + text stacked | Blog grid (1/3 width) |
| `compact` | Text only, minimal | Sidebar, related posts |
| `featured` | Full-width, large image | Homepage featured post |

### States

- Default: Clean card with border
- Hover: Lift + category color edge highlight
- Focus: Visible ring on card wrapper
- Active: Subtle press

---

## CategoryFilter

Horizontal chip-based filter for blog listing.

```typescript
interface CategoryFilterProps {
  categories: string[]
  active: string
  onChange: (category: string) => void
}
```

**Behavior:**
- Horizontal scrollable on mobile
- "All" option always first
- Active chip has filled background
- Smooth scroll-to-top on category change
- URL param sync (`/blog?category=technical-guides`)

---

## SearchBar

Client-side fuzzy search for blog content.

```typescript
interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}
```

**Behavior:**
- Debounced input (300ms)
- Expandable on mobile (magnifying glass icon → full input)
- Results shown inline (don't navigate to separate results page)
- Clear button when query is active
- Keyboard shortcut: `/` to focus

---

## TableOfContents

Auto-generated outline for long-form posts.

```typescript
interface TableOfContentsProps {
  headings: Array<{ id: string; text: string; level: number }>
}
```

**Behavior:**
- Sticky on desktop sidebar
- Collapsible accordion on mobile (positioned at top of article)
- Scroll-spy: active heading tracked via IntersectionObserver
- Indentation by heading level (H2 → normal, H3 → indented)
- Click scrolls smoothly to heading

---

## RelatedPosts

Tag-based recommendation component.

```typescript
interface RelatedPostsProps {
  currentSlug: string
  tags: string[]
  limit?: number
}
```

**Algorithm:**
1. Score all posts by overlapping tags with current post
2. Exclude current post
3. Sort by score (desc), then by date (desc)
4. Return top N results

---

## NewsletterEmbed

Contextual email capture embedded within blog content.

```typescript
interface NewsletterEmbedProps {
  variant?: 'inline' | 'banner' | 'slideup'
  source: string // tracking: which post?
}
```

**Variants:**
- `inline`: Simple text + input within article flow
- `banner`: Full-width section between article sections
- `slideup`: Bottom banner that appears after scroll depth > 75% (desktop only, dismissible)

---

## SocialShare

Share buttons for blog posts.

```typescript
interface SocialShareProps {
  url: string
  title: string
  description?: string
}
```

**Platforms:** Twitter/X, LinkedIn, Hacker News, Reddit, Email
**Styling:** Icon-only buttons, subtle hover effect
**Tracking:** Optional analytics event on share click
