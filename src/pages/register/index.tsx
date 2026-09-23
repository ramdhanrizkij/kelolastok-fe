import * as React from "react"
import {
  User,
  AtSign,
  Mail,
  Eye,
  EyeOff,
  Boxes,
  ShieldCheck,
} from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { useRegister } from "@/hooks/use-auth"
import { cn } from "cn"

interface RegisterPageProps {
  onRegisterSuccess?: () => void
}

interface SlideItem {
  id: number
  image: string
  tag: string
  title: string
  subtitle: string
}

const FULL_SLIDES: SlideItem[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1600&auto=format&fit=crop",
    tag: "Kasir & Ritel UMKM",
    title:
      "Solusi cerdas & efisien kelola stok barang dan inventori untuk UMKM berkembang pesat.",
    subtitle:
      "Pantau stok barang masuk & keluar, barcode scanner, dan laporan omzet harian secara otomatis dalam satu aplikasi terpadu.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
    tag: "Manajemen Pergudangan",
    title:
      "Lacak perpindahan stok multi-cabang & pergudangan modern tanpa selisih barang.",
    subtitle:
      "Akurasi pencatatan inventori hingga 99.8% dengan pelacakan nomor batch dan sistem pengingat otomatis sebelum stok habis.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1600&auto=format&fit=crop",
    tag: "Omnichannel Marketplace",
    title:
      "Otomatis sinkronisasi stok ke Tokopedia, Shopee, dan TikTok Shop tanpa ribet.",
    subtitle:
      "Satu kali update stok di KelolaStok, seluruh etalase toko online Anda langsung terupdate seketika tanpa risiko overselling.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1600&auto=format&fit=crop",
    tag: "Analitik & Profit UMKM",
    title:
      "Ketahui produk paling laris dan analisis margin keuntungan bersih bisnis Anda seketika.",
    subtitle:
      "Laporan analitik instan siap pakai untuk memudahkan Anda merencanakan restok dan memaksimalkan perputaran modal usaha.",
  },
]

