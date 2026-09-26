/**
 * Akses dan validasi Environment Variables aplikasi
 */
export const ENV = {
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,

  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "/api/v1",

  // Mock Service Worker
  ENABLE_MOCK:
    import.meta.env.VITE_ENABLE_MOCK === "true" ||
    (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCK !== "false"),

  // Application Details
  APP_NAME: "KelolaStok",
  DEFAULT_PATH: "/inventory/summary",
} as const

export default ENV
