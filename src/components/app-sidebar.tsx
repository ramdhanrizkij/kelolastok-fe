"use client"

import * as React from "react"
import {
  Sparkles,
  LayoutGrid,
  LayoutTemplate,
  Copy,
  Lock,
  BookOpen,
  BarChart3,
  Users,
  TrendingUp,
  CircleDollarSign,
  CircleUser,
  ArrowLeft,
  ChevronDown,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "cn"

// Menu utama di sidebar pertama (icon-only)
const primaryNav = [
  { id: "apps", title: "Apps", icon: LayoutGrid },
  { id: "layout", title: "Layouts", icon: LayoutTemplate },
  { id: "pages", title: "Pages", icon: Copy },
  { id: "auth", title: "Authentication", icon: Lock },
  { id: "docs", title: "Documentation", icon: BookOpen },
]

// Menu kategori di sidebar kedua (panel sub-menu) untuk Apps
const appsCategories = [
  {
    title: "Project",
    icon: BarChart3,
    subItems: ["Overview", "Tasks"],
  },
  {
    title: "CRM",
    icon: Users,
    subItems: ["Contacts", "Companies"],
  },
  {
    title: "Sales",
    icon: TrendingUp,
    subItems: [
      "Dashboard",
      "Product List",
      "Product Edit",
      "New Product",
      "Order List",
      "Order Details",
    ],
  },
  {
    title: "Crypto",
    icon: CircleDollarSign,
    subItems: ["Market", "Wallets"],
  },
  {
    title: "Knowledge Base",
    icon: BookOpen,
    subItems: ["Articles", "Guides"],
  },
  {
    title: "Account",
    icon: CircleUser,
    subItems: ["Profile", "Settings"],
  },
]

// Menu kategori untuk Layouts
const layoutCategories = [
  {
    title: "Vertical Layout",
    icon: LayoutTemplate,
    subItems: ["Default", "Compact", "Icon View", "Dark Sidebar"],
  },
  {
    title: "Horizontal Layout",
    icon: LayoutGrid,
    subItems: ["Top Nav Dark", "Top Nav Light", "Boxed Width"],
  },
  {
    title: "Detached",
    icon: Copy,
    subItems: ["Two Column", "Floating Sidebar"],
  },
]

// Menu kategori untuk Pages
const pagesCategories = [
  {
    title: "Utility",
    icon: Copy,
    subItems: ["Starter Page", "Maintenance", "Error 404", "Error 500", "FAQ"],
  },
  {
    title: "Profile",
    icon: CircleUser,
    subItems: ["Overview", "Settings", "Activity", "Billing"],
  },
  {
    title: "Pricing",
    icon: CircleDollarSign,
    subItems: ["Plans", "Invoices"],
  },
]

// Menu kategori untuk Authentication
const authCategories = [
  {
    title: "Authentication",
    icon: Lock,
    subItems: ["Sign In", "Sign Up", "Forgot Password", "Reset Password", "Lock Screen"],
  },
]

// Menu kategori untuk Documentation
const docsCategories = [
  {
    title: "Documentation",
    icon: BookOpen,
    subItems: ["Introduction", "Installation", "Quick Start", "Components", "Changelog"],
  },
]

const navCategoriesByPrimary: Record<
  string,
  {
    title: string
    icon: React.ComponentType<{ className?: string }>
    subItems?: string[]
  }[]
> = {
  apps: appsCategories,
  layout: layoutCategories,
  pages: pagesCategories,
  auth: authCategories,
  docs: docsCategories,
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activePrimary, setActivePrimary] = React.useState("apps")
  const [activeSubItem, setActiveSubItem] = React.useState("Dashboard")
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({
    Sales: true,
    "Vertical Layout": true,
    Utility: true,
    Authentication: true,
    Documentation: true,
  })
  const { setOpen, isMobile, setOpenMobile } = useSidebar()

  const currentPrimaryItem = primaryNav.find((item) => item.id === activePrimary)
  const currentCategories = navCategoriesByPrimary[activePrimary] || []

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleSelectPrimary = (id: string) => {
    setActivePrimary(id)
    setOpen(true)
    const categories = navCategoriesByPrimary[id]
    if (categories && categories.length > 0) {
      const firstCat = categories[0]
      setOpenCategories((prev) => ({
        ...prev,
        [firstCat.title]: true,
      }))
      if (firstCat.subItems && firstCat.subItems.length > 0) {
        setActiveSubItem(firstCat.subItems[0])
      }
    }
  }

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {isMobile ? (
        /* Tampilan Mobile: 1 Sidebar Menu Tunggal Bersih (Sesuai Referensi) */
        <div className="flex h-full w-full flex-col bg-background text-foreground">
          {/* Header Mobile dengan Judul Navigation & Tombol Close X */}
          <div className="flex shrink-0 items-center justify-between border-b px-5 py-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Navigation
            </h2>
            <Button
              variant="ghost"
              size="icon-xs"
              className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
              onClick={() => setOpenMobile(false)}
              aria-label="Close Navigation"
            >
              <X className="size-5" />
            </Button>
          </div>

          {/* Konten Menu Scrollable Berdasarkan Grup Seksi */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
            {primaryNav.map((primary) => {
              const categories = navCategoriesByPrimary[primary.id] || []
              if (categories.length === 0) return null

              return (
                <div key={primary.id} className="space-y-1">
                  {/* Judul Grup: APPS, LAYOUTS, dsb. */}
                  <div className="px-3 pb-1 text-xs font-bold tracking-wider text-muted-foreground/80 uppercase">
                    {primary.title}
                  </div>

                  {/* Daftar Kategori dalam Grup */}
                  <div className="space-y-1">
                    {categories.map((category) => {
                      const Icon = category.icon
                      const isOpen = !!openCategories[category.title]

                      return (
                        <div key={category.title} className="space-y-1">
                          <button
                            onClick={() => toggleCategory(category.title)}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground/85 hover:bg-muted/60 hover:text-foreground transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="size-4.5 text-muted-foreground" />
                              <span>{category.title}</span>
                            </div>
                            <ChevronDown
                              className={cn(
                                "size-4 text-muted-foreground/70 transition-transform duration-200",
                                isOpen && "rotate-180"
                              )}
                            />
                          </button>

                          {isOpen && category.subItems && (
                            <div className="pl-6 pr-1 space-y-0.5 pb-1">
                              {category.subItems.map((sub) => {
                                const isSubActive = activeSubItem === sub
                                return (
                                  <button
                                    key={sub}
                                    onClick={() => {
                                      setActivePrimary(primary.id)
                                      setActiveSubItem(sub)
                                      setOpenMobile(false)
                                    }}
                                    className={cn(
                                      "block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors cursor-pointer",
                                      isSubActive
                                        ? "bg-[#f1f2f4] font-semibold text-foreground dark:bg-muted dark:text-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                    )}
                                  >
                                    {sub}
                                  </button>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* Tampilan Desktop: Dual-Sidebar (Dua Kolom) */
        <>
          {/* Sidebar Pertama: Icon Menu */}
          <Sidebar
            collapsible="none"
            className="w-[68px]! border-r bg-background flex flex-col items-center py-3"
          >
            {/* Logo Bulat Ungu dengan Icon Sparkles */}
            <div className="mb-4 flex items-center justify-center">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#5b51d8] text-white shadow-xs">
                <Sparkles className="size-5 fill-white/20" />
              </div>
            </div>

            {/* Menu Navigasi Ikon */}
            <div className="flex flex-1 flex-col items-center gap-2 w-full px-2">
              {primaryNav.map((item) => {
                const Icon = item.icon
                const isActive = activePrimary === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectPrimary(item.id)}
                    title={item.title}
                    className={cn(
                      "flex size-12 items-center justify-center rounded-xl transition-all cursor-pointer",
                      isActive
                        ? "bg-[#f1f2f4] text-foreground font-semibold shadow-xs dark:bg-muted dark:text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    <Icon className="size-5" />
                    <span className="sr-only">{item.title}</span>
                  </button>
                )
              })}
            </div>
          </Sidebar>

          {/* Sidebar Kedua: Sub-Menu Panel */}
          <Sidebar
            collapsible="none"
            className="hidden flex-1 md:flex w-[240px]! border-r bg-background"
          >
            <SidebarHeader className="p-0 border-none">
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {currentPrimaryItem?.title ?? "Apps"}
                </h2>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="size-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                  onClick={() => setOpen(false)}
                  aria-label="Collapse Menu"
                >
                  <ArrowLeft className="size-4" />
                </Button>
              </div>
            </SidebarHeader>

            <SidebarContent className="px-3 py-2 overflow-y-auto">
              <div className="space-y-1">
                {currentCategories.map((category) => {
                  const Icon = category.icon
                  const isOpen = !!openCategories[category.title]

                  return (
                    <div key={category.title} className="space-y-1">
                      <button
                        onClick={() => toggleCategory(category.title)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground/85 hover:bg-muted/60 hover:text-foreground transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="size-4.5 text-muted-foreground" />
                          <span>{category.title}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "size-4 text-muted-foreground/70 transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>

                      {isOpen && category.subItems && (
                        <div className="pl-6 pr-1 space-y-0.5 pb-1">
                          {category.subItems.map((sub) => {
                            const isSubActive = activeSubItem === sub
                            return (
                              <button
                                key={sub}
                                onClick={() => setActiveSubItem(sub)}
                                className={cn(
                                  "block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors cursor-pointer",
                                  isSubActive
                                    ? "bg-[#f1f2f4] font-semibold text-foreground dark:bg-muted dark:text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                )}
                              >
                                {sub}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </SidebarContent>
          </Sidebar>
        </>
      )}
    </Sidebar>
  )
}
