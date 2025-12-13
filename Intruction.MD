You are an expert full-stack engineer and UI/UX designer. Your task is to design and implement a complete web application called **“PT Surya Multi Cemerlang”** using **Laravel + Inertia.js + React** (preferred) or Laravel + React with a SPA-like experience. The app has 2 main parts:

1. **Public Landing Page (User View)** – company profile for a ceramic manufacturing company.
2. **Admin Dashboard (Internal View)** – web-based application for **pencatatan laporan produksi premium per shift** di pabrik keramik.

IMPORTANT GLOBAL RULES
- Use **Laravel** (latest LTS), **Inertia.js**, **React**, **Vite**, **Tailwind CSS**.
- Use **PostgreSQL or MySQL** (choose one) and define proper migrations, seeders, and Eloquent models.
- Use **RESTful routes** and **Laravel Resource Controllers** where appropriate.
- UI language: **Bahasa Indonesia** for all visible labels, menus, and messages.  
  Code (models, controllers, components, variables) in **English**.
- Implement **authentication & authorization** with roles.
- Implement **form validation**, error handling, and loading states on the frontend.
- Layout must be **responsive**, **modern**, and **professional** (ceramic industry feel).

====================================================
A. LANDING PAGE (PUBLIC USER VIEW)
====================================================

Create a main landing page at `/` with the following sections in this order, all in Indonesian:

1. **Hero Section**
   - Big headline explaining what PT Surya Multi Cemerlang does (manufacturing ceramic tiles).
   - Short subheadline emphasizing **kualitas, konsistensi produksi per shift, dan kontrol kualitas premium**.
   - One main CTA button, e.g. **“Lihat Katalog Produk”** and a secondary CTA **“Hubungi Tim Sales”**.
   - Background can use factory/ceramic imagery (placeholder images).

2. **Trust Indicators**
   - Small horizontal band below hero.
   - Items such as: “Kontrol Kualitas Per Shift”, “Produksi Konsisten”, “Dukungan Proyek”, “Distribusi Nasional” (use placeholder content).
   - Optionally icons for each bullet.

3. **Tentang Perusahaan (About)**
   - 2–3 short paragraphs describing PT Surya Multi Cemerlang as a ceramic manufacturing company that uses structured process control and shift-based premium reporting to ensure consistency.
   - Emphasise: fokus pada kualitas pembakaran kiln, konsistensi dimensi, dan kesiapan melayani proyek besar.

4. **Keunggulan Utama (Value Proposition)**
   - 3–5 cards or columns, each with icon, title, and short description. Examples:
     - “Quality-Controlled Manufacturing”
     - “Consistent Dimensional Accuracy”
     - “Variasi Motif & Ukuran”
     - “Dukungan Proyek & Konsultasi Material”
   - All text in Indonesian, but titles may use some English phrases if needed.

5. **Produk & Katalog**
   - Show some sample product cards (floor tiles, wall tiles, 60x60, etc.) with image, name, and short specs.
   - Add a button **“Unduh Katalog Produk (PDF)”** (link placeholder).
   - Optional: simple filter (by ukuran / finishing / warna) called **“Product Finder”** on top of product grid.

6. **Quality & Compliance**
   - Section that explains briefly: proses kontrol kualitas, pencatatan laporan produksi premium per shift, pengukuran dimensi multi titik, dan fokus pada konsistensi.
   - Use 2–3 bullet points and a short paragraph.

7. **Portofolio / Use Case**
   - Show either project cards or segment cards (Residensial, Komersial, Hospitality, Fasilitas Publik).
   - Each card: title + short description + image placeholder.

8. **Sustainability & CSR**
   - Small section describing upaya efisiensi energi kiln, pengelolaan limbah, dan kontribusi sosial (dummy content).

9. **News / Updates**
   - Simple list or cards (3–6 items) for “Berita & Kegiatan”, such as pameran, launching produk baru, kegiatan sosial. Use dummy data.

10. **Careers**
    - Short description about culture, safety, dan peluang karir.
    - Button **“Lihat Lowongan”** (link placeholder or simple page).

11. **Contact & CTA Final**
    - Show company address (placeholder), email, phone number, and Google Maps embed placeholder.
    - Simple contact form: name, email, company, phone, message, dropdown “Tujuan” (Penawaran Proyek, Informasi Produk, Karir, Lain-lain).
    - Add CTA text like **“Minta Penawaran Proyek”**.

12. **Footer**
    - Basic footer with company name, copyright, and useful links (Produk, Berita, Karir, Kontak).

Ensure the landing page uses a clean, modern layout: full-width sections, consistent spacing, responsive grid. Use a neutral professional color palette (e.g., shades of grey, white, and an accent color like deep blue or green).

====================================================
B. ADMIN DASHBOARD (INTERNAL VIEW)
====================================================

The core of this project is **“Perancangan Aplikasi Pencatatan Laporan Produksi Premium Per Shift Berbasis Web”**. The admin area is only accessible after login at `/login`. Use a separate layout from landing page with a sidebar and top bar.

