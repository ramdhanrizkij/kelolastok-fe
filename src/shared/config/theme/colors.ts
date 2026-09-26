/**
 * Color Design Tokens
 * Berdasarkan centralized Figma color styles and palette library (Light & Dark theme).
 */

export interface ColorRole {
  default: string
  active?: string
  accent?: string
  transparent?: string
  soft: string
}

export const LIGHT_COLORS = {
  primary: {
    default: "#1378F0",
    active: "#086DE3",
    accent: "#0D4894",
    transparent: "rgba(19, 120, 240, 0.15)",
    soft: "#E7F2FF",
  },
  success: {
    default: "#0BC33F",
    active: "#06B838",
    accent: "#085C22",
    transparent: "rgba(11, 195, 63, 0.15)",
    soft: "#E1FCE9",
  },
  danger: {
    default: "#ED143B",
    active: "#D80D31",
    accent: "#991930",
    transparent: "rgba(237, 20, 59, 0.15)",
    soft: "#FFEAEE",
  },
  info: {
    default: "#4921EA",
    active: "#3D17D4",
    accent: "#271086",
    transparent: "rgba(73, 33, 234, 0.15)",
    soft: "#F0ECFF",
  },
  warning: {
    default: "#FEC524",
    active: "#F3B70F",
    accent: "#888800",
    transparent: "rgba(254, 197, 36, 0.2)",
    soft: "#FFFAE9",
  },
  dark: {
    default: "#000000",
    active: "#1C1F26",
    transparent: "rgba(0, 0, 0, 0.3)",
    soft: "#F6F6F6",
  },
  light: {
    default: "#FFFFFF",
    active: "#FAFAFA",
    transparent: "rgba(255, 255, 255, 0.7)",
    soft: "#FDFDFD",
  },
  greys: {
    50: "#F9F9F9",
    100: "#F0F1F6",
    200: "#E2E4ED",
    300: "#D8DFE9",
    400: "#C9CEDA",
    500: "#A4ABBF",
    600: "#78829D",
    700: "#485675",
    800: "#27314B",
    900: "#111B37",
    950: "#030A1E",
  },
} as const

export const DARK_COLORS = {
  primary: {
    default: "#1378F0",
    active: "#2D8EFF",
    accent: "#1378F0",
    transparent: "rgba(19, 120, 240, 0.2)",
    soft: "#0A1726",
  },
  success: {
    default: "#0BC33F",
    active: "#24DB5B",
    accent: "#0BC33F",
    transparent: "rgba(11, 195, 63, 0.2)",
    soft: "#0A2412",
  },
  danger: {
    default: "#ED143B",
    active: "#FF2F54",
    accent: "#ED143B",
    transparent: "rgba(237, 20, 59, 0.2)",
    soft: "#2B0D13",
  },
  info: {
    default: "#521AF2",
    active: "#6129FF",
    accent: "#7241FF",
    transparent: "rgba(114, 65, 255, 0.25)",
    soft: "#1A0E3D",
  },
  warning: {
    default: "#FEC524",
    active: "#FFD96C",
    accent: "#FEC524",
    transparent: "rgba(254, 197, 36, 0.2)",
    soft: "#2B2004",
  },
  dark: {
    default: "#FFFFFF",
    active: "#DFDFDF",
    transparent: "rgba(55, 55, 55, 0.3)",
    soft: "#F9F9F9",
  },
  light: {
    default: "#0A0A0D",
    active: "#0E0E10",
    transparent: "rgba(10, 10, 13, 0.7)",
    soft: "#0F0F12",
  },
  greys: {
    50: "#141419",
    100: "#1B1C22",
    200: "#26272F",
    300: "#363843",
    400: "#464852",
    500: "#636674",
    600: "#808293",
    700: "#9A9CAE",
    800: "#B5B7C8",
    900: "#DBDCE4",
    950: "#F5F5F5",
  },
} as const

export type ColorPalette = typeof LIGHT_COLORS
