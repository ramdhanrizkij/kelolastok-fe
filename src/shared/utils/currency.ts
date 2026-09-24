/**
 * Utilitas pemformatan mata uang Rupiah
 */

export function formatCurrency(amount: number, options?: Intl.NumberFormatOptions): string {
  if (isNaN(amount)) return "Rp 0"
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    ...options,
  }).format(amount)
}

export function formatRupiah(amount: number): string {
  return formatCurrency(amount)
}

export function parseCurrency(value: string): number {
  const cleanNumber = value.replace(/[^0-9,-]/g, "").replace(",", ".")
  const parsed = parseFloat(cleanNumber)
  return isNaN(parsed) ? 0 : parsed
}
