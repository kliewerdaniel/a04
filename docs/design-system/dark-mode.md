# Dark Mode Strategy

## Philosophy

Dark mode is the default, primary, and premium experience. Light mode is a high-quality accessible adaptation — not an afterthought, but also not the hero.

## Implementation

Using `next-themes` with `ThemeProvider`:

```typescript
// app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  )
}
```

## Theme Behavior

- **Default:** Dark mode
- **System preference:** If user's OS is set to light mode, offer light mode (but default stays dark)
- **Persistence:** Theme choice stored in localStorage via next-themes
- **Flash prevention:** next-themes injects inline script to set class before rendering

## Dark Mode Design Decisions

| Element | Dark | Light | Rationale |
|---|---|---|---|
| Background | `#0a0a0b` | `#ffffff` | Near-black for depth without pure black strain |
| Text | `#fafafa` | `#09090b` | Near-white reduces contrast fatigue |
| Cards | `#141415` | `#ffffff` | Subtle elevation from background |
| Borders | `#27272a` | `#e4e4e7` | Visible but not harsh |
| Code blocks | `#1a1a1b` | `#f4f4f5` | Distinct from card background |
| Shadows | Black @ 30-50% | Gray @ 10-20% | Depth without colored shadows |
| Images | Slight opacity reduction (0.9) | Full opacity | Prevents image brightness fatigue |

## Theme-Aware Components

### Images

```typescript
// For images that need different assets per theme
import Image from 'next/image'

export function ThemeAwareImage({ darkSrc, lightSrc, alt, ...props }) {
  const { resolvedTheme } = useTheme()
  return (
    <Image
      src={resolvedTheme === 'dark' ? darkSrc : lightSrc}
      alt={alt}
      {...props}
    />
  )
}
```

### SVG Icons

- lucide-react icons work in both themes (inherit currentColor)
- No themed SVG variants needed
- Ensure `currentColor` is used in any custom SVGs

## Theme Transition

When switching themes:

- Color transitions animate smoothly (300ms ease)
- Use Tailwind's `transition-colors` utility
- No layout shift on theme change
- Preserve scroll position

```css
/* globals.css */
* {
  @apply transition-colors duration-300;
}

/* But exclude non-color transitions */
*, *::before, *::after {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}
```

## Testing

Verify these in both themes:

- All text meets WCAG AA contrast (4.5:1 for normal text, 3:1 for large)
- Links are distinguishable from body text
- Code blocks are readable
- Images don't burn retinas in dark mode
- Form inputs have visible borders
- Focus rings are visible
- Navigation is legible on all backgrounds
- No "flash of wrong theme" on page load
