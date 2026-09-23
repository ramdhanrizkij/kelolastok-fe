"use client"

import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Boxes,
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
import { navigationData, type NavigationSection } from "@/config/navigation"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const { setOpen, isMobile, setOpenMobile } = useSidebar()

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
      [title]: !prev[title],
    }))
  }

  const handleSelectPrimary = (id: string) => {
    setUserSelectedPrimary({ path: location.pathname, id })
    setOpen(true)
    const section = navigationData.find((sec) => sec.id === id)
    if (section && section.subGroups.length > 0) {
      const firstGroup = section.subGroups[0]
      setOpenCategories((prev) => ({
        ...prev,
        [firstGroup.title]: true,
      }))
    }
  }

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden border-r-0 *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {isMobile ? (
        /* Tampilan Mobile: 1 Sidebar Menu Tunggal Bersih dengan Logo Lucide */
        <div className="flex h-full w-full flex-col bg-background text-foreground">
          {/* Header Mobile dengan Logo KelolaStok & Tombol Close */}
          <div className="flex shrink-0 items-center justify-between border-b px-5 py-4">
            <Link
              to="/inventory/summary"
              onClick={() => setOpenMobile(false)}
              className="flex items-center gap-3 group"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-sm shadow-emerald-500/20">
                <Boxes className="size-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-foreground">
                  KelolaStok
                </span>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Sistem Inventori
                </span>
              </div>
            </Link>
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

          {/* Konten Menu Scrollable Berdasarkan Modul KelolaStok */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
            {navigationData.map((section) => {
              const SectionIcon = section.icon

              return (
                <div key={section.id} className="space-y-1">
                  {/* Judul Modul */}
                  <div className="flex items-center gap-2 px-3 pb-1 text-xs font-bold tracking-wider text-muted-foreground/80 uppercase">
                    <SectionIcon className="size-3.5 text-muted-foreground" />
                    <span>{section.title}</span>
                  </div>

                  {/* SubGroups & Items */}
                  <div className="space-y-1">
                    {section.subGroups.map((subGroup) => {
                      const SubIcon = subGroup.icon || SectionIcon
                      const isOpen = openCategories[subGroup.title] !== false

                      return (
                        <div key={subGroup.title} className="space-y-1">
                          <button
                            type="button"
                            onClick={() => toggleCategory(subGroup.title)}
                            className="flex w-full items-start justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground/85 hover:bg-muted/60 hover:text-foreground transition-colors cursor-pointer text-left"
                          >
                            <div className="flex items-start gap-2.5 text-left min-w-0 flex-1 pr-1.5">
                              <SubIcon className="size-4.5 text-muted-foreground shrink-0 mt-0.5" />
                              <span className="text-left leading-snug break-words">{subGroup.title}</span>
                            </div>
                            <ChevronDown
                              className={cn(
                                "size-4 text-muted-foreground/70 transition-transform duration-200 shrink-0 mt-0.5",
                                isOpen && "rotate-180"
                              )}
                            />
                          </button>

                          {isOpen && (
                            <div className="pl-6 pr-1 space-y-0.5 pb-1">
                              {subGroup.items.map((item) => {
                                const isActive = location.pathname === item.path

                                return (
                                  <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setOpenMobile(false)}
                                    className={cn(
                                      "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                                      isActive
                                        ? "bg-emerald-500/10 font-semibold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                    )}
                                  >
                                    <span className="truncate">{item.label}</span>
                                    {item.badge && (
                                      <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-500/15 text-red-600 dark:text-red-400 px-2 py-0.5 text-xs font-bold">
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
            {/* Logo Lucide Boxes KelolaStok */}
            <Link
              to="/inventory/summary"
              className="mb-4 flex items-center justify-center group"
              title="KelolaStok Inventori"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
                <Boxes className="size-5.5 text-white" />
              </div>
            </Link>

            {/* Menu Navigasi Ikon */}
            <div className="flex flex-1 flex-col items-center gap-2 w-full px-2">
              {navigationData.map((item) => {
                const Icon = item.icon
                const isActive = activePrimary === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectPrimary(item.id)}
                    title={item.title}
                    className={cn(
                      "group relative flex size-11 items-center justify-center rounded-xl transition-colors cursor-pointer",
                      isActive
                        ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    )}
                  >
                    <Icon className="size-5" />
                    {/* {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-emerald-600 dark:bg-emerald-400" />
                    )} */}
                    <span className="sr-only">{item.title}</span>
                  </button>
                )
              })}
            </div>
          </Sidebar>

          {/* Sidebar Kedua: Sub-Menu Panel (Hanya tampil saat tidak di-collapse) */}
          {open && (
            <Sidebar
              collapsible="none"
              className="hidden flex-1 md:flex w-[240px] border-r bg-background"
            >
              <SidebarHeader className="p-0 border-none">
                <div className="flex items-center justify-between px-5 pt-4 pb-2">
                  <h2 className="text-base font-bold tracking-tight text-foreground truncate pr-1" title={currentSection.title}>
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
