import {
  LayoutDashboard,
  Box,
  ArrowLeftRight,
  Warehouse,
  Users,
  BarChart3,
  Settings,
  Boxes,
  ArrowDownToLine,
  ArrowUpFromLine,
  Building2,
  Contact2,
  TrendingUp,
  Sliders,
  type LucideIcon,
} from "lucide-react"

export interface NavigationItem {
  label: string
  path: string
  badge?: string
}

export interface NavigationSubGroup {
  title: string
  icon?: LucideIcon
  items: NavigationItem[]
}

export interface NavigationSection {
  id: string
  title: string
  icon: LucideIcon
  subGroups: NavigationSubGroup[]
}

export const navigationData: NavigationSection[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    subGroups: [
      {
        title: "Overview",
        icon: LayoutDashboard,
        items: [
          { label: "Executive Dashboard", path: "/dashboard" },
        ],
      },
    ],
  },
  {
    id: "inventory",
    title: "Inventory & Stock",
    icon: Box,

    subGroups: [
      {
        title: "Stock Management",
        icon: Boxes,
        items: [
          { label: "Stock Summary", path: "/inventory/summary" },
          { label: "Item Catalog", path: "/inventory/catalog" },
          { label: "Stock Opname", path: "/inventory/opname" },
          { label: "Stock Transfer", path: "/inventory/transfer" },
          { label: "Low Stock Alerts", path: "/inventory/alerts", badge: "5" },
          { label: "Serial & Batch Tracking", path: "/inventory/batches" },
        ],
      },
    ],
  },
  {
    id: "movements",
    title: "Inbound & Outbound",
    icon: ArrowLeftRight,
    subGroups: [
      {
        title: "Inbound (Barang Masuk)",
        icon: ArrowDownToLine,
        items: [
          { label: "Purchase Orders", path: "/inbound/purchase-orders" },
          { label: "Goods Received (GRN)", path: "/inbound/receiving" },
          { label: "Supplier Returns", path: "/inbound/returns" },
        ],
      },
      {
        title: "Outbound (Barang Keluar)",
        icon: ArrowUpFromLine,
        items: [
          { label: "Sales Orders", path: "/outbound/sales-orders" },
          { label: "Picking & Packing", path: "/outbound/picking" },
          { label: "Delivery Orders (DO)", path: "/outbound/deliveries" },
          { label: "Customer Returns", path: "/outbound/returns" },
        ],
      },
    ],
  },
  {
    id: "warehouses",
    title: "Warehouse & Locations",
    icon: Warehouse,
    subGroups: [
      {
        title: "Management",
        icon: Building2,
        items: [
          { label: "Warehouse List", path: "/warehouses/list" },
          { label: "Zones & Racks Layout", path: "/warehouses/layout" },
          { label: "Capacity & Space", path: "/warehouses/capacity" },
        ],
      },
    ],
  },
  {
    id: "contacts",
    title: "Contacts & Vendors",
    icon: Users,
    subGroups: [
      {
        title: "Parties",
        icon: Contact2,
        items: [
          { label: "Suppliers & Vendors", path: "/contacts/suppliers" },
          { label: "Customers", path: "/contacts/customers" },
          { label: "Couriers / Logistics", path: "/contacts/couriers" },
        ],
      },
    ],
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    icon: BarChart3,
    subGroups: [
      {
        title: "Analytics",
        icon: TrendingUp,
        items: [
          { label: "Stock Valuation", path: "/reports/valuation" },
          { label: "Inventory Turnover", path: "/reports/turnover" },
          { label: "Movement History", path: "/reports/movements" },
          { label: "Dead Stock Analysis", path: "/reports/dead-stock" },
        ],
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    subGroups: [
      {
        title: "System Configuration",
        icon: Sliders,
        items: [
          { label: "Categories & Units (UOM)", path: "/settings/categories" },
          { label: "User Roles & Access", path: "/settings/roles" },
          { label: "Reorder Automation", path: "/settings/reorder-rules" },
          { label: "Integrations & API", path: "/settings/integrations" },
        ],
      },
    ],
  },
]
