/**
 * Common schema validation & error types
 */

export interface ValidationRule<T = string> {
  validate: (value: T) => boolean
  message: string
}

export const emailRule: ValidationRule<string> = {
  validate: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  message: "Format email tidak valid",
}

export const requiredRule: ValidationRule<unknown> = {
  validate: (val: unknown) => {
    if (val === null || val === undefined) return false
    if (typeof val === "string") return val.trim().length > 0
    return true
  },
  message: "Bidang ini wajib diisi",
}

export function minLengthRule(length: number): ValidationRule<string> {
  return {
    validate: (val: string) => val.length >= length,
    message: `Minimal harus terdiri dari ${length} karakter`,
  }
}
