# Layout System

## Page Layout Patterns

### Standard Content Page
Used for: Services, About, Resources

```
┌─────────────────────────────────────┐
│  Nav                                │
├─────────────────────────────────────┤
│                                     │
│  Hero (compact, left-aligned)       │
│                                     │
├─────────────────────────────────────┤
│  Content section 1                  │
│  (narrow max-width, centered)       │
├─────────────────────────────────────┤
│  Content section 2                  │
│  (full-width highlight)             │
├─────────────────────────────────────┤
│  Content section 3                  │
│  (narrow max-width)                 │
├─────────────────────────────────────┤
│  CTA Section                        │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

### Blog Post Page
Used for: Blog article

```
┌─────────────────────────────────────┐
│  Nav                                │
├─────────────────────────────────────┤
│  ┌─────────┬──────────────────┐    │
│  │  TOC    │  Article          │    │
│  │  (sticky│  (prose width)    │    │
│  │   on    │                   │    │
│  │  desktop│  ──────────────  │    │
│  │  )      │  Related posts   │    │
│  │         │  Newsletter CTA  │    │
│  └─────────┴──────────────────┘    │
├─────────────────────────────────────┤
│  CTA Section                        │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

### Homepage
Used for: Landing

```
┌─────────────────────────────────────┐
│  Nav (transparent → solid)         │
├─────────────────────────────────────┤
│  Hero (100vh, full-bleed)          │
├─────────────────────────────────────┤
│  Services (3-column grid)          │
├─────────────────────────────────────┤
│  Case Studies (2-3 cards)          │
├─────────────────────────────────────┤
│  Metrics (full-width bar)          │
├─────────────────────────────────────┤
│  Blog (3-card grid)                │
├─────────────────────────────────────┤
│  Philosophy (narrow, centered)     │
├─────────────────────────────────────┤
│  CTA (full-width accent)           │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

### Full-Width Interactive
Used for: Lab

```
┌─────────────────────────────────────┐
│  Nav (minimal)                      │
├─────────────────────────────────────┤
│  Interactive Content (100vw)        │
│  - Knowledge Graph                  │
│  - Chat Interface                   │
│  - Architecture Explorer            │
├─────────────────────────────────────┤
│  Footer (minimal)                   │
└─────────────────────────────────────┘
```

## Section Widths

| Section Type | Max Width | Centering |
|---|---|---|
| Hero content | 1280px (container) | Left or center |
| Standard content | 1024px (max-w-5xl) | Center |
| Blog content | 72ch | Left with auto margins |
| Full-width highlight | 100vw | Full bleed |
| CTA | 1024px (max-w-5xl) | Center |
| Footer content | 1280px (container) | Center |
