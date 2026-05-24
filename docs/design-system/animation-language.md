# Animation Language & Motion Philosophy

## Motion Philosophy

Animation is not decoration. Every motion must serve a purpose: guide attention, communicate hierarchy, provide feedback, or enhance storytelling.

### Core Principles

1. **Subtle over flashy** — If someone notices the animation, it's too much.
2. **Purpose-driven** — Every animation has a reason: feedback, focus, or flow.
3. **Duration matters** — Shorter is better. 200-300ms for interactions, 400-600ms for entrances.
4. **Consistent physics** — All animations share the same easing curve, creating a unified feel.
5. **Accessibility-first** — `prefers-reduced-motion` removes all non-essential motion.

## Easing System

```typescript
// Shared easing curves
const easings = {
  // Default: smooth, natural deceleration
  default: [0.25, 0.1, 0.25, 1],
  // Expressive: bouncier, for hero elements
  expressive: [0.34, 1.56, 0.64, 1],
  // Exit: quick, subtle
  exit: [0.25, 0.1, 0.25, 1],
  // Blur-in: for background reveals
  blur: [0.25, 0.1, 0.25, 1],
}

// In Tailwind config
theme: {
  extend: {
    transitionTimingFunction: {
      'in-expo': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      'out-expo': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    },
    transitionDuration: {
      'fast': '200ms',
      'normal': '300ms',
      'slow': '500ms',
    },
  },
}
```

## Animation Categories

### Page Transitions
- Smooth route transitions using Framer Motion's AnimatePresence
- Fade + scale (0.98→1) for page content
- Duration: 300ms
- Only on top-level route changes, not shallow navigation

### Entrance Animations
Elements animate in when they enter the viewport:

| Element | Animation | Duration | Delay |
|---|---|---|---|
| Hero headline | Word stagger (opacity + translateY 20px) | 600ms | 100ms each |
| Card grid items | Fade up (opacity + translateY 30px) | 400ms | 100ms stagger |
| Metrics numbers | Count up | 1500ms | 200ms stagger |
| Section headers | Fade in + slight slide | 400ms | 0 |
| Page content | Fade in | 300ms | 0 |

### Interaction Animations

| Element | Trigger | Animation | Duration |
|---|---|---|---|
| Buttons | Hover | Scale 1.02, shadow deepen | 200ms |
| Buttons | Click/Tap | Scale 0.98 | 100ms |
| Cards | Hover | TranslateY -4px, shadow | 200ms |
| Links | Hover | Underline grow from center | 200ms |
| Navigation | Scroll | Background opacity 0→1 | 300ms |
| Mobile menu | Open | Slide from right | 300ms |
| Theme toggle | Click | Rotate icon | 300ms |

### Scroll Animations

- Sections fade in as they enter viewport (IntersectionObserver)
- Hero background parallax (0.3x scroll speed)
- Staggered card reveals (grid items appear sequentially)
- No scroll-triggered animations that affect layout (no CLS)

## Implementation Patterns

### Reusable Animation Wrapper

```typescript
// components/animations/fade-in.tsx
'use client'

import { motion } from 'motion/react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  className?: string
}

export function FadeIn({ children, delay = 0, direction = 'up', duration = 0.4 }: FadeInProps) {
  const directionOffset = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {},
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

### Stagger Container

```typescript
// components/animations/stagger.tsx
'use client'

import { motion } from 'motion/react'

export function StaggerContainer({ children, staggerDelay = 0.1 }: {
  children: React.ReactNode
  staggerDelay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
    >
      {children}
    </motion.div>
  )
}
```

### Word Stagger (Hero)

```typescript
export function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(' ')
  
  return (
    <motion.h1 className="..." initial="hidden" animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
      }}
    >
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.h1>
  )
}
```

## Reduced Motion

```typescript
// Respect user preference
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

// Usage:
const animationProps = prefersReducedMotion
  ? { initial: {}, animate: {}, transition: {} } // No motion
  : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
```

## What NOT to Animate

- Page backgrounds (no video loops)
- Navigation items (except underline)
- Footer content
- Legal text
- Form labels
- Decorative elements (keep them static)
- Loading states (use minimal spinners or skeleton, no elaborate loaders)

## Performance

- All animations must run at 60fps
- Use `transform` and `opacity` only (GPU-composited properties)
- Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`
- Use `will-change` sparingly (only on elements actively animating)
- IntersectionObserver for scroll triggers (not scroll listeners)
- Prefer CSS animations for simple transitions (hover effects, color changes)
- Reserve Framer Motion for complex sequences (stagger, shared layout)
