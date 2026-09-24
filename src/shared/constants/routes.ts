/**
 * Konstanta URL Path Routes Aplikasi KelolaStok
 */
export const ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  // Dashboard & Default Entry
  DASHBOARD: "/dashboard",
  DEFAULT: "/inventory/summary",

  // Inventory & Stock
  INVENTORY: {
    SUMMARY: "/inventory/summary",
    CATALOG: "/inventory/catalog",
    OPNAME: "/inventory/opname",
    TRANSFER: "/inventory/transfer",
    ALERTS: "/inventory/alerts",
    BATCHES: "/inventory/batches",
  },

  // Inbound
  INBOUND: {
    PURCHASE_ORDERS: "/inbound/purchase-orders",
    RECEIVING: "/inbound/receiving",
    RETURNS: "/inbound/returns",
  },

  // Outbound
  OUTBOUND: {
    SALES_ORDERS: "/outbound/sales-orders",
    PICKING: "/outbound/picking",
    DELIVERIES: "/outbound/deliveries",
    RETURNS: "/outbound/returns",
  },

  // Warehouses
  WAREHOUSES: {
    LIST: "/warehouses/list",
    LAYOUT: "/warehouses/layout",
    CAPACITY: "/warehouses/capacity",
  },

  // Contacts
  CONTACTS: {
    SUPPLIERS: "/contacts/suppliers",
    CUSTOMERS: "/contacts/customers",
    COURIERS: "/contacts/couriers",
  },

  // Reports
  REPORTS: {
    VALUATION: "/reports/valuation",
    TURNOVER: "/reports/turnover",
    MOVEMENTS: "/reports/movements",
    DEAD_STOCK: "/reports/dead-stock",
  },

  // Settings
  SETTINGS: {
    CATEGORIES: "/settings/categories",
    ROLES: "/settings/roles",
    REORDER_RULES: "/settings/reorder-rules",
    INTEGRATIONS: "/settings/integrations",
  },

  // Error Pages
  UNAUTHORIZED: "/unauthorized",
  NOT_FOUND: "/404",
} as const
