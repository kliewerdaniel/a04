# Performance Budgets & Targets

## Core Web Vitals Targets

| Metric | Target | Description |
|---|---|---|
| LCP | <2.0s | Largest Contentful Paint |
| FID/TBT | <100ms | First Input Delay / Total Blocking Time |
| CLS | <0.05 | Cumulative Layout Shift |
| INP | <200ms | Interaction to Next Paint |
| FCP | <1.5s | First Contentful Paint |
| TTFB | <800ms | Time to First Byte |

## Lighthouse Targets

| Category | Target |
|---|---|
| Performance | >95 |
| Accessibility | >95 |
| Best Practices | >95 |
| SEO | 100 |

## Bundle Size Budgets

| Asset | Budget |
|---|---|
| Initial JS (all pages) | <150KB |
| Initial CSS | <50KB |
| Blog page JS | <100KB |
| Homepage JS | <100KB |
| Lab page JS (including interactive) | <300KB |
| Font (Inter, self-hosted) | <50KB (woff2) |

## Image Budgets

| Context | Max Size | Format |
|---|---|---|
| Blog post hero | 200KB | WebP/AVIF |
| Blog post inline | 100KB | WebP/AVIF |
| OG image | 300KB | PNG |
| Case study image | 200KB | WebP/AVIF |
| Profile photo | 50KB | JPEG/WebP |
| Icons/SVGs | 5KB | SVG |

## Performance Optimization Checklist

### Images
- [ ] All images use `next/image` with explicit `width` and `height`
- [ ] Images use `sizes` attribute for responsive loading
- [ ] Images lazy-loaded (`loading="lazy"`) except hero/LCP image
- [ ] Priority attribute on LCP image
- [ ] WebP/AVIF format (via next/image)
- [ ] Proper aspect ratio to prevent CLS

### Fonts
- [ ] Fonts self-hosted via `next/font` (no Google Fonts external request)
- [ ] `font-display: swap` (or `optional`) configured
- [ ] Preload primary font in `<head>`

### JavaScript
- [ ] All third-party scripts loaded async/defer
- [ ] Heavy components (knowledge graph, chat) dynamically imported
- [ ] No unused JavaScript in initial bundle
- [ ] Client components minimized — prefer Server Components

### CSS
- [ ] No unused CSS (Tailwind purge enabled)
- [ ] Inline critical CSS (via Next.js automatic CSS inlining)
- [ ] No `@import` statements

### Caching
- [ ] Static assets have immutable cache headers
- [ ] API responses cached where possible
- [ ] Service worker for offline support (future enhancement)

### Monitoring
- [ ] Vercel Analytics for Core Web Vitals tracking
- [ ] Regular Lighthouse audits
- [ ] Bundle size monitoring (next-bundle-analyzer)
- [ ] Performance regression tests in CI
