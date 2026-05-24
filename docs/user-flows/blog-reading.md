# User Flow: Blog Reading

## Primary Flow

```
Search Engine → Blog Post
        │
        ▼
Reads article
        │
        ├── 0-25%: Scanning, deciding if worth time
        │       │
        │       ├── Engaged → Continues reading
        │       └── Not engaged → Bounces
        │
        ├── 25-75%: Reading main content
        │       │
        │       ├── Sees contextual CTA (lead magnet / newsletter)
        │       │       │
        │       │       ├── Converts → Subscriber
        │       │       └── Continues reading
        │       │
        │       └── Reads code examples (technical posts)
        │
        └── 75-100%: Conclusion + CTA
                │
                ├── Related posts → Continues browsing
                ├── Newsletter signup → Subscriber
                ├── Lead magnet → Downloader
                ├── Consultation CTA → Lead
                └── Leaves (return via future content)
```

## Reading Behavior by Content Type

### Technical Guides
- Heavy scanning for code blocks
- Jumping between sections using TOC
- High time-on-page, high conversion
- Likely to download related code/lead magnet

### Philosophical Essays
- Linear reading (beginning → end)
- High shareability, lower conversion
- Likely to subscribe to newsletter (not buy)
- Good for brand building

### Tutorials
- Step-by-step following
- Multiple return visits
- High engagement, high lead magnet conversion
- Most likely to book consultation

### Project Write-ups
- Focus on architecture and results
- Skim implementation details
- High conversion to consultation (proof of capability)

## Exit Points & Recovery

| Exit Point | Attempted Recovery |
|---|---|
| 30s without scroll | None (respect user intent) |
| 50% scroll | Newsletter signup (inline) |
| End of article | Lead magnet + related posts |
| Back button | None (can't intercept) |
| Close tab | None (can't intercept) |

## Mobile Behavior

- Shorter reading sessions (2-3 min average)
- Higher bounce rate (60%+)
- Lower newsletter conversion (but still meaningful)
- Code blocks are harder to read (horizontal scroll)
- TOC is collapsed by default
