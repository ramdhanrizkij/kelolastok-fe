import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { User } from "@/services/auth"

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  setAuth: (data: { user: User; accessToken: string; refreshToken?: string }) => void
  setTokens: (tokens: { accessToken: string; refreshToken?: string }) => void
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: ({ user, accessToken, refreshToken }) => {
        // Simpan juga ke key legacy untuk kompatibilitas langsung
        localStorage.setItem("kelolastok_access_token", accessToken)
        if (refreshToken) {
          localStorage.setItem("kelolastok_refresh_token", refreshToken)
        }
        localStorage.setItem("kelolastok_user", JSON.stringify(user))

        set((state) => ({
          user,
          accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
          isAuthenticated: true,
        }))
      },

      setTokens: ({ accessToken, refreshToken }) => {
        localStorage.setItem("kelolastok_access_token", accessToken)
        if (refreshToken) {
          localStorage.setItem("kelolastok_refresh_token", refreshToken)
        }

        set((state) => ({
          accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
          isAuthenticated: true,
        }))
      },

      setUser: (user) => {
        localStorage.setItem("kelolastok_user", JSON.stringify(user))
        set({ user })
      },

      logout: () => {
        localStorage.removeItem("kelolastok_access_token")
        localStorage.removeItem("kelolastok_refresh_token")
        localStorage.removeItem("kelolastok_user")

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: "kelolastok-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
