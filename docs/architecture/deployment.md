# Deployment Architecture

## Platform: Vercel

Vercel is the deployment platform. The choice is deliberate:

- Native Next.js support (obvious)
- Edge Network (global CDN)
- ISR (Incremental Static Regeneration)
- Preview deployments for every branch
- Built-in analytics (privacy-friendly)
- Serverless functions for API routes
- Automatic SSL, custom domains, DDoS protection

## Project Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "redirects": [
    { "source": "/old-blog-path", "destination": "/blog/new-path", "permanent": true }
  ]
}
```

## Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `RESEND_API_KEY` | Transactional email (Resend) | Yes |
| `CONTACT_EMAIL` | Where contact form submissions go | Yes |
| `NEXT_PUBLIC_SITE_URL` | Site URL for OG images, sitemap | Yes |
| `NEXT_PUBLIC_ANALYTICS_ID` | Vercel analytics | Auto |
| `STRIPE_SECRET_KEY` | Payment processing (Phase 5) | Phase 5 |
| `STRIPE_WEBHOOK_SECRET` | Webhook verification | Phase 5 |
| `EMAIL_PROVIDER_API_KEY` | Newsletter provider | Phase 4 |
| `CRM_API_KEY` | CRM integration (optional) | Optional |

## CI/CD Pipeline

```
Git Push to main
       │
       ▼
Vercel GitHub Integration
       │
       ├── Lint (npm run lint)
       │
       ├── TypeScript check (npm run typecheck)
       │
       ├── Build (next build)
       │
       ├── Deploy to Preview URL
       │
       └── Production deploy (after merge)
```

### Branch Strategy

| Branch | Deploy | Purpose |
|---|---|---|
| `main` | Production (vercel.com) | Live site |
| `dev` | Preview | Integration testing |
| `feat/*` | Preview | Feature branches |
| `fix/*` | Preview | Bug fixes |
| `content/*` | Preview | Blog post drafts |

### Automated Checks

- `npm run lint` — ESLint with Next.js config
- `npm run typecheck` — TypeScript strict mode
- `npm run test` — Vitest (if tests exist)
- Build must succeed — Vercel blocks deployment on build failure
- Preview URLs for visual review before production

## ISR Configuration

```typescript
// Incremental Static Regeneration
export const revalidate = 3600 // Revalidate every hour

// Or per-page:
export const dynamic = 'force-static'
export const revalidate = 3600
```

## On-Demand Revalidation

Set up a Vercel webhook or GitHub Action to revalidate content when posts are updated:

```typescript
// app/api/revalidate/route.ts
export async function POST(request: Request) {
  const secret = request.headers.get('x-revalidation-secret')
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  await revalidatePath('/blog')
  await revalidatePath('/sitemap.xml')
  
  return Response.json({ revalidated: true })
}
```

## Domain & DNS

| Record | Value |
|---|---|
| `danielkliewer.com` | A record → 76.76.21.21 (Vercel) |
| `www.danielkliewer.com` | CNAME → cname.vercel-dns.com |
| `_vercel` | TXT → Vercel verification |

## SSL/TLS

- Automatic via Vercel (Let's Encrypt)
- Force HTTPS (Vercel default)
- HSTS enabled

## Performance Budgets

| Metric | Budget |
|---|---|
| Lighthouse Performance | >95 |
| Lighthouse Accessibility | >95 |
| Lighthouse Best Practices | >95 |
| Lighthouse SEO | 100 |
| LCP | <2.0s |
| TBT | <100ms |
| CLS | <0.05 |
| First Load JS | <150KB |
| Total Page Weight | <500KB (no images) |

## Monitoring & Alerting

- **Vercel Analytics:** Core web vitals, page views, errors
- **Uptime monitoring:** Vercel Status Dashboard (or external: Better Uptime)
- **Error tracking:** Vercel Error Logs (or Sentry for advanced needs)
- **Form failures:** Email alert to daniel@danielkliewer.com
- **Build failures:** Vercel deployment notifications
