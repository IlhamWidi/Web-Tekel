# Makalah Sistem Pencatatan Laporan Produksi Premium PT Surya Multi Cemerlang

## 1. Ringkasan Eksekutif
- Sistem ini adalah aplikasi web monolit modern (Laravel 12 + Inertia React) untuk pencatatan, pengolahan, dan analisis laporan produksi keramik per shift.
- Fokus: kontrol kualitas premium (premium vs NG), alur approval yang akuntabel, analitik real time, ekspor standar (Excel/PDF), serta master data terpusat agar data tidak terfragmentasi.
- Dibangun untuk menggantikan proses manual (spreadsheet/WA) yang lambat, tidak seragam, dan sulit diaudit. Dengan workflow status draft -> pending -> approved/rejected, setiap laporan memiliki jejak otorisasi yang jelas.
- Paket utama: Spatie Permission (RBAC), DomPDF, Maatwebsite Excel, Recharts, TailwindCSS, Vite; DB MySQL dengan indeks filter utama.
- Sasaran bisnis: mempercepat rekap, menjaga konsistensi kualitas antar shift/line, memudahkan audit, dan menyediakan insight harian untuk keputusan produksi.

## 2. Latar Belakang (Konteks Bisnis)
- Industri keramik PT Surya Multi Cemerlang beroperasi 3 shift, dengan banyak variasi motif dan dimensi. Konsistensi kualitas dan dimensi sangat kritikal untuk menjaga reputasi produk premium.
- Proses sebelumnya bertumpu pada pencatatan manual (spreadsheet/form/WA) sehingga:
  - Data terpecah di banyak file, sulit disatukan, dan rawan hilang.
  - Perbandingan antar shift/line tidak cepat tersedia.
  - Rekap harian/mingguan memakan waktu dan rawan salah hitung.
  - Jejak approval tidak jelas, menyulitkan audit dan evaluasi kinerja.
- Kebutuhan manajemen:
  - Visibilitas harian atas premium rate, defect rate, dan pencapaian target.
  - Format pelaporan standar untuk rapat produksi dan audit.
  - Kendali akses sesuai peran agar data sensitif terlindungi.
- Infrastruktur internal telah memakai MySQL/PHP; Laravel dipilih karena ekosistem matang, mendukung RBAC, PDF/Excel, dan integrasi SPA via Inertia React.

## 3. Latar Belakang (Konteks Teknis)
- Monolit Laravel + Inertia React memberikan UX SPA tanpa kompleksitas mikroservis; deployment tetap sederhana (satu codebase, satu basis data).
- Pemisahan peran (admin, supervisor, operator, viewer) diakomodasi dengan Spatie Permission dan Gate Laravel.
- Query perlu dioptimalkan karena laporan dan detail bisa tumbuh cepat; diperlukan indeks filter (production_date, shift_id, line_id, status) dan eager loading relasi.
- Ekspor PDF/Excel adalah kebutuhan inti; DomPDF dan Maatwebsite Excel dipilih karena integrasi Laravel yang matang.
- Vite 7 digunakan untuk build cepat dan code splitting; Recharts untuk visualisasi ringan.

## 4. Rumusan Masalah (Business Pain Points)
1) Pencatatan produksi per shift tidak seragam dan rawan salah input karena bergantung pada spreadsheet/WA.  
2) Approval tidak terdokumentasi formal (siapa, kapan, status), menyulitkan audit dan akuntabilitas.  
3) Rekap premium vs defect lintas shift/line/motif memakan waktu karena kalkulasi manual.  
4) Format laporan ke manajemen/auditor tidak standar (tidak ada PDF/Excel baku).  
5) Master data (line, motif, dimensi, shift) tidak tunggal sehingga operator bisa memilih/mengetik data yang berbeda-beda.  
6) Akses tidak terkontrol baik; semua orang bisa melihat/ubah data tanpa batasan peran.  
7) Pertumbuhan data berpotensi menimbulkan N+1 query dan waktu muat lambat bila tidak dioptimasi.  

