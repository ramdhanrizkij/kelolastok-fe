import { apiClient } from "@/shared/lib/axios"
import type { ResetPasswordPayload, ResetPasswordResponse } from "../types/auth.types"
import { getErrorMessage } from "./login"

export async function resetPasswordApi(
  payload: ResetPasswordPayload
): Promise<ResetPasswordResponse> {
  try {
    const response = await apiClient.post<ResetPasswordResponse>("/auth/reset-password", payload)
    return response.data
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "Gagal memperbarui kata sandi. Tautan mungkin telah kedaluwarsa atau tidak valid."
      )
    )
  }
}
