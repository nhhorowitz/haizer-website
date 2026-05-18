S- Result count: *"847 listings in Boro Park"*

**Filter panel** (left sidebar desktop, slide-up drawer mobile):
- City (multi-select)
- Price range (slider + inputs)
- Beds (1+ / 2+ / 3+ / 4+ / 5+)
- Baths (1+ / 2+ / 3+)
- Property type (checkboxes)
- Sqft range
- Year built (since input)
- Heimishe features (Eruv access · Walk to shul · Yeshiva nearby · Bais Yaakov/Cheder nearby · Mikvah nearby · Recently renovated · Move-in ready)
- Status (Active · Pending)
- Date listed (Last 7 days · Last 30 days · Any)
- Reset filters link

**Results:**
- 3 cards per row desktop, 1 per row mobile
- Listing card: 16:9 photo, save heart top-right, price prominent, address, "3bd · 2ba · 1,840 sqft", small agent name bottom-right
- Photo zooms 105% on hover, card lifts 1%
- Infinite scroll with URL pagination (`?page=2`) updating in background for SEO

**No-results state:** *"No listings match your filters. Try widening your search or reset →"*

### Listing detail page
**URL:** `/listings/[city-slug]/[address-slug]`

**Layout (top to bottom):**
1. Hero gallery — main photo large 16:9, swipeable carousel, photo counter overlay "3 of 24", fullscreen lightbox with pinch-zoom
   - Mobile sticky top: back arrow · share · save heart
2. Headline strip — big price · status badge (Active / Pending / New < 7 days) · address, city, ZIP · stats row "3 bd · 2 ba · 1,840 sqft"
3. Sticky action bar (mobile bottom-fixed, desktop right rail): Contact (emerald button) · phone link (tel:) · save heart
4. About section — description prose, "Read more" if > 4 lines
5. Features grid — pills of selected features
6. Property details table — Year built, Lot size, Property type, Annual taxes, HOA fee
7. **Investor section (Flip type only)** — Deal numbers tile: Asking · Est. rehab · ARV · Auto-profit (terracotta tint) + "Run your own numbers →" link to calculator pre-filled
8. Listed by section — card with seller/agent photo, name, brokerage if agent, verification badges, "View store →" link to agent profile, member since, response time, contact buttons
9. Location — text neighborhood description at launch; Mapbox embed with shul/mikvah markers at scale-up
10. Similar listings — 4-6 cards from same city/price range
11. Page footer — small "Report this listing" link

**Modals:**
- Contact modal: pre-filled name/email if logged in; required: message (default template "Hi, is this property still available?"); send → creates conversation in messages table + email to seller/agent
- Share modal: copy link · WhatsApp · email (no social media at launch)

**Privacy:**
- View count visible only to listing owner (private)
- Save count public ("12 people saved this") — social proof

### Listing creation flow
**URL:** `/list/new` or `/list/new/[draft-id]` for drafts

6 steps with progress bar at top, auto-save after each step, "Save & exit" always available.

**Step 1 — Type + role:** "What are you listing?" → Sale · Rent · Flip · Land · Commercial. Then "Who's listing it?" → Me (FSBO) · I'm an agent (optional license # + brokerage, skippable here, prompts later in profile).

**Step 2 — Address:** Mapbox autocomplete, address confirmation on map preview, auto-detect city/neighborhood, optional unit number.

**Step 3 — Property details (conditional by type):**
- For Sale: beds, baths, sqft, lot size, year built, property type dropdown, HOA fee, annual taxes
- For Rent: beds, baths, sqft, monthly rent, security deposit, lease length multi-select, available date, utilities included, pets allowed, furnished
- For Flip: all Sale fields + estimated rehab cost + ARV + renovation status + estimated holding months
- Land: lot size (sqft/acres), zoning, utilities at lot, buildable flag, approved use
- Commercial: subtype, usable sqft vs total, lease type (if rent), parking spaces, currently leased? + current rent, cap rate
- Multi-Family (sub of Sale): number of units + per-unit list (beds/baths/rent/occupancy) + gross income + expenses + auto cap rate

**Step 4 — Photos:** Drag-drop or native picker, 50 max, drag-reorder (mobile long-press), first photo = cover, auto-optimize on upload (Edge Function with sharp). At least 1 photo required to submit.

