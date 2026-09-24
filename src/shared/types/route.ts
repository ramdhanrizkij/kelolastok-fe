import type { ComponentType, LazyExoticComponent, ReactNode } from "react"

export type RouteType = "page" | "group" | "redirect"

export interface RouteMeta {
  /** Membutuhkan login/autentikasi */
  isProtectedRoute?: boolean

  /** Daftar permissions RBAC yang disyaratkan */
  permissions?: string[]

  /** Mode validasi permissions: 'all' (default) atau 'any' */
  permissionMode?: "all" | "any"

  /** Daftar role yang diizinkan */
  roles?: string[]

  /** Target path pengalihan untuk type 'redirect' */
  redirection?: string

  /** Judul halaman */
  title?: string

  [key: string]: unknown
}

export interface AppRoute {
  name?: string
  path?: string
  type: RouteType
  element?: ComponentType<any> | LazyExoticComponent<any> | ReactNode
  index?: boolean
  children?: AppRoute[]
  meta?: RouteMeta
  errorElement?: ReactNode
}
