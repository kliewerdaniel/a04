# Contact Forms Specification

## Form Components

### Primary Contact Form (`/contact`)

Designed for consultation inquiries. Must collect enough information to qualify the lead without being overwhelming.

```typescript
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email'),
  company: z.string().max(200).optional(),
  projectType: z.enum([
    'knowledge-system',
    'automation',
    'ai-website',
    'local-ai',
    'research',
    'other',
  ], { required_error: 'Please select a project type' }),
  budget: z.enum([
    'under-2k',
    '2k-5k',
    '5k-10k',
    '10k-25k',
    'over-25k',
    'not-sure',
  ]).optional(),
  message: z.string().max(5000).optional(),
  referral: z.enum([
    'blog', 'google', 'twitter', 'linkedin',
    'referral', 'github', 'other',
  ]).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please agree to the privacy policy' }) }),
})
```

### Newsletter Signup (Embedded)

Minimal — collect just enough to start the relationship:

```typescript
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  name: z.string().max(100).optional(),
  source: z.string().max(50).optional(),
})
```

### Lead Magnet Download

Captures email + tags by resource:

```typescript
const downloadSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  name: z.string().min(2).max(100),
  resource: z.string().min(1),
})
```

## Form Components Architecture

```typescript
// Base form field
interface FormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
  required?: boolean
}

// Text input
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

// Select
interface SelectFieldProps {
  label: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
  error?: string
  value: string
  onChange: (value: string) => void
}

// Textarea
interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

// Checkbox
interface CheckboxFieldProps {
  label: string
  error?: string
  checked: boolean
  onChange: (checked: boolean) => void
}
```

## Form States

### Default
- All fields empty
- Submit button disabled until required fields filled and valid
- Helper text visible ("We'll never share your email")

### Validation
- Inline error messages below each field
- Red border on invalid fields
- First invalid field receives focus after submit attempt
- Real-time validation on blur (not on every keystroke)

### Submitting
- Submit button shows loading spinner
- All fields disabled
- "Sending..." text on button
- Prevent double submission

### Success
```
┌──────────────────────────────────────────────┐
│  ✓ Message Sent!                              │
│                                               │
│  Thanks, [Name]. I'll respond within 48 hours.│
│                                               │
│  In the meantime:                             │
│  • Read a case study →                        │
│  • Check out the latest blog posts →          │
│  • Book a call directly →                     │
│                                               │
│  [Back to Home]                               │
└──────────────────────────────────────────────┘
```

### Error
```
┌──────────────────────────────────────────────┐
│  ✗ Something went wrong.                      │
│                                               │
│  Please try again or email me directly at:    │
│  daniel@danielkliewer.com                     │
│                                               │
│  [Try Again]                                  │
└──────────────────────────────────────────────┘
```

## Form Analytics

| Event | Trigger | Tracked In |
|---|---|---|
| Form viewed | Section visible | PostHog / Vercel |
| Field focus | First interaction | PostHog |
| Field error | Validation failure | PostHog |
| Form submitted | Submit click | PostHog + server log |
| Form success | Submission confirmed | Server log + email |
| Form error | Submission failed | Server log + alert |

## A/B Testing Opportunities

| Variant A | Variant B | Metric |
|---|---|---|
| 5 fields | 7 fields (more info) | Completion rate |
| "Send Message" | "Book Consultation" | Click-through |
| Single column | Two column | Time to complete |
| With Calendly | Without Calendly | Booking rate |
| No budget question | Budget question | Lead quality |
