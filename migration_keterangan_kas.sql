-- Jalankan di Supabase > SQL Editor untuk menambah kolom Keterangan setelah Saldo.
alter table public.cash_entries add column if not exists notes text;
notify pgrst, 'reload schema';
