import { lazy } from "react"
import type { AppRoute } from "@/shared/types/route"
import { PERMISSIONS } from "@/shared/constants/permissions"
import { ROUTES } from "@/shared/constants/routes"

// Layouts & Auth Pages (Eagerly loaded)
import AppLayout from "@/app/layouts/AppLayout"
import LoginPage from "@/pages/login"
import RegisterPage from "@/pages/register"

// Inventory Pages (Lazy loaded)
const StockSummaryPage = lazy(() => import("@/pages/inventory/summary"))
const ItemCatalogPage = lazy(() => import("@/pages/inventory/catalog"))
const StockOpnamePage = lazy(() => import("@/pages/inventory/opname"))
const StockTransferPage = lazy(() => import("@/pages/inventory/transfer"))
const LowStockAlertsPage = lazy(() => import("@/pages/inventory/alerts"))
const SerialBatchTrackingPage = lazy(() => import("@/pages/inventory/batches"))

// Inbound Pages (Lazy loaded)
const PurchaseOrdersPage = lazy(() => import("@/pages/inbound/purchase-orders"))
const GoodsReceivedPage = lazy(() => import("@/pages/inbound/receiving"))
const SupplierReturnsPage = lazy(() => import("@/pages/inbound/returns"))

// Outbound Pages (Lazy loaded)
const SalesOrdersPage = lazy(() => import("@/pages/outbound/sales-orders"))
const PickingPackingPage = lazy(() => import("@/pages/outbound/picking"))
const DeliveryOrdersPage = lazy(() => import("@/pages/outbound/deliveries"))
const CustomerReturnsPage = lazy(() => import("@/pages/outbound/returns"))

// Warehouse Pages (Lazy loaded)
const WarehouseListPage = lazy(() => import("@/pages/warehouses/list"))
const ZonesRacksLayoutPage = lazy(() => import("@/pages/warehouses/layout"))
const CapacitySpacePage = lazy(() => import("@/pages/warehouses/capacity"))

// Contacts Pages (Lazy loaded)
const SuppliersVendorsPage = lazy(() => import("@/pages/contacts/suppliers"))
const CustomersPage = lazy(() => import("@/pages/contacts/customers"))
const CouriersLogisticsPage = lazy(() => import("@/pages/contacts/couriers"))

// Reports Pages (Lazy loaded)
const StockValuationPage = lazy(() => import("@/pages/reports/valuation"))
const InventoryTurnoverPage = lazy(() => import("@/pages/reports/turnover"))
const MovementHistoryPage = lazy(() => import("@/pages/reports/movements"))
const DeadStockAnalysisPage = lazy(() => import("@/pages/reports/dead-stock"))

// Settings Pages (Lazy loaded)
const CategoriesUnitsPage = lazy(() => import("@/pages/settings/categories"))
const UserRolesAccessPage = lazy(() => import("@/pages/settings/roles"))
const ReorderAutomationPage = lazy(() => import("@/pages/settings/reorder-rules"))
const IntegrationsAPIPage = lazy(() => import("@/pages/settings/integrations"))

/**
 * Daftar rute anak di dalam AppLayout (Dashboard).
 */