## 5. Penyelesaian Masalah / Solusi Teknis
- Konsistensi input: form Inertia React dengan dropdown master data; validasi server-side FK dan angka non-negatif; kalkulasi pencapaian per baris di frontend untuk feedback cepat.
- Approval formal: status lifecycle draft -> pending -> approved/rejected; hanya pending yang bisa di-approve, hanya draft yang bisa dihapus; approved_by, approved_at, dan rejection_reason disimpan.
- Rekap otomatis: RecapController melakukan agregasi harian/shift/line/motif; Recharts menampilkan Line/Bar/Pie; filter tanggal/shift/line; siap ekspor Excel/PDF.
- Format standar: DomPDF untuk laporan tunggal/batch (landscape untuk batch), Maatwebsite Excel untuk rekap dengan header styled, zebra striping, info filter.
- Master data terpusat: CRUD lines/motifs/dimensions/shifts dengan flag aktif dan validasi unik; operator memilih dari daftar, bukan mengetik bebas.
- Akses berbasis peran: Spatie Permission + Gate; admin punya akses penuh; supervisor untuk approval dan master data; operator untuk input; viewer untuk baca.
- Optimasi performa: eager loading relasi di dashboard/index/recap; query agregasi tren 7 hari tunggal; pagination; indeks DB; Vite untuk bundling cepat.
- Audit trail: ActivityLog pada create/update/delete/approve; status approval tercatat; sesi disimpan di DB.

## 6. Tujuan, Sasaran, dan KPI
- Konsistensi kualitas: premium vs defect termonitor per hari/shift/line/motif.
- Kecepatan keputusan: dashboard real time, rekap instan, ekspor cepat.
- Akuntabilitas: approval tercatat (siapa/kapan/status/alasan).
- Kerapian data: master data tunggal, validasi ketat, status lifecycle jelas.
- Portabilitas: laporan siap audit dalam format Excel/PDF.
- KPI contoh:
  - Rekap harian selesai < 5 menit (sebelum otomatisasi > 30 menit).
  - 100% laporan berstatus final sebelum akhir shift berikutnya.
  - Premium vs NG 7 hari selalu tersedia tanpa query manual tambahan.

## 7. Stakeholder & Persona
- Admin IT: kelola user/role/master data, jaga ketersediaan sistem.
- Supervisor Produksi: approve/reject pending, akses rekap dan ekspor.
- Operator: input laporan per shift/line, ajukan laporan pending.
- QA/Quality Engineer: analisis defect per motif/dimensi/shift; RCA.
- Manajemen: pantau dashboard/rekap/tren untuk keputusan kapasitas dan kualitas.
- Auditor/Viewer: akses baca laporan dan rekap.

## 8. Ruang Lingkup
- In scope: pencatatan laporan produksi premium per shift; approval; analitik dashboard/rekap; master data line/motif/dimensi/shift; manajemen user/role; ekspor Excel/PDF; landing page profil perusahaan.
- Out of scope awal: integrasi ERP/warehouse, manajemen stok fisik, notifikasi eksternal, lampiran foto defect (disiapkan dalam roadmap).

## 9. Proses Bisnis & Alur Data
1) Input laporan: operator isi tanggal, shift, line, catatan, baris detail (motif, dimensi, target, aktual, NG, catatan). Status draft/pending.  
2) Validasi server: cek FK, angka >= 0, status valid, tanggal valid.  
3) Approval: supervisor/admin approve/reject pending; jejak approved_by, approved_at, rejection_reason tersimpan.  
4) Konsolidasi: hanya approved masuk rekap harian/shift/line/motif.  
5) Analitik & ekspor: filter tanggal/shift/line; visualisasi Line/Bar/Pie; tabel ringkasan; ekspor Excel; batch PDF; print.  
6) Master data: admin/supervisor update line/motif/dimensi/shift agar pilihan operator selalu benar.  

