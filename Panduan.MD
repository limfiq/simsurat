# Panduan Penggunaan Aplikasi SimSurat

Selamat datang di panduan penggunaan **SimSurat** (Sistem Informasi Manajemen Surat). Panduan ini disusun untuk membantu Anda memahami fitur-fitur dan alur kerja dalam aplikasi sesuai dengan peran (role) masing-masing.

---

## 📑 Daftar Isi
1. [Pendahuluan](#1-pendahuluan)
2. [Cara Login](#2-cara-login)
3. [Panduan Akses Publik (Tanpa Login)](#3-panduan-akses-publik-tanpa-login)
4. [Panduan Untuk Petugas (Staff)](#4-panduan-untuk-petugas-staff)
5. [Panduan Untuk Pimpinan](#5-panduan-untuk-pimpinan)
6. [Panduan Untuk Admin](#6-panduan-untuk-admin)

---

## 1. Pendahuluan
SimSurat adalah aplikasi berbasis web untuk mengelola persuratan (surat masuk & surat keluar) secara digital. Aplikasi ini dilengkapi dengan sistem *approval* (persetujuan) berjenjang, disposisi digital, serta pengamanan keaslian surat melalui validasi **QR Code**.

Terdapat 3 peran (role) utama dalam sistem ini:
*   **Petugas (Staff):** Bertugas mencatat surat masuk dan membuat draf surat keluar.
*   **Pimpinan:** Bertugas meninjau, menyetujui, atau menolak surat keluar, serta memberikan instruksi/disposisi untuk surat masuk.
*   **Admin:** Bertugas mengelola akun pengguna dan mengontrol sistem secara keseluruhan.

---

## 2. Cara Login
1. Buka halaman utama website SimSurat (misalnya `https://sid3mi.limfiq.my.id`).
2. Klik tombol **Login Pegawai** pada halaman utama.
3. Masukkan **Email** dan **Password** yang telah didaftarkan oleh Admin.
4. Klik tombol **Masuk/Login**.
5. Setelah berhasil, Anda akan diarahkan ke halaman **Dashboard** yang sesuai dengan hak akses (role) Anda.

---

## 3. Panduan Akses Publik (Tanpa Login)
Halaman depan SimSurat dapat diakses oleh siapa saja (publik) untuk melakukan validasi keaslian dokumen surat keluar.

**Cara Memvalidasi Surat:**
1. Siapkan dokumen surat fisik atau digital yang memiliki **QR Code**.
2. Lakukan *scan* (pindai) pada QR Code tersebut menggunakan kamera *smartphone* atau aplikasi pemindai.
3. Anda akan otomatis diarahkan ke halaman validasi SimSurat.
4. Halaman akan menampilkan detail surat (Nomor, Perihal, Tanggal, dan Status Persetujuan) jika surat tersebut terdaftar dan valid di dalam sistem.

---

## 4. Panduan Untuk Petugas (Staff)
Sebagai Staff, peran utama Anda adalah proses pendataan surat dan pembuatan draf.

### A. Menginput Surat Masuk
1. Pada menu navigasi (sidebar), pilih **Manajemen Surat** lalu klik **Tambah Surat**.
2. Pilih jenis surat: **Masuk**.
3. Isi informasi surat seperti: Nomor Surat, Tanggal Surat, Pengirim, dan Perihal.
4. Unggah (Upload) file *scan*/dokumen asli dari surat tersebut.
5. Klik tombol **Simpan**. Surat akan masuk ke dalam daftar Surat Masuk dan bisa didisposisikan oleh Pimpinan.

### B. Membuat & Mengajukan Surat Keluar
1. Pada menu **Manajemen Surat**, klik **Tambah Surat**.
2. Pilih jenis surat: **Keluar**.
3. Isi informasi surat (Nomor Surat, Tujuan, Perihal, dsb).
4. Klik **Simpan**. Pada tahap ini, surat akan berstatus **Draft**.
5. Untuk mengajukan ke Pimpinan, cari surat tersebut di tabel daftar surat, lalu klik **Edit**.
6. Ubah status surat dari **Draft** menjadi **Ajukan ke Pimpinan**.
7. Klik **Simpan**. Pimpinan sekarang dapat melihat surat tersebut untuk disetujui.

---

## 5. Panduan Untuk Pimpinan
Sebagai Pimpinan, Anda memiliki wewenang untuk mengambil keputusan atas surat yang didata oleh Petugas.

### A. Persetujuan (Approval) Surat Keluar
1. Pada menu navigasi, pilih **Persetujuan Surat** (Approval).
2. Anda akan melihat daftar surat keluar yang diajukan oleh Staff.
3. Klik tombol detail pada surat untuk memeriksa isi dan lampirannya.
4. Anda dapat memilih salah satu aksi berikut:
   *   **Setujui (Approve):** Surat akan disahkan dan sistem akan **otomatis membuatkan QR Code** pada surat tersebut.
   *   **Tolak (Reject) / Revisi:** Surat dikembalikan dan tidak diterbitkan.

### B. Mendisposisi Surat Masuk
1. Buka menu **Manajemen Surat**.
2. Pada tabel, cari surat masuk yang memerlukan tindak lanjut.
3. Klik tombol/ikon **Share/Disposisi** pada surat tersebut.
4. Pilih **Tujuan Disposisi** (misalnya kepada staff tertentu).
5. Ketikkan **Instruksi** atau catatan tindakan yang harus dilakukan.
6. Klik **Kirim/Simpan**. Disposisi tersebut akan tercatat dalam riwayat surat.

---

## 6. Panduan Untuk Admin
Admin memiliki kontrol penuh atas master data aplikasi.

### A. Melihat Dashboard & Laporan
1. Di halaman utama **Dashboard**, Admin (beserta role lain) dapat melihat grafik statistik interaktif (seperti Bar Chart dan Pie Chart).
2. Buka menu **Laporan** untuk melihat rekapitulasi data surat yang masuk dan keluar dalam periode tertentu. Laporan ini berguna untuk arsip dan rapat evaluasi.

### B. Mengelola Pengguna (User Management)
1. Buka menu **Manajemen User**.
2. Anda akan melihat daftar seluruh pengguna aplikasi.
3. **Tambah User Baru:** Klik Tambah User, masukkan Email, Password, Nama, dan tentukan Role (Admin, Petugas, atau Pimpinan).
4. **Edit/Hapus User:** Klik tombol aksi pada tabel untuk mengubah detail pengguna, mereset password, atau menghapus akses mereka dari sistem.

---
*Panduan ini dapat berubah sewaktu-waktu sesuai dengan pembaruan fitur pada aplikasi SimSurat.*
