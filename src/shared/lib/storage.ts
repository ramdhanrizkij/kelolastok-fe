/**
 * Helper pembungkus localStorage yang aman dari SSR dan kegagalan JSON parsing
 */
export const storage = {
  get<T>(key: string, fallback: T | null = null): T | null {
    if (typeof window === "undefined") return fallback
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : fallback
    } catch {
      return fallback
    }
  },

  getString(key: string, fallback: string | null = null): string | null {
    if (typeof window === "undefined") return fallback
    return localStorage.getItem(key) || fallback
  },

  set(key: string, value: unknown): void {
    if (typeof window === "undefined") return
    try {
      const serialized = typeof value === "string" ? value : JSON.stringify(value)
      localStorage.setItem(key, serialized)
    } catch (e) {
      console.error(`Error saving to localStorage key "${key}":`, e)
    }
  },

  remove(key: string): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  },

  clear(): void {
    if (typeof window === "undefined") return
    localStorage.clear()
  },
}
