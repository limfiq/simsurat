# SimSurat - Aplikasi Manajemen Surat Digital 📨

**SimSurat** adalah aplikasi berbasis web modern untuk pengelolaan surat menyurat (Surat Masuk & Surat Keluar) dalam organisasi. Aplikasi ini mendukung fitur multi-user, disposisi digital, validasi QR Code, dan laporan statistik.

---

## 🚀 Fitur Utama

### 1. 🔐 Multi-Level User Access
- **Admin**: Mengelola User & Role.
- **Petugas**: Menginput Surat Masuk, Membuat Surat Keluar (Draft).
- **Pimpinan**: Menyetujui Surat Keluar (Approve/Reject), Melakukan Disposisi Surat Masuk.

### 2. 📝 Manajemen Surat
- **Surat Masuk**: Pencatatan lengkap (Nomor, Tanggal, Pengirim, Perihal) + Upload File.
- **Surat Keluar**: Workflow dari Draft -> Diajukan -> Disetujui/Ditolak/Revisi.

### 3. 🔄 Disposisi Digital
- Pimpinan dapat memberikan instruksi tindak lanjut pada Surat Masuk kepada bawahan (Staff/Sekretaris).
- Riwayat disposisi tercatat sistematis.

### 4. ✅ Validasi QR Code
- Surat Keluar yang telah **Disetujui** sistem akan memiliki **QR Code**.
- QR Code dapat discan untuk memverifikasi keaslian surat melalui **Halaman Publik**.

### 5. 📊 Dashboard & Laporan
- **Landing Page Publik**: Cek validitas surat tanpa login.
- **Dashboard Admin/Staff**: Statistik interaktif (Grafik Batang & Pie Chart) untuk memantau aktivitas persuratan.

---

## 🛠️ Teknologi

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Lucide Icons, Recharts, Axios.
- **Backend**: Node.js, Express.js, Sequelize ORM.
- **Database**: MySQL.
- **Auth**: JWT (JSON Web Token).

---

## ⚙️ Instalasi & Menjalankan Aplikasi

### 1. Persiapan Database
Pastikan Anda memiliki MySQL yang berjalan. Buat database baru bernama `simsurat_db` (atau biarkan kosong, aplikasi akan mencoba membuatnya jika dikonfigurasi).

### 2. Setup Backend
```bash
cd backend

# Install dependencies
npm install

# Konfigurasi .env
# Buat file .env dan sesuaikan:
# DB_HOST=localhost
# DB_USER=root
# DB_PASS=password_anda
# DB_NAME=simsurat_db
# JWT_SECRET=rahasia_anda

# Jalankan Seeding (Untuk User Awal)
node src/seed.js

# Jalankan Server (Development)
npm run dev
```
*Backend berjalan di port 5000.*

### 3. Setup Frontend
```bash
cd frontend

# Install dependencies
npm install

# Jalankan UI (Development)
npm run dev
```
*Frontend berjalan di port 3000.*

---

## 👤 Akun Demo (Default)

Password untuk semua akun: `123456`

| Role | Email | Hak Akses |
| :--- | :--- | :--- |
| **Admin** | `admin@simsurat.com` | Full Akses User & Surat |
| **Petugas** (Staff) | `staff@simsurat.com` | Input Surat, Edit Draft |
| **Pimpinan** | `pimpinan@simsurat.com` | Approval, Disposisi |

---

## 📖 Cara Penggunaan Singkat

### Skenario 1: Surat Keluar & Approval
1.  Login sebagai **Petugas** (`staff@simsurat.com`).
2.  Buat Surat Baru -> Pilih Jenis "Keluar".
3.  Simpan sebagai Draft.
4.  Edit Surat -> Ubah Status menjadi **"Ajukan ke Pimpinan"** -> Simpan.
5.  Logout -> Login sebagai **Pimpinan** (`pimpinan@simsurat.com`).
6.  Buka Menu **"Persetujuan Surat"**.
7.  Klik ✅ (Setuju). Status berubah menjadi "Disetujui".
8.  Buka Detail Surat -> **QR Code** akan muncul.

### Skenario 2: Disposisi Surat Masuk
1.  Login sebagai **Petugas**.
2.  Input Surat Baru -> Pilih Jenis "Masuk".
3.  Logout -> Login sebagai **Pimpinan**.
4.  Buka Menu "Manajemen Surat".
5.  Pada Surat Masuk, klik ikon **Share/Disposisi**.
6.  Isi Tujuan & Instruksi -> Kirim.

---

## 📂 Struktur Folder

```
/
├── backend/            # Server Node.js
│   ├── src/models/     # Definisi Database (Sequelize)
│   ├── src/controllers/# Logika Bisnis
│   ├── src/routes/     # Endpoint API
│   └── uploads/        # Penyimpanan File Surat
│
└── frontend/           # Aplikasi Next.js
    ├── app/dashboard/  # Halaman Admin (Protected)
    ├── services/       # Konfigurasi API Client
    └── components/     # UI Components
```
# simsurat
# simsurat
