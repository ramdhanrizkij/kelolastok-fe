import * as React from "react"
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"

interface ForgotPasswordFormProps {
  onBackToLogin?: () => void
}

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 800)
  }

  if (isSubmitted) {
    return (
      <div className="space-y-5 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground text-lg">Cek Email Anda</h3>
          <p className="text-xs text-muted-foreground">
            Instruksi pemulihan kata sandi telah dikirimkan ke <strong className="text-foreground">{email}</strong>.
          </p>
        </div>
        <button
          type="button"
          onClick={onBackToLogin}
          className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          <ArrowLeft className="size-3.5" /> Kembali ke Halaman Masuk
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="reset-email" className="block text-sm font-medium text-foreground">
          Email Terdaftar
        </label>
        <input
          id="reset-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@tokoukm.id"
          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all duration-150 shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Mengirim instruksi...</span>
          </>
        ) : (
          <span>Kirim Tautan Pemulihan</span>
        )}
      </button>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onBackToLogin}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-3.5" /> Kembali ke Halaman Masuk
        </button>
      </div>
    </form>
  )
}

export default ForgotPasswordForm
