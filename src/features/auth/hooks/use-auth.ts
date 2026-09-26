import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { loginApi } from "../api/login"
import { logoutApi } from "../api/logout"
import { registerApi } from "../api/register"
import { forgotPasswordApi } from "../api/forgot-password"
import { resetPasswordApi } from "../api/reset-password"
import { useAuthStore } from "../stores/auth.store"
import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterPayload,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "../types/auth.types"
import { apiClient } from "@/shared/lib/axios"
import { ROUTES } from "@/shared/constants/routes"

export { useAuthStore }

export function useCurrentUser(): User | null {
  return useAuthStore((state) => state.user)
}

export function useIsAuthenticated(): boolean {
  return useAuthStore((state) => state.isAuthenticated)
}

export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
}

export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: (credentials) => loginApi(credentials),
    onSuccess: (data) => {
      if (data.data?.user) {
        queryClient.setQueryData(authKeys.profile(), data.data.user)
      }
      navigate(ROUTES.DEFAULT)
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: (payload) => registerApi(payload),
    onSuccess: (data) => {
      if (data.data?.user) {
        queryClient.setQueryData(authKeys.profile(), data.data.user)
      }
      navigate(ROUTES.DEFAULT)
    },
  })
}

export function useForgotPassword() {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordPayload>({
    mutationFn: (payload) => forgotPasswordApi(payload),
  })
}

export function useResetPassword() {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
    mutationFn: (payload) => resetPasswordApi(payload),
  })
}

export function useProfile() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery<User, Error>({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: { user: User } }>("/auth/profile")
      if (response.data.success && response.data.data?.user) {
        useAuthStore.getState().setUser(response.data.data.user)
        return response.data.data.user
      }
      throw new Error("Gagal memuat profil pengguna")
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 10,
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return () => {
    logoutApi()
    queryClient.removeQueries({ queryKey: authKeys.all })
    navigate(ROUTES.LOGIN)
  }
}

