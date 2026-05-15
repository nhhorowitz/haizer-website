# Haizer — Build Playbook

**Your operator's manual.** This file tells you what to do, what to type at Claude Code, and in what order. Keep it open while building.

---

## Mental model — what's what

Before anything else, understand the three files in your project:

| File | Where it lives | What it's for |
|---|---|---|
| `CLAUDE.md` | Repo root (`/CLAUDE.md`) | Persistent context. Claude Code reads this on every session. You barely touch it after initial drop-in. |
| `haizer-v5-state-export.md` | `/docs/haizer-v5-state-export.md` | Master spec reference. The blueprint. You point Claude Code at specific sections when building each feature. |
| `build-playbook.md` *(this file)* | `/docs/build-playbook.md` | The step-by-step for YOU. What to do in what order. Exact prompts to copy-paste at Claude Code. |

You = product owner. You make decisions and test.
Claude (here, in claude.ai) = thinking partner for product/architecture questions.
Claude Code (in your terminal) = the actual engineer that writes the code.
Cursor = the editor where you watch what gets built.
GitHub = where the code lives.
Vercel = where the live site runs (auto-deploys from GitHub).

---

## One-time setup (30-45 min, do once)

### 1. Install everything

On Windows (PowerShell):
```powershell
# Install Node.js LTS from https://nodejs.org (you said you already have it — confirm with `node --version`)
# Install Git from https://git-scm.com (you said you already have it — confirm with `git --version`)
# Install Cursor from https://cursor.com

# Install Claude Code (in PowerShell, run as admin):
irm https://claude.ai/install.ps1 | iex

# After install, sign in:
claude
# Browser opens for authentication with your Claude Pro/Max account
```

### 2. Drop the three files into your repo

You already have a GitHub repo with HTML/CSS files from Claude Design. In that repo:

1. Place `CLAUDE.md` at the **repo root** (same level as `package.json` will live)
2. Create a `/docs/` folder
3. Place `haizer-v5-state-export.md` in `/docs/`
4. Place `build-playbook.md` (this file) in `/docs/`

Final structure should look like:
```
/haizer
  /docs
    haizer-v5-state-export.md
    build-playbook.md
  /[your existing Claude Design files]
  CLAUDE.md
  README.md (optional)
```

Commit and push:
```powershell
git add CLAUDE.md docs/
git commit -m "Add CLAUDE.md and spec docs"
git push
```

### 3. Set up Vercel + Supabase + Stripe + Resend accounts

You'll need these. Set them up now so you have credentials ready:

- **Vercel** → vercel.com → connect your GitHub repo → it'll auto-deploy on every push
- **Supabase** → supabase.com → create a new project named "haizer" → save the project URL + anon key + service role key
- **Stripe** → stripe.com → create an account → use test mode until launch → save publishable key + secret key
- **Resend** → resend.com → create an account → save API key
- **Mapbox** → mapbox.com → create an account → save access token
- **Twilio** → twilio.com → create an account (for SMS verification) → save Account SID + Auth Token

You don't need to configure any of these deeply yet. Just have the keys ready in a text file. Claude Code will use them when wiring features.

---

## How each Claude Code session works

You'll do this same dance for every feature:

