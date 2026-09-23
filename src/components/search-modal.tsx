import * as React from "react"
import {
  Search,
  FileText,
  CodeXml,
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
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
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
  // Recommended (as shown in screenshot)
  {
    id: "docs",
    title: "Documentation",
    category: "Recommended",
    icon: FileText,
    iconColor: "text-red-500 dark:text-red-400",
    iconBg: "bg-red-500/10 dark:bg-red-500/20",
    description: "Browse guides and API references",
  },
  {
    id: "changelog",
    title: "Changelog",
    category: "Recommended",
    icon: CodeXml,
    iconColor: "text-red-500 dark:text-red-400",
    iconBg: "bg-red-500/10 dark:bg-red-500/20",
    description: "Recent updates and release notes",
  },
  {
    id: "button",
    title: "Button",
    category: "Recommended",
    icon: SquareCode,
    iconColor: "text-red-500 dark:text-red-400",
    iconBg: "bg-red-500/10 dark:bg-red-500/20",
    description: "Button component documentation and examples",
  },
  // Extra searchable navigation & components
  {
    id: "sales-overview",
    title: "Sales Overview",
    category: "Navigation",
    icon: LayoutDashboard,
    iconColor: "text-blue-500 dark:text-blue-400",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    description: "View sales dashboard and summary",
  },
  {
    id: "alert",
    title: "Alert",
    category: "Components",
    icon: Bell,
    iconColor: "text-amber-500 dark:text-amber-400",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
    description: "Alert component and feedback banners",
  },
  {
    id: "products",
    title: "Products & Stock",
    category: "Navigation",
    icon: Package,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    description: "Manage product inventory",
  },
  {
    id: "orders",
    title: "Orders",
    category: "Navigation",
    icon: ShoppingCart,
    iconColor: "text-purple-500 dark:text-purple-400",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
    description: "View customer orders and shipments",
  },
  {
    id: "customers",
    title: "Customers",
    category: "Navigation",
    icon: Users,
    iconColor: "text-cyan-500 dark:text-cyan-400",
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
    description: "Manage customers and accounts",
  },
  {
    id: "settings",
    title: "Account Settings",
    category: "Settings",
    icon: Settings,
    iconColor: "text-zinc-500 dark:text-zinc-400",
    iconBg: "bg-zinc-500/10 dark:bg-zinc-500/20",
    description: "Preferences and profile settings",
  },
  {
    id: "dropdown",
    title: "Dropdown Menu",
    category: "Components",
    icon: Layers,
    iconColor: "text-indigo-500 dark:text-indigo-400",
    iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    description: "Dropdown menu navigation and action items",
  },
]

interface SearchModalProps {
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
