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

## 2. Langkah Pemrosesan AI Agent

Saat menerima input di atas, lakukan langkah-langkah berikut secara berurutan:

### Langkah 1: Buat Direktori Isolasi Proses
- Buat folder khusus untuk nomor aksi tersebut di dalam direktori `process/` agar tidak mengganggu berkas utama:
  `process/[Nomor Aksi]/` (contoh: `process/917/`)

### Langkah 2: Unduh & Analisis Berkas Bukti (Proof)
- Unduh gambar dari URL ke dalam folder proses sebagai bukti:
  - Selebaran: `process/[Nomor Aksi]/selebaran.jpg`
  - Foto Aksi: `process/[Nomor Aksi]/foto.jpg`
- Analisis gambar `selebaran.jpg` dan ekstrak informasi berikut:
  - **Tanggal Aksi**: Format ISO `YYYY-MM-DD` (contoh: `23 Juli 2026` → `2026-07-23`).
  - **Nomor Dokumen**: Ambil dari baris `Nomor: ...` (contoh: `81/Selebaran_Aksi Kamisan/VII/2026`).
  - **Judul Utama**: Ambil dari judul selebaran di dalam tanda petik (contoh: `27 Tahun Tragedi Dayah Babul Mukarramah, Beutong Ateuh, Aceh Barat`).
  - **Transkrip Teks**: Ekstrak seluruh isi naskah selebaran ke format HTML (`<p>`, `<blockquote>`, `<ol>`, `<li>`, `<strong>`). Jangan sertakan nomor dokumen di dalam `textBody`.
  - **Isu/Kasus Dirujuk (`casesReferred`)**: Array string daftar kasus yang disebutkan.
  - **Tag Terkait (`tags`)**: Array kata kunci relevan.
  - **Ringkasan (`summary`)**: Ringkasan 1-2 kalimat mengenai tuntutan aksi.
  - **Poin Kunci & wawasan (`insights`)**: Array berisi **tepat 3 poin penting** yang merangkum poin-poin utama, konteks sejarah, dan wawasan kritis dari selebaran/aksi tersebut.

### Langkah 3: Harmonisasi Tags (`data/tags.json`) & Cases (`data/cases.json`)
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

### Langkah 4: Buat Berkas `result.json`
- Simpan objek JSON tunggal hasil ekstraksi di berkas `process/[Nomor Aksi]/result.json`:

```json
{
  "id": "[Nomor Aksi]",
  "actNum": "[Nomor Aksi]",
  "docNum": "[Nomor Dokumen Selebaran]",
  "date": "[YYYY-MM-DD]",
  "title": "Selebaran #[Nomor Aksi]: [Judul Utama Selebaran]",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "summary": "[Ringkasan 1-2 kalimat]",
  "insights": [
    "[Poin Kunci 1: Fakta/Konteks Sejarah Utama]",
    "[Poin Kunci 2: Isu/Tuntutan Krusial]",
    "[Poin Kunci 3: Wawasan Tambahan/Ancaman HAM Terkini]"
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
      "imageUrl": "[URL Selebaran]",
      "footer": "Selebaran Naskah"
    },
    {
      "type": "foto",
      "title": "Dokumentasi Aksi Lapangan",
      "subtitle": "Foto Spanduk Perlawanan Aksi #[Nomor Aksi]",
      "icon": "lucide:camera",
      "imageUrl": "[URL Foto]",
      "footer": "Foto Aksi #[Nomor Aksi]"
    }
  ]
}
```

### Langkah 5: Penggabungan (Merge) & Pembaruan Data
- Baca `process/[Nomor Aksi]/result.json`.
- Sisipkan (prepend) objek JSON tersebut ke posisi pertama array di `data/archive.json`.
- Simpan pembaruan pada `data/tags.json` dan `data/cases.json` jika terdapat tag/kasus baru.
- Perbarui `data/statistics.json`:
  - Perbarui bidang `totalArchives` jika terdapat penambahan/perubahan total naskah arsip (contoh: `"800+ Naskah"`).
  - Perbarui pula nilai `value` pada elemen bertuliskan `"label": "JUMLAH ARSIP"` di dalam daftar `stats` agar selaras dengan `totalArchives`.
- Pastikan semua berkas JSON (`archive.json`, `tags.json`, `cases.json`, `statistics.json`) tetap memiliki sintaks valid.

### Langkah 6: Simpan Direktori Proses
- **JANGAN HAPUS** folder `process/[Nomor Aksi]/` beserta seluruh isinya (`selebaran.jpg`, `foto.jpg`, `result.json`). Folder ini berfungsi sebagai rekam jejak dan bukti pemrosesan data.
