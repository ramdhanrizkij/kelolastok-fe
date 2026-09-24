/**
 * Utilitas manipulasi string
 */

export function capitalize(str: string): string {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function truncate(str: string, length = 50, ending = "..."): string {
  if (!str || str.length <= length) return str
  return str.substring(0, length - ending.length) + ending
}
