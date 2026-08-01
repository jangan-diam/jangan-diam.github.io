# Jangan Diam

![Language](https://img.shields.io/badge/language-HTML5%20%2F%20JS-E34F26?style=flat-square&logo=html5&logoColor=white)
![Alpine.js](https://img.shields.io/badge/framework-Alpine.js-8BC0D0?style=flat-square&logo=alpine.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/styling-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)

Portal edukasi dan arsip independen Aksi Kamisan, gerakan berdiri diam memakai pakaian dan payung hitam setiap sore hari Kamis di depan Istana Negara untuk menuntut penuntasan kasus pelanggaran HAM berat di Indonesia.

---

## Daftar Halaman

- **Halaman Utama** (`index.html`) <br> 
    Beranda portal yang menyajikan ringkasan arsip, statistik utama, pengenalan Aksi Kamisan, serta navigasi cepat ke seluruh fitur platform.

- **Katalog Arsip** (`archive.html`) <br>
    Halaman pencarian dan filter interaktif untuk memilah naskah selebaran, surat terbuka, serta foto dokumentasi aksi berdasarkan kasus HAM dan tag.

- **Rincian Aksi** (`detail.html`) <br>
    Halaman rincian untuk membaca naskah selebaran lengkap, transkrip, poin wawasan, serta pratinjau lampiran media dari edisi Aksi Kamisan tertentu.

- **Linimasa Sejarah** (`timeline.html`) <br>
    Visualisasi kronologis perjalanan Aksi Kamisan dan sejarah panjang penuntasan kasus pelanggaran HAM berat di Indonesia.

- **Rujukan & Edukasi** (`reference.html`) <br>
    Direktori pustaka edukasi yang memuat rekomendasi buku, film dokumenter, serta artikel seputar Aksi Kamisan dan HAM.

---

## Cara Kontribusi

Kami menyambut kontribusi dari siapa pun untuk menjaga arsip ini tetap mutakhir, akurat, dan dapat diakses publik.

### 1. Menambahkan Data Arsip Aksi Kamisan
Untuk menambahkan data edisi Aksi Kamisan baru:
1. Pelajari alur kerja dan templat ekstraksi data pada [process/PROMPT.md](file:///d:/Repository/personal-jangan-diam/process/PROMPT.md).
2. Simpan media bukti dan berkas hasil ekstraksi (`result.json`) di direktori `process/[Nomor Aksi]/`.
3. Sisipkan objek data baru ke [data/archive.json](file:///d:/Repository/personal-jangan-diam/data/archive.json), serta harmonisasikan [data/tags.json](file:///d:/Repository/personal-jangan-diam/data/tags.json), [data/cases.json](file:///d:/Repository/personal-jangan-diam/data/cases.json), dan [data/statistics.json](file:///d:/Repository/personal-jangan-diam/data/statistics.json).
4. Kirimkan *Pull Request* (PR) berisi penambahan data arsip dan berkas proses terkait.

### 2. Kontribusi Pengembangan Kode & Tampilan
1. *Fork* repositori ini dan buat *branch* baru (`git checkout -b feat/nama-fitur`).
2. Jalankan server lokal untuk menguji perubahan (contoh: `python -m http.server 8000`).
3. Pastikan struktur berkas JSON tetap valid dan tidak ada kendala pada komponen Alpine.js/Tailwind CSS.
4. Kirimkan *Pull Request* (PR) beserta penjelasan mengenai perubahan yang dilakukan.

---

## Pertanyaan & Masukan

Jika Anda memiliki pertanyaan, ingin memberikan masukan, atau ingin berkontribusi, Anda dapat membuka **Issue** di halaman GitHub repositori ini.

