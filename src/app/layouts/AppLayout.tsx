import * as React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ROUTES } from "@/shared/constants/routes"

export function AppLayout() {
  const navigate = useNavigate()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "308px",
          "--sidebar-width-icon": "61px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen bg-muted/10">
        <DashboardHeader
          onSignOut={() => navigate(ROUTES.LOGIN)}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full mx-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AppLayout
