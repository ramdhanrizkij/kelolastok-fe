import type { ReactNode } from "react"
import QueryProvider from "./QueryProvider"
import ThemeProvider from "./ThemeProvider"
import AuthProvider from "./AuthProvider"
import RouterProvider from "./RouterProvider"

interface AppProvidersProps {
  children?: ReactNode
}

/**
 * Root AppProviders yang menggabungkan seluruh context provider aplikasi:
 * - QueryProvider (TanStack React Query & Devtools)
 * - ThemeProvider (Dark/Light mode)
 * - AuthProvider (Sinkronisasi sesi & profile auth)
 * - RouterProvider (React Router Data API)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          {children ?? <RouterProvider />}
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}

export default AppProviders
