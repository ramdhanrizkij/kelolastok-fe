import * as React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react"
import { useResetPassword } from "../hooks/use-auth"
import { cn } from "@/shared/lib/utils"

interface ResetPasswordFormProps {
  initialToken?: string
  initialEmail?: string
  onSuccess?: () => void
}

export function ResetPasswordForm({
  initialToken,
  initialEmail,
  onSuccess,
}: ResetPasswordFormProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const resetPasswordMutation = useResetPassword()

  const token = initialToken || searchParams.get("token") || "mock-token"
  const email = initialEmail || searchParams.get("email") || ""

  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [countdown, setCountdown] = React.useState(5)

  // Password Strength Logic
  const hasMinLength = password.length >= 8
  const hasNumber = /\d/.test(password)
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  const isMatch = Boolean(password && confirmPassword && password === confirmPassword)

  const strengthScore = [hasMinLength, hasNumber, hasMixedCase, hasSpecial].filter(Boolean).length

  const getStrengthLabel = () => {
    if (!password) return { text: "Belum diisi", color: "text-muted-foreground" }
    if (strengthScore <= 1) return { text: "Sangat Lemah", color: "text-rose-500" }
    if (strengthScore === 2) return { text: "Cukup", color: "text-amber-500" }
    if (strengthScore === 3) return { text: "Baik", color: "text-blue-500" }
    return { text: "Sangat Kuat", color: "text-emerald-500" }
  }

  const handleProceedToLogin = React.useCallback(() => {
    if (onSuccess) {
      onSuccess()
    } else {
      navigate("/login")
    }
  }, [navigate, onSuccess])

  // Handle countdown after success
  React.useEffect(() => {
    if (!isSuccess) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleProceedToLogin()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isSuccess, handleProceedToLogin])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (password.length < 8) {
      setErrorMessage("Kata sandi harus minimal 8 karakter.")
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage("Konfirmasi kata sandi tidak sesuai dengan kata sandi baru.")
      return
    }

    resetPasswordMutation.mutate(
      {
        token,
        email: email || undefined,
        password,
      },
      {
        onSuccess: () => {
          setIsSuccess(true)
        },
        onError: (err) => {
          setErrorMessage(err.message || "Gagal mengubah kata sandi. Silakan coba kembali.")
        },
      }
    )
  }

  // Success view with "OK" button
  if (isSuccess) {
    return (
      <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 ring-8 ring-emerald-500/5">
          <CheckCircle2 className="size-9" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            Kata Sandi Berhasil Diubah! 🎉
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Kata sandi akun Anda telah berhasil diperbarui. Anda sekarang dapat masuk kembali ke sistem KelolaStok menggunakan kata sandi yang baru.
          </p>
        </div>

        <div className="rounded-xl bg-muted/50 border border-border/60 p-3.5 text-xs text-muted-foreground flex items-center justify-center gap-2">
          <span>Otomatis dialihkan ke halaman login dalam</span>
          <span className="font-bold text-foreground px-2 py-0.5 rounded-md bg-background border border-border">
            {countdown}s
          </span>
        </div>

        <button
          type="button"
          onClick={handleProceedToLogin}
          className="w-full h-11 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground font-semibold text-sm transition-all duration-150 shadow-md shadow-primary/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <span>OK, Masuk ke Akun Sekarang</span>
          <ArrowRight className="size-4" />
        </button>
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

      {email && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground flex items-center gap-2">
          <ShieldCheck className="size-4 text-primary shrink-0" />
          <span>
            Mengatur ulang kata sandi untuk akun:{" "}
            <strong className="text-foreground">{email}</strong>
          </span>
        </div>
      )}

      {/* Input Kata Sandi Baru */}
      <div className="space-y-1.5">
        <label
          htmlFor="new-password"
          className="block text-xs font-semibold text-foreground uppercase tracking-wider"
        >
          Kata Sandi Baru
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-muted-foreground/60 pointer-events-none" />
          <input
            id="new-password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-2xs"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        {/* Strength Indicator */}
        {password.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Kekuatan Kata Sandi:</span>
              <span className={cn("font-semibold", getStrengthLabel().color)}>
                {getStrengthLabel().text}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    strengthScore >= step
                      ? strengthScore <= 1
                        ? "bg-rose-500"
                        : strengthScore === 2
                        ? "bg-amber-500"
                        : strengthScore === 3
                        ? "bg-blue-500"
                        : "bg-emerald-500"
                      : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Konfirmasi Kata Sandi Baru */}
      <div className="space-y-1.5">
        <label
          htmlFor="confirm-password"
          className="block text-xs font-semibold text-foreground uppercase tracking-wider"
        >
          Konfirmasi Kata Sandi Baru
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-muted-foreground/60 pointer-events-none" />
          <input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Ulangi kata sandi baru"
            className={cn(
              "w-full pl-10 pr-10 py-2.5 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 transition-all shadow-2xs",
              confirmPassword && isMatch
                ? "border-emerald-500 focus:ring-emerald-500/20"
                : confirmPassword && !isMatch
                ? "border-rose-500 focus:ring-rose-500/20"
                : "border-input focus:ring-primary/20 focus:border-primary"
            )}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
            aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/70 hover:text-foreground transition-colors cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        {confirmPassword && (
          <div className="flex items-center gap-1.5 text-[11px] pt-0.5">
            {isMatch ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <Check className="size-3.5" /> Kata sandi cocok
              </span>
            ) : (
              <span className="text-rose-500 flex items-center gap-1 font-medium">
                <AlertCircle className="size-3.5" /> Konfirmasi kata sandi belum sama
              </span>
            )}
          </div>
        )}
      </div>

      {/* Persyaratan Kata Sandi */}
      <div className="rounded-xl bg-muted/40 p-3 space-y-1.5 text-[11px] text-muted-foreground">
        <span className="font-semibold text-foreground block">Ketentuan kata sandi:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <span className={cn("flex items-center gap-1.5", hasMinLength ? "text-emerald-600 font-medium" : "")}>
            <span className={cn("size-1.5 rounded-full", hasMinLength ? "bg-emerald-500" : "bg-muted-foreground/40")} />
            Minimal 8 karakter
          </span>
          <span className={cn("flex items-center gap-1.5", hasNumber ? "text-emerald-600 font-medium" : "")}>
            <span className={cn("size-1.5 rounded-full", hasNumber ? "bg-emerald-500" : "bg-muted-foreground/40")} />
            Mengandung angka
          </span>
          <span className={cn("flex items-center gap-1.5", hasMixedCase ? "text-emerald-600 font-medium" : "")}>
            <span className={cn("size-1.5 rounded-full", hasMixedCase ? "bg-emerald-500" : "bg-muted-foreground/40")} />
            Huruf besar & kecil
          </span>
          <span className={cn("flex items-center gap-1.5", isMatch ? "text-emerald-600 font-medium" : "")}>
            <span className={cn("size-1.5 rounded-full", isMatch ? "bg-emerald-500" : "bg-muted-foreground/40")} />
            Kata sandi sesuai
          </span>
        </div>
      </div>

      {/* Tombol Simpan */}
      <button
        type="submit"
        disabled={resetPasswordMutation.isPending || !hasMinLength || !isMatch}
        className="w-full h-11 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground font-semibold text-sm transition-all duration-150 shadow-md shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer active:scale-[0.99]"
      >
        {resetPasswordMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Memperbarui Kata Sandi...</span>
          </>
        ) : (
          <span>Simpan Kata Sandi Baru</span>
        )}
      </button>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Batalkan & Kembali ke Halaman Masuk
        </button>
      </div>
    </form>
  )
}

export default ResetPasswordForm
