/**
 * Konstanta Permission RBAC Sistem KelolaStok
 */
export const PERMISSIONS = {
  // Inventory
  INVENTORY_READ: "inventory:read",
  INVENTORY_WRITE: "inventory:write",
  INVENTORY_OPNAME: "inventory:opname",
  INVENTORY_TRANSFER: "inventory:transfer",
  INVENTORY_ALERTS: "inventory:alerts",
  INVENTORY_BATCHES: "inventory:batches",

  // Inbound
  INBOUND_READ: "inbound:read",
  INBOUND_ORDERS: "inbound:orders",
  INBOUND_RECEIVING: "inbound:receiving",
  INBOUND_RETURNS: "inbound:returns",

  // Outbound
  OUTBOUND_READ: "outbound:read",
  OUTBOUND_ORDERS: "outbound:orders",
  OUTBOUND_PICKING: "outbound:picking",
  OUTBOUND_DELIVERIES: "outbound:deliveries",
  OUTBOUND_RETURNS: "outbound:returns",

  // Warehouses
  WAREHOUSES_READ: "warehouses:read",
  WAREHOUSES_MANAGE: "warehouses:manage",

  // Contacts
  CONTACTS_READ: "contacts:read",
  CONTACTS_MANAGE: "contacts:manage",

  // Reports
  REPORTS_READ: "reports:read",
  REPORTS_EXPORT: "reports:export",

  // Settings & System
  SETTINGS_READ: "settings:read",
  SETTINGS_MANAGE: "settings:manage",
  SETTINGS_ROLES: "settings:roles",

  // Wildcard full access
  ALL: "*",
} as const

export type PermissionKey = keyof typeof PERMISSIONS
export type PermissionValue = (typeof PERMISSIONS)[PermissionKey]
