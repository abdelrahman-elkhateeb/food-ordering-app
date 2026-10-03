-- =============================================================================
-- Foodie — only logged-in users can place orders
--
-- Run once in the Supabase SQL editor, after 20261002_demo_hardening.sql.
-- Safe to re-run.
-- =============================================================================

-- Same as before, plus: reject callers without a session.
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
  if auth.uid() is null then
    raise exception 'You must be logged in to place an order';
  end if;

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

-- Logged-out visitors (the anon role) can no longer call it at all.
revoke all on function public.place_order(text, text, text, text, jsonb) from public, anon;
grant execute on function public.place_order(text, text, text, text, jsonb) to authenticated;