## 10. Arsitektur Aplikasi
- Pola: monolith Laravel + Inertia (SPA-like) dengan React sebagai view layer.
- Backend: Laravel 12, PHP 8.2, MySQL; paket Spatie Permission, DomPDF, Maatwebsite Excel, Inertia Laravel, Ziggy.
- Frontend: React 19, Inertia React 2, TailwindCSS 4, Recharts, Lucide Icons, Vite 7; komponen Input/Button kustom.
- Build & dev: `npm run dev` (HMR), `npm run build` (produksi); Composer script `setup` dan `dev` (serve, queue, logs, Vite via concurrently).
- Deployment: cache config/route/view, build aset Vite, permission storage/bootstrap; konfigurasi `.env` (APP_URL, DB_*, SESSION_DRIVER=database).

## 11. Modul & Fitur (Detail)
### 11.1 Autentikasi
- Login Inertia React (`resources/js/Pages/Auth/Login.jsx`), form validasi email/password, CSRF token, sesi DB (`SESSION_DRIVER=database`).
- Password hashed, remember token, CSRF proteksi default Laravel.

### 11.2 Dashboard (`resources/js/Pages/Admin/Dashboard.jsx`)
- Kartu statistik: total premium hari ini, jumlah laporan hari ini, premium per shift.
- Tren premium 7 hari (LineChart Recharts) dengan agregasi SQL tunggal.
- Premium per shift hari ini (BarChart).
- Tabel 10 laporan terbaru (status badge, link detail).

### 11.3 Laporan Produksi
- Form multi-baris detail (motif, dimensi, target, aktual, NG, catatan) dengan kalkulasi pencapaian per baris di frontend.
- Penomoran otomatis `RPT-YYYYMMDD-#####` (di `ProductionReportController::store`).
- Status: draft -> pending -> approved/rejected; only draft deletable, only pending approvable.
- Detail tampilan (`Show.jsx`): ringkasan total, badge status, riwayat approval, ekspor PDF, action approve/reject (supervisor/admin).

### 11.4 Rekap & Analitik (`resources/js/Pages/Admin/Recap/Index.jsx`, `RecapController`)
- Tab: harian, per shift, per line, per motif.
- Grafik Line/Bar/Pie; tabel: premium, defects, total produksi, jumlah laporan, rata-rata % premium/defect.
- Filter tanggal/shift/line; ekspor Excel (`/admin/recap/export-excel`), batch PDF (`/admin/reports/batch/export-pdf`), print.

### 11.5 Master Data
- CRUD Lines/Motifs/Dimensions/Shifts dengan validasi unik dan flag aktif.
- Pencarian pada index (mis. Lines).

### 11.6 User Management
- CRUD user, reset password opsional, assign satu peran, toggle aktif.
- Filter pencarian nama/email/role.

### 11.7 Ekspor
- PDF DomPDF untuk laporan tunggal dan batch (landscape); nama file berformat tanggal.
- Excel Maatwebsite: heading styled, zebra striping, info filter, autosize kolom (`app/Exports/RecapExport.php`).

### 11.8 Logging & Audit
- `ActivityLog::log` pada create/update/delete/approve laporan.
- Approval menyimpan approved_by, approved_at, rejection_reason.
- Sesi di DB untuk audit login.

