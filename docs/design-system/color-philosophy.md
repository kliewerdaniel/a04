# Color Philosophy

## Overview

The color system communicates **depth, precision, and calm authority.** It's dark-mode first by design — the light theme is a clean, crisp adaptation rather than a separate system.

## Design Principles

1. **Restraint** — Fewer colors, used with intention. No color is decorative.
2. **Depth through contrast** — Meaning is conveyed through contrast ratios and layering, not hue variety.
3. **Accent as signal** — Color is reserved for interactive elements, emphasis, and brand moments.
4. **Dark-first** — Dark mode is the primary experience. Light mode is an accessibility adaptation.

## Color Palette

### Base (Dark Theme)

| Token | Hex (Dark) | Purpose |
|---|---|---|
| `--background` | `#0a0a0b` | Page background (near-black) |
| `--foreground` | `#fafafa` | Primary text (near-white) |
| `--card` | `#141415` | Card/section background |
| `--card-foreground` | `#fafafa` | Card text |
| `--popover` | `#141415` | Dropdown/modal background |
| `--popover-foreground` | `#fafafa` | Popover text |
| `--muted` | `#1a1a1b` | Subtle section backgrounds |
| `--muted-foreground` | `#a1a1aa` | Secondary text, metadata |
| `--border` | `#27272a` | Borders, dividers |
| `--ring` | `#3b82f6` | Focus rings, selection |

### Base (Light Theme)

| Token | Hex (Light) | Purpose |
|---|---|---|
| `--background` | `#ffffff` | Page background |
| `--foreground` | `#09090b` | Primary text |
| `--card` | `#ffffff` | Card/section background |
| `--card-foreground` | `#09090b` | Card text |
| `--muted` | `#f4f4f5` | Subtle section backgrounds |
| `--muted-foreground` | `#71717a` | Secondary text |
| `--border` | `#e4e4e7` | Borders, dividers |
| `--ring` | `#3b82f6` | Focus rings |

### Accent / Semantic

| Token | Hex (Dark) | Hex (Light) | Purpose |
|---|---|---|---|
| `--primary` | `#3b82f6` | `#2563eb` | CTAs, links, active states |
| `--primary-foreground` | `#ffffff` | `#ffffff` | Text on primary |
| `--secondary` | `#27272a` | `#f4f4f5` | Secondary backgrounds |
| `--secondary-foreground` | `#fafafa` | `#09090b` | Text on secondary |
| `--accent` | `#8b5cf6` | `#7c3aed` | Highlights, special marks |
| `--accent-foreground` | `#ffffff` | `#ffffff` | Text on accent |
| `--destructive` | `#ef4444` | `#dc2626` | Errors, warnings |
| `--success` | `#22c55e` | `#16a34a` | Confirmations, metrics |
| `--code-bg` | `#1a1a1b` | `#f4f4f5` | Code block background |

## Color Usage Rules

### When to Use Primary (Blue)
- Primary CTAs (main action buttons)
- Active navigation links
- Important links within content
- Focus rings

### When to Use Accent (Purple)
- Philosophical/thought leadership content markers
- Lab page interactive elements
- Special badges or highlights
- Knowledge graph node colors

### When to Use Success (Green)
- Metric numbers in case studies
- Confirmation messages
- "Available" or "Ready" status indicators

### When to Use Destructive (Red)
- Form validation errors
- Destructive actions (delete, remove)

### NEVER Use
- Random gradient backgrounds
- Neon colors (cyan, pink, lime)
- Generic blue gradient buttons
- AI-generated color schemes
- More than 3 colors in a single view without hierarchy

## Dark Mode Specifics

- Background: `#0a0a0b` — true near-black, not dark gray
- Cards: `#141415` — one step above background
- Borders: `#27272a` — visible but not harsh
- Text: `#fafafa` — near-white, not pure white (reduces eye strain)
- Shadows: Black with varying opacities (no colored shadows)

## Light Mode Adaptation

Light mode is a deliberate accessible alternative, not a "reverse" of dark mode:
- Keep contrast ratios high (AA minimum, AAA preferred)
- Maintain the same accent colors (they work on both)
- Don't feel like a different brand
- Preserve all spacing and density

## Implementation

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --accent: 262.1 83.3% 57.8%;
    --accent-foreground: 210 40% 98%;
    /* ... */
  }
 
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 5.9%;
    --card-foreground: 0 0% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --accent: 262.1 83.3% 57.8%;
    --accent-foreground: 210 40% 98%;
    /* ... */
  }
}
```
