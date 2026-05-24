# Phase 4: Conversion Systems

## Duration: 3–5 days
## Goal: Lead generation infrastructure, email capture, CRM integration

## Deliverables

### Email Capture Infrastructure
- [ ] Newsletter signup forms (blog embed, footer, resources, homepage)
- [ ] Lead magnet delivery flow (email → download)
- [ ] Email provider integration (ConvertKit / Resend)
- [ ] Welcome email sequence setup
- [ ] Tagging system for lead segmentation

### Contact Form → CRM Pipeline
- [ ] Contact form submission handler (Zod validation)
- [ ] Honeypot spam prevention
- [ ] Rate limiting (IP-based)
- [ ] Notification email to daniel@danielkliewer.com
- [ ] Auto-reply to lead with confirmation
- [ ] CRM record creation (HubSpot API or CSV log)
- [ ] Fallback: Manual lead spreadsheet

### Consultation Booking
- [ ] Calendly embed with theme matching
- [ ] Post-booking confirmation email
- [ ] Pre-call reminder email (24h + 1h)
- [ ] Booking → CRM pipeline
- [ ] Cancellation handling

### Analytics Integration
- [ ] Form submission tracking
- [ ] Download tracking
- [ ] CTA click tracking
- [ ] Scroll depth tracking
- [ ] Event logging to Vercel Analytics / PostHog

### Compliance
- [ ] Privacy policy page
- [ ] GDPR consent checkboxes on all forms
- [ ] Data deletion request form
- [ ] Cookie notice (if needed — Vercel Analytics may not require one)

### Email Sequences
- [ ] Welcome sequence (5 emails)
- [ ] Post-download nurture sequence (5 emails)
- [ ] Post-consultation booking sequence
- [ ] Weekly digest template
- [ ] Re-engagement sequence (90-day stale)

## API Routes to Build

| Route | Purpose |
|---|---|
| POST /api/subscribe | Newsletter signup |
| POST /api/contact | Contact form |
| POST /api/download | Lead magnet delivery |

## Risk

| Risk | Mitigation |
|---|---|
| Email deliverability issues | SPF/DKIM/DMARC setup before sending |
| Form spammers | Honeypot + rate limiting + optional Turnstile CAPTCHA |
| CRM too complex for low volume | Start with spreadsheet, graduate to CRM |
| Calendly theme clash | Check Calendly customization options |
| Compliance gaps | Privacy policy reviewed before launch |
