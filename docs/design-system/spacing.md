# Spacing System

## Philosophy

Generous, intentional spacing communicates premium quality. Tight spacing communicates density and technicality. The site uses a generous baseline with controlled compression in content areas.

## Base Unit: 4px

```
--space-1: 0.25rem  (4px)
--space-2: 0.5rem   (8px)
--space-3: 0.75rem  (12px)
--space-4: 1rem     (16px)
--space-5: 1.25rem  (20px)
--space-6: 1.5rem   (24px)
--space-8: 2rem     (32px)
--space-10: 2.5rem  (40px)
--space-12: 3rem    (48px)
--space-16: 4rem    (64px)
--space-20: 5rem    (80px)
--space-24: 6rem    (96px)
--space-32: 8rem    (128px)
```

These map directly to Tailwind's spacing scale (no custom values needed for most cases).

## Layout Spacing

| Context | Spacing | Notes |
|---|---|---|
| Page padding (desktop) | px-8 (32px) | 32px on each side |
| Page padding (mobile) | px-4 (16px) | 16px on each side |
| Section vertical gap | py-24 (96px) desktop, py-16 (64px) mobile |
| Content max-width | max-w-5xl (1024px) | Standard pages |
| Blog content max-width | 72ch | Optimal reading width |
| Card gap (grid) | gap-6 (24px) | Standard |gap-8 (32px) | Featured |

## Section Spacing

| Element | Top Padding | Bottom Padding |
|---|---|---|
| Hero section | pt-32 | pb-24 |
| Content section | py-24 | py-24 |
| CTA section | py-32 | py-32 |
| Metrics bar | py-16 | py-16 |
| Featured section | py-32 | py-32 |
| Footer | pt-24 | pb-12 |

## Component Spacing

| Component | Internal Padding | Gap |
|---|---|---|
| Card | p-6 | gap-4 |
| Blog card | p-4 | gap-3 |
| Button (default) | px-6 py-3 | — |
| Button (large) | px-8 py-4 | — |
| Form input | px-4 py-3 | — |
| Navigation items | px-4 | gap-2 |
| Mobile menu items | px-6 py-4 | — |

## Typography Spacing

| Element | Margin Bottom |
|---|---|
| H1 | mb-6 |
| H2 | mb-4 |
| H3 | mb-3 |
| Paragraph | mb-5 |
| List item | mb-2 |
| Code block | my-8 |
| Blockquote | my-8 |
| Image | my-8 |

## Negative Space / Whitespace

- Hero sections breathe with generous padding
- Content sections are more compact
- Never use padding to separate unrelated content (use actual gaps)
- Whitespace should increase with section importance
- Below-the-fold content can be more dense

## Responsive Spacing Adjustments

```css
/* Example pattern */
section {
  @apply py-16 md:py-24 lg:py-32;
}
```

- Mobile spacing is 66-75% of desktop spacing
- Tablet is ~85% of desktop
- Never reduce padding below 16px (mobile comfort)

## Container Widths

| Container | Class | Max Width |
|---|---|---|
| Default (page content) | container mx-auto | 1280px |
| Narrow (blog) | max-w-[72ch] | ~800px |
| Wide (hero) | container mx-auto | 1280px |
| Full (special) | w-full | 100vw |
