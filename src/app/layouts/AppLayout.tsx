import * as React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AppSidebar, AppSidebarSingle } from "@/shared/components/navigation"
import { DashboardHeader } from "@/shared/components/navigation/dashboard-header"
import { DashboardFooter } from "@/shared/components/navigation/dashboard-footer"
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar"
import { ROUTES } from "@/shared/constants/routes"
import { useTheme } from "@/shared/hooks/use-theme"
import { appConfig } from "@/app/config/app.config"

export function AppLayout() {
  const navigate = useNavigate()
  const { sidebarLayout } = useTheme()
  const isSingle = sidebarLayout === "single"

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": isSingle ? appConfig.defaultSidebarWidth : appConfig.dualSidebarWidth,
          "--sidebar-width-icon": isSingle ? appConfig.defaultSidebarWidthIcon : appConfig.dualSidebarWidthIcon,
        } as React.CSSProperties
      }
    >
      {isSingle ? <AppSidebarSingle /> : <AppSidebar />}
      <SidebarInset className="flex flex-col min-h-screen bg-muted/10">
        <DashboardHeader
          onSignOut={() => navigate(ROUTES.LOGIN)}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full mx-auto">
          <Outlet />
        </main>
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AppLayout
