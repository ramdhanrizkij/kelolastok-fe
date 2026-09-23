import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { authService, type User, type AuthResponse } from "@/services/auth"
import { useAuthStore } from "@/store/use-auth-store"

export { useAuthStore }

// Hook untuk mendapatkan user saat ini dari Zustand store (reaktif tanpa network fetch)
export function useCurrentUser() {
  return useAuthStore((state) => state.user)
}

// Hook untuk mendapatkan status login dari Zustand
export function useIsAuthenticated() {
  return useAuthStore((state) => state.isAuthenticated)
}

export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
}

// Hook untuk Login
export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.data?.user) {
        queryClient.setQueryData(authKeys.profile(), data.data.user)
      }
      navigate("/inventory/summary")
    },
  })
}

// Hook untuk Register
export function useRegister() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<
    AuthResponse,
    Error,
    { name: string; username: string; email: string; password: string }
  >({
    mutationFn: (payload) => authService.register(payload),
    onSuccess: (data) => {
      if (data.data?.user) {
        queryClient.setQueryData(authKeys.profile(), data.data.user)
      }
      navigate("/inventory/summary")
    },
  })
}

// Hook untuk Get Profile
export function useProfile() {
  return useQuery<User, Error>({
    queryKey: authKeys.profile(),
    queryFn: () => authService.getProfile(),
    enabled: authService.isAuthenticated(),
    staleTime: 1000 * 60 * 10, // Cache profile selama 10 menit
  })
}

// Hook untuk Logout
export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return () => {
    authService.logout()
    queryClient.removeQueries({ queryKey: authKeys.all })
    navigate("/login")
  }
}
