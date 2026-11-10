import * as React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Boxes,
  ChevronDown,
  X,
} from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/shared/components/ui/sidebar"
import { cn } from "cn"
import { navigationData, type NavigationSection } from "@/shared/constants/navigation"
import { useCurrentUser, useProfile } from "@/features/auth/hooks/use-auth"
import { NavUser } from "./nav-user"

export function AppSidebarSingle({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const navigate = useNavigate()
  const { state, isMobile, setOpenMobile } = useSidebar()
  const { data: serverProfile } = useProfile()
  const storeUser = useCurrentUser()
  const user = serverProfile || storeUser

  const isCollapsed = state === "collapsed" && !isMobile

  // Check if a specific path is active
  const isPathActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard"
    }
    return location.pathname === path || (path !== "/" && location.pathname.startsWith(path))
  }

  // Check if any item inside a section is currently active
  const isSectionActive = (section: NavigationSection) => {
    return section.subGroups.some((sg) =>
      sg.items.some((item) => isPathActive(item.path))
    )
  }

  // Calculate total badge count for a section (if any)
  const getSectionBadge = (section: NavigationSection) => {
    let totalBadge = 0
    for (const group of section.subGroups) {
      for (const item of group.items) {
        if (item.badge) {
          const num = parseInt(item.badge, 10)
          if (!isNaN(num)) totalBadge += num
        }
      }
    }
    return totalBadge > 0 ? String(totalBadge) : undefined
  }

  // User manual toggle overrides
  const [toggledSections, setToggledSections] = React.useState<Record<string, boolean>>({})

  const toggleSection = (id: string, currentOpen: boolean) => {
    setToggledSections((prev) => ({
      ...prev,
      [id]: !currentOpen,
    }))
  }

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar
      collapsible="icon"
      className={cn("sidebar-theme-single border-r border-sidebar-border bg-sidebar", className)}
      {...props}
    >
      {/* Brand Header */}
      <SidebarHeader className="flex h-16 flex-row items-center justify-between border-b border-sidebar-border/60 px-3">
        <Link
          to="/dashboard"
          onClick={handleLinkClick}
          className="flex items-center gap-3 overflow-hidden transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full"
          title="KelolaStok UMKM"
        >
          <div className="sidebar-theme-logo flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:scale-105 transition-all">
            <Boxes className="size-5" />
          </div>
          <div className="flex flex-col text-left leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-base font-bold tracking-tight text-foreground truncate">
              KelolaStok
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              UMKM Edition
            </span>
          </div>
        </Link>

        {isMobile && (
          <Button
            variant="ghost"
            size="icon-xs"
            className="size-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => setOpenMobile(false)}
            aria-label="Tutup Menu"
          >
            <X className="size-4" />
          </Button>
        )}
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="px-2 py-3 overflow-y-auto">
        <SidebarMenu className="gap-1">
          {navigationData.map((section) => {
            const Icon = section.icon
            const hasSubmenu =
              section.subGroups.length > 1 ||
              (section.subGroups.length === 1 && section.subGroups[0].items.length > 1)
            const sectionActive = isSectionActive(section)
            const defaultOpen = sectionActive || section.id === "inventory" || section.id === "movements"
            const isOpen = toggledSections[section.id] !== undefined ? toggledSections[section.id] : defaultOpen
            const sectionBadge = getSectionBadge(section)
            const singleItem =
              !hasSubmenu && section.subGroups[0]?.items[0]
                ? section.subGroups[0].items[0]
                : null

            // CASE 1: Single direct link (e.g., Executive Dashboard)
            if (singleItem) {
              const active = location.pathname === singleItem.path

              return (
                <SidebarMenuItem key={section.id}>
                  <SidebarMenuButton
                    tooltip={section.title}
                    isActive={active}
                    onClick={() => {
                      handleLinkClick()
                      navigate(singleItem.path)
                    }}
                    className={cn(
                      "cursor-pointer rounded-xl font-medium transition-all duration-200",
                      active
                        ? "sidebar-single-active bg-primary-soft text-primary font-semibold shadow-2xs ring-1 ring-primary/20"
                        : "sidebar-single-item text-muted-foreground hover:text-foreground hover:bg-muted/70"
                    )}
                  >
                    <Icon className="size-4.5 shrink-0" />
                    <span className="truncate">{section.title}</span>
                    {singleItem.badge && (
                      <span className="ml-auto inline-flex items-center justify-center rounded-full bg-danger-soft text-danger font-bold px-2 py-0.5 text-xs">
                        {singleItem.badge}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            }

            // CASE 2: Multi-item section in Collapsed Mode (Desktop Icon-only)
            if (isCollapsed) {
              return (
                <SidebarMenuItem key={section.id}>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <SidebarMenuButton
                          tooltip={section.title}
                          isActive={sectionActive}
                          className={cn(
                            "cursor-pointer rounded-xl transition-all duration-200",
                            sectionActive
                              ? "sidebar-single-active bg-primary-soft text-primary font-semibold shadow-2xs ring-1 ring-primary/20"
                              : "sidebar-single-item text-muted-foreground hover:text-foreground hover:bg-muted/70"
                          )}
                        />
                      }
                    >
                      <Icon className="size-4.5 shrink-0" />
                      <span className="truncate">{section.title}</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="right"
                      align="start"
                      sideOffset={10}
                      className="w-56 p-1.5 rounded-xl shadow-xl border border-border bg-popover"
                    >
                      <DropdownMenuLabel className="px-2.5 py-1.5 text-xs font-bold text-foreground">
                        {section.title}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="my-1" />
                      {section.subGroups.map((group) => (
                        <React.Fragment key={group.title}>
                          {section.subGroups.length > 1 && (
                            <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              {group.title}
                            </div>
                          )}
                          {group.items.map((item) => {
                            const active = location.pathname === item.path
                            return (
                              <DropdownMenuItem
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={cn(
                                  "flex items-center justify-between cursor-pointer rounded-lg px-2.5 py-1.5 text-sm",
                                  active
                                    ? "bg-primary-soft text-primary font-semibold"
                                    : "text-foreground hover:bg-muted"
                                )}
                              >
                                <span className="truncate">{item.label}</span>
                                {item.badge && (
                                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-danger-soft text-danger font-bold px-1.5 py-0.5 text-[10px]">
                                    {item.badge}
                                  </span>
                                )}
                              </DropdownMenuItem>
                            )
                          })}
                        </React.Fragment>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              )
            }

            // CASE 3: Multi-item section in Expanded Mode (Desktop Expanded or Mobile)
            return (
              <SidebarMenuItem key={section.id} className="space-y-1">
                {/* Header Collapsible Section */}
                <SidebarMenuButton
                  onClick={() => toggleSection(section.id, isOpen)}
                  className={cn(
                    "cursor-pointer rounded-xl font-medium transition-all duration-200 justify-between",
                    sectionActive
                      ? "text-foreground font-semibold"
                      : "sidebar-single-item text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={cn(
                        "size-4.5 shrink-0 transition-colors",
                        sectionActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <span className="truncate">{section.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {sectionBadge && (
                      <span className="inline-flex items-center justify-center rounded-full bg-danger-soft text-danger font-bold px-2 py-0.5 text-xs">
                        {sectionBadge}
                      </span>
                    )}
                    <ChevronDown
                      className={cn(
                        "size-4 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </div>
                </SidebarMenuButton>

                {/* Submenu List */}
                {isOpen && (
                  <SidebarMenuSub className="space-y-0.5 ml-4 pl-3 border-l border-sidebar-border">
                    {section.subGroups.map((subGroup) => (
                      <div key={subGroup.title} className="space-y-0.5">
                        {/* Subgroup Label jika section memiliki lebih dari 1 subgroup */}
                        {section.subGroups.length > 1 && (
                          <div className="px-2 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/75 truncate">
                            {subGroup.title}
                          </div>
                        )}
                        {subGroup.items.map((item) => {
                          const active = location.pathname === item.path

                          return (
                            <SidebarMenuSubItem key={item.path}>
                              <SidebarMenuSubButton
                                render={
                                  <Link
                                    to={item.path}
                                    onClick={handleLinkClick}
                                  />
                                }
                                isActive={active}
                                className={cn(
                                  "cursor-pointer rounded-lg px-2.5 py-1.5 text-sm transition-all duration-150 justify-between",
                                  active
                                    ? "sidebar-single-active bg-primary-soft text-primary font-semibold shadow-2xs ring-1 ring-primary/20"
                                    : "sidebar-single-subitem text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                )}
                              >
                                <span className="truncate">{item.label}</span>
                                {item.badge && (
                                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-danger-soft text-danger font-bold px-2 py-0.5 text-xs shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </div>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* User Profile Footer */}
      <SidebarFooter className="border-t border-sidebar-border/60 p-2">
        <NavUser
          user={{
            name: user?.name || "Admin KelolaStok",
            email: user?.email || "admin@kelolastok.com",
            avatar:
              user?.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
          }}
        />
      </SidebarFooter>

      {/* Desktop Resize/Collapse Rail */}
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebarSingle
