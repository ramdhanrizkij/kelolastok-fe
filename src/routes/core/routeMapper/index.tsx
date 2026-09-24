import type { RouteObject } from "react-router-dom"
import type { AppRoute } from "../../types"
import GetElement from "../GetElement"

/**
 * Memetakan definisi custom AppRoute ke format RouteObject standar react-router-dom.
 * Menangani secara rekursif:
 * - Index routes
 * - Group routes dengan rute anak (children)
 * - Page routes & redirect routes
 */
export const routeMapper = (routes: AppRoute[]): RouteObject[] => {
  return routes.map((route): RouteObject => {
    const element = <GetElement route={route} />

    // Handle index route
    if (route.index) {
      return {
        index: true,
        element,
        ...(route.errorElement ? { errorElement: route.errorElement } : {}),
      }
    }

    // Handle group route with nested children
    if (route.type === "group" && route.children?.length) {
      return {
        ...(route.path !== undefined ? { path: route.path } : {}),
        element,
        children: routeMapper(route.children),
        ...(route.errorElement ? { errorElement: route.errorElement } : {}),
      }
    }

    // Handle page or redirect route (beserta children jika ada)
    return {
      ...(route.path !== undefined ? { path: route.path } : {}),
      element,
      ...(route.children?.length ? { children: routeMapper(route.children) } : {}),
      ...(route.errorElement ? { errorElement: route.errorElement } : {}),
    }
  })
}

export default routeMapper
