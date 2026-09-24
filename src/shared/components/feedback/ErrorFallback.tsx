import { AlertTriangle, RotateCcw } from "lucide-react"

interface ErrorFallbackProps {
  error?: Error | null
  resetErrorBoundary?: () => void
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-4 mb-4 text-destructive">
        <AlertTriangle className="w-12 h-12" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Terjadi Kesalahan
      </h1>

      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        {error?.message || "Halaman mengalami gangguan yang tidak terduga. Silakan coba muat ulang."}
      </p>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => (resetErrorBoundary ? resetErrorBoundary() : window.location.reload())}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> Muat Ulang Halaman
        </button>
      </div>
    </div>
  )
}
