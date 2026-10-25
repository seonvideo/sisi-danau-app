-- Jalankan seluruh SQL ini di Supabase > SQL Editor > New query.
-- RLS memastikan pengguna hanya dapat mengakses data miliknya sendiri.

create table if not exists public.inventory_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  entry_date date not null default current_date,
  department text not null check (department in ('Dapur','Bar','Service')),
  item_name text not null,
  unit text not null default 'pcs',
  opening numeric not null default 0 check (opening >= 0),
  incoming numeric not null default 0 check (incoming >= 0),
  outgoing numeric not null default 0 check (outgoing >= 0),
  closing numeric not null default 0 check (closing >= 0),
  physical_count numeric,
  created_at timestamptz not null default now()
);
create table if not exists public.cash_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  entry_date date not null default current_date,
  description text not null,
  category text not null default 'Operasional',
  notes text,
  debit numeric not null default 0 check (debit >= 0),
  credit numeric not null default 0 check (credit >= 0),
  created_at timestamptz not null default now()
);
create table if not exists public.ingredients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  unit text not null,
  price_per_unit numeric not null default 0 check (price_per_unit >= 0),
  created_at timestamptz not null default now()
);
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  servings numeric not null default 1 check (servings > 0),
  total_cost numeric not null default 0 check (total_cost >= 0),
  created_at timestamptz not null default now()
);

alter table public.inventory_entries enable row level security;
alter table public.cash_entries enable row level security;
alter table public.ingredients enable row level security;
alter table public.recipes enable row level security;

create policy "owner manages inventory" on public.inventory_entries for all to authenticated
using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner manages cash" on public.cash_entries for all to authenticated
using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner manages ingredients" on public.ingredients for all to authenticated
using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner manages recipes" on public.recipes for all to authenticated
using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists inventory_user_date_idx on public.inventory_entries(user_id, entry_date desc);
create index if not exists cash_user_date_idx on public.cash_entries(user_id, entry_date desc);
create index if not exists ingredients_user_name_idx on public.ingredients(user_id, name);
create index if not exists recipes_user_name_idx on public.recipes(user_id, name);
-- Kolom tambahan untuk format stok Excel (jalankan jika tabel sudah dibuat).
alter table public.inventory_entries add column if not exists spoiled numeric not null default 0 check (spoiled >= 0);
alter table public.inventory_entries add column if not exists notes text;

-- Kolom keterangan tambahan pada Kas Harian (aman dijalankan pada tabel yang sudah ada).
alter table public.cash_entries add column if not exists notes text;
