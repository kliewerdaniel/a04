# Navigation System Components

## Header

The primary site navigation. Must be minimal, functional, and not distract from content.

### Props

```typescript
interface HeaderProps {
  transparent?: boolean // Transparent until scroll
}
```

### Behavior

```
States:
- Top of page: Transparent background, light text (on dark hero)
- Scrolled: Solid background (bg-background/80 blur backdrop)
- Mobile: Hamburger menu → slide-in overlay
- Sticky at top of viewport always
```

### Links

| Item | Path | Priority |
|---|---|---|
| Home | `/` | Logo link |
| Services | `/services` | 1 |
| Case Studies | `/case-studies` | 2 |
| Blog | `/blog` | 3 |
| Lab | `/lab` | 4 |
| About | `/about` | 5 |
| Contact | `/contact` | Button (accent style) |

### Desktop Layout

```
[Logo]  [Services] [Case Studies] [Blog] [Lab] [About]  [Contact →] [🌓]
```

### Mobile Layout

```
[Logo]                                            [🌓] [☰]
```

Slide-in panel:
```
┌─────────────────────┐
│  ✕                  │
│                     │
│  Services           │
│  Case Studies       │
│  Blog               │
│  Lab                │
│  About              │
│                     │
│  [Contact →]        │
│                     │
│  Social links       │
│  Newsletter signup  │
└─────────────────────┘
```

### Animation

- Background transition: 300ms ease (transparent → solid)
- Mobile menu: slide from right, 300ms ease-out
- Link underline: grows from center on hover
- Active route: subtle indicator (underline or dot)

### Accessibility

- Skip link at top: "Skip to main content"
- Semantic `<nav>` with `aria-label="Main navigation"`
- Mobile menu: `aria-expanded` on toggle, focus trap when open
- Escape key closes mobile menu
- Visible focus indicators on all items
- No auto-hiding on scroll (bad UX)

---

## Footer

Site footer with navigation, social links, and newsletter signup.

### Props

```typescript
interface FooterProps {
  showNewsletter?: boolean
}
```

### Layout

```
┌─────────────────────────────────────────────────┐
│                                                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │ Services│ │ Content │ │ Connect │            │
│  │─────────│ │─────────│ │─────────│            │
│  │ Knowledge│ │ Blog    │ │ GitHub  │            │
│  │ Systems │ │ Resources│ │ Twitter │            │
│  │ Workflow│ │ Lab     │ │ LinkedIn│            │
│  │ AI Sites│ │ Case St.│ │ Email   │            │
│  │ Local AI│ │         │ │         │            │
│  │ Research│ │         │ │         │            │
│  └─────────┘ └─────────┘ └─────────┘            │
│                                                   │
│  Newsletter: [______] [Subscribe]                 │
│                                                   │
│  © 2026 Daniel Kliewer · Privacy Policy           │
│  Built with Next.js · Local AI Infrastructure     │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Responsive

- Desktop: 3-column link grid + newsletter
- Tablet: 2-column + newsletter
- Mobile: Single column accordion + newsletter

---

## ThemeToggle

Dark/light mode switch.

```typescript
interface ThemeToggleProps {
  variant?: 'icon' | 'switch'
}
```

- Uses `next-themes` `useTheme` hook
- Icon: Sun/Moon toggle with rotation animation
- OR Switch: Fancy animated toggle
- Persists to localStorage via next-themes
- No flash of wrong theme (next-themes script injection)
- Icon variant preferred (minimal, familiar)
