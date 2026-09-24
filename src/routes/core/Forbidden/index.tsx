import { ShieldAlert, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface ForbiddenProps {
  requiredPermissions?: string[]
  requiredRoles?: string[]
}

export default function Forbidden({
  requiredPermissions = [],
  requiredRoles = [],
}: ForbiddenProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-4 mb-4 text-destructive">
        <ShieldAlert className="w-12 h-12" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        403 - Akses Ditolak
      </h1>

      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        Anda tidak memiliki izin (permission) yang cukup untuk mengakses halaman ini. Hubungi administrator sistem jika Anda membutuhkan akses ini.
      </p>

      {(requiredPermissions.length > 0 || requiredRoles.length > 0) && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs font-mono text-left max-w-md w-full border border-border">
          {requiredPermissions.length > 0 && (
            <div className="mb-1">
              <span className="font-semibold text-foreground">Required Permissions:</span>{" "}
              <span className="text-primary">{requiredPermissions.join(", ")}</span>
            </div>
          )}
          {requiredRoles.length > 0 && (
            <div>
              <span className="font-semibold text-foreground">Required Roles:</span>{" "}
              <span className="text-primary">{requiredRoles.join(", ")}</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-md hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <button
          type="button"
          onClick={() => navigate("/inventory/summary")}
          className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors shadow-sm"
        >
          Ke Dashboard
        </button>
      </div>
    </div>
  )
}
