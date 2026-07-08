# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server (localhost:3000)
pnpm build        # production build
pnpm lint         # ESLint
pnpm lint:fix     # ESLint with auto-fix
pnpm typecheck    # tsc --noEmit (no test suite exists)

pnpm db:push      # push schema changes directly to DB (dev shortcut, skips migration files)
pnpm db:generate  # generate migration files from schema diff
pnpm db:migrate   # run pending migrations

# One-off admin account creation (requires dev server running + .env.local set)
npx tsx lib/auth/seed-admin.ts
```

## Required Environment Variables (`.env.local`)

```
DATABASE_URL=              # Supabase PostgreSQL connection string
BETTER_AUTH_SECRET=        # random secret for better-auth session signing
NEXT_PUBLIC_APP_URL=       # e.g. http://localhost:3000 or deployed URL
RESEND_API_KEY=            # transactional email via Resend
UPSTASH_REDIS_REST_URL=    # rate-limiting on API routes
UPSTASH_REDIS_REST_TOKEN=
```

## Architecture

### Stack
- **Next.js 15** App Router with TypeScript, deployed on Vercel
- **Drizzle ORM** + `postgres.js` → **Supabase PostgreSQL**
- **better-auth** (email/password only) — admin-only, no customer accounts
- **Tailwind CSS v3** + Radix UI primitives (shadcn pattern)
- **Framer Motion** for animations, **Lenis** for smooth scrolling
- **Resend** for email, **Upstash Redis** for rate limiting, **Sentry** for errors

### Database (`lib/db/`)
- Single schema file: `lib/db/schema.ts` — all tables defined here
- Client: `lib/db/client.ts` — singleton to survive Next.js hot reloads; max 1 connection in production (Vercel serverless), max 5 in dev
- `drizzle.config.ts` points to `lib/db/migrations/` for generated SQL
- `decimal` columns (`price`, `total`, `costPerUnit`, etc.) come back as strings from Drizzle — always wrap in `Number()` before arithmetic

### Data Flow Pattern
All pages that display editable content follow this pattern:
1. Server Component calls `getSiteContent()` → returns `Record<string, string>` from the `siteContent` table (key/value CMS)
2. `content` is passed as a prop to every section component
3. Components read `content.some_key ?? 'fallback value'`
4. All writes go through **Server Actions** in `lib/actions/` — every action calls `requireAdmin()` which checks the better-auth session via `auth.api.getSession({ headers: await headers() })`

### Auth
- `lib/auth/config.ts` — better-auth config with Drizzle adapter
- Auth check: `const session = await auth.api.getSession({ headers: await headers() })` — presence of session = admin
- No middleware guards; each admin page/action does its own session check
- Admin login: `/admin/login` → redirects to `/admin` on success

### Admin Portal (`/admin`)
Route group `app/admin/(dashboard)/` with its own layout. Pages:
- `/admin` — dashboard with order/product stats
- `/admin/orders` — review `orderRequests` table; update status
- `/admin/products` — CRUD for `products` table
- `/admin/content` — inline edit any `siteContent` key/value pair
- `/admin/gallery` — upload images to Supabase Storage, manage `galleryImages` table
- `/admin/costs` — ingredient & recipe cost tracking for profitability

### Order Flow
Orders never go through Stripe directly in the current UX. Customers fill out forms → API routes (`/api/breakable`, `/api/favors`, `/api/contact`) → saved to `orderRequests` table → admin reviews and confirms manually. `orders` table and Stripe session ID column exist but are not used in the active purchase flow.

### Products Table Quirks
- `flavors` and `tags` are stored as JSON strings in `text` columns — always parse with `JSON.parse()` and serialize with `JSON.stringify()` (see `parseProduct()` in `lib/data/products-db.ts`)
- Three price fields: `price12`, `price16` (box sizes for bonbons), `priceEach` (individual). The plain `price` column is legacy/unused.

### Cost Tracking Tables
`ingredients` → `recipeIngredients` → `recipes` → `orderCostOverrides`. These power the `/admin/costs` profit analysis dashboard. `computedCost` is auto-calculated from recipes; `manualCost` overrides it per order.

### Public Routes
`/products`, `/breakable`, `/favors`, `/gallery`, `/about`, `/contact`, `/custom`, `/privacy`, `/terms`

### Brand Design Tokens
CSS variables in `app/globals.css`:
- `--cocoa-wine: #750A04` / `--deep-cocoa: #242121` / `--champagne-gold: #C9A961`
- `--cream: #F6EFE9` / `--vanilla: #F5E0C0` / `--taupe: #AC9A86`

Font CSS variables are named `--font-cormorant` (Josefin Sans) and `--font-inter` (Montserrat) — the variable names are legacy from when different fonts were used; the actual loaded fonts are Josefin Sans and Montserrat.

### Static Assets
All images are in `public/gallery/`, `public/hearts/`, `public/balls/`, `public/fillings/`. The breakable heart builder uses PNG/JPG photo compositing (not SVG) — `hearts/dark-outside.png`, `hearts/dark-inside.png`, etc. for each shell type.
