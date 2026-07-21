# Kuis Berhitung Asyik — SD Negeri-1 Sidorejo, Pangkalan Bun

Aplikasi kuis interaktif untuk siswa kelas 3 SD, materi **Operasi Hitung Bilangan Cacah sampai 1000**.
Berisi 10 soal (pilihan ganda, menjodohkan, mengurutkan), maskot "Pak Surya", suara sapaan,
login siswa, panel admin/guru, pengacakan soal, waktu per soal, dan papan peringkat.

## Isi folder
- `index.html` — aplikasi utama (satu file, HTML+CSS+JS). Ini yang dijalankan/di-hosting.
- `apps-script.gs` — kode backend Google Apps Script untuk menyimpan hasil ke Google Sheet.
- `README.md` — panduan ini.

## 1. Menjalankan langsung
Cukup buka `index.html` di browser (double click). Semua fitur berjalan, kecuali penyimpanan
otomatis ke Google Sheet (butuh langkah 3 di bawah).

## 2. Menerbitkan lewat GitHub Pages
1. Buat repository baru di GitHub, misalnya `kuis-sdn1-sidorejo`.
2. Unggah `index.html` (dan file lain) ke repository tersebut.
3. Buka menu **Settings > Pages** pada repository.
4. Pada **Branch**, pilih `main` dan folder `/root`, klik **Save**.
5. Tunggu beberapa menit, alamat aplikasi akan muncul, contoh:
   `https://namakamu.github.io/kuis-sdn1-sidorejo/`
6. Bagikan alamat ini ke siswa — bisa dibuka dari HP, laptop, atau tablet manapun.

## 3. Menghubungkan ke Google Sheet (agar hasil tersimpan otomatis dari perangkat manapun)
1. Buat Google Sheet baru, beri nama misalnya **Hasil Kuis SDN-1 Sidorejo**.
2. Buka menu **Ekstensi > Apps Script**.
3. Hapus kode contoh yang ada, lalu salin-tempel seluruh isi file `apps-script.gs`.
4. Klik **Deploy > New deployment**.
   - Pilih jenis: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Klik **Deploy**, lalu izinkan akses (Authorize access) menggunakan akun Google Anda.
6. Salin URL yang muncul (bentuknya: `https://script.google.com/macros/s/xxxxxxxx/exec`).
7. Buka aplikasi kuis → klik **Masuk sebagai Guru/Admin** (kata sandi awal: `guru123`)
   → klik **Pengaturan** → tempel URL tadi ke kolom **URL Google Apps Script** → **Simpan Pengaturan**.
8. Selesai! Setiap siswa yang menyelesaikan kuis, skornya otomatis masuk ke Google Sheet,
   dan halaman **Papan Peringkat** akan menampilkan data dari Sheet tersebut — dari perangkat manapun.

> Catatan: jika suatu saat perlu redeploy Apps Script setelah mengubah kode, gunakan
> **Deploy > Manage deployments > Edit (ikon pensil) > New version**, agar URL tetap sama.

## 4. Panel Guru/Admin
- Buka aplikasi → **Masuk sebagai Guru/Admin** → kata sandi awal **guru123**.
- Di panel ini, guru dapat:
  - Menambah, mengedit, atau menghapus soal (pilihan ganda, menjodohkan, mengurutkan).
  - Mengatur pengacakan urutan soal dan pilihan jawaban.
  - Mengatur waktu per soal (detik).
  - Mengatur/mengganti URL Google Apps Script.
  - Mengganti kata sandi admin.
  - Mencadangkan (backup) atau memulihkan seluruh soal dalam format JSON.
- **Penting:** segera ganti kata sandi admin bawaan (`guru123`) melalui menu Pengaturan
  setelah aplikasi diterbitkan, agar hanya guru yang bisa mengubah soal.

## 5. Tentang suara "Pak Surya"
Aplikasi menggunakan fitur *Text-to-Speech* bawaan browser (Web Speech API) dengan nada
suara direndahkan agar terdengar seperti suara pria dewasa (bass). Kualitas dan pilihan suara
tergantung pada browser dan perangkat siswa (Chrome di Android/laptop umumnya mendukung
suara Bahasa Indonesia dengan baik).

## 6. Materi 10 Soal
1–5 & 10: Pilihan ganda (penjumlahan, pengurangan, perkalian, pembagian, soal cerita bilangan cacah s.d. 1000)
6–7: Menjodohkan hasil operasi hitung
8–9: Mengurutkan bilangan/hasil operasi hitung dari terkecil–terbesar atau sebaliknya

Guru dapat mengganti seluruh soal ini kapan saja melalui Panel Admin.
