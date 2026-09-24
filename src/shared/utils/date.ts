/**
 * Utilitas pemformatan tanggal dan waktu standar Indonesia
 */

export function formatDate(date: string | number | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = new Date(date)
  if (isNaN(d.getTime())) return "-"
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  }).format(d)
}

export function formatDateTime(date: string | number | Date): string {
  return formatDate(date, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatRelativeTime(date: string | number | Date): string {
  const d = new Date(date)
  if (isNaN(d.getTime())) return "-"

  const now = Date.now()
  const diffInSeconds = Math.floor((now - d.getTime()) / 1000)

  if (diffInSeconds < 60) return "baru saja"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`
  return formatDate(d)
}
