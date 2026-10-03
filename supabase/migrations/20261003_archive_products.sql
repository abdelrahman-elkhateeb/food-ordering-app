-- =============================================================================
-- Foodie — archive products that are part of past orders
--
-- Run once in the Supabase SQL editor. Safe to re-run.
--
-- Deleting a product that appears in orders would break order history, so
-- delete_product() archives it instead: hidden from the menu and dashboard,
-- still readable by orders (name, image) through the existing join.
-- =============================================================================

alter table public.products add column if not exists archived_at timestamptz;

-- Returns 'deleted' or 'archived'.
create or replace function public.delete_product(p_product_id bigint)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_is_seed boolean;
begin
  select is_seed into v_is_seed
  from public.products
  where id = p_product_id and archived_at is null;

  if not found then
    raise exception 'Product % not found', p_product_id;
  end if;

  -- Same rule as the RLS policies: demo menu items are admin-only.
  if v_is_seed and not public.is_admin() then
    raise exception 'PRODUCT_PROTECTED';
  end if;

  if exists (select 1 from public.order_items where product_id = p_product_id) then
    update public.products
    set archived_at = now(), is_available = false
    where id = p_product_id;
    return 'archived';
  end if;

  delete from public.products where id = p_product_id;
  return 'deleted';
end;
$$;

revoke all on function public.delete_product(bigint) from public;
grant execute on function public.delete_product(bigint) to anon, authenticated;

-- Reset now also brings back archived demo menu items.
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
  update public.products
  set archived_at = null, is_available = true
  where is_seed and archived_at is not null;
end;
$$;
