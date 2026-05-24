# Lead Magnets Strategy

## Philosophy

Lead magnets exist to convert anonymous traffic into known leads. Each magnet solves a specific problem for a specific audience segment. The value delivered must exceed the perceived cost of sharing an email address.

## Lead Magnet Catalog

### Tier 1: Top of Funnel (High Volume, Low Effort)

| Magnet | Format | Target Audience | Conversion Point |
|---|---|---|---|
| AI Infrastructure Audit Checklist | PDF (1 page) | Technical founders evaluating AI | All blog posts |
| Local LLM Deployment Quickstart | PDF + bash script | Developers wanting to run local models | Technical guides |
| AI Workflow Ideas for Your Business | PDF (5-page guide) | Business owners | Services page |

### Tier 2: Middle of Funnel (Medium Effort, Qualified Leads)

| Magnet | Format | Target Audience | Conversion Point |
|---|---|---|---|
| RAG System Architecture Template | PDF + Miro board | Engineers planning RAG systems | RAG-related posts |
| AI Agent Design Workbook | PDF (20-page workbook) | Technical leads building agents | Agent-related posts |
| AI Readiness Scorecard | Google Sheets | CTOs evaluating AI adoption | Homepage, services |

### Tier 3: Bottom of Funnel (High Effort, Highly Qualified)

| Magnet | Format | Target Audience | Conversion Point |
|---|---|---|---|
| Build vs Buy: AI Infrastructure Decision Framework | PDF + spreadsheet | Decision-makers | Case studies |
| Technical Sprint Blueprint | PDF (project plan) | Clients near decision point | Contact page |

## Lead Magnet Creation Process

1. **Identify gap:** What question do readers keep asking?
2. **Create:** Make it valuable enough to pay for (but give it away)
3. **Design:** Clean, branded, professional (Canva or similar)
4. **Gate:** Email capture → instant delivery
5. **Follow up:** Nurture sequence tagged by magnet topic

## Delivery System

```typescript
// Flow: User clicks download → Modal with email form → Submit → 
//       API stores email → Email sent with download link → 
//       Redirect to thank-you page with instant download

// Storage: Email provider (ConvertKit) with tag for specific magnet
// Tagging: Each magnet is a separate tag for segmentation
```

## Call-to-Action Placement

| Placement | Magnet | Format |
|---|---|---|
| End of all blog posts | AI Audit Checklist | Inline banner |
| Sidebar (all blog pages) | Local LLM Quickstart | Small card |
| Mid-article (contextual) | Related specific magnet | Text link |
| Services page | AI Readiness Scorecard | Section CTA |
| Case study pages | Build vs Buy Framework | Bottom CTA |
| Contact page | Technical Sprint Blueprint | Sidebar |

## Performance Tracking

| Metric | Target | Why |
|---|---|---|
| Download rate | >5% of page views | Magnet appeal |
| Email validation rate | >95% | Quality of capture |
| Open rate (delivery email) | >60% | Engagement |
| CTA click in nurture | >10% | Lead quality |
| Consultation from magnet | >1% | Ultimate conversion |