ROLES:
- **Admin** – manage everything (users, master data, reports, approvals).
- **Supervisor** – approve reports, view recaps.
- **Operator/QC** – create and edit own reports until submitted.
- **Viewer** – read-only access to recaps.

Use a role/permission system (e.g. Spatie Laravel Permission) or custom gates/policies.

--------------------------------
B1. Global Dashboard (Menu: “Dashboard”)
--------------------------------
Create a main admin dashboard at `/admin` containing:

- Card “Total Premium Hari Ini” (sum of premium quantity from approved reports for current date).
- Card “Premium per Shift (Hari Ini)” (Shift I, II, III).
- Card “Laporan Masuk Hari Ini” (count of reports created/submitted today).
- Simple chart (line or bar) showing premium trend for last 7 days or last X shifts.
- Table of “Laporan Terbaru” with columns: Tanggal, Shift, Line/Pro, Motif, Dimensi, Status (Draft/Submitted/Approved).

--------------------------------
B2. Laporan Produksi (Core Feature)
--------------------------------

Create a menu group **“Laporan Produksi”** with two sub-menus:

1) **Input Laporan**  
   Route example: `/admin/reports/create`  

   Form fields (in Indonesian labels, English in code):

   HEADER:
   - `date` (Tanggal Produksi, datepicker).
   - `shift_id` (Shift – dropdown from master data: I, II, III).
   - `line_id` (Line/Pro – dropdown from master data, e.g., PSB-II, PSB-III).
   - `motif_id` (Motif – dropdown).
   - `dimension_id` (Dimensi – e.g., 60x60).
   - `status` (default `Draft` on create).

   DETAIL (repeated rows / dynamic table for each pengamatan per jam):
   Each row should contain:
   - `time` (Jam – time input).
   - `sequence_no` (No Urut).
   - `table_no` (No Meja).
   - `x1`, `x2`, `x3`, `y1`, `y2`, `y3` (numeric, dimension deviation or measurement values).
   - `premium_qty` (Premium – integer).
   - `crack_qty` (Crack – integer).
   - `surface_qty` (Surface – integer).
   - `gupil_qty` (Gupil – integer).
   - `other_reject_qty` (Reject lain – integer, optional).

   Behaviour:
   - Operator/QC can **add/remove rows dynamically**.
   - On save, create a `ProductionReport` (header) and multiple `ProductionReportDetail` (child rows).
   - Provide buttons:
     - “Simpan Draft”
     - “Submit untuk Approval”
   - Once status is `Submitted` or `Approved`, editing is restricted based on role.

2) **Riwayat Laporan**  
   Route: `/admin/reports`  

   - Table list with filters:
     - Date range
     - Shift
     - Line
     - Motif
     - Status
   - Columns: Date, Shift, Line, Motif, Dimension, Total Premium, Total Defect, Status, Action.
   - Actions:
     - View detail (show header + detail rows like the paper form).
     - Edit (only if Draft or role allows).
     - Change status (Supervisor/Admin can approve).
     - Export single report to PDF.

--------------------------------
B3. Rekap Premium (Menu: “Rekap Premium”)
--------------------------------

Provide aggregated views of premium production:

- Route: `/admin/recap` with filters:
  - Date range (daily / monthly).
  - Shift (all or specific).
  - Line/Pro.
  - Motif/Dimension.

- Show several tabs or sections:
  1. **Rekap Harian** – total premium per day.
  2. **Rekap per Shift** – table and chart of premium per shift.
  3. **Rekap per Line/Pro** – table: date/line/premium/defect.
  4. **Rekap per Motif & Dimensi** – to see which motif has best performance.

- Include buttons to:
  - Export current filtered result to **Excel** and **PDF**.
  - Print view (print-friendly layout).

--------------------------------
B4. Validasi / Approval (Status Flow)
--------------------------------

Implement basic workflow:

- Status values for `ProductionReport`: `draft`, `submitted`, `approved`, optionally `rejected`.
- Operator can:
  - create `draft`
  - edit `draft`
  - submit -> `submitted`
- Supervisor/Admin can:
  - review submitted report
  - update to `approved` or `rejected`
  - add `approval_note`.

Show this status clearly in:
- Report list.
- Report detail page.
- Dashboard (count per status).

--------------------------------
B5. Master Data (Menu: “Master Data”)
--------------------------------

Create CRUD pages for:

1. **Lines** (`lines` table)
   - Fields: `id`, `name` (e.g., “PSB-II”, “PSB-III”), `description` (optional).

2. **Motifs** (`motifs` table)
   - Fields: `id`, `name` (e.g., “Revolver Gold GL”), `description`, `is_active`.

3. **Dimensions** (`dimensions` table)
   - Fields: `id`, `name` (e.g., “60x60”), `width`, `height`, `thickness` (optional).

4. **Shifts** (`shifts` table)
   - Fields: `id`, `name` (e.g., “Shift I”), `start_time`, `end_time`.

