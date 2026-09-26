import { Link, useNavigate } from "react-router-dom"
import { Boxes, ShieldCheck, ArrowLeft } from "lucide-react"
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm"

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25">
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
          </div>

          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Kembali
          </Link>
        </div>

        {/* Card Form Container */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-card-foreground">
              Lupa Kata Sandi
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Masukkan alamat email terdaftar Anda untuk menerima tautan pemulihan kata sandi.
            </p>
          </div>

          <ForgotPasswordForm onBackToLogin={() => navigate("/login")} />
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <span>© 2026 KelolaStok</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            Sistem Terenkripsi
          </span>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
