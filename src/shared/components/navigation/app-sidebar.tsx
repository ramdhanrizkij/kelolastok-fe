import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Boxes,
  ArrowLeft,
  ChevronDown,
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

  // Find active section based on current path
  const findSectionForPath = (path: string): string => {
    for (const section of navigationData) {
      for (const group of section.subGroups) {
        for (const item of group.items) {
          if (path === item.path || (item.path !== "/" && path.startsWith(item.path))) {
            return section.id
          }
        }
      }
    }
    return navigationData[0]?.id || "inventory"
  }

  const matchedSectionId = findSectionForPath(location.pathname)
  const [userSelectedPrimary, setUserSelectedPrimary] = React.useState<{ path: string; id: string } | null>(null)
  const activePrimary = userSelectedPrimary?.path === location.pathname ? userSelectedPrimary.id : matchedSectionId

  // Track expanded subgroups
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({
    "Stock Management": true,
    "Inbound (Barang Masuk)": true,
    "Outbound (Barang Keluar)": true,
    Management: true,
    Parties: true,
    Analytics: true,
    "System Configuration": true,
  })

  const currentSection: NavigationSection =
    navigationData.find((sec) => sec.id === activePrimary) || navigationData[0]

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [title]: prev[title] !== undefined ? !prev[title] : false,
    }))
  }

  const handlePrimaryClick = (id: string, defaultPath: string) => {
    setUserSelectedPrimary({ path: defaultPath, id })
    const section = navigationData.find((sec) => sec.id === id)
    if (section) {
      const allOpen: Record<string, boolean> = {}
      section.subGroups.forEach((sg) => {
        allOpen[sg.title] = true
      })
      setOpenCategories(allOpen)
    }
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
        COLUMN 1: Primary Nav Rail (Lebar ~61px)
        Tetap terlihat baik mode desktop maupun mobile (saat sheet mobile terbuka)
      */}
      <Sidebar
        collapsible="none"
        className="w-[61px] border-r border-sidebar-border bg-sidebar flex flex-col shrink-0"
      >
        <SidebarHeader className="flex h-16 items-center justify-center p-0 border-b border-sidebar-border/60">
          <Link
            to="/inventory/summary"
            className="flex size-10 items-center justify-center rounded-xl bg-[#5b51d8] text-white shadow-md shadow-indigo-500/20 hover:scale-105 transition-transform"
            title="KelolaStok UMKM"
          >
            <Boxes className="size-5" />
          </Link>
        </SidebarHeader>

        <SidebarContent className="flex flex-col items-center py-4 gap-2 overflow-y-auto overflow-x-hidden">
          {/* Tombol Toggle Kolom Submenu (Hanya tampil di Desktop) */}
          {!isMobile && (
            <div className="mb-2 w-full flex justify-center pb-2 border-b border-sidebar-border/40">
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setOpen(!open)}
                className="size-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-sidebar-accent cursor-pointer"
                title={open ? "Tutup panel menu (Collapse)" : "Buka panel menu (Expand)"}
                aria-label="Toggle Submenu Panel"
              >
                <ArrowLeft
                  className={cn(
                    "size-4.5 transition-transform duration-200",
                    !open && "rotate-180"
                  )}
                />
              </Button>
            </div>
          )}

          {/* Icon List Section Utama */}
          <div className="flex flex-col gap-1.5 w-full items-center">
            {navigationData.map((section) => {
              const Icon = section.icon
              const isSectionActive = section.id === activePrimary
              const firstSubItemPath = section.subGroups[0]?.items[0]?.path || "/inventory/summary"

              return (
                <div key={section.id} className="relative group flex items-center justify-center">
                  <Link
                    to={firstSubItemPath}
                    onClick={() => handlePrimaryClick(section.id, firstSubItemPath)}
                    className={cn(
                      "flex size-10 items-center justify-center rounded-xl transition-all duration-200",
                      isSectionActive
                        ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/25 dark:text-emerald-300 font-bold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                    )}
                    aria-label={section.title}
                  >
                    <Icon className="size-5" />
                  </Link>

                  {/* Tooltip Hover saat menu ditutup */}
                  <div className="absolute left-[68px] z-50 hidden rounded-md bg-popover px-2.5 py-1 text-xs font-semibold text-popover-foreground shadow-md ring-1 ring-border group-hover:block whitespace-nowrap">
                    {section.title}
                  </div>
                </div>
              )
            })}
          </div>
        </SidebarContent>
      </Sidebar>

      {/* 
        COLUMN 2: Secondary / SubGroup Menu (Lebar ~246px)
      */}
      {isMobile ? (
        /* Mobile: Render Column 2 di samping Column 1 */
        <Sidebar
          collapsible="none"
          className="flex-1 w-auto border-none bg-background flex flex-col"
        >
          <SidebarHeader className="flex h-16 flex-row items-center justify-between border-b px-4">
            <h2 className="text-sm font-bold tracking-tight text-foreground truncate">
              {currentSection.title}
            </h2>
            <Button
              variant="ghost"
              size="icon-xs"
              className="size-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={() => setOpenMobile(false)}
              aria-label="Tutup Menu"
            >
              <X className="size-4" />
            </Button>
          </SidebarHeader>

          <SidebarContent className="px-3 py-2 overflow-y-auto">
            <div className="space-y-4">
              {currentSection.subGroups.map((subGroup) => {
                const SubIcon = subGroup.icon || currentSection.icon
                const isOpen = openCategories[subGroup.title] !== false

                return (
                  <div key={subGroup.title} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => toggleCategory(subGroup.title)}
                      className="flex w-full items-start justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-start gap-2 text-left min-w-0 flex-1 pr-1.5">
                        <SubIcon className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="text-left leading-snug break-words">{subGroup.title}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "size-3.5 text-muted-foreground/70 transition-transform duration-200 shrink-0 mt-0.5",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    {isOpen && (
                      <div className="space-y-0.5 pt-0.5 ml-5">
                        {subGroup.items.map((item) => {
                          const isActive = location.pathname === item.path

                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setOpenMobile(false)}
                              className={cn(
                                "group flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all",
                                isActive
                                  ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-semibold shadow-2xs"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                              )}
                            >
                              <span className="truncate">{item.label}</span>
                              {item.badge && (
                                <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-500/15 text-red-600 dark:text-red-400 font-bold px-2 py-0.5 text-xs shrink-0">
                                  {item.badge}
                                </span>
                              )}
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
              className="w-[246px] border-r border-border bg-sidebar flex flex-col shrink-0 animate-in fade-in-0 slide-in-from-left-4 duration-200"
            >
              <SidebarHeader className="flex h-16 justify-center border-b border-border/60 px-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold tracking-tight text-foreground truncate pr-2">
                    {currentSection.title}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="size-7 shrink-0 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                    onClick={() => setOpen(false)}
                    aria-label="Collapse Menu"
                    title="Tutup Menu"
                  >
                    <ArrowLeft className="size-4" />
                  </Button>
                </div>
              </SidebarHeader>

              <SidebarContent className="px-3 py-2 overflow-y-auto">
                <div className="space-y-3">
                  {currentSection.subGroups.map((subGroup) => {
                    const SubIcon = subGroup.icon || currentSection.icon
                    const isOpen = openCategories[subGroup.title] !== false

                    return (
                      <div key={subGroup.title} className="space-y-1">
                        {/* SubGroup Header with Toggle */}
                        <button
                          type="button"
                          onClick={() => toggleCategory(subGroup.title)}
                          className="flex w-full items-start justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer text-left"
                        >
                          <div className="flex items-start gap-2 text-left min-w-0 flex-1 pr-1.5">
                            <SubIcon className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                            <span className="text-left leading-snug break-words">{subGroup.title}</span>
                          </div>
                          <ChevronDown
                            className={cn(
                              "size-3.5 text-muted-foreground/70 transition-transform duration-200 shrink-0 mt-0.5",
                              isOpen && "rotate-180"
                            )}
                          />
                        </button>

                        {/* SubGroup Items */}
                        {isOpen && (
                          <div className="space-y-0.5 pt-0.5 ml-5">
                            {subGroup.items.map((item) => {
                              const isActive = location.pathname === item.path

                              return (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  className={cn(
                                    "group flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all",
                                    isActive
                                      ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 font-semibold shadow-2xs"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                  )}
                                >
                                  <span className="truncate">{item.label}</span>
                                  {item.badge && (
                                    <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-500/15 text-red-600 dark:text-red-400 font-bold px-2 py-0.5 text-xs shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
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
