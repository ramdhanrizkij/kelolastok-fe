import * as React from "react"
import { useLogin } from "../hooks/use-auth"
import { Eye, EyeOff, Loader2 } from "lucide-react"

interface LoginFormProps {
  onSuccess?: () => void
  onForgotPasswordClick?: () => void
  onRegisterClick?: () => void
}

export function LoginForm({
  onSuccess,
  onForgotPasswordClick,
  onRegisterClick,
}: LoginFormProps) {
  const [email, setEmail] = React.useState("owner@tokoukm.id")
  const [password, setPassword] = React.useState("rahasia123")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(true)

  const loginMutation = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          onSuccess?.()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Alert Error */}
      {loginMutation.isError && (
        <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in fade-in duration-200">
          {loginMutation.error.message}
        </div>
      )}

      {/* Input Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="auth-email"
          className="block text-sm font-medium text-foreground tracking-tight"
        >
          Email Bisnis / Username
        </label>
        <input
          id="auth-email"
          type="text"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@tokoukm.id"
          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
        />
      </div>

      {/* Input Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="auth-password"
            className="block text-sm font-medium text-foreground tracking-tight"
          >
            Kata Sandi
          </label>
          {onForgotPasswordClick && (
            <button
              type="button"
              onClick={onForgotPasswordClick}
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Lupa sandi?
            </button>
          )}
        </div>
        <div className="relative">
          <input
            id="auth-password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Sembunyikan sandi" : "Lihat sandi"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="remember-me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="rounded border-border text-primary focus:ring-primary/20 size-4 cursor-pointer"
        />
        <label
          htmlFor="remember-me"
          className="text-xs text-muted-foreground select-none cursor-pointer"
        >
          Ingat perangkat ini selama 30 hari
        </label>
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all duration-150 shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {loginMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Memverifikasi akun...</span>
          </>
        ) : (
          <span>Masuk ke Dashboard</span>
        )}
      </button>

      {/* Register link */}
      {onRegisterClick && (
        <div className="text-center text-xs text-muted-foreground pt-2">
          Belum memiliki akun KelolaStok?{" "}
          <button
            type="button"
            onClick={onRegisterClick}
            className="font-semibold text-primary hover:underline"
          >
            Daftar Sekarang
          </button>
        </div>
      )}
    </form>
  )
}

export default LoginForm
