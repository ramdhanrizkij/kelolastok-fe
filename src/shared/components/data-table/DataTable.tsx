import * as React from "react"
import { cn } from "@/shared/lib/utils"

export interface ColumnDef<T> {
  key: keyof T | string
  header: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
  align?: "left" | "right" | "center"
}

export interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading?: boolean
  emptyMessage?: string
  density?: "compact" | "standard" | "spacious"
  className?: string
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "Tidak ada data.",
  density = "standard",
  className,
}: DataTableProps<T>) {
  // Bytecode Design System Data Table Dimensions:
  // Header height: 44px
  // Row height: compact 40px, standard 48px, spacious 56px
  // Cell horizontal padding: 12px (px-3)
  // Header font: 13px / 20px, weight 600
  // Body font: 14px / 20px, weight 400
  const rowHeightClass = {
    compact: "h-10",
    standard: "h-12",
    spacious: "h-14",
  }[density]

  if (isLoading) {
    return (
      <div className="flex h-36 items-center justify-center rounded-lg border border-border bg-card text-sm text-muted-foreground">
        <span className="inline-block size-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2" />
        Memuat data...
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex h-36 items-center justify-center rounded-lg border border-border bg-card text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-border bg-card shadow-xs", className)}>
      <table className="w-full text-left text-sm border-collapse">
        <thead className="bg-muted/40 border-b border-border">
          <tr className="h-11">
            {columns.map((col, idx) => (
              <th
                key={String(col.key) || idx}
                className={cn(
                  "px-3 text-[13px] font-semibold text-muted-foreground align-middle",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center"
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {data.map((row, rowIdx) => (
            <tr
              key={row.id || rowIdx}
              className={cn("transition-colors hover:bg-muted/30", rowHeightClass)}
            >
              {columns.map((col, colIdx) => (
                <td
                  key={String(col.key) || colIdx}
                  className={cn(
                    "px-3 text-sm text-foreground align-middle",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center"
                  )}
                >
                  {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
