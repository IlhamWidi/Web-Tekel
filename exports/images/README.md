# Exported Diagrams
## PT Surya Multi Cemerlang - Production Report System

Folder ini berisi diagram UML yang telah di-export menjadi image format (PNG & SVG) untuk keperluan dokumentasi proposal magang.

---

## 📁 File Structure

### **ERD (Entity Relationship Diagram)**
- `ERD-Database-Schema-1.png` (226.57 KB) - Format PNG untuk Word/PDF
- `ERD-Database-Schema-1.svg` (293.86 KB) - Format SVG untuk presentasi

**Deskripsi:** Menampilkan struktur database lengkap dengan 16 tabel dan relationships.

---

### **Use Case Diagram**
- `Use-Case-Diagram-1.png` (66.90 KB) - Format PNG untuk Word/PDF
- `Use-Case-Diagram-1.svg` (98.64 KB) - Format SVG untuk presentasi

**Deskripsi:** Menampilkan interaksi 4 actor dengan 32 use cases dalam sistem.

---

### **UML Diagrams (Complete Architecture)**

#### Diagram 1: Simplified ERD - Core Entities
- `UML-Complete-1.png` (95.02 KB)
- `UML-Complete-1.svg` (139.19 KB)

**Deskripsi:** ERD yang disederhanakan menampilkan core entities dan relationships utama.

---

#### Diagram 2: Use Case Overview
- `UML-Complete-2.png` (132.38 KB)
- `UML-Complete-2.svg` (43.89 KB)

**Deskripsi:** Overview use case dengan aktor dan use case mapping.

---

#### Diagram 3: System Architecture (Layered)
- `UML-Complete-3.png` (60.93 KB)
- `UML-Complete-3.svg` (30.19 KB)

**Deskripsi:** Arsitektur sistem dengan presentation, application, business logic, dan data access layer.

---

#### Diagram 4: Database Schema Visual
- `UML-Complete-4.png` (44.82 KB)
- `UML-Complete-4.svg` (22.91 KB)

**Deskripsi:** Visual relationships antar core tables.

---

#### Diagram 5: Data Flow Diagram
- `UML-Complete-5.png` (49.03 KB)
- `UML-Complete-5.svg` (28.05 KB)

**Deskripsi:** Sequence diagram untuk production report creation flow.

---

#### Diagram 6: Approval Workflow (State Machine)
- `UML-Complete-6.png` (69.00 KB)
- `UML-Complete-6.svg` (179.16 KB)

**Deskripsi:** State machine diagram untuk approval workflow (draft → pending → approved/rejected).

---

#### Diagram 7: Component Architecture
- `UML-Complete-7.png` (32.72 KB)
- `UML-Complete-7.svg` (25.50 KB)

**Deskripsi:** Frontend component hierarchy (Layouts, Pages, Components).

---

#### Diagram 8: Security Architecture
- `UML-Complete-8.png` (60.12 KB)
- `UML-Complete-8.svg` (115.89 KB)

**Deskripsi:** Authentication & authorization flow diagram.

---

#### Diagram 9: Performance Optimization
- `UML-Complete-9.png` (14.88 KB)
- `UML-Complete-9.svg` (18.61 KB)

**Deskripsi:** Query optimization strategy (caching, eager loading, indexes).

---

#### Diagram 10: Deployment Architecture
- `UML-Complete-10.png` (39.57 KB)
- `UML-Complete-10.svg` (23.71 KB)

**Deskripsi:** Production deployment environment topology.

---

## 📖 Penggunaan untuk Proposal Magang

### **Format File**

| Format | Kegunaan | Kelebihan |
|--------|----------|-----------|
| **PNG** | Dokumen Word/PDF | Kompatibel universal, tampilan konsisten |
| **SVG** | Presentasi PowerPoint/Web | Scalable, tidak blur saat di-zoom |

---

### **Rekomendasi Penyisipan di Proposal**

#### **BAB 2: Landasan Teori**
- ERD-Database-Schema-1.png
  - **Caption:** "Gambar 2.1: Entity Relationship Diagram Sistem"

#### **BAB 3: Analisis Sistem**
- Use-Case-Diagram-1.png
  - **Caption:** "Gambar 3.1: Use Case Diagram Sistem Production Report"
- UML-Complete-3.png (System Architecture)
  - **Caption:** "Gambar 3.2: Arsitektur Sistem Layered"

#### **BAB 4: Perancangan Sistem**
- UML-Complete-4.png (Database Schema Visual)
  - **Caption:** "Gambar 4.1: Skema Database dan Relasi Tabel"
- UML-Complete-5.png (Data Flow)
  - **Caption:** "Gambar 4.2: Alur Data Pembuatan Laporan Produksi"
- UML-Complete-6.png (Approval Workflow)
  - **Caption:** "Gambar 4.3: State Machine Approval Workflow"

#### **BAB 5: Implementasi**
- UML-Complete-7.png (Component Architecture)
  - **Caption:** "Gambar 5.1: Struktur Komponen Frontend"
- UML-Complete-8.png (Security Architecture)
  - **Caption:** "Gambar 5.2: Alur Keamanan dan Otentikasi"

#### **BAB 6: Deployment**
- UML-Complete-10.png (Deployment Architecture)
  - **Caption:** "Gambar 6.1: Arsitektur Deployment Production"

---

## 🎨 Tips Editing (Opsional)

### **Menambahkan Border di PowerPoint:**
1. Insert → Pictures → pilih diagram PNG
2. Format tab → Picture Border → pilih warna
3. Weight → 1-2 pt

### **Crop untuk Fokus:**
1. Klik image → Format tab
2. Crop → sesuaikan area
3. Crop again untuk apply

### **Export dari PowerPoint dengan Kualitas Tinggi:**
1. File → Export → Change File Type
2. PNG Portable Network Graphics
3. High Quality (300 DPI)

---

## 📝 Template Caption Lengkap

```
Gambar X.X: [Nama Diagram]

[Deskripsi singkat apa yang ditampilkan diagram ini, 2-3 kalimat. 
Jelaskan komponen utama dan hubungan antar komponen.]

Sumber: Dokumentasi Sistem Production Report PT Surya Multi Cemerlang, 2025
```

---

## 🔄 Re-generate Diagrams

Jika perlu update diagram:

```powershell
# Run export script
.\export-simple.ps1

# Files akan di-generate di root, lalu pindahkan
Move-Item *.png exports/images/ -Force
Move-Item *.svg exports/images/ -Force
```

---

## 📊 Summary

| Item | Count |
|------|-------|
| **Total Diagrams** | 12 diagram unik |
| **Total Files** | 24 files (12 PNG + 12 SVG) |
| **Total Size** | ~1.8 MB |
| **Format** | PNG (Word/PDF), SVG (Presentation) |

---

**Generated:** December 30, 2025  
**Purpose:** Internship Proposal Documentation  
**System:** PT Surya Multi Cemerlang Production Report System
