# Dokumentasi Aturan Keamanan (Security Rules) Firestore

Dokumen ini memberikan penjelasan mendalam tentang aturan keamanan (`firestore.rules`) yang diterapkan pada database Firestore untuk aplikasi **SiagaCuaca**. Aturan ini sangat penting untuk melindungi data pengguna dan memastikan integritas data.

## Filosofi Utama

Aturan keamanan kami dirancang berdasarkan prinsip-prinsip berikut:

1.  **Deny by Default**: Secara default, semua akses baca dan tulis ke database ditolak. Akses hanya diberikan secara eksplisit melalui aturan yang spesifik.
2.  **Kepemilikan Data (User Ownership)**: Pengguna hanya memiliki akses penuh (baca dan tulis) ke data mereka sendiri, seperti profil dan pengaturan notifikasi. Mereka tidak dapat melihat atau memodifikasi data pengguna lain.
3.  **Akses Publik Terbatas**: Data yang bersifat umum dan tidak sensitif, seperti prakiraan cuaca, data gempa, dan peringatan dini, dapat diakses (dibaca) oleh siapa saja (termasuk pengguna yang tidak login) untuk fungsionalitas inti aplikasi.
4.  **Akses Tulis Terkontrol**: Hak untuk membuat, mengubah, atau menghapus data publik (cuaca, gempa, dll.) dibatasi. Dalam aplikasi nyata, ini biasanya hanya diizinkan untuk layanan backend atau admin terpercaya, bukan oleh pengguna biasa. Dalam prototipe ini, akses tulis ke koleksi ini dinonaktifkan.
5.  **Validasi Data**: Aturan memastikan bahwa data yang ditulis ke Firestore memiliki skema dan tipe data yang benar, serta menjaga konsistensi data (misalnya, ID pengguna harus cocok, timestamp tidak dapat diubah).

---

## Rincian Aturan per Koleksi

### 1. Koleksi `users`

-   **Path**: `/users/{userId}`
-   **Deskripsi**: Menyimpan data profil setiap pengguna.

| Operasi | Izin | Kondisi | Penjelasan |
| :--- | :--- | :--- | :--- |
| `get` | **Diizinkan** | `isOwner(userId)` | Pengguna hanya dapat membaca data profilnya sendiri. |
| `list` | **Ditolak** | `false` | Tidak ada yang diizinkan untuk melihat daftar semua pengguna. Ini melindungi privasi. |
| `create` | **Diizinkan** | `isOwner(userId)` & Validasi Data | Pengguna hanya dapat membuat dokumen profil untuk dirinya sendiri, dan data yang dibuat harus valid. |
| `update` | **Diizinkan** | `isExistingOwner(userId)` & Validasi Data | Pengguna hanya dapat memperbarui profilnya sendiri, dan beberapa field seperti `id` dan `createdAt` tidak boleh diubah. |
| `delete` | **Diizinkan** | `isExistingOwner(userId)` | Pengguna hanya dapat menghapus profilnya sendiri. |

### 2. Koleksi `locations`, `weather_forecasts`, `earthquakes`, `weather_alerts`

-   **Path**: `/locations/{locationId}`, `/weather_forecasts/{forecastId}`, dll.
-   **Deskripsi**: Koleksi yang berisi data publik yang dapat dibaca oleh semua orang.

| Operasi | Izin | Kondisi | Penjelasan |
| :--- | :--- | :--- | :--- |
| `get`, `list` | **Diizinkan** | `true` | Siapa pun, termasuk pengguna anonim, dapat membaca data dari koleksi ini. |
| `create`, `update`, `delete` | **Ditolak** | `false` | Pengguna dari sisi klien tidak diizinkan untuk mengubah data ini. Dalam aplikasi produksi, ini akan ditangani oleh backend service. |

### 3. Koleksi `article_summaries`

-   **Path**: `/article_summaries/{articleId}`
-   **Deskripsi**: Menyimpan ringkasan artikel yang dihasilkan oleh AI untuk caching.

| Operasi | Izin | Kondisi | Penjelasan |
| :--- | :--- | :--- | :--- |
| `get`, `list` | **Diizinkan** | `true` | Siapa pun dapat membaca ringkasan yang sudah ada untuk mengurangi panggilan API ke Genkit. |
| `create` | **Diizinkan** | `request.auth != null` | Hanya pengguna yang sudah login (termasuk anonim/tamu) yang dapat memicu pembuatan ringkasan baru. Ini mencegah penyalahgunaan oleh bot. |
| `update`, `delete` | **Ditolak** | `false` | Ringkasan yang sudah dibuat bersifat abadi (immutable) untuk menjaga integritas cache. |

### 4. Sub-Koleksi `user_notifications`

-   **Path**: `/users/{userId}/user_notifications/{notificationId}`
-   **Deskripsi**: Menyimpan pengaturan notifikasi spesifik untuk setiap pengguna. Ditempatkan sebagai sub-koleksi di bawah `users`.

| Operasi | Izin | Kondisi | Penjelasan |
| :--- | :--- | :--- | :--- |
| `get`, `list` | **Diizinkan** | `isOwner(userId)` | Pengguna hanya dapat membaca pengaturan notifikasinya sendiri. |
| `create` | **Diizinkan** | `isOwner(userId)` | Pengguna hanya dapat membuat pengaturan notifikasi untuk akunnya sendiri. |
| `update` | **Diizinkan** | `isExistingOwner(userId)` | Pengguna hanya dapat memperbarui pengaturan notifikasinya sendiri. |
| `delete` | **Diizinkan** | `isExistingOwner(userId)` | Pengguna hanya dapat menghapus pengaturan notifikasinya sendiri. |

---

Dengan struktur aturan ini, aplikasi "SiagaCuaca" dapat berfungsi secara publik untuk fitur-fitur utamanya sambil tetap menjaga keamanan dan privasi data personal setiap pengguna dengan ketat.
