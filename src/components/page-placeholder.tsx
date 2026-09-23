import * as React from "react"
import {
  Search,
  Filter,
  Download,
  Plus,
  Boxes,
  Clock,
  ChevronRight,
  Eye,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface StatItem {
  label: string
  value: string | number
  change?: string
  trend?: "up" | "down" | "neutral"
}

interface PagePlaceholderProps {
  title: string
  description: string
  section?: string
  subGroup?: string
  badge?: string
  stats?: StatItem[]
  tableColumns?: string[]
  tableRows?: Array<Record<string, string | React.ReactNode>>
}

export function PagePlaceholder({
  title,
  description,
  section = "KelolaStok",
  subGroup,
  badge,
  stats,
  tableColumns,
  tableRows,
}: PagePlaceholderProps) {
  const [searchTerm, setSearchTerm] = React.useState("")

  // Default mock stats if not provided
  const defaultStats: StatItem[] = stats || [
    { label: "Total Entri", value: "1,248", change: "+12.4% bln ini", trend: "up" },
    { label: "Status Aktif", value: "1,180", change: "94.5% operasional", trend: "neutral" },
    { label: "Perlu Perhatian", value: badge ? `${badge} item` : "12 item", change: "-3 dari kemarin", trend: "down" },
    { label: "Pembaruan Terakhir", value: "Baru saja", change: "Otomatis tersinkron", trend: "neutral" },
  ]

  // Default table columns if not provided
  const cols = tableColumns || ["Kode / Ref", "Nama / Deskripsi", "Kategori / Tipe", "Status", "Waktu Update"]

  // Default table rows if not provided
  const rows = tableRows || [
    {
      "Kode / Ref": "KS-001092",
      "Nama / Deskripsi": `${title} Item Alpha`,
      "Kategori / Tipe": "Standard",
      Status: <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">Tersedia</span>,
      "Waktu Update": "10 menit lalu",
    },
    {
      "Kode / Ref": "KS-001093",
      "Nama / Deskripsi": `${title} Item Beta`,
      "Kategori / Tipe": "Batch Khusus",
      Status: <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-600 dark:text-amber-400">Dalam Proses</span>,
      "Waktu Update": "1 jam lalu",
    },
    {
      "Kode / Ref": "KS-001094",
      "Nama / Deskripsi": `${title} Item Gamma`,
      "Kategori / Tipe": "Premium Priority",
      Status: <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/15 text-blue-600 dark:text-blue-400">Selesai</span>,
      "Waktu Update": "3 jam lalu",
    },
    {
      "Kode / Ref": "KS-001095",
      "Nama / Deskripsi": `${title} Item Delta`,
      "Kategori / Tipe": "Reguler",
      Status: <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">Tersedia</span>,
      "Waktu Update": "Kemarin",
    },
    {
      "Kode / Ref": "KS-001096",
      "Nama / Deskripsi": `${title} Item Epsilon`,
      "Kategori / Tipe": "Arsip / Draft",
      Status: <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">Draft</span>,
      "Waktu Update": "2 hari lalu",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <span>{section}</span>
        {subGroup && (
          <>
            <ChevronRight className="size-3.5 text-muted-foreground/60" />
            <span>{subGroup}</span>
          </>
        )}
        <ChevronRight className="size-3.5 text-muted-foreground/60" />
        <span className="text-foreground font-semibold">{title}</span>
      </div>

      {/* Header Section with Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            {badge && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20">
                {badge} Perhatian
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
