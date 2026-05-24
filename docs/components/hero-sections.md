# Hero Section Components

## HeroSection

The primary brand introduction component. Used on the homepage and key landing pages. Must communicate value proposition immediately while maintaining visual sophistication.

### Props

```typescript
interface HeroSectionProps {
  headline: string
  subtitle?: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  variant?: 'default' | 'centered' | 'split'
  background?: 'grid' | 'gradient' | 'diagonal' | 'none'
  animate?: boolean
  className?: string
}
```

### Variants

| Variant | Layout | Used On |
|---|---|---|
| `default` | Left-aligned text, subtle background | Homepage |
| `centered` | Center-aligned text, full-width | Services, Blog listing |
| `split` | Text left, visual right (image/diagram) | Case studies, About |

### Background Variants

| Background | Implementation | Performance Impact |
|---|---|---|
| `grid` | CSS radial-gradient dot grid, subtle parallax on scroll | Minimal (pure CSS) |
| `gradient` | Subtle linear/radial gradient with animated shift | Low (CSS animation) |
| `diagonal` | Diagonal split between two subtle colors | Minimal (pseudo-element) |
| `none` | Solid background matching theme | None |

### Animation

- **Headline:** Staggered word reveal (opacity + translateY)
- **Subtitle:** Fade in after headline settles
- **CTAs:** Fade in last, with subtle scale
- **Background:** Subtle slow drift or parallax
- **Stagger:** 100ms gap between elements
- **Duration:** 600ms per element
- **Easing:** ease-out cubic bezier

### Accessibility

- No auto-playing animations without `prefers-reduced-motion`
- All animations respect `prefers-reduced-motion: reduce` (opacity only, no movement)
- Heading is an actual `<h1>`
- CTA buttons have visible focus states
- Skip animation entirely on `prefers-reduced-motion`

### Responsive

- Desktop: Large type (text-6xl to text-8xl), spacious layout
- Tablet: Medium type (text-4xl to text-5xl), reduced spacing
- Mobile: Smaller type (text-3xl to text-4xl), stacked CTAs, reduced motion
- Mobile height: 70vh (not full 100vh — gives quicker content access)

### Code Structure

```typescript
export function HeroSection({
  headline,
  subtitle,
  primaryCTA,
  secondaryCTA,
  variant = 'default',
  background = 'grid',
  animate = true,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Layer */}
      <HeroBackground variant={background} />
      
      {/* Content Layer */}
      <div className="container relative z-10">
        <AnimatedHeadline text={headline} animate={animate} />
        {subtitle && <AnimatedSubtitle text={subtitle} animate={animate} />}
        <CTAGroup primary={primaryCTA} secondary={secondaryCTA} animate={animate} />
      </div>
      
      {/* Scroll Indicator (optional) */}
      <ScrollIndicator />
    </section>
  )
}
```

### Reuse Strategy

- Homepage: Default variant, grid background, full animation
- Services: Centered variant, gradient background
- Blog: Centered variant, no background effect, minimal animation
- Case studies: Split variant with image on right
- Lab: Full-width, minimal, no CTA buttons
