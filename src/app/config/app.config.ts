import { ROUTES } from "@/shared/constants/routes"

export const appConfig = {
  name: "KelolaStok",
  description: "Aplikasi Manajemen Stok & Gudang Modern",
  version: "1.0.0",
  defaultRoute: ROUTES.DEFAULT,
  loginRoute: ROUTES.LOGIN,
  defaultSidebarLayout: "single" as const,
  defaultSidebarWidth: "256px",
  defaultSidebarWidthIcon: "72px",
  dualSidebarWidth: "332px",
  dualSidebarWidthIcon: "72px",
}

export default appConfig