**Step 5 — Description + features:** Title (auto-suggested, editable), description textarea (2000 chars), feature checklist (heimishe-aware including Eruv access, Walk to shul, Yeshiva nearby, Bais Yaakov/Cheder nearby, Mikvah nearby).

**Step 6 — Price + listing setup:** Price (For Sale/Flip) or monthly rent + deposit (For Rent), listing duration default 30 days (14-day option), contact preferences (phone/email/in-app message toggles, phone auto-filled from profile), final review screen with Publish button.

**Behind the scenes:**
- Submission creates listing with `status='pending_review'`
- Goes into admin Listings queue
- Manual approval at launch (<24hr typical SLA); trusted-agent auto-approve after 10 clean submissions
- Email + dashboard notification on approval or rejection (with reason)
- On approval → `status='active'`, 30-day countdown starts, appears in search

## 10. Messages

**URL:** `/messages` (inbox) → `/messages/[conversation-id]` (open conversation)

**Desktop layout:** Two-column. Left 35% = conversation list. Right 65% = selected conversation.
**Mobile:** Full-screen views. List → tap → conversation. Back returns to list.

**Conversation list:**
- Search input at top
- Filter tabs: All · Unread · (if multi-role: Buyer · Seller)
- Each item: avatar, sender name, 32px listing thumbnail + price, last message preview, timestamp (relative), unread dot
- Sorted by most recent activity

**Conversation view:**
- Header: avatar · name · role badge · link to their store/listing · "..." menu (Block, Report, Mute)
- Body: message bubbles (yours emerald right-aligned, theirs white left-aligned)
- Timestamps only on > 15min gaps
- Read receipts: "Seen" indicator under your last sent
- Bottom: reply input + Send (emerald, disabled when empty)
- Mobile: bottom-fixed reply input handles keyboard inset

**Launch features:**
- Text only — no attachments, images, or voice notes
- Real-time delivery via Supabase Realtime
- Email notification on new message — throttled 1 email/hour per conversation
- Shabbos/Yom Tov queue: emails wait; in-app messages still deliver
- Block / Report from menu

**Privacy:**
- Phone numbers hidden until both parties have sent 2+ messages each
- Email never exposed in chat
- All conversations stay on-platform; no off-platform handoff at launch

## 11. Settings

**URL:** `/settings` → `/settings/[section]`

**Sections:**

1. **Profile** — photo upload (silhouette default), display name, bio (200 char), public/private toggles per field
2. **Account** — email (change requires re-verification), password change, phone number, language (English only at launch), delete account (30-day grace + email confirm)
3. **Verification** — email verified status (resend code), phone verified status, Verified Buyer/Seller/Agent badge requests with document upload → admin queue
4. **Notifications** — granular toggles per channel:
   - New messages: email + in-app, both on
   - Listing saves: daily digest default
   - Listing expiring soon: email only, on
   - Saved search alerts: instant / daily / weekly / off (per saved search)
   - Subscription/payment: email always on (transactional)
   - Marketing emails: opt-in, default OFF
