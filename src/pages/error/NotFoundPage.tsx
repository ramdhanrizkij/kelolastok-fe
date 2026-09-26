import { useNavigate, useLocation, Link } from "react-router-dom"
import {
  Boxes,
  ArrowLeft,
  Home,
  FileQuestion,
  Search,
  Package,
  Layers,
  HelpCircle,
  ShieldCheck,
} from "lucide-react"
import { ROUTES } from "@/shared/constants/routes"
import { useAuthStore } from "@/features/auth/stores/auth.store"

export function NotFoundPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const quickLinks = [
    {
      title: "Ringkasan Stok",
      desc: "Pantau ketersediaan & pergerakan barang",
      path: ROUTES.INVENTORY.SUMMARY,
      icon: Package,
    },
    {
      title: "Katalog Barang",
      desc: "Daftar produk, SKU & harga barang",
      path: ROUTES.INVENTORY.CATALOG,
      icon: Layers,
    },
    {
      title: "Pusat Bantuan",
      desc: "Hubungi tim bantuan KelolaStok",
      path: ROUTES.SETTINGS.INTEGRATIONS,
      icon: HelpCircle,
    },
  ]

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-background text-foreground p-4 sm:p-6 md:p-8">
      {/* Top Navbar / Brand Header */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-2">
        <Link to={isAuthenticated ? ROUTES.DEFAULT : ROUTES.LOGIN} className="flex items-center gap-2.5 group">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-transform group-hover:scale-105">
            <Boxes className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground leading-tight flex items-center gap-1.5">
              KelolaStok
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-md bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-soft">
                UMKM
              </span>
            </span>
            <span className="text-xs text-muted-foreground">
              Inventori & Manajemen Stok
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border/70 hover:bg-muted/60 cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="size-3.5" />
          <span>Kembali</span>
        </button>
      </header>

      {/* Main Content Card */}
      <main className="w-full max-w-xl mx-auto my-auto py-8">
        <div className="relative rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-lg text-center overflow-hidden">
          {/* Ambient Glow Decoration */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 size-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          {/* 404 Visual Icon & Badge */}
          <div className="relative mb-6">
            <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-primary/10 text-primary border border-primary/20 shadow-inner">
              <FileQuestion className="size-10" />
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-bold tracking-wider uppercase border border-destructive/20">
              <span className="size-1.5 rounded-full bg-destructive animate-pulse" />
              Kode Status: 404
            </div>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              Maaf, rute atau halaman yang Anda tuju tidak tersedia, telah dihapus, atau sedang dipindahkan ke alamat baru.
            </p>
          </div>

          {/* Path Badge Detail */}
          <div className="mb-8 p-3 rounded-xl bg-muted/60 border border-border/80 flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
            <Search className="size-3.5 shrink-0 text-primary" />
            <span className="truncate max-w-xs sm:max-w-md text-foreground font-medium">
              {location.pathname}
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button
              type="button"
              onClick={() => navigate(isAuthenticated ? ROUTES.DEFAULT : ROUTES.LOGIN)}
              className="w-full sm:w-auto h-11 px-6 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground font-semibold text-sm transition-all shadow-md shadow-primary/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Home className="size-4" />
              <span>{isAuthenticated ? "Ke Halaman Utama (Dashboard)" : "Ke Halaman Masuk (Login)"}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto h-11 px-5 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="size-4" />
              <span>Kembali</span>
            </button>
          </div>

          {/* Helpful Quick Links Divider */}
          <div className="pt-6 border-t border-border/60 text-left">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3 text-center sm:text-left">
              Menu Cepat yang Mungkin Membantu:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {quickLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    className="p-3 rounded-xl border border-border/70 bg-background hover:bg-muted/60 transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                        <Icon className="size-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground line-clamp-1">
                      {item.desc}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto py-3 text-center text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-border/40">
        <span>© 2026 KelolaStok — Sistem Inventori & Manajemen Stok UMKM</span>
        <span className="inline-flex items-center gap-1 text-[11px]">
          <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
          Aplikasi Berjalan Normal
        </span>
      </footer>
    </div>
  )
}

export default NotFoundPage