## 12. Data Model & Storage
- production_reports: report_number, production_date, shift_id, line_id, notes, status, created_by, updated_by, approved_by, rejection_reason, approved_at; indeks: production_date, shift_id, line_id, status, report_number.
- production_report_details: production_report_id, motif_id, dimension_id, target_quantity, actual_quantity, ng_quantity, notes; indeks FK.
- lines/motifs/dimensions/shifts: master dengan is_active; dimension menyimpan width/height/thickness; motif menyimpan code.
- users: name, email unik, password hashed, is_active; role/permission via Spatie.
- activity_logs: user_id, action, model_type, model_id, description, properties (JSON).
- Relasi inti: report belongsTo shift/line/creator/approver, hasMany details; detail belongsTo motif/dimension; user hasMany created/updated/approved reports.
- Seeder: RoleSeeder, UserSeeder (akun demo), MasterDataSeeder (line/motif/dimensi/shift), ProductionReportSeeder (7 hari + draft hari ini).

## 13. Keamanan & Akses
- Autentikasi: session Laravel, CSRF token, password hashing, remember token.
- Otorisasi: Spatie Role/Permission + Gate (`AuthServiceProvider`):
  - Admin akses penuh (Gate::before).
  - Approval/delete laporan: admin/supervisor.
  - Master data: admin/supervisor; user management: admin.
  - Semua user login boleh melihat/membuat laporan sesuai izin.
- Validasi server-side untuk semua form; fillable membatasi mass assignment.
- Export protection: rute ekspor cek izin view production reports.
- Audit: ActivityLog + jejak approved_by/approved_at/rejection_reason.
- Hardening usulan: rate limiting login, session encryption, secure cookie flags, konsistensi nama permission Gate vs seeder, password policy lebih ketat.

## 14. Kinerja & Skalabilitas
- Eager loading relasi di dashboard, index laporan, recap untuk hindari N+1.
- Agregasi tren 7 hari: JOIN + groupBy tunggal di `DashboardController`.
- Pagination daftar laporan/master data; indeks pada kolom filter utama.
- Vite untuk bundling/code splitting; Recharts relatif ringan.
- Skala lanjut (usulan): cache summary (Redis), queue untuk ekspor besar, batching query rekap periode panjang, monitoring query slow, health check endpoint.

## 15. UX & Antarmuka
- AdminLayout sidebar: Dashboard, Laporan Produksi (Input/Riwayat), Rekap Premium, Master Data, User & Role; tombol logout.
- Form laporan: multi-baris dengan badge pencapaian per baris; aksi simpan draft atau ajukan approval.
- Rekap: tab harian/shift/line/motif; grafik + tabel; ekspor Excel/PDF dan print.
- Dashboard: kartu statistik, tren 7 hari, distribusi shift, tabel laporan terbaru dengan badge status.
- Landing page publik: profil perusahaan, keunggulan, katalog produk, berita/CSR, kontak dengan peta.

## 16. Operasional & Deployment
- Prasyarat: PHP >= 8.2, Composer, Node.js >= 18, MySQL >= 8, Git.
- Perintah utama:
  - `composer install && npm install`
  - `php artisan key:generate`
  - `php artisan migrate --seed`
  - `npm run dev` (dev) / `npm run build` (produksi)
  - `php artisan serve`
- Konfigurasi `.env`: DB_*, SESSION_DRIVER=database, APP_KEY, APP_URL; queue driver database siap untuk job asinkron.
- Backup & recovery (usulan): dump DB harian, rotasi log, pembersihan sessions/activity_logs berkala.
- Keamanan deploy: permission storage & bootstrap/cache, HTTPS + secure cookie di produksi, config cache/route cache/view cache untuk performa.

## 17. Testing & QA
- Tooling: PHPUnit tersedia; bisa tambah Jest/RTL (React) dan Cypress/Playwright (E2E).
- Rekomendasi cakupan:
  - Feature test alur create -> pending -> approve/reject.
  - Filter recap dan hasil ekspor PDF/Excel (status 200, konten minimal).
  - Izin role (admin vs operator vs viewer).
  - Validasi form (FK eksis, angka non-negatif, status enum).
  - Performance sampling untuk dashboard dan rekap panjang.
- Uji beban: sampling batch ekspor besar, rekap periode panjang, monitor waktu query.

