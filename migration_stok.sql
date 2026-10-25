-- Jalankan sekali di Supabase > SQL Editor untuk menambah kolom format stok baru.
-- Jangan jalankan ulang jika kolom spoiled dan notes sudah ada.
alter table public.inventory_entries add column if not exists spoiled numeric not null default 0 check (spoiled >= 0);
alter table public.inventory_entries add column if not exists notes text;
