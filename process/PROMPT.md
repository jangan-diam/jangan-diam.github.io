# Workflow & Prompt Template: Adding Aksi Kamisan Data to `data/archive.json` & `data/statistics.json`

Gunakan instruksi di bawah ini ketika menerima input data baru Aksi Kamisan untuk ditambahkan ke berkas `data/archive.json` serta memperbarui `data/statistics.json`.

---

## 1. Format Input User

Input dari user berupa informasi minimalis seperti berikut:

```text
Kamisan [Nomor Aksi]
Sumber: [URL Cuitan/Sumber]
Selebaran: [URL Gambar Selebaran]
Foto: [URL Gambar Foto Aksi]
```

**Contoh Input:**
```text
Kamisan 917
Sumber: https://x.com/sumarsih11/status/2080507254407905443
Selebaran: https://pbs.twimg.com/media/HN9yUo2aQAA7zV4?format=jpg&name=large
Foto: https://pbs.twimg.com/media/HN9yUoSbgAATkNk?format=jpg&name=large
```

---

### 2. Langkah Pemrosesan AI Agent

Saat memulai pemrosesan, AI Agent harus menanyakan pilihan alur kerja yang diinginkan terlebih dahulu kepada user:
1. **Memproses folder yang sudah ada (Existing Folder)**
2. **Memproses input baru (New Input)**

---

### PILIHAN 1: Memproses Folder yang Sudah Ada (Existing Folder)
Jika memilih opsi ini, lakukan langkah-langkah berikut:

#### Langkah 1.1: Identifikasi Folder yang Belum Diproses
- Periksa daftar nomor aksi yang sudah ada di dalam berkas `data/archive.json` (melihat bidang `actNum` atau `id`).
- Cari folder berangka di dalam direktori `process/` (contoh: `process/917/`) yang nomor aksinya **belum tercatat** di `data/archive.json`.
- Pilih folder tersebut untuk diproses.

#### Langkah 1.2: Pindahkan Berkas Gambar Berdasarkan `input.json`
- Baca berkas `input.json` di dalam folder tersebut untuk mendeteksi file pamphlet dan foto:
  - Cari berkas gambar dengan nama yang tertera pada bidang `"pamphlete"` (bisa berupa string tunggal atau array string jika selebaran memiliki beberapa bagian/halaman tersambung):
    - Jika berupa string tunggal (contoh: `"photo_2.jpg"`), ubah nama/pindahkan berkas menjadi `selebaran.jpg` di dalam folder yang sama.
    - Jika berupa array string (contoh: `["photo_2.jpg", "photo_3.jpg"]`), ubah nama/pindahkan berkas pertama menjadi `selebaran.jpg`, berkas kedua menjadi `selebaran_2.jpg`, berkas ketiga menjadi `selebaran_3.jpg`, dst.
  - Cari berkas gambar pertama dengan nama yang tertera pada array `"photo"` (jika disediakan/ada, contoh: `photo_1.jpg`):
    - Analisis berkas gambar tersebut terlebih dahulu:
      - Jika berupa foto suasana aksi/lapangan atau dokumentasi spanduk, ubah nama/pindahkan menjadi `foto.jpg` di dalam folder yang sama.
      - Jika berupa hasil pindaian/foto teks refleksi aksi (esai refleksi, tulisan reflektif), ubah nama/pindahkan menjadi `refleksi.jpg` di dalam folder yang sama.
    - **PENTING**: Bidang `"photo"` pada `input.json` bisa kosong `[]`. Jika kosong, abaikan pencarian/pemindahan berkas foto/refleksi tersebut.
- Setelah berkas `selebaran.jpg` (dan berkas selebaran bagian lainnya jika ada) siap di dalam folder (beserta `foto.jpg` atau `refleksi.jpg` jika ada), lanjutkan ke **Langkah 3 (Analisis Berkas Bukti)**.

---

### PILIHAN 2: Memproses Input Baru (New Input)
Jika memilih opsi ini, lakukan langkah-langkah pemrosesan dari input user:

#### Langkah 2.1: Buat Direktori Isolasi Proses
- Buat folder khusus untuk nomor aksi baru tersebut di dalam direktori `process/`:
  `process/[Nomor Aksi]/` (contoh: `process/917/`)

