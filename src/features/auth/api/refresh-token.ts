import { apiClient, REFRESH_KEY } from "@/shared/lib/axios"
import { useAuthStore } from "../stores/auth.store"
import type { RefreshResponse } from "../types/auth.types"
import { getErrorMessage } from "./login"

export async function refreshTokenApi(): Promise<{ accessToken: string; refreshToken: string }> {
  const refresh = useAuthStore.getState().refreshToken || localStorage.getItem(REFRESH_KEY)
  if (!refresh) {
    throw new Error("Refresh token tidak ditemukan.")
  }

  try {
    const response = await apiClient.post<RefreshResponse>("/auth/refresh", {
      refreshToken: refresh,
    })
    const data = response.data
    if (data.success && data.data) {
      useAuthStore.getState().setTokens({
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      })
      return {
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      }
    }
    useAuthStore.getState().logout()
    throw new Error(data.message || "Sesi telah berakhir, silakan login kembali.")
  } catch (error) {
    useAuthStore.getState().logout()
    throw new Error(getErrorMessage(error, "Sesi telah berakhir, silakan login kembali."))
  }
}
