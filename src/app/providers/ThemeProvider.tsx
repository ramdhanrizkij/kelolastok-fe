import * as React from "react"
import {
  getThemeCookie,
  setThemeCookie,
  ThemeContext,
  type Theme,
} from "@/shared/lib/theme"
import {
  THEME_CONFIG,
  THEME_VARIANTS,
  type ThemeVariant,
} from "@/shared/config/theme.config"

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    return getThemeCookie()
  })
  const [preferences, setPreferences] = React.useState(() => {
    const fallback = {
      variant: THEME_CONFIG.defaultVariant,
      themedSidebar: THEME_CONFIG.defaultThemedSidebar,
    }
    try {
      const saved = JSON.parse(localStorage.getItem(THEME_CONFIG.storageKey) || "null") as Partial<typeof fallback> | null
      const validVariant = THEME_VARIANTS.some((item) => item.value === saved?.variant)
      return {
        variant: validVariant ? saved!.variant as ThemeVariant : fallback.variant,
        themedSidebar: typeof saved?.themedSidebar === "boolean" ? saved.themedSidebar : fallback.themedSidebar,
      }
    } catch {
      return fallback
    }
  })

  // Sinkronisasi kelas 'dark' pada element <html> dan simpan ke cookie saat theme berubah
  React.useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    setThemeCookie(theme)
  }, [theme])

  React.useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.themeVariant = preferences.variant
    root.dataset.themedSidebar = String(preferences.themedSidebar)
    localStorage.setItem(THEME_CONFIG.storageKey, JSON.stringify(preferences))
  }, [preferences])

  const setTheme = React.useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
  }, [])

  const toggleTheme = React.useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"))
  }, [])

  const value = React.useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      variant: preferences.variant,
      themedSidebar: preferences.themedSidebar,
      setTheme,
      setVariant: (variant: ThemeVariant) => setPreferences((current) => ({ ...current, variant })),
      setThemedSidebar: (themedSidebar: boolean) => setPreferences((current) => ({ ...current, themedSidebar })),
      toggleTheme,
    }),
    [theme, preferences, setTheme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
