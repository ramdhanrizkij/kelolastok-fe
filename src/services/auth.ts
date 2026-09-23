import { isAxiosError } from "axios"
import { apiClient, TOKEN_KEY, REFRESH_KEY, USER_KEY } from "@/lib/api-client"
import { useAuthStore } from "@/store/use-auth-store"

export interface User {
  id: string
  name: string
  username: string
  email: string
  role: string
  avatar?: string
  storeName?: string
  createdAt?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn?: number
}

export interface AuthResponse {
  success: boolean
  message?: string
  data?: {
    user: User
    accessToken: string
    refreshToken: string
    expiresIn?: number
  }
}

export interface ProfileResponse {
  success: boolean
  message?: string
  data?: {
    user: User
  }
}

export interface RefreshResponse {
  success: boolean
  message?: string
  data?: {
    accessToken: string
    refreshToken: string
    expiresIn?: number
  }
}

// Helper untuk mengekstrak pesan error yang user-friendly dari Axios error
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

export const authService = {
  // Save tokens & user to Zustand store and localStorage
  saveAuth(data: { user: User; accessToken: string; refreshToken?: string }) {
    useAuthStore.getState().setAuth(data)
  },

  // Get current access token from Zustand store or localStorage fallback
  getToken(): string | null {
    return useAuthStore.getState().accessToken || localStorage.getItem(TOKEN_KEY)
  },

  // Get current refresh token from Zustand store or localStorage fallback
  getRefreshToken(): string | null {
    return useAuthStore.getState().refreshToken || localStorage.getItem(REFRESH_KEY)
  },

  // Get cached user info from Zustand store or localStorage
  getUser(): User | null {
    const storeUser = useAuthStore.getState().user
    if (storeUser) return storeUser

    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    try {
      const parsed = JSON.parse(raw) as User
      useAuthStore.getState().setUser(parsed)
      return parsed
    } catch {
      return null
    }
  },

  // Clear auth session
  logout() {
    useAuthStore.getState().logout()
  },

  // Check login status
  isAuthenticated(): boolean {
    return useAuthStore.getState().isAuthenticated || !!this.getToken()
  },

  // 1. Login via Axios
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", credentials)
      const data = response.data
      if (data.success && data.data) {
        this.saveAuth(data.data)
      }
      return data
    } catch (error) {
      throw new Error(getErrorMessage(error, "Gagal masuk. Periksa kembali email dan password Anda."))
    }
  },

  // 2. Register via Axios
  async register(payload: {
    name: string
    username: string
    email: string
    password: string
  }): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/register", payload)
      const data = response.data
      if (data.success && data.data) {
        this.saveAuth(data.data)
      }
      return data
    } catch (error) {
      throw new Error(getErrorMessage(error, "Pendaftaran gagal. Periksa kembali data yang Anda masukkan."))
    }
  },

  // 3. Get Profile via Axios (otomatis Bearer token dari interceptor)
  async getProfile(): Promise<User> {
    try {
      const response = await apiClient.get<ProfileResponse>("/auth/profile")
      const data = response.data
      if (data.success && data.data?.user) {
        useAuthStore.getState().setUser(data.data.user)
        return data.data.user
      }
      throw new Error(data.message || "Gagal memuat profil pengguna.")
    } catch (error) {
      throw new Error(getErrorMessage(error, "Gagal memuat profil pengguna."))
    }
  },

  // 4. Refresh Token JWT via Axios
  async refreshToken(): Promise<{ accessToken: string; refreshToken: string }> {
    const refresh = this.getRefreshToken()
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
      this.logout()
      throw new Error(data.message || "Sesi telah berakhir, silakan login kembali.")
    } catch (error) {
      this.logout()
      throw new Error(getErrorMessage(error, "Sesi telah berakhir, silakan login kembali."))
    }
  },
}