## 18. Manfaat Bisnis
- Transparansi kualitas per shift/line/motif mempercepat root cause analysis defect.
- Waktu rekap turun signifikan lewat filter otomatis dan ekspor satu klik.
- Akuntabilitas approval mengurangi salah input/data ganda dan memudahkan audit.
- Master data tunggal menjaga konsistensi penamaan line/motif/dimensi antar shift.
- Visualisasi cepat mendukung keputusan produksi, perencanaan stok, dan kapasitas.

## 19. Risiko & Tantangan
- Disiplin input operator: perlu SOP, validasi front/back end, dan pelatihan.
- Ketidaksinkronan izin Gate vs seeder jika diubah tanpa governance.
- Beban ekspor besar: perlu paging/queue untuk periode panjang.
- Tabel sessions/activity_logs bisa membesar: butuh pembersihan rutin.
- Ketergantungan DB tunggal: siapkan backup/HA bila ke produksi; observasi performa indeks seiring pertumbuhan.

## 20. Roadmap Pengembangan (Usulan)
- Lampiran foto/bukti defect per detail laporan.
- Notifikasi email/WA untuk status pending/approved/rejected.
- Halaman Activity Log dengan filter user/aksi/tanggal, termasuk IP/device (jika diperlukan).
- SLA alert: peringatan jika premium rate di bawah ambang batas tertentu.
- Integrasi ERP/warehouse untuk sinkron stok aktual dan nomor batch.
- Hardening keamanan: rate limiting, session encryption, secure cookie, audit IP/device, password policy.
- Test otomatis E2E + regression suite untuk ekspor.
- Mode offline capture (jika diperlukan di lapangan) dengan sinkronisasi saat online.

## 21. Rekomendasi Kebijakan Operasional
- Wajibkan setiap laporan mencapai status final sebelum pergantian shift berikutnya.
- Tetapkan threshold premium rate/defect rate per shift; aktifkan SLA alert jika melampaui batas.
- Jadwalkan pembersihan sessions dan activity_logs (mis. retention 90 hari untuk sesi, 1-2 tahun untuk log audit).
- Terapkan review berkala atas master data (line/motif/dimensi/shift) agar tetap akurat.
- Standardisasi format ekspor (header, periode, filter) untuk audit dan rapat rutin.
- Governance izin: setiap perubahan role/permission harus disetujui admin IT dan didokumentasikan.

## 22. Detil Per Masalah vs Solusi
- Masalah: Data tercecer dan tidak seragam.  
  Solusi: Master data terpusat + dropdown + validasi FK; status lifecycle; ActivityLog.  
- Masalah: Approval tidak terekam.  
  Solusi: Status pending->approved/rejected dengan jejak approved_by, approved_at, rejection_reason; role admin/supervisor.  
- Masalah: Rekap lambat dan manual.  
  Solusi: RecapController agregasi; filter; grafik; ekspor Excel/PDF; print.  
- Masalah: Format laporan tidak standar.  
  Solusi: DomPDF (laporan tunggal/batch), Excel (recap) dengan styling baku.  
- Masalah: Risiko salah input.  
  Solusi: Validasi server (FK, angka >= 0, enum status); kalkulasi pencapaian per baris; dropdown master.  
- Masalah: Performa saat data tumbuh.  
  Solusi: Eager loading, indeks, pagination, agregasi terukur; opsi cache/queue di roadmap.  
- Masalah: Akses tidak terkontrol.  
  Solusi: Spatie Permission + Gate; middleware role; export protection; admin before gate.  

## 23. Integrasi & Ekstensi (Detail)
- SSO/LDAP (opsional): sambungkan login ke identitas korporat.
- ERP/WMS: sinkron stok aktual dan nomor batch; push hasil premium/NG ke modul gudang.
- Notifikasi: webhook/email/WA untuk laporan pending atau hasil approval.
- Observability: integrasi dengan monitoring (contoh: Sentry/Loki/ELK) untuk error dan log terstruktur.
- Backup: jadwal dump DB, enkripsi cadangan, uji pemulihan berkala.

