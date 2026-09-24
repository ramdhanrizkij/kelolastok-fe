import {
  type ComponentType,
  createElement,
  isValidElement,
  Suspense,
  type ReactNode,
} from "react"
import { Navigate, Outlet } from "react-router-dom"
import type { AppRoute } from "../../types"
import ProtectedRoute from "../ProtectedRoute"
import LoadingFallback from "../LoadingFallback"

interface GetElementProps {
  route: AppRoute
}

/**
 * Helper untuk merender komponen rute secara andal:
 * - Jika sudah berupa ReactElement (JSX): return langsung
 * - Jika berupa ComponentType (Function, Class, atau React.lazy): gunakan createElement
 */
function renderRouteElement(element: unknown): ReactNode {
  if (!element) return null
  if (isValidElement(element)) {
    return element
  }
  // Menangani functional component, class component, dan React.lazy() object
  return createElement(element as ComponentType<any>)
}

/**
 * GetElement Component
 *
 * Menerjemahkan konfigurasi route menjadi React Element yang sesuai.
 * Menangani:
 * - Group routes (merender layout element pembungkus atau default Outlet)
 * - Redirect routes (mengalihkan ke rute tujuan)
 * - Page routes (merender komponen dengan Suspense dan ProtectedRoute untuk validasi RBAC & login)
 */
export default function GetElement({ route }: GetElementProps) {
  // 1. Group routes - render layout element atau default Outlet untuk rute bersarang
  if (route.type === "group") {
    if (route.element) {
      const content = renderRouteElement(route.element)
      return <Suspense fallback={<LoadingFallback />}>{content}</Suspense>
    }
    return <Outlet />
  }

  // 2. Redirect routes - mengalihkan ke target path yang ditentukan di meta
  if (route.type === "redirect") {
    const to = route.meta?.redirection ?? "/"
    return <Navigate to={to} replace />
  }

  // 3. Page routes - memuat halaman dengan lazy Suspense dan guard keamanan
  if (route.type === "page") {
    const renderedContent = renderRouteElement(route.element)

    // Bungkus dengan Suspense untuk penanganan lazy loading
    const suspendedElement = (
      <Suspense fallback={<LoadingFallback />}>{renderedContent}</Suspense>
    )

    // Periksa apakah rute memerlukan proteksi autentikasi atau izin RBAC
    const isProtected =
      route.meta?.isProtectedRoute ??
      Boolean(
        (route.meta?.permissions && route.meta.permissions.length > 0) ||
          (route.meta?.roles && route.meta.roles.length > 0)
      )

    if (isProtected) {
      return (
        <ProtectedRoute meta={route.meta} redirectTo="/login">
          {suspendedElement}
        </ProtectedRoute>
      )
    }

    return suspendedElement
  }

  return null
}
