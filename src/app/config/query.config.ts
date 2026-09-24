import type { QueryClientConfig } from "@tanstack/react-query"

export const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 menit
      gcTime: 1000 * 60 * 30, // 30 menit
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
}

export default queryConfig
