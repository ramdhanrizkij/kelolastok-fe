import { Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "./layouts/dashboard-layout"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"

// Inventory Pages
import StockSummaryPage from "./pages/inventory/summary"
import ItemCatalogPage from "./pages/inventory/catalog"
import StockOpnamePage from "./pages/inventory/opname"
import StockTransferPage from "./pages/inventory/transfer"
import LowStockAlertsPage from "./pages/inventory/alerts"
import SerialBatchTrackingPage from "./pages/inventory/batches"

// Inbound Pages
import PurchaseOrdersPage from "./pages/inbound/purchase-orders"
import GoodsReceivedPage from "./pages/inbound/receiving"
import SupplierReturnsPage from "./pages/inbound/returns"

// Outbound Pages
import SalesOrdersPage from "./pages/outbound/sales-orders"
import PickingPackingPage from "./pages/outbound/picking"
import DeliveryOrdersPage from "./pages/outbound/deliveries"
import CustomerReturnsPage from "./pages/outbound/returns"

// Warehouse Pages
import WarehouseListPage from "./pages/warehouses/list"
import ZonesRacksLayoutPage from "./pages/warehouses/layout"
import CapacitySpacePage from "./pages/warehouses/capacity"

// Contacts Pages
import SuppliersVendorsPage from "./pages/contacts/suppliers"
import CustomersPage from "./pages/contacts/customers"
import CouriersLogisticsPage from "./pages/contacts/couriers"

// Reports Pages
import StockValuationPage from "./pages/reports/valuation"
import InventoryTurnoverPage from "./pages/reports/turnover"
import MovementHistoryPage from "./pages/reports/movements"
import DeadStockAnalysisPage from "./pages/reports/dead-stock"

// Settings Pages
import CategoriesUnitsPage from "./pages/settings/categories"
import UserRolesAccessPage from "./pages/settings/roles"
import ReorderAutomationPage from "./pages/settings/reorder-rules"
import IntegrationsAPIPage from "./pages/settings/integrations"

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* React Router Route Definitions */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard Layout Parent */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Navigate to="/inventory/summary" replace />} />
          
          {/* Inventory & Stock */}
          <Route path="/inventory/summary" element={<StockSummaryPage />} />
          <Route path="/inventory/catalog" element={<ItemCatalogPage />} />
          <Route path="/inventory/opname" element={<StockOpnamePage />} />
          <Route path="/inventory/transfer" element={<StockTransferPage />} />
          <Route path="/inventory/alerts" element={<LowStockAlertsPage />} />
          <Route path="/inventory/batches" element={<SerialBatchTrackingPage />} />

          {/* Inbound */}
          <Route path="/inbound/purchase-orders" element={<PurchaseOrdersPage />} />
          <Route path="/inbound/receiving" element={<GoodsReceivedPage />} />
          <Route path="/inbound/returns" element={<SupplierReturnsPage />} />

          {/* Outbound */}
          <Route path="/outbound/sales-orders" element={<SalesOrdersPage />} />
          <Route path="/outbound/picking" element={<PickingPackingPage />} />
          <Route path="/outbound/deliveries" element={<DeliveryOrdersPage />} />
          <Route path="/outbound/returns" element={<CustomerReturnsPage />} />

          {/* Warehouses */}
          <Route path="/warehouses/list" element={<WarehouseListPage />} />
          <Route path="/warehouses/layout" element={<ZonesRacksLayoutPage />} />
          <Route path="/warehouses/capacity" element={<CapacitySpacePage />} />

          {/* Contacts */}
          <Route path="/contacts/suppliers" element={<SuppliersVendorsPage />} />
          <Route path="/contacts/customers" element={<CustomersPage />} />
          <Route path="/contacts/couriers" element={<CouriersLogisticsPage />} />

          {/* Reports */}
          <Route path="/reports/valuation" element={<StockValuationPage />} />
          <Route path="/reports/turnover" element={<InventoryTurnoverPage />} />
          <Route path="/reports/movements" element={<MovementHistoryPage />} />
          <Route path="/reports/dead-stock" element={<DeadStockAnalysisPage />} />

          {/* Settings */}
          <Route path="/settings/categories" element={<CategoriesUnitsPage />} />
          <Route path="/settings/roles" element={<UserRolesAccessPage />} />
          <Route path="/settings/reorder-rules" element={<ReorderAutomationPage />} />
          <Route path="/settings/integrations" element={<IntegrationsAPIPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}