1. **Open Cursor**, open your Haizer repo
2. **Open the integrated terminal** inside Cursor (View → Terminal)
3. **Run `claude`** in that terminal
4. **Paste the prompt** for the feature you're building (prompts are below)
5. **Claude Code will plan**, then ask permission before making changes
6. **Approve** changes (you can see them in Cursor's file tree)
7. **Test locally** with `npm run dev` (Claude Code will tell you what URL to open)
8. **Fix issues** by telling Claude Code what's wrong: *"The signup hero has too much padding. Match it to the design tokens in CLAUDE.md."*
9. **Commit** when working: Claude Code can do this for you — *"Commit with message: 'auth + signup flow'"*
10. **Vercel auto-deploys** the moment you push to main
11. **Move to next feature** in the build order

---

## Initial project setup (your first Claude Code session)

After dropping the files and running `claude` in Cursor terminal, paste this exact prompt:

> Read CLAUDE.md and /docs/haizer-v5-state-export.md to understand the project. The repo currently has some HTML, CSS, and JavaScript files from a design tool (Claude Design). I want to set up the proper Next.js 15 project structure with TypeScript and Tailwind CSS 4, and migrate the existing design files into Next.js components.
>
> Please:
> 1. Initialize a Next.js 15 project with App Router, TypeScript, and Tailwind CSS 4
> 2. Set up the folder structure described in CLAUDE.md
> 3. Create the design token CSS variables in globals.css per CLAUDE.md
> 4. Configure Tailwind to use the design tokens
> 5. Set up Supabase client (server + browser variants in /lib/supabase.ts)
> 6. Set up basic dependencies: @supabase/supabase-js, stripe, resend, mapbox-gl, @radix-ui/* primitives (Dialog, DropdownMenu, etc.), date-fns, @hookform/resolvers, react-hook-form, zod
> 7. Create a .env.local template with placeholders for all the API keys (don't put real keys in code)
> 8. Migrate the existing HTML/CSS/JS files into Next.js components where appropriate
>
> Plan what you'll do first and ask for my approval before making changes.

Claude Code will:
- Read everything
- Ask which existing files you want migrated (you can say "all of them, figure out the right structure")
- Plan the work (probably 15-30 files to create)
- Ask for approval
- Execute on approval

This first session takes 30-60 minutes. Subsequent feature sessions are much faster because the foundation exists.

When done, **test it**: run `npm run dev` and open http://localhost:3000. Should at minimum show a blank page or whatever the migrated homepage renders. Commit:

```powershell
git add .
git commit -m "Initial Next.js setup + migrate Claude Design files"
git push
```

---

## Feature build sequence — exact prompts to use

For each feature, copy the prompt below into a Claude Code session. The order matters — earlier features are dependencies of later ones.

### Feature 1: Auth + signup flow

> Build the auth and signup flow per /docs/haizer-v5-state-export.md section 5 (Auth & signup) and section 6 (Nav — for the Sign up button placement).
>
> Specifically:
> 1. Set up Supabase Auth (Google OAuth + Apple OAuth + email/password)
> 2. Create /signup page with the 3-button choice + email form path
> 3. Create /signin page (same 3 buttons, smart email detect)
> 4. Create /forgot-password and /reset-password pages
> 5. Implement the unified auth: tapping "Sign up" in nav handles both new and returning users (auto-detect existing emails on the email path)
> 6. Set up the verification email flow: send 6-digit code via Resend immediately after signup, allow dashboard access without verification, but block messaging/listing creation/badge claims until verified
> 7. Add the persistent verification banner to the dashboard until verified
> 8. Set up the auto-tagging system: profiles.tags array populates as user takes actions (start with empty array)
> 9. Create the welcome email template in React Email
> 10. Add Supabase migration for profiles table (per section 4 of the spec)
> 11. Add the top nav (logged in/out states) per spec
>
> Build the database migration first, then the auth flows, then the UI. Ask before each batch.

### Feature 2: Homepage (12 sections)

> Build the homepage with all 12 sections per /docs/haizer-v5-state-export.md section 7. The existing Claude Design output for these sections is in /components or migrated files from the initial setup — reference those for the visual design.
>
> Sections in order:
> 1. Top navigation bar (already built in Feature 1 — verify it's used here)
> 2. Hero (headline, sub, search bar with Buy/Rent/Flip toggle, 4 quick filter pills)
> 3. Trust strip (3 stats with middle dots)
> 4. Featured homes (4-6 listing cards, horizontal carousel on mobile)
> 5. Browse by city (6 city tiles linking to /cities/[slug])
> 6. Investor opportunities (Flips + BRRRR-ready columns)
> 7. Featured agents & lenders sponsored strip
> 8. Free tools for investors (4 calculator cards)
> 9. How Haizer works (3 numbered steps)
> 10. Local pros (9 service category tiles)
> 11. Sell or rent — totally free (emerald CTA section)
> 12. Footer
>
> Use placeholder data where listings/agents/pros don't exist yet. Make sure mobile responsive. Use the design tokens from CLAUDE.md throughout.

### Feature 3: Listing detail page

> Build the listing detail page per /docs/haizer-v5-state-export.md section 9 (Listings → Listing detail page).
>
> URL: /listings/[city-slug]/[address-slug]
>
> Includes:
> 1. Hero gallery with swipeable carousel, fullscreen lightbox, mobile sticky top bar
> 2. Headline strip (price, status badge, address, stats row)
> 3. Sticky action bar (mobile bottom, desktop right rail) with Contact button, phone link, save heart
> 4. About section with Read More truncation
> 5. Features grid (pills)
> 6. Property details table
> 7. Investor section (only renders for Flip type) with deal numbers + calculator link
> 8. Listed by section (agent/seller card)
> 9. Location text section
> 10. Similar listings carousel
> 11. Report this listing link in footer
> 12. Contact modal (creates conversation + sends email to listing owner)
> 13. Share modal (copy link, WhatsApp, email)
>
> Privacy rules: view count visible only to listing owner (private); save count public.
>
> Build the listings table migration first (per section 4 of spec), then the page, then the modals. Seed 5-10 sample listings via SQL so you can see the page work.

### Feature 4: Listings search/index

> Build the listings search and index page per /docs/haizer-v5-state-export.md section 9 (Listings → Search/index page).
>
> URL: /listings with query params
>
> Includes:
> 1. Top bar (search autocomplete via Mapbox, type toggle pills with live counts, sort dropdown, view toggle List/Map, "Save this search" button)
> 2. Filter panel (left sidebar desktop, drawer mobile) — all filters per spec including heimishe features
> 3. Results grid (3 per row desktop, 1 per row mobile)
> 4. Infinite scroll with URL pagination
> 5. Map view via Mapbox GL JS (toggleable)
> 6. "No results" empty state
> 7. Save search modal with auto-named search + alert frequency + channels
>
> Use Postgres full-text search for the address/city text search. Add proper indexes on listings table for fast filtering.

### Feature 5: Listing creation flow

> Build the listing creation flow per /docs/haizer-v5-state-export.md section 9 (Listings → Listing creation flow) and section 23 (Listing types & field variations).
>
> URL: /list/new and /list/new/[draft-id]
>
> 6-step flow with conditional fields based on listing type (For Sale / For Rent / Flip / Land / Commercial + Multi-Family sub-type).
>
> Steps:
> 1. Type + role (Sale/Rent/Flip/Land/Commercial + FSBO/Agent)
> 2. Address (Mapbox autocomplete + map preview)
> 3. Property details (conditional fields by type)
> 4. Photos (drag-drop, native picker on mobile, drag-reorder, 50 photo max, first = cover)
> 5. Description + features (heimishe features included)
> 6. Price + listing setup (price/rent, duration, contact prefs, review)
>
> Plus:
> - Auto-save after each step
> - "Save & exit" button always available
> - Photo upload to Supabase Storage with Edge Function processing (sharp: resize 2000px max, WebP, strip EXIF, 3 sizes 400/1000/2000)
> - Submission creates listing with status='pending_review' and routes to admin queue
> - Email confirmation to lister after submission
>
> Build the Edge Function for photo processing first, then the form steps, then the submission flow.

### Feature 6: Unified dashboard

> Build the unified dashboard per /docs/haizer-v5-state-export.md section 8 (Unified dashboard).
>
> URL: /dashboard
>
> Includes:
> 1. Greeting + personalized stats strip
> 2. Default cards (Messages, Saved listings, Saved searches, Recent activity)
> 3. Tag-activated cards (My listings, Agent tools, Investor tools, Service Provider) that render based on profiles.tags
> 4. Discover section with single contextual nudge
> 5. Mobile stack order per spec
> 6. Desktop 60/40 two-column layout
> 7. Empty states for all cards per section 25 of spec
>
> Each card is its own component. Use the design tokens. Make sure everything works on mobile with proper tap targets.

### Feature 7: Messages

> Build the messages feature per /docs/haizer-v5-state-export.md section 10 (Messages).
>
> URLs: /messages (inbox) and /messages/[conversation-id] (conversation)
>
> Includes:
> 1. Conversations table + messages table migrations
> 2. Two-column inbox layout (desktop) + full-screen views (mobile)
> 3. Conversation list with avatars, listing thumbnails, previews, unread badges, filter tabs
> 4. Conversation view with message bubbles (emerald yours / white theirs), read receipts, timestamps on >15min gaps
> 5. Reply input bottom-fixed on mobile with keyboard handling
> 6. Block / Report from "..." menu
> 7. Email notifications on new message via Resend, throttled 1/hour per conversation
> 8. Real-time delivery via Supabase Realtime
> 9. Privacy: phone numbers hidden until both parties have sent 2+ messages each (check this in the conversation header before showing phone)
> 10. Shabbos/Yom Tov email queue (use HebCal API)

### Feature 8: Settings

> Build the settings pages per /docs/haizer-v5-state-export.md section 11 (Settings).
>
> URLs: /settings (index) and /settings/[section]
>
> 8 sections per spec: Profile, Account, Verification, Notifications, Shabbos & Yom Tov, Billing & subscriptions, Agent profile (conditional), Privacy.
>
> Desktop layout: sidebar nav + main content. Mobile: stacked list of sections each opening to its own screen.
>
> The Shabbos & Yom Tov section uses HebCal API to detect dates. Default opt-in: ON. Persists to a `notification_settings` table or column on profiles.

### Feature 9: Admin panel

> Build the admin panel per /docs/haizer-v5-state-export.md section 12 (Admin panel).
>
> URL: /admin (gated by profiles.role IN ('admin', 'superadmin'))
>
> 9 sections per spec:
> 1. Dashboard with stats and recent activity
> 2. Listings review queue (most-used, 3-pane layout: list / preview / actions)
> 3. Users management table with filters and detail view
> 4. Verifications queue with document review
> 5. Subscriptions view (live Stripe data)
> 6. Promoted & Ads management
> 7. Reports & Moderation queue
> 8. Cities & Categories admin
> 9. Site Settings (superadmin only)
>
> Each section has approve/reject actions that auto-email the relevant user. Build the listings review screen first since you'll need it as soon as listings start coming in.

### Feature 10: Stripe wiring

> Wire up Stripe per /docs/haizer-v5-state-export.md section 21 (Pricing & monetization).
>
> Set up:
> 1. Subscriptions for Store Pro ($49/mo, with $29 launch promo coupon for first 90 days), Brokerage ($149/mo), Featured Agent ($249/mo), Pro Agent ($499-799/mo tiers)
> 2. One-off Stripe Checkout for Promoted Listings ($49/week per listing)
> 3. Customer Portal for self-serve billing management
> 4. Webhook handler at /api/stripe/webhook for customer.subscription.* and checkout.session.* events
> 5. Update subscriptions and promoted_listings tables on webhook events
> 6. Dunning emails for failed payments (3 retries over 7 days)
> 7. Branded receipts via Stripe + Haizer-styled emails via Resend
> 8. Settings → Billing page with current plan card + "Manage in Stripe Portal" link
>
> Test all flows with Stripe test mode + test cards before going live.

### Feature 11: 4 Calculators

> Build all 4 calculators per /docs/haizer-v5-state-export.md section 15 (Calculators).
>
> URLs: /tools/mortgage, /tools/brrrr, /tools/flip, /tools/deal-analyzer
>
> Same layout template across all 4: left form, right live-updating results panel. Numbers only — no verdict tags.
>
> Each calculator gets:
> 1. Full inputs/outputs per spec
> 2. "Save this analysis" button (logged in) → saves to saved_calculations table
> 3. Share button → URL with inputs encoded in query params
> 4. SEO content paragraph (400-600 words) below the calculator
> 5. Auto-tag user as 'investor' after 3+ calculator uses in a session
>
> Pre-fill from listing detail pages when linked via "Run your own numbers →" CTA.

### Feature 12: Agent profile / Store page

> Build the agent profile pages per /docs/haizer-v5-state-export.md section 13 (Agent profile / Store page).
>
> URL: /agents/[slug] — auto-generated slug for Free, custom for Store Pro
>
> Free layout:
> 1. Header card (silhouette avatar, name, brokerage, verification badges)
> 2. Stats row (Active listings count, member since, response time)
> 3. About bio (500 char)
> 4. Specialty tags pills
> 5. Cities served pills
> 6. Active listings grid (paginated 12/page)
> 7. Contact bar (Message button + phone link if privacy permits)
>
> Store Pro adds:
> - Custom banner image (hero strip)
> - Custom logo (replaces silhouette)
> - Custom URL slug
> - Extended bio (2000 char with links)
> - Subtle Pro badge next to name
>
> No Sold history. Just confirm and verify trust signals (Verified Agent badge, response time, active listings count).

### Feature 13: City pages

> Build the city pages per /docs/haizer-v5-state-export.md section 14 (City pages).
>
> URL: /cities/[slug] for each of the 6 launch cities (Boro Park, Williamsburg, Flatbush, Monsey, Lakewood, KJ)
>
> Layout (minimal with bottom overview):
> 1. Header (city name + listing count)
> 2. Filter row (type pills + beds + price quick filters)
> 3. Listings grid (3 per row desktop, 1 per row mobile)
> 4. Bottom "About [City]" overview block (1-2 paragraphs, hand-written per city, heimishe-aware)
>
> The overview text for each city should be a separate field in the cities table (overview_md column) that admin can edit later. Use placeholder text per city for now; I'll write the real text.

### Feature 14: Service Provider Directory

> Build the Service Provider Directory per /docs/haizer-v5-state-export.md section 16 (Service Provider Directory).
>
> URLs: /pros, /pros/[category], /pros/[category]/[provider-slug]
>
> Build all the pages and database tables but DO NOT add /pros links to the main nav yet. The directory needs to be seeded with 5-10 providers per category before going live in the nav (per spec). Add a "Hide directory from nav" feature flag that admin can toggle when seeding is done.
>
> Provider profile layout mirrors agent profile structure.
>
> Monetization tiers: Free / Store Pro $49/mo / Featured Provider $149/mo — wire Stripe checkout the same way as agents.

### Feature 15: Field Notes blog

> Build a basic Field Notes blog per /docs/haizer-v5-state-export.md (Phase 2 sketch, but we're including in launch).
>
> URL: /field-notes (index) and /field-notes/[slug] (article)
>
> Simple markdown-based articles stored in a `posts` table with: slug, title, excerpt, body_md, cover_image_url, author_id, published_at, status (draft/published).
>
> Index page: card grid of recent posts with cover image, title, excerpt, date.
> Article page: cover image + title + author byline + date + rendered markdown body + share buttons.
>
> Admin section in admin panel to create/edit/publish posts. Use react-markdown for rendering.

### Feature 16-19: Final features

After the major features, quickly handle:

**Featured Agent placement system** — homepage rotation logic + agent search top placement, gated by subscriptions.tier = 'featured_agent'.

> Build the Featured Agent placement system per /docs/haizer-v5-state-export.md section 21. Agents with active Featured Agent subscriptions rotate through the "Featured agents & lenders" strip on the homepage and appear at the top of agent search results. Implement a fair rotation algorithm (each featured agent gets equal exposure over time).

**Pro Agent / Lead Routing** — most complex, requires careful UX.

> Build the Pro Agent / Lead Routing tier per /docs/haizer-v5-state-export.md section 21. Pro Agents get ZIP code exclusivity (only one Pro Agent per ZIP) and receive routed leads from FSBO listings in their ZIPs. Implement: (1) Pro Agent application flow with ZIP selection and exclusivity check, (2) lead routing logic that triggers when FSBO listings receive messages, (3) Pro Agent dashboard showing routed leads.

**Auto-republish expired listings** — Edge Function on schedule.

> Build a scheduled Edge Function that runs daily to handle expired listings: (1) Listings expiring in 3 days send reminder email, (2) Listings that expire stay accessible in seller's dashboard with "Relist" CTA, (3) Optional Store Pro feature: auto-republish expired listings if seller has the auto-renew toggle on.

**Static pages** — About, Contact, Terms, Privacy, FAQ, 404, 500.

> Build the static pages per /docs/haizer-v5-state-export.md section 26 (Static pages + error states). Use placeholder text for Terms and Privacy — I'll get a lawyer to draft those. Hand-write About, Contact, FAQ basic content. Build proper 404 and 500 error pages with the Haizer branding.

---

## Daily build rhythm

Once setup is done and you're in feature-build mode:

**Morning (90 min session example):**
1. Open Cursor + run `claude`
2. Pick the next feature from build order
3. Paste the corresponding prompt above
4. Approve plans, watch code generate
5. Test with `npm run dev`
6. Fix any issues (just describe to Claude Code in plain English)
7. Commit + push (Vercel auto-deploys)

**Afternoon (different 60 min session):**
1. Same dance, next feature
2. Or polish/fix issues from morning's feature

**You can build 1-3 features per day** comfortably. Some features (like the homepage with 12 sections) take longer; some are quick.

---

## How to talk to Claude Code

Just speak normally. It's surprisingly good at understanding intent.

**Good prompts:**
- *"The signup hero feels too cramped. Add more vertical breathing room."*
- *"On mobile the listing card photos are getting cut off — fix the aspect ratio."*
- *"I want the Save heart to animate more dramatically. Make it scale to 1.6 instead of 1.4 in the pop."*
- *"There's a bug — when I click Save on a listing while logged out, nothing happens. It should open the signup modal."*

**Avoid:**
- Vague: *"Make it better"* (better how?)
- Implementation details unless you know what you want: *"Use a useCallback instead of useMemo"* (let Claude Code decide)
- Stack changes mid-build: *"Actually let's use Remix instead of Next.js"* (lock the stack in CLAUDE.md, don't drift)

If you want a UI change, **describe what you want to see**, not how to code it. *"Make the price bigger and bolder."* not *"Change the font-size to 32px and font-weight to 700."*

---

## Testing each feature

After Claude Code builds a feature:

1. **Run `npm run dev`** in terminal (Cursor will probably auto-start this)
2. **Open http://localhost:3000** in browser
3. **Click through the feature** as if you were a user
4. **Test on mobile** — Chrome DevTools → device toolbar (Ctrl+Shift+M) → pick iPhone or Android
5. **Note what's broken or weird** — write it down or just tell Claude Code
6. **Have Claude Code fix it** before moving to next feature

Common issues:
- Spacing/padding off → describe what you see
- Form doesn't submit → check browser console (F12 → Console tab)
- Page doesn't load → check terminal for errors

When in doubt, **paste the error message at Claude Code** and ask it to fix.

---

## Committing & deploying

You don't need to git manually if you don't want to — ask Claude Code:

> Commit all changes with message: "Listing creation flow" and push to main.

It'll run the git commands for you.

The moment your code hits main on GitHub, **Vercel auto-deploys** to your production URL. Usually takes 1-3 minutes.

**Branching for safety** (recommended for big features):

Before starting a big feature:
```powershell
git checkout -b feature/listing-creation
```

Work on the branch. When done and tested:
```powershell
git checkout main
git merge feature/listing-creation
git push
```

This lets you scrap a feature if it goes wrong without losing your working main branch.

---

## When something goes wrong

**Code won't build:**
> "I'm getting this error when I run npm run dev: [paste error]. What's wrong?"

**Feature looks broken on mobile:**
> "On mobile (iPhone size), the listing detail page header overlaps with the hero photo. Fix it."

**Stripe test payment didn't process:**
> "I tried a test card 4242424242424242 on the Store Pro upgrade and got a webhook error. Check the /api/stripe/webhook handler."

**Database query is slow:**
> "The /listings page takes 4 seconds to load with 100 listings in the DB. Add indexes to make it fast."

**General confusion:**
> "I don't understand what just happened. Walk me through what changed in this commit."

Claude Code is patient. There are no dumb questions. If you don't understand something, ask.

---

## Estimated timeline

With dedicated time:

| Pace | Hours/week | Realistic launch |
|---|---|---|
| Part-time evenings | 10-15 | 10-14 weeks |
| Half-time | 20-25 | 5-7 weeks |
| Full-time focused | 40+ | 3-4 weeks |

These are blueprint-to-shipped estimates. **Polish and bug-fixing post-launch** is ongoing — that's normal.

Don't aim for perfect. Aim for shipped + iterating. The first version of every feature will be 80% right. Get it live, get real users, fix the 20% based on what actually breaks.

---

## When you finish all 19 features

You'll have a complete Haizer site. Before public launch:

1. **Run through every user journey** yourself on real devices (phone + laptop)
2. **Get 2-3 friends or community members** to try the signup → search → save → message flow
3. **Get the lawyer-drafted Terms and Privacy** in place
4. **Write the actual city overview paragraphs** (you write these, not Claude Code — community voice matters)
5. **Seed 5-10 service providers per category** before linking the directory in the nav
6. **Switch Stripe from test to live mode**
7. **Switch Supabase from dev to production project** (or just continue with the existing project)
8. **Buy a domain** and point it at Vercel
9. **Submit a sitemap to Google** for SEO
10. **Soft launch** — share with friends and family for a few days before announcing publicly

Then launch.

---

## You've got this.

Real talk: this is unprecedented. Two years ago, building this site would have required hiring a developer at $80-150K and waiting 6-12 months. You're doing it solo with AI in weeks for the cost of a few subscriptions.

When you get stuck or confused — come back to claude.ai (here) and ask. I'll help you think through it. Claude Code handles the writing-the-code part. You handle the product decisions and testing. That's the right division.

Go build it.
