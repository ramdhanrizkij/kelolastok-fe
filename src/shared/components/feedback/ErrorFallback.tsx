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

      <h1 className="text-2xl font-semibold leading-8 tracking-tight text-foreground">
        Terjadi Kesalahan
      </h1>

      <p className="mt-1 text-sm text-muted-foreground leading-5 max-w-md">
        {error?.message || "Halaman mengalami gangguan yang tidak terduga. Silakan coba muat ulang."}
      </p>

      <div className="mt-6 flex items-center justify-center">
        <button
          type="button"
          onClick={() => (resetErrorBoundary ? resetErrorBoundary() : window.location.reload())}
          className="inline-flex items-center gap-2 h-9 px-4 text-sm font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary-active transition-colors shadow-xs cursor-pointer"
        >
          <RotateCcw className="size-4" /> Muat Ulang Halaman
        </button>
      </div>
    </div>
  )
}
