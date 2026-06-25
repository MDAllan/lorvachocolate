# LORVA Fine Chocolate — Project Plan

## Overview
Build a heritage luxury chocolate e-commerce site with cinematic animations, secure backend, and production-grade features.

## Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Scaffold Next.js 15 + TypeScript project
- [ ] Set up Tailwind CSS + shadcn/ui
- [ ] Configure GSAP, Framer Motion, Lenis
- [ ] Set up Supabase + Drizzle ORM
- [ ] Implement auth with Better-Auth
- [ ] Add Stripe integration
- [ ] Configure Resend email + React Email
- [ ] Set up Upstash Redis rate limiting
- [ ] Add Sentry monitoring
- [ ] Deploy to Vercel + Cloudflare

### Phase 2: Core Features (Week 3-4)
- [ ] Build homepage with hero animations
- [ ] Create product catalog pages
- [ ] Implement shopping cart functionality
- [ ] Build checkout flow with Stripe
- [ ] Add user account management
- [ ] Create admin dashboard
- [ ] Implement email notifications

### Phase 3: Polish & Security (Week 5-6)
- [ ] Add all security middleware (Zod validation, RLS, rate limits, headers)
- [ ] Implement custom cursor and page transitions
- [ ] Optimize animations for performance
- [ ] Add structured data (schema.org)
- [ ] Comprehensive testing and security audit
- [ ] Launch and monitor

## Tech Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- GSAP + ScrollTrigger, Framer Motion, Lenis
- Supabase Postgres + Drizzle ORM
- Better-Auth, Stripe, Resend, Upstash, Sentry
- Vercel + Cloudflare

## Security Checklist
- [ ] Zod validation on all inputs
- [ ] Drizzle for all DB access
- [ ] Server actions with next-safe-action
- [ ] RLS enabled on all tables
- [ ] Argon2 password hashing
- [ ] Stripe webhooks with signature verification
- [ ] Rate limits on all endpoints
- [ ] Security headers in next.config.js
- [ ] No secrets in code/git
- [ ] Sanitized HTML only
- [ ] CORS locked to production domain
- [ ] Audit logs for admin actions

## Brand Compliance
- Colors: #750A04, #242121, #C9A961, #F6EFE9, #F5E0C0, #AC9A86
- Typography: Cormorant Garamond (display), Inter (body)
- Voice: Quietly confident, sensory, patient
- Taglines: "Crafted slowly. Savored deeply.", "The slow art of chocolate."

## Animation Rules
- Ease: cubic-bezier(0.6, 0.01, 0, 0.9)
- Hero reveals: 1.2–1.8s minimum
- Stagger: 80–120ms
- Lenis smooth scroll
- Respect prefers-reduced-motion
- Custom cursor >1024px
- Page transitions with brown curtain wipe

## Dependencies
- pnpm for package management
- Conventional commits
- ESLint + TypeScript strict mode
- Prettier with Tailwind plugin

## Risks & Mitigations
- Security: Follow all rules strictly, run security-review after changes
- Performance: Optimize animations, lazy load images
- Brand consistency: Reference CLAUDE.md for all decisions
- Scope creep: Use Plan Mode for complex changes

## Success Metrics
- Site loads <3s on mobile
- 100% Lighthouse accessibility score
- Zero security vulnerabilities
- Smooth 60fps animations
- Stripe checkout conversion >95%

---

*Last updated: May 2, 2026*