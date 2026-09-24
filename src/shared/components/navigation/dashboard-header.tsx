import * as React from "react"
import {
  Search,
  Bell,
  Sun,
  Moon,
  Settings,
  CircleUser,
  Activity,
  LogOut,
  Mail,
  Calendar,
  Ban,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/shared/components/ui/sidebar"
import { cn } from "cn"

interface NotificationItem {
  id: string
  type: "avatar" | "icon"
  avatar?: string
  initials?: string
  initialsBg?: string
  icon?: React.ComponentType<{ className?: string }>
  iconBg?: string
  iconColor?: string
  title: React.ReactNode
  time: string
  unread: boolean
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "avatar",
    initials: "VK",
    initialsBg: "bg-indigo-600 text-white",
    title: (
      <span className="text-sm leading-snug">
        <strong className="font-semibold text-foreground">Vickie Kim</strong>{" "}
        <span className="text-muted-foreground">comment in your ticket.</span>
      </span>
    ),
    time: "20 minutes ago",
    unread: true,
  },
  {
    id: "2",
    type: "icon",
    icon: Calendar,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-600 dark:text-blue-400",
    title: (
      <span className="text-sm font-medium text-foreground leading-snug">
        Please submit your daily report.
      </span>
    ),
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "3",
    type: "icon",
    icon: Ban,
    iconBg: "bg-red-500/15",
    iconColor: "text-red-500 dark:text-red-400",
    title: (
      <span className="text-sm font-medium text-foreground leading-snug">
        Your request was rejected
      </span>
    ),
    time: "2 days ago",
    unread: false,
  },
  {
    id: "4",
    type: "avatar",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop",
    title: (
      <span className="text-sm leading-snug">
        <strong className="font-semibold text-foreground">Jennifer Palmer</strong>{" "}
        <span className="text-muted-foreground">assigned you a new task.</span>
      </span>
    ),
    time: "3 days ago",
    unread: false,
  },
]

import { SearchModal, type SearchItem } from "./search-modal"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/shared/hooks/use-theme"
import { useProfile, useLogout, useCurrentUser } from "@/features/auth/hooks/use-auth"

export interface DashboardHeaderProps {
  onSignOut?: () => void
  onNavigate?: (page: string) => void
}

