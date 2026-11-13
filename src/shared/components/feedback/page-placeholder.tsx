import { ChevronRight } from "lucide-react"
import { Badge } from "@/shared/components/ui/badge"

export interface PagePlaceholderProps {
  title: string
  description: string
  section?: string
  subGroup?: string
  badge?: string
}

export function PagePlaceholder({
  title,
  description,
  section = "KelolaStok",
  subGroup,
  badge,
}: PagePlaceholderProps) {
  // Bytecode Design System:
  // Page Title: 24px / 32px, weight 600
  // Title-to-description: 4px
  // Description: 14px / 20px, weight 400
  // Page header-to-content gap: 24px (space-6)
  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>{section}</span>
        {subGroup && (
          <>
            <ChevronRight className="size-3.5 text-muted-foreground/60 shrink-0" />
            <span>{subGroup}</span>
          </>
        )}
        <ChevronRight className="size-3.5 text-muted-foreground/60 shrink-0" />
        <span className="text-foreground font-medium">{title}</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-semibold leading-8 tracking-tight text-foreground">
              {title}
            </h1>
            {badge && (
              <Badge variant="warning" className="h-[22px] px-2 font-medium">
                {badge} Perhatian
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground leading-5 max-w-3xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PagePlaceholder
