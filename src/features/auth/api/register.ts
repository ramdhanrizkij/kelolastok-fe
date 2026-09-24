import { apiClient } from "@/shared/lib/axios"
import { useAuthStore } from "../stores/auth.store"
import type { AuthResponse, RegisterPayload } from "../types/auth.types"
import { getErrorMessage } from "./login"

export async function registerApi(payload: RegisterPayload): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>("/auth/register", payload)
    const data = response.data
    if (data.success && data.data) {
      useAuthStore.getState().setAuth(data.data)
    }
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error, "Pendaftaran gagal. Periksa kembali data yang Anda masukkan."))
  }
}