#### Langkah 2.2: Unduh & Ubah Nama Gambar ke Format `photo_n` serta Buat `input.json`
- Unduh gambar dari URL input user dan simpan dengan penamaan `photo_n` di folder proses:
  - Unduh **Foto Aksi** (jika disediakan/ada) dan simpan sebagai `process/[Nomor Aksi]/photo_1.jpg`
  - Unduh **Selebaran** (jika ada beberapa halaman/bagian yang tersambung, simpan masing-masing sebagai `photo_2.jpg`, `photo_3.jpg`, dst.)
- Buat berkas `input.json` di dalam folder `process/[Nomor Aksi]/` dengan skema seperti berikut:
  - Jika selebaran hanya terdiri dari 1 halaman dan ada foto aksi:
    ```json
    {
      "number": "[Nomor Aksi]",
      "source": "[URL Sumber]",
      "pamphlete": "photo_2.jpg",
      "photo": [
        "photo_1.jpg"
      ]
    }
    ```
  - Jika selebaran terdiri dari 1 halaman dan **TIDAK** ada foto aksi:
    ```json
    {
      "number": "[Nomor Aksi]",
      "source": "[URL Sumber]",
      "pamphlete": "photo_2.jpg",
      "photo": []
    }
    ```
  - Jika selebaran memiliki beberapa halaman/bagian tersambung dan ada foto aksi:
    ```json
    {
      "number": "[Nomor Aksi]",
      "source": "[URL Sumber]",
      "pamphlete": [
        "photo_2.jpg",
        "photo_3.jpg"
      ],
      "photo": [
        "photo_1.jpg"
      ]
    }
    ```
- Buat salinan berkas gambar tersebut (atau ubah nama salinannya) agar tersedia berkas `selebaran.jpg` (dari `photo_2.jpg`), berkas bagian selebaran tambahan `selebaran_2.jpg`, dst. (jika ada), serta `foto.jpg` (jika berupa dokumentasi foto aksi) atau `refleksi.jpg` (jika berupa hasil pindaian teks refleksi) dari `photo_1.jpg` (jika ada) di dalam folder tersebut untuk kebutuhan analisis.
- Lanjutkan ke **Langkah 3 (Analisis Berkas Bukti)**.

---

