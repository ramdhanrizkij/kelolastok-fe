import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Boxes, ShieldCheck, ArrowLeft, KeyRound } from "lucide-react"
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm"

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

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
            <div className="flex items-center gap-2 mb-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <KeyRound className="size-4" />
              </div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Pemulihan Akun
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-card-foreground">
              Ubah Kata Sandi
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              Buat kata sandi baru untuk akun Anda. Pastikan kata sandi baru memenuhi ketentuan keamanan.
            </p>
          </div>

          <ResetPasswordForm
            initialToken={token || undefined}
            initialEmail={email || undefined}
            onSuccess={() => navigate("/login")}
          />
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <span>© 2026 KelolaStok</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            Sistem Terenkripsi SSL 256-bit
          </span>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
