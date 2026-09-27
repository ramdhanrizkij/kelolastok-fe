export const THEME_VARIANTS = [
  { value: "blue", label: "Biru", color: "#1378F0", activeColor: "#086DE3" },
  { value: "red", label: "Merah", color: "#E5484D", activeColor: "#D13438" },
  { value: "green", label: "Hijau", color: "#16A66A", activeColor: "#0E8C58" },
  { value: "orange", label: "Orange", color: "#F07818", activeColor: "#D9630D" },
] as const

export type ThemeVariant = (typeof THEME_VARIANTS)[number]["value"]

export const THEME_CONFIG = {
  defaultVariant: "blue" as ThemeVariant,
  defaultThemedSidebar: false,
  storageKey: "kelolastok-theme-preferences",
}
