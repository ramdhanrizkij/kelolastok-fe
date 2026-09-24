import { useLocation, Navigate } from "react-router-dom"
import { useAuthStore } from "@/store/use-auth-store"
import type { ReactNode } from "react"
import type { RouteMeta } from "../../types"
import Forbidden from "../Forbidden"

interface ProtectedRouteProps {
  children: ReactNode
  meta?: RouteMeta
  redirectTo?: string
}

/**
 * Komponen pembungkus untuk route guard (autentikasi dan validasi RBAC).
 *
 * 1. Autentikasi: Memastikan pengguna sudah login. Jika belum, diarahkan ke halaman login.
 * 2. RBAC (Role-Based Access Control):
 *    - Validasi daftar permission di `meta.permissions`.
 *    - Validasi daftar role di `meta.roles`.
 *    - Jika akses ditolak, menampilkan tampilan 403 Forbidden.
 */
export default function ProtectedRoute({
  children,
  meta,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const location = useLocation()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const user = useAuthStore((s) => s.user)

  // Token fallback check jika store belum hydrate
  const hasToken =
    typeof window !== "undefined" &&
    Boolean(localStorage.getItem("kelolastok_access_token"))

  const isUserAuthenticated = isAuthenticated || hasToken

  // 1. Cek autentikasi
  if (!isUserAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // 2. Cek Role & Permissions (RBAC) jika ada batasan pada metadata rute
  if (user) {
    // Role administrator default selalu memiliki bypass akses penuh
    const isSuperAdmin =
      user.role === "Owner / Admin" ||
      user.role === "Super Admin" ||
      user.role?.toLowerCase() === "admin"

    // Validasi Role jika ditentukan
    if (meta?.roles && meta.roles.length > 0 && !isSuperAdmin) {
      const hasAllowedRole = meta.roles.includes(user.role)
      if (!hasAllowedRole) {
        return <Forbidden requiredRoles={meta.roles} />
      }
    }

    // Validasi Permissions jika ditentukan
    if (meta?.permissions && meta.permissions.length > 0 && !isSuperAdmin) {
      const userPermissions = user.permissions || []
      const hasWildcard = userPermissions.includes("*")

      if (!hasWildcard) {
        const mode = meta.permissionMode ?? "all"
        const hasPermission =
          mode === "any"
            ? meta.permissions.some((perm) => userPermissions.includes(perm))
            : meta.permissions.every((perm) => userPermissions.includes(perm))

        if (!hasPermission) {
          return <Forbidden requiredPermissions={meta.permissions} />
        }
      }
    }
  }

  return <>{children}</>
}
