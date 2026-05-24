# Contact / Consultation Page Specification

## Purpose

The highest-conversion page on the site. This page removes all friction between interest and action. It must feel safe, professional, and low-commitment.

## Target Audience

- Warm leads who've consumed content and are ready to talk
- Direct visitors who were referred or found the site with intent
- Time-pressed decision-makers who want quick information

## Conversion Goals

| Goal | Metric |
|---|---|
| Form submission | Submission rate |
| Calendly booking | Booking complete |
| Email inquiry | Email sent (mailto fallback) |

## Layout Hierarchy

```
┌─────────────────────────────────────────────────┐
│  NAV                                               │
├─────────────────────────────────────────────────┤
│                                                   │
│  HERO                                              │
│  "Let's Build Something"                           │
│  "Tell me about your project."                     │
│                                                   │
├─ TWO-COLUMN LAYOUT ──────────────────────────────┤
│                                                   │
│  LEFT (2/3)                    RIGHT (1/3)        │
│  ┌──────────────────────┐    ┌────────────────┐  │
│  │  CONTACT FORM        │    │  CALENDLY       │  │
│  │                      │    │  EMBED          │  │
│  │  Name                │    │  (or link to    │  │
│  │  Email               │    │   Calendly)     │  │
│  │  Company             │    │                 │  │
│  │  Project Type        │    │  OR             │  │
│  │  Budget Range        │    │                 │  │
│  │  Message             │    │  QUICK INFO     │  │
│  │                      │    │  Response time  │  │
│  │  [Send Message]      │    │  Typical budget │  │
│  │                      │    │  What happens   │  │
│  └──────────────────────┘    │  next           │  │
│                               └────────────────┘  │
│                                                   │
├─ WHAT TO EXPECT ─────────────────────────────────┤
│  "What happens after you reach out:"              │
│  1. I'll respond within 48 hours                  │
│  2. We'll schedule a 30-minute discovery call     │
│  3. If it's a fit, I'll send a proposal           │
│  4. We build                                      │
│                                                   │
├─ FAQ ───────────────────────────────────────────┤
│  "What do I need to prepare for our first call?"  │
│  "How much does a typical project cost?"          │
│  "How long does it take?"                          │
│  "Do you work with startups?"                      │
│  "What if I'm not sure what I need?"              │
│                                                   │
├─ FINAL TEXT ─────────────────────────────────────┤
│  "Still not sure? Read the blog to see how        │
│   I think about AI systems, or check out          │
│   my services to see if one fits."                │
│  [Read the Blog] [View Services]                  │
│                                                   │
├─ FOOTER ──────────────────────────────────────────┤
└─────────────────────────────────────────────────┘
```

## Form Fields

| Field | Type | Validation | Notes |
|---|---|---|---|
| Name | Text | Required, min 2 chars | |
| Email | Email | Required, valid email | |
| Company | Text | Optional | |
| Project Type | Select | Required | Knowledge System, Automation, AI Website, Local AI, Research Pipeline, Other |
| Budget Range | Select | Optional | <$2k, $2k–$5k, $5k–$10k, $10k–$25k, $25k+, Not sure |
| Message | Textarea | Optional | Encourage detail about the problem |
| How did you hear about me? | Select | Optional | Blog, Google, Twitter/X, LinkedIn, Referral, Other |
| Consent | Checkbox | Required | "I agree to the privacy policy" |

## Form Behavior

- **Validation:** Client-side (Zod) + server-side
- **Error handling:** Inline error messages, field-level highlighting
- **Success:** Thank you message with expected response time
- **Failure:** "Something went wrong. Please email me directly at [email]" with fallback
- **Honeypot:** Hidden field for spam prevention (no CAPTCHA)
- **Rate limiting:** Max 3 submissions per IP per hour

## Calendly Integration

- **Option A:** Embed Calendly directly in the page (iframe, styled to match theme)
- **Option B:** "Book a call" button that opens Calendly in a new tab
- **Prefer Option B** — iframes can be flaky with responsive design
- Calendly event: 30-minute discovery call
- Buffer: 15 minutes between calls
- Available hours: Business hours, CST

## What to Expect Section

Clear process visualization:

1. **You reach out** (48-hour response guarantee)
2. **Discovery call** (30 min, no pitch, just understanding your needs)
3. **Proposal** (within 48 hours of the call, fixed-price scope)
4. **We build** (transparent progress, weekly demos)

## FAQ Content

- **"What do I need to prepare?"** — Just a clear description of the problem you're trying to solve
- **"How much does a typical project cost?"** — $5k–$25k depending on scope. Start with an audit for $500.
- **"How long does it take?"** — Most projects deliver in 2–8 weeks
- **"Do you work with startups?"** — Yes. Early-stage companies get priority scheduling.
- **"What if I'm not sure what I need?"** — Book a free call anyway. Part of my job is helping you figure that out.

## CTA Strategy

| CTA | Placement | Design |
|---|---|---|
| Send Message | Form submit | Primary button, full-width |
| Book a Call | Calendly section | Secondary button or direct embed |
| Read the Blog | Final section | Text link |
| View Services | Final section | Text link |

## SEO Targets

- **Primary:** "AI consultant contact", "hire AI engineer"
- **Secondary:** "AI project consultation", "AI systems engineer booking"
- **Title:** "Contact — AI Infrastructure Consulting"
- **Description:** "Ready to build your AI infrastructure? Book a free consultation or send a message. Response within 48 hours."

## Form States

### Default
All fields empty, submit button enabled once required fields filled.

### Validation Error
Red border on invalid field, error message below field, first error field focused.

### Submitting
Loading spinner on button, all fields disabled, "Sending..."

### Success
```
Thank you! I'll respond within 48 hours.

In the meantime, check out the blog for technical content on AI systems.
[Return to Home]
```

### Error
```
Something went wrong. Please try again or email me directly:
daniel@danielkliewer.com

[Try Again]
```

## Mobile Behavior

- Two-column layout collapses to single column (form on top, info below)
- Calendly embed (if used) becomes full-width section below form
- FAQ accordion
- All form elements full-width
- Submit button sticky at bottom on scroll (optional)
