# Responsive Breakpoints & Strategy

## Breakpoints

Using Tailwind's default breakpoints (no custom values needed):

| Name | Min Width | Target |
|---|---|---|
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops, landscape tablets |
| `xl` | 1280px | Standard desktops |
| `2xl` | 1536px | Large desktops |

## Design Philosophy

1. **Mobile-first:** Base styles are mobile, breakpoints add complexity
2. **Content priority:**
3. **Touch-friendly on all sizes:** Minimum 44px touch targets always
4. **No horizontal scroll:** Ever. At any breakpoint.

## Layout Changes by Breakpoint

### Navigation

| Breakpoint | Behavior |
|---|---|
| Default (<1024px) | Hamburger menu, slide-in panel |
| lg (1024px+) | Horizontal full navigation |

### Page Layout

| Breakpoint | Columns |
|---|---|
| Default | Single column |
| md (768px) | 2-column grids possible |
| lg (1024px) | Full multi-column layout |

### Blog Grid

| Breakpoint | Columns |
|---|---|
| Default | 1 column |
| sm (640px) | 2 columns |
| lg (1024px) | 3 columns |

### Hero Section

| Breakpoint | Heading Size | Layout |
|---|---|---|
| Default | text-4xl (36px) | Centered, stacked |
| md (768px) | text-5xl (48px) | Left-aligned |
| lg (1024px) | text-7xl (72px) | Left-aligned |
| 2xl (1536px) | text-8xl (96px) | Left-aligned |

## Typography Resizing

```css
/* Type that shrinks gracefully */
h1 { @apply text-4xl md:text-5xl lg:text-6xl xl:text-7xl; }
h2 { @apply text-3xl md:text-4xl; }
```

## Sidebar Behavior

| Breakpoint | Layout |
|---|---|
| Default | Sidebar content moves below main content (accordion) |
| lg (1024px) | Sticky sidebar alongside content |

## Form Layout

| Breakpoint | Layout |
|---|---|
| Default | Single column, full-width inputs |
| lg (1024px) | 2-column layout (form + Calendly/info) |

## Image Sizes

Using `next/image` with proper `sizes` attribute:

```tsx
// Responsive image sizes
<Image
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  fill
  className="object-cover"
/>
```

## Testing Checklist

Test every page at:
- 320px (iPhone SE)
- 375px (iPhone)
- 768px (iPad)
- 1024px (iPad landscape)
- 1280px (desktop)
- 1920px (large desktop)
- 2560px (ultrawide — content should center, not stretch)

## What NOT to Do

- No horizontal scroll at any breakpoint
- No content hidden behind "scroll for more" on mobile
- No fixed-width elements that overflow
- No layout that works only at one specific breakpoint (fragile)
- No separate mobile URLs (no m.danielkliewer.com)