export function DashboardHeader({ onSignOut, onNavigate }: DashboardHeaderProps) {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const { data: serverProfile } = useProfile()
  const storeUser = useCurrentUser()
  const user = serverProfile || storeUser
  const logout = useLogout()
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  const [notifications, setNotifications] =
    React.useState<NotificationItem[]>(defaultNotifications)

  const hasUnread = notifications.some((n) => n.unread)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })))
  }

  const toggleItemRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: !item.unread } : item
      )
    )
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 md:px-6">
        {/* Sisi Kiri: Sidebar Trigger (mobile) & Search Icon */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden cursor-pointer" />
          <button
            type="button"
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
          >
            <Search className="size-5" />
          </button>
        </div>

        {/* Sisi Kanan: Notifications Dropdown, Theme Toggle, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifikasi Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer outline-none"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              {hasUnread && (
                <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 ring-2 ring-background" />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-80 sm:w-90 p-0 rounded-2xl shadow-xl border bg-popover overflow-hidden"
            >
              {/* Header Notifikasi */}
              <div className="flex items-center justify-between px-4 py-3.5">
                <h3 className="text-base font-bold text-foreground">
                  Notifications
                </h3>
                <button
                  type="button"
                  onClick={markAllAsRead}
                  title="Mark all as read"
                  className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted/60 transition-colors cursor-pointer"
                >
                  <Mail className="size-5" />
                  <span className="sr-only">Mark all as read</span>
                </button>
              </div>

              {/* Sub-header status / timestamp */}
              <div className="border-t border-b border-border/50 bg-muted/20 py-1.5 text-center text-xs text-muted-foreground">
                4 minutes ago
              </div>

              {/* Daftar Notifikasi */}
              <div className="max-h-72 overflow-y-auto divide-y divide-border/50">
                {notifications.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItemRead(item.id)}
                      className="flex items-center gap-3.5 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      {/* Icon / Avatar Sisi Kiri */}
                      {item.type === "avatar" && item.initials && (
                        <div
                          className={cn(
                            "size-10 rounded-full font-semibold text-sm flex items-center justify-center shrink-0 shadow-xs",
                            item.initialsBg
                          )}
                        >
                          {item.initials}
                        </div>
                      )}

                      {item.type === "avatar" && item.avatar && (
                        <Avatar className="size-10 shrink-0">
                          <AvatarImage src={item.avatar} alt="Avatar" />
                          <AvatarFallback>JP</AvatarFallback>
                        </Avatar>
                      )}

                      {item.type === "icon" && Icon && (
                        <div
                          className={cn(
                            "size-10 rounded-full flex items-center justify-center shrink-0 shadow-xs",
                            item.iconBg,
                            item.iconColor
                          )}
                        >
                          <Icon className="size-5" />
                        </div>
                      )}

                      {/* Konten Notifikasi */}
                      <div className="flex flex-1 flex-col overflow-hidden pr-2">
                        <div className="text-sm leading-snug">{item.title}</div>
                        <span className="text-xs text-muted-foreground mt-0.5">
                          {item.time}
                        </span>
                      </div>

                      {/* Indikator Status Unread / Read (Dot) */}
                      <div className="shrink-0">
                        {item.unread ? (
                          <span className="block size-2 rounded-full bg-indigo-600 shadow-xs" />
                        ) : (
                          <span className="block size-2 rounded-full bg-muted-foreground/30" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer: View All Activity */}
              <button
                type="button"
                className="w-full border-t border-border/50 py-3 text-center text-sm font-semibold text-foreground/85 hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
              >
                View All Activity
              </button>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Switch Dark / Light Mode */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
          >
            {isDark ? (
              <Sun className="size-5 text-amber-400 transition-transform duration-200 hover:rotate-45" />
            ) : (
              <Moon className="size-5 transition-transform duration-200 hover:-rotate-12" />
            )}
          </button>

          {/* Profil Pengguna Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-3 rounded-lg py-1 px-1.5 hover:bg-muted/60 transition-colors cursor-pointer outline-none"
            >
              <Avatar className="size-8.5">
                <AvatarImage
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop"}
                  alt={user?.name || "Admin"}
                />
                <AvatarFallback className="bg-emerald-600 text-white font-medium text-xs">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col text-left leading-none gap-0.5">
                <span className="text-[11px] font-normal text-muted-foreground capitalize">
                  {user?.role || "Admin"}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {user?.name || "Admin KelolaStok"}
                </span>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-56 p-1 rounded-xl shadow-lg border bg-popover"
            >
              {/* Header info user di dalam dropdown */}
              <div className="flex items-center gap-3 p-3">
                <Avatar className="size-10">
                  <AvatarImage
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop"}
                    alt={user?.name || "Admin"}
                  />
                  <AvatarFallback className="bg-emerald-600 text-white font-medium text-xs">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold text-foreground truncate">
                    {user?.name || "Admin KelolaStok"}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user?.email || "admin@kelolastok.com"}
                  </span>
                </div>
              </div>

              <DropdownMenuSeparator className="my-1" />

              {/* Menu Items */}
              <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 px-3 rounded-lg font-medium text-foreground hover:bg-muted">
                <CircleUser className="size-4.5 text-muted-foreground" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 px-3 rounded-lg font-medium text-foreground hover:bg-muted">
                <Settings className="size-4.5 text-muted-foreground" />
                <span>Account Setting</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer gap-2.5 py-2 px-3 rounded-lg font-medium text-foreground hover:bg-muted">
                <Activity className="size-4.5 text-muted-foreground" />
                <span>Activity Log</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1" />

              {/* Logout item */}
              <DropdownMenuItem
                onClick={() => {
                  logout()
                  onSignOut?.()
                }}
                className="cursor-pointer gap-2.5 py-2 px-3 rounded-lg font-medium text-destructive hover:bg-destructive/10"
              >
                <LogOut className="size-4.5 text-destructive" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onSelect={(item: SearchItem) => {
          if (item.id === "login") {
            onNavigate?.("login")
            navigate("/login")
          } else if (item.id === "register") {
            navigate("/register")
          } else if (item.url?.startsWith("/")) {
            navigate(item.url)
          }
        }}
      />
    </>
  )
}

export default DashboardHeader
