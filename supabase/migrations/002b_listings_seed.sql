-- Seed listings (admin_status = 'approved' so they show publicly)
-- seller_id uses a placeholder UUID — replace with your real user ID after signing up
-- To get your user ID: go to Supabase → Authentication → Users → copy your UUID

do $$
declare
  v_seller uuid;
begin
  -- Use first user in the system as the seed seller
  select id into v_seller from public.profiles limit 1;

  if v_seller is null then
    raise exception 'No users found. Sign up first, then run this seed.';
  end if;

  insert into public.listings (
    seller_id, type, status, admin_status, title, description, slug,
    address, city, zip, price, beds, baths, sqft, year_built, property_type,
    annual_taxes, hoa_fee, photos, eruv_access, walk_to_shul, yeshiva_nearby,
    bais_yaakov_nearby, mikvah_nearby, move_in_ready,
    published_at, expires_at
  ) values

  -- 1. Boro Park — For Sale
  (
    v_seller, 'for_sale', 'active', 'approved',
    '4-bedroom semi-detached on 47th St',
    'Spacious semi-detached home on a quiet block in the heart of Boro Park. Renovated kitchen, hardwood floors throughout, full finished basement. Walk to multiple shuls and minutes from the eruv. Motivated seller.',
    '1423-47th-st',
    '1423 47th St', 'boro-park', '11219',
    649000, 4, 2, 1920, 1938, 'Semi-detached',
    8400, null,
    '{}', true, true, true, true, true, false,
    now(), now() + interval '30 days'
  ),

  -- 2. Williamsburg — For Rent
  (
    v_seller, 'for_rent', 'active', 'approved',
    'Renovated 3-bed apartment on Bedford Ave',
    'Bright and modern 3-bedroom apartment on a prime Williamsburg block. Fully renovated with new appliances, in-unit washer/dryer, and central AC. Close to shopping and public transportation.',
    '783-bedford-ave',
    '783 Bedford Ave', 'williamsburg', '11211',
    null, 3, 1, 1100, 1962, 'Apartment',
    null, null,
    '{}', true, true, false, true, false, true,
    now(), now() + interval '30 days'
  ),

  -- 3. Monsey — Flip
  (
    v_seller, 'flip', 'active', 'approved',
    'Fix & flip opportunity — Oak Terrace',
    'Solid bones, needs full renovation. Excellent flip opportunity in a desirable Monsey neighborhood. Comparable homes selling at $580K–$600K after renovation. ARV supported by recent comps.',
    '22-oak-terrace',
    '22 Oak Terrace', 'monsey', '10952',
    385000, 3, 2, 1640, 1972, 'Single family',
    7200, null,
    '{}', false, true, true, false, false, false,
    now(), now() + interval '30 days'
  ),

  -- 4. Lakewood — For Sale
  (
    v_seller, 'for_sale', 'active', 'approved',
    'Large 5-bedroom colonial on Maple Ave',
    'Stunning colonial home with 5 bedrooms and 3 full baths. Open-concept kitchen, oversized backyard, 2-car garage. Located in one of Lakewood''s most sought-after neighborhoods near top yeshivos.',
    '54-maple-ave',
    '54 Maple Ave', 'lakewood', '08701',
    895000, 5, 3, 2800, 2004, 'Single family',
    12000, null,
    '{}', false, true, true, true, false, false,
    now(), now() + interval '30 days'
  ),

  -- 5. Flatbush — For Sale
  (
    v_seller, 'for_sale', 'active', 'approved',
    'Charming 3-bedroom in prime Flatbush',
    'Well-maintained 3-bedroom home on a tree-lined block. Updated bathrooms, newer roof, private driveway. Close to Avenue J shopping and eruv.',
    '412-east-7th-st',
    '412 East 7th St', 'flatbush', '11218',
    575000, 3, 1, 1480, 1942, 'Semi-detached',
    7800, null,
    '{}', true, true, false, true, true, false,
    now(), now() + interval '30 days'
  ),

  -- 6. Kiryas Joel — For Sale
  (
    v_seller, 'for_sale', 'active', 'approved',
    'New construction townhouse in KJ',
    'Brand new construction in Kiryas Joel. 4 bedrooms, 2.5 baths, modern finishes throughout. Part of a small development with shared green space. Walking distance to all amenities.',
    '18-forest-rd',
    '18 Forest Rd', 'kiryas-joel', '10950',
    520000, 4, 2, 1750, 2024, 'Townhouse',
    6000, 350,
    '{}', true, true, true, true, true, true,
    now(), now() + interval '30 days'
  ),

  -- 7. Boro Park — For Rent
  (
    v_seller, 'for_rent', 'active', 'approved',
    'Spacious 2-bedroom on 13th Ave',
    'Bright 2-bedroom apartment steps from 13th Avenue shopping. Hardwood floors, updated kitchen, great natural light. Available immediately.',
    '5612-13th-ave',
    '5612 13th Ave', 'boro-park', '11219',
    null, 2, 1, 950, 1955, 'Apartment',
    null, null,
    '{}', true, true, false, true, false, true,
    now(), now() + interval '30 days'
  ),

  -- 8. Lakewood — Flip
  (
    v_seller, 'flip', 'active', 'approved',
    'BRRRR-ready 4-unit on Forest Ave',
    'Four-unit building with strong rental income potential. Current rents below market — significant upside. Needs cosmetic updates. Strong cash-on-cash return after refi.',
    '301-forest-ave',
    '301 Forest Ave', 'lakewood', '08701',
    445000, null, null, 3200, 1968, 'Multi-family',
    9600, null,
    '{}', false, true, true, false, false, false,
    now(), now() + interval '30 days'
  );

end $$;

-- Set price_per_month for rental listings
update public.listings set price_per_month = 2800 where slug = '783-bedford-ave';
update public.listings set price_per_month = 1950 where slug = '5612-13th-ave';

-- Set flip extras
update public.listings set arv = 580000, rehab_cost = 65000 where slug = '22-oak-terrace';
update public.listings set arv = 680000, rehab_cost = 80000, cap_rate = 6.4 where slug = '301-forest-ave';
