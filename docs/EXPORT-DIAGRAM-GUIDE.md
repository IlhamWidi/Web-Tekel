# Panduan Konversi Mermaid Diagram ke Image
## PT Surya Multi Cemerlang - Production Report System

## 🎯 Cara Mengekspor Diagram ke Image untuk Proposal

### **Metode 1: Menggunakan Mermaid Live Editor (Online)** ⭐ TERCEPAT & TERMUDAH

#### Langkah-langkah:

1. **Buka Mermaid Live Editor**
   - Kunjungi: https://mermaid.live
   - Tool gratis dan tidak perlu install

2. **Copy Code Mermaid**
   - Buka file diagram Anda (ERD.md, USE-CASE-DIAGRAM.md, atau UML-DIAGRAMS.md)
   - Copy seluruh code yang ada di dalam blok ```mermaid ... ```
   - Contoh: Copy dari `graph TB` sampai penutup ```

3. **Paste ke Mermaid Live**
   - Paste code ke editor di sisi kiri
   - Diagram akan otomatis ter-render di sisi kanan

4. **Download Image**
   - Klik tombol "Download PNG" atau "Download SVG"
   - **PNG**: Untuk dokumen Word/PDF (raster)
   - **SVG**: Untuk kualitas terbaik (vector, bisa di-zoom tanpa blur)

5. **Simpan dengan Nama yang Jelas**
   - Contoh: `ERD-Database-Schema.png`
   - Contoh: `Use-Case-Diagram-System.svg`

---

### **Metode 2: Screenshot dari GitHub** 📸

#### Langkah-langkah:

1. **Push ke GitHub** (sudah selesai ✅)
   - Diagram sudah ada di repository Anda
   - GitHub otomatis render diagram Mermaid

2. **Buka File di GitHub**
   - Navigasi ke: https://github.com/IlhamWidi/Web-Tekel/blob/main/docs/ERD.md
   - Diagram akan ter-render otomatis

3. **Screenshot Diagram**
   - Windows: `Win + Shift + S` untuk Snipping Tool
   - Atau gunakan extension browser: "Full Page Screen Capture"

4. **Crop dan Edit**
   - Crop untuk fokus pada diagram
   - Bisa tambahkan border jika perlu

**Keuntungan:** Diagram sudah styled dengan tema GitHub

---

### **Metode 3: VS Code Extension** 🔧

#### Langkah-langkah:

1. **Install Extension**
   - Di VS Code, buka Extensions (Ctrl+Shift+X)
   - Search: "Markdown Preview Mermaid Support"
   - Install extension

2. **Preview Markdown**
   - Buka file .md (ERD.md, USE-CASE-DIAGRAM.md)
   - Tekan `Ctrl+Shift+V` untuk preview
   - Diagram akan ter-render

3. **Screenshot dari Preview**
   - Screenshot diagram yang sudah ter-render
   - Atau gunakan extension "Polacode" untuk screenshot code

**Keuntungan:** Bekerja offline, terintegrasi dengan VS Code

---

### **Metode 4: Mermaid CLI (Advanced)** 💻

#### Install Mermaid CLI:

```powershell
# Install via npm
npm install -g @mermaid-js/mermaid-cli

# Verify installation
mmdc --version
```

#### Generate Image dari File:

```powershell
# Navigate ke folder docs
cd docs

# Convert ERD.md ke PNG
mmdc -i ERD.md -o ../exports/ERD-Database-Schema.png -t dark

# Convert USE-CASE-DIAGRAM.md ke SVG
mmdc -i USE-CASE-DIAGRAM.md -o ../exports/Use-Case-Diagram.svg -t default

