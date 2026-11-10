import { ROUTES } from "@/shared/constants/routes"

export const appConfig = {
  name: "KelolaStok",
  description: "Aplikasi Manajemen Stok & Gudang Modern",
  version: "1.0.0",
  defaultRoute: ROUTES.DEFAULT,
  loginRoute: ROUTES.LOGIN,
  defaultSidebarLayout: "single" as const,
  defaultSidebarWidth: "260px",
  defaultSidebarWidthIcon: "64px",
  dualSidebarWidth: "308px",
  dualSidebarWidthIcon: "61px",
}

export default appConfig
