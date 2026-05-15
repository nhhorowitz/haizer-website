# Haizer — Project Context for Claude Code

This file is what Claude Code reads on every session. It defines what we're building, the tech stack, design tokens, conventions, and rules. **Treat this as source-of-truth.** If something here conflicts with a user request, ask before deviating.

---

## What we're building

Haizer is a real estate marketplace for the heimishe (Orthodox Jewish) community in the NY/NJ tri-state area. Headline: **"Homes. Flips. Rentals. Direct."** Sub-headline: *"Buy, sell, rent, and flip — all in one place. Free to list, always."*

Direct seller-to-buyer (or seller-to-agent) messaging. No commissions. No middlemen. Manual moderation. Heimishe-aware: no stock photos with people, Shabbos/Yom Tov notification pause, community-specific features like Eruv proximity.

**Launch cities (6):** Boro Park · Williamsburg · Flatbush · Monsey · Lakewood · Kiryas Joel (KJ)

**Listing types (5):** For Sale · For Rent · Flip · Land · Commercial · (Multi-Family as a Sale sub-type)

---

## Tech stack — use exactly these

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript strict mode |
| Styling | Tailwind CSS 4 |
| Database / Auth / Storage | Supabase (Postgres + Auth + Storage + Realtime + Edge Functions) |
| Email | Resend |
| SMS | Twilio (phone verification only) |
| Payments | Stripe (subscriptions + one-off Checkout) |
| Hosting | Vercel (auto-deploy from GitHub main) |
| Maps | Mapbox GL JS |
| Component primitives | Radix UI + Tailwind — **DO NOT install shadcn** |
| Search | Postgres full-text search (built-in) — upgrade to Typesense only if performance requires |
| Analytics | PostHog (free tier) |
| Error monitoring | Sentry (free solo-dev tier) |
| Image pipeline | `sharp` in Supabase Edge Functions: resize 2000px max long edge, WebP convert, strip EXIF, generate 3 sizes (400/1000/2000px) |
| Calendar | HebCal API (for Shabbos/Yom Tov dates) |

Do not suggest alternatives. Do not switch frameworks mid-build. Use this stack.

---

## Design tokens — use these CSS variables

Define these in `globals.css` as CSS variables and as `tailwind.config.ts` extensions.

### Colors

**Brand:**
- `--color-emerald-primary: #064E3B` — logo, primary CTAs, one or two brand moments per screen MAX. Restraint is the rule.
- `--color-emerald-hover: #043B2C`
- `--color-emerald-subtle: #D1FAE5` — small tags, Active status only

**Surfaces:**
- `--color-bg-page: #FAF8F3` — warm cream, the page background (replaces cold white)
- `--color-bg-card: #FFFFFF` — pure white sits on cream for photo pop
- `--color-bg-secondary: #F5F2EC` — stat cards, hover states, footer

**Text:**
- `--color-text-primary: #1A1A1A` — softened charcoal, never pure black
- `--color-text-secondary: #64748B` — slate
- `--color-text-tertiary: #94A3B8` — placeholders, metadata

**Borders:**
- `--color-border-default: #E2E8F0`
- `--color-border-hover: #CBD5E1`
- Focus ring: `--color-emerald-primary` at 30% opacity

**Functional (use sparingly):**
- `--color-rose: #F43F5E` — save/heart action ONLY
- `--color-terracotta: #E2725B` — promoted listing tint, featured accent
- `--color-success: #10B981` — Active status badges only
- `--color-red: #DC2626` — errors only
- `--color-blue: #3B82F6` — info, rare

### Typography

- **Font family:** Outfit (Google Fonts) — load via `next/font/google`
- Weights used: 400 (body) · 500 (subheads, buttons) · 600 (headings)
- Large-scale hierarchy: big confident prices and headings. Never tiny text.
- **Sentence case always.** Never Title Case. Never ALL CAPS.
- Minimum body text size: 14px. Prefer 16px.

### Geometry

- Card / panel corners: 10-12px
- Button / input corners: 6-8px
- Badge / tag corners: 999px (pill)
- Border weight: 1px default · 0.5px for subtle separators

### Motion

- Button hover: 150ms ease, scale(1.02), soft shadow lift
- Button active: 100ms, scale(0.98)
- Card hover: 150ms, 1% scale, subtle shadow, border darkens to `--color-border-hover`
- Listing photo on card hover: 300ms zoom to 105%
- Save heart pop: scale 1.4 → 1, color shift to rose, 250ms ease-out

