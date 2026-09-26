import { apiClient } from "@/shared/lib/axios"
import type { ForgotPasswordPayload, ForgotPasswordResponse } from "../types/auth.types"
import { getErrorMessage } from "./login"

export async function forgotPasswordApi(
  payload: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> {
  try {
    const response = await apiClient.post<ForgotPasswordResponse>("/auth/forgot-password", payload)
    return response.data
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "Gagal mengirimkan tautan pemulihan kata sandi. Pastikan email Anda sudah benar."
      )
    )
  }
}
