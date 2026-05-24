# API Routes Architecture

## Overview

API routes handle dynamic server-side operations that can't be done at build time. They are minimal by design — most of the site is static. Only form submissions, webhooks, and search need runtime endpoints.

## Route Definitions

### `POST /api/subscribe`

Newsletter email capture.

**Request:**
```json
{
  "email": "user@example.com",
  "name": "Jane Doe",
  "source": "blog-embed",
  "resource": "ai-audit-checklist"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Check your email for confirmation."
}
```

**Response (400):**
```json
{
  "success": false,
  "error": "Invalid email address"
}
```

**Implementation:**
```typescript
// Zod validation
import { z } from 'zod'

const subscribeSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100).optional(),
  source: z.string().max(50).optional(),
  resource: z.string().max(100).optional(),
})

export async function POST(request: Request) {
  const body = await request.json()
  const result = subscribeSchema.safeParse(body)
  
  if (!result.success) {
    return Response.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
  
  // Add to email provider (ConvertKit / Buttondown / Resend)
  await addSubscriber(result.data)
  
  // If resource, send download link
  if (result.data.resource) {
    await sendDownloadEmail(result.data.email, result.data.resource)
  }
  
  return Response.json({ success: true })
}
```

### `POST /api/contact`

Contact form / consultation request.

**Request:**
```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "company": "Acme Corp",
  "projectType": "knowledge-system",
  "budgetRange": "5000-10000",
  "message": "We need help building a RAG system...",
  "referralSource": "blog"
}
```

**Implementation:**
```typescript
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  projectType: z.enum(['knowledge-system', 'automation', 'ai-website', 'local-ai', 'research', 'other']),
  budgetRange: z.string().optional(),
  message: z.string().max(5000).optional(),
  referralSource: z.string().max(50).optional(),
  consent: z.boolean().refine(val => val === true, { message: 'You must agree to the privacy policy' }),
})
```

**Actions on submission:**
1. Validate with Zod
2. Check honeypot field (if filled, silently accept but don't process — spam prevention)
3. Send notification email to daniel@danielkliewer.com via Resend
4. Send auto-reply to lead with expected response time
5. Add to CRM (HubSpot or CSV log)
6. Log analytics event

### `POST /api/download`

Lead magnet delivery (always gated behind email).

**Request:**
```json
{
  "email": "user@example.com",
  "name": "Jane Doe",
  "resource": "ai-audit-checklist"
}
```

**Response:**
```json
{
  "success": true,
  "downloadUrl": "/downloads/ai-audit-checklist.pdf"
}
```

**Implementation:**
1. Validate email
2. Add subscriber (if new)
3. Tag subscriber with resource name
4. Send email with download link
5. Log download event to analytics
6. Return download URL for immediate redirect

### `GET /api/search`

Server-side blog search (optional — client-side search is preferred).

**Query params:**
- `q`: Search query (required, min 2 chars)
- `category`: Filter by category (optional)
- `tag`: Filter by tag (optional)
- `limit`: Max results (default: 20)

**Response:**
```json
{
  "results": [
    {
      "title": "Building a Local-First Knowledge Graph",
      "slug": "building-a-private-knowledge-graph-with-local-ai-agents",
      "description": "Step-by-step guide...",
      "date": "2026-03-17",
      "category": "Technical Guides",
      "tags": ["knowledge-graph", "local-llm"],
      "readingTime": 12
    }
  ],
  "total": 42
}
```

### `POST /api/webhook` (Phase 5)

Payment processing webhooks from Stripe or LemonSqueezy.

**Events handled:**
- `checkout.session.completed` — Grant product access
- `payment_intent.succeeded` — Confirm payment
- `customer.subscription.updated` — Manage subscriptions
- `customer.subscription.deleted` — Revoke access

## Rate Limiting

| Route | Limit | Window | Strategy |
|---|---|---|---|
| `/api/subscribe` | 10 requests | 1 hour | IP-based |
| `/api/contact` | 3 requests | 1 hour | IP-based |
| `/api/download` | 20 requests | 1 hour | IP-based |
| `/api/search` | 60 requests | 1 minute | IP-based |
| `/api/webhook` | Unrestricted | n/a | Signature verification |

```typescript
// Simple in-memory rate limiter (or use upstash-rate-limiter for production)
const rateLimits = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = rateLimits.get(ip)
  
  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  
  if (entry.count >= limit) return false
  
  entry.count++
  return true
}
```

## Security

- **CORS:** API routes only respond to the site's own origin (or webhook providers)
- **Validation:** Every input validated with Zod
- **Spam prevention:** Honeypot hidden field on forms
- **Rate limiting:** IP-based limits on all submission endpoints
- **No secrets in client code:** API keys, email provider tokens, webhook secrets are server-only
- **Webhook verification:** Stripe signatures, LemonSqueezy secret validation

## Honeypot Spam Prevention

```typescript
// In the form component
<input
  type="text"
  name="website"
  className="hidden" // CSS hidden, not display:none
  tabIndex={-1}
  autoComplete="off"
/>

// In the API route
if (body.website) {
  // Bot filled the honeypot — silently accept but don't process
  return Response.json({ success: true })
}
```