---

## Coding conventions

- **TypeScript strict mode.** All files typed.
- **Server Components by default.** Use `'use client'` only when state, events, or browser APIs are needed.
- **Tailwind utilities, not custom CSS.** Custom CSS only for animations or things Tailwind can't express.
- **Server actions** for mutations (Next.js feature) — avoid creating API routes unless integrating webhooks.
- **All amounts formatted** with commas via `Intl.NumberFormat`: `$485,000` not `485000`.
- **All dates** in `M/D/YYYY` format. Use `date-fns` for date math.
- **Phone numbers** in `(XXX) XXX-XXXX` format.
- **All times** displayed in Eastern Time by default, override in user settings.
- **No emojis** in UI text. Anywhere.
- **Sentence case** for all headings and buttons.

---

## File structure

```
/haizer
  /app                  — Next.js App Router pages
    /(auth)             — signup, signin, forgot-password
    /(marketing)        — homepage, /agents, /tools, /field-notes, /pros
    /(app)              — dashboard, listings, messages, settings
    /admin              — admin panel
    /api                — webhooks (Stripe, etc.)
    layout.tsx          — root layout
    globals.css         — design tokens
  /components
    /ui                 — buttons, inputs, primitives (Radix-wrapped)
    /listings           — listing card, gallery, detail components
    /dashboard          — dashboard cards
    /forms              — listing creation steps, settings forms
    /calculators        — calculator components
  /lib
    supabase.ts         — Supabase client (server + browser)
    stripe.ts           — Stripe client
    resend.ts           — email helpers
    hebcal.ts           — Shabbos/Yom Tov calendar
    formatting.ts       — currency, date, phone formatters
  /hooks                — custom React hooks
  /types                — TypeScript types
  /supabase
    /migrations         — SQL migrations
    /functions          — Edge Functions (scheduled jobs, image processing)
  /emails               — React Email templates
  /docs
    /spec               — feature specs (read by you, the developer)
    haizer-v5-state-export.md — master reference
  /public               — static assets, favicons
  CLAUDE.md             — this file
```

---

## Important rules — these are non-negotiable

### Listing lifecycle
- Two states only: **Active** and **Pending**. No Sold state. (We don't have MLS access; can't verify sales.)
- Listings default to Active when admin approves
- Seller can flip Active → Pending (under contract) or back
- Listings auto-expire 30 days after publication; seller gets 3-day-before reminder email
- Expired listings stay in seller's dashboard with "Relist" CTA

### Approval
- **All listings require admin approval before going live.** No auto-publish at launch.
- Admin Queue lives at `/admin/listings`. Listings appear with status `pending_review`.
- Admin can: Approve · Reject (with reason) · Request changes
- Trusted-agent flag: after admin manually approves 10 clean listings from one agent, system marks that agent for auto-approve on future listings.

### Photos
- Limit: **50 photos per listing for all users.** No tier distinction.
- Auto-process via Edge Function on upload (sharp): resize 2000px max, WebP, strip EXIF, generate 3 sizes.
- First photo = cover by default; swap by reorder.

### Privacy
- Phone numbers between users hidden until both parties have exchanged 2+ messages each.
- Email never exposed in chat.
- View counts on a listing: visible only to listing owner (never public).
- Save counts on a listing: public (social proof).

### Shabbos / Yom Tov
- All emails and push notifications pause from candle-lighting through 1hr after Havdalah/Yom Tov end.
- Use HebCal API for accurate dates per launch city's timezone.
- Verification codes are an exception — they go through immediately (they expire).
- Calendar fallback: hardcoded yearly schedule if API fails.

### Calculators
- Show numbers only. **No verdict tags** (no "good deal/bad deal/marginal"). That bias favors buyers over sellers. Calculators are neutral tools.
- BRRRR and Fix-and-Flip include full investor metrics: closing costs, holding period costs, cap rate, ROI, ROC, monthly cash flow, breakeven analysis.

### Heimishe touches
- No social media links in profiles at launch.
- No people in hero stock photos (prefer property/architecture).
- City names use community conventions ("Boro Park" not "Borough Park"; "KJ" or "Kiryas Joel" both fine).
- Heimishe-specific listing features (binary checkboxes, seller self-reported): Eruv access · Walk to shul · Yeshiva nearby · Bais Yaakov/Cheder nearby · Mikvah nearby.
- No language selector at launch (English only). Phase 2 evaluate Yiddish/Hebrew.