### Langkah 3: Analisis Berkas Bukti (Proof)
- Analisis gambar `selebaran.jpg` (dan berkas selebaran tambahan `selebaran_n.jpg` jika ada) dan ekstrak informasi berikut:
  - **Tanggal Aksi**: Format ISO `YYYY-MM-DD` (contoh: `23 Juli 2026` → `2026-07-23`).
  - **Nomor Dokumen**: Ambil dari baris `Nomor: ...` (contoh: `81/Selebaran_Aksi Kamisan/VII/2026` atau `476/Surat Terbuka_JSKK/X/2024`).
  - **Aturan Penamaan Dokumen ("Surat Terbuka" vs "Selebaran")**:
    - **PENTING**: Jika nomor dokumen mengandung kata `Surat Terbuka_JSKK`, dokumen ini harus dianggap sebagai **Surat Terbuka** (bukan Selebaran biasa).
    - Judul utama (`title`) dokumen harus menggunakan format `Surat Terbuka #[Nomor Aksi]: [Judul Utama]` (bukan `Selebaran #[Nomor Aksi]...`).
    - Untuk nama berkas lampiran (`attachments`), gunakan `"Hasil Pindaian Surat Terbuka"` untuk `title`, dan `"Naskah Surat Terbuka"` untuk `footer`.
    - Jika nomor dokumen tidak mengandung kata `Surat Terbuka_JSKK`, gunakan penamaan `"Selebaran #[Nomor Aksi]: [Judul Utama]"` untuk judul dokumen, `"Hasil Pindaian Selebaran"` untuk attachment `title`, and `"Selebaran Naskah"` untuk attachment `footer`.
  - **Aturan Berkas Lampiran Foto (`attachments` jenis `foto`)**:
    - Foto aksi lapangan tidak harus selalu menunjukkan spanduk aksi (spanduk perlawanan). Foto tersebut bisa berupa foto aksi/suasana lapangan umum.
    - Sesuai dengan jenis fotonya, perbarui `subtitle` dari lampiran foto tersebut:
      - Jika foto menunjukkan spanduk: `"Foto Spanduk Perlawanan Aksi #[Nomor Aksi]"`
      - Jika berupa foto aksi umum/lapangan: `"Foto Suasana Aksi #[Nomor Aksi]"` atau `"Dokumentasi Aksi Kamisan #[Nomor Aksi]"`
    - **PENTING**: Ada kemungkinan foto aksi lapangan kosong (tidak disediakan). Jika tidak ada foto aksi lapangan yang disediakan, hapus/abaikan objek bertipe `"foto"` dari array `attachments` di berkas `result.json` (dan tidak perlu ada berkas `foto.jpg` di folder proses).
  - **Aturan Berkas Lampiran Refleksi (`attachments` jenis `refleksi`)**:
    - Jika berkas gambar yang ada (dari array `photo`) merupakan hasil pindaian/foto tulisan/esai refleksi, maka berkas tersebut diidentifikasi sebagai lampiran tipe `"refleksi"`.
    - Gunakan format objek lampiran refleksi berikut:
      ```json
      {
        "type": "refleksi",
        "title": "Hasil Pindaian refleksi",
        "subtitle": "Refleksi Aksi Kamisan #[Nomor Aksi]",
        "icon": "lucide:file-text",
        "imageUrl": "/process/[Nomor Aksi]/refleksi.jpg",
        "footer": "Refleksi [Nama Pembuat Refleksi]"
      }
      ```
      Identifikasi nama pembuat/penulis refleksi dari gambar tersebut untuk mengisi bagian `footer` (contoh: `"Refleksi Alif Imam"`). Jika tidak ada nama penulis yang jelas, gunakan `"Refleksi Aksi Kamisan #[Nomor Aksi]"`.
  - **Judul Utama**: Ambil dari judul selebaran/surat terbuka di dalam tanda petik (contoh: `27 Tahun Tragedi Dayah Babul Mukarramah, Beutong Ateuh, Aceh Barat`).
  - **Transkrip Teks (`textBody`)**: Ekstrak seluruh isi naskah secara **setia dan presisi sesuai isi asli (*faithful to the content*)** ke dalam format HTML (`<p>`, `<blockquote>`, `<ol>`, `<li>`, `<strong>`). **Dilarang keras mengubah, merangkum, memotong, atau memodifikasi teks asli dari naskah**. Jika naskah terdiri dari beberapa bagian tersambung, gabungkan transkripnya secara berurutan. Jangan sertakan nomor dokumen di dalam `textBody`.
  - **Isu/Kasus Dirujuk (`casesReferred`)**: Array string daftar kasus yang disebutkan.
  - **Tag Terkait (`tags`)**: Array kata kunci relevan.
  - **Ringkasan (`summary`)**: Ringkasan 1-2 kalimat mengenai tuntutan aksi.
  - **Poin Kunci & wawasan (`insights`)**: Array berisi **tepat 3 poin penting** yang merangkum poin-poin utama, konteks sejarah, dan wawasan kritis dari naskah/aksi tersebut. **Setiap poin wajib memiliki panjang minimal 150 karakter**.

### Langkah 4: Harmonisasi Tags (`data/tags.json`) & Cases (`data/cases.json`)
- **Pencocokan Tag (`tags`)**:
  - Baca `data/tags.json`.
  - Bandingkan tag hasil ekstraksi dengan daftar tag yang ada.
  - Jika tag hasil ekstraksi serupa atau identik secara makna dengan tag yang sudah ada (contoh: `Pendekatan Militeristik` → `Militerisasi`), **wajib gunakan tag resmi yang ada di `data/tags.json`**.
  - Jika tag benar-benar baru, tambahkan tag tersebut ke dalam `data/tags.json`.
- **Pencocokan Kasus (`casesReferred`)**:
  - Baca `data/cases.json`.
  - Bandingkan kasus hasil ekstraksi dengan daftar kasus yang ada.
  - Jika kasus serupa dengan kasus yang sudah ada (contoh: `Penyerangan Andrie Yunus` → `Penyiraman Air Keras terhadap Andrie Yunus`), **wajib gunakan nama kasus resmi yang ada di `data/cases.json`**.
  - Jika kasus benar-benar baru, tambahkan kasus tersebut ke dalam `data/cases.json`.

