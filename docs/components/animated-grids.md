# Animated Grid Components

## AnimatedGrid

A decorative background pattern component that creates subtle visual depth. Used as a hero background and section divider. Must be visually impressive without being distracting.

### Props

```typescript
interface AnimatedGridProps {
  variant?: 'dots' | 'lines' | 'crosshairs'
  density?: 'sparse' | 'medium' | 'dense'
  animate?: boolean
  opacity?: number // 0-1
  color?: string // CSS color value
  parallax?: boolean
  className?: string
}
```

### Variants

| Variant | Pattern | Style |
|---|---|---|
| `dots` | Radial-gradient dot grid | Subtle, technical, like engineering graph paper |
| `lines` | Linear-gradient lines | Clean, architectural blueprint feel |
| `crosshairs` | Intersecting lines + dots | Most technical, CAD-like |

### Density

| Density | Dot/Line Spacing | When to Use |
|---|---|---|
| `sparse` | 64px | Behind text, minimal visual weight |
| `medium` | 32px | Default, behind hero sections |
| `dense` | 16px | Lab page, technical backgrounds |

### Implementation

```typescript
// Pure CSS dot grid — zero JS overhead
export function DotGrid({ opacity = 0.15, animate = true }: AnimatedGridProps) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        opacity,
      }}
    >
      {animate && (
        <div className="absolute inset-0 animate-grid-drift opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            transform: 'translateY(-50%)',
          }}
        />
      )}
    </div>
  )
}
```

### Animation

- **Slow drift:** Background position shifts infinitely (10s cycle)
- **Parallax:** Moves opposite to scroll direction at 0.3x speed
- **Hover regions (optional):** Dots brighten near cursor (costly — use sparingly)
- **Reduced motion:** Static only, no parallax

### Usage Rules

- Always behind content, never on top
- Always low opacity (0.05–0.2)
- Color inherits from text color (blends with theme)
- Dark theme: white dots at low opacity
- Light theme: black dots at lower opacity
- Never use dense + animate + parallax together (motion sickness risk)

### Performance

- Pure CSS approach preferred
- No canvas, no SVG, no JS computation
- GPU-composited (opacity + transform)
- 60fps guaranteed
- No memory allocation