5. **Shabbos & Yom Tov** — **opt-in toggle, default ON**; timezone (auto-detect, editable); custom override dates; resume time (1hr after / 2hr after / manual; default 1hr after)
6. **Billing & subscriptions** — current plan card + next billing date, "Manage in Stripe Portal →", active Promoted Listings list with expiration, past invoices (12 months)
7. **Agent profile** (only renders if `agent` tag) — license #, brokerage name + website, specialty tags, cities served, Store Pro features (logo upload, banner image, custom URL slug, extended bio with links) only when Store Pro active
8. **Privacy** — who can see my email (Nobody/People I've messaged/Everyone), who can see my phone (same options + 2-message rule applies), who can message me (Anyone / Verified users only), blocked users list

## 12. Admin panel

**URL:** `/admin` — gated by `profiles.role IN ('admin','superadmin')`

**Permissions:**
- `admin` — reviews, users, verifications, reports, day-to-day moderation
- `superadmin` — all of above + site settings, billing, schema-level

**Sections:**

1. **Dashboard** (`/admin`) — quick stats: signups today, new listings today, pending review count, MRR, 30-day revenue, active conversations. Recent activity feed. Charts: signups/day (30-day), listings by city, revenue/week
2. **Listings review queue** (`/admin/listings`) — most-used. List on left, selected listing live preview in middle, action panel on right (Approve / Reject with reason dropdown / Request changes). Bulk select. Each action emails submitter automatically.
3. **Users** (`/admin/users`) — searchable table: name, email, tags, verification status, signup date, city, last active, status. Filters by tag combo. Click → user detail with admin actions (verify badge, ban 24h/7d/30d/permanent, delete, impersonate for debugging)
4. **Verifications queue** (`/admin/verifications`) — pending license uploads + Verified Buyer/Seller docs. Click → review docs + approve/reject + auto-email user
5. **Subscriptions** (`/admin/subscriptions`) — live Stripe data: active subs by tier, failed payments needing outreach, cancellations + reasons, direct "Open in Stripe →" links
6. **Promoted & Ads** (`/admin/promoted`) — active Promoted Listings with expirations + weekly revenue, lender/SP ad placements, "Create ad placement" form for direct sales
7. **Reports & Moderation** (`/admin/reports`) — separate tabs: reported listings, reported users, reported messages. Each report shows reporter, reason, context (full convo transcript auto-attached for message reports). Actions: Dismiss / Warn / Remove / Ban
8. **Cities & Categories** (`/admin/cities`, `/admin/categories`) — add/edit launch + Phase 2 cities (toggle live), service provider categories, feature checklist items
9. **Settings** (`/admin/settings`) — superadmin only — homepage feature toggles, site-wide banner toggle, email template preview, feature flags

## 13. Agent profile / Store page

**URL:** `/agents/[slug]` — Free agents get auto-generated `firstname-lastname-NNNN`, Store Pro gets vanity slug

**Free agent layout:**
1. Header card — default gray silhouette avatar, name, brokerage if filled, Phone-Verified + Email-Verified badges, Verified Agent badge if approved
2. Stats row — Active listings count · Member since · Avg response time
3. About — bio (up to 500 chars)
4. Specialty tags — pills
5. Cities served — pill list
6. Active listings grid — sorted most recent, paginated 12/page
7. Contact bar — Message button (emerald) + phone link if privacy permits

**Store Pro adds:**
- Custom banner image (hero strip at top, Airbnb-host-card style)
- Custom logo (replaces silhouette)
- Custom URL slug (e.g., `yossi-katz-realty` instead of `yossi-katz-8412`)
- Extended bio (2000 chars with line breaks + external links)
- Subtle "Pro" badge next to their name everywhere

**No Sold history feature** — we can't verify without MLS, and self-reported numbers either embarrass new agents or let bad-faith agents inflate.

**Buyer flow to reach:**
- Click agent name/avatar on any listing card → land on agent profile
- Future Featured Agents strip → click avatar
- Direct URL share for business cards, WhatsApp groups

## 14. City pages

**URL:** `/cities/[slug]` (e.g., `/cities/boro-park`)

**Layout (minimal, with bottom overview):**
1. Header — city name + listing count (no big photo banner)
2. Filter row — type pills (For Sale / For Rent / Flips / All) + beds + price quick filters
3. Listings grid (the main event, 3 per row desktop, 1 per row mobile)
4. **Bottom of page: "About [City]" overview block** — 1-2 paragraphs about the area, heimishe-aware (mentions shuls, schools, eruv boundaries, what makes the community distinct). SEO-anchored.

Editorial copy per city is hand-written before launch. Drives organic SEO traffic from outside-the-community relocators while not getting in the way of community users who already know the area.

## 15. Calculators (4)

**URL pattern:** `/tools/[name]` — same layout template: left form, right live-updating results panel. **Show numbers only. No verdict tags.**

### Mortgage `/tools/mortgage`
- Inputs: Home price · Down payment ($ or %) · Loan term (15/20/30 yr) · Interest rate · Annual property tax · Monthly HOA · Annual insurance · PMI auto-included if down payment < 20% · Extra principal payment field
- Outputs: Monthly payment (primary big number) · Principal + interest breakdown · Total paid over loan · Total interest paid · Years saved + interest saved from extra principal · Collapsible amortization schedule

### BRRRR `/tools/brrrr`
- Inputs: Purchase price · Purchase closing costs (% or $, default 2.5%) · Rehab budget · Rehab contingency % (default 10%) · Holding period (months) · Monthly carrying costs (loan + insurance + taxes + utilities) · Estimated monthly rent · Vacancy rate % (default 5%) · Operating expenses % of rent (or itemized) · ARV · Refinance LTV % · Refinance closing costs % · Refinance interest rate · Refinance loan term
- Outputs: All-in cost · **Cash left in deal after refi** · Monthly cash flow · Cash-on-cash return % · Cap rate % · ROI % · ROC % · Equity captured · Breakeven occupancy %

### Fix-and-Flip `/tools/flip`
- Inputs: Purchase price · Purchase closing costs (% or $) · Rehab budget · Rehab contingency % · Holding period (months) · Monthly carrying costs · ARV · Selling costs % (default 8%)
- Outputs: Total project cost · Net profit · ROI % · Annualized return % · Profit margin % · Breakeven sale price

### Deal Analyzer `/tools/deal-analyzer`
- Inputs from all calculators above + strategy toggle (Flip · BRRRR · Long-term Rental · Wholesale)
- Outputs adapt to strategy; shows side-by-side comparison: *"If you flipped it: $42K profit. If you BRRRR'd it: $0 cash + $850/mo cash flow."*

**Saving + sharing:**
- "Save this analysis" → goes to dashboard Investor Tools card with user-given title
- Each saved analysis can link to a specific listing (one-click from Flip listing → opens calculator pre-filled)
- Share button → URL with all inputs encoded in query params; no login needed to view
- Using 3+ calculators in session auto-tags user as `investor`

**SEO content** below each calculator: 400-600 word educational paragraph explaining the math.

## 16. Service Provider Directory

**URL:** `/pros` → `/pros/[category]` → `/pros/[category]/[provider-slug]`

**Index** (`/pros`): hero "Local pros, ready when you are" + search bar + category grid (Contractors · Title · Attorneys · Inspectors · Mortgage Brokers · Lenders · Insurance · Property Managers · CPAs) + Featured Providers carousel (paid placements)

**Category page** (`/pros/contractors`): city filter, specialty filters, provider list, "Sponsored" tag on paid placements

**Provider profile** (`/pros/contractors/[slug]`): mirrors agent profile structure — header card with business name + logo + cities + specialty tags + bio + portfolio photos + contact bar

**Monetization:** Free listing → Store Pro equivalent ($49/mo for branded profile) → Featured Provider ($149/mo for category-top placement). Reviews come in Phase 3 (requires moderation infrastructure).

**Launch handling:** build code but **don't link from nav** until 5-10 providers per category are seeded (avoid empty-directory ghost-town effect).

## 17. Email notification triggers

Every email sent by the system. All via Resend, all paused during Shabbos/Yom Tov **except verification codes**.

### Account & auth
- Welcome email (post-signup, immediate)
- Email verification code (signup or email change)
- Password reset link (60-min token)
- Email change verification
- Account suspended (admin action)
- Account deleted confirmation (after 30-day grace)

### Listing emails (seller/agent)
- Listing submitted (receipt)
- Listing approved (live)
- Listing rejected with reason
- Listing expiring in 3 days
- Listing expired (with "Relist?" CTA)
- New message on listing — throttle 1/hour per conversation
- Daily save digest — 1/day max, only if saves > 0
- Listing went pending (subscribers)

### Buyer emails
- Saved search match — instant
- Saved search digest — daily (7AM Eastern)
- Saved search digest — weekly (Sunday 7AM Eastern)
- Saved listing price changed
- Saved listing went pending
- Message reply received — throttle 1/hour per conversation

### Subscription & billing (Stripe)
- Subscription started, renewed, payment failed, cancelled
- Promoted Listing started
- Promoted Listing ending in 24h

### Trust & verification
- Verification approved
- Verification rejected with reason
- Listing reported (lister notice)
- Action taken on report you filed

### Marketing (opt-in, default OFF)
- Weekly Field Notes newsletter (Phase 2)
- New city launched announcement

**~30 distinct email templates** total, all in React Email format, all Haizer-branded.

## 18. Saved searches

**Creating:** "Save this search →" button on listings page (visible once filters applied) → modal:
- Search name (auto-suggested from filters, editable)
- Alert frequency: Instant / Daily / Weekly / Off
- Channels: Email / In-app / Both

**Managing** (`/saved-searches` or via dashboard): list view with name, criteria, alert frequency, last match, actions per search: Edit / Pause / Delete / Run now.

**Limits:** Free users max 10 saved searches. Store Pro + paid agents unlimited.

**Alert delivery:**
- Instant: matching listing approved → fire email + in-app notification
- Daily: 7AM Eastern, batched
- Weekly: Sunday 7AM Eastern, batched
- Shabbos/Yom Tov queue applies

**Email format:** Subject *"3 new matches for [search name]"* + 3-6 listing cards inline + manage link in footer.

## 19. "Picks for you" recommendation logic (rules-based, Phase 1)

Surfaces on homepage (signed in) + buyer dashboard.

**Signals:**
- Cities searched (weighted by frequency)
- Filter values used
- Listings saved
- Listings viewed 3+ times

**Scoring (per new listing in last 14 days):**
- Same city as searches: +3
- Same neighborhood as saves: +2
- Within ±15% of typical price band: +2
- Same beds count: +1
- Same property type: +1
- Matching heimishe features (Eruv, etc.): +1 each

Top 6 by score in Picks card. Refresh nightly via cron.

**Empty state (no signals):** "Latest in Boro Park" — 6 most recent in detected/default city.

## 20. Listing report / moderation flow

**On listing detail page:** small "Report this listing" link at very bottom (tertiary text).

**Modal:**
- Reason dropdown: Inaccurate info · Suspected fraud · Inappropriate content · Already sold/rented · Duplicate listing · Other
- Optional textarea: "Tell us more"
- Submit

**System:**
- Report → admin Reports queue
- Reporter gets email: *"We received your report. We'll review within 24 hours."*
- Same user can't report same listing twice
- Limit: 5 reports/day per user (anti-abuse)
- "Suspected fraud" auto-bumps to top of admin queue

**Admin action:** Dismiss / Warn lister / Hide pending response / Remove listing / Ban user. Each action emails both lister and reporter explaining outcome.

**Reporting users / messages:** same pattern via the "..." menu in conversations.

## 21. Pricing & monetization

| Tier | Price | Notes |
|---|---|---|
| Free Agent | $0 | Profile, listings, verification, messages |
| Store Pro | $49/mo | Custom logo, URL slug, banner, extended bio, analytics, Pro badge. **$29/mo launch promo first 90 days.** Auto-rolls to $49 after. |
| Brokerage | $149/mo | Multi-agent management. **Not on public pricing page**; surfaces in dashboard once an agent crosses 25 listings or asks. |
| Featured Agent | $249/mo | Top placement in agent search + homepage rotation |
| Pro Agent / Lead Routing | $499–799/mo | ZIP exclusivity + FSBO lead routing |
| Promoted Listings | $49/week | Per-listing visibility boost; Stripe Checkout one-off |

**At launch:** Stripe wiring live for all tiers. Both subscription (Store Pro/Brokerage/Featured/Pro Agent) and one-off Checkout (Promoted Listings).

**Dashboard upsell trigger:** when seller crosses 25 active listings, dashboard banner suggests Store Pro — soft nudge, not a gate.

## 22. Cities at launch

Boro Park · Williamsburg · Flatbush · Monsey · Lakewood · Kiryas Joel

**Phase 2 cities (priority order):** Five Towns · Crown Heights · Spring Valley · Passaic · Far Rockaway · Toms River/Jackson · Scranton · Linden

## 23. Listing types & field variations

Conditional form rendering in Step 3 of listing creation based on Step 1 type selection.

### For Sale (default)
beds · baths · sqft · lot size · year built · property type (Single Family / Multi-Family / Condo / Co-op / Townhouse / Land / Commercial) · HOA fee · annual taxes · price

### For Rent (replaces price)
monthly rent · security deposit (default one month) · lease length multi-select (M2M/6/12/18/24mo) · available date · utilities included (Heat · Hot water · Electric · Gas · Water · Trash · Internet · Cable) · pets allowed (Yes/No/Case-by-case) · furnished (Yes/No/Partially)

### For Flip (adds to Sale)
estimated rehab cost · ARV (After Repair Value) · renovation status (As-is / Cosmetic only / Major work / Move-in ready) · estimated holding months · auto-calculated Auto-profit = ARV − Asking − Rehab − Holding · "Run your own numbers →" link

### Land (strips beds/baths/sqft, adds)
lot size (sqft or acres toggle) · zoning (Residential / Commercial / Mixed-use / Agricultural / Industrial) · utilities at lot · buildable flag · approved use description

### Commercial (subtype-based)
subtype (Office / Retail / Warehouse / Mixed-use / Restaurant / Other) · usable sqft vs total sqft · lease type if For Rent (Gross / Net / NNN / Modified Gross) · parking spaces · currently leased + current rent · cap rate

### Multi-Family (under Sale)
number of units · per-unit list (beds/baths/rent/occupancy) · total gross income annual · total expenses annual · cap rate (auto)

## 24. Heimishe UX rules

- **Currency:** $ USD with commas: $485,000. No Hebrew/Yiddish at launch.
- **Date format:** M/D/YYYY (US standard, what NY/NJ heimishe community uses). No Hebrew dates.
- **Language:** English only at launch. Phase 2 evaluate.
- **Imagery:** no people in hero stock photos. Empty states use abstract/architectural illustrations.
- **City names:** community conventions ("Boro Park" not "Borough Park"; "KJ" or "Kiryas Joel"; "Lakewood" not "Lakewood Township")
- **Phone format:** (XXX) XXX-XXXX, US only
- **Timezone:** Eastern default (all 6 launch cities)
- **Shabbos / Yom Tov:** HebCal API source; pause notifications/emails from candle-lighting through 1hr after end. Verification codes exempt.
- **No social media** links in profiles at launch.

## 25. Empty states (complete inventory)

| Surface | Copy |
|---|---|
| Saved listings | "Heart any home to save it here. Start browsing →" |
| Saved searches | "Save a search to get alerts when new listings match. Set one up →" |
| Messages inbox | "Your inbox is quiet. Save a listing and message the seller to start a conversation." |
| My listings (seller, new) | "List your first property — free, takes 5 minutes. Start a listing →" |
| Agent tools (new agent) | "Set up your agent profile to unlock leads, response stats, and your store page." |
| Investor tools | "Try a calculator to analyze your first deal." (with 4 calculator buttons) |
| Service Provider (new) | "Complete your business profile to appear in the directory." |
| Picks for you (no signal) | "Latest in Boro Park" → fallback to 6 newest in user's detected city |
| Search results (no match) | "No listings match your filters. Try widening your search or reset →" |
| Notifications | "No notifications yet. We'll let you know when something happens." |

## 26. Image upload edge cases

- Per-photo size: 10MB max upload
- Allowed types: JPG, PNG, HEIC (auto-converted to JPG), WebP
- Server pipeline: Edge Function with `sharp` — resize 2000px max long edge, WebP convert, strip EXIF, generate 3 sizes (400 / 1000 / 2000px), stored in Supabase Storage with CDN cache
- Per-listing limit: **50 photos for everyone** (no tier distinction)
- Failure modes & user-facing messages: see CLAUDE.md for full table
- First photo = cover by default; drag-reorder to swap, or "Make cover photo" per-photo menu
- Listing requires at least 1 photo to publish; validation blocks submit otherwise

## 27. Build order

1. Auth + signup
2. Homepage (12 sections from Claude Design prompts)
3. Listing detail page
4. Listings search/index (with Map toggle)
5. Listing creation flow (all 5 types + Multi-Family)
6. Unified dashboard
7. Messages
8. Settings (all sections)
9. Admin panel
10. Stripe wiring (Store Pro + Brokerage + Featured + Pro Agent + Promoted Listings)
11. All 4 Calculators
12. Agent profile / Store page
13. City pages
14. Service Provider Directory (build code; seed before linking)
15. Field Notes blog (basic with 5-10 articles)
16. Featured Agent placement system
17. Pro Agent / Lead Routing
18. Auto-republish for expired listings (cron Edge Function)
19. Static pages (About, Contact, Terms, Privacy, FAQ, 404, 500)

## 28. Open items (revisit before launch)

- Terms of Service: needs lawyer-drafted version (don't AI-generate)
- Privacy Policy: needs lawyer review (CCPA/GDPR compliance)
- FAQ articles: 30-40 hand-written for launch
- Field Notes: 5-10 seed articles before going live with the section
- Email template copy: needs human polish pass on all ~30 templates
- City overview paragraphs: hand-write one per launch city (heimishe-aware)
