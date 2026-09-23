import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom"
import DashboardLayout from "@/layouts/dashboard-layout"
import LoginPage from "@/pages/login"
import RegisterPage from "@/pages/register"

// Inventory Pages
import StockSummaryPage from "@/pages/inventory/summary"
import ItemCatalogPage from "@/pages/inventory/catalog"
import StockOpnamePage from "@/pages/inventory/opname"
import StockTransferPage from "@/pages/inventory/transfer"
import LowStockAlertsPage from "@/pages/inventory/alerts"
import SerialBatchTrackingPage from "@/pages/inventory/batches"

// Inbound Pages
import PurchaseOrdersPage from "@/pages/inbound/purchase-orders"
import GoodsReceivedPage from "@/pages/inbound/receiving"
import SupplierReturnsPage from "@/pages/inbound/returns"

// Outbound Pages
import SalesOrdersPage from "@/pages/outbound/sales-orders"
import PickingPackingPage from "@/pages/outbound/picking"
import DeliveryOrdersPage from "@/pages/outbound/deliveries"
import CustomerReturnsPage from "@/pages/outbound/returns"

// Warehouse Pages
import WarehouseListPage from "@/pages/warehouses/list"
import ZonesRacksLayoutPage from "@/pages/warehouses/layout"
import CapacitySpacePage from "@/pages/warehouses/capacity"

// Contacts Pages
import SuppliersVendorsPage from "@/pages/contacts/suppliers"
import CustomersPage from "@/pages/contacts/customers"
import CouriersLogisticsPage from "@/pages/contacts/couriers"

// Reports Pages
import StockValuationPage from "@/pages/reports/valuation"
import InventoryTurnoverPage from "@/pages/reports/turnover"
import MovementHistoryPage from "@/pages/reports/movements"
import DeadStockAnalysisPage from "@/pages/reports/dead-stock"

// Settings Pages
import CategoriesUnitsPage from "@/pages/settings/categories"
import UserRolesAccessPage from "@/pages/settings/roles"
import ReorderAutomationPage from "@/pages/settings/reorder-rules"
import IntegrationsAPIPage from "@/pages/settings/integrations"

// Rute anak di dalam DashboardLayout
export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <Navigate to="/inventory/summary" replace />,
  },
  // Inventory & Stock
  {
    path: "/inventory/summary",
    element: <StockSummaryPage />,
  },
  {
    path: "/inventory/catalog",
    element: <ItemCatalogPage />,
  },
  {
    path: "/inventory/opname",
    element: <StockOpnamePage />,
  },
  {
    path: "/inventory/transfer",
    element: <StockTransferPage />,
  },
  {
    path: "/inventory/alerts",
    element: <LowStockAlertsPage />,
  },
  {
    path: "/inventory/batches",
    element: <SerialBatchTrackingPage />,
  },

  // Inbound
  {
    path: "/inbound/purchase-orders",
    element: <PurchaseOrdersPage />,
  },
  {
    path: "/inbound/receiving",
    element: <GoodsReceivedPage />,
  },
  {
    path: "/inbound/returns",
    element: <SupplierReturnsPage />,
  },

  // Outbound
  {
    path: "/outbound/sales-orders",
    element: <SalesOrdersPage />,
  },
  {
    path: "/outbound/picking",
    element: <PickingPackingPage />,
  },
  {
    path: "/outbound/deliveries",
    element: <DeliveryOrdersPage />,
  },
  {
    path: "/outbound/returns",
    element: <CustomerReturnsPage />,
  },

  // Warehouses
  {
    path: "/warehouses/list",
    element: <WarehouseListPage />,
  },
  {
    path: "/warehouses/layout",
    element: <ZonesRacksLayoutPage />,
  },
  {
    path: "/warehouses/capacity",
    element: <CapacitySpacePage />,
  },

  // Contacts
  {
    path: "/contacts/suppliers",
    element: <SuppliersVendorsPage />,
  },
  {
    path: "/contacts/customers",
    element: <CustomersPage />,
  },
  {
    path: "/contacts/couriers",
    element: <CouriersLogisticsPage />,
  },

  // Reports
  {
    path: "/reports/valuation",
    element: <StockValuationPage />,
  },
  {
    path: "/reports/turnover",
    element: <InventoryTurnoverPage />,
  },
  {
    path: "/reports/movements",
    element: <MovementHistoryPage />,
  },
  {
    path: "/reports/dead-stock",
    element: <DeadStockAnalysisPage />,
  },

  // Settings
  {
    path: "/settings/categories",
    element: <CategoriesUnitsPage />,
  },
  {
    path: "/settings/roles",
    element: <UserRolesAccessPage />,
  },
  {
    path: "/settings/reorder-rules",
    element: <ReorderAutomationPage />,
  },
  {
    path: "/settings/integrations",
    element: <IntegrationsAPIPage />,
  },
]

// Definisi konfigurasi seluruh rute aplikasi
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <DashboardLayout />,
    children: dashboardRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]

// Router instance menggunakan createBrowserRouter (React Router Data API)
export const router = createBrowserRouter(routes)
export default router
