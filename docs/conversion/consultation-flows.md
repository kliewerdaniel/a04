# Consultation Booking Flows

## Overview

The consultation booking flow is the most critical conversion path on the site. It takes a warm lead from interest to scheduled call with minimal friction.

## Primary Flow: Contact Form → Booking

```
Visitor lands on /contact
        │
        ▼
Fills out contact form (name, email, project type, message)
        │
        ▼
Form validated + submitted
        │
        ├── Success → Thank you page with:
        │   - Confirmation message ("I'll respond within 48 hours")
        │   - Calendly embed to book directly
        │   - Link to most relevant case study
        │   - Recommended blog posts
        │
        └── Error → Clear error message, retry option, email fallback
```

## Secondary Flow: Direct Booking

```
Visitor clicks "Book a Free Consultation" CTA anywhere on site
        │
        ▼
Direct link to /contact (with #book section)
        │
        ▼
Calendly embed or "Book on Calendly" button
        │
        ▼
Calendly flow:
  - Select date/time
  - Confirm details (pre-filled from form if available)
  - Add to calendar
  - Confirmation email sent
```

## Calendly Configuration

| Setting | Value |
|---|---|
| Event type | 30 min Discovery Call |
| Buffer time | 15 min between calls |
| Availability | Mon-Thu, 9am-5pm CST |
| Minimum notice | 4 hours |
| Max per day | 3 calls |
| Location | Zoom/Google Meet (auto-generated) |
| Questions | Name, Company, Brief project description |
| Confirmation | Auto-email with calendar link |
| Reminder | 24 hours before + 1 hour before |

## What Happens After Booking

### Automated (via Calendly + Resend):
1. Confirmation email → Lead
2. Reminder email (24h before) → Lead
3. Confirmation notification → Daniel
4. Calendar event created for both parties

### Manual (Daniel):
1. Review contact form details (before the call)
2. Check if lead has consumed content (which posts, which magnet)
3. Prepare relevant case studies or examples
4. Take notes during call
5. Send follow-up within 24 hours

## Call Flow

| Phase | Duration | Content |
|---|---|---|
| Introductions | 5 min | Who they are, company, role |
| Problem discovery | 10 min | What they're trying to solve, current state |
| Qualification | 5 min | Budget, timeline, decision process |
| Solution brainstorm | 5 min | How we might approach it |
| Next steps | 5 min | Proposal timeline, what I need from them |
| Total | 30 min | |

## Post-Call Follow-Up

### Within 24 Hours:
```
Subject: Following up on our conversation

Hi [Name],

Thanks for the great conversation about [topic]. 

Here's what I took away:
- [Key insight 1]
- [Key insight 2]
- [Key insight 3]

Next step: I'll send a proposal by [date] outlining [specific deliverable].

In the meantime, here's a case study similar to what we discussed:
[Link]

Best,
Daniel
```

### If No Response After 7 Days:
- Send one gentle follow-up
- Offer a simpler starting point (audit instead of full build)
- After 14 days, move to long-term nurture

## Lead Scoring (Post-Call)

| Signal | Score | Action |
|---|---|---|
| Has budget (stated) | +30 | High priority |
| Has timeline (<1 month) | +25 | Push for quick close |
| Has clear use case | +20 | Easy to scope |
| Referred by trusted source | +15 | Warm relationship |
| Read multiple blog posts | +10 | Understanding of value |
| Downloaded lead magnet | +5 | Some education done |
| No budget stated | -10 | Needs qualification |
| No clear use case | -15 | Needs discovery work |

**Thresholds:**
- 50+: Send proposal within 48 hours
- 30-49: Schedule second call for deeper discovery
- <30: Offer audit + nurture sequence

## CRM Integration

- **Primary:** Manual tracking (spreadsheet + email labels)
- **Secondary:** HubSpot CRM (free tier) if volume >5 leads/month
- **Fields:** Name, Company, Email, Phone (optional), Project type, Budget, Source, Status, Notes, Follow-up date
- **Status pipeline:** New → Contacted → Discovery → Proposal → Negotiation → Won → Lost → Nurture
