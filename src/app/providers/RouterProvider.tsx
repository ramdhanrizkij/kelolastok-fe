import { RouterProvider as BaseRouterProvider } from "react-router-dom"
import { router } from "@/app/router"

export function RouterProvider() {
  return <BaseRouterProvider router={router} />
}

export default RouterProvider
