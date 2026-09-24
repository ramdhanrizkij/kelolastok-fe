import type { ReactNode } from "react"
import { Outlet } from "react-router-dom"

interface AuthLayoutProps {
  children?: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {children || <Outlet />}
    </div>
  )
}

export default AuthLayout
