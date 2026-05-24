# CRM & Lead Management

## Current State (Phase 1-3)

**No CRM.** Leads are managed via:
- Email inbox (daniel@danielkliewer.com)
- Manual spreadsheet (Google Sheets)
- Email provider tags (ConvertKit/Buttondown)

**Why this is OK:** Low lead volume initially (<10/month). Manual management is sufficient and avoids complexity.

## Target State (Phase 4+)

When lead volume exceeds 10/month, adopt a CRM:

### Option 1: HubSpot CRM (Free)
- **Cost:** Free (starter tier)
- **Features:** Contact management, deal pipeline, email tracking, meeting links
- **Integration:** API for form submission → HubSpot contact creation
- **Best for:** Easy setup, familiar interface

### Option 2: Self-Hosted (TwentyCRM / SuiteCRM)
- **Cost:** Free (self-hosted) or ~$30/mo hosted
- **Features:** Full CRM, no per-user fees
- **Integration:** REST API
- **Best for:** Full control, no monthly fees scaling

## Lead Pipeline Stages

```
New → Contacted → Discovery → Proposal → Negotiation → Won/Lost
 │                                                         │
 └──→ Nurture (if not ready)                               └──→ Archived
```

## Lead Fields (CRM)

| Field | Required | Source |
|---|---|---|
| Name | Yes | Form |
| Email | Yes | Form |
| Company | No | Form |
| Phone | No | Form (optional field) |
| Project Type | Yes | Form |
| Budget Range | No | Form |
| Source | Yes | Form or attribution |
| Lead Magnet | No | Download tracking |
| First Contact Date | Auto | Form submission |
| Last Contact Date | Auto | Activity |
| Notes | Manual | Call notes |
| Score | Auto | Scoring rules |
| Status | Manual | Pipeline stage |

## Automation Rules

| Trigger | Action |
|---|---|
| Form submitted | Create contact, send notification |
| Lead magnet downloaded | Tag contact, send email |
| Website visit (identified) | Update last activity |
| Email opened | Increase engagement score |
| Email clicked | Increase engagement score |
| No activity >60 days | Move to nurture sequence |
| Consultation booked | Move to discovery stage |
| Proposal sent | Move to proposal stage |
| Contract signed | Move to won |

## Manual Processes

For low volume, these processes are manual:
1. Check form submissions daily
2. Send proposal within 48 hours of discovery call
3. Log call notes within 24 hours
4. Follow up weekly until decision
5. Nurture lost leads quarterly
6. Archive stale leads after 6 months

## Export & Backup

- Monthly CSV export of all lead data
- Backup to Google Drive / Dropbox
- Email provider contacts backed up separately
- GDPR: Right to deletion process documented
