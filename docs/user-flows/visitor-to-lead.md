# User Flow: Visitor to Lead

## Primary Flow

```
Search / Social / Referral
        │
        ▼
Landing on Blog Post
        │
        ├── Reads post (scrolling)
        │       │
        │       ├── Downloads lead magnet (email capture) → Subscriber
        │       ├── Subscribes to newsletter → Subscriber
        │       ├── Clicks related post → Continues reading
        │       └── Clicks CTA → /contact
        │
        ├── Reaches post end
        │       │
        │       ├── Reads related posts
        │       ├── Subscribes to newsletter
        │       └── CTA → /services or /contact
        │
        └── Leaves site (bounce)
                │
                └── Returns via retargeting / later search
```

## Lead Qualification

### Download Lead Magnet
```
Action: Downloads "AI Audit Checklist"
   → Tagged: `interest:audit`, `source:blog-post-[slug]`
   → Added to nurture sequence
   → Score: +10
```

### Subscribe to Newsletter
```
Action: Subscribes via blog embed
   → Tagged: `source:blog`
   → Added to weekly digest
   → Score: +5
```

### Book Consultation (Direct)
```
Action: Books via /contact
   → Score: +50
   → Immediate notification to Daniel
   → Calls booked within 48 hours
```

### Multiple Engagements
```
Action: Downloads lead magnet → Subscribes → Reads 3+ posts
   → Score: +25
   → Tagged: `engaged`
   → Moved to high-priority nurture
   → Personalized email from Daniel
```

## Drop-off Points

| Stage | Drop-off Rate | Recovery Strategy |
|---|---|---|
| Blog post → Lead magnet | ~95% | Improve CTA placement, better magnet value prop |
| Newsletter signup | ~90% | Test different placements, add social proof |
| Lead magnet → Nurture reads | ~60% | Improve email content quality |
| Nurture → Consultation | ~95% | Better targeting, case studies in emails |
| Consultation → Client | ~50% | Improve discovery call process |

## Edge Cases

- **Returns after long gap:** Reactivated via re-engagement sequence
- **Downloads multiple lead magnets:** Merged into single profile, highest-intent tag wins
- **Subscribes from multiple emails:** Identify duplicates, merge manually
- **Books consultation but no-show:** Follow-up email with reschedule link
- **Already a client:** Separate tag, exclude from general nurture
