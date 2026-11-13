import { ShieldAlert, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/shared/constants/routes"

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

      <h1 className="text-2xl font-semibold leading-8 tracking-tight text-foreground">
        403 - Akses Ditolak
      </h1>

      <p className="mt-1 text-sm text-muted-foreground leading-5 max-w-md">
        Anda tidak memiliki izin (permission) yang cukup untuk mengakses halaman ini. Hubungi administrator sistem jika Anda membutuhkan akses ini.
      </p>

      {(requiredPermissions.length > 0 || requiredRoles.length > 0) && (
        <div className="mt-4 p-3 bg-muted/50 rounded-md text-xs font-mono text-left max-w-md w-full border border-border">
          {requiredPermissions.length > 0 && (
            <div className="mb-1">
              <span className="font-medium text-foreground">Required Permissions:</span>{" "}
              <span className="text-primary">{requiredPermissions.join(", ")}</span>
            </div>
          )}
          {requiredRoles.length > 0 && (
            <div>
              <span className="font-medium text-foreground">Required Roles:</span>{" "}
              <span className="text-primary">{requiredRoles.join(", ")}</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium border border-border rounded-md hover:bg-muted transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" /> Kembali
        </button>

        <button
          type="button"
          onClick={() => navigate(ROUTES.DEFAULT)}
          className="inline-flex items-center h-9 px-4 text-sm font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary-active transition-colors shadow-xs cursor-pointer"
        >
          Ke Dashboard
        </button>
      </div>
    </div>
  )
}
