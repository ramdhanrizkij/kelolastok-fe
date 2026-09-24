import type { RouteMeta } from "@/shared/types/route"
import type { User } from "@/features/auth/types/auth.types"
import { PERMISSIONS } from "@/shared/constants/permissions"

export interface GuardCheckResult {
  isAllowed: boolean
  reason?: "unauthenticated" | "unauthorized"
  missingPermissions?: string[]
  missingRoles?: string[]
}

/**
 * Memeriksa apakah user berhak mengakses rute berdasarkan metadata rute (RBAC)
 */
export function checkRouteAccess(
  meta: RouteMeta | undefined,
  user: User | null,
  isAuthenticated: boolean
): GuardCheckResult {
  const isProtected =
    meta?.isProtectedRoute ??
    Boolean(
      (meta?.permissions && meta.permissions.length > 0) ||
        (meta?.roles && meta.roles.length > 0)
    )

  // 1. Jika rute tidak butuh login/guard
  if (!isProtected) {
    return { isAllowed: true }
  }

  // 2. Jika belum terautentikasi
  if (!isAuthenticated || !user) {
    return { isAllowed: false, reason: "unauthenticated" }
  }

  // 3. Administrator / Super Admin bypass otomatis
  const isSuperAdmin =
    user.role === "Owner / Admin" ||
    user.role === "Super Admin" ||
    user.role?.toLowerCase() === "admin" ||
    user.permissions?.includes(PERMISSIONS.ALL)

  if (isSuperAdmin) {
    return { isAllowed: true }
  }

  // 4. Validasi Roles jika didefinisikan
  if (meta?.roles && meta.roles.length > 0) {
    const hasRole = meta.roles.includes(user.role)
    if (!hasRole) {
      return {
        isAllowed: false,
        reason: "unauthorized",
        missingRoles: meta.roles,
      }
    }
  }

  // 5. Validasi Permissions jika didefinisikan
  if (meta?.permissions && meta.permissions.length > 0) {
    const userPermissions = user.permissions || []
    const mode = meta.permissionMode ?? "all"

    const hasPermission =
      mode === "any"
        ? meta.permissions.some((perm) => userPermissions.includes(perm))
        : meta.permissions.every((perm) => userPermissions.includes(perm))

    if (!hasPermission) {
      const missing = meta.permissions.filter((p) => !userPermissions.includes(p))
      return {
        isAllowed: false,
        reason: "unauthorized",
        missingPermissions: missing.length > 0 ? missing : meta.permissions,
      }
    }
  }

  return { isAllowed: true }
}
