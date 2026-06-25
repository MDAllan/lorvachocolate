# Project Inventory: lorvachocolate (LORVA Fine Chocolate)

## Context

Full inventory of what supports this project — every cloned repo, every skill, every agent, every doc — plus the current "results" (what's been shipped so far). This file is the single-page reference for that.

**Project:** `c:\Users\madih\OneDrive\Desktop\lorvachocolate` — "LORVA Fine Chocolate," a Next.js + TypeScript e-commerce site. Features: luxury chocolate branding, cinematic animations, secure payments, product catalog, user accounts. To be deployed to Vercel + Cloudflare.

---

## 1. Cloned sibling repos (at `c:\Users\madih\OneDrive\Desktop\lorvachocolate\`)

All pulled for reference/inspiration. Currently no active consumption into `.claude/` yet.

| Dir | Remote | Purpose |
|---|---|---|
| `ui-ux-pro-max-skill/` | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | Source for the `ui-ux-pro-max` skill |
| `claude-skills/` | https://github.com/alirezarezvani/claude-skills | Collection of Claude skill definitions for reference |

---

## 2. Skills (available via GitHub Copilot)

All sourced from the built-in skills list and cloned repos.

| Skill | One-liner |
|---|---|
| `banner-design` | Design banners for social media, ads, website heroes, creative assets, and print |
| `brand` | Brand voice, visual identity, messaging frameworks, asset management, brand consistency |
| `design` | Comprehensive design skill: brand identity, design tokens, UI styling, logo generation, corporate identity program, banner design, icon design, social photos |
| `design-system` | Token architecture, component specifications, and slide generation |
| `prince-tires-brand` | Prince Tires brand design system (not applicable here) |
| `prince-tires-components` | Complete inventory of Prince Tires Liquid sections and snippets (not applicable here) |
| `skill-creator` | Create new skills, modify and improve existing skills |
| `slides` | Create strategic HTML presentations with Chart.js, design tokens, responsive layouts, copywriting formulas, and contextual slide strategies |
| `ui-styling` | Create beautiful, accessible user interfaces with shadcn/ui components, Tailwind CSS, and canvas-based visual designs |
| `ui-ux-pro-max` | UI/UX design intelligence for web and mobile (50+ styles, 161 color palettes, 57 font pairings, etc.) |
| `get-search-view-results` | Get the current search results from the Search view in VS Code |
| `agent-customization` | Create, update, review, fix, or debug VS Code agent customization files |

---

## 3. Agents (available via GitHub Copilot)

| Agent | Description |
|---|---|
| `Explore` | Fast read-only codebase exploration and Q&A subagent |

---

## 4. Commands (`.claude/commands/`)

None installed yet.

---

## 5. Hooks (`.claude/hooks/`)

None installed yet.

---

## 6. Docs (`docs/` or root)

### Design spec

- `CLAUDE.md` — root design document for the whole LORVA Fine Chocolate product (brand, stack, security, conventions).

### Plans

| Plan | Status | Ship commit |
|---|---|---|
| `PLAN.md` | **Draft** (created this session) | N/A |

---

## 7. Results / current state of the project

### Shipped features (chronological, from the conversation log)

1. **Initial setup** — Cloned `ui-ux-pro-max-skill` and `claude-skills` repos.
2. **Package install** — Installed `motion` npm package.
3. **Environment setup** — Created `.gitignore`, `.env.example`, `.env.local` with placeholder API keys.
4. **Project plan** — Created `PLAN.md` with phases, tech stack, security checklist, and success metrics.

### Live infrastructure

- **None yet** — Project not scaffolded.

### Tests

- **None yet** — Project not scaffolded.

---

## 8. Open / not-yet-done

- **Scaffold the project** — Next.js 15 + TypeScript, Tailwind + shadcn/ui, GSAP/Framer Motion/Lenis, Supabase + Drizzle, auth, Stripe, etc.
- **Implement all phases from PLAN.md** — Foundation, Core Features, Polish & Security.
- **Security compliance** — All rules from CLAUDE.md (Zod, RLS, rate limits, headers, etc.).
- **Brand implementation** — Exact colors, typography, voice, animations.
- **Deployment** — Vercel + Cloudflare.

---

## 9. How to verify this inventory

Run from `c:\Users\madih\OneDrive\Desktop\lorvachocolate`:

```bash
# Cloned repos with their remotes
for d in */; do [ -d "$d/.git" ] && echo "$d → $(git -C "$d" remote get-url origin 2>/dev/null)"; done

# Environment files
ls .env*

# Plan and docs
ls *.md

# Package status
npm list motion
```

No code changes are proposed by this inventory — it's a reference only.

---

*Last updated: May 2, 2026*