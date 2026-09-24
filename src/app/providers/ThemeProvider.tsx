import type { ReactNode } from "react"
import { ThemeProvider as BaseThemeProvider } from "@/components/theme-provider"

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <BaseThemeProvider>{children}</BaseThemeProvider>
}

export default ThemeProvider
