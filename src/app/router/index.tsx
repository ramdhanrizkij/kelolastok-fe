import {
  createBrowserRouter,
  Navigate,
  Outlet,
  type RouteObject,
} from "react-router-dom"
import {
  type ComponentType,
  createElement,
  isValidElement,
  Suspense,
  type ReactNode,
} from "react"
import type { AppRoute } from "@/shared/types/route"
import routes from "./routes"
import ProtectedRoute from "./protected-route"
import LoadingFallback from "@/shared/components/feedback/LoadingFallback"

export * from "./routes"
export * from "./protected-route"
export * from "./route-guards"

function renderRouteElement(element: unknown): ReactNode {
  if (!element) return null
  if (isValidElement(element)) {
    return element
  }
  return createElement(element as ComponentType<any>)
}

function GetElement({ route }: { route: AppRoute }) {
  if (route.type === "group") {
    if (route.element) {
      const content = renderRouteElement(route.element)
      return <Suspense fallback={<LoadingFallback />}>{content}</Suspense>
    }
    return <Outlet />
  }

  if (route.type === "redirect") {
    const to = route.meta?.redirection ?? "/"
    return <Navigate to={to} replace />
  }

  if (route.type === "page") {
    const renderedContent = renderRouteElement(route.element)
    const suspendedElement = (
      <Suspense fallback={<LoadingFallback />}>{renderedContent}</Suspense>
    )

    const isProtected =
      route.meta?.isProtectedRoute ??
      Boolean(
        (route.meta?.permissions && route.meta.permissions.length > 0) ||
          (route.meta?.roles && route.meta.roles.length > 0)
      )

    if (isProtected) {
      return (
        <ProtectedRoute meta={route.meta}>
          {suspendedElement}
        </ProtectedRoute>
      )
    }

    return suspendedElement
  }

  return null
}

export function routeMapper(routeList: AppRoute[]): RouteObject[] {
  return routeList.map((route): RouteObject => {
    const element = <GetElement route={route} />

    if (route.index) {
      return {
        index: true,
        element,
        ...(route.errorElement ? { errorElement: route.errorElement } : {}),
      }
    }

    if (route.type === "group" && route.children?.length) {
      return {
        ...(route.path !== undefined ? { path: route.path } : {}),
        element,
        children: routeMapper(route.children),
        ...(route.errorElement ? { errorElement: route.errorElement } : {}),
      }
    }

    return {
      ...(route.path !== undefined ? { path: route.path } : {}),
      element,
      ...(route.children?.length ? { children: routeMapper(route.children) } : {}),
      ...(route.errorElement ? { errorElement: route.errorElement } : {}),
    }
  })
}

export const router = createBrowserRouter(routeMapper(routes))
export default router
