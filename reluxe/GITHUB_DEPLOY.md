# Panduan Deployment ke GitHub Pages

Berikut adalah langkah-langkah detail untuk men-deploy website Reluxe ke GitHub Pages:

## Langkah 1: Buat Repository di GitHub

1. Buka [GitHub](https://github.com/) dan login ke akun Anda
2. Klik tombol "+" di pojok kanan atas, lalu pilih "New repository"
3. Beri nama repository, misalnya "reluxe-music"
4. Pilih visibilitas (publik atau privat)
5. Klik "Create repository"

## Langkah 2: Persiapkan Repository Lokal

1. Buka terminal atau command prompt
2. Buat folder baru untuk repository (jika belum ada)
3. Inisialisasi Git di folder tersebut:

```bash
git init
```

4. Tambahkan remote GitHub repository:

```bash
git remote add origin https://github.com/USERNAME/reluxe-music.git
```

Pastikan untuk mengganti `USERNAME` dengan username GitHub Anda.

## Langkah 3: Upload File Website

1. Salin semua file dari folder `reluxe` ke folder repository lokal
2. Tambahkan semua file ke staging:

```bash
git add .
```

3. Commit perubahan:

```bash
git commit -m "Initial commit - Reluxe Music Player"
```

4. Push ke GitHub:

```bash
git push -u origin main
```

Catatan: Jika branch default Anda adalah "master", gunakan:

```bash
git push -u origin master
```

## Langkah 4: Aktifkan GitHub Pages

1. Buka repository di GitHub
2. Klik tab "Settings"
3. Scroll ke bawah hingga menemukan bagian "GitHub Pages"
4. Di bagian "Source", pilih branch (biasanya "main" atau "master")
5. Klik "Save"

## Langkah 5: Akses Website

Setelah beberapa menit, website Anda akan tersedia di URL:

```
https://USERNAME.github.io/reluxe-music
```

Ganti `USERNAME` dengan username GitHub Anda.

## Mengubah URL GitHub Corner

Jangan lupa untuk mengubah URL GitHub corner di file `index.html` agar mengarah ke repository Anda:

```html
<a href="https://github.com/USERNAME/reluxe-music" class="github-corner" aria-label="View source on GitHub">
```

Ganti `USERNAME` dengan username GitHub Anda.

## Troubleshooting

Jika website tidak muncul setelah deployment:

1. Pastikan branch yang dipilih benar di pengaturan GitHub Pages
2. Verifikasi bahwa file `index.html` berada di root repository
3. Periksa log di tab "Actions" untuk melihat apakah ada error dalam proses deployment

## Pembaruan Website

Untuk memperbarui website setelah melakukan perubahan:

1. Lakukan perubahan pada file lokal
2. Commit perubahan:

```bash
git add .
git commit -m "Update: deskripsi perubahan"
git push origin main
```

Website akan diperbarui secara otomatis setelah push berhasil. 