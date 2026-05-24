# Email Monetization Funnel

## Funnel Architecture

```
                  ┌─────────────────────┐
                  │  Website Visitor    │
                  └─────────┬───────────┘
                            │
                    ┌───────▼───────┐
                    │  Lead Magnet  │
                    │  Signup       │
                    └───────┬───────┘
                            │
                    ┌───────▼──────────────┐
                    │  Welcome Sequence    │
                    │  (5 emails, 30 days) │
                    └───────┬──────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
      ┌────────────┐ ┌────────────┐ ┌────────────┐
      │ Product    │ │ Content    │ │ Consult    │
      │ Buyer     │ │ Subscriber │ │ Booker    │
      └─────┬──────┘ └─────┬──────┘ └──────┬─────┘
            │              │               │
            ▼              ▼               ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │ Nurture to   │ │ Weekly       │ │ Onboarding   │
    │ Consulting   │ │ Digest       │ │ Sequence     │
    └──────────────┘ └──────────────┘ └──────────────┘
```

## Tagging Strategy

Every subscriber is tagged by:
- **Source:** `source:blog`, `source:lead-magnet-audit`, `source:product`
- **Interest:** `interest:rag`, `interest:automation`, `interest:philosophy`
- **Behavior:** `downloaded:audit`, `purchased:starter-kit`, `cta:consultation`
- **Score:** Hot/Warm/Cold based on engagement

## Email Sequences

### Welcome Sequence (All New Subscribers)

| # | Delay | Subject | Content | Goal |
|---|---|---|---|---|
| 1 | Immediate | Your download is ready | Deliver lead magnet, brief intro | Value |
| 2 | Day 2 | The system I'm most proud of | Best case study | Credibility |
| 3 | Day 5 | How I think about AI | Philosophy + approach statement | Connection |
| 4 | Day 9 | Real results from real systems | Metrics, testimonials | Social proof |
| 5 | Day 14 | Want to see if AI fits your business? | Free consultation CTA | Conversion |

### Post-Purchase Sequence

| # | Delay | Content | Goal |
|---|---|---|---|
| 1 | Immediate | Purchase confirmation + download | Transactional |
| 2 | Day 2 | Getting started guide | Product adoption |
| 3 | Day 7 | Pro tips for your purchase | Value expansion |
| 4 | Day 14 | "Need help customizing this?" | Consulting upsell |

### Re-engagement Sequence (90+ days no open)

| # | Delay | Content | Goal |
|---|---|---|---|
| 1 | Day 0 | "Did you miss something?" | Interest check |
| 2 | Day 5 | "This was my most popular post" | Value reminder |
| 3 | Day 14 | "Should I keep sending these?" | Explicit permission |

## Email Frequency

| Segment | Frequency | Max/Month |
|---|---|---|
| Hot (opened <14 days) | Weekly | 4 |
| Warm (opened 14-60 days) | Bi-weekly | 2 |
| Cold (opened >60 days) | Monthly | 1 |
| Product buyers | Product updates + offers | 4 |
| Consultation leads | Case studies + offers | 4 |

## Key Metrics

| Metric | Target |
|---|---|
| Welcome sequence open rate | >60% |
| Welcome sequence click rate | >15% |
| Weekly digest open rate | >40% |
| Weekly digest click rate | >5% |
| Re-engagement success rate | >10% |
| Unsubscribe rate (monthly) | <0.5% |
| Spam complaints | <0.1% |
| Consultation booking from email | >1% |
