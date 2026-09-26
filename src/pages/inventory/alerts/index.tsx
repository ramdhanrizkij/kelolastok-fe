import { PagePlaceholder } from "@/shared/components/feedback/page-placeholder"

export default function LowStockAlertsPage() {
  return (
    <PagePlaceholder
      title="Low Stock Alerts"
      description="Peringatan dini untuk produk dengan kuantitas stok di bawah batas minimum (reorder point)."
      section="Inventory & Stock"
      subGroup="Stock Management"
      badge="5"
    />
  )
}
