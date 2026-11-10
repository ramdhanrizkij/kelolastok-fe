import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Boxes,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/shared/components/ui/sidebar"
import { cn } from "cn"
import { navigationData, type NavigationSection } from "@/shared/constants/navigation"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const { open, setOpen, isMobile, setOpenMobile } = useSidebar()

  // Find precisely which navigation item and section is active globally
  const activeNavMatch = React.useMemo(() => {
    const cleanPath = location.pathname.replace(/\/+$/, "") || "/"

    // 1. Exact match check across all sections & items
    for (const section of navigationData) {
      for (const group of section.subGroups) {
        for (const item of group.items) {
          const itemClean = item.path.replace(/\/+$/, "") || "/"
          if (cleanPath === itemClean) {
            return { sectionId: section.id, itemPath: item.path }
          }
        }
      }
    }

    // 2. Prefix match for sub-routes
    let bestMatch: { sectionId: string; itemPath: string } | null = null
    let maxMatchLen = -1

    for (const section of navigationData) {
      for (const group of section.subGroups) {
        for (const item of group.items) {
          const itemClean = item.path.replace(/\/+$/, "") || "/"
          if (itemClean !== "/" && cleanPath.startsWith(itemClean + "/") && itemClean.length > maxMatchLen) {
            maxMatchLen = itemClean.length
            bestMatch = { sectionId: section.id, itemPath: item.path }
          }
        }
      }
    }

    if (bestMatch) {
      return bestMatch
    }

    // Fallback to first section and item
    const firstSection = navigationData[0]
    return {
      sectionId: firstSection?.id || "dashboard",
      itemPath: firstSection?.subGroups[0]?.items[0]?.path || "/dashboard",
    }
  }, [location.pathname])

  // Allows user to click a rail icon to browse that section's submenus
  const [browsingSectionId, setBrowsingSectionId] = React.useState<string | null>(null)

  // When pathname changes (navigation completes), reset browsing state to match active route
  React.useEffect(() => {
    setBrowsingSectionId(null)
  }, [location.pathname])

  const activePrimarySectionId = browsingSectionId || activeNavMatch.sectionId

  // Track expanded subgroups (default all open)
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({})

  const currentSection: NavigationSection =
    navigationData.find((sec) => sec.id === activePrimarySectionId) || navigationData[0]

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [title]: prev[title] !== undefined ? !prev[title] : false,
    }))
  }

  const handlePrimaryClick = (id: string) => {
    setBrowsingSectionId(id)
    if (!open) {
      setOpen(true)
    }
  }

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* 
        COLUMN 1: Primary Nav Rail (~61px)
      */}
      <Sidebar
        collapsible="none"
        className="sidebar-theme-rail w-[61px] border-r border-sidebar-border bg-sidebar flex flex-col shrink-0"
      >
        <SidebarHeader className="flex h-16 items-center justify-center p-0 border-b border-sidebar-border/60">
          <Link
            to="/inventory/summary"
            className="sidebar-theme-logo flex size-11 items-center justify-center rounded-xl bg-primary hover:bg-primary-active text-primary-foreground shadow-md shadow-primary/25 hover:scale-105 active:scale-95 transition-all"
            title="KelolaStok UMKM"
          >
            <Boxes className="size-5.5" />
          </Link>
        </SidebarHeader>

        <SidebarContent className="flex flex-col items-center py-3 gap-2 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-2 w-full items-center">
            {navigationData.map((section) => {
              const Icon = section.icon
              const isSectionActive = section.id === activePrimarySectionId

              return (
                <div key={section.id} className="relative group flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handlePrimaryClick(section.id)}
                    className={cn(
                      "sidebar-theme-nav flex size-11 items-center justify-center rounded-xl transition-all duration-150 cursor-pointer",
                      isSectionActive
                        ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/25 ring-1 ring-primary/20"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10 active:scale-95"
                    )}
                    data-active={isSectionActive}
                    aria-label={section.title}
                  >
                    <Icon className="size-5" />
                  </button>

                  {/* Tooltip Hover saat menu ditutup */}
                  <div className="absolute left-[70px] z-50 hidden rounded-lg bg-popover px-3 py-1.5 text-xs font-semibold text-popover-foreground shadow-lg border border-border group-hover:block whitespace-nowrap">
                    {section.title}
                  </div>
                </div>
              )
            })}
          </div>
        </SidebarContent>
      </Sidebar>

      {/* 
        COLUMN 2: Secondary / SubGroup Menu (~246px)
      */}
      {isMobile ? (
        /* Mobile: Render Column 2 di mobile drawer */
        <Sidebar
          collapsible="none"
          className="flex-1 w-auto border-none bg-background flex flex-col"
        >
          <SidebarHeader className="flex h-16 flex-row items-center justify-between border-b px-4">
            <h2 className="text-base font-bold tracking-tight text-foreground truncate">
              {currentSection.title}
            </h2>
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-8.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
              onClick={() => setOpenMobile(false)}
              aria-label="Tutup Menu"
            >
              <X className="size-4.5" />
            </Button>
          </SidebarHeader>

          <SidebarContent className="px-3 py-3 overflow-y-auto">
            <div className="space-y-4">
              {currentSection.subGroups.map((subGroup) => {
                const SubIcon = subGroup.icon || currentSection.icon
                const isOpen = openCategories[subGroup.title] !== false
                const isSubGroupActive = subGroup.items.some(
                  (item) => item.path === activeNavMatch.itemPath
                )

                return (
                  <div key={subGroup.title} className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => toggleCategory(subGroup.title)}
                      className={cn(
                        "group/cat flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-left",
                        isSubGroupActive
                          ? "text-primary dark:text-primary font-bold hover:bg-primary/10"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                      )}
                    >
                      <div className="flex items-center gap-2 text-left min-w-0 flex-1 pr-1.5">
                        <SubIcon
                          className={cn(
                            "size-4 shrink-0 transition-colors",
                            isSubGroupActive
                              ? "text-primary dark:text-primary"
                              : "text-muted-foreground group-hover/cat:text-primary"
                          )}
                        />
                        <span className="text-left leading-snug break-words">{subGroup.title}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-200 shrink-0",
                          isSubGroupActive ? "text-primary" : "text-muted-foreground/70 group-hover/cat:text-primary",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    {isOpen && (
                      <div className="space-y-1 pt-0.5 ml-5 pl-2.5 border-l border-sidebar-border">
                        {subGroup.items.map((item) => {
                          const isActive = item.path === activeNavMatch.itemPath

                          return (
                            <Link
                              key={item.label}
                              to={item.path}
                              onClick={() => setOpenMobile(false)}
                              className={cn(
                                "group flex min-h-10 items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150",
                                isActive
                                  ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25"
                                  : "text-muted-foreground hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/15 active:scale-[0.99]"
                              )}
                            >
                              <span className="truncate">{item.label}</span>
                              {item.badge ? (
                                <span
                                  className={cn(
                                    "ml-2 inline-flex items-center justify-center rounded-full font-bold px-2 py-0.5 text-xs shrink-0",
                                    isActive
                                      ? "bg-primary-foreground/20 text-primary-foreground"
                                      : "bg-primary/10 text-primary"
                                  )}
                                >
                                  {item.badge}
                                </span>
                              ) : isActive ? (
                                <ChevronRight className="size-4 text-primary-foreground/90 shrink-0 transition-transform group-hover:translate-x-0.5" />
                              ) : null}
                            </Link>
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
      ) : (
        /* Desktop: Render Column 2 jika open bernilai true */
        <>
          {open && (
            <Sidebar
              collapsible="none"
              className="w-[246px] bg-sidebar flex flex-col shrink-0 animate-in fade-in-0 slide-in-from-left-4 duration-200"
            >
              <SidebarHeader className="flex h-16 justify-center border-b border-border/60 px-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold tracking-tight text-foreground truncate pr-2">
                    {currentSection.title}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="size-8.5 shrink-0 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
                    onClick={() => setOpen(false)}
                    aria-label="Collapse Menu"
                    title="Tutup Menu"
                  >
                    <ArrowLeft className="size-4" />
                  </Button>
                </div>
              </SidebarHeader>

              <SidebarContent className="px-3 py-3 overflow-y-auto">
                <div className="space-y-4">
                  {currentSection.subGroups.map((subGroup) => {
                    const SubIcon = subGroup.icon || currentSection.icon
                    const isOpen = openCategories[subGroup.title] !== false
                    const isSubGroupActive = subGroup.items.some(
                      (item) => item.path === activeNavMatch.itemPath
                    )

                    return (
                      <div key={subGroup.title} className="space-y-1.5">
                        <button
                          type="button"
                          onClick={() => toggleCategory(subGroup.title)}
                          className={cn(
                            "group/cat flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-left",
                            isSubGroupActive
                              ? "text-primary dark:text-primary font-bold hover:bg-primary/10"
                              : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                          )}
                        >
                          <div className="flex items-center gap-2 text-left min-w-0 flex-1 pr-1.5">
                            <SubIcon
                              className={cn(
                                "size-4 shrink-0 transition-colors",
                                isSubGroupActive
                                  ? "text-primary dark:text-primary"
                                  : "text-muted-foreground group-hover/cat:text-primary"
                              )}
                            />
                            <span className="text-left leading-snug break-words">{subGroup.title}</span>
                          </div>
                          <ChevronDown
                            className={cn(
                              "size-3.5 transition-transform duration-200 shrink-0",
                              isSubGroupActive ? "text-primary" : "text-muted-foreground/70 group-hover/cat:text-primary",
                              isOpen && "rotate-180"
                            )}
                          />
                        </button>

                        {isOpen && (
                          <div className="space-y-1 pt-0.5 ml-5 pl-2.5 border-l border-sidebar-border">
                            {subGroup.items.map((item) => {
                              const isActive = item.path === activeNavMatch.itemPath

                              return (
                                <Link
                                  key={item.label}
                                  to={item.path}
                                  className={cn(
                                    "group flex min-h-10 items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150",
                                    isActive
                                      ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25"
                                      : "text-muted-foreground hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/15 active:scale-[0.99]"
                                  )}
                                >
                                  <span className="truncate">{item.label}</span>
                                  {item.badge ? (
                                    <span
                                      className={cn(
                                        "ml-2 inline-flex items-center justify-center rounded-full font-bold px-2 py-0.5 text-xs shrink-0",
                                        isActive
                                          ? "bg-primary-foreground/20 text-primary-foreground"
                                          : "bg-primary/10 text-primary"
                                      )}
                                    >
                                      {item.badge}
                                    </span>
                                  ) : isActive ? (
                                    <ChevronRight className="size-4 text-primary-foreground/90 shrink-0 transition-transform group-hover:translate-x-0.5" />
                                  ) : null}
                                </Link>
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
          )}
        </>
      )}
    </Sidebar>
  )
}

export default AppSidebar
