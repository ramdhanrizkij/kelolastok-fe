import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios"
import { useAuthStore } from "@/features/auth/stores/auth.store"

export const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api/v1"
export const TOKEN_KEY = "kelolastok_access_token"
export const REFRESH_KEY = "kelolastok_refresh_token"
export const USER_KEY = "kelolastok_user"

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request Interceptor: Attach Bearer Token if available from Zustand or localStorage
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken || localStorage.getItem(TOKEN_KEY)
    if (token && config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor: Handle 401 & Auto Refresh Token Queue
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    const url = originalRequest.url || ""
    if (url.includes("/auth/login") || url.includes("/auth/refresh")) {
      return Promise.reject(error)
    }

    const refreshToken = useAuthStore.getState().refreshToken || localStorage.getItem(REFRESH_KEY)
    if (!refreshToken) {
      useAuthStore.getState().logout()
      window.location.href = "/login"
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          return apiClient(originalRequest)
        })
        .catch((err) => Promise.reject(err))
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const { data } = await axios.post(`${API_BASE}/auth/refresh`, {
        refreshToken,
      })

      const newAccessToken = data.data?.accessToken || data.accessToken
      const newRefreshToken = data.data?.refreshToken || data.refreshToken

      if (newAccessToken) {
        useAuthStore.getState().setTokens({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        })

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        }

        processQueue(null, newAccessToken)
        return apiClient(originalRequest)
      } else {
        throw new Error("No access token returned from refresh")
      }
    } catch (refreshError) {
      processQueue(refreshError, null)
      useAuthStore.getState().logout()
      window.location.href = "/login"
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default apiClient
