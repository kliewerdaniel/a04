# Typography System

## Philosophy

Typography communicates authority. Every type choice reinforces: "This is a serious technical publication that happens to drive a business."

- **Primary:** Geometric sans-serif (familiar, clean, technical)
- **Code:** Monospace with clear distinction
- **Display:** Optional variable font for hero sections (breadth + weight variation)

## Font Stack

### Primary — Inter

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Why Inter:** It's the gold standard for UI typography. Excellent legibility at all sizes, extensive weight range, designed for screens, and pairing-agnostic.

### Code — JetBrains Mono / Fira Code

```css
font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', monospace;
```

**Why JetBrains Mono:** Ligatures for common coding patterns, clear distinction between similar characters, compact width for code blocks.

### Display (Optional) — Fraunces or Instrument Serif

For philosophical/essay content, a subtle serif can differentiate long-form writing from technical content.

## Type Scale

```css
/* Tailwind extensions */
--text-xs: 0.75rem;    /* 12px — Captions, labels */
--text-sm: 0.875rem;   /* 14px — Body small, metadata */
--text-base: 1rem;     /* 16px — Body text */
--text-lg: 1.125rem;   /* 18px — Large body */
--text-xl: 1.25rem;    /* 20px — Small headings */
--text-2xl: 1.5rem;    /* 24px — H4 */
--text-3xl: 1.875rem;  /* 30px — H3 */
--text-4xl: 2.25rem;   /* 36px — H2 */
--text-5xl: 3rem;      /* 48px — H1 (page) */
--text-6xl: 3.75rem;   /* 60px — H1 (large page) */
--text-7xl: 4.5rem;    /* 72px — Hero display */
--text-8xl: 6rem;      /* 96px — Hero large (homepage) */
```

## Heading Hierarchy

| Element | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Hero H1 | text-6xl to text-8xl | 700 | 1.0 | -0.03em |
| Page H1 | text-4xl to text-5xl | 700 | 1.1 | -0.02em |
| H2 | text-3xl to text-4xl | 600 | 1.2 | -0.02em |
| H3 | text-2xl | 600 | 1.3 | -0.01em |
| H4 | text-xl | 600 | 1.4 | -0.01em |
| Body | text-base | 400 | 1.7 | 0 |
| Body small | text-sm | 400 | 1.6 | 0 |
| Caption | text-xs | 400 | 1.5 | 0.01em |
| Code | text-sm | 400 | 1.6 | 0 |
| Lead | text-lg | 400 | 1.6 | 0 |

## Prose Styling (Blog Content)

Blog body text uses the Tailwind `prose` class with customizations:

```typescript
// tailwind.config.ts
prose: {
  DEFAULT: {
    css: {
      maxWidth: '72ch',
      '--tw-prose-body': 'hsl(var(--foreground))',
      '--tw-prose-headings': 'hsl(var(--foreground))',
      '--tw-prose-links': 'hsl(var(--primary))',
      '--tw-prose-bold': 'hsl(var(--foreground))',
      '--tw-prose-code': 'hsl(var(--foreground))',
      '--tw-prose-quotes': 'hsl(var(--muted-foreground))',
      p: { marginBottom: '1.5em' },
      'h2, h3, h4': { marginTop: '2em', marginBottom: '0.75em' },
      'p > code': {
        fontSize: '0.875em',
        fontWeight: 500,
        padding: '0.2em 0.4em',
        borderRadius: '0.25rem',
      },
      'pre': {
        borderRadius: '0.75rem',
        padding: '1.25rem',
        overflow: 'auto',
      },
      img: { borderRadius: '0.75rem' },
      blockquote: {
        fontStyle: 'italic',
        borderLeftWidth: '2px',
        borderLeftColor: 'hsl(var(--primary))',
        paddingLeft: '1.5em',
      },
    },
  },
}
```

## Reading Width

- **Blog content:** 72ch max-width (optimal reading line length)
- **Page content:** 80ch max-width (slightly wider for non-linear reading)
- **Hero text:** No max-width constraint (but has padding)
- **Code blocks:** Full width of container with horizontal scroll

## Font Loading

```typescript
// Via next/font
import { Inter, JetBrains_Mono } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
```

## Usage Rules

- Never use more than 2 font weights in a single view
- Code blocks always use monospace
- Hero headings can use extended weights (800-900)
- Body text never below 16px on desktop
- Line length never exceeds 80ch for readability
- No justified text (keep left-aligned)
- No all-caps except for small labels/badges
