# LORVA Fine Chocolate

A heritage luxury chocolate e-commerce site built with Next.js 15, featuring cinematic animations and secure payments.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Animation:** GSAP + ScrollTrigger, Framer Motion, Lenis
- **Database:** Supabase Postgres + Drizzle ORM
- **Auth:** Better-Auth
- **Payments:** Stripe Checkout + Webhooks
- **Email:** Resend + React Email
- **Rate Limiting:** Upstash Redis
- **Monitoring:** Sentry
- **Hosting:** Vercel + Cloudflare

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables in `.env.local` (copy from `.env.example`)

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `pnpm dev` — Start development server
- `pnpm build` — Build for production
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint
- `pnpm typecheck` — Run TypeScript type checking
- `pnpm db:generate` — Generate Drizzle migrations
- `pnpm db:push` — Push schema to database
- `pnpm db:migrate` — Run migrations

## Project Structure

```
lorvachocolate/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Public marketing pages
│   ├── (shop)/                   # Cart, checkout, account
│   ├── api/webhooks/stripe/      # Stripe webhook handler
│   ├── admin/                    # Admin (auth-gated)
│   └── layout.tsx
├── components/
│   ├── ui/                       # shadcn primitives
│   ├── animations/               # Reusable motion components
│   └── sections/                 # Page-level sections
├── lib/
│   ├── db/                       # Drizzle schema + client
│   ├── auth/                     # Better-Auth config
│   ├── stripe/                   # Stripe client + helpers
│   ├── email/                    # Resend client + templates
│   ├── ratelimit/                # Upstash limiter setup
│   └── validations/              # Zod schemas
├── server/actions/               # All server actions
├── styles/                       # Additional styles
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── CLAUDE.md                     # Project brief and rules
├── PLAN.md                       # Project plan
└── INVENTORY.md                  # Project inventory
```

## Brand Guidelines

- **Colors:** Cocoa Wine (#750A04), Deep Cocoa (#242121), Champagne Gold (#C9A961), Cream (#F6EFE9), Vanilla (#F5E0C0), Taupe (#AC9A86)
- **Typography:** Cormorant Garamond (headings), Inter (body)
- **Voice:** Quietly confident, sensory, patient
- **Taglines:** "Crafted slowly. Savored deeply.", "The slow art of chocolate."

## Security

This project follows strict security practices including:
- Zod validation on all inputs
- Drizzle ORM with no raw SQL
- Server actions wrapped in next-safe-action
- RLS enabled on all Supabase tables
- Argon2 password hashing
- Stripe webhook signature verification
- Rate limiting on all endpoints
- Security headers in next.config.js

See `CLAUDE.md` for complete security rules.

## Deployment

Deploy to Vercel with Cloudflare in front for CDN and WAF.

1. Connect repo to Vercel
2. Set environment variables in Vercel dashboard
3. Configure Cloudflare DNS and proxy
4. Enable Cloudflare WAF rules

## Contributing

1. Follow the rules in `CLAUDE.md`
2. Use Plan Mode for complex changes
3. Run `pnpm lint && pnpm typecheck` before committing
4. Conventional commit format
5. Security-review after changes touching auth/payments/databaseGet real keys now - Full production-ready features