# Convert UML-DIAGRAMS.md ke PNG dengan kualitas tinggi
mmdc -i UML-DIAGRAMS.md -o ../exports/UML-Architecture.png -w 2400 -H 1600
```

#### Options:
- `-i` : Input file
- `-o` : Output file
- `-t` : Theme (default, dark, forest, neutral)
- `-w` : Width
- `-H` : Height
- `-b` : Background color

**Keuntungan:** Otomasi, batch processing, high quality

---

### **Metode 5: Automasi dengan Script** 🤖

Saya bisa buatkan script PowerShell untuk otomatis convert semua diagram!

---

## 📋 Rekomendasi untuk Proposal Laporan Magang

### **Format yang Disarankan:**

1. **Untuk Proposal Word/PDF:**
   - Format: **PNG** dengan resolusi tinggi (300 DPI)
   - Background: **White/Transparent**
   - Ukuran: **Full width** (agar detail terlihat)

2. **Untuk Presentasi PowerPoint:**
   - Format: **SVG** atau **PNG HD**
   - Background: **Sesuai tema presentasi**
   - Ukuran: Bisa di-resize tanpa kehilangan kualitas

3. **Untuk Dokumentasi Digital:**
   - Format: **SVG** (vector, scalable)
   - Bisa di-zoom tanpa blur
   - File size lebih kecil

---

## 🎨 Tips Editing Image (Opsional)

### Software yang Bisa Digunakan:

1. **Microsoft PowerPoint**
   - Import image → Crop → Add border
   - Export as high quality PNG

2. **Paint.NET** (Free)
   - Download: https://www.getpaint.net
   - Crop, resize, add annotations

3. **Figma** (Free, Online)
   - Import image → Edit → Export
   - Professional quality

4. **Canva** (Free)
   - Create design → Import diagram
   - Add title, annotations, branding

---

## 📂 Struktur Folder untuk Proposal

Saya sarankan buat struktur folder seperti ini:

```
Website-Laporan/
├── docs/
│   ├── ERD.md
│   ├── USE-CASE-DIAGRAM.md
│   └── UML-DIAGRAMS.md
│
├── exports/                    ← FOLDER BARU
│   ├── images/
│   │   ├── ERD-Database-Schema.png
│   │   ├── ERD-Database-Schema.svg
│   │   ├── Use-Case-Diagram.png
│   │   ├── Use-Case-Diagram.svg
│   │   ├── System-Architecture.png
│   │   ├── Data-Flow-Diagram.png
│   │   ├── Approval-Workflow.png
│   │   ├── Component-Architecture.png
│   │   ├── Security-Architecture.png
│   │   └── Deployment-Architecture.png
│   │
│   └── proposal/
│       ├── Laporan-Magang-BAB-1.docx
│       ├── Laporan-Magang-BAB-2.docx
│       └── Laporan-Magang-Full.pdf
│
└── README.md
```

---

## 📝 Template Caption untuk Proposal

### Contoh caption untuk setiap diagram:

**Gambar 2.1: Entity Relationship Diagram**
```
Gambar ini menunjukkan struktur database sistem Production Report 
PT Surya Multi Cemerlang yang terdiri dari 16 tabel dengan relasi 
yang saling terhubung untuk mendukung proses pencatatan produksi 
harian.
```

**Gambar 2.2: Use Case Diagram**
```
Use Case Diagram menggambarkan interaksi antara 4 jenis aktor 
(Admin, Supervisor, Operator, Guest) dengan 32 use case yang 
tersedia dalam sistem, mencakup manajemen produksi, approval 
workflow, dan pelaporan.
```

**Gambar 2.3: System Architecture**
```
Arsitektur sistem menggunakan pendekatan layered architecture 
dengan Laravel 11 sebagai backend framework, React 18 untuk 
frontend, dan MySQL sebagai database management system.
```

---

## 🚀 Quick Start Guide

### **Cara Tercepat (5 Menit):**

1. Buka https://mermaid.live
2. Copy diagram dari file `docs/ERD.md` (bagian ```mermaid)
3. Paste ke Mermaid Live
4. Klik "Download PNG"
5. Simpan sebagai `ERD-Database-Schema.png`
6. Ulangi untuk diagram lainnya

**Total diagram yang bisa diekspor:**
- ERD.md: 1 diagram ERD utama
- USE-CASE-DIAGRAM.md: 1 diagram use case
- UML-DIAGRAMS.md: 10+ diagram (ERD, Use Case, Architecture, Flow, dll)

---

## 📊 Checklist untuk Proposal

- [ ] ERD - Database Schema
- [ ] Use Case Diagram
- [ ] System Architecture
- [ ] Data Flow Diagram
- [ ] Approval Workflow (State Machine)
- [ ] Component Architecture
- [ ] Security Architecture
- [ ] Deployment Architecture
- [ ] Screenshot aplikasi (Login Page)
- [ ] Screenshot aplikasi (Dashboard)
- [ ] Screenshot aplikasi (Report Management)

---

## 💡 Tips Profesional

1. **Konsistensi:**
   - Gunakan theme yang sama untuk semua diagram
   - Dark theme atau light theme

2. **Resolusi:**
   - Minimal 1920x1080 untuk PNG
   - SVG lebih baik (scalable)

3. **Naming:**
   - Gunakan nama file yang deskriptif
   - Format: `[BAB]-[Nomor]-[Nama].png`
   - Contoh: `BAB2-01-ERD-Database.png`

4. **Caption:**
   - Selalu beri caption yang jelas
   - Jelaskan apa yang ditunjukkan diagram
   - Referensikan dalam teks proposal

---

**Need Help?** 
Jika Anda ingin saya buatkan script otomatis untuk convert semua diagram 
sekaligus, atau perlu bantuan formatting untuk proposal, let me know! 😊

---

**Generated:** December 30, 2025  
**Version:** 1.0.0  
**Purpose:** Internship Proposal Documentation
