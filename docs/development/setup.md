# Development Setup

## Prerequisites

- Node.js 20+
- npm or pnpm
- Git
- VS Code (recommended) with:
  - ESLint extension
  - Tailwind CSS IntelliSense
  - TypeScript + TSX support

## Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd a04

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## Environment Variables

```bash
# .env.local
RESEND_API_KEY=re_xxx
CONTACT_EMAIL=daniel@danielkliewer.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional (Phase 4+)
CONVERTKIT_API_KEY=xxx
CONVERTKIT_FORM_ID=xxx

# Optional (Phase 5+)
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking (tsc --noEmit)
npm run format       # Format code with Prettier
npm run test         # Run tests (if configured)
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── blog/               # Blog routes
│   ├── services/           # Services routes
│   ├── case-studies/       # Case study routes
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── resources/          # Resources page
│   ├── lab/                # Lab routes
│   ├── shop/               # Shop routes (Phase 5)
│   ├── api/                # API routes
│   ├── sitemap.ts          # Sitemap generation
│   ├── robots.ts           # robots.txt
│   └── not-found.tsx       # 404 page
│
├── components/             # React components
│   ├── ui/                 # shadcn/ui components (customized)
│   ├── sections/           # Section-level components
│   ├── layouts/            # Layout components (header, footer)
│   ├── blog/               # Blog-specific components
│   ├── forms/              # Form components
│   ├── animations/         # Animation wrappers
│   └── lab/                # Lab-specific components
│
├── lib/                    # Utility functions
│   ├── blog.ts             # Blog data fetching
│   ├── mdx.ts              # MDX rendering config
│   ├── metadata.ts         # Metadata generation helpers
│   ├── schema.ts           # Schema.org structured data
│   ├── email.ts            # Email functions
│   ├── constants.ts        # Site-wide constants
│   └── utils.ts            # General utilities
│
├── styles/                 # Global styles
│   └── globals.css         # Tailwind imports + custom CSS
│
├── types/                  # TypeScript type definitions
│   └── index.ts            # Shared types
│
└── content/                # Markdown content
    ├── blog/               # Blog post .md files
    ├── case-studies/       # Case study .md files
    └── resources/          # Resource .md files
```

## VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*)[\"'`]"]
  ],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```
