# Case Study Card Components

## CaseStudyCard

A card component for displaying project summaries in grid layouts. Combines visual impact with data density.

### Props

```typescript
interface CaseStudyCardProps {
  title: string
  slug: string
  client?: string
  metrics: Array<{ value: string; label: string }>
  technologies: string[]
  image?: string
  featured?: boolean
  variant?: 'default' | 'compact' | 'featured'
}
```

### Variants

| Variant | Size | Used On |
|---|---|---|
| `default` | Standard card (1/3 width) | Grid listing |
| `featured` | Larger card (2/3 or full width) | Homepage, featured section |
| `compact` | Minimal card (1/4 width) | Related case studies sidebar |

### Layout (default)

```
┌──────────────────────────┐
│  ┌────────────────────┐  │
│  │  Image / Diagram    │  │
│  └────────────────────┘  │
│                           │
│  Category Badge           │
│  Title (H3)              │
│  Client name             │
│                           │
│  ┌──────┐ ┌──────┐      │
│  │ 60%  │ │ 50k  │      │
│  │ faster│ │ docs  │      │
│  └──────┘ └──────┘      │
│                           │
│  Tech: Ollama, RAG, ...  │
│  [Read Case Study →]     │
└──────────────────────────┘
```

### Featured Variant

Full-width card on homepage with:
- Larger image/diagram
- Full description text
- 3 metrics
- Client testimonial snippet
- Prominent CTA

### States

| State | Visual Change |
|---|---|
| Default | Neutral background, border |
| Hover | Card lifts (translateY -4px), shadow deepens, border subtle highlight |
| Focus | Visible focus ring on the whole card |
| Active | Card depresses slightly |

### Animation

- Staggered entrance on scroll (fade-up)
- Hover: lift + shadow + subtle border color
- Image: subtle scale on hover (zoom effect)
- Transition: 200ms ease-out

### Responsive

- Desktop: 3 columns in grid, featured spans 2 columns
- Tablet: 2 columns
- Mobile: 1 column, full-width cards

### Accessibility

- Entire card is a single link (using `<a>` with proper aria-label)
- Metrics are actual text, not images
- Colors meet contrast requirements in both themes
- Keyboard navigable (Tab to focus, Enter to activate)
