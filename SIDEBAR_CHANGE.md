# Dokumentasi Perubahan Sidebar (Sesuai Referensi Gambar)

Dokumen ini mencatat seluruh perubahan pada komponen sidebar agar tampil persis seperti pada gambar referensi.

---

## 1. Ringkasan Perubahan

Sidebar kini mengadopsi pola *Dual-Sidebar* (Dua Kolom):
- **Sidebar Pertama (Kiri / Primary)**: Navigasi utama berbentuk kolom ikon ringkas tanpa teks label.
- **Sidebar Kedua (Kanan / Secondary)**: Panel sub-menu kategori yang dapat dilipat (*collapsible*), menampilkan menu hirarki dengan status aktif.

---

## 2. Rincian Sidebar Pertama (Icon-Only Navigation)

| Properti | Nilai / Class Tailwind | Keterangan |
| :--- | :--- | :--- |
| **Lebar Kolom** | `w-[68px]!` | Kolom ramping khusus ikon dengan garis pemisah kanan (`border-r`). |
| **Logo Atas** | `size-10 rounded-full bg-[#5b51d8]` | Avatar bulat ungu dengan ikon `Sparkles` (`size-5`) berwarna putih di tengah. |
| **Ukuran Menu** | `size-12` (48px × 48px) | Setiap tombol berbentuk bujur sangkar dengan sudut membulat `rounded-xl`. |
| **Ukuran Ikon** | `size-5` (20px) | Ikon berada tepat di tengah tombol (`items-center justify-center`). |
| **Padding Kolom** | `px-2` | Jarak padding horizontal agar tombol berada simetris di tengah kolom. |
| **Status Aktif** | `bg-[#f1f2f4] text-foreground font-semibold dark:bg-muted dark:text-foreground` | Latar abu-abu terang lembut di light mode dan abu-abu gelap (`muted`) di dark mode agar kontras dan terbaca. |
| **Status Inaktif** | `text-muted-foreground hover:bg-muted/60` | Warna abu-abu redup dengan efek hover halus. |

### Ikon Menu Utama yang Digunakan:
1. **Apps** (`LayoutGrid`): Menu aktif dengan kotak latar belakang.
2. **Layouts** (`LayoutTemplate`): Ikon tata letak halaman.
3. **Pages** (`Copy`): Ikon lembar dokumen ganda.
4. **Authentication** (`Lock`): Ikon gembok keamanan.
5. **Documentation** (`BookOpen`): Ikon buku terbuka.

---

## 3. Rincian Sidebar Kedua (Sub-Menu / Navigation Panel)

| Properti | Nilai / Class Tailwind | Keterangan |
| :--- | :--- | :--- |
| **Lebar Panel** | `w-[240px]!` | Panel konten sub-menu dengan garis pemisah kanan (`border-r`). |
| **Header** | `text-xl font-bold text-foreground` | Menampilkan judul menu aktif (`Apps`, `Layouts`, `Pages`, dll.) secara dinamis sesuai menu utama yang dipilih. |
| **Tombol Collapse** | `Button` (ghost, `size-7`, `cursor-pointer`) dengan `ArrowLeft` | Tombol panah kiri `←` di sebelah kanan judul untuk melipat panel kedua (`setOpen(false)`). |
| **Struktur Menu** | Accordion / Collapsible List | Setiap kategori memiliki ikon, label teks, dan panah `ChevronDown`, dengan `cursor-pointer` saat hover. Konten kategori berganti secara dinamis saat memilih menu di sidebar pertama. |

### Pemetaan Menu Berdasarkan Navigasi Utama:
1. **Apps**: Project, CRM, Sales (Dashboard, Product List, dsb.), Crypto, Knowledge Base, Account.
2. **Layouts**: Vertical Layout (Default, Compact, Icon View, Dark Sidebar), Horizontal Layout (Top Nav Dark, Top Nav Light, Boxed Width), Detached (Two Column, Floating Sidebar).
3. **Pages**: Utility (Starter Page, Maintenance, Error 404, Error 500, FAQ), Profile, Pricing.
4. **Authentication**: Sign In, Sign Up, Forgot Password, Reset Password, Lock Screen.
5. **Documentation**: Introduction, Installation, Quick Start, Components, Changelog.

---

---

## 4. Penyesuaian Layout Halaman & Mode Responsif Mobile

1. **Desktop**: Variabel CSS `--sidebar-width` pada `<SidebarProvider>` disesuaikan menjadi `308px` (68px sidebar ikon + 240px sidebar sub-menu).
2. **Mobile (Viewport < 768px)**:
   - Sidebar beralih secara otomatis dari mode dual-sidebar menjadi **Single Sidebar Menu Tunggal** (berbentuk *Sheet Drawer*).
   - Menampilkan header **"Navigation"** dengan tombol close `X` di sudut kanan atas.
   - Konten menu disusun secara vertikal per seksi (`APPS`, `LAYOUTS`, `PAGES`, dll.) dengan accordion sub-menu yang dapat dilipat/buka dan scrollable, persis seperti pada gambar referensi.

---

## 5. File yang Diubah

1. [`src/components/app-sidebar.tsx`](file:///home/ptpjktn2100135/Development/Sideproject/kelolastok-fe/src/components/app-sidebar.tsx): Implementasi tampilan sidebar ganda untuk desktop dan menu tunggal untuk mobile.
2. [`src/pages/dashboard/index.tsx`](file:///home/ptpjktn2100135/Development/Sideproject/kelolastok-fe/src/pages/dashboard/index.tsx): Penyesuaian `--sidebar-width: 308px` dan `--sidebar-width-icon: 4rem`.
3. [`src/components/ui/button.tsx`](file:///home/ptpjktn2100135/Development/Sideproject/kelolastok-fe/src/components/ui/button.tsx): Penambahan `cursor-pointer` pada varian dasar button.
4. [`SIDEBAR_CHANGE.md`](file:///home/ptpjktn2100135/Development/Sideproject/kelolastok-fe/SIDEBAR_CHANGE.md): Catatan detail perubahan komponen.
