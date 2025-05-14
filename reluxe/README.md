# Reluxe - Website Playlist Musik

Reluxe adalah platform web simpel untuk playlist musik yang dibuat dengan HTML, CSS, dan JavaScript.

## Fitur

- Desain responsif yang terinspirasi dari gambar referensi
- Player musik dengan kontrol play, pause, next, dan previous
- Progress bar dan kontrol volume
- Daftar playlist yang interaktif
- Layout yang modern dan menarik

## Cara Penggunaan Lokal

1. Clone repository ini
2. Buka file `index.html` di browser Anda

## Cara Hosting di GitHub Pages

1. Buat repository baru di GitHub
2. Clone repository ke komputer lokal Anda
3. Salin semua file dari folder `reluxe` ke folder repository yang baru dibuat
4. Push ke GitHub dengan perintah berikut:

```
git add .
git commit -m "Initial commit"
git push origin main
```

5. Aktifkan GitHub Pages dengan cara:
   - Buka repository di GitHub
   - Klik "Settings"
   - Scroll ke bagian "GitHub Pages"
   - Pilih branch (biasanya "main" atau "master")
   - Klik "Save"

6. Website Anda akan tersedia di: `https://username.github.io/nama-repository`

## Struktur File

```
/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── playlist.js
│   └── images/
│       ├── cover1.jpg
│       ├── cover2.jpg
│       ├── cover3.jpg
│       ├── cover4.jpg
│       └── cover5.jpg
├── index.html
└── README.md
```

## Teknologi yang Digunakan

- HTML5
- CSS3 (dengan Flexbox dan Grid)
- JavaScript (vanilla)
- Font Awesome untuk ikon

## Pengembangan Selanjutnya

Untuk pengembangan selanjutnya, Anda dapat menambahkan fitur-fitur berikut:

- Integrasi dengan database melalui API
- Sistem login dan registrasi
- Kemampuan untuk membuat dan menyimpan playlist pribadi
- Upload lagu
- Integrasi dengan API musik seperti Spotify atau SoundCloud

## Catatan

Website ini menggunakan file audio sampel dari SoundHelix untuk demo. Dalam implementasi nyata, Anda harus menggunakan file audio Anda sendiri atau mengintegrasikan dengan layanan streaming musik.

## License

MIT License 