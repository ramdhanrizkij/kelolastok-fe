import { useCurrentUser } from "./use-auth"
import { PERMISSIONS } from "@/shared/constants/permissions"

/**
 * Hook utilitas RBAC untuk memeriksa izin (permission) dan peran (role) pengguna.
 */
export function usePermission() {
  const user = useCurrentUser()

  const isSuperAdmin = Boolean(
    user &&
      (user.role === "Owner / Admin" ||
        user.role === "Super Admin" ||
        user.role?.toLowerCase() === "admin" ||
        user.permissions?.includes(PERMISSIONS.ALL))
  )

  const userPermissions = user?.permissions || []

  /**
   * Cek apakah user memiliki satu permission tertentu
   */
  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    if (isSuperAdmin) return true
    return userPermissions.includes(permission)
  }

  /**
   * Cek apakah user memiliki SEMUA permission dari daftar yang diberikan
   */
  const hasAllPermissions = (permissions: string[]): boolean => {
    if (!user) return false
    if (isSuperAdmin) return true
    if (!permissions.length) return true
    return permissions.every((perm) => userPermissions.includes(perm))
  }

  /**
   * Cek apakah user memiliki SALAH SATU permission dari daftar yang diberikan
   */
  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!user) return false
    if (isSuperAdmin) return true
    if (!permissions.length) return true
    return permissions.some((perm) => userPermissions.includes(perm))
  }

  /**
   * Cek apakah user memiliki salah satu role dari daftar yang diberikan
   */
  const hasRole = (roleOrRoles: string | string[]): boolean => {
    if (!user) return false
    if (isSuperAdmin) return true
    const roles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles]
    return roles.includes(user.role)
  }

  return {
    user,
    userRole: user?.role,
    userPermissions,
    isSuperAdmin,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    hasRole,
  }
}

export default usePermission
