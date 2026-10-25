# Aplikasi Resto & Cafe Sisi Danau

Starter project untuk pemula: stok harian, kas harian, daftar bahan dan harga, serta pencatatan HPP resep. Dibangun dengan React + Vite dan Supabase.

## Bagian yang sudah ada
- Login/daftar dengan email dan password.
- Stok harian untuk Dapur, Bar, dan Service.
- Rumus stok sistem akhir = stok awal + barang masuk - barang keluar.
- Kolom stok fisik akhir opsional dan selisih terhadap stok sistem.
- Kas manual dengan debit, kredit, dan saldo kumulatif.
- Daftar bahan dan harga per satuan dasar.
- Pencatatan resep, jumlah porsi, total biaya bahan, dan HPP per porsi.
- Database online dengan Row Level Security (RLS).

## 1. Pasang aplikasi yang dibutuhkan
1. Install Node.js versi LTS dari https://nodejs.org/
2. Install Visual Studio Code dari https://code.visualstudio.com/
3. Ekstrak ZIP ini ke folder yang mudah ditemukan, misalnya `sisi-danau-app`.
4. Buka VS Code > File > Open Folder > pilih folder `sisi-danau-app`.
5. Di VS Code, pilih Terminal > New Terminal.

## 2. Buat database Supabase
1. Buka https://supabase.com/ lalu buat akun dan project baru.
2. Simpan password database di tempat aman.
3. Masuk ke project > SQL Editor > New query.
4. Buka file `supabase.sql` di project ini, salin seluruh isinya ke SQL Editor, lalu tekan Run.
5. Buka Project Settings > API (atau Connect/API Keys pada tampilan baru).
6. Salin Project URL dan publishable/anon key. Jangan pernah memasukkan `service_role` atau secret key ke website.

## 3. Hubungkan project
1. Di VS Code, buat file baru bernama `.env` di folder utama (sejajar dengan `package.json`).
2. Salin isi `.env.example` ke `.env`.
3. Ganti nilai contoh dengan URL dan publishable/anon key milik project Supabase, contohnya:
   `VITE_SUPABASE_URL=https://abcxyz.supabase.co`
   `VITE_SUPABASE_ANON_KEY=ey...`
4. Jangan tambahkan tanda kutip. Jangan unggah file `.env` ke GitHub atau membagikannya ke orang lain.

## 4. Jalankan di komputer
Di terminal VS Code, jalankan satu per satu:

```bash
npm install
npm run dev
```

Terminal akan menampilkan alamat lokal, biasanya `http://localhost:5173`. Buka alamat itu di browser. Biarkan terminal tetap berjalan selama aplikasi digunakan secara lokal.

## 5. Buat akun
- Daftarkan akun melalui halaman aplikasi.
- Jika Supabase meminta konfirmasi email, buka email dan konfirmasikan.
- Masuk menggunakan email dan password.
- Jika konfirmasi email mengganggu pengujian, kamu bisa memeriksa Authentication > Providers/Sign In di Supabase; untuk penggunaan nyata, sebaiknya tetap aktifkan konfirmasi email.

## 6. Publikasikan online dengan Vercel
1. Buat akun di https://github.com/ dan https://vercel.com/.
2. Buat repository GitHub baru dan unggah file project, tetapi JANGAN unggah `.env`.
3. Di Vercel, pilih Add New > Project lalu import repository.
4. Di bagian Environment Variables, tambahkan:
   - `VITE_SUPABASE_URL` = URL Supabase
   - `VITE_SUPABASE_ANON_KEY` = publishable/anon key
5. Tekan Deploy. Vercel akan memberikan alamat website HTTPS yang bisa dibuka di HP dan komputer.
6. Jika mengubah kode setelah deploy, push perubahan ke GitHub agar Vercel membangun ulang website.

## Cara pakai
- **Stok Harian:** pilih tanggal, bagian, barang, satuan, stok awal, masuk, dan keluar. Stok sistem akhir dihitung otomatis.
- **Kas Harian:** masukkan debit sebagai uang masuk dan kredit sebagai uang keluar. Saldo dihitung dari total debit dikurangi total kredit.