### Langkah 5: Buat Berkas `result.json`
- Simpan objek JSON tunggal hasil ekstraksi di berkas `process/[Nomor Aksi]/result.json`.
- **PENTING**: Bidang `imageUrl` di dalam `attachments` harus merujuk ke berkas gambar lokal standar di dalam direktori proses dengan format `/process/[Nomor Aksi]/selebaran.jpg` (dan `/process/[Nomor Aksi]/selebaran_n.jpg` jika ada) serta `/process/[Nomor Aksi]/foto.jpg` atau `/process/[Nomor Aksi]/refleksi.jpg`.
- **Aturan Berkas Lampiran Foto (`attachments` jenis `foto`)**:
  - Jika tidak ada foto aksi lapangan yang disediakan, objek `"type": "foto"` harus dihapus dari array `attachments`.
  - Sesuaikan `subtitle` pada objek `"foto"` jika bukan merupakan spanduk aksi (misalnya `"Foto Suasana Aksi #[Nomor Aksi]"`).
- **Aturan Berkas Lampiran Refleksi (`attachments` jenis `refleksi`)**:
  - Jika terdapat berkas refleksi (`refleksi.jpg`), sertakan objek `"type": "refleksi"` ke dalam array `attachments` dengan skema yang sesuai.
- **Penanganan Selebaran dengan Beberapa Bagian (Connected Parts)**:
  - Jika selebaran terdiri dari beberapa halaman/bagian tersambung, buatlah objek naskah terpisah untuk setiap bagian di dalam array `attachments`.
  - Gunakan imbuhan `(Bagian 1)`, `(Bagian 2)`, dst. pada `title` dan `footer`, serta `- Bagian 1`, `- Bagian 2`, dst. pada `subtitle` untuk membedakan bagian-bagian tersebut.

#### Contoh result.json (Untuk Selebaran Biasa):
```json
{
  "id": "[Nomor Aksi]",
  "actNum": "[Nomor Aksi]",
  "docNum": "[Nomor Dokumen]",
  "date": "[YYYY-MM-DD]",
  "title": "Selebaran #[Nomor Aksi]: [Judul Utama Selebaran]",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "summary": "[Ringkasan 1-2 kalimat]",
  "insights": [
    "[Poin Kunci 1: Fakta/Konteks Sejarah Utama (Minimal 150 Karakter)]",
    "[Poin Kunci 2: Isu/Tuntutan Krusial (Minimal 150 Karakter)]",
    "[Poin Kunci 3: Wawasan Tambahan/Ancaman HAM Terkini (Minimal 150 Karakter)]"
  ],
  "casesReferred": [
    "Kasus 1",
    "Kasus 2"
  ],
  "source": "Selebaran Aksi Kamisan / JSKK",
  "sourceUrl": "[URL Sumber]",
  "textBody": "<p>Paragraf 1...</p><p>Paragraf 2...</p><blockquote>Quote...</blockquote><ol><li>Tuntutan 1...</li></ol>",
  "attachments": [
    {
      "type": "naskah",
      "title": "Hasil Pindaian Selebaran",
      "subtitle": "Selebaran Aksi Kamisan #[Nomor Aksi]",
      "icon": "lucide:file-text",
      "imageUrl": "/process/[Nomor Aksi]/selebaran.jpg",
      "footer": "Selebaran Naskah"
    },
    {
      "type": "foto",
      "title": "Dokumentasi Aksi Lapangan",
      "subtitle": "Foto Spanduk Perlawanan Aksi #[Nomor Aksi]",
      "icon": "lucide:camera",
      "imageUrl": "/process/[Nomor Aksi]/foto.jpg",
      "footer": "Foto Aksi #[Nomor Aksi]"
    }
  ]
}
```

