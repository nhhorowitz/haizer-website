-- Listings table
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references public.profiles(id) on delete cascade not null,

  -- Type & status
  type text not null check (type in ('for_sale', 'for_rent', 'flip', 'land', 'commercial')),
  status text not null default 'active' check (status in ('active', 'pending')),
  admin_status text not null default 'pending_review' check (admin_status in ('pending_review', 'approved', 'rejected', 'changes_requested')),

  -- Content
  title text not null,
  description text,
  slug text not null,

  -- Location
  address text not null,
  city text not null check (city in ('boro-park', 'williamsburg', 'flatbush', 'monsey', 'lakewood', 'kiryas-joel')),
  neighborhood text,
  zip text,
  lat numeric(10, 7),
  lng numeric(10, 7),

  -- Core fields (shared)
  price numeric(12, 2),
  beds integer,
  baths numeric(4, 1),
  sqft integer,
  lot_size numeric(12, 2),
  year_built integer,
  property_type text,

  -- For Sale / Flip extras
  hoa_fee numeric(10, 2),
  annual_taxes numeric(10, 2),

  -- Flip extras
  arv numeric(12, 2),
  rehab_cost numeric(12, 2),
  renovation_status text,
  holding_months integer,

  -- For Rent extras
  price_per_month numeric(10, 2),
  security_deposit numeric(10, 2),
  available_date date,
  lease_lengths text[],
  utilities_included boolean default false,
  pets_allowed boolean default false,
  furnished boolean default false,

  -- Land extras
  zoning text,
  utilities_at_lot boolean,
  buildable boolean,
  approved_use text,

  -- Commercial extras
  commercial_subtype text,
  usable_sqft integer,
  lease_type text,
  parking_spaces integer,
  currently_leased boolean,
  current_rent numeric(10, 2),
  cap_rate numeric(5, 2),

  -- Multi-family extras (stored as JSON array of units)
  units jsonb,
  gross_income_annual numeric(12, 2),
  expenses_annual numeric(12, 2),

  -- Heimishe features
  eruv_access boolean default false,
  walk_to_shul boolean default false,
  yeshiva_nearby boolean default false,
  bais_yaakov_nearby boolean default false,
  mikvah_nearby boolean default false,
  recently_renovated boolean default false,
  move_in_ready boolean default false,

  -- Contact preferences
  contact_phone boolean default true,
  contact_email boolean default true,
  contact_message boolean default true,

  -- Photos (array of Supabase Storage URLs)
  photos text[] not null default '{}',

  -- Engagement (view count private, saves count public)
  views_count integer not null default 0,
  saves_count integer not null default 0,

  -- Promotion
  promoted boolean not null default false,
  promoted_until timestamptz,

  -- Lifecycle
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Unique slug per city
create unique index listings_city_slug_idx on public.listings(city, slug);

-- Fast lookups
create index listings_type_idx on public.listings(type);
create index listings_city_idx on public.listings(city);
create index listings_admin_status_idx on public.listings(admin_status);
create index listings_seller_idx on public.listings(seller_id);
create index listings_promoted_idx on public.listings(promoted, promoted_until);

-- Saves table (tracks which user saved which listing)
create table if not exists public.listing_saves (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  unique(listing_id, user_id)
);

-- Auto-increment saves_count when a save is added/removed
create or replace function public.handle_listing_save()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    update public.listings set saves_count = saves_count + 1 where id = NEW.listing_id;
  elsif TG_OP = 'DELETE' then
    update public.listings set saves_count = greatest(saves_count - 1, 0) where id = OLD.listing_id;
  end if;
  return null;
end;
$$ language plpgsql security definer;

create or replace trigger on_listing_save_changed
  after insert or delete on public.listing_saves
  for each row execute procedure public.handle_listing_save();

-- RLS
alter table public.listings enable row level security;
alter table public.listing_saves enable row level security;

-- Public can read approved listings
create policy "Anyone can read approved listings"
  on public.listings for select
  using (admin_status = 'approved');

-- Sellers can read their own listings (any status)
create policy "Sellers can read own listings"
  on public.listings for select
  using (auth.uid() = seller_id);

-- Sellers can insert listings
create policy "Sellers can create listings"
  on public.listings for insert
  with check (auth.uid() = seller_id);

-- Sellers can update their own listings
create policy "Sellers can update own listings"
  on public.listings for update
  using (auth.uid() = seller_id);

-- Admins can read all listings
create policy "Admins can read all listings"
  on public.listings for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'superadmin')
    )
  );

-- Admins can update all listings (for approval)
create policy "Admins can update all listings"
  on public.listings for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'superadmin')
    )
  );

-- Saves: users can manage their own saves
create policy "Users can read own saves"
  on public.listing_saves for select
  using (auth.uid() = user_id);

create policy "Users can save listings"
  on public.listing_saves for insert
  with check (auth.uid() = user_id);

create policy "Users can unsave listings"
  on public.listing_saves for delete
  using (auth.uid() = user_id);