### Auth & verification
- Hybrid email verification: dashboard access immediate on signup, verification required only before messaging, listing creation, or claiming Verified badges.
- Forgot password: do **not** reveal whether an email is registered (prevents user enumeration attacks).
- Manual verification for badges (Verified Buyer/Seller/Agent) — admin approves via document upload.

---

## Pricing & monetization

| Tier | Price | Audience |
|---|---|---|
| Free Agent | $0 | Anyone — list freely, basic profile, verification, messages |
| Store Pro | $49/mo | Anyone (FSBO or agent) — custom logo, URL slug, banner, extended bio, analytics, Pro badge. $29/mo launch promo first 90 days. |
| Brokerage | $149/mo | Multi-agent firms — not on public pricing page; surfaced contextually |
| Featured Agent | $249/mo | Top placement in agent search + homepage rotation |
| Pro Agent / Lead Routing | $499–799/mo | ZIP exclusivity + FSBO lead routing |
| Promoted Listings | $49/week per listing | Visibility boost for any listing |

Stripe Customer Portal handles all self-serve billing actions. Webhooks update the `subscriptions` and `promoted_listings` tables.

---

## Build order

Build features in this exact sequence. Don't skip ahead — later features depend on earlier ones.

1. Auth + signup flow
2. Homepage (12 sections — use the Claude Design prompts already in repo)
3. Listing detail page
4. Listings search/index (with Map toggle via Mapbox)
5. Listing creation flow (all 5 listing types + Multi-Family)
6. Unified dashboard
7. Messages
8. Settings (all sections)
9. Admin panel (Listings review, Users, Verifications, Subscriptions, Promoted, Reports, Cities, Settings)
10. Stripe wiring (Store Pro + Brokerage + Featured + Pro Agent + Promoted Listings)
11. All 4 Calculators (Mortgage, BRRRR, Fix-and-Flip, Deal Analyzer)
12. Agent profile / Store page
13. City pages (`/cities/[slug]`)
14. Service Provider Directory (build code; don't link from nav until 5-10 providers per category seeded)
15. Field Notes blog (basic — start with 5-10 articles)
16. Featured Agent placement system
17. Pro Agent / Lead Routing
18. Auto-republish for expired listings (cron via Edge Function)
19. Static pages (About, Contact, Terms, Privacy, FAQ, 404, 500)

---

## Critical DON'Ts

- Don't install shadcn/ui — use Radix primitives + Tailwind directly
- Don't add gradients on buttons (locked design rule)
- Don't add drop shadows except subtle hover lift
- Don't use stock photos with people in any hero
- Don't propose Title Case headings
- Don't add emoji to UI text
- Don't auto-publish listings (admin approval required)
- Don't show user phone numbers before the 2-message threshold
- Don't send emails during Shabbos/Yom Tov (queue and release after)
- Don't reveal whether an email is registered in forgot-password flow
- Don't add "good deal/bad deal" verdicts to calculators
- Don't suggest alternative tech stacks mid-build

---

## Platform: Windows

- Use PowerShell or WSL terminal
- Git: `core.autocrlf=true` recommended
- Use forward slashes in code; backslashes only in PowerShell commands when needed
- Node.js LTS version required

---

## How to work with this project

When the user asks you to build a feature:

1. **Read this CLAUDE.md fully** before starting.
2. **Read the relevant spec section** from `/docs/haizer-v5-state-export.md` (the master spec). The user will tell you which section.
3. **Read existing repo files** that the new feature will touch.
4. **Plan the implementation** — list files to create or modify, dependencies to add, migrations to write.
5. **Ask for approval** before making changes ("I'm going to create these N files and add these dependencies. OK?").
6. **Implement** step by step. Show diffs.
7. **Suggest the user test** the feature locally with `npm run dev`.
8. **Suggest a commit message** when done.

When the user reports a bug or issue:

1. Read the error message carefully.
2. Identify the file(s) likely responsible.
3. Propose a fix with explanation of why it broke.
4. Apply the fix on approval.

When in doubt: ask. Don't guess at product decisions. The user is non-technical and relies on you to flag ambiguity.
