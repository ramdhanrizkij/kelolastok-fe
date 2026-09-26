import type { ReactNode } from "react"
import { useProfile } from "@/features/auth/hooks/use-auth"

interface AuthProviderProps {
  children: ReactNode
}

/**
 * Provider untuk inisialisasi sesi autentikasi dan sinkronisasi profile data
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // Sync profile jika user authenticated
  useProfile()

  return <>{children}</>
}

export default AuthProvider
