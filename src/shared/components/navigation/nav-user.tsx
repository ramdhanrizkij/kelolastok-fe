import { useNavigate } from "react-router-dom"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar"
import {
  ChevronsUpDownIcon,
  BadgeCheckIcon,
  PaletteIcon,
  LogOutIcon,
} from "lucide-react"
import { ROUTES } from "@/shared/constants/routes"
import { useLogout } from "@/features/auth/hooks/use-auth"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile, setOpenMobile } = useSidebar()
  const navigate = useNavigate()
  const logout = useLogout()

  const handleNavigate = (path: string) => {
    if (isMobile) {
      setOpenMobile(false)
    }
    navigate(path)
  }

  const handleLogout = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
    logout()
    navigate(ROUTES.LOGIN)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground cursor-pointer"
              />
            }
          >
            <Avatar className="h-8 w-8 rounded-lg shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-semibold text-foreground">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-xl border border-border bg-popover shadow-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2.5 px-2 py-2 text-left text-sm">
                <Avatar className="h-9 w-9 rounded-lg shrink-0">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight overflow-hidden">
                  <span className="truncate font-semibold text-foreground">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleNavigate(ROUTES.ACCOUNT.PROFILE)}
                className="cursor-pointer gap-2.5 py-2 px-2.5 rounded-lg text-sm"
              >
                <BadgeCheckIcon className="size-4 text-muted-foreground" />
                <span>Profil Akun</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleNavigate(ROUTES.SETTINGS.THEME)}
                className="cursor-pointer gap-2.5 py-2 px-2.5 rounded-lg text-sm"
              >
                <PaletteIcon className="size-4 text-muted-foreground" />
                <span>Pengaturan Tema</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer gap-2.5 py-2 px-2.5 rounded-lg text-sm text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <LogOutIcon className="size-4 text-destructive" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default NavUser
