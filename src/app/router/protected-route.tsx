import type { ReactNode } from "react"
import { useLocation, Navigate } from "react-router-dom"
import { useAuthStore } from "@/features/auth/stores/auth.store"
import type { RouteMeta } from "@/shared/types/route"
import { checkRouteAccess } from "./route-guards"
import Forbidden from "@/shared/components/feedback/Forbidden"
import { TOKEN_KEY } from "@/shared/lib/axios"
import { ROUTES } from "@/shared/constants/routes"

interface ProtectedRouteProps {
  children: ReactNode
  meta?: RouteMeta
  redirectTo?: string
}

/**
 * Route guard component untuk autentikasi dan validasi RBAC
 */
export default function ProtectedRoute({
  children,
  meta,
  redirectTo = ROUTES.LOGIN,
}: ProtectedRouteProps) {
  const location = useLocation()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const user = useAuthStore((s) => s.user)

  // Token fallback check
  const hasToken =
    typeof window !== "undefined" && Boolean(localStorage.getItem(TOKEN_KEY))

  const isUserAuthenticated = isAuthenticated || hasToken

  const result = checkRouteAccess(meta, user, isUserAuthenticated)

  if (!result.isAllowed) {
    if (result.reason === "unauthenticated") {
      return <Navigate to={redirectTo} state={{ from: location }} replace />
    }

    if (result.reason === "unauthorized") {
      return (
        <Forbidden
          requiredPermissions={result.missingPermissions}
          requiredRoles={result.missingRoles}
        />
      )
    }
  }

  return <>{children}</>
}
