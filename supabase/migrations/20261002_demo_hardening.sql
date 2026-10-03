-- =============================================================================
-- Foodie — demo hardening migration
--
-- Run once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: every step is idempotent.
--
-- What it does
--   1. profiles table + role ('customer' | 'admin') and is_admin() helper
--   2. products: category + is_seed (seed products are protected from visitors),
--      and a 13-dish demo menu if the products table is empty
--   3. orders: status / payment_method normalised to text + check constraints
--   4. place_order()         — server-side pricing, atomic order + items insert
--   5. update_order_status() — the only way to change an order's status
--   6. reset_demo_data()     — admin-only: wipes orders and visitor-made products
--   7. Row Level Security policies for products / orders / order_items / profiles
--      (ALL existing policies on these tables are dropped and replaced)
--   8. Realtime on orders (live order tracking)
--
-- After running, make yourself admin:
--   update public.profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'you@example.com');
-- =============================================================================


-- 1. Profiles & roles ---------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill users that registered before this migration.
insert into public.profiles (id, full_name)
select id, raw_user_meta_data ->> 'full_name'
from auth.users
on conflict (id) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;


-- 2. Products: category + seed flag ------------------------------------------

alter table public.products add column if not exists category text not null default 'mains';
alter table public.products add column if not exists is_seed boolean not null default false;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'products_category_check'
  ) then
    alter table public.products add constraint products_category_check
      check (category in ('burgers', 'pizza', 'mains', 'sides', 'desserts', 'drinks'));
  end if;
end;
$$;

-- Empty menu? Seed a demo one (already marked as protected seed products).
insert into public.products
  (name_en, name_ar, description_en, description_ar, price, image_url, category, is_available, is_seed)
