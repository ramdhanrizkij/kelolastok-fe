import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function DashboardPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "308px",
          "--sidebar-width-icon": "4rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        {/* Header Dashboard Sesuai Gambar */}
        <DashboardHeader />

        {/* Konten Halaman */}
        <div className="flex-1 p-6 md:p-8 space-y-6 max-w-5xl">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Alert
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Alerts are used to feedback to the user action or system activity.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-foreground">Basic</h2>
            <p className="text-sm text-muted-foreground">
              Basic usage of alert.
            </p>
            <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-xs">
              <span className="text-sm text-foreground">
                There are some things that need your immediate attention.
              </span>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