5. **Defect Categories** (`defect_categories` table)
   - Example values: Crack, Surface, Gupil, Other.
   - This can be used later if you want more flexible defect definition; for now, hardcoded columns as described are fine, but prepare for future extension.

All master data screens must have:
- List, search, pagination.
- Create, edit, delete (with confirmation).
- Basic validation.

--------------------------------
B6. User & Role Management (Menu: “User & Role”)
--------------------------------

Implement **user management**:

- `users` table: name, email, password, role relation, active flag.
- Roles: `admin`, `supervisor`, `operator`, `viewer`.
- Admin can:
  - Create users.
  - Assign role.
  - Activate/deactivate user.

Use Laravel’s authentication scaffolding (e.g., Breeze/Jetstream) adapted to Inertia + React. Apply middleware and policies so each role sees only allowed menus and actions.

--------------------------------
B7. Laporan & Cetak (Optional Separate Menu)
--------------------------------

If needed, create a menu **“Laporan & Cetak”** to group exports:

- Laporan Premium per Shift (range tanggal).
- Laporan Premium per Line.
- Laporan Summary Bulanan.

Each report should have:
- Filter form.
- View table.
- Export to PDF/Excel.

--------------------------------
B8. Audit & Activity Log (Simple)
--------------------------------

Implement a simple activity log (optional but recommended):

- `activity_logs` table with:
  - user_id
  - action (created_report, updated_report, approved_report, etc.)
  - model_type, model_id
  - description
  - timestamp

Show a simple page “Log Aktivitas” for Admin to see last activities (for transparency).

====================================================
C. DATA MODEL SUMMARY (BACKEND SPEC)
====================================================

Define at least the following tables and Eloquent models:

- `users` (User) – standard Laravel + relation to Role.
- `roles` / pivot `model_has_roles` – if using Spatie, follow their structure.
- `lines` (Line)
- `motifs` (Motif)
- `dimensions` (Dimension)
- `shifts` (Shift)
- `production_reports` (ProductionReport)
   - `id`
   - `date` (date)
   - `shift_id` (fk shifts)
   - `line_id` (fk lines)
   - `motif_id` (fk motifs)
   - `dimension_id` (fk dimensions)
   - `status` (enum/string: draft/submitted/approved/rejected)
   - `approval_user_id` (nullable fk users)
   - `approval_note` (nullable text)
   - `created_by` (fk users)
   - `updated_by` (fk users nullable)
   - timestamps
- `production_report_details` (ProductionReportDetail)
   - `id`
   - `production_report_id` (fk)
   - `time` (time)
   - `sequence_no`
   - `table_no`
   - `x1`,`x2`,`x3`,`y1`,`y2`,`y3` (decimal)
   - `premium_qty` (integer)
   - `crack_qty` (integer)
   - `surface_qty` (integer)
   - `gupil_qty` (integer)
   - `other_reject_qty` (integer nullable)
   - timestamps

Define all relationships:
- `ProductionReport` belongsTo `Shift`, `Line`, `Motif`, `Dimension`, `User` (creator, approver).
- `ProductionReport` hasMany `ProductionReportDetail`.
- `ProductionReportDetail` belongsTo `ProductionReport`.

Use Eloquent accessor/method to calculate:
- total premium per report,
- total defects per report,
- defect percentage,
- premium percentage.

These calculations should be used in dashboard, recaps, and exports.

====================================================
D. FRONTEND ARCHITECTURE (REACT + INERTIA)
====================================================

- Use a main Inertia layout for:
  - **Public layout** (landing page, with header & footer).
  - **Admin layout** (sidebar + top bar, breadcrumbs, flash messages).
- Components:
  - `AdminSidebar`, `AdminTopbar`, `DataTable`, `FilterBar`, `Modal`, `ConfirmationDialog`, `FormInput`, etc.
- Use Tailwind utility classes for styling, but keep classes clean and readable.
- Use a basic chart library compatible with React (e.g., Chart.js via react-chartjs-2 or Recharts) for dashboards and recaps.
- Ensure mobile responsiveness: sidebar collapsible on small screens.

====================================================
E. NON-FUNCTIONAL REQUIREMENTS
====================================================

- Follow secure Laravel defaults.
- Prevent N+1 queries by using eager loading where needed.
- Apply server-side validation in controllers + client-side basic validation in React forms.
- Provide meaningful error messages in Indonesian (e.g., “Field ini wajib diisi”).
- Code should be clean and modular, easy to extend in the future.
- Do not change entity names or main business logic described above. If anything is ambiguous, use industry best practices without altering the core meaning.

Generate:
- All migrations
- Seeders for demo data (few lines, shifts, motifs, dimensions, demo users with different roles, some sample reports).
- Controllers, models, policies, routes.
- React pages and components for all views and forms.
- Basic unit tests or feature tests for key flows (login, create report, submit, approve, recap).

The final result should be a working Laravel + Inertia + React web application named **PT Surya Multi Cemerlang**, with a professional company landing page and a fully functional internal **aplikasi pencatatan laporan produksi premium per shift berbasis web** as described above.
