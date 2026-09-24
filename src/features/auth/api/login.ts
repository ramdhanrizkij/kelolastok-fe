import { isAxiosError } from "axios"
import { apiClient } from "@/shared/lib/axios"
import { useAuthStore } from "../stores/auth.store"
import type { AuthResponse, LoginCredentials } from "../types/auth.types"

export function getErrorMessage(error: unknown, fallbackMessage = "Terjadi kesalahan pada sistem."): string {
  if (isAxiosError(error)) {
    const serverMessage = error.response?.data?.message
    if (serverMessage && typeof serverMessage === "string") {
      return serverMessage
    }
    if (error.message) {
      return error.message
    }
  }
  if (error instanceof Error) {
    return error.message
  }
  return fallbackMessage
}

export async function loginApi(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>("/auth/login", credentials)
    const data = response.data
    if (data.success && data.data) {
      useAuthStore.getState().setAuth(data.data)
    }
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error, "Gagal masuk. Periksa kembali email dan password Anda."))
  }
}