## Catatan penting sebelum dipakai operasional
Ini adalah versi awal/MVP. Saldo kas adalah jumlah debit dikurangi kredit sejak awal data, sehingga masukkan saldo awal sebagai transaksi pembuka. Data stok disimpan sebagai catatan harian; aplikasi belum otomatis mengambil stok akhir kemarin menjadi stok awal hari ini. HPP versi awal belum mengalikan komposisi resep dan konversi satuan secara otomatis. Laporan cetak/Excel, edit transaksi, multi-user/role pegawai, audit log, dan backup terjadwal belum termasuk. Uji dengan data contoh terlebih dahulu dan cocokkan hasilnya sebelum dipakai untuk pembukuan sebenarnya.

Setiap akun hanya melihat data milik akun itu sendiri karena aturan RLS. Untuk pemakaian satu restoran oleh beberapa pegawai dengan data bersama, tahap selanjutnya perlu mengubah model akses menjadi organisasi/restoran bersama dan role pengguna—jangan membagikan satu password kepada semua pegawai.

## Pembaruan menu stok Dapur, Bar, Service

Versi ini memisahkan stok menjadi tiga menu. Form stok menyediakan daftar barang berdasarkan template Excel Dapur/Bar/Service. Stok awal mengambil stok akhir terbaru dari tanggal sebelumnya untuk barang dan bagian yang sama. Stok akhir dihitung otomatis: stok awal + masuk - keluar - spoiled. Kolom tanggal memakai kalender.

**Penting setelah memperbarui aplikasi:** di Supabase > SQL Editor, jalankan isi file `migration_stok.sql` satu kali untuk menambah kolom `spoiled` dan `notes` ke tabel `inventory_entries`. Tidak perlu menjalankan ulang seluruh `supabase.sql` jika tabel dan kebijakan sudah dibuat.

Menu Kas Harian kini menampilkan saldo berjalan per transaksi. Masukkan saldo awal kas sebagai transaksi pertama pada kolom Debit (jika uang kas awal positif).

## Nama barang otomatis di riwayat stok

Di menu Stok Dapur, Stok Bar, dan Stok Service, daftar nama barang dari template Excel sekarang langsung tampil di tabel riwayat. Barang yang belum pernah dicatat akan ditampilkan dengan angka 0 dan keterangan **Belum ada catatan stok**. Baris ini hanya tampilan daftar master dan tidak membuat transaksi baru di Supabase. Saat barang sudah memiliki catatan stok, baris placeholder untuk barang/satuan yang sama tidak ditampilkan lagi. Dengan demikian nama barang tidak perlu diketik satu per satu dan riwayat lama tetap dipertahankan.

## Export & Cetak laporan stok

Buka menu **Export & Cetak** di sidebar, pilih bagian stok (Dapur/Bar/Service), tanggal awal dan tanggal akhir, lalu klik **Cetak / Simpan PDF**. Browser akan membuka dialog cetak; pilih printer atau **Save as PDF** untuk menyimpan laporan. Format laporan A4 landscape mencakup tanggal, nama barang, satuan, stok awal, masuk, keluar, spoiled, stok akhir, dan keterangan.

Pilihan awal laporan telah disetel ke Stok Dapur untuk periode 1–31 Oktober 2026 sesuai permintaan. Laporan hanya menampilkan catatan stok yang sudah tersimpan di Supabase dalam periode tersebut.


## Menambah barang baru di Stok Dapur, Bar, atau Service

Versi ini menyediakan tombol **+ Tambah Barang** di masing-masing menu stok. Masukkan nama barang dan satuannya; barang akan tersimpan sebagai daftar master di Supabase dan langsung tampil pada tabel bagian yang dipilih. Nama barang yang sama dengan satuan yang sama tidak bisa didaftarkan dua kali pada bagian yang sama.

**Penting:** sebelum menggunakan fitur ini, buka Supabase → SQL Editor → New query, lalu jalankan isi file `migration_barang_baru.sql` satu kali. Migrasi ini hanya membuat tabel master `stock_items` dan kebijakannya; tidak menghapus transaksi stok atau data lama. Jangan menjalankan ulang seluruh `supabase.sql` pada database yang sudah berisi data.


## Pembaruan Kas Harian: kolom Keterangan
Versi ini menambahkan kolom **Keterangan** setelah **Saldo** di tabel Riwayat Kas, terpisah dari Uraian transaksi. Saat pertama kali menggunakan versi ini pada database Supabase yang sudah ada, buka SQL Editor dan jalankan isi file `migration_keterangan_kas.sql`. Kolom ini opsional; transaksi lama akan menampilkan tanda — jika belum memiliki keterangan.
