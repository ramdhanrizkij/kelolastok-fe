export const THEME_VARIANTS = [
  { value: "blue", label: "Biru", color: "#0F6AE8", activeColor: "#086DE3" },
  { value: "red", label: "Merah", color: "#E5484D", activeColor: "#D13438" },
  { value: "green", label: "Hijau", color: "#16A66A", activeColor: "#0E8C58" },
  { value: "orange", label: "Orange", color: "#F07818", activeColor: "#D9630D" },
] as const

export type ThemeVariant = (typeof THEME_VARIANTS)[number]["value"]

export type SidebarLayout = "single" | "dual"

export const THEME_CONFIG = {
  defaultVariant: "blue" as ThemeVariant,
  defaultThemedSidebar: false,
  defaultSidebarLayout: "single" as SidebarLayout,
  storageKey: "kelolastok-theme-preferences",
}

