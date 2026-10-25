-- Jalankan satu kali di Supabase > SQL Editor > New query.
-- Membuat daftar master barang terpisah dari transaksi stok, agar nama barang
-- dapat ditambahkan tanpa membuat transaksi stok palsu.

create table if not exists public.stock_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  department text not null check (department in ('Dapur','Bar','Service')),
  name text not null,
  unit text not null default 'pcs',
  created_at timestamptz not null default now()
);

create unique index if not exists stock_items_unique_per_owner
  on public.stock_items (user_id, department, lower(name), lower(unit));

alter table public.stock_items enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'stock_items'
      and policyname = 'owner manages stock items'
  ) then
    create policy "owner manages stock items"
      on public.stock_items
      for all to authenticated
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;
end $$;

notify pgrst, 'reload schema';
