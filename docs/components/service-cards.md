# Service Card Components

## ServiceCard

A card for displaying service offerings. Must convey the service clearly while remaining scannable.

### Props

```typescript
interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  price: string
  timeline: string
  features: string[]
  href: string
  variant?: 'default' | 'compact' | 'detailed'
}
```

### Variants

| Variant | Layout | Used On |
|---|---|---|
| `default` | Icon + title + short desc + learn more | Homepage grid |
| `compact` | Icon + title + price | Sidebar, quick overview |
| `detailed` | Full layout with features, pricing table | Services page |

### Detailed Variant Layout

```
┌─────────────────────────────────────────────┐
│  Icon (lucide, 32px)                         │
│  Title (H3)                                 │
│  Description (2-3 paragraphs)               │
│                                             │
│  Price: $5k–$25k     Timeline: 2–8 weeks   │
│                                             │
│  What's Included:                           │
│  ✓ Custom architecture design               │
│  ✓ Production-ready deployment              │
│  ✓ Documentation & training                 │
│  ✓ 30-day support                           │
│                                             │
│  [Learn More →] [Book a Consultation]       │
└─────────────────────────────────────────────┘
```

### States

- Default: Clean card with subtle border
- Hover: Icon color accent, card lifts
- Focus: Visible ring, all interactive elements focusable
- Active: Subtle press

### Animation

- Staggered fade-up on scroll
- Icon color transition on hover (accent color from theme)
- Feature list items fade in sequentially

### Accessibility

- Icons have `aria-hidden="true"` (decorative)
- Prices are semantic text, not styled elements
- Feature list uses `<ul>` with proper `<li>` elements
- Multiple CTAs distinguished by aria-label
- Focus order matches visual order