select v.*, true, true
from (values
  ('Classic Beef Burger', 'برجر لحم كلاسيك',
   'Juicy beef patty, cheddar, lettuce, tomato and our house sauce.',
   'قطعة لحم بقري طرية مع شيدر وخس وطماطم وصوص البيت.',
   185, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop', 'burgers'),
  ('Smash Burger & Fries', 'سماش برجر وبطاطس',
   'Double smashed patties with caramelized onions, served with fries.',
   'قطعتان من اللحم المضغوط مع بصل مكرمل وتقدم مع البطاطس.',
   210, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80&auto=format&fit=crop', 'burgers'),
  ('Crispy Chicken Burger', 'برجر فراخ كريسبي',
   'Crunchy fried chicken, pickles, slaw and spicy mayo.',
   'فراخ مقرمشة مع مخلل وكول سلو ومايونيز حار.',
   165, 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80&auto=format&fit=crop', 'burgers'),
  ('Margherita Pizza', 'بيتزا مارجريتا',
   'Wood-fired crust, San Marzano tomatoes, mozzarella and fresh basil.',
   'عجينة على الحطب مع صلصة طماطم وموتزاريلا وريحان طازج.',
   190, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80&auto=format&fit=crop', 'pizza'),
  ('Pepperoni Pizza', 'بيتزا بيبروني',
   'Loaded with beef pepperoni and a blend of melted cheeses.',
   'مليئة بالبيبروني البقري ومزيج من الأجبان الذائبة.',
   230, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80&auto=format&fit=crop', 'pizza'),
  ('Mixed Grill Platter', 'طبق مشويات مشكل',
   'Kofta, shish tawook and lamb chops with grilled vegetables.',
   'كفتة وشيش طاووق وريش ضاني مع خضار مشوي.',
   420, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80&auto=format&fit=crop', 'mains'),
  ('Salmon Power Bowl', 'بول السلمون',
   'Seared salmon, rice, avocado, edamame, corn and greens.',
   'سلمون مشوح مع أرز وأفوكادو وإدامامي وذرة وخضار.',
   260, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80&auto=format&fit=crop', 'mains'),
  ('Garden Salad', 'سلطة خضراء',
   'Crisp greens, cherry tomatoes and cucumber with lemon dressing.',
   'خضار طازج وطماطم شيري وخيار مع صوص الليمون.',
   95, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&auto=format&fit=crop', 'sides'),
  ('Golden Fries', 'بطاطس مقلية',
   'Hand-cut fries, crispy outside and fluffy inside.',
   'بطاطس مقطعة يدويًا، مقرمشة من الخارج وطرية من الداخل.',
   45, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80&auto=format&fit=crop', 'sides'),
  ('Chocolate Oreo Cup', 'كوب شوكولاتة وأوريو',
   'Layers of chocolate mousse, cream and crushed Oreo.',
   'طبقات من موس الشوكولاتة والكريمة والأوريو المطحون.',
   85, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80&auto=format&fit=crop', 'desserts'),
  ('Chocolate Cake', 'كيكة الشوكولاتة',
   'Rich, moist chocolate cake with ganache frosting.',
   'كيكة شوكولاتة غنية وطرية مع صوص الجاناش.',
   75, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80&auto=format&fit=crop', 'desserts'),
  ('Fresh Orange Juice', 'عصير برتقال فريش',
   'Freshly squeezed oranges, nothing added.',
   'برتقال معصور طازج بدون إضافات.',
   50, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80&auto=format&fit=crop', 'drinks'),
  ('Mint Lemonade', 'ليمون بالنعناع',
   'Fresh lemons blended with mint and ice.',
   'ليمون طازج مع النعناع والثلج.',
   45, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80&auto=format&fit=crop', 'drinks')
) as v(name_en, name_ar, description_en, description_ar, price, image_url, category)
where not exists (select 1 from public.products);

-- Everything that exists today is the curated demo menu → protect it and
-- guess a category from the English name (fix any misses from the dashboard).
update public.products
set
  is_seed = true,
  category = case
    -- \m / \M are word boundaries, so "Chocolate" doesn't match "cola".
    when name_en ~* '\mburgers?\M' then 'burgers'
    when name_en ~* '\mpizzas?\M' then 'pizza'
    when name_en ~* '\m(cakes?|ice cream|desserts?|brownies?|kunafa|konafa|basbousa|cookies?|waffles?|puddings?|donuts?)\M' then 'desserts'
    when name_en ~* '\m(cola|pepsi|juices?|water|drinks?|tea|coffee|lemonade|soda|shakes?|smoothies?)\M' then 'drinks'
    when name_en ~* '\m(fries|salads?|rings|soups?|wings|nuggets|bread|dips?)\M' then 'sides'
    else 'mains'
  end
where not exists (select 1 from public.products p2 where p2.is_seed); -- first run only


-- 3. Orders: normalise status / payment_method -------------------------------

alter table public.orders alter column status type text using status::text;
alter table public.orders alter column status set default 'pending';
alter table public.orders alter column payment_method type text using payment_method::text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'orders_status_check') then
    alter table public.orders add constraint orders_status_check
      check (status in ('pending', 'preparing', 'out_for_delivery', 'delivered'));
  end if;

  if not exists (select 1 from pg_constraint where conname = 'orders_payment_method_check') then
    alter table public.orders add constraint orders_payment_method_check
      check (payment_method in ('cash', 'online'));
  end if;
end;
$$;


-- 4. place_order: prices come from the database, not the browser -------------

create or replace function public.place_order(
  p_customer_name text,
  p_phone text,
  p_address text,
  p_payment_method text,
  p_items jsonb -- [{ "product_id": 1, "quantity": 2 }, ...]
)
returns public.orders
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders;
  v_total numeric := 0;
  v_item record;
begin
  if jsonb_typeof(p_items) is distinct from 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'Order must contain at least one item';
  end if;

  if coalesce(trim(p_customer_name), '') = '' or coalesce(trim(p_address), '') = '' then
    raise exception 'Name and address are required';
  end if;

  if p_phone !~ '^01[0125][0-9]{8}$' then
    raise exception 'Invalid phone number';
  end if;

  -- Validate every line and compute the total from current product prices.
  for v_item in
    select
      (i ->> 'product_id')::bigint as product_id,
      (i ->> 'quantity')::int as quantity,
      p.price,
      p.is_available
    from jsonb_array_elements(p_items) as i
    left join public.products p on p.id = (i ->> 'product_id')::bigint
  loop
    if v_item.price is null then
      raise exception 'Product % does not exist', v_item.product_id;
    end if;
    if not v_item.is_available then
      raise exception 'Product % is not available', v_item.product_id;
    end if;
    if v_item.quantity is null or v_item.quantity < 1 or v_item.quantity > 50 then
      raise exception 'Invalid quantity for product %', v_item.product_id;
    end if;
    v_total := v_total + v_item.price * v_item.quantity;
  end loop;

  insert into public.orders (
    user_id, customer_name, phone, address, payment_method, total_price, status
  )
  values (
    auth.uid(), trim(p_customer_name), p_phone, trim(p_address),
    p_payment_method, v_total, 'pending'
  )
  returning * into v_order;

  insert into public.order_items (order_id, product_id, quantity, price)
  select
    v_order.id,
    (i ->> 'product_id')::bigint,
    (i ->> 'quantity')::int,
    p.price
  from jsonb_array_elements(p_items) as i
  join public.products p on p.id = (i ->> 'product_id')::bigint;

  return v_order;
end;
$$;


-- 5. update_order_status: open to demo visitors, but only touches status ------

create or replace function public.update_order_status(
  p_order_id bigint,
  p_status text
)
returns public.orders
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders;
begin
  update public.orders
  set status = p_status
  where id = p_order_id
  returning * into v_order;

  if v_order.id is null then
    raise exception 'Order % not found', p_order_id;
  end if;

  return v_order;
end;
$$;


-- 6. reset_demo_data: admin only ---------------------------------------------

create or replace function public.reset_demo_data()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Only admins can reset demo data';
  end if;

  delete from public.order_items where true;
  delete from public.orders where true;
  delete from public.products where not is_seed;
end;
$$;

revoke all on function public.place_order(text, text, text, text, jsonb) from public;
revoke all on function public.update_order_status(bigint, text) from public;
revoke all on function public.reset_demo_data() from public;
grant execute on function public.place_order(text, text, text, text, jsonb) to anon, authenticated;
grant execute on function public.update_order_status(bigint, text) to anon, authenticated;
grant execute on function public.reset_demo_data() to authenticated;


-- 7. Row Level Security -------------------------------------------------------

do $$
declare
  pol record;
begin
  for pol in
    select policyname, tablename
    from pg_policies
    where schemaname = 'public'
      and tablename in ('products', 'orders', 'order_items', 'profiles')
  loop
    execute format('drop policy %I on public.%I', pol.policyname, pol.tablename);
  end loop;
end;
$$;

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.profiles enable row level security;

-- Products: everyone can browse and play with the dashboard,
-- but seed products can only be changed by admins.
create policy "products: read" on public.products
  for select using (true);

create policy "products: create" on public.products
  for insert with check (not is_seed or public.is_admin());

create policy "products: update" on public.products
  for update using (not is_seed or public.is_admin())
  with check (not is_seed or public.is_admin());

create policy "products: delete" on public.products
  for delete using (not is_seed or public.is_admin());

-- Orders: readable by everyone (public demo dashboard + tracking).
-- Writes only go through place_order / update_order_status / reset_demo_data.
create policy "orders: read" on public.orders
  for select using (true);

create policy "order_items: read" on public.order_items
  for select using (true);

-- Profiles: you can read your own profile (to know whether you're admin).
create policy "profiles: read own" on public.profiles
  for select using (id = auth.uid());


-- 8. Realtime -----------------------------------------------------------------

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'orders'
  ) then
    alter publication supabase_realtime add table public.orders;
  end if;
end;
$$;
