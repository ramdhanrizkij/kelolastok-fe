import { ChevronRight } from "lucide-react"

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

      {/* Header Section */}
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

export default PagePlaceholder
