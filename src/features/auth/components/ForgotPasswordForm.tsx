import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  AlertCircle,
  ExternalLink,
  RefreshCw,
} from "lucide-react"
import { useForgotPassword } from "../hooks/use-auth"

interface ForgotPasswordFormProps {
  onBackToLogin?: () => void
}

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const navigate = useNavigate()
  const forgotPasswordMutation = useForgotPassword()
  const [email, setEmail] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [resetLink, setResetLink] = React.useState<string | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!email || !email.includes("@")) {
      setErrorMessage("Silakan masukkan format alamat email yang valid.")
      return
    }

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: (data) => {
          setIsSubmitted(true)
          if (data.data?.resetLink) {
            setResetLink(data.data.resetLink)
          } else {
            // Fallback link if not provided in data
            setResetLink(`/reset-password?email=${encodeURIComponent(email)}`)
          }
        },
        onError: (err) => {
          setErrorMessage(err.message || "Gagal mengirimkan tautan pemulihan kata sandi.")
        },
      }
    )
  }

  const handleResend = () => {
    setErrorMessage(null)
    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: (data) => {
          if (data.data?.resetLink) {
            setResetLink(data.data.resetLink)
          }
        },
        onError: (err) => {
          setErrorMessage(err.message || "Gagal mengirim ulang tautan pemulihan.")
        },
      }
    )
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        {/* Animated Check Icon */}
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 ring-8 ring-emerald-500/5">
          <CheckCircle2 className="size-8" />
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-foreground text-xl tracking-tight">
            Periksa Email Anda
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tautan untuk mengubah kata sandi telah dikirim ke:
            <br />
            <span className="font-semibold text-foreground underline decoration-primary/30 underline-offset-4">
              {email}
            </span>
          </p>
        </div>

        {/* Demo / Simulation Helper Box */}
        {resetLink && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-left transition-all">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 rounded-md bg-primary/10 p-1 text-primary">
                <ExternalLink className="size-4" />
              </div>
              <div className="flex-1 space-y-1.5">
                <p className="text-xs font-semibold text-foreground">
                  Simulasi Tautan Email (Langsung):
                </p>
                <p className="text-xs text-muted-foreground">
                  Di lingkungan pengujian, Anda dapat langsung mengklik tautan di bawah ini untuk membuka halaman ubah kata sandi:
                </p>
                <button
                  type="button"
                  onClick={() => navigate(resetLink)}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-active text-primary-foreground font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
                >
                  <span>Buka Link Ubah Kata Sandi</span>
                  <ExternalLink className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleResend}
            disabled={forgotPasswordMutation.isPending}
            className="w-full py-2.5 px-4 rounded-xl border border-border bg-background hover:bg-muted text-foreground text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {forgotPasswordMutation.isPending ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Mengirim ulang...</span>
              </>
            ) : (
              <>
                <RefreshCw className="size-3.5" />
                <span>Kirim Ulang Email</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onBackToLogin || (() => navigate("/login"))}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" /> Kembali ke Halaman Masuk
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMessage && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive flex items-center gap-2.5">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="reset-email" className="block text-xs font-semibold text-foreground uppercase tracking-wider">
          Alamat Email Terdaftar
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-muted-foreground/60 pointer-events-none" />
          <input
            id="reset-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@tokoukm.id"
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
          />
        </div>
        <p className="text-[11px] text-muted-foreground">
          Kami akan mengirimkan instruksi dan tautan untuk membuat kata sandi baru.
        </p>
      </div>

      <button
        type="submit"
        disabled={forgotPasswordMutation.isPending}
        className="w-full h-11 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground font-semibold text-sm transition-all duration-150 shadow-md shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
      >
        {forgotPasswordMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Mengirim Instruksi...</span>
          </>
        ) : (
          <span>Kirim Link Ubah Password</span>
        )}
      </button>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onBackToLogin || (() => navigate("/login"))}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-3.5" /> Kembali ke Halaman Masuk
        </button>
      </div>
    </form>
  )
}

export default ForgotPasswordForm
