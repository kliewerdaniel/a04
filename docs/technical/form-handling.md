# Form Handling Architecture

## Philosophy

Forms are the primary conversion mechanism. They must be:
- Fast to render (minimal re-renders)
- Clear about errors (specific, helpful messages)
- Secure against spam and abuse
- Tracked for optimization

## Technology Stack

- **Validation:** Zod (shared schemas between client and server)
- **State management:** react-hook-form
- **Submission:** Server API routes
- **Spam prevention:** Honeypot + rate limiting

## Form Components

Each form uses the same pattern:

```typescript
// 1. Define schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  // ...
})

type ContactFormData = z.infer<typeof contactSchema>

// 2. Create form component
'use client'
export function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function onSubmit(data: ContactFormData) {
    setState('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setState('success')
      else setState('error')
    } catch {
      setState('error')
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  )
}

// 3. API route validates again
export async function POST(request: Request) {
  const body = await request.json()
  const result = contactSchema.safeParse(body)
  if (!result.success) return Response.json({ error: result.error }, { status: 400 })
  // process...
}
```

## Form Submission Flow

```
User fills form → Client validation (Zod) → Submit → Rate limit check →
Honeypot check → Server validation (Zod) → Process → Response → UI feedback
```

## Form State Machine

Each form has 4 states:
- **idle:** Ready for input
- **submitting:** Loading state, all fields disabled
- **success:** Thank you message
- **error:** Error message with retry

## Error Handling

### Client-Side
- Field-level validation on blur
- Form-level validation on submit
- Inline error messages below each field
- First error field receives focus

### Server-Side
- Same Zod schema validates again
- Network errors shown as generic message
- Specific errors (rate limit, server error) shown with clear message
- Fallback: "Please email me directly" with address

## Accessibility

- All inputs have associated labels
- Error messages use `aria-live="polite"` and `role="alert"`
- Required fields marked visually and with `aria-required`
- Submit button has loading state
- Focus management on state changes
- Form validation errors are announced to screen readers
