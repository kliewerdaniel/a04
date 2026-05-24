# User Flow: Digital Product Purchase

## Primary Flow

```
Visitor on Blog → Sees product recommendation → Clicks
        │
        ▼
Product Page (/shop/[slug])
        │
        ├── Reads description, pricing, features
        │       │
        │       ├── Clicks "Buy Now"
        │       │       │
        │       │       ▼
        │       │   Checkout (Stripe / LemonSqueezy)
        │       │       │
        │       │       ├── Payment success
        │       │       │       │
        │       │       │       ├── Confirmation page with download link
        │       │       │       ├── Confirmation email with download
        │       │       │       └── Added to email list (tagged: product)
        │       │       │
        │       │       └── Payment failed → Retry or different payment
        │       │
        │       └── Leaves page
        │               │
        │               └── Retargeting: "Still interested in [product]?"
        │
        ├── Has questions → Clicks "Need help?" → /contact
        └── Not ready → Subscribes to newsletter
```

## Post-Purchase Experience

1. **Immediate:** Download link on confirmation page
2. **Immediate:** Email with download link + receipt
3. **24h:** Getting started guide
4. **72h:** Pro tips email
5. **7 days:** "Need help implementing?" → consulting upsell
6. **30 days:** Check-in email + request for review/testimonial

## Pricing Display

| Element | Behavior |
|---|---|
| Price | Large, prominent |
| "Buy" button | Primary CTA |
| Money-back guarantee | Below button |
| What's included | Bullet list |
| Testimonials | Below description |

## Refund Processing

- Customer emails daniel@danielkliewer.com
- Process refund via Stripe/LemonSqueezy dashboard
- Automated confirmation email sent
- Access revoked (if applicable)
