# Email Workflow Automation

## Transactional Emails

These are triggered by specific user actions and delivered via Resend.

### Contact Form Confirmation
**Trigger:** Contact form submitted
**To:** Lead
**Delay:** Immediate
**Template:**
```
Subject: Thanks for reaching out, {name}

Hi {name},

Thanks for your message about {projectType}. I'll review it and respond within 48 hours.

In the meantime, here's a case study relevant to your needs:
{relevantCaseStudyLink}

Best,
Daniel
```

### Contact Form Notification
**Trigger:** Contact form submitted
**To:** daniel@danielkliewer.com
**Delay:** Immediate
**Template:**
```
Subject: NEW LEAD: {name} — {projectType}

Name: {name}
Email: {email}
Company: {company}
Project: {projectType}
Budget: {budget}
Message: {message}
Source: {referral}
```

### Lead Magnet Delivery
**Trigger:** Lead magnet download form submitted
**To:** Lead
**Delay:** Immediate
**Template:**
```
Subject: Your download is ready

Hi {name},

Here's your free download: {resourceName}
{downloadLink}

This guide covers:
• {key point 1}
• {key point 2}
• {key point 3}

If you have questions or want to discuss how this applies to your situation, book a free call:
{calendlyLink}

Best,
Daniel
```

### Consultation Confirmation
**Trigger:** Calendly booking
**To:** Lead
**Delay:** Immediate
**Template:**
```
Subject: Confirmed: Discovery Call on {date}

Hi {name},

Our 30-minute discovery call is confirmed for {date} at {time}.

Meeting link: {zoomLink}

To make the most of our time, please:
1. Think about the specific problem you want to solve
2. Note any constraints (budget, timeline, tech stack)
3. Jot down any questions you have

Looking forward to it,
Daniel
```

## Nurture Emails

These are scheduled sequences managed via the email provider (ConvertKit/Buttondown).

### Post-Lead Magnet Nurture (5 emails over 30 days)
```
Email 1 (Day 0): Deliver the magnet
Email 2 (Day 3): Related case study
Email 3 (Day 7): "How I approach projects like yours"
Email 4 (Day 14): Consultation offer
Email 5 (Day 30): Additional resource + soft CTA
```

### Post-Purchase Nurture (4 emails over 14 days)
```
Email 1 (Day 0): Receipt + download instructions
Email 2 (Day 2): Getting started tips
Email 3 (Day 7): Advanced usage guide
Email 4 (Day 14): "Need help implementing?" → consultation CTA
```

### Weekly Digest (ongoing, every Tuesday)
```
Subject: This week in AI systems

• Featured post: {link}
• Quick thought: {personal note}
• Resource of the week: {link}
• What I'm building: {update}

Reply and say hi — I read every response.
```

## Email Infrastructure

| Provider | Purpose | Volume |
|---|---|---|
| Resend | Transactional emails | Low (<100/month) |
| ConvertKit / Buttondown | Newsletter + nurture sequences | Medium (<10k/month) |
| Calendly | Meeting reminders | Low |

## SPF/DKIM/DMARC Setup

```
SPF: v=spf1 include:resend.net include:convertkit.com ~all
DKIM: Configured in Resend + ConvertKit
DMARC: p=quarantine; rua=mailto:daniel@danielkliewer.com
```

## Templates

All emails should be:
- Plain text preferred (higher engagement)
- HTML fallback for tracking
- Mobile-optimized (40%+ opens on mobile)
- Branded with name + site link only
- No images (they trigger spam filters)
