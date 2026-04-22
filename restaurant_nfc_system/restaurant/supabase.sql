-- ═══════════════════════════════════════════════════════════
--  FLAVOR HOUSE — Supabase SQL Schema
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════

-- Enable UUID
create extension if not exists "uuid-ossp";

-- Categories
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  name_ar text,
  icon text default '🍽️',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Menu Items
create table if not exists menu_items (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references categories(id) on delete set null,
  name text not null,
  name_ar text,
  description text,
  description_ar text,
  price numeric(10,2) not null default 0,
  image_url text,
  available boolean default true,
  featured boolean default false,
  calories int,
  prep_time_min int default 15,
  tags text[] default '{}',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tables
create table if not exists restaurant_tables (
  id uuid primary key default uuid_generate_v4(),
  table_number int unique not null,
  capacity int default 4,
  active boolean default true
);

-- Orders
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number serial,
  table_number int not null,
  status text not null default 'pending' check (status in ('pending','confirmed','preparing','ready','done','cancelled')),
  items jsonb not null default '[]',
  subtotal numeric(10,2) default 0,
  tax numeric(10,2) default 0,
  service_charge numeric(10,2) default 0,
  discount numeric(10,2) default 0,
  total numeric(10,2) not null default 0,
  notes text,
  coupon_code text,
  customer_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Settings
create table if not exists restaurant_settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value text,
  updated_at timestamptz default now()
);

-- Coupons
create table if not exists coupons (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  discount_pct numeric(5,2) not null,
  max_uses int default 100,
  uses int default 0,
  active boolean default true,
  expires_at timestamptz,
  created_at timestamptz default now()
);

-- Auto-update trigger
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger menu_items_updated_at before update on menu_items for each row execute function update_updated_at();
create trigger orders_updated_at before update on orders for each row execute function update_updated_at();

-- RLS
alter table categories enable row level security;
alter table menu_items enable row level security;
alter table orders enable row level security;
alter table restaurant_settings enable row level security;
alter table coupons enable row level security;
alter table restaurant_tables enable row level security;

create policy "public_read_categories" on categories for select using (true);
create policy "public_read_menu" on menu_items for select using (true);
create policy "public_read_settings" on restaurant_settings for select using (true);
create policy "public_insert_orders" on orders for insert with check (true);
create policy "public_read_orders" on orders for select using (true);
create policy "public_read_coupons" on coupons for select using (active = true);
create policy "public_read_tables" on restaurant_tables for select using (true);
create policy "admin_all_categories" on categories for all using (auth.role() = 'authenticated');
create policy "admin_all_menu" on menu_items for all using (auth.role() = 'authenticated');
create policy "admin_all_orders" on orders for all using (auth.role() = 'authenticated');
create policy "admin_all_settings" on restaurant_settings for all using (auth.role() = 'authenticated');
create policy "admin_all_coupons" on coupons for all using (auth.role() = 'authenticated');
create policy "admin_all_tables" on restaurant_tables for all using (auth.role() = 'authenticated');
