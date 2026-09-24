import * as React from "react"
import {
  Search,
  FileText,
  SquareCode,
  ChevronRight,
  LayoutDashboard,
  Bell,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Sparkles,
  Layers,
  LogIn,
  UserPlus,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { cn } from "cn"

export interface SearchItem {
  id: string
  title: string
  category: "Recommended" | "Navigation" | "Components" | "Settings"
  icon: React.ComponentType<{ className?: string }>
  iconColor?: string
  iconBg?: string
  url?: string
  description?: string
}

const defaultItems: SearchItem[] = [
  // Quick / Recommended KelolaStok items
  {
    id: "stock-summary",
    title: "Stock Summary",
    category: "Recommended",
    icon: Package,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    url: "/inventory/summary",
    description: "Ringkasan ketersediaan seluruh stok barang & nilai aset",
  },
  {
    id: "low-stock",
    title: "Low Stock Alerts",
    category: "Recommended",
    icon: Bell,
    iconColor: "text-red-500 dark:text-red-400",
    iconBg: "bg-red-500/10 dark:bg-red-500/20",
    url: "/inventory/alerts",
    description: "5 produk stok menipis butuh perhatian segera",
  },
  {
    id: "purchase-orders",
    title: "Purchase Orders (PO)",
    category: "Recommended",
    icon: ShoppingCart,
    iconColor: "text-blue-500 dark:text-blue-400",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    url: "/inbound/purchase-orders",
    description: "Pesanan pembelian barang ke supplier",
  },
  // Inventory & Stock
  {
    id: "item-catalog",
    title: "Item Catalog",
    category: "Navigation",
    icon: Package,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    url: "/inventory/catalog",
    description: "Katalog produk, SKU, barcode, dan varian",
  },
  {
    id: "stock-opname",
    title: "Stock Opname",
    category: "Navigation",
    icon: Layers,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    url: "/inventory/opname",
    description: "Pencatatan fisik stok berkala dan rekonsiliasi",
  },
  {
    id: "stock-transfer",
    title: "Stock Transfer",
    category: "Navigation",
    icon: Sparkles,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    url: "/inventory/transfer",
    description: "Mutasi dan pemindahan stok antar gudang atau cabang",
  },
  {
    id: "batch-tracking",
    title: "Serial & Batch Tracking",
    category: "Navigation",
    icon: SquareCode,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    url: "/inventory/batches",
    description: "Pelacakan nomor batch produksi dan serial unik",
  },
  // Inbound & Outbound
  {
    id: "receiving",
    title: "Goods Received (GRN)",
    category: "Navigation",
    icon: Package,
    iconColor: "text-blue-500 dark:text-blue-400",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    url: "/inbound/receiving",
    description: "Penerimaan fisik barang masuk di gudang",
  },
  {
    id: "supplier-returns",
    title: "Supplier Returns",
    category: "Navigation",
    icon: FileText,
    iconColor: "text-blue-500 dark:text-blue-400",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    url: "/inbound/returns",
    description: "Pengembalian barang rusak ke supplier",
  },
  {
    id: "sales-orders",
    title: "Sales Orders",
    category: "Navigation",
    icon: ShoppingCart,
    iconColor: "text-indigo-500 dark:text-indigo-400",
    iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    url: "/outbound/sales-orders",
    description: "Daftar pesanan penjualan pelanggan",
  },
  {
    id: "picking-packing",
    title: "Picking & Packing",
    category: "Navigation",
    icon: Layers,
    iconColor: "text-indigo-500 dark:text-indigo-400",
    iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    url: "/outbound/picking",
    description: "Pengambilan dan pengemasan pesanan keluar",
  },
  {
    id: "deliveries",
    title: "Delivery Orders (DO)",
    category: "Navigation",
    icon: FileText,
    iconColor: "text-indigo-500 dark:text-indigo-400",
    iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    url: "/outbound/deliveries",
    description: "Surat jalan dan resi pengiriman kurir",
  },
  {
    id: "customer-returns",
    title: "Customer Returns",
    category: "Navigation",
    icon: FileText,
    iconColor: "text-indigo-500 dark:text-indigo-400",
    iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    url: "/outbound/returns",
    description: "Verifikasi retur barang dari pelanggan",
  },
  // Warehouse & Locations
  {
    id: "warehouse-list",
    title: "Warehouse List",
    category: "Navigation",
    icon: LayoutDashboard,
    iconColor: "text-amber-500 dark:text-amber-400",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
    url: "/warehouses/list",
    description: "Daftar fisik lokasi gudang penyimpanan",
  },
  {
    id: "zones-layout",
    title: "Zones & Racks Layout",
    category: "Navigation",
    icon: Layers,
    iconColor: "text-amber-500 dark:text-amber-400",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
    url: "/warehouses/layout",
    description: "Denah tata letak zona, lorong, dan rak gudang",
  },
  {
    id: "capacity-space",
    title: "Capacity & Space",
    category: "Navigation",
    icon: LayoutDashboard,
    iconColor: "text-amber-500 dark:text-amber-400",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
    url: "/warehouses/capacity",
    description: "Analisis utilisasi ruang dan volume penyimpanan",
  },
  // Contacts & Vendors
  {
    id: "suppliers",
    title: "Suppliers & Vendors",
    category: "Navigation",
    icon: Users,
    iconColor: "text-purple-500 dark:text-purple-400",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
    url: "/contacts/suppliers",
    description: "Daftar vendor dan kontak supplier",
  },
  {
    id: "customers",
    title: "Customers",
    category: "Navigation",
    icon: Users,
    iconColor: "text-purple-500 dark:text-purple-400",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
    url: "/contacts/customers",
    description: "Data pelanggan B2B dan ritel",
  },
  {
    id: "couriers",
    title: "Couriers / Logistics",
    category: "Navigation",
    icon: Users,
    iconColor: "text-purple-500 dark:text-purple-400",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
    url: "/contacts/couriers",
    description: "Mitra ekspedisi dan kurir logistik",
  },
  // Reports & Analytics
  {
    id: "stock-valuation",
    title: "Stock Valuation",
    category: "Navigation",
    icon: LayoutDashboard,
    iconColor: "text-teal-500 dark:text-teal-400",
    iconBg: "bg-teal-500/10 dark:bg-teal-500/20",
    url: "/reports/valuation",
    description: "Valuasi nilai aset persediaan (FIFO / Average)",
  },
  {
    id: "turnover",
    title: "Inventory Turnover",
    category: "Navigation",
    icon: LayoutDashboard,
    iconColor: "text-teal-500 dark:text-teal-400",
    iconBg: "bg-teal-500/10 dark:bg-teal-500/20",
    url: "/reports/turnover",
    description: "Rasio perputaran stok dan hari persediaan",
  },
  {
    id: "movements",
    title: "Movement History",
    category: "Navigation",
    icon: LayoutDashboard,
    iconColor: "text-teal-500 dark:text-teal-400",
    iconBg: "bg-teal-500/10 dark:bg-teal-500/20",
    url: "/reports/movements",
    description: "Kartu stok dan riwayat seluruh mutasi barang",
  },
  {
    id: "dead-stock",
    title: "Dead Stock Analysis",
    category: "Navigation",
    icon: LayoutDashboard,
    iconColor: "text-red-500 dark:text-red-400",
    iconBg: "bg-red-500/10 dark:bg-red-500/20",
    url: "/reports/dead-stock",
    description: "Identifikasi produk slow-moving & stok mati",
  },
  // Settings
  {
    id: "categories",
    title: "Categories & Units (UOM)",
    category: "Settings",
    icon: Settings,
    iconColor: "text-zinc-500 dark:text-zinc-400",
    iconBg: "bg-zinc-500/10 dark:bg-zinc-500/20",
    url: "/settings/categories",
    description: "Konfigurasi kategori dan unit satuan barang",
  },
  {
    id: "roles",
    title: "User Roles & Access",
    category: "Settings",
    icon: Settings,
    iconColor: "text-zinc-500 dark:text-zinc-400",
    iconBg: "bg-zinc-500/10 dark:bg-zinc-500/20",
    url: "/settings/roles",
    description: "Pengaturan hak akses pengguna dan peran staf",
  },
  {
    id: "reorder-rules",
    title: "Reorder Automation",
    category: "Settings",
    icon: Settings,
    iconColor: "text-zinc-500 dark:text-zinc-400",
    iconBg: "bg-zinc-500/10 dark:bg-zinc-500/20",
    url: "/settings/reorder-rules",
    description: "Aturan batas otomatisasi pemesanan ulang (ROP)",
  },
  {
    id: "integrations",
    title: "Integrations & API",
    category: "Settings",
    icon: Settings,
    iconColor: "text-zinc-500 dark:text-zinc-400",
    iconBg: "bg-zinc-500/10 dark:bg-zinc-500/20",
    url: "/settings/integrations",
    description: "Koneksi marketplace, webhook, dan kunci API",
  },
  {
    id: "login",
    title: "Halaman Login (Sign In)",
    category: "Navigation",
    icon: LogIn,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    url: "/login",
    description: "Masuk ke sistem inventori KelolaStok UMKM",
  },
  {
    id: "register",
    title: "Halaman Registrasi (Daftar Akun)",
    category: "Navigation",
    icon: UserPlus,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    url: "/register",
    description: "Buat akun baru untuk toko & inventori UMKM Anda",
  },
]

export interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect?: (item: SearchItem) => void
}

