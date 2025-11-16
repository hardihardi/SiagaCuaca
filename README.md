# SiagaCuaca: Aplikasi Cuaca & Kebencanaan Indonesia

**SiagaCuaca** adalah aplikasi web modern dan real-time yang menyediakan informasi lengkap seputar prakiraan cuaca, data gempa bumi terkini, peringatan dini, dan berita kebencanaan di seluruh wilayah Indonesia. Dibangun dengan teknologi terkini, aplikasi ini dirancang untuk menjadi sumber informasi yang cepat, andal, dan mudah diakses.

## ✨ Fitur Utama

- **Dashboard Dinamis**: Tampilan utama yang merangkum informasi cuaca terkini, gempa bumi terbaru, dan peringatan dini di satu tempat.
- **Prakiraan Cuaca Rinci**:
    - Data cuaca per jam dan prakiraan untuk 7 hari ke depan.
    - Grafik interaktif untuk tren suhu dan curah hujan.
    - Pemilihan lokasi berdasarkan Provinsi dan Kabupaten/Kota di seluruh Indonesia.
- **Informasi Gempa Bumi**: Menampilkan daftar gempa bumi terbaru yang terjadi di wilayah Indonesia, lengkap dengan magnitudo, kedalaman, dan peta lokasi.
- **Peringatan Dini Cuaca**: Agregasi peringatan dini resmi dari BMKG untuk berbagai wilayah.
- **Berita & Artikel**: Kumpulan berita dan artikel terbaru dari berbagai sumber terkait cuaca, iklim, dan kebencanaan.
- **Ringkasan Berita AI**: Fitur ringkasan artikel berita otomatis menggunakan **Google AI (Genkit)** untuk memberikan intisari yang cepat dan mudah dipahami.
- **Edukasi & Kesiapsiagaan**: Halaman khusus berisi panduan kesiapsiagaan menghadapi bencana (gempa bumi) dan daftar kontak darurat penting.
- **Personalisasi Pengguna**:
    - Sistem otentikasi lengkap: Email/Password, Google, dan mode Tamu (Anonymous).
    - Halaman pengaturan untuk mengelola profil (nama tampilan) dan mengubah password.
    - Pengaturan preferensi notifikasi (fitur mendatang).
- **Desain Modern & Responsif**: Antarmuka yang bersih, modern, dan dapat diakses dengan baik di perangkat desktop maupun mobile, dengan dukungan mode terang (light) dan gelap (dark).

## 🚀 Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/) (App Router & Server Components)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
- **Grafik & Chart**: [Recharts](https://recharts.org/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Generative AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Hosting**: [Firebase App Hosting](https://firebase.google.com/docs/hosting)

## 🛠️ Menjalankan Proyek Secara Lokal

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

### 1. Prasyarat

- [Node.js](https://nodejs.org/) (v18 atau lebih baru)
- `npm` atau `yarn`

### 2. Instalasi Dependensi

Kloning repositori ini dan instal semua dependensi yang dibutuhkan.

```bash
git clone <URL_REPOSITORI_ANDA>
cd siaga-cuaca
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env.local` di direktori root proyek dan tambahkan kunci API untuk layanan berita.

```
# Dapatkan kunci API dari https://newsdata.io/
NEWSDATA_API_KEY=xxxxxxxxxxxxxx
```

### 4. Menjalankan Server Development

Jalankan perintah berikut untuk memulai server development Next.js.

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`.

## 📁 Struktur Proyek

- `src/app/`: Direktori utama untuk halaman dan layout (menggunakan Next.js App Router).
- `src/components/`: Komponen React yang dapat digunakan kembali.
- `src/lib/`: Berisi fungsi utilitas, definisi tipe data, dan logika pengambilan data.
- `src/ai/`: Konfigurasi dan alur kerja (flows) untuk fitur Generative AI menggunakan Genkit.
- `src/firebase/`: Konfigurasi dan hooks untuk integrasi Firebase (Authentication & Firestore).
- `docs/`: Dokumentasi backend, termasuk skema entitas data.
- `public/`: Aset statis.

## ☁️ Deployment

Proyek ini sudah dikonfigurasi untuk deployment yang mudah menggunakan **Firebase App Hosting**. File `apphosting.yaml` di root proyek mendefinisikan konfigurasi yang diperlukan.
