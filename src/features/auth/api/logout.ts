import { useAuthStore } from "../stores/auth.store"

export function logoutApi(): void {
  useAuthStore.getState().logout()
}
