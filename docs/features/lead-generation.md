# Feature: Lead Generation System

## Overview

The lead generation system is the core business engine. It captures, qualifies, and nurtures leads through multiple touchpoints across the site.

## Capture Points

| Location | Form Type | Data Collected | Conversion Goal |
|---|---|---|---|
| Blog post (end) | Newsletter signup | Email (+ optional name) | Subscribe |
| Blog post (sidebar) | Newsletter signup | Email | Subscribe |
| Footer (all pages) | Newsletter signup | Email | Subscribe |
| Resource page | Lead magnet download | Name + Email + Resource | Download |
| Homepage | Newsletter CTA | Email | Subscribe |
| Contact page | Full inquiry form | Name + Email + Company + Project + Budget + Message | Book consultation |
| Blog post (mid-content) | Contextual CTA | Lead magnet specific | Download |

## Lead Scoring

| Action | Score | Significance |
|---|---|---|
| Page visit | 1 | Low |
| Blog read (50% scroll) | 5 | Medium |
| Newsletter subscribe | 10 | Medium |
| Lead magnet download | 15 | Medium |
| Multiple page visits | 3/visit | Medium |
| Case study read (full) | 20 | High |
| Services page visit | 10 | High |
| Contact page visit | 25 | High |
| Form submission | 50 | Critical |
| Past client returning | 75 | Critical |

## Lead States

```
Anonymous → Identified (email) → Engaged (multiple interactions) → 
Qualified (scored >50) → Opportunity (consultation booked) → Client
                                                                  ↓
                                                           Lost/Inactive
                                                                  ↓
                                                           Nurture
```

## Privacy & Compliance

- All forms have consent checkbox linking to privacy policy
- Email addresses stored only in email provider
- No data sold or shared with third parties
- Right to deletion: contact daniel@danielkliewer.com
- Data retention: indefinite until deletion request
- Analytics: anonymized, no PII in analytics tools
