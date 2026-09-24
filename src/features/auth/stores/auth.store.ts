import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { User } from "../types/auth.types"
import { TOKEN_KEY, REFRESH_KEY, USER_KEY } from "@/shared/lib/axios"

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
        localStorage.setItem(TOKEN_KEY, accessToken)
        if (refreshToken) {
          localStorage.setItem(REFRESH_KEY, refreshToken)
        }
        localStorage.setItem(USER_KEY, JSON.stringify(user))

        set((state) => ({
          user,
          accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
          isAuthenticated: true,
        }))
      },

      setTokens: ({ accessToken, refreshToken }) => {
        localStorage.setItem(TOKEN_KEY, accessToken)
        if (refreshToken) {
          localStorage.setItem(REFRESH_KEY, refreshToken)
        }

        set((state) => ({
          accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
          isAuthenticated: true,
        }))
      },

      setUser: (user) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        set({ user })
      },

      logout: () => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(REFRESH_KEY)
        localStorage.removeItem(USER_KEY)

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

export default useAuthStore
