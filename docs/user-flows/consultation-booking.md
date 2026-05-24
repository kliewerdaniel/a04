# User Flow: Consultation Booking

## Primary Flow

```
Visitor reads content → CTA → /contact
        │
        ▼
Land on Contact Page
        │
        ├── Fills out contact form
        │       │
        │       ├── Validation error → Fixed → Resubmit
        │       │
        │       └── Success → Thank you page
        │               │
        │               ├── Books Calendly call directly
        │               └── Waits for email response (48h)
        │
        ├── Books Calendly call directly (if form feels like friction)
        │       │
        │       └── Confirmation → Calendar event → Reminder
        │
        └── Leaves (not ready)
                │
                └── Email retargeting (nurture sequence)
```

## Secondary Flow: Direct Referral

```
Referred by past client → Lands on /contact (or /services)
        │
        ├── Books consultation (higher conversion rate)
        └── Mentions referrer in form
```

## Edge Cases

### Form Abandonment
- If form started but not submitted, no action (no data captured yet)
- Consider: Exit-intent popup with "Need help? Email me directly"

### Duplicate Submission
- Check email in CRM → update existing lead, don't duplicate
- Send "Thanks for reaching out again" response

### Booking Cancellation
- Calendly handles cancellation
- Email notification to Daniel
- Add to nurture sequence

### No-Show
- Calendly sends reschedule link
- Follow-up email 24h after missed appointment
- Move back to nurture after 2 no-shows
