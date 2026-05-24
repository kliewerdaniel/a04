# Metrics Section Components

## MetricsBar

A horizontal row of key statistics. Used to establish credibility through numbers.

### Props

```typescript
interface MetricsBarProps {
  metrics: Array<{
    value: string
    label: string
    prefix?: string
    suffix?: string
  }>
  animate?: boolean
  variant?: 'default' | 'compact' | 'accent'
}
```

### Variants

| Variant | Layout | Used On |
|---|---|---|
| `default` | Centered row, large numbers | Homepage |
| `compact` | Smaller numbers, inline | About page |
| `accent` | Colored numbers, highlighted background | Case studies |

### Animation

- Count-up animation on scroll into viewport
- Numbers animate from 0 to final value over 1.5s
- Uses `requestAnimationFrame` for smooth animation
- Respects `prefers-reduced-motion` (show final values immediately)
- Staggered: each metric starts 200ms after the previous

### Implementation Pattern

```typescript
function AnimatedMetric({ value, label, prefix, suffix }: MetricProps) {
  const [displayValue, setDisplayValue] = useState(animate ? '0' : value)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          animateValue(parseInt(value), setDisplayValue)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold tracking-tight">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
```

### Responsive

- Desktop: Single row, 4-5 metrics
- Tablet: 2x2 grid
- Mobile: 2x2 grid, smaller text

### Accessibility

- Values are static text for screen readers (animation is visual only)
- `aria-hidden="true"` on animated spans
- Real values in `aria-label` if animation is present

---

## MetricHighlight

An individual metric emphasized within content, used inside MDX articles.

```typescript
interface MetricHighlightProps {
  value: string
  label: string
  context?: string
  variant?: 'inline' | 'block'
}
```