## 24. Implementasi & Langkah Teknis
- Setup: `composer install`, `npm install`, `php artisan key:generate`, `php artisan migrate --seed`, `npm run dev`/`npm run build`, `php artisan serve`.
- Konfigurasi: `.env` untuk DB, APP_KEY, APP_URL, SESSION_DRIVER=database.
- Seed: RoleSeeder, UserSeeder (admin/supervisor/operator/viewer), MasterDataSeeder (line/motif/dimensi/shift), ProductionReportSeeder (data 7 hari).
- Ekspor: DomPDF siap; Excel siap; pastikan ekstensi php-zip di server.
- Deployment: cache config/route/view; set permission storage/bootstrap/cache; aktifkan HTTPS; gunakan queue untuk ekspor berat bila diperlukan.

## 25. Contoh Alur End-to-End
1) Operator login, membuat laporan shift: pilih tanggal, shift, line, tambah beberapa baris motif/dimensi dengan target/aktual/NG, simpan sebagai pending.  
2) Supervisor login, membuka daftar pending, mengecek detail, lalu approve atau reject dengan alasan.  
3) Laporan approved muncul di rekap; dashboard menampilkan kontribusi premium per shift; tren 7 hari terbarui.  
4) Manajemen mengekspor recap periode mingguan ke Excel untuk rapat; auditor mengekspor batch PDF untuk arsip.  

## 26. Dampak Terhadap Proses Bisnis
- Lead time rekap menurun drastis; analisis defect lebih cepat.
- Pengendalian kualitas lebih disiplin karena status approval wajib.
- Master data tunggal menurunkan variasi penamaan dan salah pilih.
- Laporan siap audit (PDF/Excel) meningkatkan kepatuhan dan kepercayaan pelanggan.
- Keputusan produksi lebih data-driven berkat dashboard dan tren 7 hari.

## 27. Strategi Go-Live & Adopsi
- Pilot di satu line atau satu shift untuk validasi proses.
- Pelatihan operator dan supervisor: cara input, cara approve, dan SOP status.
- Buat panduan cepat (cheat sheet) untuk ekspor dan filter rekap.
- Monitoring minggu pertama: pantau error log, waktu query, dan feedback pengguna.
- Rilis bertahap untuk notifikasi/ERP setelah stabil.

## 28. Catatan Teknis Penting
- Gate::before membuat admin melewati pengecekan izin; ubah jika butuh granular.
- Pastikan konsistensi penamaan permission antara Spatie dan Gate; jika diubah, selaraskan seeder dan policy.
- Sesi di DB: jalankan pembersihan rutin; gunakan index pada last_activity.
- DomPDF: hindari gambar berat; gunakan layout ringan untuk batch.
- Excel: gunakan autosize dan hindari formula berat untuk dataset besar.

## 29. Peluang Optimalisasi Lanjutan
- Cache summary dashboard dan rekap untuk rentang sering dipakai.
- Mode precomputed materialized view (atau table summary) untuk periode panjang.
- Penggunaan queue untuk ekspor besar agar non-blocking.
- Tambahkan kolom indeks tambahan jika pola query berubah (mis. filter motif/dimensi sering).
- Integrasi file storage (lampiran foto defect) dengan object storage (S3/minio) jika diaktifkan.

## 30. Penutup
Sistem ini menyediakan fondasi kuat untuk pengawasan kualitas produksi keramik: workflow approval jelas, analitik real time, dan ekspor siap audit. Dengan mengeksekusi roadmap (notifikasi, integrasi ERP, hardening keamanan, test otomatis, dan perawatan data), platform dapat berkembang menjadi pusat kendali kualitas dan produksi yang skalabel, andal, dan audit-friendly bagi PT Surya Multi Cemerlang.