export const dashboardRoutes: AppRoute[] = [
  {
    name: "DashboardRedirect",
    path: ROUTES.DASHBOARD,
    type: "redirect",
    meta: {
      isProtectedRoute: true,
      redirection: ROUTES.INVENTORY.SUMMARY,
    },
  },

  // --- Inventory & Stock ---
  {
    name: "StockSummary",
    path: ROUTES.INVENTORY.SUMMARY,
    type: "page",
    element: StockSummaryPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.INVENTORY_READ],
      title: "Ringkasan Stok",
    },
  },
  {
    name: "ItemCatalog",
    path: ROUTES.INVENTORY.CATALOG,
    type: "page",
    element: ItemCatalogPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.INVENTORY_READ],
      title: "Katalog Barang",
    },
  },
  {
    name: "StockOpname",
    path: ROUTES.INVENTORY.OPNAME,
    type: "page",
    element: StockOpnamePage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.INVENTORY_OPNAME],
      title: "Stock Opname",
    },
  },
  {
    name: "StockTransfer",
    path: ROUTES.INVENTORY.TRANSFER,
    type: "page",
    element: StockTransferPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.INVENTORY_TRANSFER],
      title: "Transfer Stok",
    },
  },
  {
    name: "LowStockAlerts",
    path: ROUTES.INVENTORY.ALERTS,
    type: "page",
    element: LowStockAlertsPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.INVENTORY_ALERTS],
      title: "Peringatan Stok Rendah",
    },
  },
  {
    name: "SerialBatchTracking",
    path: ROUTES.INVENTORY.BATCHES,
    type: "page",
    element: SerialBatchTrackingPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.INVENTORY_BATCHES],
      title: "Serial & Batch Tracking",
    },
  },

  // --- Inbound ---
  {
    name: "PurchaseOrders",
    path: ROUTES.INBOUND.PURCHASE_ORDERS,
    type: "page",
    element: PurchaseOrdersPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.INBOUND_ORDERS],
      title: "Purchase Orders",
    },
  },
  {
    name: "GoodsReceived",
    path: ROUTES.INBOUND.RECEIVING,
    type: "page",
    element: GoodsReceivedPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.INBOUND_RECEIVING],
      title: "Penerimaan Barang",
    },
  },
  {
    name: "SupplierReturns",
    path: ROUTES.INBOUND.RETURNS,
    type: "page",
    element: SupplierReturnsPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.INBOUND_RETURNS],
      title: "Retur Supplier",
    },
  },

  // --- Outbound ---
  {
    name: "SalesOrders",
    path: ROUTES.OUTBOUND.SALES_ORDERS,
    type: "page",
    element: SalesOrdersPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.OUTBOUND_ORDERS],
      title: "Sales Orders",
    },
  },
  {
    name: "PickingPacking",
    path: ROUTES.OUTBOUND.PICKING,
    type: "page",
    element: PickingPackingPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.OUTBOUND_PICKING],
      title: "Picking & Packing",
    },
  },
  {
    name: "DeliveryOrders",
    path: ROUTES.OUTBOUND.DELIVERIES,
    type: "page",
    element: DeliveryOrdersPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.OUTBOUND_DELIVERIES],
      title: "Pengiriman Barang",
    },
  },
  {
    name: "CustomerReturns",
    path: ROUTES.OUTBOUND.RETURNS,
    type: "page",
    element: CustomerReturnsPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.OUTBOUND_RETURNS],
      title: "Retur Pelanggan",
    },
  },

  // --- Warehouses ---
  {
    name: "WarehouseList",
    path: ROUTES.WAREHOUSES.LIST,
    type: "page",
    element: WarehouseListPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.WAREHOUSES_READ],
      title: "Daftar Gudang",
    },
  },
  {
    name: "ZonesRacksLayout",
    path: ROUTES.WAREHOUSES.LAYOUT,
    type: "page",
    element: ZonesRacksLayoutPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.WAREHOUSES_MANAGE],
      title: "Tata Letak Gudang",
    },
  },
  {
    name: "CapacitySpace",
    path: ROUTES.WAREHOUSES.CAPACITY,
    type: "page",
    element: CapacitySpacePage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.WAREHOUSES_READ],
      title: "Kapasitas Ruang",
    },
  },

  // --- Contacts ---
  {
    name: "SuppliersVendors",
    path: ROUTES.CONTACTS.SUPPLIERS,
    type: "page",
    element: SuppliersVendorsPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.CONTACTS_READ],
      title: "Supplier & Vendor",
    },
  },
  {
    name: "Customers",
    path: ROUTES.CONTACTS.CUSTOMERS,
    type: "page",
    element: CustomersPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.CONTACTS_READ],
      title: "Pelanggan",
    },
  },
  {
    name: "CouriersLogistics",
    path: ROUTES.CONTACTS.COURIERS,
    type: "page",
    element: CouriersLogisticsPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.CONTACTS_READ],
      title: "Kurir & Logistik",
    },
  },

  // --- Reports ---
  {
    name: "StockValuation",
    path: ROUTES.REPORTS.VALUATION,
    type: "page",
    element: StockValuationPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.REPORTS_READ],
      title: "Valuasi Stok",
    },
  },
  {
    name: "InventoryTurnover",
    path: ROUTES.REPORTS.TURNOVER,
    type: "page",
    element: InventoryTurnoverPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.REPORTS_READ],
      title: "Perputaran Persediaan",
    },
  },
  {
    name: "MovementHistory",
    path: ROUTES.REPORTS.MOVEMENTS,
    type: "page",
    element: MovementHistoryPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.REPORTS_READ],
      title: "Riwayat Mutasi",
    },
  },
  {
    name: "DeadStockAnalysis",
    path: ROUTES.REPORTS.DEAD_STOCK,
    type: "page",
    element: DeadStockAnalysisPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.REPORTS_READ],
      title: "Analisis Dead Stock",
    },
  },

  // --- Settings ---
  {
    name: "CategoriesUnits",
    path: ROUTES.SETTINGS.CATEGORIES,
    type: "page",
    element: CategoriesUnitsPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.SETTINGS_MANAGE],
      title: "Kategori & Satuan",
    },
  },
  {
    name: "UserRolesAccess",
    path: ROUTES.SETTINGS.ROLES,
    type: "page",
    element: UserRolesAccessPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.SETTINGS_ROLES],
      title: "Peran & Akses Pengguna",
    },
  },
  {
    name: "ReorderAutomation",
    path: ROUTES.SETTINGS.REORDER_RULES,
    type: "page",
    element: ReorderAutomationPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.SETTINGS_MANAGE],
      title: "Aturan Pembelian Otomatis",
    },
  },
  {
    name: "IntegrationsAPI",
    path: ROUTES.SETTINGS.INTEGRATIONS,
    type: "page",
    element: IntegrationsAPIPage,
    meta: {
      isProtectedRoute: true,
      permissions: [PERMISSIONS.SETTINGS_MANAGE],
      title: "Integrasi API",
    },
  },
]

/**
 * Seluruh definisi rute aplikasi KelolaStok
 */
export const routes: AppRoute[] = [
  {
    name: "Root",
    path: ROUTES.ROOT,
    type: "redirect",
    meta: {
      redirection: ROUTES.LOGIN,
    },
  },
  {
    name: "Login",
    path: ROUTES.LOGIN,
    type: "page",
    element: LoginPage,
    meta: {
      isProtectedRoute: false,
      title: "Masuk ke Akun",
    },
  },
  {
    name: "Register",
    path: ROUTES.REGISTER,
    type: "page",
    element: RegisterPage,
    meta: {
      isProtectedRoute: false,
      title: "Daftar Akun Baru",
    },
  },
  {
    name: "AppLayout",
    type: "group",
    element: AppLayout,
    children: dashboardRoutes,
  },
  {
    name: "NotFoundCatchAll",
    path: "*",
    type: "redirect",
    meta: {
      redirection: ROUTES.LOGIN,
    },
  },
]

export default routes