export default function RegisterPage({ onRegisterSuccess }: RegisterPageProps) {
  const navigate = useNavigate()
  const registerMutation = useRegister()
  const [name, setName] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [agreeTerms, setAgreeTerms] = React.useState(true)
  const [validationError, setValidationError] = React.useState<string | null>(null)

  // Fullscreen Slider State & Auto-play
  const [activeSlide, setActiveSlide] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  // Auto-slide every 5 seconds (paused on hover)
  React.useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % FULL_SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)

    if (password !== confirmPassword) {
      setValidationError("Konfirmasi kata sandi tidak cocok dengan kata sandi.")
      return
    }

    if (!agreeTerms) {
      setValidationError("Silakan setujui Syarat & Ketentuan untuk melanjutkan pendaftaran.")
      return
    }

    registerMutation.mutate(
      { name, username, email, password },
      {
        onSuccess: () => {
          if (onRegisterSuccess) {
            onRegisterSuccess()
          }
        },
      }
    )
  }

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-10 bg-background text-foreground transition-colors duration-200">
      {/* Kolom Kiri: Form Registrasi Fullscreen (Lebar 40%) */}
      <div className="lg:col-span-4 min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-10 xl:p-14 z-20 bg-background overflow-y-auto">
        {/* Logo Brand Header */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#5b51d8] text-white shadow-md shadow-indigo-500/25">
            <Boxes className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground leading-tight flex items-center gap-1.5">
              KelolaStok
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-[#5b51d8] dark:bg-indigo-400/20 dark:text-indigo-300">
                UMKM
              </span>
            </span>
            <span className="text-xs text-muted-foreground">
              Inventori & Manajemen Stok
            </span>
          </div>
        </div>

        {/* Form Container (Center Vertically) */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto my-auto py-6">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Mulai kelola inventori & stok usaha Anda lebih rapi dan efisien.
            </p>
          </div>

          {/* Error Alert */}
          {(validationError || registerMutation.error) && (
            <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
              {validationError || registerMutation.error?.message}
            </div>
          )}

          {/* Form Input */}
          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            {/* Field Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-md text-foreground"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Budi Santoso"
                  className="w-full h-10.5 rounded-xl border border-input bg-background px-3.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-[#115e43] focus:ring-2 focus:ring-[#115e43]/20 focus:outline-none dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/70">
                  <User className="size-4.5" />
                </div>
              </div>
            </div>

            {/* Field Username */}
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="text-md text-foreground"
              >
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))}
                  placeholder="budisantoso"
                  className="w-full h-10.5 rounded-xl border border-input bg-background px-3.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-[#115e43] focus:ring-2 focus:ring-[#115e43]/20 focus:outline-none dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/70">
                  <AtSign className="size-4.5" />
                </div>
              </div>
            </div>

            {/* Field Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-md text-foreground"
              >
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="budi@tokoberkah.id"
                  className="w-full h-10.5 rounded-xl border border-input bg-background px-3.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-[#115e43] focus:ring-2 focus:ring-[#115e43]/20 focus:outline-none dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/70">
                  <Mail className="size-4.5" />
                </div>
              </div>
            </div>

            {/* Field Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-md text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full h-10.5 rounded-xl border border-input bg-background px-3.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-[#115e43] focus:ring-2 focus:ring-[#115e43]/20 focus:outline-none dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="size-4.5" />
                  ) : (
                    <Eye className="size-4.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Field Confirm Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-md text-foreground"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi"
                  className="w-full h-10.5 rounded-xl border border-input bg-background px-3.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-[#115e43] focus:ring-2 focus:ring-[#115e43]/20 focus:outline-none dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Sembunyikan konfirmasi password" : "Tampilkan konfirmasi password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4.5" />
                  ) : (
                    <Eye className="size-4.5" />
                  )}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-rose-500 font-medium pt-0.5">
                  Kata sandi tidak cocok.
                </p>
              )}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-muted-foreground select-none leading-relaxed">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 size-3.5 rounded border-input text-[#115e43] focus:ring-[#115e43]/30 accent-[#115e43] cursor-pointer"
                />
                <span>
                  Saya menyetujui{" "}
                  <a
                    href="#terms"
                    onClick={(e) => {
                      e.preventDefault()
                      alert("Syarat & Ketentuan Layanan KelolaStok.")
                    }}
                    className="font-medium text-[#115e43] dark:text-emerald-400 hover:underline"
                  >
                    Syarat & Ketentuan
                  </a>{" "}
                  serta{" "}
                  <a
                    href="#privacy"
                    onClick={(e) => {
                      e.preventDefault()
                      alert("Kebijakan Privasi KelolaStok.")
                    }}
                    className="font-medium text-[#115e43] dark:text-emerald-400 hover:underline"
                  >
                    Kebijakan Privasi
                  </a>
                  .
                </span>
              </label>
            </div>

            {/* Tombol DAFTAR SEKARANG */}
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full h-11 rounded-xl bg-[#115e43] hover:bg-[#0c4a34] dark:bg-[#15803d] dark:hover:bg-[#166534] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-md shadow-emerald-950/20 active:scale-[0.99] disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {registerMutation.isPending ? (
                <span className="inline-block size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>DAFTAR SEKARANG</span>
              )}
            </button>

            {/* Tombol Sign up with Google */}
            <button
              type="button"
              onClick={() => {
                if (onRegisterSuccess) onRegisterSuccess()
                else navigate("/dashboard")
              }}
              className="w-full h-10.5 rounded-xl border border-border bg-background hover:bg-muted/60 text-foreground font-medium text-sm transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-2xs"
            >
              <svg className="size-4.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.36 7.37 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Sign up with Google</span>
            </button>
          </form>

          {/* Link ke Login */}
          <div className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#115e43] dark:text-emerald-400 hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-5 border-t border-border/60 text-xs text-muted-foreground flex items-center justify-between">
          <span>© 2026 KelolaStok</span>
          <span className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            Sistem Terenkripsi
          </span>
        </div>
      </div>

      {/* Kolom Kanan: 100% FULL IMAGE BACKGROUND SLIDER (Lebar 60%) */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="hidden lg:block lg:col-span-6 min-h-screen relative overflow-hidden bg-zinc-950 select-none"
      >
        {/* Full Image Layers dengan Animasi Crossfade Smooth */}
        {FULL_SLIDES.map((slide, index) => {
          const isActive = activeSlide === index
          return (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out",
                isActive
                  ? "opacity-100 z-10 scale-100"
                  : "opacity-0 z-0 pointer-events-none scale-105"
              )}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05]"
              />
              {/* Overlay Gradien Gelap dari Bawah untuk Keterbacaan Teks Maksimal */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15" />
            </div>
          )
        })}

        {/* Overlay Konten di Atas Gambar Penuh (Header Tag + Teks Bawah + Dots) */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-10 lg:p-14 xl:p-16 pointer-events-none">
          {/* Bar Atas: Kategori / Tag */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-lg">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{FULL_SLIDES[activeSlide].tag}</span>
            </div>
          </div>

          {/* Bagian Bawah: Deskripsi Teks + Titik Pagination Horizontal */}
          <div className="space-y-6 max-w-2xl pointer-events-auto">
            <div className="space-y-2.5">
              <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold tracking-tight text-white leading-snug drop-shadow-md">
                {FULL_SLIDES[activeSlide].title}
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl drop-shadow-xs">
                {FULL_SLIDES[activeSlide].subtitle}
              </p>
            </div>

            {/* Titik Pagination Horizontal (Active Pill Lebar Sesuai Gambar) */}
            <div className="flex items-center gap-2.5 pt-1">
              {FULL_SLIDES.map((slide, index) => {
                const isActive = activeSlide === index
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Buka slide ${index + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300 cursor-pointer shadow-md",
                      isActive
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/45 hover:bg-white/85"
                    )}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
