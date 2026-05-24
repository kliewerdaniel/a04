# CTA Block Components

## CTASection

A standalone call-to-action block used throughout the site to drive conversions. Must be visually distinct without being aggressive.

### Props

```typescript
interface CTASectionProps {
  headline: string
  body?: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  variant?: 'default' | 'subtle' | 'prominent'
  background?: 'default' | 'accent' | 'glass'
  align?: 'center' | 'left'
  animate?: boolean
  className?: string
}
```

### Variants

| Variant | Visual Style | When to Use |
|---|---|---|
| `default` | Medium contrast, rounded container | End of content pages |
| `subtle` | Border only, minimal background | In-content CTAs |
| `prominent` | Full-width, accent background, larger type | Final CTA on homepage |

### Positions

- **End of page:** Prominent variant, full-width background
- **Mid-content:** Subtle variant, bordered box
- **Sidebar:** Minimal, just headline + button
- **Blog embed:** Inline with surrounding text

### Content Patterns

```typescript
// End of case study
{
  headline: "Have a similar challenge?",
  body: "Let's discuss how we can build something for your team.",
  primaryCTA: { text: "Book a Free Consultation", href: "/contact" }
}

// Blog post embed
{
  headline: "Need help implementing this?",
  body: "I build production AI systems for organizations.",
  primaryCTA: { text: "Get in Touch", href: "/contact" },
  variant: "subtle"
}

// Homepage final
{
  headline: "Ready to Build?",
  body: "Let's talk about your AI infrastructure needs.",
  primaryCTA: { text: "Book a Free Consultation", href: "/contact" },
  variant: "prominent"
}
```

### Animation

- Fade up on scroll into view
- Button pulse on hover (subtle scale)
- Background color shift on scroll

### Responsive

- Desktop: Full CTA with both buttons
- Mobile: Stacked layout, full-width buttons
- No animation on reduced-motion

### Accessibility

- Buttons have visible focus rings
- Skip animation on reduced-motion
- High contrast text on accent backgrounds
- Buttons include aria-labels

---

## InlineCTA

A lightweight, in-context CTA for embedding within blog posts.

```typescript
interface InlineCTAProps {
  text: string
  href: string
  service?: string
  variant?: 'button' | 'link'
}
```

Used within MDX content via `<CTABox service="consulting">`.

---

## StickyCTA (Optional)

A bottom-of-screen CTA bar that appears after scrolling past certain content depth. Use sparingly — only on long blog posts.

### Rules
- Only appears after 50% scroll depth
- Dismissible
- Not shown on mobile (takes too much screen space)
- Not shown if user already converted (check localStorage)
