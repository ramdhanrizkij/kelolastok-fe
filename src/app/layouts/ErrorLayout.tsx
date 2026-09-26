import type { ReactNode } from "react"
import { Outlet } from "react-router-dom"

interface ErrorLayoutProps {
  children?: ReactNode
}

export function ErrorLayout({ children }: ErrorLayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-muted/10 text-foreground">
      {children || <Outlet />}
    </div>
  )
}

export default ErrorLayout
