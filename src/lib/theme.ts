import * as React from "react"

export type Theme = "light" | "dark"

export interface ThemeContextType {
  theme: Theme
  isDark: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

/**
 * Membaca cookie theme.
 * Jika belum ada cookie atau tidak valid, selalu default ke "light" (tidak mengikuti preferensi OS/sistem).
 */
export function getThemeCookie(): Theme {
  if (typeof document === "undefined") return "light"
  const match = document.cookie.match(/(?:^|;\s*)theme=([^;]+)/)
  if (match && (match[1] === "dark" || match[1] === "light")) {
    return match[1] as Theme
  }
  return "light"
}

/**
 * Menyimpan tema terpilih ke cookies dengan path=/ dan masa berlaku 1 tahun.
 */
export function setThemeCookie(theme: Theme) {
  if (typeof document === "undefined") return
  document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`
}