#### Contoh result.json (Untuk Surat Terbuka JSKK dengan 2 Bagian Tersambung):
```json
{
  "id": "[Nomor Aksi]",
  "actNum": "[Nomor Aksi]",
  "docNum": "[Nomor Dokumen Surat Terbuka_JSKK]",
  "date": "[YYYY-MM-DD]",
  "title": "Surat Terbuka #[Nomor Aksi]: [Judul Utama]",
  "tags": ["Tag1", "Tag2"],
  "summary": "[Ringkasan 1-2 kalimat]",
  "insights": [
    "[Poin Kunci 1: Fakta/Konteks Sejarah Utama (Minimal 150 Karakter)]",
    "[Poin Kunci 2: Isu/Tuntutan Krusial (Minimal 150 Karakter)]",
    "[Poin Kunci 3: Wawasan Tambahan/Ancaman HAM Terkini (Minimal 150 Karakter)]"
  ],
  "casesReferred": ["Kasus 1"],
  "source": "Selebaran Aksi Kamisan / JSKK",
  "sourceUrl": "[URL Sumber]",
  "textBody": "<p>Isi Surat Terbuka Bagian 1...</p><p>Isi Surat Terbuka Bagian 2...</p>",
  "attachments": [
    {
      "type": "naskah",
      "title": "Hasil Pindaian Surat Terbuka (Bagian 1)",
      "subtitle": "Surat Terbuka Aksi Kamisan #[Nomor Aksi] - Bagian 1",
      "icon": "lucide:file-text",
      "imageUrl": "/process/[Nomor Aksi]/selebaran.jpg",
      "footer": "Naskah Surat Terbuka (Bagian 1)"
    },
    {
      "type": "naskah",
      "title": "Hasil Pindaian Surat Terbuka (Bagian 2)",
      "subtitle": "Surat Terbuka Aksi Kamisan #[Nomor Aksi] - Bagian 2",
      "icon": "lucide:file-text",
      "imageUrl": "/process/[Nomor Aksi]/selebaran_2.jpg",
      "footer": "Naskah Surat Terbuka (Bagian 2)"
    },
    {
      "type": "foto",
      "title": "Dokumentasi Aksi Lapangan",
      "subtitle": "Foto Spanduk Perlawanan Aksi #[Nomor Aksi]",
      "icon": "lucide:camera",
      "imageUrl": "/process/[Nomor Aksi]/foto.jpg",
      "footer": "Foto Aksi #[Nomor Aksi]"
    }
  ]
}
```

### Langkah 6: Penggabungan (Merge) & Pembaruan Data
- Baca `process/[Nomor Aksi]/result.json`.
- Sisipkan (prepend) objek JSON tersebut ke posisi pertama array di `data/archive.json`.
- Simpan pembaruan pada `data/tags.json` dan `data/cases.json` jika terdapat tag/kasus baru.
- **Pembaruan Statistik (`data/statistics.json`)**:
  - **Lakukan di Akhir Seluruh Proses**: Jika memproses beberapa folder/aksi sekaligus (multiple folders), **lakukan pembaruan `data/statistics.json` hanya satu kali pada langkah paling akhir** setelah seluruh folder selesai diproses dan digabungkan ke `data/archive.json`.
  - Perbarui bidang `totalArchives` jika terdapat penambahan/perubahan total naskah arsip (contoh: `"800+ Naskah"`).
  - Perbarui pula nilai `value` pada elemen bertuliskan `"label": "JUMLAH ARSIP"` di dalam daftar `stats` agar selaras dengan `totalArchives`.
- Pastikan semua berkas JSON (`archive.json`, `tags.json`, `cases.json`, `statistics.json`) tetap memiliki sintaks valid.

### Langkah 7: Pembersihan Berkas Duplikat & Simpan Direktori Proses
- **Hapus Berkas Gambar Duplikat (`photo_*`)**: Setelah proses penamaan ulang/penyiapan berkas gambar ke `selebaran.jpg`, `foto.jpg`, dan/atau `refleksi.jpg` selesai pada suatu folder, **hapus berkas gambar asli/duplikat** (seperti `photo_1.jpg`, `photo_2.jpg`, dst.) di dalam folder tersebut agar tidak terjadi duplikasi file gambar.
- **Simpan Folder Proses**: **JANGAN HAPUS** folder `process/[Nomor Aksi]/` beserta berkas utama yang tersisa (`input.json`, `selebaran.jpg`, `foto.jpg`, `refleksi.jpg`, `result.json`). Folder ini berfungsi sebagai rekam jejak dan bukti pemrosesan data.