export function SearchModal({ open, onOpenChange, onSelect }: SearchModalProps) {
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Reset query and focus input when modal opens
  React.useEffect(() => {
    if (open) {
      setQuery("")
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [open])

  const filteredItems = React.useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) {
      return defaultItems.filter((item) => item.category === "Recommended")
    }
    return defaultItems.filter(
      (item) =>
        item.title.toLowerCase().includes(trimmed) ||
        item.description?.toLowerCase().includes(trimmed) ||
        item.category.toLowerCase().includes(trimmed)
    )
  }, [query])

  const handleItemClick = (item: SearchItem) => {
    onSelect?.(item)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "top-[15%] sm:top-[20%] -translate-y-0",
          "w-full max-w-[calc(100%-2rem)] sm:max-w-xl md:max-w-xl",
          "gap-0 p-0 overflow-hidden rounded-2xl border border-border/70 bg-popover shadow-2xl"
        )}
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">
          Search documentation, components, and pages
        </DialogDescription>

        {/* Input Bar */}
        <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3 sm:px-5">
          <Search className="size-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent text-[15px] font-normal text-foreground placeholder:text-muted-foreground/80 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            title="Close (Esc)"
            className="inline-flex items-center justify-center rounded-md border border-border/80 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground shadow-2xs hover:bg-muted/80 hover:text-foreground transition-colors cursor-pointer select-none"
          >
            Esc
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5">
          <div className="mb-3 px-1 text-sm font-bold text-foreground">
            {query.trim() ? "Search Results" : "Recommended"}
          </div>

          {filteredItems.length > 0 ? (
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-0.5">
              {filteredItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className="group flex w-full items-center justify-between rounded-xl bg-muted/40 hover:bg-muted/80 p-3 text-left transition-colors cursor-pointer border border-transparent hover:border-border/40"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-lg shadow-2xs",
                          item.iconBg ?? "bg-red-500/10 dark:bg-red-500/20",
                          item.iconColor ?? "text-red-500 dark:text-red-400"
                        )}
                      >
                        <Icon className="size-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-foreground truncate">
                          {item.title}
                        </span>
                        {query.trim() && item.description && (
                          <span className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <Sparkles className="size-8 mb-2 text-muted-foreground/50" />
              <p className="text-sm font-medium text-foreground">
                No results found
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Could not find anything matching &ldquo;{query}&rdquo;
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal
