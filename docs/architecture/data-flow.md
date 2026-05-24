# Data Flow Architecture

## Overview

The site is primarily a static content site with interactive islands. Data flows are simple by design — no database, no real-time state, minimal client data. The complexity is in the content pipeline and lead management system.

## Content Data Flow

```
Content Creation                         Build/Request Time
═══════════════════                     ═══════════════════

Markdown Files                            fs.readdir / gray-matter
  ├── content/blog/*.md ──────────────►  parsePost()
  ├── content/case-studies/*.md ──────►  parseCaseStudy()
  └── content/resources/*.md ─────────►  parseResource()
                                               │
                                               ▼
                                        Static Site Generation
                                               │
                                    ┌──────────┼──────────┐
                                    ▼          ▼          ▼
                                Blog       Case       Resource
                                Pages     Studies      Pages
                                               │
                                               ▼
                                        Vercel CDN (Edge)
```

## Lead Data Flow

```
User Action                          API Route              Service
═══════════════                     ════════════           ═══════════

Contact Form Submit ─────────────►  /api/contact ────────►  Email (Resend)
                                     │                       ├── Notification to daniel
                                     │                       └── Auto-reply to lead
                                     ▼
                                  CRM (HubSpot/CSV)
                                     │
                                     ▼
                                  Lead Record Created

Newsletter Signup ──────────────►  /api/subscribe ────────►  Email Provider
                                     │                       (ConvertKit / Buttondown /
                                     ▼                        Mailchimp / Resend)
                                  Email List Updated

Lead Magnet Download ───────────►  /api/download ──────────►  Email Provider
                                     │                       ├── Send download link
                                     │                       └── Tag lead with resource
                                     ▼
                                  Analytics Event
```

## Blog Search Data Flow

```
User Types Search              Client-Side                  Result
══════════════════             ═══════════════              ══════════

Search input ──────────────►  Fuse.js fuzzy match ───────►  Filtered list
  (debounced 300ms)              │                           of blog cards
                                 │
                                 ▼
                            Index loaded at
                            build time into
                            JS bundle
```

## State Management

| Concern | Approach | Why |
|---|---|---|
| Theme (dark/light) | next-themes + localStorage | No server complexity, persisted preference |
| Form state | react-hook-form | Library handles validation, submission, errors |
| Search results | Local component state | Ephemeral, page-level concern |
| Chat messages | Local component state | Context-specific, no global need |
| UI state (modals, menus) | Local component state + React Context | Minimal, section-scoped |
| Content data | Server Component props | Fetched once, never re-rendered client-side |

## No Global Store

There is no Redux, Zustand, or Jotai. The site doesn't need one. All shared state is:
- Passed through Server Component props
- Handled by next-themes (theme context)
- Managed locally with useState for UI interactions

Add a global state solution ONLY if:
- Multiple unrelated components need shared state
- State persists across page navigation
- The URL-based state pattern fails

## API Routes

| Route | Method | Purpose | Rate Limit |
|---|---|---|---|
| `/api/subscribe` | POST | Newsletter subscription | 10/hour per IP |
| `/api/contact` | POST | Contact form submission | 3/hour per IP |
| `/api/download` | POST | Lead magnet delivery | 20/hour per IP |
| `/api/search` | GET | Blog search (optional server-side) | 60/min |
| `/api/webhook` | POST | Stripe/LemonSqueezy events | IP-restricted |
| `/api/posts` | GET | Public blog content API | 60/min |

## Caching Strategy

| Layer | Cache | Duration |
|---|---|---|
| Static pages | Vercel CDN | Until next deploy or ISR trigger |
| Blog content | Vercel CDN (ISR) | Revalidate on new post |
| Public assets | Vercel CDN | 1 year (immutable) |
| API responses | No cache (dynamic) | n/a |
| Images (next/image) | Vercel CDN | Optimized automatically |

## Analytics Data Flow

```
Page View                    Client                  Provider
═══════════════             ═══════════════          ════════════

Route change ────────────►  Vercel Analytics ─────►  Vercel Dashboard
  (next/navigation)          (automatic)

Custom Event ─────────────►  PostHog (optional) ──►  PostHog Dashboard
  (form submit,             (manual tracking)
   download, CTA click)

Error ────────────────────►  Vercel Analytics ────►  Vercel Dashboard
  (error boundaries)         (automatic)
```

## Privacy & Compliance

- **No third-party tracking scripts** (no GA, no Facebook pixel, no Hotjar)
- **Vercel Analytics** is privacy-preserving (no cookies, no PII)
- **Email addresses** stored only in the email provider (ConvertKit or Resend)
- **Form submissions** sent via API route (never exposed to client-side analytics)
- **Privacy policy** covers: what data we collect, how we use it, how to delete it
- **GDPR-ready:** Consent checkbox on all forms, data deletion on request
